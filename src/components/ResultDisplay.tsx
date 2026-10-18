import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScanResult, SupportedLanguage } from '../lib/types';
import { ScamMeter } from './ScamMeter';
import { TRANSLATIONS } from '../lib/translations';

interface ResultDisplayProps {
  result: ScanResult;
  lang: SupportedLanguage;
  onFeedback: (isCorrect: boolean) => void;
  feedbackGiven: boolean | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  lang,
  onFeedback,
  feedbackGiven
}) => {
  const t = TRANSLATIONS[lang];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioNotice, setAudioNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Trigger celebratory confetti on Safe
  useEffect(() => {
    if (result.verdict === 'Safe') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#34D399', '#6EE7B7']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [result.verdict]);

  // Audio Readout via Web Speech API
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      setAudioNotice('Text-to-speech is not supported on this browser.');
      setTimeout(() => setAudioNotice(null), 4000);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const readText = `Verdict: ${result.verdict}. Threat Risk Score: ${result.score} out of 100. Confidence: ${result.confidence}. Reasons: ${result.reasons.join('. ')}. Recommended Action: ${result.actions.join('. ')}.`;
    const utterance = new SpeechSynthesisUtterance(readText);
    utterance.rate = 0.95;
    utterance.lang = lang === 'ur' ? 'ur-PK' : 'en-US';

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // WhatsApp Warning Share Generator
  const shareText = `⚠️ *360 ScamShield AI Warning* ⚠️
Risk Level: *${result.verdict.toUpperCase()}* (Score: ${result.score}/100)
Category: ${result.category.toUpperCase()}

🚨 Top Reasons:
${result.reasons.map((r, i) => `${i + 1}. ${r}`).join('\n')}

🛡️ What To Do:
${result.actions.map((a, i) => `• ${a}`).join('\n')}

_Always verify with official bank or agency. Stay safe!_
Generated via 360 ScamShield AI Pakistan`;

  const handleCopyWarning = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback
    }
  };

  const isScam = result.verdict === 'Likely Scam';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`mt-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 ${
        isScam ? 'animate-shake' : ''
      }`}
    >
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Analysis Report
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Comprehensive Threat Verdict
          </h3>
          {result.signalsBreakdown.isOfflineCheck && (
            <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Offline Rule Engine Check
            </span>
          )}
        </div>

        {/* Read aloud & WhatsApp Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleAudio}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
            title="Read analysis aloud"
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span className="hidden sm:inline">{isPlayingAudio ? 'Stop' : t.listenAudio}</span>
          </button>

          <button
            onClick={handleCopyWarning}
            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy warning"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp Share</span>
          </a>
        </div>
      </div>

      {audioNotice && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs">
          {audioNotice}
        </div>
      )}

      {/* Main Grid: Scam Meter Gauge + Top Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Scam Meter Gauge (Left Column) */}
        <div className="md:col-span-5">
          <ScamMeter
            score={result.score}
            verdict={result.verdict}
            confidence={result.confidence}
          />

          {/* Signals Breakdown Mini Card */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-white">
              Combined Security Signals:
            </h5>
            <div className="space-y-1 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Rule Engine Threat Score:</span>
                <strong className="text-slate-800 dark:text-slate-200">{result.signalsBreakdown.ruleScore} / 100</strong>
              </div>
              <div className="flex justify-between">
                <span>Viral Scam Hash Match:</span>
                <strong className={result.signalsBreakdown.knownHashMatch ? 'text-rose-600' : 'text-emerald-600'}>
                  {result.signalsBreakdown.knownHashMatch ? 'Detected' : 'None'}
                </strong>
              </div>
              {result.signalsBreakdown.aiScore !== undefined && (
                <div className="flex justify-between">
                  <span>Gemini AI Threat Score:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{result.signalsBreakdown.aiScore} / 100</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reasons & Recommended Actions (Right Column) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Top 3 Reasons */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>Key Forensic Reasons</span>
            </h4>
            
            <div className="space-y-2">
              {result.reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What to do now */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What To Do Now</span>
            </h4>
            
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {result.actions.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to verify yourself */}
          <div className="space-y-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-200">
            <h5 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>How To Verify Yourself</span>
            </h5>
            <ul className="space-y-1 text-xs">
              {result.verifySteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Accuracy Feedback Module */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {t.wasResultCorrect}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Anonymous signal feedback to continuously sharpen fraud filters.
          </p>
        </div>

        {feedbackGiven === null ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFeedback(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.yesCorrect}</span>
            </button>
            <button
              onClick={() => onFeedback(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.noIncorrect}</span>
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-xl">
            <Check className="w-4 h-4" />
            <span>{t.feedbackRecorded}</span>
          </div>
        )}
      </div>

      {/* MANDATORY LEGAL & ACCURACY DISCLAIMER */}
      <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
          {result.disclaimer}
        </p>
      </div>

    </motion.div>
  );
};
