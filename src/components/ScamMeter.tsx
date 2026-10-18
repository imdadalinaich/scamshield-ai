import React, { useEffect, useState } from 'react';
import { ScanVerdict, ConfidenceLevel } from '../lib/types';
import { ShieldCheck, AlertTriangle, ShieldAlert, HelpCircle } from 'lucide-react';

interface ScamMeterProps {
  score: number; // 0 to 100
  verdict: ScanVerdict;
  confidence: ConfidenceLevel;
}

export const ScamMeter: React.FC<ScamMeterProps> = ({ score, verdict, confidence }) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Smooth count-up effect
  useEffect(() => {
    let start = 0;
    const duration = 600; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * score);
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // Color selection
  const getColorScheme = () => {
    if (verdict === 'Safe' || displayScore < 35) {
      return {
        stroke: '#10B981', // emerald-500
        text: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
        icon: ShieldCheck,
        label: 'Low Risk / Likely Safe'
      };
    }
    if (verdict === 'Suspicious' || displayScore < 65) {
      return {
        stroke: '#F59E0B', // amber-500
        text: 'text-amber-600 dark:text-amber-400',
        badgeBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800',
        icon: AlertTriangle,
        label: 'Suspicious / Proceed With Caution'
      };
    }
    if (verdict === 'Not Sure') {
      return {
        stroke: '#8B5CF6', // purple-500
        text: 'text-purple-600 dark:text-purple-400',
        badgeBg: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-800',
        icon: HelpCircle,
        label: 'Inconclusive / Signals Disagree'
      };
    }
    return {
      stroke: '#EF4444', // red-500
      text: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800',
      icon: ShieldAlert,
      label: 'Critical Risk / High Probability Scam'
    };
  };

  const scheme = getColorScheme();
  const IconComponent = scheme.icon;

  // Arc calculation for semi-circle gauge (180 degrees)
  // Radius = 80, Circumference of half circle = PI * 80 ~= 251.3
  const radius = 80;
  const halfCircumference = Math.PI * radius;
  const strokeDashoffset = halfCircumference - (displayScore / 100) * halfCircumference;

  // Needle angle (-90 deg at 0, +90 deg at 100)
  const needleAngle = -90 + (displayScore / 100) * 180;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-inner">
      
      {/* Semicircle SVG Gauge */}
      <div className="relative w-56 h-32 flex items-center justify-center overflow-hidden">
        <svg className="w-56 h-56 transform -rotate-90 -mt-24" viewBox="0 0 200 200">
          
          {/* Background Track Arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeDasharray={halfCircumference}
            strokeDashoffset="0"
            className="text-slate-200 dark:text-slate-700"
            strokeLinecap="round"
          />

          {/* Active Value Arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={scheme.stroke}
            strokeWidth="14"
            strokeDasharray={halfCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Needle Pin and Pivot */}
        <div 
          className="absolute bottom-1 left-1/2 -ml-0.5 w-1 h-20 origin-bottom rounded-full transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${needleAngle}deg)`, backgroundColor: scheme.stroke }}
        />
        <div className="absolute bottom-0 w-5 h-5 rounded-full bg-slate-800 dark:bg-white border-2 border-white dark:border-slate-900 shadow-md" />
      </div>

      {/* Number Score Display with Count-up */}
      <div className="text-center mt-2 space-y-1">
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-4xl sm:text-5xl font-black tracking-tight ${scheme.text}`}>
            {displayScore}
          </span>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
            / 100 Risk
          </span>
        </div>

        {/* Verdict Badge with Icon */}
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${scheme.badgeBg}`}>
          <IconComponent className="w-4 h-4" />
          <span>{verdict}</span>
        </div>

        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Confidence Level: <strong className="text-slate-800 dark:text-slate-200">{confidence}</strong>
        </p>
      </div>

    </div>
  );
};
