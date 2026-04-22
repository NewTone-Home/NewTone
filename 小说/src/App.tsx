import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Globe, ArrowLeft, CircleDot, CheckCircle2, BookOpen, Lock, 
  ChevronDown, Navigation, Map as MapIcon, Crosshair, Zap, 
  Activity, Cpu, Search, Filter, Layers, Maximize2, Minimize2,
  Compass, Radio, ShieldAlert, Database, Layout, PenTool, Library
} from 'lucide-react';
import { NovelWorld, StoryChapter, Language } from './types';
import { INITIAL_WORLDS } from './data';
import { UI_TRANSLATIONS } from './locales';
import { WorldChumoPortal } from './components/WorldChumoPortal';
import { PlaceholderPage } from './components/PlaceholderPage';

import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './contexts/ThemeContext';

// --- Background Components ---

// --- Sketch Map Components ---

const SketchWorldNode: React.FC<{ 
  world: NovelWorld, x: number, y: number, onSelect: () => void, isSelected: boolean, language: Language, isLocked?: boolean, onLockedClick?: () => void
}> = ({ 
  world, x, y, onSelect, isSelected, language, isLocked, onLockedClick
}) => {
  const { theme } = useTheme();
  const isNight = theme === 'night';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto ${isLocked ? 'cursor-not-allowed' : ''}`}
    >
      <div 
        onClick={(e) => { 
          e.stopPropagation(); 
          if (isLocked && onLockedClick) {
            onLockedClick();
          } else if (!isLocked) {
            onSelect();
          }
        }}
        className={`relative group flex flex-col items-center ${isLocked ? '' : 'cursor-pointer'}`}
      >
        {/* Night theme glow for node */}
        {isNight && (
          <div className={`absolute inset-0 blur-[20px] rounded-full z-0 transition-opacity duration-500 opacity-0 ${isSelected || isLocked ? 'opacity-30' : 'group-hover:opacity-40'}`} style={{ backgroundColor: isLocked ? 'var(--accent-seal)' : 'var(--glow-warm)' }} />
        )}

        {/* Hand-drawn circle effect */}
        <div className={`relative z-10 w-16 h-16 rounded-full border-2 transition-all duration-500 flex items-center justify-center 
          ${isNight ? 'border-[var(--accent-brass)]/40 shadow-[inset_0_0_15px_rgba(184,147,90,0.1)]' : 'border-[var(--ink-primary)]/40'}
          ${isSelected && !isLocked ? (isNight ? 'bg-[var(--accent-brass)]/20 scale-110 border-[var(--accent-brass)] shadow-[0_0_20px_rgba(217,165,102,0.4)]' : 'bg-[var(--ink-primary)]/10 scale-110 border-[var(--ink-primary)]') : (isNight ? 'bg-transparent group-hover:bg-[var(--accent-brass)]/10' : 'bg-transparent group-hover:bg-[var(--ink-primary)]/5')} 
          ${isLocked ? (isNight ? 'border-[var(--accent-seal)]/40 opacity-70 shadow-none' : 'border-[var(--ink-primary)]/20 opacity-50') : ''}
        `}>
          <div className={`absolute inset-0 border rounded-full border-dashed scale-110 ${isNight ? (isLocked ? 'border-[var(--accent-seal)]/30' : 'border-[var(--accent-brass)]/40 text-[var(--glow-warm)]') : 'border-[var(--ink-primary)]/20 text-[var(--ink-primary)]'} ${isLocked ? '' : 'animate-[spin_20s_linear_infinite]'}`} />
          
          {isLocked ? (
            <Lock className={`w-6 h-6 transition-colors ${isNight ? 'text-[var(--accent-seal)]' : 'text-[var(--ink-primary)]/40'}`} />
          ) : (
            isNight ? (
              <Zap className={`w-6 h-6 transition-colors drop-shadow-[0_0_8px_rgba(217,165,102,0.8)] ${isSelected ? 'text-[var(--glow-warm)]' : 'text-[var(--accent-brass)]/60 group-hover:text-[var(--glow-warm)]'}`} />
            ) : (
              <PenTool className={`w-6 h-6 transition-colors ${isSelected ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]/40 group-hover:text-[var(--ink-primary)]/60'}`} />
            )
          )}
        </div>
        
        {/* Sketch Label */}
        <div className="mt-4 text-center relative group z-10">
          <div className="absolute inset-[-4px] bg-[var(--bg-primary)]/80 blur-sm rounded-md -z-10" />
          <h3 className={`text-xl font-serif tracking-widest uppercase transition-colors relative z-10 
            ${isSelected && !isLocked ? (isNight ? 'text-[var(--glow-warm)] font-bold drop-shadow-[0_0_5px_rgba(217,165,102,0.5)]' : 'text-[var(--ink-primary)] font-bold') : 
              isLocked ? (isNight ? 'text-[var(--accent-seal)]/60' : 'text-[var(--ink-primary)]/40') : 
              (isNight ? 'text-[var(--accent-brass)] group-hover:text-[var(--glow-warm)]' : 'text-[var(--ink-primary)]/60 group-hover:text-[var(--ink-primary)]')}
          `}>
            {world.name[language]}
          </h3>
          {!isLocked && <div className={`h-px w-0 group-hover:w-full transition-all duration-500 mx-auto mt-1 ${isNight ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/40'} ${isSelected ? 'w-full' : ''}`} />}
          
          {/* Tooltip for Locked World */}
          {isLocked && (
            <div className={`absolute top-[-30px] left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-serif whitespace-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
               ${isNight ? 'bg-[var(--bg-secondary)] border border-[var(--accent-seal)]/30 text-[var(--ink-primary)] shadow-[0_0_10px_rgba(122,43,37,0.3)]' : 'bg-[var(--ink-primary)]/80 text-[var(--bg-primary)]'}
            `}>
              封印中 · 待未来开启
            </div>
          )}
        </div>

        {/* Selection Indicator */}
        {isSelected && !isLocked && (
          <motion.div 
            layoutId="sketch-select"
            className={`absolute -inset-4 border-2 rounded-lg pointer-events-none ${isNight ? 'border-[var(--accent-brass)]/30 mix-blend-screen' : 'border-[var(--ink-primary)]/20'}`}
            style={{ borderStyle: 'double' }}
          />
        )}
      </div>
    </motion.div>
  );
};

const SketchBackground = ({ language }: { language: Language }) => {
  const { theme } = useTheme();
  const isNight = theme === 'night';
  const t = (key: string) => UI_TRANSLATIONS[language][key] || key;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[var(--bg-primary)] transition-colors duration-500">
      
      {/* Night Theme specific elements */}
      <AnimatePresence>
        {isNight && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1 }}
             className="absolute inset-0 z-0"
          >
             {/* Night bloom corners */}
             <div className="absolute inset-x-0 -top-[30%] h-[60%] bg-[var(--glow-warm)]/5 blur-[120px] rounded-full mix-blend-screen" />
             <div className="absolute inset-y-0 -left-[30%] w-[60%] bg-[var(--accent-brass)]/5 blur-[120px] rounded-full mix-blend-screen" />
             
             {/* Night stars SVG */}
             <svg className="absolute inset-0 w-full h-full opacity-60">
                <circle cx="15%" cy="20%" r="1" fill="#FFF" className="animate-[twinkle_3s_infinite_ease-in-out]" />
                <circle cx="28%" cy="10%" r="1.5" fill="#FFF" className="animate-[twinkle_4s_infinite_ease-in-out_1s]" />
                <circle cx="85%" cy="30%" r="1" fill="#FFF" className="animate-[twinkle_3s_infinite_ease-in-out_2s]" />
                <circle cx="70%" cy="80%" r="2" fill="#FFF" className="animate-[twinkle_5s_infinite_ease-in-out]" />
                <circle cx="45%" cy="65%" r="1" fill="#FFF" className="animate-[twinkle_3s_infinite_ease-in-out_0.5s]" />
             </svg>

             {/* Drifting embers */}
             <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-[float-slow_20s_linear_infinite]" 
                  style={{ filter: `drop-shadow(0 0 2px var(--glow-warm))` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paper Texture Overlay */}
      <div className={`absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none transition-opacity duration-500 ${isNight ? 'opacity-20 mix-blend-normal blur-[1px]' : ''}`} 
           style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-map.png)' }} />
      
      {/* Decorative Border */}
      <div className={`absolute inset-8 border-[12px] border-double rounded-sm transition-colors duration-500 ${isNight ? 'border-[var(--accent-brass)]/15 shadow-[inset_0_0_20px_rgba(184,147,90,0.05)]' : 'border-[var(--ink-primary)]/10'}`} />
      <div className={`absolute inset-10 border transition-colors duration-500 ${isNight ? 'border-[var(--accent-brass)]/10' : 'border-[var(--ink-primary)]/5'}`} />

      {/* Compass Rose */}
      <div className={`absolute bottom-20 right-20 transform scale-150 transition-all duration-500 ${isNight ? 'opacity-50 text-[var(--accent-brass)] drop-shadow-[0_0_10px_rgba(184,147,90,0.5)]' : 'opacity-20 text-[var(--ink-primary)]'}`}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" stroke="currentColor" className="text-current">
          <circle cx="80" cy="80" r="60" strokeDasharray="4 4" className={isNight ? 'animate-[spin_40s_linear_infinite]' : ''} />
          {isNight && <circle cx="80" cy="80" r="10" fill="var(--glow-warm)" className="blur-[10px] mix-blend-screen opacity-60 animate-[pulse-glow_2s_infinite]" />}
          <path d="M80 0 L90 70 L80 80 L70 70 Z" fill="currentColor" />
          <path d="M80 160 L70 90 L80 80 L90 90 Z" fill="currentColor" />
          <path d="M0 80 L70 70 L80 80 L70 90 Z" fill="currentColor" />
          <path d="M160 80 L90 90 L80 80 L90 70 Z" fill="currentColor" />
          <text x="76" y="20" className="text-[10px] font-serif font-bold">N</text>
        </svg>
      </div>

      {/* Old Map Annotations */}
      <div className={`absolute top-24 left-24 font-serif italic text-2xl tracking-widest select-none transition-colors duration-500 ${isNight ? 'opacity-40 text-[var(--accent-brass)] blur-[0.5px]' : 'opacity-20 text-[var(--ink-primary)]'}`}>
        {t('app.terraIncognita')}
      </div>
      
      {/* Decorative Ship */}
      <div className={`absolute top-1/4 right-1/4 transform rotate-12 select-none transition-colors duration-500 ${isNight ? 'opacity-20 stroke-[var(--accent-brass)] fill-[var(--accent-brass)] text-[var(--accent-brass)]' : 'opacity-10 stroke-[var(--ink-primary)] fill-transparent text-[var(--ink-primary)]'}`}>
        <svg width="80" height="60" viewBox="0 0 80 60" strokeWidth="1">
          <path d="M10 40 L70 40 L60 55 L20 55 Z" fill="inherit" />
          <path d="M40 40 L40 10 L65 25 L40 25" fill="none" />
          <path d="M40 35 L40 15 L20 25 L40 25" fill="none" />
          <text x="20" y="58" className="text-[6px] font-serif stroke-none fill-current">{t('app.hmsDiscovery')}</text>
        </svg>
      </div>

      {/* Decorative Sea Monster */}
      <div className={`absolute bottom-1/4 left-1/3 transform -rotate-6 select-none transition-colors duration-500 ${isNight ? 'opacity-20 stroke-[var(--accent-brass)] fill-[var(--accent-brass)]' : 'opacity-10 stroke-black fill-black'}`}>
        <svg width="100" height="40" viewBox="0 0 100 40" strokeWidth="1" stroke="currentColor">
          <path d="M10 30 Q 25 10, 40 30 T 70 30 T 90 30" fill="none" />
          <path d="M15 32 Q 25 15, 35 32" opacity="0.5" fill="none" />
          <circle cx="12" cy="28" r="1" fill="currentColor" stroke="none" />
          <text x="40" y="38" className="text-[6px] font-serif stroke-none fill-current">{t('app.leviathan')}</text>
        </svg>
      </div>

      <div className={`absolute bottom-32 left-40 transform -rotate-12 select-none transition-colors duration-500 ${isNight ? 'opacity-30 stroke-[var(--accent-brass)] text-[var(--accent-brass)]' : 'opacity-10 stroke-black text-[var(--ink-primary)]'}`}>
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" strokeWidth="1" stroke="currentColor">
          <path d="M10 40 Q 30 10, 60 40 T 110 40" />
          <text x="35" y="65" className="text-[8px] font-serif stroke-none fill-current">{t('app.mareIgnotum')}</text>
        </svg>
      </div>

      {/* Sketch Grid Lines */}
      <div 
        className={`absolute inset-0 opacity-[0.03] transition-colors duration-500 ${isNight ? 'opacity-[0.08]' : ''}`} 
        style={{ 
          backgroundImage: `linear-gradient(${isNight ? 'var(--accent-brass)' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isNight ? 'var(--accent-brass)' : '#000'} 1px, transparent 1px)`, 
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Vignette */}
      <div className={`absolute inset-0 transition-shadow duration-500 ${isNight ? 'shadow-[inset_0_0_300px_rgba(0,0,0,0.8)]' : 'shadow-[inset_0_0_300px_rgba(0,0,0,0.15)]'}`} />
    </div>
  );
};

// --- Language Selector Component ---

const LanguageSelector = ({ currentLanguage, onLanguageChange, viewMode }: { currentLanguage: Language, onLanguageChange: (lang: Language) => void, viewMode: '3D' | '2D' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = (key: string) => UI_TRANSLATIONS[currentLanguage][key] || key;
  
  const languages: { code: Language, key: string }[] = [
    { code: 'zh', key: 'lang.zh' },
    { code: 'en', key: 'lang.en' },
    { code: 'ja', key: 'lang.ja' }
  ];

  return (
    <div 
      className="relative pointer-events-auto"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 p-4 backdrop-blur-md border transition-all duration-700 relative overflow-hidden ${viewMode === '3D' ? 'bg-[var(--bg-secondary)]/80 border-[#d3cbbd] text-[var(--ink-primary)] shadow-[0_4px_20px_rgba(139,90,43,0.1)]' : 'bg-[var(--ink-primary)]/5 border-[var(--ink-primary)]/20 text-[var(--ink-primary)]'}`}
      >
        <Globe className="w-6 h-6" />
        <span className="text-xs font-serif tracking-widest uppercase hidden md:block font-bold">
          {t(`lang.${currentLanguage}`)}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        
        {/* Hover Border Accents (3D) */}
        {viewMode === '3D' && (
          <div className="absolute inset-[-4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#8b5a2b]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#8b5a2b]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#8b5a2b]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#8b5a2b]" />
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute top-full right-0 mt-2 min-w-[140px] backdrop-blur-xl border p-1 shadow-2xl z-50 ${viewMode === '3D' ? 'bg-[#fdfaf5]/95 border-[#cbb387]' : 'bg-white/90 border-[var(--ink-primary)]/10'}`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-xs font-serif font-bold tracking-widest uppercase transition-all flex items-center justify-between group ${
                  currentLanguage === lang.code 
                    ? (viewMode === '3D' ? 'bg-[#ece3d3] text-[var(--ink-primary)]' : 'bg-[var(--ink-primary)]/10 text-[var(--ink-primary)]') 
                    : (viewMode === '3D' ? 'text-[#8b7965] hover:bg-[var(--bg-primary)] hover:text-[var(--ink-primary)]' : 'text-[var(--ink-secondary)]/60 hover:bg-[var(--ink-primary)]/5 hover:text-[var(--ink-primary)]')
                }`}
              >
                {t(lang.key)}
                {currentLanguage === lang.code && (
                  <motion.div layoutId="activeLang" className={`w-1.5 h-1.5 rounded-full ${viewMode === '3D' ? 'bg-[#8b5a2b]' : 'bg-[var(--ink-primary)]'}`} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View Transition Component ---

// --- Transition Components ---

const LanguageTransition = ({ isTransitioning, targetLanguage, viewMode }: { isTransitioning: boolean, targetLanguage: Language | null, viewMode: '3D' | '2D' }) => {
  const t = (key: string) => UI_TRANSLATIONS[targetLanguage || 'zh'][key] || key;
  
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Background Layer */}
          <div className={`absolute inset-0 ${viewMode === '3D' ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-primary)]'}`} />
          
          {/* Animated Elements */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <BookOpen className={`w-16 h-16 ${viewMode === '3D' ? 'text-[var(--accent-brass)]' : 'text-[var(--ink-primary)]'}`} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h2 className={`text-4xl font-serif tracking-[0.4em] uppercase mb-4 ${viewMode === '3D' ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]'}`}>
                {t('settings.language')}
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className={`h-px w-12 ${viewMode === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/20'}`} />
                <span className={`text-xs font-serif font-bold tracking-widest uppercase ${viewMode === '3D' ? 'text-[var(--accent-brass)]/80' : 'text-[var(--ink-secondary)]/60'}`}>
                  {targetLanguage ? t(`lang.${targetLanguage}`) : ''}
                </span>
                <div className={`h-px w-12 ${viewMode === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/20'}`} />
              </div>
            </motion.div>
          </div>

          {/* Decorative scanlines or paper texture */}
          {viewMode === '3D' ? (
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute inset-0 bg-[#8b5a2b]/[0.02]" />
            </div>
          ) : (
            <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

// --- Main App Component ---

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState<Language>('zh');
  const [isTransitioningLanguage, setIsTransitioningLanguage] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);
  
  const [worlds] = useState<NovelWorld[]>(INITIAL_WORLDS);
  
  const t = (key: string) => UI_TRANSLATIONS[language][key] || key;
  
  const handleLanguageChange = (newLang: Language) => {
    if (newLang === language || isTransitioningLanguage) return;
    
    setPendingLanguage(newLang);
    setIsTransitioningLanguage(true);
    
    setTimeout(() => {
      setLanguage(newLang);
    }, 800);
    
    setTimeout(() => {
      setIsTransitioningLanguage(false);
      setPendingLanguage(null);
    }, 1600);
  };
  const [selectedWorld, setSelectedWorld] = useState<NovelWorld | null>(null);
  const [activeChapter, setActiveChapter] = useState<StoryChapter | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  const [readChapterIds, setReadChapterIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('readChapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const markChapterAsRead = (chapterId: string) => {
    setReadChapterIds((prev) => {
      if (!prev.includes(chapterId)) {
        const next = [...prev, chapterId];
        localStorage.setItem('readChapters', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };
  
  // Map Navigation State
  const [focusedWorld, setFocusedWorld] = useState<NovelWorld | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [targetWorld, setTargetWorld] = useState<NovelWorld | null>(null);
  
  const [viewMode] = useState<'3D' | '2D'>('2D');
  const contentRef = useRef<HTMLDivElement>(null);

  const isNavigatingAway = useRef(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
      if (activeChapter) {
        markChapterAsRead(activeChapter.id);
      }
    }
  };

  const getFirstUnlockedChapter = (world: NovelWorld) => {
    for (let i = world.chapters.length - 1; i >= 0; i--) {
      const chapter = world.chapters[i];
      const isFirst = i === 0;
      const prevChapter = i > 0 ? world.chapters[i - 1] : null;
      const isRead = readChapterIds.includes(chapter.id);
      const prevIsRead = prevChapter ? readChapterIds.includes(prevChapter.id) : true;
      const isUnlocked = isFirst || isRead || prevIsRead;
      if (isUnlocked) return chapter;
    }
    return world.chapters[0];
  };

  const handleEnterWorld = (world: NovelWorld) => {
    setTargetWorld(world);
    setIsEntering(true);
    
    setTimeout(() => {
      setSelectedWorld(world);
      setActiveChapter(getFirstUnlockedChapter(world));
      setIsEntering(false);
      setFocusedWorld(null);
    }, 2500);
  };

  const handleExitWorld = () => {
    setIsExiting(true);
    if (!targetWorld && selectedWorld) setTargetWorld(selectedWorld);
    
    setTimeout(() => {
      setSelectedWorld(null);
      setActiveChapter(null);
      setTargetWorld(null);
      setIsExiting(false);
      
      if (location.pathname.startsWith('/read/sequential')) {
        isNavigatingAway.current = true;
        navigate('/worlds/chumo');
      }
    }, 1500);
  };

  const handleChapterClick = (chapter: StoryChapter, index: number) => {
    if (!selectedWorld) return;
    const isFirst = index === 0;
    const prevChapter = index > 0 ? selectedWorld.chapters[index - 1] : null;
    const isRead = readChapterIds.includes(chapter.id);
    const prevIsRead = prevChapter ? readChapterIds.includes(prevChapter.id) : true;
    const isUnlocked = isFirst || isRead || prevIsRead;
    
    if (isUnlocked) {
      setActiveChapter(chapter);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  const goToNextChapter = () => {
    if (!selectedWorld || !activeChapter) return;
    markChapterAsRead(activeChapter.id);
    const currentIndex = selectedWorld.chapters.findIndex(c => c.id === activeChapter.id);
    if (currentIndex < selectedWorld.chapters.length - 1) {
      setActiveChapter(selectedWorld.chapters[currentIndex + 1]);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  // Pre-defined coordinates for worlds on the map
  const worldCoords: Record<string, { x: number, y: number }> = {
    'w-1': { x: 35, y: 40 },
    'w-2': { x: 65, y: 60 },
    'w-3': { x: 20, y: 75 }, // Mock additional world
    'w-4': { x: 80, y: 25 }, // Mock additional world
  };

  // Synchronize location to start reading if navigated directly
  useEffect(() => {
    // Reset navigating away when we arrive at a valid route
    if (location.pathname === '/worlds/chumo') {
      isNavigatingAway.current = false;
    }

    if (location.pathname.startsWith('/read/sequential') && !selectedWorld && !isEntering && !isExiting && !isNavigatingAway.current) {
      handleEnterWorld(worlds[0]); // Auto load world 1
    }
  }, [location.pathname, selectedWorld, isEntering, isExiting, worlds]);

  if (location.pathname === '/worlds/chumo') {
    return (
      <>
        {toastMessage && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-[var(--ink-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-sm shadow-xl font-serif tracking-widest text-sm animate-in fade-in slide-in-from-top-4">
            {toastMessage}
          </div>
        )}
        <WorldChumoPortal language={language} showToast={showToast} />
      </>
    );
  }

  if (location.pathname === '/worlds/chumo/about') return <PlaceholderPage title="世界观简介 · 建设中" />;
  if (location.pathname === '/worlds/chumo/relations') return <PlaceholderPage title="人物关系 · 建设中" />;
  if (location.pathname === '/worlds/chumo/jixiujie') return <PlaceholderPage title="姬修杰主线 · 建设中" />;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--ink-primary)] selection:bg-[var(--accent-brass)]/30 selection:text-[var(--bg-primary)] overflow-hidden font-sans transition-colors duration-300">
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-[var(--ink-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-sm shadow-xl font-serif tracking-widest text-sm animate-in fade-in slide-in-from-top-4 pointer-events-none">
          {toastMessage}
        </div>
      )}
      
      {/* Language Transition Overlay */}
      <LanguageTransition isTransitioning={isTransitioningLanguage} targetLanguage={pendingLanguage} viewMode={viewMode} />
      
      {/* Multiverse Hub (Star Map) */}
      <AnimatePresence mode="wait">
        {!selectedWorld && !isEntering && (
          <motion.div
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="relative h-screen w-screen overflow-hidden"
            onClick={() => focusedWorld && setFocusedWorld(null)}
          >
            <SketchBackground language={language} />

            {/* Map Layer for 2D Mode */}
            {viewMode === '2D' && (
              <motion.div 
                style={{ scale: 1 }}
                className="absolute inset-0 w-screen h-screen left-0 top-0"
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                   <line x1="35%" y1="40%" x2="65%" y2="60%" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="4,4" />
                   <line x1="35%" y1="40%" x2="20%" y2="75%" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="4,4" />
                   <line x1="65%" y1="60%" x2="80%" y2="25%" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="4,4" />
                </svg>

                {worlds.map((world) => (
                  <SketchWorldNode 
                    key={world.id}
                    world={world}
                    x={worldCoords[world.id]?.x || 50}
                    y={worldCoords[world.id]?.y || 50}
                    isSelected={focusedWorld?.id === world.id}
                    onSelect={() => {
                      if (world.id === 'w-1') {
                        navigate('/worlds/chumo');
                      } else {
                        showToast("此卷尚未启封");
                      }
                    }}
                    language={language}
                    isLocked={world.id !== 'w-1'}
                    onLockedClick={() => showToast("此卷尚未启封")}
                  />
                ))}
              </motion.div>
            )}

            {/* Hub UI Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col z-30">
              {/* Top Bar HUD */}
              <header className="p-12 flex items-center justify-between">
                <div className="flex items-center gap-8">

                  <div className="flex flex-col">
                    <h1 className={`text-3xl font-bold font-serif tracking-[0.5em] uppercase transition-colors duration-700 ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)] drop-shadow-sm' : 'text-[var(--ink-primary)]/80'}`}>
                      {(viewMode as string) === '3D' ? t('app.title3D') : t('app.title2D')}
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                       <div className={`flex items-center gap-2 text-[10px] font-serif tracking-[0.3em] font-bold uppercase transition-colors duration-700 ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]' : 'text-[var(--ink-secondary)]/60'}`}>
                        {(viewMode as string) === '3D' ? <BookOpen className="w-3 h-3" /> : <PenTool className="w-3 h-3" />}
                        <span>{(viewMode as string) === '3D' ? t('app.status3D') : t('app.status2D')}</span>
                      </div>
                      <div className={`w-1 h-1 rounded-full ${(viewMode as string) === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/10'}`} />
                      <span className={`text-[10px] font-mono tracking-[0.3em] uppercase transition-colors duration-700 ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]/80' : 'text-[var(--ink-secondary)]/30'}`}>
                        {(viewMode as string) === '3D' ? t('app.protocol') : t('app.manuscript')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 md:gap-16 pointer-events-auto items-center">
                   <ThemeToggle />
                   {/* Language Selector */}
                   <LanguageSelector 
                     currentLanguage={language} 
                     onLanguageChange={handleLanguageChange} 
                     viewMode={viewMode} 
                   />
                </div>
              </header>

              {/* World Detail Panel (Holographic Style) */}
              <AnimatePresence>
                {focusedWorld && (viewMode as string) !== '3D' && (
                  <motion.div
                    key={focusedWorld.id}
                    custom={viewMode}
                    initial={{ 
                      opacity: 0, 
                      x: 150, 
                      skewX: (viewMode as string) === '3D' ? -5 : 0,
                      scale: (viewMode as string) === '2D' ? 0.95 : 1,
                      filter: 'blur(20px)' 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      skewX: 0,
                      scale: 1,
                      filter: 'blur(0px)' 
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: 100, 
                      skewX: (viewMode as string) === '3D' ? 5 : 0,
                      scale: (viewMode as string) === '2D' ? 0.95 : 1,
                      filter: 'blur(20px)' 
                    }}
                    transition={{ 
                      type: "spring", 
                      damping: 30, 
                      stiffness: 100,
                      staggerChildren: 0.08,
                      delayChildren: 0.1
                    }}
                    className="absolute bottom-16 right-16 w-[500px] pointer-events-auto z-50"
                  >
                    <div className={`relative p-12 backdrop-blur-3xl border rounded-sm overflow-hidden group transition-all duration-700 ${(viewMode as string) === '3D' ? 'bg-[var(--bg-secondary)]/95 border-[#d3cbbd] shadow-[0_15px_50px_rgba(139,90,43,0.15)]' : 'bg-[var(--bg-primary)]/90 border-[var(--ink-primary)]/20 shadow-2xl'}`}>
                      {/* Animated Shutter Effect (3D Only) */}
                      {(viewMode as string) === '3D' && (
                        <motion.div 
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.6, ease: "circOut" }}
                          className="absolute inset-0 bg-gradient-to-b from-[#8b5a2b]/5 via-transparent to-[#8b5a2b]/5 pointer-events-none z-0 origin-top"
                        />
                      )}

                      {/* Animated Corner Accents */}
                      {viewMode === '3D' ? (
                        <>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 left-0 h-px bg-[var(--accent-brass)]" 
                          />
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 left-0 w-px bg-[var(--accent-brass)]" 
                          />
                          <div className="absolute bottom-0 right-0 w-24 h-px bg-[#8b5a2b]/40" />
                          <div className="absolute bottom-0 right-0 w-px h-24 bg-[#8b5a2b]/40" />
                          {/* Paper Texture Overlay */}
                          <div className="absolute inset-0 bg-[#8b5a2b]/[0.01] pointer-events-none" />
                        </>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                          className="absolute inset-0 border-4 border-double border-[var(--ink-primary)]/10 m-2 pointer-events-none" 
                        />
                      )}
                      
                      <div className="relative z-10">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between mb-10"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full shadow-sm ${(viewMode as string) === '3D' ? 'bg-[#8b5a2b]' : 'bg-[var(--ink-primary)]'}`} />
                            <span className={`text-xs font-serif font-bold tracking-[0.4em] uppercase ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]' : 'text-[var(--ink-primary)]/60'}`}>
                              {(viewMode as string) === '3D' ? t('world.dataLink') : t('world.manuscriptIdentified')}
                            </span>
                          </div>
                          <div className={`flex items-center gap-2 text-[10px] font-mono ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]/80' : 'text-[var(--ink-secondary)]/30'}`}>
                            <BookOpen className="w-3 h-3" />
                            <span>REF::{focusedWorld.id.toUpperCase()}</span>
                          </div>
                        </motion.div>

                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className={`text-6xl font-bold font-serif tracking-tighter mb-8 uppercase leading-none transition-colors ${(viewMode as string) === '3D' ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]'}`}
                        >
                          {focusedWorld.name[language]}
                        </motion.h2>
                        
                        <motion.div 
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          className="flex items-center gap-6 mb-10 origin-left"
                        >
                          <div className={`h-px flex-1 ${(viewMode as string) === '3D' ? 'bg-gradient-to-r from-[#d3cbbd] to-transparent' : 'bg-[var(--ink-primary)]/20'}`} />
                          <span className={`text-[10px] font-serif font-bold uppercase tracking-[0.5em] ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]/80' : 'text-[var(--ink-secondary)]/60'}`}>
                            {(viewMode as string) === '3D' ? t('detail.synopsis3D') : t('detail.synopsis2D')}
                          </span>
                        </motion.div>

                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className={`text-lg leading-relaxed mb-12 tracking-wide font-serif italic border-l-2 pl-6 transition-colors ${(viewMode as string) === '3D' ? 'text-[#6b5a45] border-[#cbb387]' : 'text-[var(--ink-primary)]/70 border-[var(--ink-primary)]/20'}`}
                        >
                          "{focusedWorld.shortDescription[language]}"
                        </motion.p>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="grid grid-cols-2 gap-6 mb-6"
                        >
                          <div className={`flex flex-col gap-3 p-6 border transition-all ${(viewMode as string) === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd] text-[var(--ink-primary)] shadow-[0_2px_10px_rgba(139,90,43,0.05)]' : 'bg-[var(--ink-primary)]/5 border-[var(--ink-primary)]/10 hover:border-[var(--ink-primary)]/40 text-[var(--ink-primary)]'}`}>
                            <span className={`text-[10px] font-serif font-bold uppercase tracking-widest ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]/80' : 'text-[var(--ink-primary)]/30'}`}>{t('detail.classification')}</span>
                            <span className="text-lg tracking-widest font-serif">{focusedWorld.genre[language]}</span>
                          </div>
                          <div className={`flex flex-col gap-3 p-6 border transition-all ${(viewMode as string) === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd] text-[var(--ink-primary)] shadow-[0_2px_10px_rgba(139,90,43,0.05)]' : 'bg-[var(--ink-primary)]/5 border-[var(--ink-primary)]/10 hover:border-[var(--ink-primary)]/40 text-[var(--ink-primary)]'}`}>
                            <span className={`text-[10px] font-serif font-bold uppercase tracking-widest ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]/80' : 'text-[var(--ink-primary)]/30'}`}>{t('detail.narrativeUnits')}</span>
                            <span className="text-lg tracking-widest font-serif">{focusedWorld.chapters.length} {t('detail.chapters')}</span>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                          className="mb-12"
                        >
                          <div className={`flex flex-col gap-3 p-6 border transition-all ${(viewMode as string) === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd] text-[var(--ink-primary)] shadow-[0_2px_10px_rgba(139,90,43,0.05)]' : 'bg-[var(--ink-primary)]/5 border-[var(--ink-primary)]/10 hover:border-[var(--ink-primary)]/40 text-[var(--ink-primary)]'}`}>
                            <span className={`text-[10px] font-serif font-bold uppercase tracking-widest ${(viewMode as string) === '3D' ? 'text-[var(--accent-brass)]/80' : 'text-[var(--ink-primary)]/30'}`}>{t('detail.progress')}</span>
                            <div className="flex items-center gap-4">
                              <div className={`w-2 h-2 rounded-full ${(viewMode as string) === '3D' ? 'bg-[#8b5a2b]' : 'bg-[var(--ink-primary)] animate-pulse'}`} />
                              <span className="text-lg tracking-widest font-serif">{getFirstUnlockedChapter(focusedWorld).title[language]}</span>
                            </div>
                          </div>
                        </motion.div>

                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          onClick={() => handleEnterWorld(focusedWorld)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full group relative py-6 text-sm font-bold tracking-[0.8em] uppercase overflow-hidden transition-all duration-500 ${(viewMode as string) === '3D' ? 'bg-[#8b5a2b] text-[#fcf8f2] hover:bg-[#6b451f] shadow-lg hover:shadow-xl' : 'bg-[var(--ink-primary)] text-[var(--bg-primary)] hover:bg-[var(--ink-primary)]/80 shadow-xl'}`}
                        >
                          <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${(viewMode as string) === '3D' ? 'bg-[var(--bg-secondary)]/20' : 'bg-white/10'}`} />
                          
                          <div className="relative flex items-center justify-center gap-6">
                            {(viewMode as string) === '3D' ? (
                                <BookOpen className="w-5 h-5" />
                            ) : (
                              <PenTool className="w-5 h-5" />
                            )}
                            {(viewMode as string) === '3D' ? t('world.initiateSync') : t('world.openPage')}
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation HUD (Bottom Left) */}
              <div className="absolute bottom-16 left-16 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className={`h-px w-24 ${viewMode === '3D' ? 'bg-amber-600/30' : 'bg-[var(--ink-primary)]/10'}`} />
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-ping ${viewMode === '3D' ? 'bg-amber-600' : 'bg-[var(--ink-primary)]'}`} />
                    <span className={`text-[9px] font-mono tracking-[0.4em] uppercase transition-colors ${viewMode === '3D' ? 'text-amber-600/60' : 'text-[var(--ink-secondary)]/60'}`}>
                      {viewMode === '3D' ? t('world.hologramInit') : t('world.reviewingManuscripts')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entering World Transition (Hyperspace or Ink Splash Effect) */}
      <AnimatePresence>
        {isEntering && targetWorld && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${viewMode === '3D' ? 'bg-[#110e0b]' : 'bg-[var(--bg-primary)]'}`}
          >
            {viewMode === '3D' ? (
              <>
                {/* Hyper-travel Lines (Amber speed lines) */}
                <div className="absolute inset-0 opacity-40">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 2, 4], 
                        x: (Math.random() - 0.5) * 2000, 
                        y: (Math.random() - 0.5) * 2000,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}
                      className="absolute left-1/2 top-1/2 w-1 h-32 bg-amber-500 blur-[2px]"
                      style={{ transform: `rotate(${Math.random() * 360}deg)` }}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative flex flex-col items-center z-10"
                >
                  <div className="w-80 h-80 rounded-full border border-[#d3cbbd] flex items-center justify-center mb-16 relative bg-[#fdfaf5]">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-20px] rounded-full border-t-2 border-[#8b5a2b] shadow-[0_0_30px_rgba(139,90,43,0.2)]"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-40px] rounded-full border border-[#cbb387] border-dashed"
                    />
                    <BookOpen className="w-24 h-24 text-[var(--accent-brass)]" />
                  </div>
                  <h2 className="text-5xl font-serif tracking-[0.6em] text-[var(--ink-primary)] uppercase mb-6 drop-shadow-sm">
                    {t('transition.descending')}: {targetWorld.name[language]}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="h-px w-20 bg-[var(--accent-brass)]" />
                    <p className="text-[var(--accent-brass)] font-serif font-bold text-xs tracking-[0.5em] uppercase animate-pulse">
                      {t('transition.syncing')}
                    </p>
                    <div className="h-px w-20 bg-[var(--accent-brass)]" />
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                {/* Ink Splash / Sketch Transition */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-map.png)' }} />
                
                <div className="absolute inset-0">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: '50%', y: '50%', opacity: 0 }}
                      animate={{ 
                        scale: [0, 1, 2], 
                        x: `${Math.random() * 100}%`, 
                        y: `${Math.random() * 100}%`,
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                      className="absolute w-64 h-64 bg-[var(--ink-primary)]/5 rounded-full blur-3xl"
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative flex flex-col items-center z-10"
                >
                  <div className="w-72 h-72 border-4 border-double border-[var(--ink-primary)]/20 flex items-center justify-center mb-16 relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-10px] border border-[var(--ink-primary)]/10 border-dashed rounded-full"
                    />
                    <PenTool className="w-20 h-20 text-[var(--ink-primary)]/60" />
                  </div>
                  
                  <h2 className="text-5xl font-serif tracking-[0.5em] text-[var(--ink-primary)] uppercase mb-8">
                    {t('transition.tracing')}: {targetWorld.name[language]}
                  </h2>
                  
                  <div className="flex items-center gap-8">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      className="h-px bg-[var(--ink-primary)]/20" 
                    />
                    <p className="text-[var(--ink-secondary)]/60 font-serif italic text-sm tracking-widest animate-pulse">
                      {t('transition.inking')}
                    </p>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      className="h-px bg-[var(--ink-primary)]/20" 
                    />
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exiting World Transition */}
      <AnimatePresence>
        {isExiting && targetWorld && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${viewMode === '3D' ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-primary)]'}`}
          >
            {viewMode === '3D' ? (
              <motion.div
                initial={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative flex flex-col items-center z-10"
              >
                <div className="w-64 h-64 rounded-full border border-[#d3cbbd] flex items-center justify-center mb-12 relative bg-[#fdfaf5]">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-10px] rounded-full border-t border-[#8b5a2b]"
                  />
                  <BookOpen className="w-16 h-16 text-[var(--accent-brass)]/60" />
                </div>
                <h2 className="text-4xl font-serif tracking-[0.6em] text-[#6b5a45] uppercase mb-4">
                  {t('transition.disconnecting')}{targetWorld.name[language]}
                </h2>
                <p className="text-[var(--accent-brass)]/80 font-serif font-bold text-[10px] tracking-[0.4em] uppercase animate-pulse">
                  {t('transition.terminating')}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative flex flex-col items-center z-10"
              >
                <div className="w-64 h-64 border border-[var(--ink-primary)]/10 flex items-center justify-center mb-12 relative">
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-5px] border border-[var(--ink-primary)]/5 border-dashed rounded-full"
                  />
                  <PenTool className="w-16 h-16 text-[var(--ink-secondary)]/30" />
                </div>
                <h2 className="text-4xl font-serif tracking-[0.4em] text-[var(--ink-primary)]/60 uppercase mb-6">
                  {t('transition.closing')}{targetWorld.name[language]}
                </h2>
                <p className="text-[var(--ink-primary)]/30 font-serif italic text-sm tracking-widest animate-pulse">
                  {t('transition.inkDries')}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Novel Reading View */}
      <AnimatePresence>
        {selectedWorld && activeChapter && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className={`fixed inset-0 z-50 flex transition-colors duration-700 ${viewMode === '3D' ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]'}`}
          >
            {/* Sidebar - Main Storyline Timeline */}
            <div className={`w-96 border-r flex flex-col transition-colors duration-700 ${viewMode === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd]' : 'bg-[#e8dfd1] border-[var(--ink-primary)]/10'}`}>
              <div className={`p-12 border-b transition-colors duration-700 ${viewMode === '3D' ? 'border-[#d3cbbd]' : 'border-[var(--ink-primary)]/10'}`}>
                <button 
                  onClick={handleExitWorld}
                  className={`flex items-center gap-4 transition-all mb-12 group ${viewMode === '3D' ? 'text-[var(--accent-brass)]/80 hover:text-[var(--ink-primary)]' : 'text-[var(--ink-secondary)]/60 hover:text-[var(--ink-primary)]'}`}
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  <span className="text-xs font-serif font-bold tracking-[0.4em] uppercase">
                    {viewMode === '3D' ? t('reader.back3D') : t('reader.back2D')}
                  </span>
                </button>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-2 h-2 rounded-full ${viewMode === '3D' ? 'bg-[#8b5a2b]' : 'bg-[var(--ink-primary)]'}`} />
                    <span className={`text-[10px] font-serif font-bold tracking-[0.5em] uppercase ${viewMode === '3D' ? 'text-[var(--accent-brass)]' : 'text-[var(--ink-primary)]/60'}`}>
                      {viewMode === '3D' ? t('reader.activeSector') : t('reader.currentManuscript')}
                    </span>
                  </div>
                  <h2 className={`text-4xl font-bold font-serif tracking-widest uppercase leading-tight transition-colors duration-700 ${viewMode === '3D' ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]'}`}>
                    {selectedWorld.name[language]}
                  </h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className={`absolute left-4 top-0 bottom-0 w-px ${viewMode === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/5'}`} />
                  
                  <div className="space-y-16 relative">
                    {selectedWorld.chapters.map((chapter, index) => {
                      const isFirst = index === 0;
                      const prevChapter = index > 0 ? selectedWorld.chapters[index - 1] : null;
                      const isRead = readChapterIds.includes(chapter.id);
                      const prevIsRead = prevChapter ? readChapterIds.includes(prevChapter.id) : true;
                      const isUnlocked = isFirst || isRead || prevIsRead;
                      const isActive = activeChapter.id === chapter.id;
                      const isCompleted = isRead;

                      return (
                        <div 
                          key={chapter.id}
                          className={`relative flex gap-10 group ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'}`}
                          onClick={() => handleChapterClick(chapter, index)}
                        >
                          {/* Timeline Node */}
                          <div className="relative z-10 mt-2">
                            {isCompleted ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${viewMode === '3D' ? 'bg-[#8b5a2b] shadow-[0_2px_10px_rgba(139,90,43,0.3)]' : 'bg-[var(--ink-primary)] shadow-lg'}`}>
                                <CheckCircle2 className={`w-5 h-5 ${viewMode === '3D' ? 'text-[#fcf8f2]' : 'text-[var(--bg-primary)]'}`} />
                              </div>
                            ) : isActive ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${viewMode === '3D' ? 'bg-[var(--bg-secondary)] border-2 border-[#8b5a2b] shadow-[0_2px_10px_rgba(139,90,43,0.3)]' : 'bg-[var(--ink-primary)]/10 border-2 border-[var(--ink-primary)] shadow-inner'}`}>
                                <div className={`w-3 h-3 rounded-full animate-pulse ${viewMode === '3D' ? 'bg-[#8b5a2b]' : 'bg-[var(--ink-primary)]'}`} />
                              </div>
                            ) : isUnlocked ? (
                              <div className={`w-8 h-8 rounded-full border-2 transition-all ${viewMode === '3D' ? 'border-[#cbb387] bg-transparent group-hover:border-[#8b5a2b]/50' : 'border-[var(--ink-primary)]/20 bg-transparent group-hover:border-[var(--ink-primary)]'}`} />
                            ) : (
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${viewMode === '3D' ? 'border-[#d3cbbd] bg-transparent' : 'border-[var(--ink-primary)]/5 bg-transparent'}`}>
                                <Lock className={`w-4 h-4 ${viewMode === '3D' ? 'text-[var(--accent-brass)]/30' : 'text-[var(--ink-primary)]/10'}`} />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-3">
                            <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isActive ? (viewMode === '3D' ? 'text-[var(--accent-brass)]' : 'text-[var(--ink-primary)]') : (viewMode === '3D' ? 'text-[#8b7965]/50' : 'text-[var(--ink-secondary)]/30')}`}>
                              {t('reader.unit')} {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className={`text-xl font-serif tracking-widest uppercase transition-all ${isActive ? (viewMode === '3D' ? 'text-[var(--ink-primary)] font-bold' : 'text-[var(--ink-primary)] font-bold') : isUnlocked ? (viewMode === '3D' ? 'text-[#6b5a45] group-hover:text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]/50 group-hover:text-[var(--ink-primary)]') : (viewMode === '3D' ? 'text-[#d3cbbd]' : 'text-[var(--ink-primary)]/10')}`}>
                              {isUnlocked ? chapter.title[language] : t('reader.encrypted')}
                            </h3>
                            {isUnlocked && (
                              <div className="flex items-center gap-4 opacity-50">
                                <div className={`h-px w-6 ${viewMode === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]'}`} />
                                <span className={`text-[10px] font-mono uppercase tracking-widest ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-[var(--ink-primary)]'}`}>
                                  {chapter.wordCount} {t('reader.words')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Reading Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              {/* World Background (Atmospheric) */}
              <div className={`absolute inset-0 z-0 blur-[100px] scale-150 pointer-events-none transition-opacity duration-1000 ${viewMode === '3D' ? 'opacity-[0.05]' : 'opacity-[0.02]'}`}>
                <img src={selectedWorld.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Reading Header HUD */}
              <div className={`relative z-10 px-20 py-10 border-b flex items-center justify-between backdrop-blur-2xl transition-colors duration-700 ${viewMode === '3D' ? 'bg-[var(--bg-secondary)]/80 border-[#d3cbbd]' : 'bg-white/40 border-[var(--ink-primary)]/5'}`}>
                <div className="flex items-center gap-8">
                  <div className={`p-3 border transition-colors ${viewMode === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd]' : 'bg-[var(--ink-primary)]/5 border-[var(--ink-primary)]/10'}`}>
                    {viewMode === '3D' ? <BookOpen className="w-5 h-5 text-[var(--accent-brass)]" /> : <PenTool className="w-5 h-5 text-[var(--ink-primary)]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-mono tracking-[0.6em] uppercase ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-[var(--ink-secondary)]/60'}`}>
                      {viewMode === '3D' ? t('reader.protocolActive') : t('reader.reviewProgress')}
                    </span>
                    <span className={`text-sm font-serif tracking-[0.2em] uppercase mt-1 ${viewMode === '3D' ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]/80'}`}>{activeChapter.title[language]}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-12 text-[10px] font-mono tracking-[0.3em] uppercase ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-[var(--ink-primary)]/30'}`}>
                  <div className="flex items-center gap-3">
                    {viewMode === '3D' ? (
                      <div className="w-2 h-2 bg-[#8b5a2b] rounded-full animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 bg-[var(--ink-primary)] rounded-full animate-pulse" />
                    )}
                    <span>{viewMode === '3D' ? t('reader.syncStable') : t('reader.inkFlowing')}</span>
                  </div>
                  <div className={`w-px h-4 ${viewMode === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/10'}`} />
                  <span>{t('reader.payload')}: {activeChapter.wordCount} Bits</span>
                </div>
              </div>

              {/* Content Container */}
              <div 
                ref={contentRef}
                onScroll={handleScroll}
                className="relative z-10 flex-1 overflow-y-auto custom-scrollbar"
              >
                <div className="max-w-5xl mx-auto px-20 py-40">
                  <motion.div
                    key={activeChapter.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <div className="flex flex-col items-center mb-32">
                      <div className={`h-px w-32 mb-16 ${viewMode === '3D' ? 'bg-gradient-to-r from-transparent via-[#cbb387] to-transparent' : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'}`} />
                      <h1 className={`text-7xl font-serif font-bold tracking-[0.3em] leading-tight text-center uppercase transition-colors duration-700 ${viewMode === '3D' ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]'}`}>
                        {activeChapter.title[language]}
                      </h1>
                      <div className={`h-px w-32 mt-16 ${viewMode === '3D' ? 'bg-gradient-to-r from-transparent via-[#cbb387] to-transparent' : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'}`} />
                    </div>
                    
                    <div className={`novel-content text-2xl leading-[2.4] font-serif tracking-wider space-y-16 transition-colors duration-700 ${viewMode === '3D' ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]/80'}`}>
                      {activeChapter.content[language].split('\n').map((para, i) => (
                        <p key={i} className={`first-letter:text-5xl first-letter:mr-2 first-letter:font-bold ${viewMode === '3D' ? 'first-letter:text-[var(--accent-brass)]' : 'first-letter:text-[var(--ink-primary)]/60'}`}>{para}</p>
                      ))}
                    </div>

                    {/* Chapter End / Navigation */}
                    <div className={`mt-64 pt-32 border-t flex flex-col items-center text-center transition-colors duration-700 ${viewMode === '3D' ? 'border-[#d3cbbd]' : 'border-[var(--ink-primary)]/10'}`}>
                      {(() => {
                        const currentIndex = selectedWorld.chapters.findIndex(c => c.id === activeChapter.id);
                        const isLastChapter = currentIndex === selectedWorld.chapters.length - 1;
                        const isNextUnlocked = readChapterIds.includes(activeChapter.id);

                        if (isLastChapter) {
                          return (
                            <div className="flex flex-col items-center gap-10">
                              <div className={`w-24 h-px mb-8 ${viewMode === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/20'}`} />
                              <span className={`text-2xl font-serif tracking-[1em] uppercase ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-[var(--ink-secondary)]/60'}`}>{t('reader.end')}</span>
                              <p className={`text-xs font-mono tracking-[0.6em] uppercase mt-8 ${viewMode === '3D' ? 'text-[#6b5a45]/50' : 'text-[var(--ink-primary)]/10'}`}>{t('reader.awaiting')}</p>
                            </div>
                          );
                        }
 
                        if (isNextUnlocked) {
                          return (
                            <button
                              onClick={goToNextChapter}
                              className={`group relative px-24 py-8 text-sm font-bold tracking-[0.8em] uppercase overflow-hidden transition-all duration-700 ${viewMode === '3D' ? 'bg-[#8b5a2b] text-[#fcf8f2] hover:bg-[#6b451f] shadow-lg hover:shadow-xl' : 'bg-[var(--ink-primary)] text-[var(--bg-primary)] hover:bg-[var(--ink-primary)]/80 shadow-2xl'}`}
                            >
                              <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${viewMode === '3D' ? 'bg-[var(--bg-secondary)]/20' : 'bg-white/10'}`} />
                              {t('reader.next')}
                            </button>
                          );
                        }

                        return (
                          <div className="flex flex-col items-center gap-12">
                            <motion.div 
                              animate={{ y: [0, 20, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="flex flex-col items-center gap-6 opacity-30"
                            >
                              <ChevronDown className={`w-10 h-10 ${viewMode === '3D' ? 'text-[var(--accent-brass)]' : 'text-[var(--ink-primary)]'}`} />
                              <span className={`text-xs font-mono tracking-[0.6em] uppercase ${viewMode === '3D' ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]'}`}>
                                {viewMode === '3D' ? t('reader.sync3D') : t('reader.sync2D')}
                              </span>
                            </motion.div>
                            <motion.div 
                              className={`h-2 w-2 rounded-full ${viewMode === '3D' ? 'bg-[var(--accent-brass)]' : 'bg-[var(--ink-primary)]/60'}`}
                              onViewportEnter={() => {
                                markChapterAsRead(activeChapter.id);
                              }}
                            />
                          </div>
                        );
                      })()}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}