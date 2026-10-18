import { CREATOR_CONFIG } from './creator';

/**
 * Central Configuration for 360 ScamShield AI
 */
export const APP_CONFIG = {
  appName: '360 ScamShield AI',
  tagline: "Pakistan's Scam Detection & Community Fraud Prevention Shield",
  
  // Creator Information
  creatorName: CREATOR_CONFIG.name,
  creatorContactUrl: CREATOR_CONFIG.linkedinUrl,
  adminEmail: CREATOR_CONFIG.email,
  githubUrl: CREATOR_CONFIG.githubUrl,
  facebookUrl: CREATOR_CONFIG.facebookUrl,

  // Official Pakistani Cyber Crime & Fraud Reporting Authorities
  // Verification Note: Always confirm contact details on the official website.
  officialAgencies: [
    {
      id: 'fia-nr3c',
      nameEn: 'FIA National Response Centre for Cyber Crime (NR3C)',
      nameUr: 'ایف آئی اے سائبر کرائم ونگ (NR3C)',
      nameRoman: 'FIA Cyber Crime Wing (NR3C)',
      descriptionEn: 'The primary federal agency investigating financial fraud, hacking, OTP theft, and online extortion.',
      websiteUrl: 'https://complaint.nr3c.gov.pk/',
      helpline: '1991',
      smsCode: 'N/A',
      badge: 'Official Cyber Police'
    },
    {
      id: 'pta-cms',
      nameEn: 'Pakistan Telecommunication Authority (PTA)',
      nameUr: 'پاکستان ٹیلی کمیونیکیشن اتھارٹی (پی ٹی اے)',
      nameRoman: 'PTA Consumer Complaint Service',
      descriptionEn: 'Report fraudulent SIM cards, spam SMS, fake lottery text messages, and blocked IMEI/numbers.',
      websiteUrl: 'https://complaint.pta.gov.pk/RegisterComplaint.aspx',
      helpline: '0800-55055',
      smsCode: 'Forward spam SMS to 9005',
      badge: 'Telecom Authority'
    },
    {
      id: 'sbp-banking-mohtasib',
      nameEn: 'Banking Mohtasib Pakistan / SBP Fraud Cell',
      nameUr: 'بینکنگ محتسب پاکستان / اسٹیٹ بینک فراڈ سیل',
      nameRoman: 'Banking Mohtasib Pakistan / State Bank',
      descriptionEn: 'Statutory ombudsman resolving unauthorized bank fund transfers, digital wallet fraud, and bank disputes.',
      websiteUrl: 'https://www.bankingmohtasib.gov.pk/',
      helpline: '021-99217334-38',
      smsCode: 'N/A',
      badge: 'Banking Ombudsman'
    },
    {
      id: 'easypaisa-jazzcash',
      nameEn: 'Mobile Wallet Fraud Helplines (Easypaisa & JazzCash)',
      nameUr: 'ایزی پیسہ اور جاز کیش ہیلپ لائنز',
      nameRoman: 'Easypaisa & JazzCash Helplines',
      descriptionEn: 'Immediately freeze unauthorized wallet transfers: Easypaisa dial 3737, JazzCash dial 4444.',
      websiteUrl: 'https://easypaisa.com.pk/security-and-fraud-awareness/',
      helpline: '3737 (Easypaisa) / 4444 (JazzCash)',
      smsCode: 'N/A',
      badge: 'Fintech Wallets'
    }
  ]
};
