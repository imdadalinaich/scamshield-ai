import React from 'react';
import { X, Lock, FileText, Info, ExternalLink, Linkedin } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { CREATOR_CONFIG } from '../config/creator';

interface PolicyModalsProps {
  modalType: 'privacy' | 'terms' | 'about' | null;
  onClose: () => void;
  appStats: { average: number; count: number };
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ modalType, onClose, appStats }) => {
  if (!modalType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              {modalType === 'privacy' && <Lock className="w-5 h-5" />}
              {modalType === 'terms' && <FileText className="w-5 h-5" />}
              {modalType === 'about' && <Info className="w-5 h-5" />}
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {modalType === 'privacy' && 'Privacy Policy'}
              {modalType === 'terms' && 'Terms of Service & Disclaimer'}
              {modalType === 'about' && 'About 360 ScamShield AI'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {modalType === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p><strong>Last Updated: October 2026</strong></p>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Zero Raw Message Storage</h4>
            <p>
              When you paste or upload an SMS, WhatsApp text, or screenshot to be analyzed, the raw text is processed in memory solely to calculate threat signals. We <strong>never store raw message text</strong> in any database.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Automatic PII Redaction</h4>
            <p>
              Any experience or comment submitted to the public Community Board undergoes automatic regex sanitization to redact phone numbers, 13-digit Pakistani CNICs, bank credit cards, and email addresses before persistence.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Cookie & Local Storage</h4>
            <p>
              We honor your choices. Essential storage is strictly limited to scanning tokens. "Preferences" cookies save your dark mode choice and local check history only if you explicitly choose "Accept all" or enable it in "Customize".
            </p>
          </div>
        )}

        {modalType === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. AI-Assisted Guidance Only (No Guarantee)</h4>
            <p className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-medium">
              "This is AI-assisted guidance, not a guarantee. Always verify with the official company or bank. The creator is not responsible for decisions made from this result."
            </p>
            <p>
              We explicitly state that cyber threats, social engineering, and fraudulent tactics evolve continuously. 360 ScamShield AI does not claim guaranteed accuracy or provide legally binding verdicts.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Responsible User Submissions</h4>
            <p>
              Users sharing scam reports on the Community Board must not post defamatory, abusive, or intentionally fabricated reports. Content reported 3 times is automatically hidden.
            </p>
          </div>
        )}

        {modalType === 'about' && (
          <div className="space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Creator Attribution
              </span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                ScamShield AI was built by {CREATOR_CONFIG.name}.
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Engineered to combat digital financial fraud, fake job offers, and social engineering scams impacting citizens, youth, and families across Pakistan.
              </p>
            </div>

            {/* Community Rating Showcase (Real DB Data only) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Overall Community Rating</p>
                <p className="text-[11px] text-slate-500">
                  {appStats.count > 0 ? `Based on ${appStats.count} verified user reviews` : 'No ratings yet — be the first to rate!'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-lg">
                <span>★</span>
                <span>{appStats.count > 0 ? `${appStats.average} / 5.0` : 'New'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 dark:text-white">Vision & Protection Goals:</h5>
              <ul className="space-y-1.5 text-xs list-disc list-inside">
                <li>Protecting university students from upfront registration fee job traps.</li>
                <li>Helping elders and families spot fake BISP 25,000 lottery SMS and OTP theft.</li>
                <li>Local language scam education in Urdu and Roman Urdu.</li>
                <li>Collaborative fraud intelligence to alert citizens of emerging threats across Pakistan.</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <a
                href={CREATOR_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>Contact Creator ({CREATOR_CONFIG.name})</span>
              </a>
              {CREATOR_CONFIG.githubUrl && (
                <a
                  href={CREATOR_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
