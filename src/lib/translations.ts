import { SupportedLanguage, ScamCategory } from './types';

export const TRANSLATIONS: Record<SupportedLanguage, {
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  startScan: string;
  chooseCategory: string;
  checking: string;
  safeVerdict: string;
  suspiciousVerdict: string;
  scamVerdict: string;
  notSureVerdict: string;
  listenAudio: string;
  shareWarning: string;
  copiedWarning: string;
  wasResultCorrect: string;
  yesCorrect: string;
  noIncorrect: string;
  feedbackRecorded: string;
  uploadScreenshot: string;
  dragOrBrowse: string;
  voiceInput: string;
  listening: string;
  callChecklistTitle: string;
  disclaimerText: string;
  community: string;
  quiz: string;
  reportAuthorities: string;
  myChecks: string;
  adminPanel: string;
  signIn: string;
  signOut: string;
  guest: string;
  cookieSettings: string;
  categories: Record<ScamCategory, { title: string; subtitle: string; tip: string; placeholder: string; example: string }>;
}> = {
  en: {
    tagline: "Pakistan's AI Scam Defense & Community Warning Shield",
    heroTitle: "Stop Scams Before You Lose Money",
    heroSubtitle: "Analyze suspicious SMS, WhatsApp messages, bank calls, job offers, and payment reversals using Gemini AI & Pakistan's scam intelligence rules.",
    startScan: "Check Threat Now",
    chooseCategory: "Select Scam Threat Category",
    checking: "Shield analyzing threat signals...",
    safeVerdict: "Likely Safe",
    suspiciousVerdict: "Suspicious Warning",
    scamVerdict: "High Risk / Likely Scam",
    notSureVerdict: "Not Sure / Inconclusive",
    listenAudio: "Read Aloud",
    shareWarning: "Share Warning on WhatsApp",
    copiedWarning: "Warning copied to clipboard!",
    wasResultCorrect: "Was this analysis accurate?",
    yesCorrect: "Yes, Accurate",
    noIncorrect: "No, Inaccurate",
    feedbackRecorded: "Thank you! Your feedback helps train future protection.",
    uploadScreenshot: "Upload Screenshot (OCR)",
    dragOrBrowse: "Drop screenshot here or click to browse",
    voiceInput: "Voice Dictate",
    listening: "Listening... speak now",
    callChecklistTitle: "Suspicious Call Questionnaire",
    disclaimerText: "This is AI-assisted guidance, not a guarantee. Always verify with the official company or bank. The creator is not responsible for decisions made from this result.",
    community: "Community Board",
    quiz: "Spot the Scam Quiz",
    reportAuthorities: "Where to Report",
    myChecks: "My Checks History",
    adminPanel: "Admin Moderation",
    signIn: "Sign in with Google",
    signOut: "Sign Out",
    guest: "Guest Mode",
    cookieSettings: "Cookie Settings",
    categories: {
      sms: {
        title: "SMS / Text Message",
        subtitle: "Bank alerts, PTA blocks, lottery SMS",
        tip: "Official banks use alphanumeric masks (e.g. HBL, 8484). Never trust bank alerts from 11-digit personal numbers (0300...).",
        placeholder: "Paste SMS text (e.g., 'Aziz Sarif aap ka ATM card block ho gaya hai...')",
        example: "Aziz Sarif aap ka HBL ATM card block kar dia gaya hai. Verification k liye foran 0304-9876543 par call karain warna account permanent band ho jaye ga."
      },
      whatsapp: {
        title: "WhatsApp Message",
        subtitle: "Task scams, like videos, foreign numbers",
        tip: "Foreign country codes (+234, +62, +1) offering daily Rs 3,000-5,000 for liking videos are guaranteed advance-fee task scams.",
        placeholder: "Paste WhatsApp text or chat invite here...",
        example: "Hello dear, I am HR manager from TikTok marketing. Work 1 hour daily, like 3 videos, earn Rs 4,500 daily. Send screenshot to start."
      },
      call: {
        title: "Phone Call Checklist",
        subtitle: "Caller demanding OTP, PIN, or AnyDesk",
        tip: "No bank officer, police officer, or military person is ever authorized to ask for your OTP, PIN, or to install AnyDesk/TeamViewer.",
        placeholder: "Additional caller notes (optional)...",
        example: "Caller claimed to be State Bank manager demanding OTP to prevent account freeze."
      },
      email: {
        title: "Email & Phishing",
        subtitle: "Fake corporate jobs, bank statements",
        tip: "Check sender address carefully. Legitimate companies never send official job offers or security notices from @gmail.com or @yahoo.com.",
        placeholder: "Paste email sender, subject, and body text...",
        example: "From: hr-recruiting@gmail.com\nSubject: Shell Pakistan Job Offer\nCongratulations! Send CNIC and Rs 4,500 training fee."
      },
      website: {
        title: "Website / Link",
        subtitle: "URL text analysis without visiting",
        tip: "We analyze URL structure safely without visiting it. Beware of .xyz, .top, .buzz, or raw IP addresses masquerading as banks.",
        placeholder: "Paste URL only (e.g., http://easypa1sa-claim.xyz)",
        example: "http://easypa1sa-bonus-reward.buzz/claim?user=pakistan"
      },
      job: {
        title: "Fake Job Offer",
        subtitle: "Registration fee, typing jobs, no interview",
        tip: "Any employer asking for 'registration fee', 'training charges', or 'kit deposit' before hiring is committing advance-fee fraud.",
        placeholder: "Describe the job offer, salary, and requirements...",
        example: "Work from home copy paste data entry. Earn Rs 85,000 monthly. Pay Rs 2,500 registration deposit for software access."
      },
      bank: {
        title: "Payment / Wallet / Bank",
        subtitle: "Easypaisa, JazzCash, OTP theft, reversals",
        tip: "Never refund money based on an SMS notification. Always open your official banking app to verify actual received balance first.",
        placeholder: "Paste payment notification or message received...",
        example: "Bhai ghalti se aap k Easypaisa account me 20000 transfer ho gaye hain, bache ki dawai leni thi khuda k liye wapis bhej dain."
      },
      prize: {
        title: "Prize / Lottery / Relief",
        subtitle: "BISP 25k, Jeeto Pakistan, Ehsaas",
        tip: "You cannot win a lottery you never bought a ticket for. Government relief funds (8171) never charge fees or ask for mobile card load.",
        placeholder: "Paste lottery or relief fund message...",
        example: "Jeeto Pakistan ki taraf se mubarak ho! Aap ki SIM par Corolla car aur 5 tola sona nikla hai. Delivery tax 15000 pehle jama karwayen."
      },
      shopping: {
        title: "Online Shopping / Marketplace",
        subtitle: "Refusing COD, iPhone for 30k, fake shops",
        tip: "Never pay 100% in advance to unknown social media sellers refusing Cash on Delivery (COD).",
        placeholder: "Paste product deal, price, and payment terms...",
        example: "Brand new iPhone 15 Pro Max box pack sirf 45,000 rupay me. No cash on delivery, 100% advance payment Easypaisa me karain."
      },
      crypto: {
        title: "Investment / Crypto",
        subtitle: "Double money in 7 days, Ponzi schemes",
        tip: "No legitimate business can guarantee double your money or 10% daily returns. All guaranteed profit schemes collapse.",
        placeholder: "Paste investment offer, return promises, and referral link...",
        example: "Double your money in just 7 days! 100% guaranteed profit with AI crypto trading bot. Zero risk, daily withdrawals."
      },
      impersonation: {
        title: "Impersonation & Romance",
        subtitle: "Emergency medical crisis, airport customs",
        tip: "Always call the friend or family member directly on their known phone number before sending money for supposed emergencies.",
        placeholder: "Paste emergency request or romance message...",
        example: "Bhai mera hospital me emergency accident ho gaya hai, thane walon ne pakra hua hai foran 25,000 Easypaisa karwao raat ko wapis kar doon ga."
      }
    }
  },
  ur: {
    tagline: "پاکستان کا اسمارٹ فراڈ اور دھوکہ دہی کی روک تھام کا تحفظ",
    heroTitle: "پیسے گنوانے سے پہلے دھوکہ پہچانیں",
    heroSubtitle: "مشتبہ ایس ایم ایس، واٹس ایپ پیغامات، بینک کالز، جعلی نوکریوں اور ایزی پیسہ دھوکہ دہی کو جیمینائی اے آئی سے فوری چیک کریں۔",
    startScan: "ابھی خطرہ چیک کریں",
    chooseCategory: "دھوکہ دہی کی کیٹیگری منتخب کریں",
    checking: "شیلڈ پیغامات اور حفاظتی سگنلز کا جائزہ لے رہا ہے...",
    safeVerdict: "غالباً محفوظ ہے",
    suspiciousVerdict: "مشتبہ / ہوشیار رہیں",
    scamVerdict: "خطرناک / یقینی دھوکہ",
    notSureVerdict: "غیر حتمی / واضح نہیں",
    listenAudio: "آواز میں سنیں",
    shareWarning: "واٹس ایپ پر وارننگ بھیجیں",
    copiedWarning: "وارننگ کاپی ہو گئی!",
    wasResultCorrect: "کیا یہ تجزیہ درست تھا؟",
    yesCorrect: "ہاں، بالکل درست",
    noIncorrect: "نہیں، غلط تھا",
    feedbackRecorded: "شکریہ! آپ کی رائے سے ہمارا سسٹم مزید بہتر ہوتا ہے۔",
    uploadScreenshot: "اسکرین شاٹ اپلوڈ کریں",
    dragOrBrowse: "اسکرین شاٹ یہاں ڈراپ کریں یا فائل منتخب کریں",
    voiceInput: "بول کر لکھیں",
    listening: "سن رہا ہوں... اب بولیں",
    callChecklistTitle: "مشتبہ فون کال سوالات",
    disclaimerText: "یہ اے آئی کی مدد سے فراہم کردہ رہنمائی ہے، کوئی قانونی گارنٹی نہیں۔ ہمیشہ اپنے متعلقہ بینک یا ادارے سے تصدیق کریں۔",
    community: "عوامی بورڈ",
    quiz: "اسکیم کوئز",
    reportAuthorities: "شکایت کہاں درج کروائیں",
    myChecks: "میری ہسٹری",
    adminPanel: "ایڈمن ڈیش بورڈ",
    signIn: "گوگل سے لاگ ان کریں",
    signOut: "لاگ آؤٹ",
    guest: "مہمان موڈ",
    cookieSettings: "کوکی سیٹنگز",
    categories: {
      sms: {
        title: "ایس ایم ایس / میسج",
        subtitle: "بینک الرٹ، پی ٹی اے، لاٹری میسج",
        tip: "سرکاری بینک ہمیشہ الفانیومیرک ماسک (جیسے HBL یا 8484) سے میسج کرتے ہیں۔ 11 ہندسوں کے موبائل نمبر والے میسج پر کبھی یقین نہ کریں۔",
        placeholder: "میسج یہاں پیسٹ کریں...",
        example: "مبارک ہو! آپ کو بینظیر انکم سپورٹ پروگرام کی طرف سے 25,000 روپے کی مالی امداد منظور ہو چکی ہے۔ فوری 0312-3456789 پر رابطہ کریں۔"
      },
      whatsapp: {
        title: "واٹس ایپ پیغام",
        subtitle: "ویڈیو لائک کرنے کا کام، غیر ملکی نمبرز",
        tip: "ویڈیوز لائک کرنے پر روزانہ ہزاروں روپے دینے والے تمام پیغامات دھوکہ دہی ہوتے ہیں۔",
        placeholder: "واٹس ایپ میسج یہاں پیسٹ کریں...",
        example: "السلام علیکم! آپ کے نام پر ایک قیمتی پارسل برطانیہ سے آیا ہے جس میں سونا اور کیش ہے۔ کسٹمز کلیئرنس فیس کے لیے فوری رابطہ کریں۔"
      },
      call: {
        title: "فون کال چیک لسٹ",
        subtitle: "کالر جو او ٹی پی، پن کوڈ یا اینی ڈیسک مانگے",
        tip: "کوئی بھی بینک افسر یا پولیس اہلکار فون پر آپ سے خفیہ پن کوڈ یا او ٹی پی نہیں مانگ سکتا۔",
        placeholder: "کال کے بارے میں اضافی تفصیلات...",
        example: "کالر نے بینک منیجر بن کر کہا کہ اکاؤنٹ بلاک ہونے سے بچانے کے لیے او ٹی پی دیں۔"
      },
      email: {
        title: "ای میل اور فشنگ",
        subtitle: "جعلی جاب آفرز، بینک اسٹیٹمنٹس",
        tip: "بھیجنے والے کا ای میل ایڈریس چیک کریں۔ معروف کمپنیاں کبھی مفت جیمیل سے آفر لیٹر نہیں بھیجتیں۔",
        placeholder: "ای میل کا متن یہاں پیسٹ کریں...",
        example: "سرکاری نوکری کی آفر: واپڈا میں اسسٹنٹ کی آسامی، پراسیسنگ فیس ایزی پیسہ کریں۔"
      },
      website: {
        title: "ویب سائٹ / لنک",
        subtitle: "لنک کو کھولے بغیر اس کی جانچ",
        tip: "ہم لنک کھولے بغیر اس کے نام اور ڈومین کا تجزیہ کرتے ہیں۔ .xyz اور .top سے ہوشیار رہیں۔",
        placeholder: "صرف ویب سائٹ کا لنک درج کریں...",
        example: "http://easypa1sa-bonus-reward.buzz/claim?user=pakistan"
      },
      job: {
        title: "جعلی نوکری کا جھانسہ",
        subtitle: "رجسٹریشن فیس، ٹائپنگ جابز",
        tip: "کوئی بھی سچی کمپنی نوکری دینے سے پہلے امیدوار سے فیس یا سیکیورٹی ڈپازٹ نہیں مانگتی۔",
        placeholder: "نوکری کی تفصیل درج کریں...",
        example: "سرکاری نوکری کا اشتہار: واپڈا میں گریڈ 14 کی خالی اسامیاں۔ بغیر ٹیسٹ سلیکشن کے لیے 5000 پراسیسنگ فیس ایزی پیسہ کریں۔"
      },
      bank: {
        title: "پیمنٹ / بینک / والٹ",
        subtitle: "ایزی پیسہ، جاز کیش، او ٹی پی چوری",
        tip: "کسی کے کہنے پر پیسے واپس نہ بھیجیں۔ ہمیشہ اپنی بینک ایپ کھول کر خود بیلنس چیک کریں۔",
        placeholder: "پیمنٹ میسج یہاں پیسٹ کریں...",
        example: "بھائی غلطی سے آپ کے ایزی پیسہ میں 20000 ٹرانسفر ہو گئے ہیں، بچے کی دوا لینی ہے خدارا واپس بھیج دیں۔"
      },
      prize: {
        title: "انعام / بی آئی ایس پی",
        subtitle: "بینظیر پروگرام، جیتو پاکستان لاٹری",
        tip: "جس قرعہ اندازی میں آپ نے حصہ ہی نہیں لیا، اس کا کوئی انعام نہیں ملتا۔",
        placeholder: "انعامی میسج کا متن...",
        example: "جیتو پاکستان کی طرف سے مبارک ہو! آپ کی گاڑی نکلی ہے۔ ٹیکس کی مد میں 15000 پہلے جمع کروائیں۔"
      },
      shopping: {
        title: "آن لائن خریداری",
        subtitle: "سی او ڈی سے انکار، سستا آئی فون",
        tip: "سوشل میڈیا کے انجان بیوپاریوں کو کبھی 100 فیصد ایڈوانس رقم نہ بھیجیں۔",
        placeholder: "ڈیل اور خریداری کی شرائط...",
        example: "آئی فون 15 پرو میکس صرف 45,000 میں۔ کیش آن ڈیلیوری بند ہے، ایڈوانس ایزی پیسہ کریں۔"
      },
      crypto: {
        title: "انویسٹمنٹ / کرپٹو",
        subtitle: "پیسہ ڈبل کرنے والی اسکیمیں",
        tip: "روزانہ فکس منافع دینے والا کوئی جائز کاروبار دنیا میں موجود نہیں ہے۔",
        placeholder: "انویسٹمنٹ آفر کا متن...",
        example: "گھر بیٹھے ڈالرز کمائیں! روزانہ 100 ڈالر گارنٹی منافع۔ ہمارے روبوٹ میں انویسٹ کریں۔"
      },
      impersonation: {
        title: "ایمرجنسی و جعلی کالز",
        subtitle: "ہسپتال ایمرجنسی، تھانے سے کال",
        tip: "پیسے بھیجنے سے پہلے اپنے عزیز کے پرانے نمبر پر خود کال کر کے تصدیق کریں۔",
        placeholder: "پیغام یہاں پیسٹ کریں...",
        example: "امی میں پولیس تھانے میں پھنس گیا ہوں، جلدی اس نمبر پر 30,000 روپے بھیج دیں ورنہ پرچہ درج ہو جائے گا۔"
      }
    }
  },
  roman: {
    tagline: "Pakistan Ka Smart Scam Detection & Community Warning Shield",
    heroTitle: "Paisa Gawanay Se Pehle Fraud Pehchanein",
    heroSubtitle: "Mashkook SMS, WhatsApp messages, bank calls, fake job offers, aur Easypaisa fraud ko Gemini AI aur Pakistan scam rules se foran check karain.",
    startScan: "Abhi Threat Check Karain",
    chooseCategory: "Scam Ki Category Select Karain",
    checking: "Shield threat signals check kar raha hai...",
    safeVerdict: "Ghaliban Mehfooz Hai",
    suspiciousVerdict: "Mashkook / Hoshiyar Rahain",
    scamVerdict: "Khatarnak / Mumkina Scam",
    notSureVerdict: "Ghair Hatmi / Not Sure",
    listenAudio: "Aawaz Me Sunain",
    shareWarning: "WhatsApp Par Warning Share Karain",
    copiedWarning: "Warning clipboard par copy ho gayi!",
    wasResultCorrect: "Kya yeh natija durust tha?",
    yesCorrect: "Haan, Bilkul Sahi",
    noIncorrect: "Nahi, Ghalat Tha",
    feedbackRecorded: "Shukriya! Aap ki raye se system mazeed behtar hota hai.",
    uploadScreenshot: "Screenshot Upload Karain (OCR)",
    dragOrBrowse: "Screenshot yahan drop karain ya browse karain",
    voiceInput: "Bol Kar Type Karain",
    listening: "Sun raha hoon... ab bolain",
    callChecklistTitle: "Mashkook Call Questionnaire",
    disclaimerText: "Yeh AI-assisted rehnumai hai, guarantee nahi. Hamesha official bank ya company se verify karain.",
    community: "Community Board",
    quiz: "Spot the Scam Quiz",
    reportAuthorities: "Kahan Complaint Karain",
    myChecks: "Meri History",
    adminPanel: "Admin Panel",
    signIn: "Google Se Sign In Karain",
    signOut: "Sign Out",
    guest: "Guest Mode",
    cookieSettings: "Cookie Settings",
    categories: {
      sms: {
        title: "SMS / Text Message",
        subtitle: "Bank alerts, PTA blocks, lottery SMS",
        tip: "Official banks hamesha alphanumeric mask (HBL, 8484) se SMS bhejte hain. 11-digit personal number wale bank alerts se bachain.",
        placeholder: "SMS yahan paste karain...",
        example: "Aziz Sarif aap ka HBL ATM card block kar dia gaya hai. Verification k liye foran 0304-9876543 par call karain warna account permanent band ho jaye ga."
      },
      whatsapp: {
        title: "WhatsApp Message",
        subtitle: "Task scams, video like, foreign numbers",
        tip: "Foreign numbers (+234, +62) jo daily 3,000-5,000 video like karne k offer dain woh 100% advance fee task scam hotay hain.",
        placeholder: "WhatsApp message yahan paste karain...",
        example: "Aap ko online part-time job offer ki ja rahi hai, daily 5000 se 10000 kama sakte hain. Telegram group join karain aur screenshot bhejo."
      },
      call: {
        title: "Phone Call Checklist",
        subtitle: "Caller jo OTP, PIN, ya AnyDesk mangay",
        tip: "Koi bank officer ya police wala phone par OTP ya PIN nahi maang sakta, na hi AnyDesk install karne ko keh sakta hai.",
        placeholder: "Call k baray me mazeed notes...",
        example: "Caller claimed to be State Bank manager demanding OTP to prevent account freeze."
      },
      email: {
        title: "Email & Phishing",
        subtitle: "Fake jobs, fake bank statements",
        tip: "Sender email check karain. Shell, PSO ya banks kabhi free @gmail.com se job offer nahi bhejte.",
        placeholder: "Email details yahan paste karain...",
        example: "From: hr-recruiting2026@gmail.com\nSubject: Job Offer at Shell Pakistan\nSend CNIC and Rs 4,500 training fee."
      },
      website: {
        title: "Website / Link",
        subtitle: "Link khole baghair URL text analysis",
        tip: "Hum link ko kholay baghair analyze karte hain. .xyz, .top, aur raw IP addresses se hoshiyar rahain.",
        placeholder: "Sirf link URL paste karain...",
        example: "http://easypa1sa-bonus-reward.buzz/claim?user=pakistan"
      },
      job: {
        title: "Fake Job Offer",
        subtitle: "Registration fee, simple typing job",
        tip: "Jo bhi employer job shuru karne se pehle 'registration fee' ya 'security deposit' mangay woh scam hota hai.",
        placeholder: "Job offer aur salary details...",
        example: "Ghar bethe packing ka kaam karain. Daily 4,000 kamayein. Saman delivery se pehle security deposit 3500 Easypaisa karwana ho ga."
      },
      bank: {
        title: "Payment / Wallet / Bank",
        subtitle: "Easypaisa, JazzCash, OTP, fake reversals",
        tip: "Kisi k kehne par foran paise wapis na bhejain. Pehle official app khol kar balance verify karain.",
        placeholder: "Payment message yahan paste karain...",
        example: "Bhai ghalti se aap k Easypaisa account me 20000 transfer ho gaye hain, bache ki dawai leni thi khuda k liye wapis bhej dain."
      },
      prize: {
        title: "Prize / Lottery / Relief",
        subtitle: "BISP 25k, Jeeto Pakistan, Ehsaas",
        tip: "Jis lottery me ticket nahi khareedi uska koi inam nahi nikalta. Advance courier tax mangna fraud hai.",
        placeholder: "Inami message yahan paste karain...",
        example: "Jeeto Pakistan ki taraf se mubarak ho! Aap ki SIM par Corolla car aur 5 tola sona nikla hai. Delivery tax 15000 pehle jama karwayen."
      },
      shopping: {
        title: "Online Shopping / Marketplace",
        subtitle: "No COD, 30k me iPhone, fake pages",
        tip: "Unknown social media sellers jo Cash on Delivery (COD) se inkar karain unhe advance payment kabhi na bhejain.",
        placeholder: "Product deal aur payment terms...",
        example: "Brand new iPhone 15 Pro Max box pack sirf 45,000 rupay me. No cash on delivery, 100% advance payment Easypaisa me karain."
      },
      crypto: {
        title: "Investment / Crypto",
        subtitle: "Double your money, 10% daily fix",
        tip: "Paisa double ya rozana guaranteed munafa dene wala koi halal business nahi hai.",
        placeholder: "Investment offer details...",
        example: "Double your money in just 7 days! 100% guaranteed profit with AI crypto trading bot. Zero risk, daily withdrawals."
      },
      impersonation: {
        title: "Impersonation & Romance",
        subtitle: "Hospital emergency, fake arrest, customs parcel",
        tip: "Emergency me paise maangne wale dost ya rishtedar k purane number par call kar k pehle verify karain.",
        placeholder: "Emergency request message...",
        example: "Bhai mera hospital me emergency accident ho gaya hai, thane walon ne pakra hua hai foran 25,000 Easypaisa karwao raat ko wapis kar doon ga."
      }
    }
  }
};
