import React from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  MessageCircle,
  PhoneCall,
  Mail,
  Globe,
  Briefcase,
  CreditCard,
  Gift,
  ShoppingBag,
  TrendingUp,
  UserX
} from 'lucide-react';
import { ScamCategory, SupportedLanguage } from '../lib/types';
import { TRANSLATIONS } from '../lib/translations';

interface CategoryCardsProps {
  selectedCategory: ScamCategory;
  onSelectCategory: (cat: ScamCategory) => void;
  lang: SupportedLanguage;
}

const CATEGORY_ICONS: Record<ScamCategory, React.ElementType> = {
  sms: MessageSquare,
  whatsapp: MessageCircle,
  call: PhoneCall,
  email: Mail,
  website: Globe,
  job: Briefcase,
  bank: CreditCard,
  prize: Gift,
  shopping: ShoppingBag,
  crypto: TrendingUp,
  impersonation: UserX
};

const CATEGORIES_LIST: ScamCategory[] = [
  'sms',
  'whatsapp',
  'call',
  'bank',
  'job',
  'prize',
  'shopping',
  'crypto',
  'impersonation',
  'email',
  'website'
];

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  selectedCategory,
  onSelectCategory,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.chooseCategory}
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          11 Dedicated Engines
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIES_LIST.map((cat, index) => {
          const Icon = CATEGORY_ICONS[cat];
          const catInfo = t.categories[cat];
          const isSelected = selectedCategory === cat;

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.25 }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory(cat)}
              className={`group relative p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-colors duration-200 border ${
                isSelected
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {cat === 'call' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                    Checklist
                  </span>
                )}
                {cat === 'bank' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300">
                    High Risk
                  </span>
                )}
              </div>

              <div className="mt-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                  {catInfo.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {catInfo.subtitle}
                </p>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="selectedCategoryDot"
                  className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
