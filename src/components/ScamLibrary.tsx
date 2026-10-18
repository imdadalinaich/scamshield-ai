import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Filter
} from 'lucide-react';
import { SCAM_LIBRARY_DATA, ScamLibraryEntry } from '../lib/scamLibraryData';
import { ScamCategory, SupportedLanguage } from '../lib/types';

interface ScamLibraryProps {
  lang: SupportedLanguage;
  onScanCategory: (category: ScamCategory) => void;
  onOpenEmergencyChecklist?: () => void;
}

export const ScamLibrary: React.FC<ScamLibraryProps> = ({
  lang,
  onScanCategory,
  onOpenEmergencyChecklist
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const isUr = lang === 'ur';
  const isRoman = lang === 'roman';

  const categories = [
    { id: 'all', label: isUr ? 'تمام فراڈز' : isRoman ? 'Tamam Scams' : 'All Fraud Types' },
    { id: 'sms', label: isUr ? 'ایس ایم ایس فراڈ' : isRoman ? 'SMS & Relief' : 'SMS & BISP' },
    { id: 'bank', label: isUr ? 'بینک و والٹ' : isRoman ? 'Bank & Wallets' : 'Bank & Wallets' },
    { id: 'whatsapp', label: isUr ? 'واٹس ایپ ٹاسک' : isRoman ? 'WhatsApp Tasks' : 'WhatsApp Tasks' },
    { id: 'job', label: isUr ? 'نوکریاں و ویزا' : isRoman ? 'Jobs & Visa' : 'Jobs & Visa' },
    { id: 'call', label: isUr ? 'کالز اور دھمکیاں' : isRoman ? 'Vishing & Calls' : 'Calls & Impersonation' },
    { id: 'loan_app', label: isUr ? 'لون ایپس' : isRoman ? 'Loan Apps' : 'Loan Apps' },
    { id: 'investment', label: isUr ? 'کرپٹو و پونزی' : isRoman ? 'Crypto & Ponzi' : 'Crypto & Ponzi' },
    { id: 'marketplace', label: isUr ? 'مارکیٹ پلیس' : isRoman ? 'Marketplace' : 'Marketplace' },
    { id: 'website', label: isUr ? 'ویب سائٹس و ایپس' : isRoman ? 'Websites & APKs' : 'Web & Remote APK' }
  ];

  const filteredEntries = useMemo(() => {
    return SCAM_LIBRARY_DATA.filter((entry) => {
      const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      const title = (isUr ? entry.titleUr : isRoman ? entry.titleRoman : entry.titleEn).toLowerCase();
      const summary = (isUr ? entry.summaryUr : isRoman ? entry.summaryRoman : entry.summaryEn).toLowerCase();
      const whatItIs = (isUr ? entry.whatItIsUr : isRoman ? entry.whatItIsRoman : entry.whatItIsEn).toLowerCase();

      return title.includes(term) || summary.includes(term) || whatItIs.includes(term);
    });
  }, [selectedCategory, searchTerm, isUr, isRoman]);

  const toggleExpand = (id: string) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>National Cyber Threat Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {isUr ? 'پاکستان اسکیم انسائیکلوپیڈیا' : isRoman ? 'Pakistan Scam Library & Threat Guide' : 'Pakistan Scam Library & Awareness Guide'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {isUr
              ? 'پاکستان میں عام ہونے والے تمام ڈیجیٹل فراڈز، ان کے کام کرنے کا طریقہ اور فوری تحفظ کی مکمل رہنمائی۔'
              : isRoman
              ? 'Pakistan me active tamam viral online scams, step-by-step tareeqa-e-wardat aur fori bachaav ki practical guide.'
              : 'Detailed breakdown of the most frequent cyber frauds in Pakistan, step-by-step attack methods, realistic scripts, red flags, and verified emergency recourse.'}
          </p>
        </div>

        {/* Emergency Checklist Fast Action Button */}
        {onOpenEmergencyChecklist && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenEmergencyChecklist}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20 hover:bg-rose-700 transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse-slow" />
            <span>{isUr ? 'ہنگامی چیک لسٹ (کیا آپ شکار ہوئے؟)' : isRoman ? "I've Been Scammed — Checklist" : "I Think I've Been Scammed"}</span>
          </motion.button>
        )}
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isUr
                ? 'فراڈ تلاش کریں (مثلاً: ایزی پیسہ، بی آئی ایس پی، یوٹیوب ٹاسک، او ٹی پی)...'
                : isRoman
                ? 'Search scam by name or keyword (e.g. Easypaisa, BISP, typing job, AnyDesk)...'
                : 'Search frauds by name, script or keyword (e.g. Easypaisa reversal, BISP 25,000, job fee, OTP)...'
            }
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scam Library Cards Grid */}
      {filteredEntries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No matching scam records found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or select "All Fraud Types" to view the full directory.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry, idx) => {
            const isExpanded = expandedCardId === entry.id;
            const title = isUr ? entry.titleUr : isRoman ? entry.titleRoman : entry.titleEn;
            const summary = isUr ? entry.summaryUr : isRoman ? entry.summaryRoman : entry.summaryEn;
            const whatItIs = isUr ? entry.whatItIsUr : isRoman ? entry.whatItIsRoman : entry.whatItIsEn;
            const steps = isUr ? entry.stepByStepAttackUr : isRoman ? entry.stepByStepAttackRoman : entry.stepByStepAttackEn;
            const scripts = isUr ? entry.typicalScriptsUr : isRoman ? entry.typicalScriptsRoman : entry.typicalScriptsEn;
            const redFlags = isUr ? entry.redFlagsUr : isRoman ? entry.redFlagsRoman : entry.redFlagsEn;
            const protection = isUr ? entry.protectionUr : isRoman ? entry.protectionRoman : entry.protectionEn;
            const immediate = isUr ? entry.immediateActionUr : isRoman ? entry.immediateActionRoman : entry.immediateActionEn;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.25 }}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Card Summary Header */}
                <div
                  onClick={() => toggleExpand(entry.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none space-y-3 group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {entry.category}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        Authority Ref: {entry.reportingAgency}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-emerald-600 transition-colors">
                      <span className="hidden sm:inline">
                        {isExpanded ? 'Collapse guide' : 'Read protection guide'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {summary}
                  </p>
                </div>

                {/* Expanded Detailed Guide */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30 p-5 sm:p-7 space-y-6 text-xs sm:text-sm"
                    >
                      {/* What It Is */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>What It Is</span>
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                          {whatItIs}
                        </p>
                      </div>

                      {/* Step-by-Step Attack Blueprint */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          How the Attack Works (Step-by-Step)
                        </h4>
                        <div className="space-y-2">
                          {steps.map((st, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                              <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                                {i + 1}
                              </span>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                {st}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Typical Scripts / Deceptive Messages (Described in Author's own words) */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Typical Scripts & Messages (Deception Patterns)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {scripts.map((sc, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-slate-800 dark:text-slate-200 italic"
                            >
                              "{sc}"
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Red Flags & How to Protect Side-by-Side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Red Flags */}
                        <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Warning Signs (Red Flags)</span>
                          </h4>
                          <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                            {redFlags.map((rf, i) => (
                              <li key={i} className="leading-relaxed">
                                {rf}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* How to Protect */}
                        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>How to Protect Yourself</span>
                          </h4>
                          <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                            {protection.map((pr, i) => (
                              <li key={i} className="leading-relaxed">
                                {pr}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Immediate Response If Targeted */}
                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                          <span>Immediate Actions If Targeted</span>
                        </h4>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                          {immediate.map((im, i) => (
                            <li key={i} className="leading-relaxed">
                              {im}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Bar: Action buttons and official reporting */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>Report to: <strong>{entry.reportingAgency}</strong></span>
                          <span>•</span>
                          <span>Helpline: <strong>{entry.helpline}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={entry.reportingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                          >
                            <span>Official Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <button
                            onClick={() => onScanCategory(entry.category)}
                            className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                          >
                            <span>Scan this threat</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Mandatory confirmation reminder */}
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        * Always confirm contact details on the official website.
                      </p>

                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
};
