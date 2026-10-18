import { ScamCategory } from './types';

export interface ScamLibraryEntry {
  id: string;
  category: ScamCategory;
  titleEn: string;
  titleUr: string;
  titleRoman: string;
  summaryEn: string;
  summaryUr: string;
  summaryRoman: string;
  whatItIsEn: string;
  whatItIsUr: string;
  whatItIsRoman: string;
  stepByStepAttackEn: string[];
  stepByStepAttackUr: string[];
  stepByStepAttackRoman: string[];
  typicalScriptsEn: string[];
  typicalScriptsUr: string[];
  typicalScriptsRoman: string[];
  redFlagsEn: string[];
  redFlagsUr: string[];
  redFlagsRoman: string[];
  protectionEn: string[];
  protectionUr: string[];
  protectionRoman: string[];
  immediateActionEn: string[];
  immediateActionUr: string[];
  immediateActionRoman: string[];
  reportingAgency: string;
  reportingUrl: string;
  helpline: string;
}

export const SCAM_LIBRARY_DATA: ScamLibraryEntry[] = [
  {
    id: 'bisp-fake-relief',
    category: 'sms',
    titleEn: 'Fake BISP / Ehsaas Relief & Prize Lottery SMS',
    titleUr: 'بے نظیر انکم سپورٹ / احساس جعلی امدادی ایس ایم ایس',
    titleRoman: 'Fake BISP / Ehsaas Relief & Inami Lottery SMS',
    summaryEn: 'Deceptive messages claiming approval for PKR 25,000 or 10,500 government cash transfers or car prizes, demanding advance processing vouchers.',
    summaryUr: 'جعلی پیغامات جن میں 25 ہزار یا 10,500 روپے کی منظوری کا دعویٰ کیا جاتا ہے اور رجسٹریشن فیس مانگی جاتی ہے۔',
    summaryRoman: 'Farzi messages jin me 25,000 ya 10,500 BISP imdad ka lalach de kar balance ya fee mangi jati hai.',
    whatItIsEn: 'An advance-fee fraud where criminals impersonate the Benazir Income Support Programme (BISP) or private lottery schemes to extract mobile balance recharges or wallet payments from vulnerable citizens.',
    whatItIsUr: 'یہ ایک ایڈوانس فیس فراڈ ہے جس میں بے نظیر انکم سپورٹ پروگرام کے نام پر شہریوں سے دھوکہ دہی سے رقم اینٹھی جاتی ہے۔',
    whatItIsRoman: 'Ye advance fee fraud hai jisme BISP ya inami scheme k naam par logo se paise ya card balance manga jata hai.',
    stepByStepAttackEn: [
      'Victim receives an SMS from an ordinary 11-digit mobile number stating they have an approved PKR 25,000 grant.',
      'The message instructs the victim to call a specific mobile number or head to a nearby mobile shop.',
      'When called, the fraudster impersonates an officer and demands PKR 1,000 to 2,000 in mobile scratch cards as an "activation fee".',
      'Once cards are transferred, the fraudster turns off the phone or demands further payment.'
    ],
    stepByStepAttackUr: [
      'شہری کو عام 11 ہندسوں کے موبائل نمبر سے پیغام آتا ہے کہ 25,000 روپے کی امداد منظور ہو چکی ہے۔',
      'پیغام میں دیئے گئے نمبر پر رابطہ کرنے کی ہدایت کی جاتی ہے۔',
      'فون کرنے پر جعلساز خود کو سرکاری اہلکار ظاہر کر کے رجسٹریشن فیس یا کارڈ کا مطالبہ کرتا ہے۔',
      'کارڈ بھیجنے کے بعد نمبر بند کر دیا جاتا ہے۔'
    ],
    stepByStepAttackRoman: [
      'Aam 11-digit mobile number se SMS ata hai k 25,000 rupay relief grant approve ho gaya hai.',
      'Message me diye gaye number par rabta karne ko kaha jata hai.',
      'Call karne par fraudster registration fee k naam par mobile balance mangta hai.',
      'Balance bhejne k baad number foran band kar dia jata hai.'
    ],
    typicalScriptsEn: [
      '"Mubarak ho! Apka BISP Program me 25,000 ka wazifa aya hai. Hasil krne k liye foran is number par rabta karein."',
      '"Ehsaas Emergency Cash: Apki family eligible hai. Apna CNIC confirm krwane k liye 1000 ka card bhejein."'
    ],
    typicalScriptsUr: [
      '"مبارک ہو! آپ کا بے نظیر کفالت پروگرام میں 25 ہزار کا وظیفہ آیا ہے۔ حاصل کرنے کے لیے رابطہ کریں۔"',
      '"احساس ایمرجنسی کیش: رقم حاصل کرنے کے لیے اپنا شناختی کارڈ تصدیق کروائیں۔"'
    ],
    typicalScriptsRoman: [
      '"Mubarak ho! BISP me apka 25,000 rupay relief approve ho chuka hai. Rabta karein."',
      '"Ehsaas kafalat program verification k liye foran call karein."'
    ],
    redFlagsEn: [
      'Sent from an 11-digit personal SIM number (0300, 0312, etc.) rather than the official BISP shortcode 8171.',
      'Demands mobile balance scratch cards, Easyload, or advance wallet transfers.',
      'Threatens that the grant will expire within hours if not claimed immediately.'
    ],
    redFlagsUr: [
      'سرکاری 8171 کوڈ کے بجائے عام ذاتی موبائل نمبر سے آنا۔',
      'ایزی لوڈ، اسکریچ کارڈ یا ایڈوانس فیس مانگنا۔',
      'چند گھنٹوں میں رقم منسوخ ہونے کی جھوٹی دھمکی دینا۔'
    ],
    redFlagsRoman: [
      'Official 8171 shortcode k bajaye aam 03xx mobile number se SMS ana.',
      'Mobile balance scratch card ya advance fees mangna.',
      'Jaldi karne ka shadeed dabao dalna.'
    ],
    protectionEn: [
      'Remember that BISP ONLY communicates through official 4-digit shortcode 8171.',
      'Never send scratch cards or mobile balance to claim any government grant.',
      'Verify eligibility exclusively on the official portal at 8171.bisp.gov.pk.'
    ],
    protectionUr: [
      'یاد رکھیں کہ حکومت صرف 8171 کے ذریعے پیغام بھیجتی ہے۔',
      'کسی بھی امداد کے لیے کبھی کوئی کارڈ یا فیس نہ بھیجیں۔',
      'سرکاری پورٹل 8171.bisp.gov.pk پر جا کر تصدیق کریں۔'
    ],
    protectionRoman: [
      'Hamesha yaad rakhein BISP sirf 8171 shortcode se rabta karta hai.',
      'Kisi bhi inam ya relief k liye kabhi mobile balance na bhejein.',
      'Sirf official website 8171.bisp.gov.pk par check karein.'
    ],
    immediateActionEn: [
      'Do not reply or call back the sender number.',
      'Forward the full SMS to PTA anti-spam shortcode 9005.',
      'If money was transferred, lodge a complaint with FIA Cyber Crime Wing.'
    ],
    immediateActionUr: [
      'پیغام کا جواب نہ دیں اور نہ ہی دیئے گئے نمبر پر کال کریں۔',
      'پی ٹی اے کے اینٹی اسپام کوڈ 9005 پر ایس ایم ایس فارورڈ کریں۔',
      'رقم بھیجنے کی صورت میں فوری طور پر ایف آئی اے میں شکایت درج کروائیں۔'
    ],
    immediateActionRoman: [
      'Message ka koi jawab na dein aur call na karein.',
      'SMS ko PTA k 9005 shortcode par forward karein.',
      'Agar paise transfer kar diye hain to foran FIA 1991 par report karein.'
    ],
    reportingAgency: 'PTA (SMS to 9005) & FIA NR3C (1991)',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991 (FIA) / 9005 (PTA SMS)'
  },
  {
    id: 'easypaisa-jazzcash-fake-reversal',
    category: 'bank',
    titleEn: 'Easypaisa & JazzCash Fake Reversal & OTP Theft',
    titleUr: 'ایزی پیسہ اور جاز کیش جعلی ریورسل اور او ٹی پی چوری',
    titleRoman: 'Easypaisa & JazzCash Fake Reversal & OTP Chori',
    summaryEn: 'Callers pretending they accidentally sent money to your wallet number, pleading for a refund or asking for incoming verification OTPs.',
    summaryUr: 'کال کرنے والے یہ دعویٰ کرتے ہیں کہ غلطی سے آپ کے اکاؤنٹ میں رقم منتقل ہو گئی ہے اور فوری واپسی یا او ٹی پی مانگتے ہیں۔',
    summaryRoman: 'Phone par ro kar kehna k ghalti se paise ap k account me agaye, foran wapis karein ya OTP batayein.',
    whatItIsEn: 'A high-pressure social engineering scam where fraudsters fabricate a fake transaction SMS or trigger an actual account recovery OTP, tricking you into returning non-existent funds or giving full account access.',
    whatItIsUr: 'یہ ایک جذباتی دھوکہ دہی ہے جس میں جھوٹا ایس ایم ایس بھیج کر شہری کو اپنے اصل اکاؤنٹ سے رقم ٹرانسفر کرنے پر مجبور کیا جاتا ہے۔',
    whatItIsRoman: 'Ek social engineering scam jisme jhoota SMS bhej kar ya OTP mang kar apka wallet khali kia jata hai.',
    stepByStepAttackEn: [
      'The fraudster sends a fake SMS formatted to look like an Easypaisa or JazzCash credit alert (sent from a regular SIM).',
      'Seconds later, the fraudster calls crying, claiming they sent money for a sick family member or hospital emergency.',
      'Alternatively, they trigger a password reset on your wallet and ask you to read back the "cancellation code" (which is actually your OTP).',
      'Victims send funds from their actual wallet or surrender the OTP, enabling complete wallet draining.'
    ],
    stepByStepAttackUr: [
      'جعلساز عام سم سے ایک جعلی ایس ایم ایس بھیجتا ہے جو بالکل والٹ الرٹ جیسا لگتا ہے۔',
      'چند سیکنڈ بعد کال کر کے جذباتی دباؤ ڈالا جاتا ہے کہ ہسپتال کے لیے پیسے غلطی سے آپ کے نمبر پر بھیج دیئے ہیں۔',
      'یا وہ آپ کے اکاؤنٹ کی پاسورڈ ری سیٹ کی درخواست کر کے آپ سے او ٹی پی پوچھتے ہیں۔',
      'شہری بنا بیلنس چیک کیے اپنے ذاتی پیسے ٹرانسفر کر بیٹھتا ہے۔'
    ],
    stepByStepAttackRoman: [
      'Aam SIM number se fake credit alert SMS bheja jata hai.',
      'Foran call karke emotional natak kia jata hai k hospital k paise ghalti se agaye.',
      'Ya password reset ka OTP mang kar kehte hain k ye cancellation code hai.',
      'User apna actual balance check kiye baghair paise bhej deta hai.'
    ],
    typicalScriptsEn: [
      '"Bhai khuda ka wasta hai, walida hospital me hain, ghalti se 15,000 ap k number par send hogaya. Foran wapis bhej dein."',
      '"Easypaisa helpline se bol raha hoon, ap k account par transaction hold ho gayi hai, mobile screen par aney wala 4-digit code batayein."'
    ],
    typicalScriptsUr: [
      '"خدا کا واسطہ ہے، والدہ ہسپتال میں ہیں، غلطی سے 15 ہزار آپ کے نمبر پر چلے گئے ہیں۔ فوری واپس بھیج دیں۔"',
      '"ایزی پیسہ ہیلپ لائن سے بات کر رہا ہوں، کینسلیشن کوڈ آپ کو ایس ایم ایس کیا ہے وہ بتائیں۔"'
    ],
    typicalScriptsRoman: [
      '"Bhai ghalti se 15,000 ap k Easypaisa par send ho gaya, foran wapis karein warna police me report krunga."',
      '"Helpline officer bol raha hoon, transaction cancel karne k liye aney wala code batayein."'
    ],
    redFlagsEn: [
      'Credit SMS received from an 11-digit mobile number, not official branded alphanumeric headers (like 3737 or 8558).',
      'Your actual app wallet balance does not show any incoming transaction.',
      'Caller demands an OTP, MPIN, or asks you to dial USSD codes like *786#.'
    ],
    redFlagsUr: [
      'کریڈٹ میسج کسی عام موبائل نمبر سے آنا، نہ کہ 3737 یا 8558 سے۔',
      'ایپ کھولنے پر کوئی نئی رقم موصول نہ ہونا۔',
      'کال کرنے والے کا او ٹی پی یا پن مانگنا۔'
    ],
    redFlagsRoman: [
      'Credit message branded name (3737/8558) k bajaye 11-digit aam number se ana.',
      'App khol kar dekhne par account me koi naya balance na hona.',
      'Caller ka OTP ya 4-digit secret PIN mangna.'
    ],
    protectionEn: [
      'Never send money back directly based on an incoming SMS or phone call.',
      'Open your mobile banking or wallet app independently to inspect your actual ledger statement.',
      'Tell the caller: "If sent by mistake, please lodge an official reversal request through your wallet provider (3737/4444)."'
    ],
    protectionUr: [
      'کبھی بھی کال یا میسج پر یقین کر کے پیسے واپس نہ بھیجیں۔',
      'ہمیشہ خود والٹ ایپ کھول کر اصل ہسٹری چیک کریں۔',
      'کال کرنے والے سے کہیں کہ کمپنی کے ہیلپ لائن کے ذریعے قانونی ریورسل کروائے۔'
    ],
    protectionRoman: [
      'Phone call par ya SMS dekh kar kabhi direct paise wapis na karein.',
      'Khud mobile app login karke actual balance aur statement check karein.',
      'Caller ko bolein k official helpline (3737/4444) par call karke reversal request darj karein.'
    ],
    immediateActionEn: [
      'If you shared your OTP or PIN, immediately open your app and change your MPIN.',
      'Call Easypaisa helpline at 3737 or JazzCash helpline at 4444 to freeze unauthorized transfers.',
      'Lodge an urgent complaint with FIA Cyber Crime Wing (1991).'
    ],
    immediateActionUr: [
      'اگر او ٹی پی یا پن بتا دیا ہے تو فوری طور پر اپنی والٹ ایپ میں پن تبدیل کریں۔',
      'ایزی پیسہ 3737 یا جاز کیش 4444 پر کال کر کے اکاؤنٹ پر ٹرانزیکشن بلاک کروائیں۔',
      'ایف آئی اے 1991 پر آن لائن فراڈ کی شکایت درج کروائیں۔'
    ],
    immediateActionRoman: [
      'Agar OTP share kar diya to foran MPIN change karein.',
      'Easypaisa (3737) ya JazzCash (4444) par call karke transaction freeze karwayein.',
      'FIA NR3C helpline 1991 par foran report darj karein.'
    ],
    reportingAgency: 'Easypaisa (3737) / JazzCash (4444) & FIA Cyber Crime (1991)',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '3737 / 4444 / 1991'
  },
  {
    id: 'fake-bank-vishing-sim-block',
    category: 'call',
    titleEn: 'Fake Bank Verification & SIM Block Threats (Vishing / Smishing)',
    titleUr: 'جعلی بینک کالز اور سم بندش کی دھمکیاں',
    titleRoman: 'Fake Bank Calls & SIM Block Threats (Vishing)',
    summaryEn: 'Callers claiming to be State Bank officers, bank fraud departments, or PTA representatives threatening immediate account freeze or SIM deactivation.',
    summaryUr: 'کال کرنے والے اسٹیٹ بینک، بینک آفیسرز یا پی ٹی اے نمائندے بن کر اکاؤنٹ منجمد کرنے کی دھمکی دیتے ہیں۔',
    summaryRoman: 'State Bank ya commercial bank officer ban kar account block karne ki dhamki de kar details mangna.',
    whatItIsEn: 'Criminals use spoofed caller identities or official-sounding scripts to create panic, claiming biometric data is missing or suspicious activity was detected on your CNIC.',
    whatItIsUr: 'مجرم ریاستی اداروں یا بینکوں کے نام پر فون کر کے خوف پھیلاتے ہیں تاکہ صارف ڈر کر خفیہ معلومات فراہم کر دے۔',
    whatItIsRoman: 'Scammers bank ya PTA officer ban kar call karte hain ta k ap ghabra kar card details aur OTP bata dein.',
    stepByStepAttackEn: [
      'Caller introduces themselves as a State Bank auditor or your commercial bank security manager.',
      'They claim an illegal transaction or biometric mismatch was detected under your CNIC.',
      'They threaten that all bank accounts, credit cards, and mobile SIMs will be suspended within 30 minutes.',
      'They demand your complete debit card number, expiry date, CVV code, and the confirmation SMS code to "verify ownership".'
    ],
    stepByStepAttackUr: [
      'کالر اسٹیٹ بینک یا آپ کے بینک کا سیکیورٹی آفیسر بن کر بات کرتا ہے۔',
      'دعویٰ کیا جاتا ہے کہ آپ کے شناختی کارڈ پر غیر قانونی سرگرمی دیکھی گئی ہے۔',
      'دھمکی دی جاتی ہے کہ اگلے 30 منٹ میں تمام اکاؤنٹس بلاک ہو جائیں گے۔',
      'تصدیق کے نام پر اے ٹی ایم کارڈ نمبر، سی وی وی اور او ٹی پی مانگا جاتا ہے۔'
    ],
    stepByStepAttackRoman: [
      'Caller khud ko State Bank ya ap k bank ka branch manager batata hai.',
      'Kehta hai k ap k CNIC par biometric mismatch hai aur inquiry chal rahi hai.',
      'Dhamki deta hai k 30 minute me ap k tamam accounts band kar diye jayenge.',
      'Verification k liye Debit card number, CVV aur aney wala SMS code mangta hai.'
    ],
    typicalScriptsEn: [
      '"Main State Bank Head Office se Major/Officer bol raha hoon. Ap k account ki biometric verification pending hai. Agar abhi verify na karwaya to account freeze ho jayega."',
      '"Ap ki SIM par FIA complaint darj hui hai. Apna CNIC aur ATM card confirm karein."'
    ],
    typicalScriptsUr: [
      '"میں اسٹیٹ بینک ہیڈ آفس سے بات کر رہا ہوں۔ آپ کی بائیو میٹرک تصدیق نا مکمل ہے۔ ابھی کوڈ بتائیں ورنہ اکاؤنٹ بند ہو جائے گا۔"',
      '"بینک الحبیب / حبیب بینک سیکیورٹی ڈپارٹمنٹ سے کال ہے۔ آپ کا کارڈ بلاک کیا جا رہا ہے۔"'
    ],
    typicalScriptsRoman: [
      '"State Bank Head Office se bat kar raha hoon. Ap k account ki biometric verification incomplete hai, foran details dein."',
      '"Ap ka ATM card temporarily block ho chuka hai. Reactivate karne k liye card k peechay likha 3-digit code batayein."'
    ],
    redFlagsEn: [
      'Demanding debit card CVV, expiry, internet banking password, or one-time password.',
      'Urgent threats of same-day police arrest or account freeze.',
      'Calling from an ordinary mobile phone number rather than standard verified branch lines.'
    ],
    redFlagsUr: [
      'ڈیبٹ کارڈ کا خفیہ سی وی وی کوڈ یا او ٹی پی مانگنا۔',
      'گرفتاری یا فوری اکاؤنٹ بندش کی دھمکیاں دینا۔',
      'عام موبائل نمبر سے کال آنا۔'
    ],
    redFlagsRoman: [
      'Debit card ka CVV code, ATM PIN ya OTP mangna.',
      'Same-day account freeze ya arrest ki dhamkiyan dena.',
      'Aam 11-digit mobile number se bank verification call ana.'
    ],
    protectionEn: [
      'Hang up immediately. No legitimate bank or state authority EVER asks for card CVV or OTP over the phone.',
      'Call your bank directly using the official telephone number printed on the back of your physical ATM card.',
      'Remember: State Bank of Pakistan does not call individual retail customers.'
    ],
    protectionUr: [
      'فوری فون کاٹ دیں۔ کوئی بھی بینک فون پر او ٹی پی یا پن نہیں مانگتا۔',
      'اپنے اے ٹی ایم کارڈ کی پشت پر دیئے گئے آفیشل نمبر پر خود کال کریں۔',
      'اسٹیٹ بینک کبھی بھی عام شہریوں کو براہ راست فون نہیں کرتا۔'
    ],
    protectionRoman: [
      'Foran call kaat dein. Koi bank phone par CVV ya OTP nahi mangta.',
      'Apne ATM card k peechay likhe helpline number par khud call karein.',
      'State Bank aam retail customers ko kabhi phone nahi karta.'
    ],
    immediateActionEn: [
      'Immediately call your bank helpline to temporarily block your debit card and internet banking credentials.',
      'Check transaction logs to ensure no unauthorized international or online transactions occurred.',
      'Lodge a formal dispute with Banking Mohtasib and report caller details to FIA NR3C.'
    ],
    immediateActionUr: [
      'فوری اپنے بینک ہیلپ لائن پر کال کر کے ڈیبٹ کارڈ اور آن لائن بینکنگ بلاک کروائیں۔',
      'بینک اسٹیٹمنٹ چیک کریں کہ کوئی غیر مجاز رقم تو نہیں کٹی۔',
      'بینکنگ محتسب اور ایف آئی اے سائبر کرائم میں باضابطہ شکایت درج کروائیں۔'
    ],
    immediateActionRoman: [
      'Apne bank ki official helpline par call karke card aur online banking foran freeze karwayein.',
      'Statement check karein k koi unauthorized deduction to nahi hui.',
      'Banking Mohtasib aur FIA helpline 1991 par complaint darj karein.'
    ],
    reportingAgency: 'State Bank / Banking Mohtasib (021-99217334-38) & FIA (1991)',
    reportingUrl: 'https://www.bankingmohtasib.gov.pk/',
    helpline: '1991 (FIA) / 021-99217334-38 (Banking Mohtasib)'
  },
  {
    id: 'whatsapp-task-like-earn',
    category: 'whatsapp',
    titleEn: 'WhatsApp Video Liking, Task & Like-and-Earn Traps',
    titleUr: 'واٹس ایپ ٹاسک اور یوٹیوب لائیک اینڈ ارن فراڈ',
    titleRoman: 'WhatsApp Task & YouTube/TikTok Like-and-Earn Traps',
    summaryEn: 'Messages offering daily income for subscribing to YouTube channels or reviewing hotels on Google Maps, leading to frozen cryptocurrency schemes.',
    summaryUr: 'یوٹیوب ویڈیوز لائیک کرنے کے بدلے روزانہ ہزاروں روپے کا لالچ اور بعد میں انویسٹمنٹ کے نام پر لوٹ مار۔',
    summaryRoman: 'YouTube video like karne k badle daily munafa ka lalach de kar baad me deposit mangna.',
    whatItIsEn: 'A modern multi-stage task Ponzi scam organized through WhatsApp and Telegram groups, using small preliminary payouts to gain trust before demanding heavy advance deposits.',
    whatItIsUr: 'یہ ایک منظم ٹاسک پونزی فراڈ ہے جس میں ابتدا میں معمولی رقم دے کر بعد میں لاکھوں روپے لوٹ لیے جاتے ہیں۔',
    whatItIsRoman: 'Ye Ponzi task scam hai jisme pehle thode paise de kar bharosa jeette hain aur phir bara deposit mangte hain.',
    stepByStepAttackEn: [
      'Victim gets a WhatsApp text from an unfamiliar number (often +1, +44, +234, or +62) offering a part-time job.',
      'The initial task is simple: like 3 YouTube clips and send screenshots. The victim actually receives PKR 500 to 1,000 via mobile wallet.',
      'Once trust is formed, the victim is moved to a private Telegram "VIP Task Group".',
      'Victims are assigned "Pre-Paid Crypto/Commercial Tasks" where they must deposit PKR 10,000 to PKR 50,000 to unlock higher commission.',
      'The system freezes, claiming an error, and demands double deposits to withdraw the trapped capital.'
    ],
    stepByStepAttackUr: [
      'غیر ملکی واٹس ایپ نمبر سے پارٹ ٹائم جاب کا میسج آتا ہے۔',
      'پہلے ٹاسک میں یوٹیوب ویڈیو لائیک کرنے پر حقیقت میں 500 یا 1000 روپے ایزی پیسہ بھیج دیئے جاتے ہیں۔',
      'پھر ٹیلی گرام کے وی آئی پی گروپ میں شامل کیا جاتا ہے۔',
      'وہاں ہائی ریٹرن کے نام پر 20 سے 50 ہزار روپے انویسٹ کرنے کا کہا جاتا ہے۔',
      'رقم جمع کروانے کے بعد مزید فیس مانگی جاتی ہے اور رقم کبھی واپس نہیں ملتی۔'
    ],
    stepByStepAttackRoman: [
      'Anjaan WhatsApp number se rozana kamai ka message ata hai.',
      'Pehle do teen YouTube video like karne par sach me 500-1000 rupay bhejte hain.',
      'Us k baad Telegram VIP group me move kar k baray deposit ka kehte hain.',
      'Rupay jama karwane k baad system freeze bata kar mazeed paise mangte hain.'
    ],
    typicalScriptsEn: [
      '"Hello, I am HR manager from Global Media. We are hiring freelance reviewers. You can earn PKR 3,000 to 8,000 daily from home. Send YES to start."',
      '"Congratulations! You completed level 1. To upgrade to VIP merchant task and earn 30% commission, deposit PKR 25,000 in this account."'
    ],
    typicalScriptsUr: [
      '"السلام علیکم! ہم میڈیا کمپنی سے بات کر رہے ہیں۔ گھر بیٹھے ویڈیوز دیکھ کر روزانہ 3 سے 8 ہزار کمائیں۔"',
      '"مبارک ہو! اب وی آئی پی ٹاسک کے لیے 20 ہزار روپے فیس والٹ میں جمع کروائیں۔"'
    ],
    typicalScriptsRoman: [
      '"Salam! Ham digital marketing firm se hain. Sirf YouTube likes karein aur daily 5,000 kamayein."',
      '"VIP merchant task unlock karne k liye advance security deposit jama karwayein."'
    ],
    redFlagsEn: [
      'Unsolicited job offer received via WhatsApp from unknown international dialing codes.',
      'Requests to shift conversation onto Telegram or external encrypted channels.',
      'Demanding upfront monetary deposits to "unlock" or "withdraw" earned commissions.'
    ],
    redFlagsUr: [
      'واٹس ایپ پر بغیر درخواست کے نامعلوم بیرونی نمبرز سے نوکری کی پیشکش۔',
      'ٹیلی گرام گروپ میں لے جانا۔',
      'کمایا ہوا منافع نکالنے کے لیے ایڈوانس رقم جمع کروانے کی شرط لگانا۔'
    ],
    redFlagsRoman: [
      'Bina kisi interview k WhatsApp par achanak foreign number se offer ana.',
      'Telegram channel ya unknown groups me invite karna.',
      'Kamayi hui raqam nikalne k liye pehle paise deposit karne ki shart.'
    ],
    protectionEn: [
      'Ignore and block all unsolicited WhatsApp recruitment invitations immediately.',
      'Understand that no legitimate marketing enterprise pays for random screenshots via untraceable wallets.',
      'Never deposit money to recover money. Any platform asking fees to withdraw earnings is 100% fraudulent.'
    ],
    protectionUr: [
      'ایسے تمام میسجز کو فوری بلاک کریں اور جواب نہ دیں۔',
      'سمجھیں کہ کوئی اصلی کمپنی اس طرح پیسے نہیں دیتی۔',
      'پھنسے ہوئے پیسے نکالنے کے لیے مزید کوئی رقم ہرگز نہ بھیجیں۔'
    ],
    protectionRoman: [
      'Aise sab messages ko foran block karein aur report karein.',
      'Koi bhi genuine company WhatsApp screenshots par paise nahi deti.',
      'Paisa nikalne k liye mazeed deposit kabhi na karein.'
    ],
    immediateActionEn: [
      'Cease all communication and do not deposit any additional funds regardless of threats.',
      'Export chat transcripts and save payment transfer screenshots.',
      'Submit a formal complaint with the FIA Cyber Crime NR3C portal.'
    ],
    immediateActionUr: [
      'فوری طور پر بات چیت بند کر دیں اور مزید کوئی رقم جمع نہ کروائیں۔',
      'تمام چیٹس اور ادائیگیوں کے اسکرین شاٹ محفوظ رکھیں۔',
      'ایف آئی اے سائبر کرائم ونگ میں ثبوتوں کے ساتھ شکایت جمع کروائیں۔'
    ],
    immediateActionRoman: [
      'Foran baat band karein aur koi naya deposit na karein.',
      'Tamam chats aur EasyPaisa/JazzCash transaction receipts k screenshots save karein.',
      'FIA Cyber Crime NR3C par online complaint file karein.'
    ],
    reportingAgency: 'FIA National Response Centre for Cyber Crime (NR3C)',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991'
  },
  {
    id: 'fake-jobs-overseas-visa',
    category: 'job',
    titleEn: 'Fake Job Offers, Typing Jobs & Overseas Visa Scams',
    titleUr: 'جعلی نوکریاں، ٹائپنگ جابز اور بیرون ملک ویزا فراڈ',
    titleRoman: 'Fake Job Offers, Typing Jobs & Visa Agent Frauds',
    summaryEn: 'Work-from-home offers demanding upfront software training fees, or unaccredited travel agents demanding heavy advances for Dubai/Europe work permits.',
    summaryUr: 'گھر بیٹھے ٹائپنگ جاب کے نام پر رجسٹریشن فیس اور جعلی ایجنٹوں کے ذریعے بیرون ملک ویزا کا جھانسہ۔',
    summaryRoman: 'Ghar baithe typing ya data entry job k naam par advance fee mangna ya fake visa permits.',
    whatItIsEn: 'Employment fraud targeting students, fresh graduates, and job-seekers by leveraging lucrative salary promises to collect non-refundable processing fees.',
    whatItIsUr: 'یہ بے روزگار نوجوانوں اور طلبہ کو پرکشش تنخواہوں کا جھانسہ دے کر رجسٹریشن کے نام پر لوٹنے کا عام طریقہ ہے۔',
    whatItIsRoman: 'Students aur youth ko job k naam par advance fees k zariye lootne ka common tareeqa.',
    stepByStepAttackEn: [
      'Social media ad promises PKR 40,000/month for basic data entry or English typing from mobile.',
      'Candidate is told their application is approved without any real test or interview.',
      'A "Security Deposit" or "Software License Kit" fee of PKR 1,500 to 5,000 is demanded.',
      'After payment, the candidate is provided corrupted files or impossible quotas, and refunds are rejected.'
    ],
    stepByStepAttackUr: [
      'فیس بک یا سوشل میڈیا پر ٹائپنگ جاب کے لیے 40 ہزار ماہانہ کا اشتہار دیا جاتا ہے۔',
      'امیدوار کو بنا کسی انٹرویو کے منتخب قرار دیا جاتا ہے۔',
      'سافٹ ویئر لائسنس یا سیکیورٹی ڈپازٹ کے نام پر چند ہزار روپے مانگے جاتے ہیں۔',
      'رقم ملنے کے بعد رابطہ منقطع یا جعلی فائلیں بھیج دی جاتی ہیں۔'
    ],
    stepByStepAttackRoman: [
      'Social media par ghar baithe typing job ka advertisement dikhaya jata hai.',
      'Bina interview select kar k registration fee ya software cost mangi jati hai.',
      'Paisa transfer hote hi agent gayab ho jata hai.'
    ],
    typicalScriptsEn: [
      '"Daily 2 hours typing work from home. Earn PKR 35,000 monthly. Limited seats available. Pay 2000 registration fee to get work files today."',
      '"Dubai security guard & hotel jobs. Guaranteed visa in 15 days. Pay initial file charge 50,000."'
    ],
    typicalScriptsUr: [
      '"گھر بیٹھے روزانہ 2 گھنٹے ٹائپنگ کریں۔ ماہانہ 35 ہزار کمائیں۔ رجسٹریشن فیس صرف 2 ہزار روپے۔"',
      '"دبئی اور کینیڈا کے لیے ورک ویزا 15 دن میں حاصل کریں۔ ابتدائی فائل فیس جمع کروائیں۔"'
    ],
    typicalScriptsRoman: [
      '"Daily 2 hours work-from-home typing. 35,000 monthly fix income. File fee 2,500 deposit karein."',
      '"Overseas work visa guaranteed. Advance processing fee submit karein."'
    ],
    redFlagsEn: [
      'Asking the job applicant to pay any money before receiving official employment contract.',
      'No physical office address, no registered company NTN, and communication only via mobile phone.',
      'Unrealistic salaries offered for low-skill tasks with zero qualifications required.'
    ],
    redFlagsUr: [
      'نوکری دینے کے بدلے امیدوار سے رجسٹریشن فیس یا رقم مانگنا۔',
      'کوئی تصدیق شدہ دفتر یا این ٹی این نہ ہونا۔',
      'بغیر کسی قابلیت کے غیر معمولی زیادہ تنخواہ کا وعدہ۔'
    ],
    redFlagsRoman: [
      'Job seeker se contract se pehle koi bhi paisa ya fee demand karna.',
      'Company ka physical office ya NTN verification na hona.',
      'Bina kisi tajurbe k ghair mamooli bari salary offer hona.'
    ],
    protectionEn: [
      'Golden Rule: Legitimate companies NEVER charge candidates for applying or interview processing.',
      'Verify overseas recruitment promoters on the official Bureau of Emigration portal (beoe.gov.pk).',
      'Do not transfer mobile wallet payments to private individuals claiming to represent corporations.'
    ],
    protectionUr: [
      'سنہری اصول: کوئی اصلی کمپنی نوکری کے لیے امیدوار سے پیسے نہیں لیتی۔',
      'بیرون ملک نوکری کے لیے بیورو آف امیگریشن (beoe.gov.pk) سے ایجنٹ کا لائسنس چیک کریں۔',
      'کسی ذاتی اکاؤنٹ میں رجسٹریشن کے پیسے کبھی نہ بھیجیں۔'
    ],
    protectionRoman: [
      'Golden Rule: Genuine employers kabhi candidate se registration fee nahi mangte.',
      'Overseas agents ko Bureau of Emigration website (beoe.gov.pk) par verify karein.',
      'Kisi aam shakhs k personal wallet me job k liye paisa transfer na karein.'
    ],
    immediateActionEn: [
      'Cease payments immediately.',
      'Report fake recruitment ads to PTA and the respective social media platform.',
      'File an online complaint with the Bureau of Emigration and FIA NR3C.'
    ],
    immediateActionUr: [
      'فوری ادائیگیاں روک دیں۔',
      'جعلی اشتہار کی اطلاع پی ٹی اے اور فیس بک کو دیں۔',
      'بیورو آف امیگریشن اور ایف آئی اے میں ثبوتوں کے ساتھ شکایت درج کروائیں۔'
    ],
    immediateActionRoman: [
      'Foran mazeed payments rok dein.',
      'Ad aur contact details PTA aur platform par report karein.',
      'FIA NR3C aur Bureau of Emigration me complaint darj karein.'
    ],
    reportingAgency: 'Bureau of Emigration (beoe.gov.pk) & FIA NR3C (1991)',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991'
  },
  {
    id: 'marketplace-olx-qr-courier',
    category: 'shopping',
    titleEn: 'Online Marketplace (OLX & Facebook) Advance Payment & Fake Courier Scams',
    titleUr: 'آن لائن مارکیٹ پلیس اور فیک کورئیر فراڈ',
    titleRoman: 'Marketplace (OLX / FB) Fake Advance & Courier Scams',
    summaryEn: 'Fake buyers sending edited bank transfer screenshots, or fake sellers asking for advance delivery charges before shipping goods.',
    summaryUr: 'جعلی خریدار جو ایڈٹ شدہ بینک رسید بھیجتے ہیں یا جعلی بیچنے والے جو ایڈوانس ڈلیوری فیس مانگتے ہیں۔',
    summaryRoman: 'OLX par fake payment screenshot bhej kar samaan mangwana ya advance delivery charges le kar bhag jana.',
    whatItIsEn: 'A commerce deception where fraudsters manipulate trust on peer-to-peer marketplaces by falsifying banking receipts or courier tracking pages.',
    whatItIsUr: 'یہ خرید و فروخت کا دھوکہ ہے جس میں بینک کی جعلی رسیدیں بنا کر شہریوں کا قیمتی سامان ہتھیا لیا جاتا ہے۔',
    whatItIsRoman: 'Peer-to-peer selling me jhoote bank transfer receipts aur fake courier slips k zariye fraud.',
    stepByStepAttackEn: [
      'A buyer agrees to purchase your product on OLX without negotiating the price.',
      'They claim they have transferred the amount via online banking and send an edited screenshot receipt.',
      'They send an Indrive, Bykea, or courier rider to collect the goods immediately before you verify funds.',
      'When you check your bank account later, no money was ever received.'
    ],
    stepByStepAttackUr: [
      'خریدار بغیر کسی بحث کے فوراً مہنگی چیز خریدنے پر راضی ہو جاتا ہے۔',
      'بینک ٹرانسفر کا جعلی یا ایڈٹ کیا ہوا اسکرین شاٹ بھیج دیا جاتا ہے۔',
      'اس سے پہلے کہ آپ اکاؤنٹ چیک کریں، وہ بائیکیا یا رائیڈر بھیج کر سامان اٹھوا لیتا ہے۔',
      'بعد میں پتا چلتا ہے کہ بینک میں کوئی رقم آئی ہی نہیں تھی۔'
    ],
    stepByStepAttackRoman: [
      'Buyer bina bargaining k foran mehenga item lene par raazi ho jata hai.',
      'Edited bank transfer screenshot bhej kar kehta hai k paise transfer ho gaye.',
      'Rider bhej kar foran samaan receive kar leta hai.',
      'Baad me pata chalta hai k bank account me koi transaction nahi hui.'
    ],
    typicalScriptsEn: [
      '"Bhai main army officer hoon, duty par hoon. Maine ap k account me paise transfer kr diye hain, screenshot check karein aur parcel Bykea rider ko de dein."',
      '"Delivery charges pehle EasyPaisa karein, tabhi TCS parcel book karega."'
    ],
    typicalScriptsUr: [
      '"میں ڈیوٹی پر ہوں، پیسے آپ کے بینک میں ٹرانسفر کر دیئے ہیں، رسید دیکھ لیں اور سامان رائیڈر کو دے دیں۔"',
      '"ڈلیوری فیس پہلے بھیجیں تاکہ ہم پارسل روانہ کر سکیں۔"'
    ],
    typicalScriptsRoman: [
      '"Maine online transfer kar dia hai, receipt dekh lein aur parcel rider ko hand-over karein."',
      '"Advance delivery charges EasyPaisa karein ta k dispatch start ho sake."'
    ],
    redFlagsEn: [
      'Buyer insists on sending an express rider before money physically settles in your account.',
      'Edited screenshots with mismatched fonts, missing reference numbers, or blurred dates.',
      'Buyer claims funds are "in clearing" or on hold until goods are dispatched.'
    ],
    redFlagsUr: [
      'بینک اکاؤنٹ میں رقم پہنچنے سے پہلے سامان اٹھوانے پر بے جا اصرار۔',
      'رسید کے فونٹس یا تاریخوں میں واضح رد و بدل۔',
      'یہ کہنا کہ سامان بھیجنے کے بعد رقم کلیئر ہو گی۔'
    ],
    redFlagsRoman: [
      'Account me actual balance ane se pehle rider bhej kar samaan mangna.',
      'Edited screenshots jisme font ya date me farq ho.',
      'Bank holding ka jhoota bahana banana.'
    ],
    protectionEn: [
      'Never release items until you personally log into your banking app and verify the settled balance.',
      'Never rely on SMS notifications or screenshots forwarded by the buyer.',
      'Prefer Cash on Delivery (COD) or in-person cash handovers in public, well-lit spaces.'
    ],
    protectionUr: [
      'جب تک اپنے بینک میں بیلنس خود چیک نہ کر لیں، سامان ہرگز حوالے نہ کریں۔',
      'خریدار کے بھیجے گئے اسکرین شاٹ پر کبھی بھروسہ نہ کریں۔',
      'ہمیشہ نقد ادائیگی یا کیش آن ڈلیوری کو ترجیح دیں۔'
    ],
    protectionRoman: [
      'Jab tak apni bank app me khud balance check na kar lein, item hand over na karein.',
      'Buyer k bheje huye SMS ya screenshot par bharosa na karein.',
      'Cash on Delivery (COD) ya public meeting point ko tarjeeh dein.'
    ],
    immediateActionEn: [
      'If rider is currently in transit, contact Bykea or InDrive customer support immediately with the tracking code to halt delivery.',
      'Report the buyer profile and phone number on OLX / Facebook Marketplace.',
      'Lodge a theft and fraud complaint with local police and FIA Cyber Crime.'
    ],
    immediateActionUr: [
      'اگر رائیڈر راستے میں ہے تو بائیکیا یا ان ڈرائیو سپورٹ سے رابطہ کر کے ڈیلیوری رکوائیں۔',
      'مارکیٹ پلیس پر فراڈیئے کا نمبر اور پروفائل رپورٹ کریں۔',
      'مقامی تھانے اور ایف آئی اے سائبر کرائم میں رپورٹ درج کروائیں۔'
    ],
    immediateActionRoman: [
      'Rider raste me ho to Bykea/InDrive support ko foran call karein.',
      'OLX/FB par profile report karein.',
      'FIA NR3C aur local police me report karein.'
    ],
    reportingAgency: 'FIA Cyber Crime Wing & Local Police',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991'
  },
  {
    id: 'fake-law-enforcement-impersonation',
    category: 'call',
    titleEn: 'Fake Government & Law Enforcement Arrest Threats (FIA, Police, Customs)',
    titleUr: 'جعلی ایف آئی اے اور پولیس گرفتاری کی دھمکیاں',
    titleRoman: 'Fake FIA, Police & Customs Impersonation Threats',
    summaryEn: 'Callers impersonating FIA Cyber Crime inspectors, anti-narcotics, or customs officers threatening immediate FIR or arrest unless bribes are wired.',
    summaryUr: 'کالر خود کو ایف آئی اے، اینٹی نارکوٹکس یا پولیس افسر ظاہر کر کے مقدمے اور گرفتاری کا خوف دلاتے ہیں۔',
    summaryRoman: 'FIA ya Police inspector ban kar FIR ya arrest ka khauf dila kar foran paise mangna.',
    whatItIsEn: 'An intimidation scam where criminals exploit respect and fear of law enforcement to extort instant money transfers under threat of public humiliation or arrest.',
    whatItIsUr: 'یہ ایک سنگین بلیک میلنگ فراڈ ہے جس میں قانون نافذ کرنے والے اداروں کا جھوٹا رعب جما کر رشوت مانگی جاتی ہے۔',
    whatItIsRoman: 'Qanoon nafiz karne wale idaron ka naam use kar k logon ko darana aur paise batoolna.',
    stepByStepAttackEn: [
      'Scammer calls claiming an illegal parcel (drugs, foreign currency, illegal SIMs) was seized under your name.',
      'They play background radio/walkie-talkie noises to simulate an authentic police station environment.',
      'They demand that you stay on the call continuously and not inform anyone.',
      'They order an immediate "bail guarantee fund" or "case clearance fee" via mobile wallet to suppress the warrant.'
    ],
    stepByStepAttackUr: [
      'کالر کہتا ہے کہ آپ کے نام پر کوئی غیر قانونی پارسل یا ممنوعہ سامان پکڑا گیا ہے۔',
      'پس منظر میں وائرلیس کی آوازیں سنائی جاتی ہیں تاکہ تھانے کا ماحول لگے۔',
      'دھمکی دی جاتی ہے کہ کال بند نہ کریں ورنہ پولیس گھر پہنچ جائے گی۔',
      'وارنٹ رکوانے کے لیے چند گھنٹوں میں ایزی پیسہ کے ذریعے رقم مانگی جاتی ہے۔'
    ],
    stepByStepAttackRoman: [
      'Scammer kehta hai k ap k naam par illegal parcel ya SIM issue pakri gayi hai.',
      'Background me wireless sounds chala kar police station ka mahol banate hain.',
      'Phone kaatne par police ghar bhejne ki dhamki dete hain.',
      'Case band karne k liye mobile wallet me foran paise mangte hain.'
    ],
    typicalScriptsEn: [
      '"Inspector Farooq bol raha hoon FIA Cyber Crime HQ Islamabad se. Ap k CNIC par money laundering ki FIR darj ho chuki hai. Agar warrant cancel karwana hai to foran batayein."',
      '"Customs clearance officer baat kar raha hoon. Ap ka international parcel hold hai, fine pay karein warna arrest warrant issue hoga."'
    ],
    typicalScriptsUr: [
      '"میں انسپکٹر فاروق بات کر رہا ہوں ایف آئی اے ہیڈ کوارٹر سے۔ آپ کے شناختی کارڈ پر مقدمہ درج ہو چکا ہے۔ فوری طور پر قانونی کلیئرنس فیس دیں۔"',
      '"کسٹمز ڈپارٹمنٹ سے کال ہے۔ آپ پر منی لانڈرنگ کا کیس بن رہا ہے۔"'
    ],
    typicalScriptsRoman: [
      '"FIA HQ se Inspector bol raha hoon. Ap k naam par warrant nikal chuka hai, foran clearance fee transfer karein."',
      '"Police post se call hai, ap ka case dabane k liye abhi settle karein."'
    ],
    redFlagsEn: [
      'Law enforcement officers demanding payment via Easypaisa, JazzCash, or personal bank accounts.',
      'Rushed aggression demanding you keep the matter a secret from family members.',
      'Calling from standard unverified mobile numbers.'
    ],
    redFlagsUr: [
      'قانون نافذ کرنے والے کا ایزی پیسہ یا بینک ٹرانسفر کے ذریعے جرمانہ مانگنا۔',
      'گھر والوں سے چھپانے اور کال جاری رکھنے پر اصرار۔',
      'عام سم سے کال آنا۔'
    ],
    redFlagsRoman: [
      'Police ya FIA ka EasyPaisa/JazzCash par fine ya fees mangna.',
      'Ghar walon ko na batane ka shadeed dabao dalna.',
      'Aam WhatsApp ya mobile number se dhamki bhari calls ana.'
    ],
    protectionEn: [
      'Official law enforcement ALWAYS issues formal written notices dispatched through Pakistan Post, never telephone payment demands.',
      'Never send funds via mobile wallets to settle any government legal notice.',
      'Hang up and contact the nearest local police station or dial 1991 directly.'
    ],
    protectionUr: [
      'قانون نافذ کرنے والے ادارے ہمیشہ باضابطہ تحریری نوٹس بھیجتے ہیں، کبھی فون پر پیسے نہیں مانگتے۔',
      'کسی بھی قانونی معاملے کے حل کے لیے کبھی والٹ پر پیسے نہ بھیجیں۔',
      'فون بند کر کے خود متعلقہ ادارے کے اصل نمبر پر تصدیق کریں۔'
    ],
    protectionRoman: [
      'Sarkari idaray hamesha daakiya k zariye written legal notice bhejte hain, phone par paise nahi mangte.',
      'Wallet par kisi sarkari jurmanay k naam par paisa na bhejein.',
      'Call disconnect karke seedha 1991 par FIA se rabta karein.'
    ],
    immediateActionEn: [
      'Immediately hang up the phone. Do not engage.',
      'Record the caller number and report the extortion attempt to FIA Cyber Crime (1991).',
      'Consult a trusted family member or legal advisor.'
    ],
    immediateActionUr: [
      'فوری کال کاٹ دیں اور خوفزدہ نہ ہوں۔',
      'کالر کا نمبر محفوظ کریں اور ایف آئی اے 1991 پر بھتہ خوری کی شکایت درج کروائیں۔',
      'اپنے گھر والوں یا وکیل سے مشورہ کریں۔'
    ],
    immediateActionRoman: [
      'Foran call kaat dein aur panic na karein.',
      'Number note karke FIA 1991 par extortion complaint darj karein.',
      'Apne ghar k baray ya safe person se baat karein.'
    ],
    reportingAgency: 'FIA Cyber Crime Wing (1991) & Ministry of Interior',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991'
  },
  {
    id: 'remote-access-anydesk-malicious-apk',
    category: 'website',
    titleEn: 'Remote Access (AnyDesk / TeamViewer) & Malicious APK Link Scams',
    titleUr: 'ریموٹ ایکسیس (این ڈیسک) اور خطرناک اے پی کے فائل فراڈ',
    titleRoman: 'Remote Access (AnyDesk/TeamViewer) & Malicious APKs',
    summaryEn: 'Callers instructing you to install remote control apps or download WhatsApp APK links that steal banking credentials and read private SMS codes.',
    summaryUr: 'کالر کی ہدایت پر ریموٹ ایکسیس سافٹ ویئر یا واٹس ایپ پر موصول ہونے والی غیر محفوظ اے پی کے فائل انسٹال کر کے موبائل ہیک ہونا۔',
    summaryRoman: 'Phone par AnyDesk/TeamViewer install karwana ya WhatsApp APK k zariye mobile hack karna.',
    whatItIsEn: 'A technical compromise scam where malware or legitimate remote screen sharing tools are used to observe your screen and siphon one-time passwords directly.',
    whatItIsUr: 'یہ ٹیکنیکل ہیکنگ کا طریقہ ہے جس کے ذریعے جعلساز آپ کے موبائل اسکرین کا کنٹرول سنبھال کر تمام والٹس خالی کر دیتے ہیں۔',
    whatItIsRoman: 'Technical hack jisme app install karwa kar screen share aur OTP chori kiye jate hain.',
    stepByStepAttackEn: [
      'A technician calls claiming your device has a security vulnerability or your internet speed needs optimizing.',
      'They ask you to download an app from Play Store (such as AnyDesk or TeamViewer QuickSupport) or click an APK link sent via WhatsApp.',
      'Once installed, they ask for the 9-digit connection ID.',
      'While talking, they open your banking apps and silently approve fund transfers using the OTPs visible on your screen.'
    ],
    stepByStepAttackUr: [
      'کالر خود کو کسٹمر سپورٹ یا آئی ٹی ماہر ظاہر کرتا ہے۔',
      'وہ پلے اسٹور سے اینی ڈیسک یا واٹس ایپ سے اے پی کے فائل انسٹال کرواتے ہیں۔',
      'انسٹال ہونے کے بعد اسکرین کنٹرول کا 9 ہندسوں کا کوڈ مانگا جاتا ہے۔',
      'فون کنٹرول ہوتے ہی وہ آپ کی والٹ ایپ کھول کر پیسے اپنے اکاؤنٹ میں ٹرانسفر کر لیتے ہیں۔'
    ],
    stepByStepAttackRoman: [
      'Support agent ban kar AnyDesk ya WhatsApp APK install karne ko kehte hain.',
      'Screen sharing code milte hi ap k mobile ka direct access le lete hain.',
      'Bank apps login kar k OTP screen se parh kar paisa nikal lete hain.'
    ],
    typicalScriptsEn: [
      '"Sir ap k phone me virus agaya hai. Play store khol kar AnyDesk install karein aur screen par aney wala code batayein ta k hum remote scan karein."',
      '"Ap ki lottery verification file WhatsApp kardi hai, is APK file ko install kr k CNIC scan karein."'
    ],
    typicalScriptsUr: [
      '"سر آپ کے اکاؤنٹ میں مسئلہ ہے، اینی ڈیسک انسٹال کر کے کوڈ بتائیں تاکہ ہم ریموٹلی ٹھیک کر سکیں۔"',
      '"ہم نے فائل بھیجی ہے، اس ایپ کو انسٹال کر کے بائیو میٹرک کریں۔"'
    ],
    typicalScriptsRoman: [
      '"Play Store se AnyDesk download karein ta k hum ap k issue ko system se theek karein."',
      '"WhatsApp par bheji gayi APK file install karein verification k liye."'
    ],
    redFlagsEn: [
      'Any caller asking you to download screen sharing apps (AnyDesk, TeamViewer, RustDesk).',
      'Receiving ".apk" files over WhatsApp or Telegram from unknown sources.',
      'Prompts asking for accessibility or notification permissions on unknown apps.'
    ],
    redFlagsUr: [
      'کال پر اسکرین شیئرنگ سافٹ ویئر ڈاؤنلوڈ کرنے کی ہدایت۔',
      'واٹس ایپ پر انجان لوگوں سے اے پی کے فائلز موصول ہونا۔',
      'کسی نامعلوم ایپ کا تمام پرمیشنز اور نوٹیفکیشنز کا حق مانگنا۔'
    ],
    redFlagsRoman: [
      'Phone par AnyDesk ya screen share tools download karne ka kehna.',
      'WhatsApp par .apk installation file bhejna.',
      'Notification read karne ki permissions mangna.'
    ],
    protectionEn: [
      'NEVER install AnyDesk, TeamViewer, or screen-sharing tools on instructions from an incoming caller.',
      'Never install APK files received via WhatsApp, Facebook, or third-party links outside the Google Play Store.',
      'If someone asks for your 9-digit remote ID, disconnect the call immediately.'
    ],
    protectionUr: [
      'کسی بھی انجان کالر کے کہنے پر کبھی اینی ڈیسک یا ریموٹ ایپ انسٹال نہ کریں۔',
      'واٹس ایپ پر آئی ہوئی اے پی کے فائلز کو کبھی اوپن نہ کریں۔',
      'صرف گوگل پلے اسٹور یا ایپل ایپ اسٹور سے تصدیق شدہ ایپس ڈاؤنلوڈ کریں۔'
    ],
    protectionRoman: [
      'Kisi bhi caller k kehne par AnyDesk ya remote app install na karein.',
      'WhatsApp par aane wali .apk files ko bilkul open na karein.',
      'Sirf official Google Play Store se apps install karein.'
    ],
    immediateActionEn: [
      'Immediately put your phone into Airplane Mode or turn off Wi-Fi and mobile data to cut the remote connection.',
      'Uninstall the remote app or malicious APK immediately from phone Settings > Apps.',
      'From a separate device, log into your banking and wallet portals to immediately change all passwords.'
    ],
    immediateActionUr: [
      'فوری موبائل کو ایئرپلین موڈ پر ڈالیں یا وائی فائی اور ڈیٹا بند کر دیں تاکہ ریموٹ رابطہ کٹ جائے۔',
      'سیٹنگز میں جا کر فوری وہ ایپ ڈیلیٹ کریں۔',
      'کسی دوسرے محفوظ فون سے اپنے بینکنگ پاسورڈز فوری تبدیل کریں۔'
    ],
    immediateActionRoman: [
      'Foran Airplane mode on karein ta k internet connection disconnect ho jaye.',
      'Settings > Apps me ja kar us software ko uninstall karein.',
      'Kisi doosre phone se foran bank passwords change karein.'
    ],
    reportingAgency: 'FIA Cyber Crime Wing (NR3C)',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991'
  },
  {
    id: 'investment-crypto-ponzi-schemes',
    category: 'crypto',
    titleEn: 'Investment, Crypto & Double-Your-Money Ponzi Schemes',
    titleUr: 'جعلی انویسٹمنٹ، کرپٹو اور رقم ڈبل کرنے والے پونزی فراڈ',
    titleRoman: 'Crypto & Double-Your-Money Ponzi Schemes',
    summaryEn: 'Websites and WhatsApp groups promising 20% to 50% guaranteed monthly returns on gold trading, forex, or foreign crypto bots.',
    summaryUr: 'ماہانہ 20 سے 50 فیصد تک یقینی منافع کا وعدہ کرنے والی فرضی کرپٹو اور فاریکس اسکیمیں۔',
    summaryRoman: 'Forex, crypto ya gold trading k naam par paisa double karne k jhoote waday.',
    whatItIsEn: 'Classic pyramid and Ponzi schemes disguised as modern cryptocurrency trading platforms, using new investors’ capital to pay early dividends until the operators vanish.',
    whatItIsUr: 'یہ جدید روپ میں تیار کیے گئے پرانے پونزی فراڈ ہیں جن میں رقم ڈبل کرنے کا جھوٹ بول کر عوام کی جمع پونجی لوٹ لی جاتی ہے۔',
    whatItIsRoman: 'Pyramid fraud jisme guaranteed munafa dikha kar aam logon se deposit karwaya jata hai.',
    stepByStepAttackEn: [
      'Victims are invited to private WhatsApp or Facebook groups showcasing fake luxury lifestyle screenshots.',
      'Users are directed to an unverified trading website (often .xyz or .vip) and told to register.',
      'Initial small deposits show massive artificial profits on the dashboard.',
      'When users attempt to withdraw, they are told to pay a 25% "tax clearance fee".',
      'The website eventually shuts down, erasing all invested funds.'
    ],
    stepByStepAttackUr: [
      'سوشل میڈیا پر پرتعیش طرز زندگی اور فوری امیر بننے کے اشتہارات دکھائے جاتے ہیں۔',
      'ایک غیر معروف ویب سائٹ پر اکاؤنٹ کھولنے کو کہا جاتا ہے۔',
      'اسکرین پر فرضی منافع بڑھتا ہوا دکھائی دیتا ہے۔',
      'رقم نکلوانے پر ٹیکس یا انشورنس فیس کا مطالبہ کیا جاتا ہے۔',
      'کچھ عرصے بعد ویب سائٹ بند ہو جاتی ہے اور مالکان فرار ہو جاتے ہیں۔'
    ],
    stepByStepAttackRoman: [
      'WhatsApp ya Facebook group me daily profit k fake screenshots dikhaye jate hain.',
      'Kisi .xyz ya fake website par account banwa kar USDT deposit karwate hain.',
      'Dashboard par jhoota munafa nazar ata hai.',
      'Withdraw karne par mazeed tax deposit mangte hain aur website band ho jati hai.'
    ],
    typicalScriptsEn: [
      '"Automated AI crypto trading bot. Deposit PKR 50,000 and get PKR 5,000 every week guaranteed. 100% risk free. Join VIP group."',
      '"Gold forex trading platform regulated internationally. Earn 40% profit monthly with instant withdrawal."'
    ],
    typicalScriptsUr: [
      '"آٹومیٹڈ اے آئی کرپٹو ٹریڈنگ۔ 50 ہزار جمع کروائیں اور ہر ہفتے 5 ہزار منافع پائیں۔ 100 فیصد گارنٹی۔"',
      '"فاریکس گولڈ ٹریڈنگ، ماہانہ 40 فیصد نفع۔ بغیر کسی رسک کے۔"'
    ],
    typicalScriptsRoman: [
      '"AI crypto bot se daily guaranteed earning. Zero risk, 100% guaranteed return."',
      '"Gold forex trading platform. Monthly 30% fix profit."'
    ],
    redFlagsEn: [
      'Promises of "Guaranteed" high returns with "Zero Risk" (genuine finance always involves market risk).',
      'Urging you to recruit friends and family for referral commission tier boosts.',
      'Deposits accepted only through personal mobile wallets or untraceable USDT crypto addresses.'
    ],
    redFlagsUr: [
      'بغیر کسی خطرے کے "یقینی زیادہ منافع" کا وعدہ (اصلی کاروبار میں کبھی نفع فکس نہیں ہوتا)۔',
      'نئے دوستوں کو لانے پر کمیشن کا لالچ دینا۔',
      'ادائیگی صرف نجی والٹس یا کرپٹو والٹس کے ذریعے لینا۔'
    ],
    redFlagsRoman: [
      'Guaranteed high profit aur zero risk ka jhoota dawa.',
      'Referral program me doston ko lane par extra commission.',
      'Payment personal Easypaisa ya crypto USDT k zariye lena.'
    ],
    protectionEn: [
      'Check SECP (Securities and Exchange Commission of Pakistan) public warning list at secp.gov.pk.',
      'Never invest money in unregulated websites operating on free or generic domain extensions.',
      'Remember: If an investment sounds too good to be true, it is inevitably a scam.'
    ],
    protectionUr: [
      'ایس ای سی پی (SECP) کی آفیشل ویب سائٹ secp.gov.pk پر غیر قانونی کمپنیوں کی فہرست چیک کریں۔',
      'غیر رجسٹرڈ کمپنیوں یا ویب سائٹس پر اپنی محنت کی کمائی ہرگز نہ لگائیں۔',
      'یاد رکھیں: جو اسکیم ضرورت سے زیادہ آسان اور نفع بخش لگے وہ فراڈ ہی ہوتی ہے۔'
    ],
    protectionRoman: [
      'SECP ki warning list (secp.gov.pk) par check karein.',
      'Ghair qanooni unregistered trading apps me invest na karein.',
      'Agar return ghair mamooli zyada ho to 100% scam hota hai.'
    ],
    immediateActionEn: [
      'Do not send any further "withdrawal fees" or taxes.',
      'Gather deposit transactions, wallet titles, and website screenshots.',
      'Lodge a formal financial fraud complaint with SECP and FIA Cyber Crime Wing.'
    ],
    immediateActionUr: [
      'ٹیکس کے نام پر مزید کوئی روپیہ نہ بھیجیں۔',
      'تمام رسیدیں اور ویب سائٹ کے اسکرین شاٹ محفوظ کریں۔',
      'ایس ای سی پی اور ایف آئی اے سائبر کرائم میں فراڈ کی رپورٹ درج کروائیں۔'
    ],
    immediateActionRoman: [
      'Withdrawal fee k naam par mazeed paisa bilkul na dein.',
      'Deposit ki slips aur chats save karein.',
      'SECP aur FIA Cyber Crime ko report karein.'
    ],
    reportingAgency: 'SECP (secp.gov.pk) & FIA Cyber Crime (1991)',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991'
  },
  {
    id: 'predatory-loan-apps-harassment',
    category: 'bank',
    titleEn: 'Predatory Instant Loan Apps, Harassment & Blackmail',
    titleUr: 'جعلی قرض ایپس، بلیک میلنگ اور ہراسانی',
    titleRoman: 'Predatory Instant Loan Apps & Contact Blackmail',
    summaryEn: 'Instant micro-loan applications charging hidden 200%+ fees, accessing full phone contacts, and sending abusive morphed photos to family members.',
    summaryUr: 'چند منٹوں میں فوری قرض کا جھانسہ، موبائل کانٹیکٹس چوری کرنا اور خاندان والوں کو کالز کر کے بلیک میل کرنا۔',
    summaryRoman: 'Quick loan apps jo phone contacts aur photos chori kar k family ko blackmail karti hain.',
    whatItIsEn: 'Predatory rogue lending applications that harvest contacts and private photo galleries upon installation, using aggressive threats and blackmail to extort exorbitant payments.',
    whatItIsUr: 'یہ خطرناک ایپس ہیں جو انسٹال ہوتے ہی آپ کے فون کا ڈیٹا چوری کر لیتی ہیں اور چند ہزار کے قرض پر لاکھوں روپے ہتھیا لیتی ہیں۔',
    whatItIsRoman: 'Khatarnak loan apps jo contacts aur gallery hack kar k rishtedaron ko badnaam karne ki dhamki deti hain.',
    stepByStepAttackEn: [
      'Social media ad promises instant PKR 50,000 loan in 5 minutes with zero paperwork.',
      'During installation, the app forces permissions to access Contacts, Photo Gallery, and Location.',
      'The applicant receives only PKR 3,000, but is told they owe PKR 12,000 within just 6 days.',
      'If not paid immediately, recovery agents call the victim’s parents, colleagues, and friends with abusive threats and edited pictures.'
    ],
    stepByStepAttackUr: [
      'سوشل میڈیا پر 5 منٹ میں بنا کسی کاغذات کے 50 ہزار قرض کا اشتہار۔',
      'ایپ انسٹال کرتے ہی فون کے تمام نمبرز اور گیلری کا ایکسیس لے لیا جاتا ہے۔',
      'اکاؤنٹ میں صرف 3 ہزار آتے ہیں لیکن 6 دن بعد 12 ہزار واپسی کا تقاضا کیا جاتا ہے۔',
      'نہ دینے پر رشتہ داروں اور دوستوں کو فون کر کے گالیاں اور دھمکیاں دی جاتی ہیں۔'
    ],
    stepByStepAttackRoman: [
      'Bina kisi paperwork k 5 minute me loan ka jhoota ad.',
      'Install karte waqt phone book aur photo gallery ka access lena.',
      '3000 transfer kar k 6 din me 10,000 mangna.',
      'Time par na dene par contacts ko call karke badnaam aur blackmail karna.'
    ],
    typicalScriptsEn: [
      '"Instant easy cash loan approved. Get PKR 25,000 directly into your EasyPaisa wallet in 3 minutes. Download app now."',
      '"Apka loan overdue ho chuka hai. Agar 1 ghante me paise pay na kiye to ap k contacts ko ap ki manipulated tasweer WhatsApp ki jayegi."'
    ],
    typicalScriptsUr: [
      '"فوری آسان قرضہ منظور۔ 3 منٹ میں ایزی پیسہ میں رقم حاصل کریں۔ ابھی ایپ ڈاؤنلوڈ کریں۔"',
      '"آپ کا قرضہ اوور ڈیو ہے۔ اگر ایک گھنٹے میں پیسے نہ بھیجے تو آپ کے تمام رشتہ داروں کو کالز کی جائیں گی۔"'
    ],
    typicalScriptsRoman: [
      '"Instant cash loan approved. Direct EasyPaisa transfer in 3 minutes."',
      '"Agar 1 ghante me paise clear na kiye to ap k contacts ko call karke badnaam kiya jayega."'
    ],
    redFlagsEn: [
      'App demands full permission to access your Contacts, Call Logs, and Photo Gallery before proceeding.',
      'Extremely short repayment tenure (e.g. 5 to 7 days) and astronomical hidden interest charges.',
      'Threatening language used by customer support immediately after installation.'
    ],
    redFlagsUr: [
      'ایپ کا فون کے تمام رابطوں اور تصاویر تک رسائی مانگنا۔',
      'صرف 5 سے 7 دن کی واپسی کا وقت اور غیر معمولی سود۔',
      'کسٹمر سپورٹ کی طرف سے غیر اخلاقی اور دھمکی آمیز لہجہ۔'
    ],
    redFlagsRoman: [
      'App ka contacts aur photo gallery access mangna.',
      'Sirf 6 din ka waqt aur bhaari sood lagana.',
      'Galian aur family ko call karne ki dhamki dena.'
    ],
    protectionEn: [
      'NEVER install unknown loan applications advertised on Facebook, TikTok, or untrusted websites.',
      'Only borrow from SECP-licensed Non-Banking Financial Institutions (NBFCs) verified on secp.gov.pk.',
      'Never grant Contact or Photo Gallery permissions to any financial utility.'
    ],
    protectionUr: [
      'سوشل میڈیا پر چلنے والی کسی نامعلوم قرض ایپ کو ہرگز ڈاؤنلوڈ نہ کریں۔',
      'قرض صرف ایس ای سی پی (SECP) کی منظور شدہ ایپس یا بینکوں سے لیں۔',
      'کسی بھی فنانشل ایپ کو اپنے فون کانٹیکٹس کی اجازت نہ دیں۔'
    ],
    protectionRoman: [
      'Facebook ya TikTok par chalne wali kisi loan app ko install na karein.',
      'Sirf SECP approved banks ya licensed NBFCs se loan lein.',
      'App permissions me contacts aur storage access bilkul allow na karein.'
    ],
    immediateActionEn: [
      'Revoke all app permissions in phone Settings > Apps and uninstall the application immediately.',
      'Warn family and close friends that a rogue app has compromised contacts and may attempt malicious calls.',
      'Lodge an emergency complaint with FIA Cyber Crime Wing (1991) and SECP for cyber extortion and harassment.'
    ],
    immediateActionUr: [
      'فون کی سیٹنگز میں جا کر فوری طور پر تمام پرمیشنز بند کریں اور ایپ ڈیلیٹ کریں۔',
      'اپنے قریبی رشتہ داروں کو مطلع کر دیں کہ فراڈیے بدنام کرنے کے لیے جعلی کالز کر سکتے ہیں۔',
      'ایف آئی اے سائبر کرائم 1991 پر بلیک میلنگ اور ہراسانی کی فوری رپورٹ درج کروائیں۔'
    ],
    immediateActionRoman: [
      'Settings me ja kar app permissions band karein aur app uninstall karein.',
      'Apne contacts aur family ko inform karein k unknown calls par tawajjah na dein.',
      'FIA 1991 aur SECP ko harassment aur blackmail ki complaint darj karein.'
    ],
    reportingAgency: 'SECP Complaint Cell & FIA Cyber Crime (1991)',
    reportingUrl: 'https://complaint.nr3c.gov.pk/',
    helpline: '1991'
  },
  {
    id: 'phishing-emails-fake-bank-websites',
    category: 'website',
    titleEn: 'Phishing Emails & Fake Bank Login Portals',
    titleUr: 'جعلی فشنگ ای میلز اور فیک بینک لاگ ان پورٹلز',
    titleRoman: 'Phishing Emails & Spoofed Bank Websites',
    summaryEn: 'Deceptive emails and search engine ad links leading to clone banking websites that capture your username, password, and transaction authorization codes.',
    summaryUr: 'ای میلز یا گوگل سرچ پر جعلی بینک لنکس جو آپ کا پاسورڈ اور صارف نام چوری کرتے ہیں۔',
    summaryRoman: 'Fake bank login pages jo Google ads ya email k zariye apka password chori karti hain.',
    whatItIsEn: 'Phishing sites meticulously crafted to copy authentic Pakistani bank portals (like HBL, Meezan, UBL, or Bank Alfalah) to intercept login credentials in real time.',
    whatItIsUr: 'یہ اصل بینکوں کی ہو بہو نقل بنا کر تیار کی گئی جعلی ویب سائٹس ہوتی ہیں جو کسٹمر کا پاسورڈ چرانے کے لیے بنائی جاتی ہیں۔',
    whatItIsRoman: 'Asal bank ki duplicate fake website jo apka user ID aur password save kar leti hai.',
    stepByStepAttackEn: [
      'Victim searches for "HBL internet banking login" on Google or clicks a link in an urgent email.',
      'A sponsored search result leads to a fake domain like "hbl-online-portal.net" instead of the official site.',
      'The page appears identical to the real bank login screen.',
      'When you enter your username, password, and OTP, the attackers immediately transfer your funds via the real bank.'
    ],
    stepByStepAttackUr: [
      'صارف گوگل پر بینک لاگ ان تلاش کرتا ہے یا ای میل میں آئے لنک پر کلک کرتا ہے۔',
      'ایک جعلی ویب سائٹ کھلتی ہے جو بالکل اصل بینک جیسی لگتی ہے۔',
      'صارف اپنا یوزر نیم، پاسورڈ اور او ٹی پی درج کر دیتا ہے۔',
      'مجرم اصل بینک میں وہ معلومات ڈال کر فنڈز چوری کر لیتے ہیں۔'
    ],
    stepByStepAttackRoman: [
      'Google search ya email link par click kar k fake portal open hota hai.',
      'Website ka design bilkul bank jaisa hota hai lekin web address ghalat hota hai.',
      'User login details aur OTP enter kar deta hai.',
      'Attackers foran real account login kar k saara paisa transfer kar lete hain.'
    ],
    typicalScriptsEn: [
      '"Dear Customer, your bank account access will be terminated due to unverified KYC. Click here immediately to update credentials."',
      '"Security Notice: Unauthorized sign-in attempt detected from Lahore. Verify your account to secure funds."'
    ],
    typicalScriptsUr: [
      '"محترم صارف، آپ کا اکاؤنٹ سیکیورٹی وجوہات کی بنا پر بند کر دیا گیا ہے۔ بحالی کے لیے فوری یہاں کلک کریں۔"',
      '"آپ کے اکاؤنٹ پر مشتبہ لاگ ان دیکھا گیا ہے، پاسورڈ تبدیل کرنے کے لیے لاگ ان کریں۔"'
    ],
    typicalScriptsRoman: [
      '"Dear Customer, apka account suspend ho gaya hai. Reactivate karne k liye link par click karein."',
      '"Security Alert: Ap k bank account par unauthorized login detect hua hai."'
    ],
    redFlagsEn: [
      'Domain name does not match the official bank address (e.g., using .net, .org, or hyphens like "hbl-login.com").',
      'Urgent threats of immediate account termination if credentials are not entered right away.',
      'Sent from generic email addresses (like @gmail.com or unbranded servers).'
    ],
    redFlagsUr: [
      'ویب سائٹ ایڈریس میں گڑبڑ ہونا جیسے نام کے ساتھ اضافی الفاظ یا غلط ایکسٹینشن۔',
      'فوری اکاؤنٹ بند ہونے کی دھمکیاں دینا۔',
      'کسی عام جی میل ایڈریس سے ای میل آنا۔'
    ],
    redFlagsRoman: [
      'Website ka domain official bank domain se match na hona.',
      'Foran block hone ka shadeed khauf dila kar login karwana.',
      'Aam gmail ya fake address se official notification ana.'
    ],
    protectionEn: [
      'Always type the official URL manually into your browser address bar (e.g. hbl.com, meezanbank.com).',
      'Never click on "Sponsored" ad results on Google when searching for online banking portals.',
      'Bookmark your bank’s verified login portal and always ensure the padlock icon indicates an authentic corporate certificate.'
    ],
    protectionUr: [
      'ہمیشہ اپنے براؤزر میں بینک کا اصل ایڈریس خود ٹائپ کر کے کھولیں۔',
      'گوگل سرچ پر "اسپانسرڈ" اشتہارات والے لنکس پر کبھی کلک نہ کریں۔',
      'بینک کی اصلی ویب سائٹ کو بک مارک کر کے محفوظ رکھیں۔'
    ],
    protectionRoman: [
      'Bank ka official web address hamesha khud browser me type karein.',
      'Google search me sponsored ads par click kar k login na karein.',
      'Hamesha official mobile application ka istemaal karein.'
    ],
    immediateActionEn: [
      'Call your bank helpline immediately and instruct them to block your internet banking username and debit card.',
      'If you have access, immediately change your password and security questions from a clean device.',
      'Forward the phishing URL to PTA and FIA Cyber Crime for immediate domain blocking.'
    ],
    immediateActionUr: [
      'فوری بینک ہیلپ لائن پر کال کر کے آن لائن بینکنگ عارضی طور پر بند کروائیں۔',
      'اگر ممکن ہو تو فوری طور پر نیا پاسورڈ سیٹ کریں۔',
      'اس جعلی ویب سائٹ کا لنک پی ٹی اے کو بلاک کرنے کے لیے بھیجیں۔'
    ],
    immediateActionRoman: [
      'Foran bank helpline par call kar k internet banking block karwayein.',
      'Clean device se foran password aur MPIN change karein.',
      'PTA aur FIA ko phishing link report karein ta k website block ho sake.'
    ],
    reportingAgency: 'Bank Official Helpline & PTA Fraud Portal & FIA (1991)',
    reportingUrl: 'https://complaint.pta.gov.pk/RegisterComplaint.aspx',
    helpline: '1991 (FIA) / 0800-55055 (PTA)'
  }
];
