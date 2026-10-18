import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { ScamCategory } from '../lib/types';
import { PakistanThreatAlert } from '../server/alertsService';

interface ScamAlertsFeedProps {
  onScanAlert: (category: ScamCategory, tip: string) => void;
  onOpenLibrary?: () => void;
}

export const ScamAlertsFeed: React.FC<ScamAlertsFeedProps> = ({
  onScanAlert,
  onOpenLibrary
}) => {
  const [alerts, setAlerts] = useState<PakistanThreatAlert[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [statusText, setStatusText] = useState<string>('Live Verified Intelligence');
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchAlerts = async (manualRefresh = false) => {
    try {
      if (manualRefresh) setRefreshing(true);
      const url = manualRefresh ? '/api/alerts/refresh' : '/api/alerts';
      const method = manualRefresh ? 'POST' : 'GET';
      const res = await fetch(url, { method });
      const data = await res.json();
      if (data.success && Array.isArray(data.alerts)) {
        setAlerts(data.alerts);
        setLastUpdated(data.lastUpdated);
        setIsLive(data.isLive);
        setStatusText(data.statusText || 'Live Intelligence');
      }
    } catch (err) {
      console.warn('Failed to load live alerts from server:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleScanClick = (alert: PakistanThreatAlert, e: React.MouseEvent) => {
    e.stopPropagation();
    // Prompt rule: "Scan this" on an alert opens the matching scanner category with an empty input and a relevant tip (no pre-filled demo text).
    const tip = `Tip for ${alert.category.toUpperCase()}: ${alert.howToProtect.slice(0, 150)}`;
    onScanAlert(alert.category, tip);
  };

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  return (
    <div className="space-y-4 pt-2">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
            <Radio className="w-4 h-4 animate-pulse-slow" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Live Pakistan Threat Alerts</span>
              {isLive ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse-slow">
                  LIVE
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Verified Archive
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{statusText} {formattedDate && `• Updated ${formattedDate}`}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => fetchAlerts(true)}
            disabled={refreshing}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Refresh verified alerts"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-600' : ''}`} />
            <span className="hidden sm:inline">Check updates</span>
          </button>

          {onOpenLibrary && (
            <button
              onClick={onOpenLibrary}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline px-2 py-1 cursor-pointer"
            >
              Browse Scam Library →
            </button>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {alerts.map((alert, idx) => {
            const isExpanded = expandedId === alert.id;

            return (
              <motion.div
                key={alert.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.25 }}
                onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all cursor-pointer group space-y-3 ${
                  isExpanded
                    ? 'border-slate-300 dark:border-slate-700 shadow-md ring-1 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                {/* Header: Severity & Category */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      alert.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                        : alert.severity === 'High'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                    }`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                      {alert.category}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">
                    {alert.publishedDate}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {alert.title}
                </h4>

                {/* Short Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {alert.shortSummary}
                </p>

                {/* Source Attribution with confirmed real URL */}
                <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <a
                    href={alert.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 truncate max-w-[200px]"
                    title={`Source: ${alert.sourceName}`}
                  >
                    <span className="truncate">{alert.sourceName}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleScanClick(alert, e)}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                    >
                      <span>Scan this</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expandable Details Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs"
                    >
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                        <strong className="text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider block">
                          How the Attack Works:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {alert.howItWorks}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                        <strong className="text-emerald-800 dark:text-emerald-300 text-[11px] uppercase tracking-wider block">
                          How to Protect Yourself:
                        </strong>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {alert.howToProtect}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-1">
                        <strong className="text-rose-800 dark:text-rose-300 text-[11px] uppercase tracking-wider block">
                          If You Were Targeted:
                        </strong>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {alert.whatToDoIfTargeted}
                        </p>
                      </div>

                      <p className="text-[10px] text-slate-400 italic">
                        * Always confirm contact details on the official website.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
