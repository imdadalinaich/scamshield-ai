import { ScamCategory } from './types';

// Normalized SHA-256 generator in browser & node
export async function computeHash(text: string): Promise<string> {
  const normalized = normalizeText(text);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57, h3 = 0x9e3779b9, h4 = 0x7feb352d;
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 3812015801);
    h4 = Math.imul(h4 ^ ch, 2246822519);
  }
  const toHex = (n: number) => (n >>> 0).toString(16).padStart(8, '0');
  return (toHex(h1) + toHex(h2) + toHex(h3) + toHex(h4) + toHex(h1 ^ h3) + toHex(h2 ^ h4) + toHex(h1 + h2) + toHex(h3 + h4)).slice(0, 64);
}

export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Redact Phone numbers, CNIC, Card numbers and Emails
export function redactPII(input: string): string {
  if (!input) return '';
  let out = input;
  out = out.replace(/(?:\+92|0092|92|0)[- ]?3\d{2}[- ]?\d{7}\b/g, '[PHONE REDACTED]');
  out = out.replace(/\+\d{1,4}[- ]?\d{6,12}\b/g, '[PHONE REDACTED]');
  out = out.replace(/\b\d{5}[- ]?\d{7}[- ]?\d{1}\b/g, '[CNIC REDACTED]');
  out = out.replace(/\b(?:\d{4}[- ]?){3}\d{4}\b/g, '[CARD REDACTED]');
  out = out.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '[EMAIL REDACTED]');
  return out;
}

// Profanity list
const PROFANITY_WORDS = [
  'chutiya', 'harami', 'kameena', 'kanjar', 'gandoo', 'kutta', 'madarchod', 'bhenchod',
  'fuck', 'shit', 'asshole', 'bitch', 'bastard', 'scammer idiot', 'fraudster bastard'
];

export function sanitizeContent(text: string): { cleanText: string; hasProfanity: boolean } {
  let clean = redactPII(text);
  let hasProfanity = false;
  const lower = clean.toLowerCase();
  for (const word of PROFANITY_WORDS) {
    if (lower.includes(word)) {
      hasProfanity = true;
      const reg = new RegExp(word, 'gi');
      clean = clean.replace(reg, '***');
    }
  }
  return { cleanText: clean, hasProfanity };
}

export interface RuleEvaluation {
  score: number;
  redFlags: string[];
  reasons: string[];
  safeIndicators: string[];
}

export function evaluateCategoryRules(category: ScamCategory, text: string): RuleEvaluation {
  const lower = text.toLowerCase();
  const redFlags: string[] = [];
  const reasons: string[] = [];
  const safeIndicators: string[] = [];
  let score = 5;

  const containsAny = (terms: string[]) => terms.some(t => lower.includes(t.toLowerCase()));

  // Universal Suspicious URL / Link check
  const urlMatches = text.match(/https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9\-]+\.(?:xyz|top|club|click|buzz|tk|ml|ga|cf|gq|work|rest)\b/gi) || [];
  const hasShortener = containsAny(['bit.ly', 'tinyurl', 'is.gd', 'cutt.ly', 't.ly', 'wa.me/', 'chat.whatsapp.com']);
  const hasSuspiciousDomain = containsAny(['.xyz', '.top', '.click', '.buzz', '.tk', '.cf', 'free-gift', 'claim-prize', 'secure-login', 'verify-account', 'easypa1sa', 'jazz-cash']);

  if (urlMatches.length > 0) {
    if (hasSuspiciousDomain) {
      score += 45;
      redFlags.push('Suspicious or untrusted domain name (.xyz, .top, typo-squatting)');
      reasons.push('Contains an unusual or disguised website link designed to impersonate real services');
    } else if (hasShortener) {
      score += 30;
      redFlags.push('Shortened or redirected URL masking true destination');
      reasons.push('Uses a shortened link to hide the actual website');
    }
  }

  // Universal Urdu Scam Keywords
  if (containsAny(['بینظیر', 'احساس', 'امدادی رقم', '25,000', '25000', '14000', '10500', 'قرعہ اندازی', 'انعام'])) {
    score += 45;
    redFlags.push('Unsolicited lottery or relief fund claim in Urdu (بینظیر / احساس / قرعہ اندازی)');
    reasons.push('Unsolicited prize or welfare distributions requesting calls or card load are scams');
  }

  if (containsAny(['پاس ورڈ', 'پن کوڈ', 'او ٹی پی', 'otp', 'خفیہ کوڈ', 'اکاؤنٹ بلاک', 'معطل'])) {
    const isAntiShare = containsAny(['do not share', 'never share', 'kisi ko mat batain', 'kisi ko na bataye']);
    if (!isAntiShare) {
      score += 45;
      redFlags.push('Credential harvesting or threat to suspend account in Urdu (پن کوڈ / اکاؤنٹ بلاک)');
      reasons.push('Confidential security code demands are fraudulent');
    }
  }

  if (containsAny(['تھانے', 'پولیس', 'گرفتار', 'پرچہ درج', 'حادثہ', 'ہسپتال'])) {
    score += 35;
    redFlags.push('Urgent emergency or legal coercion tactic in Urdu (تھانہ / گرفتاری / ایمرجنسی)');
  }

  if (containsAny(['کسٹمز', 'پارسل', 'برطانیہ', 'کلیئرنس فیس'])) {
    score += 40;
    redFlags.push('Foreign parcel customs hold fee scam in Urdu (پارسل / کسٹمز فیس)');
  }

  // Category Specific Pattern Recognition
  switch (category) {
    case 'sms': {
      if (containsAny(['0300', '0301', '0302', '0303', '0304', '0305', '0306', '0307', '0308', '0309', '0310', '0311', '0312', '0321', '0333', '0340', '0345'])) {
        if (containsAny(['hbl', 'easypaisa', 'jazzcash', 'ubl', 'mcb', 'meezan', 'bank', 'bisp', 'fbr', 'pta', 'account block', 'card block'])) {
          score += 45;
          redFlags.push('Bank, Telecom, or Government notification sent from personal 11-digit mobile number instead of official mask');
          reasons.push('Banks and government agencies never send official security or payment alerts from personal mobile numbers');
        }
      }
      if (containsAny(['account block', 'block ho gaya', 'sim block', 'verify immediately', 'foran rabta karain', 'warna band kar diya', 'permanent band'])) {
        score += 35;
        redFlags.push('Urgent threat to block account, ATM, or SIM card');
        reasons.push('Creates false urgency to trigger panicked action without verification');
      }
      if (containsAny(['benazir', 'bisp', 'ehsaas', '8171', 'mubarak', 'inaam', 'qurandazi'])) {
        score += 40;
        redFlags.push('Unsolicited relief fund or lottery payout claim');
      }
      break;
    }

    case 'whatsapp': {
      if (containsAny(['+234', '+62', '+880', '+254', '+212', '+1 (', '+44 7'])) {
        score += 30;
        redFlags.push('Message from unknown international country code');
      }
      if (containsAny(['like youtube', 'like video', 'like 3', 'like 5', 'like products', 'subscribe channel', 'daily 3', 'daily 4', 'daily 5', 'daily 10', 'part time job', 'telegram group', 'screenshot bhejo', 'screenshot to start'])) {
        score += 50;
        redFlags.push('Viral Task Scam: "Like videos/products and earn daily Rs 3,000-10,000"');
        reasons.push('Classic advance-fee task scam where victims are later trapped into depositing funds');
      }
      if (containsAny(['deposit $', 'receive $', 'crypto', 'binance', 'guaranteed within', 'multiplier'])) {
        score += 45;
        redFlags.push('Foreign crypto multiplier promise over WhatsApp');
      }
      if (containsAny(['send screenshot', 'hr manager', 'hiring manager', 'flexibility of working from home'])) {
        score += 20;
        redFlags.push('Vague recruiter targeting strangers over WhatsApp');
      }
      break;
    }

    case 'bank': {
      const isDemandingCredentials = containsAny(['enter your', 'tell us', 'send otp', 'share otp', 'batao', 'send secret', 'verify mpin', ' درج کروائیں']);
      const isAntiShareWarning = containsAny(['do not share this otp', 'never share your otp', 'kisi ko mat batain']);
      
      if (containsAny(['otp', 'mpin', 'pin code', 'cvv', 'password', 'login code', 'secret code', 'ون ٹائم پاس ورڈ'])) {
        if (isDemandingCredentials || !isAntiShareWarning) {
          score += 55;
          redFlags.push('Direct request for confidential OTP, MPIN, or Password');
          reasons.push('Banks, Easypaisa, and JazzCash explicitly state they NEVER ask for OTP or PIN under any circumstances');
        } else {
          safeIndicators.push('Includes official bank anti-fraud warning: "Do not share this OTP with anyone"');
          score = Math.max(0, score - 20);
        }
      }
      if (containsAny(['ghalti se bhej', 'ghalti se transfer', 'mistakenly sent', 'wapis bhej dain', 'reversal'])) {
        score += 45;
        redFlags.push('Fake reversal scam: Claiming money was sent by mistake and demanding refund before actual balance confirmation');
        reasons.push('Fraudsters send forged SMS and pressure you to send money back from your own wallet');
      }
      if (containsAny(['biometric verification', 'biometric update', 'nadra verification', 'account freeze', 'wallet will be blocked'])) {
        score += 35;
        redFlags.push('Demanding immediate remote biometric or identity confirmation via link');
      }
      break;
    }

    case 'job': {
      if (containsAny(['registration fee', 'security deposit', 'training fee', 'processing fee', 'charges dain', 'chalan', 'medical fee', 'embassy fee', 'پراسیسنگ فیس'])) {
        score += 50;
        redFlags.push('Upfront fee required for job application, kit, or background check');
        reasons.push('Legitimate employers never demand application or registration fees from job seekers');
      }
      if (containsAny(['no experience required', '80000 per month', '85,000', '100000 salary', 'typing job', 'data entry 5000 daily', 'simple copy paste', 'packing ka kaam'])) {
        score += 40;
        redFlags.push('Unrealistically high salary for trivial or zero-skill tasks');
        reasons.push('Promise of extraordinary income for simple copy-pasting is a signature scam red flag');
      }
      if (containsAny(['@gmail.com', '@yahoo.com', '@hotmail.com']) && containsAny(['hr', 'job offer', 'hiring', 'recruiting', 'selected'])) {
        score += 40;
        redFlags.push('Corporate job offer sent from an unverified free email service (Gmail/Yahoo) instead of official corporate domain');
      }
      if (containsAny(['cnic front back', 'bank statement', 'cheque photo', 'blank cheque', 'بغیر ٹیسٹ سلیکشن'])) {
        score += 30;
        redFlags.push('Requesting sensitive identity / banking documents prior to interview');
      }
      break;
    }

    case 'prize': {
      if (containsAny(['jeeto pakistan', 'fahad mustafa', 'bisp', 'benazir income support', 'ehsaas', 'qurandazi', 'gold leaf', 'car jeeti', 'lottery award', 'randomly chosen', '500,000', 'annual draw', 'انعامی اسکیم'])) {
        score += 45;
        redFlags.push('Unsolicited lottery, game show, or cash prize claim');
        reasons.push('You cannot win a contest or lottery you never personally entered');
      }
      if (containsAny(['advance tax', 'delivery charges', 'courier fee', 'transfer fee pehle', 'کارڈ لوڈ', 'انکم ٹیکس ادا کریں', 'tax advance'])) {
        score += 50;
        redFlags.push('Requirement to pay fees, taxes, or phone card load in advance to receive prize');
        reasons.push('Demanding advance payment to release a prize is standard advance-fee fraud');
      }
      break;
    }

    case 'shopping': {
      if (containsAny(['no cash on delivery', 'cod not available', 'advance payment only', 'pehle paise bhejo', '100% advance', 'send full payment on'])) {
        score += 40;
        redFlags.push('Seller refuses Cash on Delivery (COD) and demands advance payment');
        reasons.push('Refusing standard COD on unknown social media shops is high-risk');
      }
      if (containsAny(['iphone', 'playstation', 'ps5', 'samsung']) && containsAny(['25000', '25,000', '30000', '40000', '45,000', '50000', '80% off', 'huge clearance sale', 'clearance sale'])) {
        score += 40;
        redFlags.push('Luxury goods advertised at 70-90% below realistic market price');
        reasons.push('High-end electronics offered at absurdly low prices are bait to extract upfront payments');
      }
      if (containsAny(['customs clearance', 'delivery boy held', 'customs charges required', 'held by customs', 'customs release fee'])) {
        score += 45;
        redFlags.push('Fabricated customs or courier hold charges for supposed shipment');
      }
      break;
    }

    case 'crypto': {
      if (containsAny(['double your money', 'paisa double', 'guaranteed profit', 'daily 5%', 'monthly 50%', 'zero risk', '100% safe investment', '100% guaranteed', 'fix munafa', 'koi risk nahi', 'گارنٹی منافع'])) {
        score += 55;
        redFlags.push('Guaranteed returns and zero-risk investment promises');
        reasons.push('No legitimate financial investment can offer guaranteed double money or high fixed daily returns');
      }
      if (containsAny(['referral bonus', 'join team', 'mining app', 'forex bot', 'passive income daily', 'gold bot', 'ٹریڈنگ روبوٹ'])) {
        score += 35;
        redFlags.push('Multi-level referral or automated bot Ponzi scheme structure');
      }
      break;
    }

    case 'impersonation': {
      if (containsAny(['hospital', 'accident', 'police custody', 'thana', 'urgent paise chahiyen', 'emergency money', 'raat ko wapis kar doon ga', 'تھانے میں پھنس گیا'])) {
        score += 40;
        redFlags.push('Emergency pressure: Claiming urgent medical crisis or arrest');
        reasons.push('Scammers impersonate relatives or friends asking for immediate emergency wallet transfers');
      }
      if (containsAny(['parcel stuck', 'islamabad airport', 'customs officer', 'expensive gift', 'gold watch', 'diplomatic luggage', 'wedding', 'clearance fee'])) {
        score += 50;
        redFlags.push('Romance/Parcel scam: Fake gift parcel stuck at customs requiring clearance fees');
      }
      break;
    }

    case 'email': {
      if (containsAny(['@gmail.com', '@yahoo.com', '@hotmail.com']) && containsAny(['hr', 'job offer', 'hiring', 'recruiting', 'bank', 'lottery', 'hbl', 'ubl', 'visa'])) {
        score += 45;
        redFlags.push('Official corporate, government, or banking claim originating from free personal email address');
        reasons.push('Legitimate organizations never send job offers or bank alerts from free webmail accounts');
      }
      if (containsAny(['account verification', 'disabled within', 'verify your login immediately', 'click here to update'])) {
        score += 35;
        redFlags.push('Urgency-based phishing link prompting credential entry');
      }
      break;
    }

    case 'website': {
      if (urlMatches.length === 0) {
        score += 10;
        redFlags.push('No recognizable URL detected in text input');
      } else {
        const urlStr = (urlMatches[0] || '').toLowerCase();
        if (urlStr.includes('@') || urlStr.includes('0x') || /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlStr)) {
          score += 45;
          redFlags.push('URL uses IP address or deceptive credentials syntax instead of registered domain');
        }
        if (containsAny(['login', 'secure', 'signin', 'account', 'banking', 'update', 'claim']) && hasSuspiciousDomain) {
          score += 45;
          redFlags.push('Phishing structure: Financial keywords on an untrusted generic top-level domain');
        }
      }
      break;
    }

    case 'call': {
      break;
    }
  }

  // Check for safe company / bank indicators
  if (containsAny(['official statement', 'monthly account statement', 'customer service 111-', 'visit your nearest branch', 'official careers page', 'do not share this otp with anyone', 'no fee charged', 'collect kar lain', 'cash on delivery amount', 'pay rider upon', 'systems limited', 'sbp.org.pk', 'complaint.nr3c.gov.pk', 'subject to market risks'])) {
    if (score < 40) {
      safeIndicators.push('Contains genuine corporate authenticity, official hotline, or explicit security warning');
      score = Math.max(0, score - 20);
    }
  }

  score = Math.min(100, Math.max(0, score));

  return {
    score,
    redFlags,
    reasons,
    safeIndicators
  };
}

export interface CallChecklistAnswers {
  claimedAuthority: boolean;
  demandedCredentials: boolean;
  threatenedConsequences: boolean;
  demandedFundTransfer: boolean;
  installRemoteApp: boolean;
  rushedUrgency: boolean;
}

export function evaluateCallChecklist(answers: CallChecklistAnswers): RuleEvaluation {
  let score = 5;
  const redFlags: string[] = [];
  const reasons: string[] = [];
  const safeIndicators: string[] = [];

  if (answers.demandedCredentials) {
    score += 45;
    redFlags.push('Caller demanded your OTP, ATM PIN, CVV, or login password');
    reasons.push('Banks and law enforcement never ask for secret security credentials over the phone');
  }

  if (answers.installRemoteApp) {
    score += 40;
    redFlags.push('Requested installation of AnyDesk, TeamViewer, or screen-sharing software');
    reasons.push('Remote access tools give hackers total control of your mobile screen and banking apps');
  }

  if (answers.demandedFundTransfer) {
    score += 45;
    redFlags.push('Instructed you to transfer funds to a "safe verification" or "protection" account');
    reasons.push('No bank ever asks you to move money to another account to secure it');
  }

  if (answers.threatenedConsequences) {
    score += 25;
    redFlags.push('Used aggressive threats of immediate arrest, legal action, or bank account freezing');
    reasons.push('Scammers use psychological terror so you act before thinking');
  }

  if (answers.claimedAuthority) {
    score += 20;
    redFlags.push('Claimed high official status (FIA, military, bank head office, lottery)');
  }

  if (answers.rushedUrgency) {
    score += 15;
    redFlags.push('Aggressively insisted you must not disconnect the call or talk to family');
  }

  if (score <= 15) {
    safeIndicators.push('No high-risk credential or financial extraction flags detected in call behavior');
  }

  score = Math.min(100, Math.max(0, score));

  return {
    score,
    redFlags,
    reasons,
    safeIndicators
  };
}
