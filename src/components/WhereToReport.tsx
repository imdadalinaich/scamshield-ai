import React from 'react';
import { ExternalLink, Phone, MessageSquare, AlertOctagon, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { SupportedLanguage } from '../lib/types';

interface WhereToReportProps {
  lang: SupportedLanguage;
}

export const WhereToReport: React.FC<WhereToReportProps> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
          <span>Official Pakistani Fraud Reporting</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Where to Report Scams in Pakistan
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          If you lost funds or were targeted by cyber criminals, report immediately to official authorities. All links point directly to official government portals.
        </p>
      </div>

      {/* Emergency First 15 Minutes Checklist */}
      <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-3">
        <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Golden Rule: First 15 Minutes After Fraud</span>
        </h3>
        <ol className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 space-y-1.5 list-decimal list-inside leading-relaxed font-medium">
          <li><strong>Immediately call your bank or mobile wallet:</strong> Request an immediate temporary account freeze so fraudsters cannot transfer out remaining funds.</li>
          <li><strong>Take screenshots:</strong> Save transaction IDs, SMS alerts, caller numbers, and WhatsApp chats before the scammer deletes them.</li>
          <li><strong>Lodge an official complaint:</strong> Submit your dispute with FIA Cyber Crime (UAN 1991) and the State Bank Banking Mohtasib.</li>
        </ol>
      </div>

      {/* Agency Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {APP_CONFIG.officialAgencies.map((agency) => {
          const name = lang === 'ur' ? agency.nameUr : lang === 'roman' ? agency.nameRoman : agency.nameEn;

          return (
            <div
              key={agency.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {agency.badge}
                  </span>
                  <a
                    href={agency.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {agency.descriptionEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Helpline: <strong>{agency.helpline}</strong></span>
                </div>

                {agency.smsCode !== 'N/A' && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>SMS Action: <strong>{agency.smsCode}</strong></span>
                  </div>
                )}

                <a
                  href={agency.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open Official Complaint Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
