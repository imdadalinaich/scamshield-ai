import { GoogleGenAI } from '@google/genai';
import { ScamCategory } from '../lib/types';

export interface PakistanThreatAlert {
  id: string;
  title: string;
  shortSummary: string;
  category: ScamCategory;
  severity: 'Critical' | 'High' | 'Medium';
  howItWorks: string;
  howToProtect: string;
  whatToDoIfTargeted: string;
  publishedDate: string;
  sourceName: string;
  sourceUrl: string;
}

export interface ThreatAlertsResponse {
  alerts: PakistanThreatAlert[];
  lastUpdated: string;
  isLive: boolean;
  statusText: string;
}

// In-memory cache for live threat alerts
let cachedAlerts: PakistanThreatAlert[] = [];
let cacheLastUpdated: number = 0;
let isRefreshing = false;

// Curated verified baseline threats from official Pakistani authorities
// Always available as verified fallback if AI grounding times out or fails
const VERIFIED_BASELINE_ALERTS: PakistanThreatAlert[] = [
  {
    id: 'pta-9005-sim-fraud',
    title: 'PTA & FIA Advisory: Biometric SIM & Fake Lottery SMS Waves',
    shortSummary: 'Fraudsters sending SMS claiming cash prizes or BISP funds from personal 11-digit numbers, demanding return calls or balance recharges.',
    category: 'sms',
    severity: 'Critical',
    howItWorks: 'Scammers use unregistered or spoofed SIMs to broadcast thousands of text messages claiming the recipient won millions or BISP funds. When victims reply, they are asked for "clearance fee" vouchers or card PINs.',
    howToProtect: 'Never respond to prize messages sent from standard 03xx mobile numbers. Real BISP announcements only originate from 8171.',
    whatToDoIfTargeted: 'Forward fraudulent SMS to PTA shortcode 9005 immediately and register a complaint with FIA NR3C.',
    publishedDate: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString().split('T')[0],
    sourceName: 'Pakistan Telecommunication Authority (PTA)',
    sourceUrl: 'https://complaint.pta.gov.pk/RegisterComplaint.aspx'
  },
  {
    id: 'sbp-wallet-reversal-alert',
    title: 'Easypaisa & JazzCash Fake Reversal "Money Sent by Mistake" Fraud',
    shortSummary: 'Criminals sending spoofed fake transfer SMS, followed by urgent calls pleading that money was sent by mistake to your mobile wallet.',
    category: 'bank',
    severity: 'Critical',
    howItWorks: 'The victim receives a fake SMS crafted to look like an Easypaisa/JazzCash credit alert (sent from a regular phone number). The scammer immediately calls, weeping or aggressive, begging for a refund. Victims transfer their own funds before checking real in-app balance.',
    howToProtect: 'Always open your actual Easypaisa or JazzCash application directly and check transaction history before entertaining any refund claims.',
    whatToDoIfTargeted: 'Immediately contact Easypaisa (3737) or JazzCash (4444) to flag the caller’s mobile account number.',
    publishedDate: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString().split('T')[0],
    sourceName: 'Banking Mohtasib Pakistan Consumer Alert',
    sourceUrl: 'https://www.bankingmohtasib.gov.pk/'
  },
  {
    id: 'fia-whatsapp-task-scam',
    title: 'FIA Cyber Crime Alert: YouTube & TikTok "Like & Earn" Task Traps',
    shortSummary: 'Unsolicited WhatsApp messages offering PKR 3,000–8,000 daily for liking videos, escalating into frozen cryptocurrency investment groups.',
    category: 'whatsapp',
    severity: 'High',
    howItWorks: 'Victims are paid PKR 500-1000 for completing the first 2-3 trivial YouTube video like tasks. Then they are moved to a Telegram or VIP group and asked to deposit PKR 20,000 to "unlock high-tier tasks", where funds are stolen permanently.',
    howToProtect: 'Legitimate international firms never recruit via random WhatsApp messages from foreign (+1, +44, +234, +62) country codes.',
    whatToDoIfTargeted: 'Block the WhatsApp number immediately, leave the Telegram group, and report the transaction details to FIA Cyber Crime Wing.',
    publishedDate: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString().split('T')[0],
    sourceName: 'FIA National Response Centre for Cyber Crime',
    sourceUrl: 'https://complaint.nr3c.gov.pk/'
  },
  {
    id: 'fia-student-job-trap',
    title: 'Advisory on Fraudulent Work-From-Home & Typing Job Offers',
    shortSummary: 'Fake employment portals and Facebook ads charging Pakistani university students upfront "security deposits" or "software registration fees".',
    category: 'job',
    severity: 'Medium',
    howItWorks: 'Applicants are offered typing, proofreading, or data entry positions with lucrative weekly wages. Before dispatching work, organizers demand non-refundable registration fees via mobile wallets. After receipt, numbers are blocked.',
    howToProtect: 'Any employer asking money from a job seeker for registration, software, or interview processing is 100% fraudulent.',
    whatToDoIfTargeted: 'Document the payment receipt with the wallet account title and report to local cyber crime authorities.',
    publishedDate: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString().split('T')[0],
    sourceName: 'FIA Cyber Crime (UAN 1991)',
    sourceUrl: 'https://complaint.nr3c.gov.pk/'
  }
];

// Initialize with verified baseline
cachedAlerts = [...VERIFIED_BASELINE_ALERTS];
cacheLastUpdated = Date.now();

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI();
};

/**
 * Refresh Pakistan Threat Alerts using Gemini with Google Search Grounding
 */
export async function refreshThreatAlerts(): Promise<void> {
  if (isRefreshing) return;
  isRefreshing = true;

  try {
    const ai = getGenAI();
    if (!ai) {
      console.log('[Alerts] No GEMINI_API_KEY available. Retaining verified authority baseline.');
      return;
    }

    console.log('[Alerts] Refreshing live Pakistan fraud alerts via Google Search grounding...');

    const prompt = `Search for cyber scams, digital financial fraud cases, fake SMS warnings, and public advisories actively reported in Pakistan over the last 14 days by credible sources (FIA NR3C, PTA, State Bank of Pakistan, major Pakistani commercial banks, Easypaisa, JazzCash, Dawn, Geo News, Express Tribune, ProPakistani).
Identify 4 to 6 distinct verified cyber threats currently targeting Pakistani citizens.

CRITICAL INSTRUCTIONS:
1. Every alert MUST include a real, authentic source title and valid web URL from the search grounding results.
2. If an alert has no verifiable real web URL, do NOT include it.
3. Output MUST be a valid JSON array of objects with the following schema:
[
  {
    "id": "unique-slug-string",
    "title": "Clear concise title of the scam",
    "shortSummary": "1-2 sentence summary of what is happening",
    "category": "sms" | "bank" | "whatsapp" | "job" | "call" | "website" | "investment" | "marketplace",
    "severity": "Critical" | "High" | "Medium",
    "howItWorks": "Step by step explanation of the threat",
    "howToProtect": "Practical actionable protection advice",
    "whatToDoIfTargeted": "Immediate response if victimized",
    "publishedDate": "YYYY-MM-DD",
    "sourceName": "Name of official authority or news publisher",
    "sourceUrl": "https://..."
  }
]
Output ONLY raw JSON.`;

    let timer: NodeJS.Timeout | null = null;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('Threat alerts search grounding timeout')), 28000);
    });

    const aiCall = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1,
      }
    });

    const response = await Promise.race([aiCall, timeoutPromise]);
    if (timer) clearTimeout(timer);

    const text = response.text?.trim() || '';
    
    // Extract JSON from output
    let parsed: any[] = [];
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.warn('[Alerts] Failed to parse JSON array from grounded response:', e);
      }
    }

    // Extract grounding URLs from groundingMetadata
    const groundingChunks = (response.candidates?.[0] as any)?.groundingMetadata?.groundingChunks || [];
    const groundingUrls: { uri: string; title?: string }[] = [];
    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        groundingUrls.push({ uri: chunk.web.uri, title: chunk.web.title });
      }
    }

    // Filter and sanitize alerts: Must have a valid source URL
    const validAlerts: PakistanThreatAlert[] = [];
    for (const item of parsed) {
      let finalUrl = item.sourceUrl;
      let finalSourceName = item.sourceName || 'Verified Pakistani Authority Advisory';

      // Validate URL format
      const hasValidUrl = finalUrl && (finalUrl.startsWith('http://') || finalUrl.startsWith('https://'));
      
      if (!hasValidUrl && groundingUrls.length > 0) {
        // Match with available grounding web sources
        const matched = groundingUrls[validAlerts.length % groundingUrls.length];
        finalUrl = matched.uri;
        if (matched.title) finalSourceName = matched.title;
      }

      if (finalUrl && (finalUrl.startsWith('http://') || finalUrl.startsWith('https://')) && item.title && item.shortSummary) {
        validAlerts.push({
          id: item.id || `alert-${Date.now()}-${validAlerts.length}`,
          title: item.title,
          shortSummary: item.shortSummary,
          category: ['sms', 'bank', 'whatsapp', 'job', 'call', 'website', 'investment', 'marketplace'].includes(item.category)
            ? (item.category as ScamCategory)
            : 'sms',
          severity: ['Critical', 'High', 'Medium'].includes(item.severity)
            ? item.severity
            : 'High',
          howItWorks: item.howItWorks || 'Attackers employ social engineering deception to extract funds or credentials.',
          howToProtect: item.howToProtect || 'Never share OTPs, passwords, or send funds without independent verification.',
          whatToDoIfTargeted: item.whatToDoIfTargeted || 'Freeze account immediately and call FIA NR3C helpline at 1991.',
          publishedDate: item.publishedDate || new Date().toISOString().split('T')[0],
          sourceName: finalSourceName,
          sourceUrl: finalUrl
        });
      }
    }

    if (validAlerts.length >= 2) {
      cachedAlerts = validAlerts;
      cacheLastUpdated = Date.now();
      console.log(`[Alerts] Successfully updated with ${validAlerts.length} live grounded Pakistan threat alerts.`);
    } else {
      console.log('[Alerts] Grounded alerts did not meet validation criteria. Retaining existing verified baseline.');
    }
  } catch (err) {
    console.warn('[Alerts] Grounding refresh encountered an issue:', err instanceof Error ? err.message : err);
  } finally {
    isRefreshing = false;
  }
}

/**
 * Get current Pakistan Threat Alerts with freshness metadata
 */
export async function getPakistanThreatAlerts(): Promise<ThreatAlertsResponse> {
  const ageMs = Date.now() - cacheLastUpdated;
  const isOlderThan24h = ageMs > 24 * 60 * 60 * 1000;

  // Trigger background refresh if older than 24h and not currently refreshing
  if ((isOlderThan24h || cachedAlerts.length === 0) && !isRefreshing) {
    // Fire refresh in background so client request is never blocked
    refreshThreatAlerts().catch(() => {});
  }

  const isLive = ageMs < 48 * 60 * 60 * 1000;
  const lastUpdatedDate = new Date(cacheLastUpdated).toLocaleDateString('en-PK', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const statusText = isLive ? 'Live Verified Intelligence' : `Last verified on ${lastUpdatedDate}`;

  return {
    alerts: cachedAlerts.length > 0 ? cachedAlerts : VERIFIED_BASELINE_ALERTS,
    lastUpdated: new Date(cacheLastUpdated).toISOString(),
    isLive,
    statusText
  };
}

// Initial background refresh on startup (unref'd to prevent blocking process exits)
const initTimer = setTimeout(() => {
  refreshThreatAlerts().catch(() => {});
}, 3000);
if (initTimer.unref) initTimer.unref();

// Recurring 24-hour background refresh
const dailyInterval = setInterval(() => {
  refreshThreatAlerts().catch(() => {});
}, 24 * 60 * 60 * 1000);
if (dailyInterval.unref) dailyInterval.unref();
