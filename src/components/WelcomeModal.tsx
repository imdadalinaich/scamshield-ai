import React, { useState } from 'react';
import { ShieldCheck, UserCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SupportedLanguage } from '../lib/types';

interface WelcomeModalProps {
  isOpen: boolean;
  onSignIn: () => Promise<void>;
  onContinueAsGuest: () => void;
  lang: SupportedLanguage;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onSignIn,
  onContinueAsGuest,
  lang
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await onSignIn();
    } catch (err: any) {
      console.warn('Sign-in encounter:', err);
      setErrorMessage('Sign-in was cancelled or encountered a network error. You can continue scanning as a guest!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
        
        {/* Animated Badge Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse-slow">
          <ShieldCheck className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pakistan Anti-Fraud Shield</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome to 360 ScamShield AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Protecting citizens, students, and families across Pakistan from evolving SMS, WhatsApp, Easypaisa, and fake job frauds.
          </p>
        </div>

        {/* Feature comparison highlights */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Guests:</strong> Unlimited threat scans, voice input, screenshot OCR & quiz</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Google Sign-in:</strong> Share community scam warnings, rate stories, & comment</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs text-left">
            {errorMessage}
          </div>
        )}

        <div className="space-y-3 pt-2">
          {/* Sign In with Google */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm shadow-md flex items-center justify-center gap-3 transition-all disabled:opacity-50"
          >
            {/* Google SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{loading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
          </button>

          {/* Continue as Guest */}
          <button
            onClick={onContinueAsGuest}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Continue as Guest (Scan Immediately)</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          No credit card or personal info required. All scans are private and encrypted.
        </p>

      </div>
    </div>
  );
};
