import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  PhoneCall,
  Lock,
  Smartphone,
  ShieldAlert,
  Users,
  CheckCircle2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { SupportedLanguage } from '../lib/types';

interface EmergencyChecklistProps {
  lang: SupportedLanguage;
  onOpenReport?: () => void;
  onOpenScanner?: () => void;
}

export const EmergencyChecklist: React.FC<EmergencyChecklistProps> = ({
  lang,
  onOpenReport: _onOpenReport,
  onOpenScanner: _onOpenScanner
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const isUr = lang === 'ur';
  const isRoman = lang === 'roman';

  const EMERGENCY_STEPS = [
    {
      step: 1,
      icon: PhoneCall,
      title: isUr
        ? 'مرحلہ ۱: اپنے بینک یا والٹ کا اکاؤنٹ فوری بلاک کروائیں'
        : isRoman
        ? 'Step 1: Apne Bank ya Wallet Account ko Foran Freeze Karwayein'
        : 'Step 1: Immediately Freeze Your Bank or Wallet Account',
      urgency: isUr ? 'فوری ضروری' : 'Immediate Priority',
      description: isUr
        ? 'اگر آپ نے او ٹی پی یا کارڈ تفصیلات شیئر کر دی ہیں، تو بغیر تاخیر اپنی ہیلپ لائن پر کال کر کے لین دین منجمد کروائیں۔'
        : isRoman
        ? 'Agar OTP ya card share kia hai, to foran helpline call karein aur temporary freeze request karein.'
        : 'If you shared an OTP, PIN, or card details, immediately dial your provider helpline to halt all outbound transfers.',
      contacts: [
        { name: 'Easypaisa', helpline: '3737' },
        { name: 'JazzCash', helpline: '4444' },
        { name: 'FIA Cyber Crime', helpline: '1991' },
        { name: 'Banking Mohtasib', helpline: '021-99217334-38' }
      ]
    },
    {
      step: 2,
      icon: Lock,
      title: isUr
        ? 'مرحلہ ۲: پاسورڈز اور ایم پن (MPIN) فوری تبدیل کریں'
        : isRoman
        ? 'Step 2: Passwords aur MPIN Foran Change Karein'
        : 'Step 2: Change Passwords, MPINs & Log Out Active Sessions',
      urgency: isUr ? 'سیکیورٹی قدم' : 'Account Security',
      description: isUr
        ? 'کسی محفوظ دوسرے موبائل سے اپنے والٹ کا نیا پن کوڈ بنائیں اور گوگل و سوشل میڈیا اکاؤنٹس سے تمام پرانے سیشنز لاگ آؤٹ کریں۔'
        : isRoman
        ? 'Kisi doosre safe phone se bank password aur MPIN change karein aur all devices se logout karein.'
        : 'From a clean or alternate device, change your mobile wallet MPIN, online banking password, and sign out of all active sessions.'
    },
    {
      step: 3,
      icon: Smartphone,
      title: isUr
        ? 'مرحلہ ۳: فون سے مشتبہ ایپس ڈیلیٹ کریں اور انٹرنیٹ منقطع کریں'
        : isRoman
        ? 'Step 3: AnyDesk ya Unknown APK Foran Uninstall Karein'
        : 'Step 3: Disconnect Data & Remove Remote Access Apps',
      urgency: isUr ? 'تکنیکی حفاظت' : 'Device Cleanliness',
      description: isUr
        ? 'اگر کالر کے کہنے پر اینی ڈیسک یا کوئی اے پی کے فائل ڈالی تھی، تو موبائل کو ایئرپلین موڈ پر لگا کر وہ ایپ فوری ڈیلیٹ کریں۔'
        : isRoman
        ? 'Airplane mode lagayein ta k hacker ka access toot jaye, aur settings me ja kar app uninstall karein.'
        : 'If instructed to install AnyDesk, TeamViewer, or an APK file, turn on Airplane Mode to cut connection and uninstall the app.'
    },
    {
      step: 4,
      icon: ShieldAlert,
      title: isUr
        ? 'مرحلہ ۴: ایف آئی اے اور پی ٹی اے میں باضابطہ شکایت درج کریں'
        : isRoman
        ? 'Step 4: FIA NR3C aur PTA Me Complaint File Karein'
        : 'Step 4: Register an Official Cyber Crime Complaint',
      urgency: isUr ? 'قانونی کارروائی' : 'Legal Action',
      description: isUr
        ? 'تمام کال ریکارڈنگز، ایس ایم ایس اور بینک ٹرانسفر رسیدیں محفوظ رکھیں اور ایف آئی اے پورٹل پر قانونی اندراج کروائیں۔'
        : isRoman
        ? 'Transaction slips aur chat screenshots save karke FIA cyber crime portal par complaint darj karein.'
        : 'Save all payment slips, transaction IDs, caller numbers, and SMS screenshots. Lodge a formal inquiry with FIA NR3C and PTA.',
      linkText: 'Lodge Complaint at FIA NR3C Portal',
      linkUrl: 'https://complaint.nr3c.gov.pk/'
    },
    {
      step: 5,
      icon: Users,
      title: isUr
        ? 'مرحلہ ۵: گھر والوں اور قریبی دوستوں کو باخبر کریں'
        : isRoman
        ? 'Step 5: Family aur Friends ko Alert Karein'
        : 'Step 5: Warn Family to Prevent Extortion or Fake Emergency Calls',
      urgency: isUr ? 'بلیک میلنگ روک تھام' : 'Prevent Blackmail',
      description: isUr
        ? 'اگر کسی جعلی لون ایپ یا بلیک میلر نے آپ کے رابطے چرا لیے ہیں، تو اپنے رشتہ داروں کو پہلے ہی بتا دیں تاکہ وہ کسی جھانسے میں نہ آئیں۔'
        : isRoman
        ? 'Family ko pehle hi inform karein k agar unknown number se paise mangne ki call aye to ignore karein.'
        : 'If loan apps or blackmailers stole your contacts, warn family and colleagues immediately so they do not fall for fake emergency calls.'
    }
  ];

  const totalSteps = EMERGENCY_STEPS.length;
  const doneCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <AlertTriangle className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                {isUr ? 'ہنگامی رہنمائی' : isRoman ? 'Emergency Action Guide' : 'Emergency Action Protocol'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {isUr ? 'کیا آپ کے ساتھ دھوکہ ہو گیا ہے؟' : isRoman ? "I Think I've Been Scammed - Emergency Checklist" : "I Think I've Been Scammed — Immediate Steps"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 text-xs font-bold text-rose-700 dark:text-rose-300 self-start sm:self-auto">
            <span>Progress: {doneCount}/{totalSteps} Actions</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          {isUr
            ? 'گھبرائیں نہیں! وقت سب سے اہم ہے۔ فوری طور پر نیچے دیئے گئے اقدامات پر عمل کریں تاکہ مزید مالی نقصان یا بلیک میلنگ کو روکا جا سکے۔'
            : isRoman
            ? 'Ghabrayein nahi! Sab se pehle account freeze karein aur steps complete karein ta k mazeed nuqsan na ho sake.'
            : 'Do not panic. Time is critical. Follow these numbered steps in sequence to halt further unauthorized transactions, protect your identity, and report the fraud.'}
        </p>

        {/* Verification note */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          * Always confirm contact details on the official website.
        </p>
      </motion.div>

      {/* Step Checklist Cards */}
      <div className="space-y-4">
        {EMERGENCY_STEPS.map((item, idx) => {
          const isDone = !!completedSteps[item.step];
          const IconComponent = item.icon;

          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.25 }}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <button
                    onClick={() => toggleStep(item.step)}
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                    }`}
                    aria-label={`Mark step ${item.step} completed`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.urgency}
                      </span>
                      <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>

                    {/* Helplines Pill List */}
                    {item.contacts && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.contacts.map((c, i) => (
                          <div
                            key={i}
                            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                          >
                            <PhoneCall className="w-3 h-3 text-emerald-600" />
                            <span>{c.name}: <strong>{c.helpline}</strong></span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action link */}
                    {item.linkUrl && (
                      <div className="pt-2">
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
                        >
                          <span>{item.linkText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-600 dark:text-slate-300">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Official Reassurance Card */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <p className="font-bold text-slate-800 dark:text-slate-200">
          Important Legal Reminder:
        </p>
        <p>
          State Bank of Pakistan regulations mandate that mobile wallet and commercial banking providers maintain 24/7 fraud reporting desks. Once an unauthorized transaction is flagged, funds transferred to fraudulent beneficiary accounts can be placed on administrative hold pending inquiry. Always obtain a formal Complaint Reference Number.
        </p>
      </div>
    </div>
  );
};
