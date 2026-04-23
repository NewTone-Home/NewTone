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
import { WorldsChumo } from './pages/WorldsChumo';
import { WorldsChumoLetter } from './pages/WorldsChumoLetter';
import { PlaceholderPage } from './components/PlaceholderPage';
import { Landing } from './pages/Landing';
import { Library as LibraryPage } from './pages/Library';

import { useTheme } from './contexts/ThemeContext';
import { GlobalHeader } from './components/GlobalHeader';
import { GlobalFooter } from './components/GlobalFooter';

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
          <div className={`absolute inset-0 blur-[20px] rounded-full z-0 transition-opacity duration-500 opacity-0 ${isSelected || isLocked ? 'opacity-50' : 'group-hover:opacity-60'}`} style={{ backgroundColor: isLocked ? 'var(--seal-red)' : 'var(--brass)' }} />
        )}

        {/* HUD Node Effect */}
        <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full border-2 transition-all duration-500 flex items-center justify-center backdrop-blur-sm
          ${isNight ? 'border-[var(--brass)]/60 shadow-[inset_0_0_25px_rgba(184,147,90,0.2)]' : 'border-[var(--ink)]/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]'}
          ${isSelected && !isLocked ? (isNight ? 'bg-[var(--brass)]/30 scale-110 border-[var(--brass)] shadow-[0_0_30px_rgba(184,147,90,0.6)]' : 'bg-[var(--ink)]/20 scale-110 border-[var(--ink)] shadow-[0_0_20px_rgba(0,0,0,0.3)]') : (isNight ? 'bg-transparent group-hover:bg-[var(--brass)]/20' : 'bg-transparent group-hover:bg-[var(--ink)]/10')} 
          ${isLocked ? (isNight ? 'border-[var(--seal-red)]/40 opacity-70 shadow-none bg-black/50' : 'border-[var(--ink)]/20 opacity-50 bg-black/10') : ''}
        `}>
          <div className={`absolute inset-[-10px] border-2 rounded-full border-dashed scale-110 ${isNight ? (isLocked ? 'border-[var(--seal-red)]/30' : 'border-[var(--brass)]/60 text-[var(--brass)]') : 'border-[var(--ink)]/40 text-[var(--ink)]'} ${isLocked ? '' : 'animate-[spin_30s_linear_infinite]'}`} />
          
          <div className={`absolute w-full h-[1px] ${isNight ? 'bg-[var(--brass)]/30' : 'bg-[var(--ink)]/20'} ${isLocked ? 'hidden' : 'animate-pulse'}`} />
          <div className={`absolute h-full w-[1px] ${isNight ? 'bg-[var(--brass)]/30' : 'bg-[var(--ink)]/20'} ${isLocked ? 'hidden' : 'animate-pulse'}`} />

          {isLocked ? (
            <Lock className={`w-8 h-8 md:w-10 md:h-10 transition-colors z-10 ${isNight ? 'text-[var(--seal-red)]' : 'text-[var(--ink)]/60'}`} />
          ) : (
            isNight ? (
              <Zap className={`w-8 h-8 md:w-10 md:h-10 transition-colors drop-shadow-[0_0_10px_rgba(217,165,102,1)] z-10 ${isSelected ? 'text-[#fff]' : 'text-[var(--brass)] group-hover:text-[#fff]'}`} />
            ) : (
              <PenTool className={`w-8 h-8 md:w-10 md:h-10 transition-colors z-10 drop-shadow-md ${isSelected ? 'text-[var(--ink)]' : 'text-[var(--ink)]/60 group-hover:text-[var(--ink)]'}`} />
            )
          )}
        </div>
        
        {/* HUD Label */}
        <div className="mt-6 text-center relative group z-10">
          <div className="absolute inset-[-8px] bg-[var(--bg)]/80 blur-md rounded-md -z-10" />
          <h3 className={`text-2xl md:text-3xl font-display tracking-[0.2em] uppercase transition-colors relative z-10 
            ${isSelected && !isLocked ? (isNight ? 'text-[#fff] font-bold drop-shadow-[0_0_8px_rgba(217,165,102,0.8)] scale-110' : 'text-[var(--ink)] font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)] scale-110') : 
              isLocked ? (isNight ? 'text-[var(--seal-red)]/60' : 'text-[var(--ink)]/40') : 
              (isNight ? 'text-[var(--brass)] group-hover:text-[#fff]' : 'text-[var(--ink)]/80 group-hover:text-[var(--ink)]')}
          `}>
            {world.name[language]}
          </h3>
          {!isLocked && <div className={`h-[2px] w-0 group-hover:w-[150%] transition-all duration-500 mx-auto mt-2 -translate-x-1/6 ${isNight ? 'bg-[var(--brass)] drop-shadow-[0_0_5px_var(--brass)]' : 'bg-[var(--ink)] drop-shadow-md'} ${isSelected ? 'w-[150%]' : ''}`} />}
          
          {/* Tooltip for Locked World */}
          {isLocked && (
            <div className={`absolute top-[-30px] left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-serif whitespace-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
               ${isNight ? 'bg-[#1a1c24] border border-[var(--seal-red)]/30 text-[var(--ink)] shadow-[0_0_10px_rgba(122,43,37,0.3)]' : 'bg-[var(--ink)]/80 text-[var(--bg)]'}
            `}>
              封印中 · 待未来开启
            </div>
          )}
        </div>

        {/* Selection Indicator */}
        {isSelected && !isLocked && (
          <motion.div 
            layoutId="sketch-select"
            className={`absolute -inset-6 md:-inset-8 border border-dashed rounded-full pointer-events-none ${isNight ? 'border-[var(--glow-warm)]/60 mix-blend-screen shadow-[0_0_20px_rgba(217,165,102,0.3)] animate-[spin_10s_linear_infinite]' : 'border-[var(--ink)]/40 animate-[spin_10s_linear_infinite]'}`}
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[var(--bg)] transition-colors duration-500">
      
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
             <div className="absolute inset-x-0 -top-[30%] h-[60%] bg-[var(--brass)]/5 blur-[120px] rounded-full mix-blend-screen" />
             <div className="absolute inset-y-0 -left-[30%] w-[60%] bg-[var(--brass)]/5 blur-[120px] rounded-full mix-blend-screen" />
             
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
                  style={{ filter: `drop-shadow(0 0 2px var(--brass))` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paper Texture Overlay */}
      <div className={`absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none transition-opacity duration-500 ${isNight ? 'opacity-20 mix-blend-normal blur-[1px]' : ''}`} 
           style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-map.png)' }} />
      
      {/* Decorative Border */}
      <div className={`absolute inset-8 border-[12px] border-double rounded-sm transition-colors duration-500 ${isNight ? 'border-[var(--brass)]/15 shadow-[inset_0_0_20px_rgba(184,147,90,0.05)]' : 'border-[var(--ink)]/10'}`} />
      <div className={`absolute inset-10 border transition-colors duration-500 ${isNight ? 'border-[var(--brass)]/10' : 'border-[var(--ink)]/5'}`} />

      {/* Compass Rose */}
      <div className={`absolute bottom-20 right-20 transform scale-150 transition-all duration-500 ${isNight ? 'opacity-50 text-[var(--brass)] drop-shadow-[0_0_10px_rgba(184,147,90,0.5)]' : 'opacity-20 text-[var(--ink)]'}`}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" stroke="currentColor" className="text-current">
          <circle cx="80" cy="80" r="60" strokeDasharray="4 4" className={isNight ? 'animate-[spin_40s_linear_infinite]' : ''} />
          {isNight && <circle cx="80" cy="80" r="10" fill="var(--brass)" className="blur-[10px] mix-blend-screen opacity-60 animate-[pulse-glow_2s_infinite]" />}
          <path d="M80 0 L90 70 L80 80 L70 70 Z" fill="currentColor" />
          <path d="M80 160 L70 90 L80 80 L90 90 Z" fill="currentColor" />
          <path d="M0 80 L70 70 L80 80 L70 90 Z" fill="currentColor" />
          <path d="M160 80 L90 90 L80 80 L90 70 Z" fill="currentColor" />
          <text x="76" y="20" className="text-[10px] font-serif font-bold">N</text>
        </svg>
      </div>

      {/* Old Map Annotations */}
      <div className={`absolute top-24 left-24 font-serif italic text-2xl tracking-widest select-none transition-colors duration-500 ${isNight ? 'opacity-40 text-[var(--brass)] blur-[0.5px]' : 'opacity-20 text-[var(--ink)]'}`}>
        {t('app.terraIncognita')}
      </div>
      
      {/* Decorative Ship */}
      <div className={`absolute top-1/4 right-1/4 transform rotate-12 select-none transition-colors duration-500 ${isNight ? 'opacity-20 stroke-[var(--brass)] fill-[var(--brass)] text-[var(--brass)]' : 'opacity-10 stroke-[var(--ink)] fill-transparent text-[var(--ink)]'}`}>
        <svg width="80" height="60" viewBox="0 0 80 60" strokeWidth="1">
          <path d="M10 40 L70 40 L60 55 L20 55 Z" fill="inherit" />
          <path d="M40 40 L40 10 L65 25 L40 25" fill="none" />
          <path d="M40 35 L40 15 L20 25 L40 25" fill="none" />
          <text x="20" y="58" className="text-[6px] font-serif stroke-none fill-current">{t('app.hmsDiscovery')}</text>
        </svg>
      </div>

      {/* Decorative Sea Monster */}
      <div className={`absolute bottom-1/4 left-1/3 transform -rotate-6 select-none transition-colors duration-500 ${isNight ? 'opacity-20 stroke-[var(--brass)] fill-[var(--brass)]' : 'opacity-10 stroke-black fill-black'}`}>
        <svg width="100" height="40" viewBox="0 0 100 40" strokeWidth="1" stroke="currentColor">
          <path d="M10 30 Q 25 10, 40 30 T 70 30 T 90 30" fill="none" />
          <path d="M15 32 Q 25 15, 35 32" opacity="0.5" fill="none" />
          <circle cx="12" cy="28" r="1" fill="currentColor" stroke="none" />
          <text x="40" y="38" className="text-[6px] font-serif stroke-none fill-current">{t('app.leviathan')}</text>
        </svg>
      </div>

      <div className={`absolute bottom-32 left-40 transform -rotate-12 select-none transition-colors duration-500 ${isNight ? 'opacity-30 stroke-[var(--brass)] text-[var(--brass)]' : 'opacity-10 stroke-black text-[var(--ink)]'}`}>
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" strokeWidth="1" stroke="currentColor">
          <path d="M10 40 Q 30 10, 60 40 T 110 40" />
          <text x="35" y="65" className="text-[8px] font-serif stroke-none fill-current">{t('app.mareIgnotum')}</text>
        </svg>
      </div>

      {/* Sketch Grid Lines */}
      <div 
        className={`absolute inset-0 opacity-[0.03] transition-colors duration-500 ${isNight ? 'opacity-[0.08]' : ''}`} 
        style={{ 
          backgroundImage: `linear-gradient(${isNight ? 'var(--brass)' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isNight ? 'var(--brass)' : '#000'} 1px, transparent 1px)`, 
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Vignette */}
      <div className={`absolute inset-0 transition-shadow duration-500 ${isNight ? 'shadow-[inset_0_0_300px_rgba(0,0,0,0.8)]' : 'shadow-[inset_0_0_300px_rgba(0,0,0,0.15)]'}`} />
    </div>
  );
};

// --- Game UI Overlay Component ---
const GameUIOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[200]">
      {/* Scanlines Effect */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')] bg-repeat mix-blend-overlay" />
      
      {/* Moving Scanline Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ink)]/10 to-transparent h-[10px] w-full animate-[scanline-fast_8s_linear_infinite] opacity-30" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] md:shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] mix-blend-multiply dark:mix-blend-overlay" />

      {/* Mecha / RPG Interface Brackets (Corners) */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--ink)]/30 md:w-12 md:h-12 md:border-[var(--ink)]/40 transition-colors duration-500" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--ink)]/30 md:w-12 md:h-12 md:border-[var(--ink)]/40 transition-colors duration-500" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--ink)]/30 md:w-12 md:h-12 md:border-[var(--ink)]/40 transition-colors duration-500" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--ink)]/30 md:w-12 md:h-12 md:border-[var(--ink)]/40 transition-colors duration-500" />

      {/* Crosshairs & Tactical Markers */}
      <div className="absolute top-1/2 left-2 w-2 h-[1px] bg-[var(--ink)]/30 -translate-y-1/2 md:left-4 md:w-3" />
      <div className="absolute top-1/2 right-2 w-2 h-[1px] bg-[var(--ink)]/30 -translate-y-1/2 md:right-4 md:w-3" />
      <div className="absolute top-2 left-1/2 w-[1px] h-2 bg-[var(--ink)]/30 -translate-x-1/2 md:top-4 md:h-3" />
      <div className="absolute bottom-2 left-1/2 w-[1px] h-2 bg-[var(--ink)]/30 -translate-x-1/2 md:bottom-4 md:h-3" />

      {/* System Readout Text */}
      <div className="absolute bottom-10 right-6 font-mono text-[8px] md:text-[10px] text-[var(--ink)]/40 tracking-widest text-right leading-relaxed hidden sm:block delay-100 transition-colors duration-500">
        SYS.COORD: 25.03°N 121.56°E<br/>
        MEM_CAP: 99.9%<br/>
        AWAITING_INPUT
      </div>
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
          <div className={`absolute inset-0 ${viewMode === '3D' ? 'bg-[var(--bg)]' : 'bg-[var(--bg)]'}`} />
          
          {/* Animated Elements */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <BookOpen className={`w-16 h-16 ${viewMode === '3D' ? 'text-[var(--brass)]' : 'text-[var(--ink)]'}`} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h2 className={`text-4xl font-serif tracking-[0.4em] uppercase mb-4 ${viewMode === '3D' ? 'text-[var(--ink)]' : 'text-[var(--ink)]'}`}>
                {t('settings.language')}
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className={`h-px w-12 ${viewMode === '3D' ? 'bg-[var(--brass)]' : 'bg-[var(--ink)]/20'}`} />
                <span className={`text-xs font-serif font-bold tracking-widest uppercase ${viewMode === '3D' ? 'text-[var(--brass)]/80' : 'text-[var(--ink)]/60'}`}>
                  {targetLanguage ? t(`lang.${targetLanguage}`) : ''}
                </span>
                <div className={`h-px w-12 ${viewMode === '3D' ? 'bg-[var(--brass)]' : 'bg-[var(--ink)]/20'}`} />
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

// --- Main App Component ---

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, lang: language, toggleLang } = useTheme();
  const isNight = theme === 'night';
  
  const [isTransitioningLanguage, setIsTransitioningLanguage] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);
  
  const [worlds] = useState<NovelWorld[]>(INITIAL_WORLDS);
  
  const t = (key: string) => UI_TRANSLATIONS[language][key] || key;
  
  const handleLanguageChange = (newLang: Language) => {
    if (newLang === language || isTransitioningLanguage) return;
    
    setPendingLanguage(newLang);
    setIsTransitioningLanguage(true);
    
    setTimeout(() => {
      toggleLang();
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

  const renderContent = () => {
    if (location.pathname === '/') {
      return <Landing />;
    }

    if (location.pathname === '/worlds/chumo') return <WorldsChumo />;
    if (location.pathname.startsWith('/worlds/chumo/letter')) return <WorldsChumoLetter />;
    
    if (location.pathname === '/read/main') return <PlaceholderPage title="主线 · 待启" topRightControls={<GlobalHeader />} />;
    if (location.pathname === '/read/jixiujie') return <PlaceholderPage title="修杰故事线 · 占位" topRightControls={<GlobalHeader />} />;
    if (location.pathname === '/read/sunruoyu') return <PlaceholderPage title="若雨故事线 · 占位" topRightControls={<GlobalHeader />} />;
    if (location.pathname === '/read/jiyunling') return <PlaceholderPage title="云灵故事线 · 占位" topRightControls={<GlobalHeader />} />;
    if (location.pathname === '/read/elder') return <PlaceholderPage title="长者故事线 · 占位" topRightControls={<GlobalHeader />} />;

    if (location.pathname === '/worlds/chumo/about') return <PlaceholderPage title="世界观简介 · 建设中" topRightControls={<GlobalHeader />} />;
    if (location.pathname === '/worlds/chumo/relations') return <PlaceholderPage title="人物关系 · 建设中" topRightControls={<GlobalHeader />} />;

    // The /library path or default
    return <LibraryPage />;
  };

  const renderTransitions = () => (
    <>
      <AnimatePresence>
        {isEntering && targetWorld && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] overflow-hidden"
          >
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
                  className="absolute w-64 h-64 bg-[var(--ink)]/5 rounded-full blur-3xl"
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative flex flex-col items-center z-10"
            >
              <div className="w-72 h-72 border-4 border-double border-[var(--ink)]/20 flex items-center justify-center mb-16 relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10px] border border-[var(--ink)]/10 border-dashed rounded-full"
                />
                <PenTool className="w-20 h-20 text-[var(--ink)]/60" />
              </div>
              
              <h2 className="text-5xl font-serif tracking-[0.5em] text-[var(--ink)] uppercase mb-8">
                {t('transition.tracing')}: {targetWorld.name[language]}
              </h2>
              
              <div className="flex items-center gap-8">
                <motion.div initial={{ width: 0 }} animate={{ width: 120 }} className="h-px bg-[var(--ink)]/20" />
                <p className="text-[var(--ink)]/60 font-serif italic text-sm tracking-widest animate-pulse">
                  {t('transition.inking')}
                </p>
                <motion.div initial={{ width: 0 }} animate={{ width: 120 }} className="h-px bg-[var(--ink)]/20" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExiting && targetWorld && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative flex flex-col items-center z-10"
            >
              <div className="w-64 h-64 border border-[var(--ink)]/10 flex items-center justify-center mb-12 relative">
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-5px] border border-[var(--ink)]/5 border-dashed rounded-full"
                />
                <PenTool className="w-16 h-16 text-[var(--ink)]/30" />
              </div>
              <h2 className="text-4xl font-serif tracking-[0.4em] text-[var(--ink)]/60 uppercase mb-6">
                {t('transition.closing')}{targetWorld.name[language]}
              </h2>
              <p className="text-[var(--ink)]/30 font-serif italic text-sm tracking-widest animate-pulse">
                {t('transition.inkDries')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const renderReader = () => {
    if (!selectedWorld || !activeChapter) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 flex bg-[var(--bg)] transition-colors duration-700 font-sans"
      >
        <GlobalHeader />
        <div className="w-96 border-r border-[var(--brass)]/10 flex flex-col bg-[var(--bg)] shadow-xl relative z-20">
          <div className="p-10 border-b border-[var(--brass)]/10">
            <button 
              onClick={handleExitWorld}
              className="flex items-center gap-3 mb-10 group text-[var(--ink)]/50 hover:text-[var(--ink)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-serif font-bold tracking-[0.3em] uppercase">{t('reader.back2D')}</span>
            </button>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[var(--ink)]/30">{t('reader.manuscript')}</span>
              <h2 className="text-3xl font-serif font-bold tracking-widest uppercase text-[var(--ink)]">{selectedWorld.name[language]}</h2>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            <div className="relative pl-6 border-l border-[var(--brass)]/10 space-y-12">
              {selectedWorld.chapters.map((chapter, idx) => {
                const isRead = readChapterIds.includes(chapter.id);
                const isActive = activeChapter.id === chapter.id;
                const isUnlocked = idx === 0 || isRead || (idx > 0 && readChapterIds.includes(selectedWorld.chapters[idx-1].id));
                
                return (
                  <div key={chapter.id} className={`relative group ${isUnlocked ? 'cursor-pointer' : 'opacity-30 cursor-not-allowed'}`} onClick={() => isUnlocked && handleChapterClick(chapter, idx)}>
                    <div className={`absolute -left-[31px] w-3 h-3 rounded-full border-2 transition-all duration-500 ${isActive ? 'bg-[var(--brass)] border-[var(--brass)] scale-125' : isRead ? 'bg-[var(--ink)] border-[var(--ink)]' : 'bg-[var(--bg)] border-[var(--brass)]/30'}`} />
                    <div className="flex flex-col gap-1">
                      <span className={`text-[8px] font-mono tracking-widest uppercase ${isActive ? 'text-[var(--brass)]' : 'text-[var(--ink)]/30'}`}>UNIT {String(idx+1).padStart(2, '0')}</span>
                      <h3 className={`text-sm font-serif tracking-widest transition-colors uppercase ${isActive ? 'text-[var(--ink)] font-bold' : isUnlocked ? 'text-[var(--ink)]/60 group-hover:text-[var(--ink)]' : 'text-[var(--ink)]/20'}`}>
                        {isUnlocked ? chapter.title[language] : 'Locked'}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 relative flex flex-col bg-[var(--bg)] overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none grayscale blur-3xl scale-150">
            <img src={selectedWorld.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 px-12 py-8 border-b border-[var(--brass)]/10 flex items-center justify-between backdrop-blur-xl bg-[var(--bg)]/60">
            <div className="flex items-center gap-6">
              <PenTool className="w-5 h-5 text-[var(--brass)]" />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--ink)]/30">{t('reader.activeUnit')}</span>
                <span className="text-xs font-serif tracking-[0.2em] font-bold uppercase text-[var(--ink)]/80">{activeChapter.title[language]}</span>
              </div>
            </div>
            <div className="flex items-center gap-8 text-[9px] font-mono tracking-widest uppercase text-[var(--ink)]/40 pr-[140px]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--brass)] animate-pulse" />
                <span>{t('reader.inkFlowing')}</span>
              </div>
              <div className="w-px h-3 bg-[var(--brass)]/20" />
              <span>WORDS: {activeChapter.wordCount}</span>
            </div>
          </div>

          <div ref={contentRef} onScroll={handleScroll} className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-3xl mx-auto px-12 py-32">
              <motion.div key={activeChapter.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex flex-col items-center mb-24">
                  <div className="w-24 h-px bg-[var(--brass)]/20 mb-12" />
                  <h1 className="text-5xl font-serif font-bold tracking-[0.2em] text-center uppercase text-[var(--ink)] leading-tight">{activeChapter.title[language]}</h1>
                  <div className="w-24 h-px bg-[var(--brass)]/20 mt-12" />
                </div>
                <div className="novel-content text-xl leading-[2.2] font-serif space-y-12 text-[var(--ink)]/80 selection:bg-[var(--brass)]/20">
                  {activeChapter.content[language].split('\n').filter(p => p.trim()).map((p, i) => (
                    <p key={i} className="first-letter:text-4xl first-letter:font-bold first-letter:text-[var(--brass)] first-letter:mr-2">{p}</p>
                  ))}
                </div>

                <div className="mt-40 pt-20 border-t border-[var(--brass)]/10 flex flex-col items-center">
                  {(() => {
                    const currentIndex = selectedWorld.chapters.findIndex(c => c.id === activeChapter.id);
                    const isLast = currentIndex === selectedWorld.chapters.length - 1;
                    const isRead = readChapterIds.includes(activeChapter.id);

                    if (isLast) return <div className="text-[10px] font-serif tracking-[1em] uppercase opacity-20 mt-8">{t('reader.end')}</div>;
                    if (isRead) return (
                      <button onClick={goToNextChapter} className="px-12 py-4 bg-[var(--ink)] text-[var(--bg)] text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-[var(--ink)]/80 transition-colors shadow-lg">
                        {t('reader.next')}
                      </button>
                    );
                    return (
                      <div className="flex flex-col items-center gap-6 opacity-20">
                        <ChevronDown className="w-6 h-6 animate-bounce" />
                        <span className="text-[9px] font-mono tracking-widest">{t('reader.scroll2Read')}</span>
                        <div onViewportEnter={() => markChapterAsRead(activeChapter.id)} className="h-1 w-1" />
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative transition-colors duration-600 w-full overflow-hidden">
      <main className="w-full h-full relative z-[1]">
        {renderContent()}
      </main>
      <GlobalFooter />
    </div>
  );
}

export default function App() {
  return (
    <MainApp />
  );
}