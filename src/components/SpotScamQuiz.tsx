import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Share2, Sparkles, ChevronRight, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../lib/quizData';
import { SupportedLanguage } from '../lib/types';

interface SpotScamQuizProps {
  lang: SupportedLanguage;
}

export const SpotScamQuiz: React.FC<SpotScamQuizProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const questionText = lang === 'ur' ? currentQ.questionUr : lang === 'roman' ? currentQ.questionRoman : currentQ.questionEn;
  const options = lang === 'ur' ? currentQ.optionsUr : lang === 'roman' ? currentQ.optionsRoman : currentQ.optionsEn;
  const explanation = lang === 'ur' ? currentQ.explanationUr : lang === 'roman' ? currentQ.explanationRoman : currentQ.explanationEn;

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Already answered
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      if (score >= 6) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
    setCopied(false);
  };

  const shareText = `🎯 I scored ${score}/${QUIZ_QUESTIONS.length} on the Pakistan "Spot the Scam" Quiz with 360 ScamShield AI! 🛡️
Test your fraud detection skills against real Pakistani SMS, Easypaisa, and WhatsApp scams.`;

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Quiz Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Scam Awareness Challenge</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Spot the Scam Quiz
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Test your defense against genuine Pakistani phishing, Easypaisa tricks, and fake job traps.
        </p>
      </div>

      {!isCompleted ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
        >
          {/* Progress Bar & Question Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-emerald-600 font-extrabold">Score: {score}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Category: {currentQ.category}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed">
              {questionText}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              const showResult = selectedOption !== null;

              let btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50';

              if (showResult) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold';
                } else {
                  btnStyle = 'border-slate-200 dark:border-slate-800 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-2xl border text-xs sm:text-sm text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="leading-relaxed">{opt}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}
            >
              <strong className="block font-bold">
                {selectedOption === currentQ.correctIndex ? 'Correct! 🎯' : 'Incorrect ⚠️'}
              </strong>
              <p>{explanation}</p>
            </motion.div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </motion.div>
      ) : (
        /* Quiz Completion Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Quiz Completed!
            </h3>
            <p className="text-xs text-slate-500">
              Your official fraud detection score:
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 max-w-xs mx-auto">
            <span className="text-5xl font-black text-emerald-600">
              {score}
            </span>
            <span className="text-lg font-bold text-slate-400"> / {QUIZ_QUESTIONS.length}</span>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              {score === 8 ? 'Master Scam Detective 🛡️' : score >= 6 ? 'Vigilant Citizen 🔍' : 'Needs Practice ⚠️'}
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Share your score with family members and friends on WhatsApp to help raise awareness against Pakistani cyber crime!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Score on WhatsApp</span>
            </a>
            <button
              onClick={handleCopyShare}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>

        </motion.div>
      )}

    </div>
  );
};
