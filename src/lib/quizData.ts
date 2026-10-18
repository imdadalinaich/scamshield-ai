import { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'bank',
    questionEn: 'A caller claiming to be from your bank states your debit card is blocked and demands your 6-digit SMS OTP to reactivate it. What should you do?',
    questionUr: 'ایک شخص بینک منیجر بن کر فون کرتا ہے اور کہتا ہے کہ آپ کا اے ٹی ایم کارڈ بلاک ہے، اسے کھولنے کے لیے 6 ہندسوں کا او ٹی پی بتائیں۔ آپ کو کیا کرنا چاہیے؟',
    questionRoman: 'Ek caller bank officer ban kar kehta hai ke aap ka ATM card block hai, aur reactivate karne k liye 6-digit OTP maangta hai. Aap kya karain ge?',
    optionsEn: [
      'Share the OTP immediately so your card is unblocked',
      'Refuse, hang up, and call the official bank helpline on the back of your card',
      'Ask them to confirm your CNIC first before giving the OTP',
      'Share only 3 digits of the OTP'
    ],
    optionsUr: [
      'فوری او ٹی پی بتا دیں تاکہ کارڈ چالو ہو جائے',
      'انکار کریں، فون کاٹیں اور کارڈ کی پشت پر لکھے ہیلپ لائن نمبر پر خود کال کریں',
      'پہلے اپنا شناختی کارڈ کنفرم کروائیں پھر او ٹی پی دیں',
      'صرف تین ہندسے بتائیں'
    ],
    optionsRoman: [
      'Foran OTP bata dain taake card unblock ho jaye',
      'Inkar karain, call kaatein aur card ki back par official helpline par call karain',
      'Pehle un se apna CNIC confirm karwayen phir OTP dain',
      'Sirf 3 digits share karain'
    ],
    correctIndex: 1,
    explanationEn: 'Banks NEVER ask for your OTP, PIN, or password over phone calls. Any incoming request for OTP is 100% fraud.',
    explanationUr: 'بینک عملہ کبھی بھی فون پر خفیہ او ٹی پی یا پن کوڈ نہیں مانگتا۔ فون پر او ٹی پی مانگنا 100 فیصد فراڈ ہے۔',
    explanationRoman: 'Banks kabhi bhi telephone par OTP ya PIN nahi maangte. Call par OTP maangna 100% fraud hota hai.'
  },
  {
    id: 2,
    category: 'whatsapp',
    questionEn: 'A foreign WhatsApp number offers you Rs 3,500 daily to like YouTube videos and subscribe to channels. Is this legitimate?',
    questionUr: 'غیر ملکی واٹس ایپ نمبر سے میسج آتا ہے کہ یوٹیوب ویڈیوز لائک کرنے پر روزانہ 3,500 روپے ملیں گے۔ کیا یہ درست ہے؟',
    questionRoman: 'Ek foreign WhatsApp number se message aata hai k YouTube videos like karne par daily 3500 rupay milain ge. Kya yeh real hai?',
    optionsEn: [
      'Yes, remote video marketing is a standard freelance job',
      'No, this is a viral task scam designed to trap you into depositing funds later',
      'Yes, as long as they don\'t ask for your address',
      'Yes, but only if they pay in dollars'
    ],
    optionsUr: [
      'ہاں، یہ آن لائن مارکیٹنگ کا عام کام ہے',
      'نہیں، یہ ٹاسک فراڈ ہے جس میں بعد میں رقم جمع کروانے کا جھانسہ دیا جاتا ہے',
      'ہاں، بشرطیکہ وہ گھر کا پتہ نہ مانگیں',
      'ہاں، اگر وہ ڈالرز میں ادائیگی کریں'
    ],
    optionsRoman: [
      'Haan, yeh normal online freelance kaam hai',
      'Nahi, yeh viral task scam hai jo aage chal kar deposit mangne k liye trap karta hai',
      'Haan, agar woh ghar ka address na mangain',
      'Haan, agar woh dollars me pay karain'
    ],
    correctIndex: 1,
    explanationEn: 'Task scams pay a small token first, then lure victims into private Telegram groups where thousands are stolen through fake deposit tasks.',
    explanationUr: 'شروع میں لالچ کے لیے چند سو روپے دیے جاتے ہیں، پھر ٹیلی گرام گروپس میں لاکھوں روپے ہتھیا لیے جاتے ہیں۔',
    explanationRoman: 'Shuru me thore paise de kar trust banate hain, phir Telegram group me deposit karwa kar loot lete hain.'
  },
  {
    id: 3,
    category: 'bank',
    questionEn: 'Someone calls claiming they mistakenly sent Rs 20,000 to your Easypaisa wallet and begs you to send it back. What should be your first action?',
    questionUr: 'کوئی شخص فون کر کے کہتا ہے کہ غلطی سے آپ کے ایزی پیسہ میں 20,000 روپے بھیج دیے ہیں اور رونے لگتا ہے۔ آپ کا پہلا قدم کیا ہونا چاہیے؟',
    questionRoman: 'Koi call kar k kehta hai k ghalti se aap k Easypaisa me 20,000 transfer ho gaye hain aur wapis mangta hai. Pehle kya karain?',
    optionsEn: [
      'Send the money back immediately because the caller is distressed',
      'Open your official mobile app to check your actual balance and statement',
      'Forward their SMS to your friends',
      'Delete the Easypaisa app'
    ],
    optionsUr: [
      'فوری رقم واپس بھیج دیں کیونکہ سامنے والا پریشان ہے',
      'اپنی اصل ایپ کھول کر بیلنس اور ٹرانزیکشن ہسٹری خود چیک کریں',
      'اس کا میسج دوستوں کو فارورڈ کر دیں',
      'ایزی پیسہ ایپ ڈیلیٹ کر دیں'
    ],
    optionsRoman: [
      'Foran paise wapis bhej dain kyun k caller ro raha hai',
      'Apni official app khol kar balance aur transaction history verify karain',
      'Unka message doston ko forward kar dain',
      'Easypaisa app delete kar dain'
    ],
    correctIndex: 1,
    explanationEn: 'Fraudsters send fake SMS messages imitating 3737/8558. Always verify directly inside your official banking application first.',
    explanationUr: 'فراڈیے جعلی ایس ایم ایس بھیج کر جھوٹا دعویٰ کرتے ہیں۔ ہمیشہ اپنی ایپ میں لاگ ان ہو کر بیلنس دیکھیں۔',
    explanationRoman: 'Scammers fake SMS bhej kar darate hain. Hamesha official app khol kar balance check karain.'
  },
  {
    id: 4,
    category: 'call',
    questionEn: 'A caller asks you to download "AnyDesk" or "TeamViewer" to fix an issue on your mobile banking app. What should you do?',
    questionUr: 'کالر آپ سے کہتا ہے کہ بینک ایپ کی خرابی دور کرنے کے لیے موبائل میں "AnyDesk" ایپ ڈاؤن لوڈ کریں۔ آپ کو کیا کرنا چاہیے؟',
    questionRoman: 'Caller kehta hai ke banking app ka masla theek karne k liye mobile me AnyDesk install karain. Kya karna chahiye?',
    optionsEn: [
      'Install it quickly so the technician can resolve the error',
      'Never install it; remote desktop apps allow scammers to view your screen and steal funds',
      'Install it on your laptop instead of your phone',
      'Turn on airplane mode while installing'
    ],
    optionsUr: [
      'فوری انسٹال کر لیں تاکہ مسئلہ حل ہو سکے',
      'ہرگز انسٹال نہ کریں؛ اس سے کالر آپ کے موبائل کی اسکرین دیکھ کر پاس ورڈ چرا لیتا ہے',
      'فون کے بجائے لیپ ٹاپ پر ڈاؤن لوڈ کریں',
      'انسٹال کرتے وقت ہوائی جہاز موڈ آن کر دیں'
    ],
    optionsRoman: [
      'Foran install kar lain taake masla solve ho jaye',
      'Hargiz install na karain; is se caller aap ki screen dekh kar account saaf kar deta hai',
      'Laptop par install karain phone par nahi',
      'Install karte waqt airplane mode on karain'
    ],
    correctIndex: 1,
    explanationEn: 'AnyDesk and TeamViewer grant full screen-sharing and remote control, allowing thieves to view your passwords and OTPs in real-time.',
    explanationUr: 'اینی ڈیسک جیسی ایپس ہیکرز کو آپ کے فون کا مکمل کنٹرول دے دیتی ہیں جس سے وہ لائیو او ٹی پی اور رقم نکال لیتے ہیں۔',
    explanationRoman: 'AnyDesk se scammers aap k phone ki live screen dekh kar OTP aur banking password chura lete hain.'
  },
  {
    id: 5,
    category: 'job',
    questionEn: 'You are selected for a work-from-home job, but they ask for Rs 2,500 "registration and kit fee" via JazzCash. Is this genuine?',
    questionUr: 'گھر بیٹھے نوکری مل گئی ہے لیکن کمپنی کہتی ہے کہ کام شروع کرنے کے لیے 2,500 روپے رجسٹریشن فیس جاز کیش کروائیں۔ کیا یہ سچی کمپنی ہے؟',
    questionRoman: 'Ghar bethe job mil gayi lekin company kehti hai k kaam shuru karne k liye 2,500 registration fee JazzCash karain. Kya yeh genuine hai?',
    optionsEn: [
      'Yes, small processing fees are normal in Pakistan',
      'No, real companies never ask job seekers to pay registration or training fees',
      'Yes, as long as they provide a digital receipt',
      'Yes, but only if they promise a high salary'
    ],
    optionsUr: [
      'ہاں، معمولی فیس لینا عام بات ہے',
      'نہیں، حقیقی کمپنیاں کبھی نوکری کے لیے امیدوار سے فیس یا پیسے نہیں مانگتیں',
      'ہاں، اگر وہ رسید فراہم کریں',
      'ہاں، اگر تنخواہ زیادہ بتائیں'
    ],
    optionsRoman: [
      'Haan, thori bohat processing fee lena normal hai',
      'Nahi, real companies kabhi bhi job seeker se registration ya kit fee nahi maangti',
      'Haan, agar woh receipt dain',
      'Haan, agar salary zyada ho'
    ],
    correctIndex: 1,
    explanationEn: 'Legitimate employers never charge registration, training, or kit fees. Demanding upfront fees is advance-fee job fraud.',
    explanationUr: 'کوئی بھی معتبر کمپنی نوکری کے لیے امیدوار سے پیسے نہیں لیتی۔ فیس مانگنا فراڈ کی سب سے بڑی نشانی ہے۔',
    explanationRoman: 'Koi bhi legitimate employer job k badle fees nahi maangta. Advance fee mangna 100% job scam hai.'
  },
  {
    id: 6,
    category: 'prize',
    questionEn: 'You get an SMS: "Mubarak ho! Aap ka BISP 25,000 manzoor ho gaya hai. Call 0300-1234567 to claim." How do you verify this?',
    questionUr: 'ایس ایم ایس آیا: "مبارک ہو! بی آئی ایس پی 25000 منظور ہو گیا، 0300 پر کال کریں۔" اس کی تصدیق کیسے کرنی چاہیے؟',
    questionRoman: 'SMS mila: "Mubarak ho! BISP 25,000 manzoor ho gaya, 0300 par rabta karain." Isay kaise verify karain?',
    optionsEn: [
      'Call the 0300 mobile number immediately',
      'Check only through official BISP 8171 web portal or your local tehsil office',
      'Send them Rs 500 mobile card load to unlock the funds',
      'Share your CNIC front and back photo'
    ],
    optionsUr: [
      'فوری اس 0300 موبائل نمبر پر کال ملائیں',
      'صرف سرکاری 8171 ویب پورٹل یا قریبی تحصیل بی آئی ایس پی دفتر سے تصدیق کریں',
      'فنڈز حاصل کرنے کے لیے 500 روپے کا کارڈ لوڈ بھیجیں',
      'اپنے شناختی کارڈ کی دونوں طرف کی تصویر بھیجیں'
    ],
    optionsRoman: [
      'Foran us 0300 mobile number par call karain',
      'Sirf official BISP 8171 web portal ya tehsil office se check karain',
      '500 rupay ka card load bhejain',
      'Apne CNIC ki photo send karain'
    ],
    correctIndex: 1,
    explanationEn: 'Official BISP communications only use the official 8171 shortcode. Ordinary 11-digit mobile numbers are always scammers.',
    explanationUr: 'حکومت کی طرف سے تمام پیغامات صرف 8171 کوڈ سے آتے ہیں۔ عام موبائل نمبرز ہمیشہ دھوکے بازوں کے ہوتے ہیں۔',
    explanationRoman: 'Govt BISP alerts sirf 8171 shortcode se aate hain. Personal mobile number se aane wale messages fraud hotay hain.'
  },
  {
    id: 7,
    category: 'crypto',
    questionEn: 'A telegram trading bot guarantees you will double your investment every 7 days with "zero risk". What is the truth?',
    questionUr: 'ایک ٹیلی گرام بوٹ دعویٰ کرتا ہے کہ 7 دنوں میں آپ کی رقم بغیر کسی نقصان کے ڈبل ہو جائے گی۔ سچ کیا ہے؟',
    questionRoman: 'Ek Telegram bot guarantee deta hai k 7 din me baghair kisi risk k aap k paise double ho jayen ge. Asal sach kya hai?',
    optionsEn: [
      'It is an advanced AI hedge fund that discovered an arbitrage loophole',
      'It is a classic Ponzi scam that will take your initial deposit and vanish',
      'It is guaranteed because they have an international license',
      'It is safe if you invest only a small amount'
    ],
    optionsUr: [
      'یہ کوئی جدید منافع بخش نظام ہے',
      'یہ پونزی اسکیم ہے جو رقم جمع ہوتے ہی غائب ہو جاتی ہے',
      'یہ محفوظ ہے کیونکہ ان کے پاس لائسنس ہے',
      'اگر کم رقم لگائیں تو محفوظ ہے'
    ],
    optionsRoman: [
      'Yeh koi latest AI software hai jo guaranteed kamata hai',
      'Yeh Ponzi scam hai jo paisa ikatha kar k bhag jata hai',
      'Yeh 100% safe hai kyun k unke pas license hai',
      'Thori amount lagana safe hai'
    ],
    correctIndex: 1,
    explanationEn: 'No legitimate investment can guarantee double returns in days. High fixed daily returns with referral bonuses are Ponzi schemes.',
    explanationUr: 'کوئی بھی جائز ادارہ چند دنوں میں رقم دگنی کرنے کی گارنٹی نہیں دے سکتا۔ یہ پونزی دھوکہ دہی ہے۔',
    explanationRoman: 'Duniya me koi aisa legal business nahi jo 7 din me paisa double kar sake. Yeh Ponzi fraud hota hai.'
  },
  {
    id: 8,
    category: 'shopping',
    questionEn: 'An online seller offers an iPhone 15 for Rs 35,000, but insists on full advance payment via Easypaisa and refuses Cash on Delivery. What should you do?',
    questionUr: 'آن لائن دکاندار 35 ہزار میں نیا آئی فون پیش کرتا ہے لیکن کیش آن ڈیلیوری سے انکار کر کے ایڈوانس رقم مانگتا ہے۔ آپ کو کیا کرنا چاہیے؟',
    questionRoman: 'Ek online seller iPhone 15 sirf 35,000 me de raha hai, lekin COD se inkar kar k advance Easypaisa mangta hai. Kya karain?',
    optionsEn: [
      'Transfer the full amount quickly before someone else buys it',
      'Walk away; luxury items at absurdly low prices with advance-only payments are scams',
      'Send half the payment first as a compromise',
      'Ask for their CNIC number before transferring'
    ],
    optionsUr: [
      'فوری رقم ٹرانسفر کر دیں تاکہ سستا سودا ہاتھ سے نہ نکلے',
      'معاملہ ختم کریں؛ غیر حقیقی سستی اشیاء اور ایڈوانس ادائیگی کا اصرار دھوکہ دہی ہے',
      'درمیانی راستہ نکال کر آدھی رقم بھیجیں',
      'پیسے بھیجنے سے پہلے ان کا شناختی کارڈ نمبر مانگیں'
    ],
    optionsRoman: [
      'Foran full payment bhej dain taake deal hath se na nikal jaye',
      'Deal cancel karain; itni sasti cheez aur advance payment ka israar 100% scam hai',
      'Aadhi payment advance bhej dain',
      'Unka CNIC number maang kar transfer karain'
    ],
    correctIndex: 1,
    explanationEn: 'Absurdly cheap prices combined with refusal of Cash on Delivery (COD) are standard advance-fee retail scams.',
    explanationUr: 'غیر حقیقی سستی قیمتیں اور ایڈوانس رقم پر اصرار ہمیشہ جعلی دکانوں کا طریقہ واردات ہوتا ہے۔',
    explanationRoman: 'Ghair haqeeqi sasti cheezein aur Cash on Delivery se inkar advance fee fraud ki nishani hai.'
  }
];
