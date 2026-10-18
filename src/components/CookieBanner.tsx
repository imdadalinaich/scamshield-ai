import React, { useState } from 'react';
import { Cookie, ShieldCheck, Check, X, Settings2 } from 'lucide-react';
import { CookiePreferences } from '../lib/types';

interface CookieBannerProps {
  preferences: CookiePreferences;
  onSavePreferences: (prefs: CookiePreferences) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  preferences,
  onSavePreferences,
  isOpen,
  onClose
}) => {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [prefsState, setPrefsState] = useState<CookiePreferences>(preferences);

  if (!isOpen && !showCustomizeModal) return null;

  const handleAcceptAll = () => {
    const updated: CookiePreferences = {
      essential: true,
      preferences: true,
      analytics: true,
      answered: true
    };
    onSavePreferences(updated);
    onClose();
  };

  const handleDenyNonEssential = () => {
    const updated: CookiePreferences = {
      essential: true,
      preferences: false,
      analytics: false,
      answered: true
    };
    onSavePreferences(updated);
    onClose();
  };

  const handleSaveCustom = () => {
    const updated: CookiePreferences = {
      ...prefsState,
      essential: true, // Always locked
      answered: true
    };
    onSavePreferences(updated);
    setShowCustomizeModal(false);
    onClose();
  };

  return (
    <>
      {/* Floating Bottom Banner */}
      {isOpen && !showCustomizeModal && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Your Privacy & Data Choices
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We use essential storage to keep your threat scan active. With your permission, we also use preferences cookies to save your personal check history and remember settings. We never sell your data or store your raw scanned messages.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 justify-end">
              <button
                onClick={() => setShowCustomizeModal(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Customize
              </button>
              <button
                onClick={handleDenyNonEssential}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Deny Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customize Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Cookie className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Cookie & Storage Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Customize which data we are allowed to save locally on your device. Essential storage is required for the application to function.
            </p>

            {/* Toggle Rows */}
            <div className="space-y-4">
              
              {/* Essential */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Essential Storage</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      Always Active
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Allows scam scanning, session authentication, and security token protection.
                  </p>
                </div>
                <div className="w-10 h-6 bg-emerald-600 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-80">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>

              {/* Preferences */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Preferences & History
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Saves your chosen language, dark/light theme, and your private "My Checks" scan history.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPrefsState(p => ({ ...p, preferences: !p.preferences }))}
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    prefsState.preferences ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Anonymous Accuracy Feedback
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Allows anonymous recording of accuracy feedback ("Was this correct?") to improve rules.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPrefsState(p => ({ ...p, analytics: !p.analytics }))}
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    prefsState.analytics ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
              >
                Save My Preferences
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
