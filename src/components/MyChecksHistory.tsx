import React from 'react';
import { History, ShieldCheck, AlertTriangle, ShieldAlert, Trash2, ArrowRight } from 'lucide-react';
import { SavedCheck, SupportedLanguage } from '../lib/types';

interface MyChecksHistoryProps {
  checks: SavedCheck[];
  onClear: () => void;
  onSelectCheck: (c: SavedCheck) => void;
  lang: SupportedLanguage;
  preferencesAllowed: boolean;
}

export const MyChecksHistory: React.FC<MyChecksHistoryProps> = ({
  checks,
  onClear,
  onSelectCheck,
  lang,
  preferencesAllowed
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-600" />
            <span>My Threat Checks History</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Personal local scans log. Only saved if preferences storage is accepted.
          </p>
        </div>

        {checks.length > 0 && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:text-rose-500 hover:border-rose-300 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        )}
      </div>

      {!preferencesAllowed && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
          <strong>Notice:</strong> Preferences storage is currently denied in your cookie settings. New checks will not be retained between sessions.
        </div>
      )}

      {checks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <History className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No Past Scans Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Whenever you scan a suspicious SMS, WhatsApp message or job offer, your analysis results will appear here for quick reference.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {checks.map((c) => {
            const isSafe = c.verdict === 'Safe';
            const isScam = c.verdict === 'Likely Scam';

            return (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSafe
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                        : isScam
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-600'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-600'
                    }`}
                  >
                    {isSafe ? <ShieldCheck className="w-5 h-5" /> : isScam ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {c.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isSafe
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : isScam
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {c.verdict} ({c.score}/100)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1 max-w-md">
                      {c.summary || 'Threat analysis scanned'}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {new Date(c.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCheck(c)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <span>Re-scan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
