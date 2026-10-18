import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ShieldAlert,
  Sun,
  Moon,
  Globe,
  User as UserIcon,
  LogOut,
  CheckCircle2,
  Radio,
  BookOpen,
  AlertTriangle,
  Users,
  HelpCircle,
  PhoneCall,
  History,
  Menu,
  X
} from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../lib/types';
import { TRANSLATIONS } from '../lib/translations';

export type NavTab = 'scan' | 'alerts' | 'library' | 'checklist' | 'community' | 'quiz' | 'report' | 'history' | 'admin';

interface NavbarProps {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  user: UserProfile | null;
  onSignIn: () => void;
  onSignOut: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  darkMode,
  setDarkMode,
  user,
  onSignIn,
  onSignOut,
  activeTab,
  setActiveTab,
  isAdmin
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = TRANSLATIONS[lang];
  const brandName = "360 ScamShield AI";
  const isRoman = lang === 'roman';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileDrawerOpen(false);
  };

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'scan', label: lang === 'ur' ? 'اسکینر' : 'Scanner', icon: ShieldCheck },
    { id: 'alerts', label: lang === 'ur' ? 'لائیو الرٹس' : isRoman ? 'Live Alerts' : 'Live Alerts', icon: Radio },
    { id: 'library', label: lang === 'ur' ? 'اسکیم لائبریری' : isRoman ? 'Scam Library' : 'Scam Library', icon: BookOpen },
    { id: 'community', label: t.community, icon: Users },
    { id: 'quiz', label: t.quiz, icon: HelpCircle },
    { id: 'report', label: t.reportAuthorities, icon: PhoneCall },
    { id: 'history', label: t.myChecks, icon: History },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-200 ${
          isScrolled ? 'shadow-md shadow-slate-900/5 dark:shadow-black/20' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Brand Logo & Animated Name (Single-Line, No Wrap) */}
            <div 
              onClick={() => handleSelectTab('scan')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            >
              {/* Shield Icon: Float & Pulse */}
              <motion.div 
                whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 animate-float shrink-0"
              >
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse-slow" />
              </motion.div>

              <div className="flex flex-col">
                {/* Single line brand with shimmer sweep and letter entrance */}
                <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
                  <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 dark:text-white flex items-center whitespace-nowrap">
                    {brandName.split('').map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.25 }}
                        className="inline-block whitespace-pre"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 -mt-0.5 hidden xs:inline-block">
                  Pakistan Cyber Threat Protection
                </span>
              </div>
            </div>

            {/* Desktop Navigation (Visible on lg >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/70 rounded-xl shadow-xs border border-emerald-200 dark:border-emerald-800"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </span>
                  </button>
                );
              })}

              {/* Admin Tab (If verified admin) */}
              {isAdmin && (
                <button
                  onClick={() => handleSelectTab('admin')}
                  className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'admin'
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-800'
                  }`}
                >
                  {activeTab === 'admin' && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950/70 rounded-xl shadow-xs border border-indigo-200 dark:border-indigo-800"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </span>
                </button>
              )}
            </nav>

            {/* Right Action Icons: Language, DarkMode, User Profile & Hamburger */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Language Switcher Dropdown (Desktop) */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
                  title="Change language"
                  aria-label="Change language"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="uppercase font-bold">{lang === 'ur' ? 'اردو' : lang === 'roman' ? 'Roman' : 'EN'}</span>
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50"
                      onClick={() => setLangMenuOpen(false)}
                    >
                      <button
                        onClick={() => setLang('en')}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer ${
                          lang === 'en' ? 'text-emerald-600 bg-emerald-50 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>English</span>
                        {lang === 'en' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => setLang('ur')}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between font-urdu cursor-pointer ${
                          lang === 'ur' ? 'text-emerald-600 bg-emerald-50 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>اردو (Urdu)</span>
                        {lang === 'ur' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => setLang('roman')}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer ${
                          lang === 'roman' ? 'text-emerald-600 bg-emerald-50 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>Roman Urdu</span>
                        {lang === 'roman' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle (Morph & Rotate Sun/Moon) */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center relative overflow-hidden"
                aria-label="Toggle dark mode"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={darkMode ? 'dark' : 'light'}
                    initial={{ y: -14, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 14, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.18 }}
                  >
                    {darkMode ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Desktop User Account or Sign In */}
              <div className="hidden sm:block">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[40px]"
                    >
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName} 
                          className="w-7 h-7 rounded-full object-cover border border-emerald-500" 
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                          {user.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                        {user.displayName}
                      </span>
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.displayName}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user.email || 'Google Account'}</p>
                            {isAdmin && (
                              <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                Verified Admin
                              </span>
                            )}
                          </div>
                          <button
                            onClick={onSignOut}
                            className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>{t.signOut}</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onSignIn}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer min-h-[40px]"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>{t.signIn}</span>
                  </motion.button>
                )}
              </div>

              {/* Hamburger Toggle (Visible below lg < 1024px) */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </motion.button>

            </div>

          </div>
        </div>
      </header>

      {/* Animated Hamburger Drawer (Below 1024px) */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-over Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="relative ml-auto w-full max-w-sm bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto p-5 flex flex-col justify-between shadow-2xl"
            >
              {/* Drawer Top */}
              <div className="space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-base text-slate-900 dark:text-white">
                      360 ScamShield AI
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Emergency Action Quick Banner */}
                <button
                  onClick={() => handleSelectTab('checklist')}
                  className="w-full p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-left flex items-center gap-3 cursor-pointer min-h-[44px]"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 animate-pulse-slow" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-rose-800 dark:text-rose-200">
                      I Think I've Been Scammed
                    </p>
                    <p className="text-[11px] text-rose-600 dark:text-rose-400">
                      Emergency response checklist
                    </p>
                  </div>
                </button>

                {/* Navigation Links */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                    Navigation
                  </p>
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const IconComponent = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  {isAdmin && (
                    <button
                      onClick={() => handleSelectTab('admin')}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                        activeTab === 'admin'
                          ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                          : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50'
                      }`}
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Admin Management</span>
                    </button>
                  )}
                </div>

                {/* Language Switcher in Drawer */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                    Language / زبان
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setLang('en')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold text-center border cursor-pointer min-h-[44px] ${
                        lang === 'en'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLang('ur')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold font-urdu text-center border cursor-pointer min-h-[44px] ${
                        lang === 'ur'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      اردو
                    </button>
                    <button
                      onClick={() => setLang('roman')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold text-center border cursor-pointer min-h-[44px] ${
                        lang === 'roman'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Roman
                    </button>
                  </div>
                </div>

              </div>

              {/* Drawer Bottom: User Profile / Sign In */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName} 
                          className="w-9 h-9 rounded-full object-cover border border-emerald-500" 
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                          {user.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.displayName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email || 'Google Account'}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSignOut();
                        setMobileDrawerOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors min-h-[44px] cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.signOut}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onSignIn();
                      setMobileDrawerOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all min-h-[44px] cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>{t.signIn} with Google</span>
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
