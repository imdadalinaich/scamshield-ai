import { ScamCategory } from '../src/lib/types';
import { CallChecklistAnswers } from '../src/lib/scam_rules';

export interface TestCase {
  id: number;
  category: ScamCategory;
  language: 'English' | 'Urdu' | 'Roman Urdu';
  isScam: boolean;
  content: string;
  callAnswers?: CallChecklistAnswers;
  description: string;
}

export const BENCHMARK_TEST_CASES: TestCase[] = [
  // --- SMS CATEGORY ---
  {
    id: 1,
    category: 'sms',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Aziz Sarif aap ka HBL ATM card block kar dia gaya hai. Verification k liye foran 0304-9876543 par call karain warna account permanent band ho jaye ga.',
    description: 'Fake ATM card block SMS from personal mobile'
  },
  {
    id: 2,
    category: 'sms',
    language: 'English',
    isScam: false,
    content: 'Dear Customer, your monthly account statement for September 2026 is ready. Log in to official HBL Mobile app or visit your nearest branch.',
    description: 'Genuine bank statement notice'
  },
  {
    id: 3,
    category: 'sms',
    language: 'Urdu',
    isScam: true,
    content: 'مبارک ہو! آپ کو بینظیر انکم سپورٹ پروگرام کی طرف سے 25,000 روپے کی مالی امداد منظور ہو چکی ہے۔ فوری 0312-3456789 پر رابطہ کریں۔',
    description: 'BISP 25,000 lottery scam in Urdu'
  },
  {
    id: 4,
    category: 'sms',
    language: 'English',
    isScam: false,
    content: 'Your Meezan Bank OTP for transaction of PKR 1,500 at Careem is 849201. Do not share this OTP with anyone, even bank staff.',
    description: 'Genuine OTP SMS with explicit anti-sharing warning'
  },
  {
    id: 5,
    category: 'sms',
    language: 'Roman Urdu',
    isScam: true,
    content: 'PTA alert: Aap ki SIM biometric register nahi hai. 24 ghante me sim block ho jaye gi. Foran bit.ly/sim-verify26 par click kar k update karain.',
    description: 'Fake PTA biometric verification link'
  },
  {
    id: 6,
    category: 'sms',
    language: 'English',
    isScam: true,
    content: 'Urgent: Package PK-8921 on hold due to missing address. Update now at http://pakpost-delivery.top/track to avoid return.',
    description: 'Fake postal tracking domain (.top)'
  },

  // --- WHATSAPP CATEGORY ---
  {
    id: 7,
    category: 'whatsapp',
    language: 'English',
    isScam: true,
    content: 'Hi! I am Victoria from TikTok Global HR. We are hiring remote assistants. Just like 3 YouTube videos and earn Rs 3,500 daily. Send screenshot to start.',
    description: 'Classic YouTube task daily earnings scam'
  },
  {
    id: 8,
    category: 'whatsapp',
    language: 'Roman Urdu',
    isScam: false,
    content: 'Salam Ali bhai! Kal subah 10 baje university project presentation hai. Slide deck check kar lena jo email pe bheji hai.',
    description: 'Normal university student conversation'
  },
  {
    id: 9,
    category: 'whatsapp',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Aap ko online part-time job offer ki ja rahi hai, daily 5000 se 10000 kama sakte hain bina kisi experience k. Telegram group join karain aur screenshot bhejo.',
    description: 'Roman Urdu task recruiter scam'
  },
  {
    id: 10,
    category: 'whatsapp',
    language: 'English',
    isScam: true,
    content: 'Hello, this is +2348012345678. I am investment manager at Binance VIP Crypto. Deposit $50 and receive $500 guaranteed within 2 hours.',
    description: 'Foreign WhatsApp crypto multiplier'
  },
  {
    id: 11,
    category: 'whatsapp',
    language: 'Urdu',
    isScam: true,
    content: 'السلام علیکم! آپ کے نام پر ایک قیمتی پارسل برطانیہ سے آیا ہے جس میں سونا اور کیش ہے۔ کسٹمز کلیئرنس فیس کے لیے فوری رابطہ کریں۔',
    description: 'Customs gift parcel romance scam in Urdu'
  },
  {
    id: 12,
    category: 'whatsapp',
    language: 'English',
    isScam: false,
    content: 'Hi Bilal, following up on our meeting yesterday. Please find the revised software specification document attached for your review.',
    description: 'Genuine professional follow-up message'
  },

  // --- PHONE CALL CATEGORY ---
  {
    id: 13,
    category: 'call',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Caller claimed to be State Bank manager demanding OTP or account will freeze today',
    callAnswers: {
      claimedAuthority: true,
      demandedCredentials: true,
      threatenedConsequences: true,
      demandedFundTransfer: false,
      installRemoteApp: false,
      rushedUrgency: true
    },
    description: 'Impersonating SBP demanding OTP with threats'
  },
  {
    id: 14,
    category: 'call',
    language: 'English',
    isScam: false,
    content: 'Bank credit card rep calling to inform about new discount promotion at supermarkets',
    callAnswers: {
      claimedAuthority: true,
      demandedCredentials: false,
      threatenedConsequences: false,
      demandedFundTransfer: false,
      installRemoteApp: false,
      rushedUrgency: false
    },
    description: 'Legitimate promotional bank marketing call'
  },
  {
    id: 15,
    category: 'call',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Caller asked to install AnyDesk on mobile phone to resolve banking app error',
    callAnswers: {
      claimedAuthority: true,
      demandedCredentials: false,
      threatenedConsequences: true,
      demandedFundTransfer: false,
      installRemoteApp: true,
      rushedUrgency: true
    },
    description: 'Remote access AnyDesk malware phone fraud'
  },
  {
    id: 16,
    category: 'call',
    language: 'Urdu',
    isScam: true,
    content: 'فوجی ہیڈکوارٹر سے کال کا دعویٰ، کہا کہ آپ کے اکاؤنٹ کی تصدیق کرنی ہے خفیہ پن کوڈ بتائیں۔',
    callAnswers: {
      claimedAuthority: true,
      demandedCredentials: true,
      threatenedConsequences: true,
      demandedFundTransfer: true,
      installRemoteApp: false,
      rushedUrgency: true
    },
    description: 'Military verification spoof asking for secret PIN'
  },
  {
    id: 17,
    category: 'call',
    language: 'English',
    isScam: false,
    content: 'Courier rider calling to confirm house street number for package delivery',
    callAnswers: {
      claimedAuthority: false,
      demandedCredentials: false,
      threatenedConsequences: false,
      demandedFundTransfer: false,
      installRemoteApp: false,
      rushedUrgency: false
    },
    description: 'Legitimate delivery rider street confirmation'
  },

  // --- EMAIL CATEGORY ---
  {
    id: 18,
    category: 'email',
    language: 'English',
    isScam: true,
    content: 'From: support@hbl-security-portal.xyz\nSubject: Account Verification Required\nDear Client, Your banking credentials will be disabled within 6 hours. Verify your login immediately at https://hbl-security-portal.xyz/login.',
    description: 'Bank phishing email with lookalike .xyz domain'
  },
  {
    id: 19,
    category: 'email',
    language: 'English',
    isScam: false,
    content: 'From: no-reply@ubldigital.com\nSubject: Your E-Statement for September 2026\nDear Customer, please find attached your password protected monthly account statement. Contact our 24/7 helpline 111-825-888 for queries.',
    description: 'Genuine bank e-statement with official domain'
  },
  {
    id: 20,
    category: 'email',
    language: 'English',
    isScam: true,
    content: 'From: hr-recruiting2026@gmail.com\nSubject: Job Offer at Shell Pakistan\nCongratulations! You have been selected. Send your CNIC copy, bank details, and Rs 4,500 training fee to proceed.',
    description: 'Fake corporate job offer from free Gmail address'
  },
  {
    id: 21,
    category: 'email',
    language: 'English',
    isScam: false,
    content: 'From: info@hec.gov.pk\nSubject: Higher Education Commission Scholarship Application Received\nDear Applicant, your application ref #HEC-92019 has been received. Track progress on the official portal.',
    description: 'Official government scholarship notification'
  },

  // --- WEBSITE / LINK CATEGORY ---
  {
    id: 22,
    category: 'website',
    language: 'English',
    isScam: true,
    content: 'http://easypa1sa-bonus-reward.buzz/claim?user=pakistan',
    description: 'Phishing domain mimicking Easypaisa with .buzz TLD'
  },
  {
    id: 23,
    category: 'website',
    language: 'English',
    isScam: false,
    content: 'https://www.sbp.org.pk/press/2026/Pr-Sep.pdf',
    description: 'Official State Bank of Pakistan press release URL'
  },
  {
    id: 24,
    category: 'website',
    language: 'English',
    isScam: true,
    content: 'http://192.168.1.105:8080/secure-jazzcash-update.html',
    description: 'Raw IP address disguised as JazzCash security portal'
  },
  {
    id: 25,
    category: 'website',
    language: 'English',
    isScam: false,
    content: 'https://complaint.nr3c.gov.pk/',
    description: 'Official FIA Cyber Crime complaint portal'
  },

  // --- FAKE JOB OFFER CATEGORY ---
  {
    id: 26,
    category: 'job',
    language: 'English',
    isScam: true,
    content: 'Online Typing & Copy Paste Job: Earn Rs 85,000/month working 2 hours a day from home. No qualifications required. Pay Rs 2,000 registration fee for employee kit.',
    description: 'Classic upfront registration fee typing job scam'
  },
  {
    id: 27,
    category: 'job',
    language: 'English',
    isScam: false,
    content: 'Software Engineer vacancy at Systems Limited. Requirements: 2+ years React & Node.js experience. Apply through our official careers page at systems.com/careers. No fee charged.',
    description: 'Legitimate software engineering job posting'
  },
  {
    id: 28,
    category: 'job',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Ghar bethe packing ka kaam karain. Daily 4,000 kamayein. Saman delivery se pehle security deposit 3500 Easypaisa karwana ho ga.',
    description: 'Advance security deposit home packing scam'
  },
  {
    id: 29,
    category: 'job',
    language: 'Urdu',
    isScam: true,
    content: 'سرکاری نوکری کا اشتہار: واپڈا میں گریڈ 14 کی خالی اسامیاں۔ بغیر ٹیسٹ سلیکشن کے لیے 5000 پراسیسنگ فیس ایزی پیسہ کریں۔',
    description: 'Fake WAPDA job without exam demanding processing fee'
  },
  {
    id: 30,
    category: 'job',
    language: 'English',
    isScam: false,
    content: 'Internship Opportunity: 6-week summer program at National Bank of Pakistan for business graduates. Visit nbp.com.pk/careers for eligibility criteria.',
    description: 'Official bank internship posting'
  },

  // --- PAYMENT / WALLET / BANK CATEGORY ---
  {
    id: 31,
    category: 'bank',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Bhai ghalti se aap k Easypaisa account me 20000 transfer ho gaye hain, bache ki dawai leni thi khuda k liye wapis bhej dain.',
    description: 'Fake reversal scam with forged SMS'
  },
  {
    id: 32,
    category: 'bank',
    language: 'Roman Urdu',
    isScam: false,
    content: 'Easypaisa alert: Aap ne Rs 500 ka mobile load kamyabi se kar lia hai. Baki balance Rs 4,200 hai. Shukriya.',
    description: 'Standard Easypaisa mobile load success SMS'
  },
  {
    id: 33,
    category: 'bank',
    language: 'English',
    isScam: true,
    content: 'Easypaisa Security: Enter your 5-digit secret MPIN to verify biometric status or your wallet will be blocked within 2 hours.',
    description: 'MPIN harvesting phishing attempt'
  },
  {
    id: 34,
    category: 'bank',
    language: 'Urdu',
    isScam: true,
    content: 'جاز کیش: آپ کے اکاؤنٹ کی تصدیق کے لیے ون ٹائم پاس ورڈ (OTP) درج کروائیں۔ عملہ کبھی پاس ورڈ نہیں مانگتا اس لیے خفیہ رکھیں لیکن تصدیق کے لیے ہمیں بتائیں۔',
    description: 'Paradoxical phishing SMS tricking user into giving OTP'
  },
  {
    id: 35,
    category: 'bank',
    language: 'English',
    isScam: false,
    content: 'JazzCash Notification: You received PKR 2,500 from AHMAD KHAN (0300****123). Updated balance PKR 8,900. Transaction ID: 9812401823.',
    description: 'Authentic JazzCash fund receipt notification'
  },

  // --- PRIZE / LOTTERY / RELIEF CATEGORY ---
  {
    id: 36,
    category: 'prize',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Jeeto Pakistan ki taraf se mubarak ho! Aap ki SIM par Corolla car aur 5 tola sona nikla hai. Delivery tax 15000 pehle jama karwayen.',
    description: 'Jeeto Pakistan advance delivery tax scam'
  },
  {
    id: 37,
    category: 'prize',
    language: 'English',
    isScam: true,
    content: 'Google Lottery Award: Your email was randomly chosen to receive £500,000 in the UK annual draw. Send your passport and bank details to claim.',
    description: 'Classic international email lottery scam'
  },
  {
    id: 38,
    category: 'prize',
    language: 'Urdu',
    isScam: true,
    content: 'احساس کفالت پروگرام: آپ کے نام پر 14,000 روپے کی قسط آچکی ہے۔ رقم نکلوانے کے لیے اس نمبر پر 1000 روپے کارڈ لوڈ بھیجیں۔',
    description: 'Ehsaas program prepaid card load scam'
  },
  {
    id: 39,
    category: 'prize',
    language: 'Roman Urdu',
    isScam: false,
    content: 'Aap ne quiz competition me 3rd position hasil ki hai. Apna certificate university admin office se collect kar lain.',
    description: 'Legitimate academic quiz certificate notice'
  },

  // --- ONLINE SHOPPING / MARKETPLACE CATEGORY ---
  {
    id: 40,
    category: 'shopping',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Brand new iPhone 15 Pro Max box pack sirf 45,000 rupay me. No cash on delivery, 100% advance payment Easypaisa me karain foran dispatch ho ga.',
    description: 'Advance payment only unrealistically cheap iPhone'
  },
  {
    id: 41,
    category: 'shopping',
    language: 'English',
    isScam: false,
    content: 'Daraz Order #892174 has been dispatched via TCS. Cash on delivery amount PKR 1,850. Pay rider upon package arrival.',
    description: 'Legitimate Cash on Delivery ecommerce order'
  },
  {
    id: 42,
    category: 'shopping',
    language: 'English',
    isScam: true,
    content: 'Your order delivery is held by customs. Pay courier customs release fee PKR 3,500 immediately to release your parcel.',
    description: 'Fabricated courier customs clearance fee'
  },
  {
    id: 43,
    category: 'shopping',
    language: 'Roman Urdu',
    isScam: false,
    content: 'Daraz seller: Bhai aap ka order confirm ho gaya hai, kal tak TCS courier rider aap ke ghar deliver kar de ga.',
    description: 'Normal seller confirmation message'
  },

  // --- INVESTMENT / CRYPTO CATEGORY ---
  {
    id: 44,
    category: 'crypto',
    language: 'English',
    isScam: true,
    content: 'Double your money in just 7 days! 100% guaranteed profit with AI crypto trading bot. Zero risk, daily withdrawals. Join our VIP Telegram channel.',
    description: 'Guaranteed double money crypto scheme'
  },
  {
    id: 45,
    category: 'crypto',
    language: 'Roman Urdu',
    isScam: true,
    content: 'New mining app launch hui hai. Sirf 10,000 lagao aur daily 1,000 rupay fixed munafa kamao. Team banao aur referral bonus pao.',
    description: 'Ponzi cloud mining referral scam'
  },
  {
    id: 46,
    category: 'crypto',
    language: 'English',
    isScam: false,
    content: 'Pakistan Stock Exchange (PSX) notice: Market trading summary for today. Mutual funds investments are subject to market risks, read offering documents carefully.',
    description: 'Official stock market advisory with proper risk disclosure'
  },
  {
    id: 47,
    category: 'crypto',
    language: 'Urdu',
    isScam: true,
    content: 'گھر بیٹھے ڈالرز کمائیں! روزانہ 100 ڈالر گارنٹی منافع۔ ہمارے ٹریڈنگ روبوٹ میں 200 ڈالر انویسٹ کریں اور روزانہ رقم نکالیں۔',
    description: 'Guaranteed daily dollar profit scam in Urdu'
  },

  // --- IMPERSONATION / ROMANCE / EMERGENCY CATEGORY ---
  {
    id: 48,
    category: 'impersonation',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Bhai mera hospital me emergency accident ho gaya hai, thane walon ne pakra hua hai foran 25,000 Easypaisa karwao raat ko wapis kar doon ga kisi ko mat batana.',
    description: 'Fake family accident/police custody emergency scam'
  },
  {
    id: 49,
    category: 'impersonation',
    language: 'English',
    isScam: true,
    content: 'Hello my dear, I sent a diplomatic luggage with $1.5M from London for our future wedding. It is detained at Islamabad airport, please pay $1,200 clearance fee.',
    description: 'Diplomatic consignment romance fraud'
  },
  {
    id: 50,
    category: 'impersonation',
    language: 'English',
    isScam: false,
    content: 'Hi Dad, I reached the university hostel safely. I will call you after my evening classes.',
    description: 'Genuine family check-in message'
  },
  {
    id: 51,
    category: 'impersonation',
    language: 'Urdu',
    isScam: true,
    content: 'امی میں پولیس تھانے میں پھنس گیا ہوں، انہوں نے میرا موبائل چھینا ہوا ہے، جلدی اس نمبر پر 30,000 روپے بھیج دیں ورنہ پرچہ درج ہو جائے گا۔',
    description: 'Urgent fake arrest panicking parent'
  },

  // --- ADDITIONAL MULTI-LANGUAGE TEST CASES (52 to 64) ---
  {
    id: 52,
    category: 'sms',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Bank Alert: Aziz sarif aap ka HBL account block ho gaya hai foran 0340-1234567 par rabta karain warna account band.',
    description: 'Repeated variation bank block SMS'
  },
  {
    id: 53,
    category: 'bank',
    language: 'Roman Urdu',
    isScam: false,
    content: 'Aap k account se utility bill PKR 3,450 ka ada kar dia gaya hai. Bill reference 1823901.',
    description: 'Utility bill payment confirmation'
  },
  {
    id: 54,
    category: 'whatsapp',
    language: 'English',
    isScam: true,
    content: 'Hi! Like 5 products on Amazon and earn daily 4000 PKR. Daily payouts. Click wa.me/923001234567 to register.',
    description: 'Amazon product rating task scam'
  },
  {
    id: 55,
    category: 'whatsapp',
    language: 'Urdu',
    isScam: false,
    content: 'السلام علیکم، کل کی میٹنگ کا وقت تبدیل ہو کر دوپہر 3 بجے ہو گیا ہے۔ براہ کرم وقت پر تشریف لائیں۔',
    description: 'Genuine office meeting reschedule message'
  },
  {
    id: 56,
    category: 'job',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Canada work visa offer letter confirmed. Pay embassy medical fee Rs 35,000 into agent personal JazzCash account.',
    description: 'Fake foreign work visa advance medical fee'
  },
  {
    id: 57,
    category: 'job',
    language: 'English',
    isScam: false,
    content: 'Thank you for interviewing with Systems Limited. Our talent team will share the final assessment outcome by Friday.',
    description: 'Genuine corporate interview follow-up'
  },
  {
    id: 58,
    category: 'prize',
    language: 'Urdu',
    isScam: true,
    content: 'قرعہ اندازی مبارک! آپ کا نام خصوصی انعامی اسکیم میں نکل آیا ہے۔ انعام وصول کرنے کے لیے فوری انکم ٹیکس ادا کریں۔',
    description: 'Lottery tax demand scam in Urdu'
  },
  {
    id: 59,
    category: 'website',
    language: 'English',
    isScam: true,
    content: 'http://hbl-internetbanking-verification.click/login',
    description: 'Phishing domain using .click'
  },
  {
    id: 60,
    category: 'website',
    language: 'English',
    isScam: false,
    content: 'https://www.hbl.com/personal/cards/credit-cards',
    description: 'Official HBL bank HTTPS website'
  },
  {
    id: 61,
    category: 'crypto',
    language: 'Roman Urdu',
    isScam: true,
    content: 'Forex automated gold bot: Rozana 10% fix munafa. Koi risk nahi, foran deposit karain.',
    description: 'No-risk gold trading bot scam'
  },
  {
    id: 62,
    category: 'call',
    language: 'English',
    isScam: true,
    content: 'Caller claimed to be cyber police investigating your CNIC for money laundering, demanding immediate money transfer to a safe bond account',
    callAnswers: {
      claimedAuthority: true,
      demandedCredentials: false,
      threatenedConsequences: true,
      demandedFundTransfer: true,
      installRemoteApp: false,
      rushedUrgency: true
    },
    description: 'Money laundering extortion call demanding funds transfer'
  },
  {
    id: 63,
    category: 'sms',
    language: 'English',
    isScam: false,
    content: 'Your ride with Yango is arriving in 3 minutes. Toyota Corolla ABC-123. Driver: Tariq.',
    description: 'Authentic ride hailing driver arrival SMS'
  },
  {
    id: 64,
    category: 'shopping',
    language: 'English',
    isScam: true,
    content: 'Clearance sale! PS5 console only Rs 25,000. Send full payment on 0311-9876543 via Easypaisa. Delivery in 24 hours.',
    description: 'Fake electronics social media shop'
  }
];
