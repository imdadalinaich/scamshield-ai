import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Heart,
  ExternalLink,
  Cookie,
  FileText,
  Lock,
  Linkedin,
  Facebook,
  Mail,
  Github
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { CREATOR_CONFIG } from '../config/creator';
import { SupportedLanguage } from '../lib/types';

interface FooterProps {
  onOpenCookies: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAbout: () => void;
  lang: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCookies,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAbout,
  lang: _lang
}) => {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 transition-colors pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Creator Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm"
              >
                <ShieldCheck className="w-5 h-5" />
              </motion.div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                360 ScamShield AI
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              An independent community cyber protection initiative dedicated to shielding Pakistani citizens, students, and families from evolving digital financial fraud, fake job offers, and mobile wallet scams.
            </p>

            {/* Sole Creator Credit + Social Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse-slow" />
                <span>by <strong className="text-slate-900 dark:text-white font-bold">{CREATOR_CONFIG.name}</strong></span>
              </div>

              {/* Creator Social Links */}
              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200 dark:border-slate-700">
                {/* LinkedIn (Always visible) */}
                {CREATOR_CONFIG.linkedinUrl && (
                  <motion.a
                    whileHover={{ scale: 1.15, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    href={CREATOR_CONFIG.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Imdad Ali on LinkedIn"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                )}

                {/* Facebook (Only visible if non-empty) */}
                {CREATOR_CONFIG.facebookUrl && CREATOR_CONFIG.facebookUrl.trim() !== '' && (
                  <motion.a
                    whileHover={{ scale: 1.15, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    href={CREATOR_CONFIG.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Imdad Ali on Facebook"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                    title="Facebook Profile"
                  >
                    <Facebook className="w-4 h-4" />
                  </motion.a>
                )}

                {/* Email */}
                {CREATOR_CONFIG.email && (
                  <motion.a
                    whileHover={{ scale: 1.15, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${CREATOR_CONFIG.email}`}
                    aria-label="Contact via Email"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                    title="Email Creator"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                )}

                {/* GitHub */}
                {CREATOR_CONFIG.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.15, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    href={CREATOR_CONFIG.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Creator GitHub"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Legal & Settings Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Safety & Settings
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenCookies}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Cookie className="w-3.5 h-3.5" />
                  <span>Cookie Settings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium cursor-pointer"
                >
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* Official Emergency Contact Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Official Reporting
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://complaint.nr3c.gov.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between group"
                >
                  <span>FIA Cyber Crime (Helpline: 1991)</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://complaint.pta.gov.pk/RegisterComplaint.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between group"
                >
                  <span>PTA Fraud Portal (SMS to 9005)</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bankingmohtasib.gov.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between group"
                >
                  <span>Banking Mohtasib Pakistan</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={CREATOR_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                  <span>Contact Creator</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Disclaimer Bar (Chatbot button buffer included) */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 360 ScamShield AI. AI-assisted guidance only. Always verify with official financial institutions and authorities.
          </p>
          <p className="text-center sm:text-right font-medium text-slate-600 dark:text-slate-400">
            Engineered by Imdad Ali
          </p>
        </div>
      </div>
    </footer>
  );
};
