import { normalizeText, computeHash } from './scam_rules';
import { ScamCategory } from './types';

export interface KnownScamItem {
  hash: string;
  category: ScamCategory;
  title: string;
  source: string;
  samplePhrase: string; // for near-match similarity testing
}

// Known viral scam phrases in Pakistan (seeded registry)
export const KNOWN_VIRAL_SCAMS: KnownScamItem[] = [
  {
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // will be computed dynamically
    category: 'sms',
    title: 'BISP Benazir Income Support Fake Payout SMS',
    source: 'National FIA Cyber Alert',
    samplePhrase: 'mubarak ho aap ko benazir income support program ki taraf se 25000 rupay ki mali imdad manzoor ho chuki hai foran rabta karain'
  },
  {
    hash: '',
    category: 'sms',
    title: 'HBL / Meezan Bank ATM Card Block Fake SMS',
    source: 'State Bank Fraud Warning',
    samplePhrase: 'aziz sarif aap ka hbl atm card block kar diya gaya hai verification k liye foran call karain warna account band ho jaye ga'
  },
  {
    hash: '',
    category: 'bank',
    title: 'Easypaisa / JazzCash Mistaken Reversal Scam',
    source: 'Easypaisa Security Bulletin',
    samplePhrase: 'bhai ghalti se aap k easypaisa account me 20000 transfer ho gaye hain bache ki dawai leni thi khuda k liye wapis bhej dain'
  },
  {
    hash: '',
    category: 'whatsapp',
    title: 'YouTube Video Like & Subscribe Daily Task Scam',
    source: 'Cyber Crime Complaints 2025-2026',
    samplePhrase: 'hello dear i am hr from global marketing we offer online part time job just like youtube videos and earn 3000 to 5000 daily send screenshot'
  },
  {
    hash: '',
    category: 'prize',
    title: 'Jeeto Pakistan / Fahad Mustafa Gold Scheme',
    source: 'PTA Consumer Alert',
    samplePhrase: 'jeeto pakistan ki taraf se aap ki qismat khul gayi aap ne 5 tola sona aur car jeet li hai delivery tax advance jama karwayen'
  },
  {
    hash: '',
    category: 'crypto',
    title: 'Double Money 7-Day Ponzi Cloud App',
    source: 'SEC Fraud Alert',
    samplePhrase: 'double your money in just 7 days 100 guaranteed profit daily withdrawal join our vip telegram team and invest usdt now'
  },
  {
    hash: '',
    category: 'impersonation',
    title: 'Airport Customs Expensive Gift Parcel Clearance',
    source: 'FIA NR3C Advisory',
    samplePhrase: 'i sent you expensive gift parcel from uk with gold watch and dollars it is stuck at islamabad airport please pay customs clearance fee'
  }
];

// Initialize hashes on startup
let initialized = false;
export async function initializeKnownHashes(): Promise<void> {
  if (initialized) return;
  for (const scam of KNOWN_VIRAL_SCAMS) {
    if (!scam.hash) {
      scam.hash = await computeHash(scam.samplePhrase);
    }
  }
  initialized = true;
}

// Word-level Jaccard similarity for near-match detection
export function calculateJaccardSimilarity(textA: string, textB: string): number {
  const normA = normalizeText(textA);
  const normB = normalizeText(textB);
  if (!normA || !normB) return 0;

  const wordsA = new Set(normA.split(/\s+/).filter(w => w.length > 2));
  const wordsB = new Set(normB.split(/\s+/).filter(w => w.length > 2));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersectionCount = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) {
      intersectionCount++;
    }
  }

  const unionSize = new Set([...wordsA, ...wordsB]).size;
  return unionSize > 0 ? intersectionCount / unionSize : 0;
}

// Check if input matches any known viral scam hash or near-match
export async function checkKnownScam(input: string): Promise<{ matched: boolean; scam?: KnownScamItem; similarity: number }> {
  await initializeKnownHashes();
  const inputNormalized = normalizeText(input);
  if (inputNormalized.length < 20) {
    return { matched: false, similarity: 0 };
  }

  const inputHash = await computeHash(inputNormalized);

  // 1. Exact SHA-256 match
  for (const scam of KNOWN_VIRAL_SCAMS) {
    if (scam.hash === inputHash) {
      return { matched: true, scam, similarity: 1.0 };
    }
  }

  // 2. Near-match detection (> 0.55 similarity)
  let bestMatch: KnownScamItem | undefined;
  let highestSim = 0;

  for (const scam of KNOWN_VIRAL_SCAMS) {
    const sim = calculateJaccardSimilarity(inputNormalized, scam.samplePhrase);
    if (sim > highestSim) {
      highestSim = sim;
      bestMatch = scam;
    }
  }

  if (highestSim >= 0.55 && bestMatch) {
    return { matched: true, scam: bestMatch, similarity: highestSim };
  }

  return { matched: false, similarity: highestSim };
}
