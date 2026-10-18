import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, logOut, testConnection } from './lib/firebase';
import { syncUserProfile, submitResultFeedback, fetchAppReviewsAggregate } from './lib/communityService';
import { analyzeScamWithSignals } from './server/geminiService'; // Client offline fallback
import {
  SupportedLanguage,
  ScamCategory,
  ScanResult,
  UserProfile,
  CookiePreferences,
  SavedCheck
} from './lib/types';
import { APP_CONFIG } from './config/appConfig';
import { TRANSLATIONS } from './lib/translations';

// Core Eager Components
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { CategoryCards } from './components/CategoryCards';
import { ScanForm } from './components/ScanForm';
import { ResultDisplay } from './components/ResultDisplay';
import { ScamAlertsFeed } from './components/ScamAlertsFeed';
import { MyChecksHistory } from './components/MyChecksHistory';
import { ShieldBotModal } from './components/ShieldBotModal';
import { CookieBanner } from './components/CookieBanner';
import { WelcomeModal } from './components/WelcomeModal';
import { PolicyModals } from './components/PolicyModals';
import { AppRatingModal } from './components/AppRatingModal';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy-Loaded Route Components for Speed & Code-Splitting
const CommunitySection = React.lazy(() => import('./components/CommunitySection').then(m => ({ default: m.CommunitySection })));
const SpotScamQuiz = React.lazy(() => import('./components/SpotScamQuiz').then(m => ({ default: m.SpotScamQuiz })));
const WhereToReport = React.lazy(() => import('./components/WhereToReport').then(m => ({ default: m.WhereToReport })));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ScamLibrary = React.lazy(() => import('./components/ScamLibrary').then(m => ({ default: m.ScamLibrary })));
const EmergencyChecklist = React.lazy(() => import('./components/EmergencyChecklist').then(m => ({ default: m.EmergencyChecklist })));

const TabLoadingFallback = () => (
  <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-pulse">
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
    <div className="h-40 bg-slate-100 dark:bg-slate-800/60 rounded-2xl w-full" />
  </div>
);

// Icons
import { Shield, Star, CheckCircle2, Lightbulb, AlertTriangle, ArrowRight } from 'lucide-react';

export default function App() {
  // Language & RTL State
  const [lang, setLang] = useState<SupportedLanguage>('en');

  // Dark mode with system preference fallback
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('theme') || sessionStorage.getItem('theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // User Profile
  const [user, setUser] = useState<UserProfile | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<NavTab>('scan');

  // Scanning State
  const [selectedCategory, setSelectedCategory] = useState<ScamCategory>('bank');
  const [inputText, setInputText] = useState('');
  const [categoryTip, setCategoryTip] = useState<string | null>(null);
  const [callAnswers, setCallAnswers] = useState({
    claimedAuthority: false,
    demandedCredentials: false,
    threatenedConsequences: false,
    demandedFundTransfer: false,
    installRemoteApp: false,
    rushedUrgency: false
  });
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);

  // Storage & Cookie Preferences
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(() => {
    try {
      const stored = localStorage.getItem('scamshield_cookie_prefs');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { essential: true, preferences: false, analytics: false, answered: false };
  });
  const [showCookieBanner, setShowCookieBanner] = useState(!cookiePreferences.answered);

  // Welcome modal on first visit
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('scamshield_visited');
    } catch {
      return false;
    }
  });

  // Modals
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | 'about' | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Saved checks history
  const [savedChecks, setSavedChecks] = useState<SavedCheck[]>(() => {
    try {
      const stored = localStorage.getItem('scamshield_history');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  // Real database app rating stats (no hardcoded fake stats)
  const [appStats, setAppStats] = useState<{ average: number; count: number }>({ average: 0, count: 0 });

  // RTL Effect
  useEffect(() => {
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'ur' ? 'ur' : 'en';
  }, [lang]);

  // Dark Mode Effect with CSS variables and data-theme tokens
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#030712');
      try {
        if (cookiePreferences.preferences) {
          localStorage.setItem('theme', 'dark');
        } else {
          sessionStorage.setItem('theme', 'dark');
        }
      } catch {}
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#059669');
      try {
        if (cookiePreferences.preferences) {
          localStorage.setItem('theme', 'light');
        } else {
          sessionStorage.setItem('theme', 'light');
        }
      } catch {}
    }
  }, [darkMode, cookiePreferences.preferences]);

  // Auth Listener & Real Database Stats
  useEffect(() => {
    testConnection();
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const profile = await syncUserProfile(fbUser);
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    fetchAppReviewsAggregate().then(setAppStats).catch(() => {});

    return () => unsubscribe();
  }, []);

  const handleSaveCookiePreferences = (prefs: CookiePreferences) => {
    setCookiePreferences(prefs);
    setShowCookieBanner(false);
    try {
      localStorage.setItem('scamshield_cookie_prefs', JSON.stringify(prefs));
      if (!prefs.preferences) {
        localStorage.removeItem('scamshield_history');
      }
    } catch (e) {}
  };

  const handleGoogleSignIn = async () => {
    try {
      const fbUser = await signInWithGoogle();
      const profile = await syncUserProfile(fbUser);
      setUser(profile);
      setShowWelcomeModal(false);
      try {
        localStorage.setItem('scamshield_visited', 'true');
      } catch {}
    } catch (err) {
      console.warn('Sign-in issue:', err);
      throw err;
    }
  };

  const handleContinueAsGuest = () => {
    setShowWelcomeModal(false);
    try {
      localStorage.setItem('scamshield_visited', 'true');
    } catch {}
  };

  const handleSignOut = async () => {
    await logOut();
    setUser(null);
  };

  // Scam Check Execution
  const handleScan = async () => {
    if (selectedCategory !== 'call' && !inputText.trim()) return;

    setScanning(true);
    setScanResult(null);
    setFeedbackGiven(null);

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          input: inputText,
          callAnswers: selectedCategory === 'call' ? callAnswers : undefined
        })
      });

      const data = await res.json();
      if (data.success && data.result) {
        setScanResult(data.result);
        saveCheckToHistory(data.result);
      } else {
        throw new Error(data.error || 'Server scan failed');
      }
    } catch (err) {
      console.warn('Server check failed, falling back to offline rule evaluation:', err);
      const offlineResult = await analyzeScamWithSignals(
        selectedCategory,
        inputText,
        selectedCategory === 'call' ? callAnswers : undefined
      );
      setScanResult(offlineResult);
      saveCheckToHistory(offlineResult);
    } finally {
      setScanning(false);
    }
  };

  const saveCheckToHistory = (result: ScanResult) => {
    if (!cookiePreferences.preferences) return;

    const newCheck: SavedCheck = {
      id: `chk_${Date.now()}`,
      timestamp: Date.now(),
      category: result.category,
      verdict: result.verdict,
      score: result.score,
      summary: (inputText.slice(0, 100) || `${result.category} threat evaluated`)
    };

    const updated = [newCheck, ...savedChecks.slice(0, 19)];
    setSavedChecks(updated);
    try {
      localStorage.setItem('scamshield_history', JSON.stringify(updated));
    } catch {}
  };

  const handleFeedback = async (isCorrect: boolean) => {
    if (!scanResult) return;
    setFeedbackGiven(isCorrect);
    if (cookiePreferences.analytics) {
      await submitResultFeedback(scanResult.verdict, scanResult.category, isCorrect);
    }
  };

  // Open Scanner with empty input and advisory tip from alerts or library
  const handleOpenScannerWithCategory = (category: ScamCategory, tip?: string) => {
    setSelectedCategory(category);
    setInputText('');
    setCategoryTip(tip || null);
    setScanResult(null);
    setActiveTab('scan');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase() === APP_CONFIG.adminEmail.toLowerCase();
  const t = TRANSLATIONS[lang];

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200 overflow-x-hidden">
        
        {/* Navigation */}
        <Navbar
          lang={lang}
          setLang={setLang}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          onSignIn={() => handleGoogleSignIn().catch(() => {})}
          onSignOut={handleSignOut}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAdmin={isAdmin}
        />

        {/* Main Application Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
          
          <AnimatePresence mode="wait">
            
            {/* TAB 1: THREAT SCANNER */}
            {activeTab === 'scan' && (
              <motion.div
                key="scan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-10"
              >
                {/* Hero Banner with Word-by-Word Reveal */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pt-2">
                  
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold shadow-xs"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{t.tagline}</span>
                  </motion.div>

                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex flex-wrap justify-center gap-x-2">
                    {t.heroTitle.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.035, duration: 0.3 }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal"
                  >
                    {t.heroSubtitle}
                  </motion.p>

                  {/* Social Proof Trust Bar (100% Real Database Data, No Invented Numbers) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400"
                  >
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Multi-Signal Fusion (Rules + Hashes + AI)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>English, اردو, & Roman Urdu</span>
                    </div>
                    <button
                      onClick={() => setShowRatingModal(true)}
                      className="flex items-center gap-1 text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${appStats.count > 0 ? 'fill-amber-500' : ''}`} />
                      <span>
                        {appStats.count > 0
                          ? `${appStats.average} (${appStats.count} Reviews)`
                          : 'No ratings yet — be the first'}
                      </span>
                    </button>
                  </motion.div>
                </div>

                {/* Optional Category Tip (if redirected from Alert or Library) */}
                {categoryTip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-200"
                  >
                    <div className="flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">{categoryTip}</p>
                    </div>
                    <button
                      onClick={() => setCategoryTip(null)}
                      className="text-slate-400 hover:text-slate-600 font-bold px-2 py-0.5 text-xs cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}

                {/* Threat Category Cards */}
                <CategoryCards
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                    setScanResult(null);
                  }}
                  lang={lang}
                />

                {/* Dedicated Category Scan Form */}
                <ScanForm
                  category={selectedCategory}
                  inputText={inputText}
                  setInputText={setInputText}
                  callAnswers={callAnswers}
                  setCallAnswers={setCallAnswers}
                  onSubmit={handleScan}
                  loading={scanning}
                  lang={lang}
                />

                {/* Analysis Result Output */}
                {scanResult && (
                  <ResultDisplay
                    result={scanResult}
                    lang={lang}
                    onFeedback={handleFeedback}
                    feedbackGiven={feedbackGiven}
                  />
                )}

                {/* Verified Pakistani Live Scam Alerts Feed Preview */}
                <ScamAlertsFeed
                  onScanAlert={handleOpenScannerWithCategory}
                  onOpenLibrary={() => setActiveTab('library')}
                />

              </motion.div>
            )}

            {/* TAB 2: LIVE PAKISTAN THREAT ALERTS */}
            {activeTab === 'alerts' && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                <ScamAlertsFeed
                  onScanAlert={handleOpenScannerWithCategory}
                  onOpenLibrary={() => setActiveTab('library')}
                />
              </motion.div>
            )}

            {/* TAB 3: SCAM LIBRARY */}
            {activeTab === 'library' && (
              <motion.div
                key="library"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <React.Suspense fallback={<TabLoadingFallback />}>
                  <ScamLibrary
                    lang={lang}
                    onScanCategory={(cat) => handleOpenScannerWithCategory(cat)}
                    onOpenEmergencyChecklist={() => setActiveTab('checklist')}
                  />
                </React.Suspense>
              </motion.div>
            )}

            {/* TAB 4: EMERGENCY CHECKLIST */}
            {activeTab === 'checklist' && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <React.Suspense fallback={<TabLoadingFallback />}>
                  <EmergencyChecklist
                    lang={lang}
                    onOpenReport={() => setActiveTab('report')}
                    onOpenScanner={() => setActiveTab('scan')}
                  />
                </React.Suspense>
              </motion.div>
            )}

            {/* TAB 5: COMMUNITY EXPERIENCES */}
            {activeTab === 'community' && (
              <motion.div
                key="community"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <React.Suspense fallback={<TabLoadingFallback />}>
                  <CommunitySection
                    user={user}
                    onSignInRequired={() => handleGoogleSignIn().catch(() => {})}
                    lang={lang}
                    isAdmin={isAdmin}
                  />
                </React.Suspense>
              </motion.div>
            )}

            {/* TAB 6: SPOT THE SCAM QUIZ */}
            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <React.Suspense fallback={<TabLoadingFallback />}>
                  <SpotScamQuiz lang={lang} />
                </React.Suspense>
              </motion.div>
            )}

            {/* TAB 7: WHERE TO REPORT */}
            {activeTab === 'report' && (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <React.Suspense fallback={<TabLoadingFallback />}>
                  <WhereToReport lang={lang} />
                </React.Suspense>
              </motion.div>
            )}

            {/* TAB 8: MY CHECKS HISTORY */}
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <MyChecksHistory
                  checks={savedChecks}
                  onClear={() => {
                    setSavedChecks([]);
                    try { localStorage.removeItem('scamshield_history'); } catch {}
                  }}
                  onSelectCheck={(c) => {
                    setSelectedCategory(c.category);
                    setInputText(c.summary);
                    setActiveTab('scan');
                  }}
                  lang={lang}
                  preferencesAllowed={cookiePreferences.preferences}
                />
              </motion.div>
            )}

            {/* TAB 9: ADMIN DASHBOARD */}
            {activeTab === 'admin' && isAdmin && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <React.Suspense fallback={<TabLoadingFallback />}>
                  <AdminDashboard adminEmail={APP_CONFIG.adminEmail} />
                </React.Suspense>
              </motion.div>
            )}

          </AnimatePresence>

        </main>

        {/* Floating ShieldBot AI Assistant */}
        <ShieldBotModal lang={lang} />

        {/* Cookie Consent Banner */}
        <CookieBanner
          preferences={cookiePreferences}
          onSavePreferences={handleSaveCookiePreferences}
          isOpen={showCookieBanner}
          onClose={() => setShowCookieBanner(false)}
        />

        {/* First-Visit Welcome Modal */}
        <WelcomeModal
          isOpen={showWelcomeModal}
          onSignIn={handleGoogleSignIn}
          onContinueAsGuest={handleContinueAsGuest}
          lang={lang}
        />

        {/* App Rating Modal */}
        <AppRatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          user={user}
          onSignInRequired={() => handleGoogleSignIn().catch(() => {})}
          onSuccess={() => fetchAppReviewsAggregate().then(setAppStats)}
        />

        {/* Policy Modals */}
        <PolicyModals
          modalType={policyModal}
          onClose={() => setPolicyModal(null)}
          appStats={appStats}
        />

        {/* Footer */}
        <Footer
          onOpenCookies={() => setShowCookieBanner(true)}
          onOpenPrivacy={() => setPolicyModal('privacy')}
          onOpenTerms={() => setPolicyModal('terms')}
          onOpenAbout={() => setPolicyModal('about')}
          lang={lang}
        />

      </div>
    </ErrorBoundary>
  );
}
