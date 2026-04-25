import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, MeshDistortMaterial, MeshWobbleMaterial, 
  PerspectiveCamera, Environment, ContactShadows,
  Torus, Icosahedron, Octahedron, Box, Sphere, Cone, Cylinder,
  OrbitControls, Html
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Globe, ArrowLeft, CircleDot, CheckCircle2, BookOpen, Lock, 
  ChevronDown, Navigation, Map as MapIcon, Crosshair, Zap, 
  Activity, Cpu, Search, Filter, Layers, Maximize2, Minimize2,
  Compass, Radio, ShieldAlert, Database, Layout, PenTool, Library
} from 'lucide-react';
import { NovelWorld, StoryChapter, Language } from './types';
import { INITIAL_WORLDS } from './data';
import { UI_TRANSLATIONS } from './locales';

// --- Background Components ---

const BookPages = ({ currentWorld, language, onEnterWorld }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Left Page (Image) */}
      <group position={[-2.95, 0.05, 0]} rotation={[0, 0.04, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.8, 0.1, 8.5]} />
          <meshStandardMaterial color="#fcf8f2" roughness={0.9} />
        </mesh>
        <Html transform position={[0, 0.06, 0]} rotation={[-Math.PI/2, 0, 0]} zIndexRange={[100, 0]}>
          <div className="w-[450px] h-[650px] bg-[#fcf8f2] p-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] border-r border-[#d3cbbd]/30 flex flex-col justify-center items-center pointer-events-none rounded-l-sm">
             <div className="w-full flex-1 rounded-sm overflow-hidden relative shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-6 border border-[#8b5a2b]/20">
               <img src={currentWorld.imageUrl} alt="World" className="w-full h-full object-cover" />
               <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" />
             </div>
             <p className="text-[#8b5a2b] font-mono text-sm tracking-[0.4em] uppercase opacity-70">
               ARCHIVE :: {currentWorld.id}
             </p>
          </div>
        </Html>
      </group>

      {/* Right Page (Info) */}
      <group position={[2.95, 0.05, 0]} rotation={[0, -0.04, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.8, 0.1, 8.5]} />
          <meshStandardMaterial color="#fdfaf5" roughness={0.9} />
        </mesh>
        <Html transform position={[0, 0.06, 0]} rotation={[-Math.PI/2, 0, 0]} zIndexRange={[100, 0]}>
          <div className="w-[450px] h-[650px] bg-[#fdfaf5] p-12 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] border-l border-[#d3cbbd]/30 flex flex-col items-center justify-between pointer-events-auto rounded-r-sm">
            
            <div className="flex flex-col items-center justify-center flex-1 w-full text-center">
              <Compass className="w-14 h-14 text-[#cbb387] mb-8 opacity-40" />
              
              <h2 className="text-5xl font-bold font-serif tracking-widest text-[#4a3b2c] uppercase leading-tight mb-6 drop-shadow-sm">
                {currentWorld.name[language]}
              </h2>
              
              <div className="flex items-center gap-4 mb-10 w-full justify-center opacity-70">
                <div className="h-px w-16 bg-[#cbb387]" />
                <span className="text-[#8b5a2b] font-mono text-xs uppercase tracking-[0.4em] px-3 border border-[#cbb387]/30 py-1">
                  {currentWorld.genre[language]}
                </span>
                <div className="h-px w-16 bg-[#cbb387]" />
              </div>

              <p className="text-[#6b5a45] text-lg leading-loose tracking-wide italic px-6 mb-8 line-clamp-4">
                "{currentWorld.shortDescription[language]}"
              </p>
            </div>

            <div className="w-full space-y-8">
              <div className="w-full pt-8 border-t border-[#cbb387]/30 flex justify-between items-end font-serif">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs uppercase tracking-widest text-[#8b7965]">
                    {language === 'zh' ? '总卷数' : language === 'ja' ? '総巻数' : 'Chapters'}
                  </span>
                  <span className="text-2xl font-bold text-[#4a3b2c]">
                    {currentWorld.chapters.length}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs uppercase tracking-widest text-[#8b7965]">
                    {language === 'zh' ? '文字量' : language === 'ja' ? '文字量' : 'Lexicon'}
                  </span>
                  <span className="text-2xl font-bold text-[#4a3b2c]">
                    {currentWorld.chapters.reduce((acc: number, c: any) => acc + c.wordCount, 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => onEnterWorld(currentWorld)}
                className="w-full py-5 bg-[#8b5a2b] text-[#fcf8f2] font-serif font-bold text-lg tracking-[0.4em] uppercase hover:bg-[#6b451f] hover:translate-y-[-2px] transition-all duration-300 shadow-xl hover:shadow-2xl rounded-sm relative overflow-hidden group border border-[#a37042]"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {language === 'zh' ? '翻阅此书' : language === 'ja' ? '世界に入る' : 'Enter World'}
              </button>
            </div>
            
          </div>
        </Html>
      </group>
    </group>
  );
};

const LibraryEnvironment = ({ worlds, focusedWorld, setFocusedWorld, language, onEnterWorld }: any) => {
  // Auto-select first world if none is selected
  useEffect(() => {
    if (!focusedWorld && worlds.length > 0) {
      setFocusedWorld(worlds[0]);
    }
  }, [worlds, focusedWorld, setFocusedWorld]);

  const currentIndex = focusedWorld ? worlds.findIndex((w: any) => w.id === focusedWorld.id) : 0;
  const currentWorld = worlds[currentIndex] || worlds[0];

  const goNext = (e?: any) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % worlds.length;
    setFocusedWorld(worlds[nextIndex]);
  };

  const goPrev = (e?: any) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + worlds.length) % worlds.length;
    setFocusedWorld(worlds[prevIndex]);
  };

  return (
    <div className="absolute inset-0 bg-[#0a0705] font-serif" id="scene-container">
      <Canvas
        camera={{ position: [0, 10, 11], fov: 45 }}
        shadows
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="pointer-events-none" 
      >
        <ambientLight intensity={1.8} color="#f8eed3" />
        <spotLight position={[0, 15, 6]} intensity={3.5} angle={0.5} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} color="#ffeedd" />
        <pointLight position={[0, 2, 8]} intensity={1} color="#ffe4b5" distance={20} />
        
        {/* Dark elegant reading table */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#21130a" roughness={0.7} />
        </mesh>
        
        {/* Subtle velvet table runner underneath the book */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.58, 0]} receiveShadow>
          <planeGeometry args={[20, 15]} />
          <meshStandardMaterial color="#4a1a1a" roughness={1} />
        </mesh>

        <group position={[0, 0, 0]} rotation={[-0.2, 0, 0]}>
          {/* Main Book Leather Cover Base */}
          <mesh position={[0, -0.2, 0]} receiveShadow castShadow>
             <boxGeometry args={[12.2, 0.4, 9]} />
             <meshStandardMaterial color="#3d2314" roughness={0.8} />
          </mesh>
          {/* Spine Base */}
          <mesh position={[0, -0.2, -4.5]} receiveShadow castShadow rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.3, 0.3, 12.2]} />
             <meshStandardMaterial color="#2d170a" roughness={0.9} />
          </mesh>
          
          {currentWorld && (
            <BookPages currentWorld={currentWorld} language={language} onEnterWorld={onEnterWorld} />
          )}
        </group>
      </Canvas>

      {/* 2D UI for Page Turning helps discoverability */}
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
        <button 
          onClick={goPrev} 
          className="pointer-events-auto p-8 rounded-full bg-black/40 backdrop-blur-md border border-[#cbb387]/30 text-[#cbb387]/60 hover:text-[#fcf8f2] hover:bg-black/60 hover:border-[#cbb387]/60 hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          <ArrowLeft className="w-10 h-10" />
        </button>
        <button 
          onClick={goNext} 
          className="pointer-events-auto p-8 rounded-full bg-black/40 backdrop-blur-md border border-[#cbb387]/30 text-[#cbb387]/60 hover:text-[#fcf8f2] hover:bg-black/60 hover:border-[#cbb387]/60 hover:scale-110 transition-all duration-500 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          <ArrowLeft className="w-10 h-10 rotate-180" />
        </button>
      </div>

      {/* Page Turn Overlay Hints */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2">
        <span className="text-[#a39481] font-serif tracking-[0.4em] uppercase text-xs">
          {language === 'zh' ? '点击两侧箭头翻阅书本' : language === 'ja' ? '矢印をクリックしてページをめくる' : 'Use arrows to view volumes'}
        </span>
        <div className="flex gap-2 mt-2">
           {worlds.map((w: any) => (
             <div key={w.id} className={`w-2 h-2 rounded-full transition-all duration-500 ${focusedWorld?.id === w.id ? 'bg-[#cbb387] scale-125 shadow-[0_0_10px_rgba(203,179,135,1)]' : 'bg-[#cbb387]/20 border border-[#cbb387]/40'}`} />
           ))}
        </div>
      </div>

      {/* Warm Vignette overlay for library atmosphere */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] pointer-events-none z-10" />
    </div>
  );
};

// --- 3D World Models ---

const World3DBook = ({ worldId }: { worldId: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  const renderBookColor = () => {
    switch (worldId) {
      case 'w-1': return "#4c6659";
      case 'w-2': return "#4a245e";
      case 'w-3': return "#8c4426";
      case 'w-4': return "#2a3b5c";
      default: return "#755e43";
    }
  };

  const color = renderBookColor();

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.4, 2.2]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0.05, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.52, 0.36, 2.1]} />
        <meshStandardMaterial color="#fcf8f2" roughness={0.9} />
      </mesh>
      <mesh position={[-0.78, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.38, 2.22]} />
        <meshStandardMaterial color="#d4af37" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
};

const WorldCanvas = ({ worldId, isSelected }: { worldId: string, isSelected: boolean }) => {
  return (
    <div className="w-40 h-40 -mt-10 -ml-10 pointer-events-none">
      <Canvas 
        shadows
        camera={{ position: [4, 6, 4], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} color="#fffcf5" />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} color="#ffeedd" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#abcdef" />
        <Suspense fallback={null}>
          <World3DBook worldId={worldId} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// --- World Components ---

const WorldNode = ({ 
  world, x, y, onSelect, isSelected, language 
}: { 
  world: NovelWorld, x: number, y: number, onSelect: () => void, isSelected: boolean, language: Language 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
    >
      <div 
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        className="relative group cursor-pointer"
      >
        {/* Selection Aura (Warm Tabletop Light) */}
        <AnimatePresence>
          {isSelected && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-[-10px] rounded-full bg-amber-500/20 blur-xl"
            />
          )}
        </AnimatePresence>

        {/* Sand Table Interaction Ring */}
        <div className={`absolute inset-[-20px] rounded-full border border-amber-600/30 transition-all duration-1000 ${isSelected ? 'rotate-[180deg] scale-110 opacity-100' : 'opacity-0 group-hover:opacity-40'}`} style={{ borderStyle: 'dotted' }} />

        {/* Base Container for the 3D Mini Piece */}
        <div className={`relative w-20 h-20 rounded-full transition-all duration-700 flex items-center justify-center`}>
          {/* 3D Model (The game piece) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <WorldCanvas worldId={world.id} isSelected={isSelected} />
          </div>
        </div>

        {/* Floating Data Label HUD */}
        <div className={`absolute left-24 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-700 ${isSelected ? 'opacity-100 translate-x-6' : 'opacity-0 group-hover:opacity-100 translate-x-2'}`}>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono text-amber-500/80 tracking-[0.3em] uppercase">
                {UI_TRANSLATIONS[language]['world.dataStream']}::{world.id.toUpperCase()}
              </span>
            </div>
            <h3 className="text-3xl font-serif text-amber-50 tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(217,119,6,0.6)]">
              {world.name[language]}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[9px] font-mono text-amber-500/60 tracking-widest uppercase border border-amber-500/20 px-2 py-0.5">
                {world.genre[language]}
              </span>
              <span className="text-[9px] font-mono text-amber-500/60 tracking-widest uppercase">
                {UI_TRANSLATIONS[language]['world.syncComplete']}
              </span>
            </div>
          </div>
        </div>

        {/* Coordinate Readout */}
        <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 transition-all duration-500 ${isSelected ? 'opacity-100' : 'opacity-20 group-hover:opacity-60'}`}>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] font-mono text-[#a39481]/80 tracking-widest uppercase">
              {UI_TRANSLATIONS[language]['world.location']}::{x.toFixed(2)}/{y.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Sketch Map Components ---

const SketchWorldNode = ({ 
  world, x, y, onSelect, isSelected, language 
}: { 
  world: NovelWorld, x: number, y: number, onSelect: () => void, isSelected: boolean, language: Language 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
    >
      <div 
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        className="relative group cursor-pointer flex flex-col items-center"
      >
        {/* Hand-drawn circle effect */}
        <div className={`relative w-16 h-16 rounded-full border-2 border-black/40 flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-black/10 scale-110 border-black' : 'bg-transparent group-hover:bg-black/5'}`}>
          <div className="absolute inset-0 border border-black/20 rounded-full scale-110 border-dashed animate-[spin_20s_linear_infinite]" />
          <PenTool className={`w-6 h-6 transition-colors ${isSelected ? 'text-black' : 'text-black/40 group-hover:text-black/60'}`} />
        </div>
        
        {/* Sketch Label */}
        <div className="mt-4 text-center relative">
          <div className="absolute inset-[-4px] bg-[#f4ece1]/80 blur-sm rounded-md -z-10" />
          <h3 className={`text-xl font-serif tracking-widest uppercase transition-colors relative z-10 ${isSelected ? 'text-black font-bold' : 'text-black/60 group-hover:text-black'}`}>
            {world.name[language]}
          </h3>
          <div className={`h-px w-0 group-hover:w-full bg-black/40 transition-all duration-500 mx-auto mt-1 ${isSelected ? 'w-full' : ''}`} />
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div 
            layoutId="sketch-select"
            className="absolute -inset-4 border-2 border-black/20 rounded-lg pointer-events-none"
            style={{ borderStyle: 'double' }}
          />
        )}
      </div>
    </motion.div>
  );
};

const SketchBackground = ({ language }: { language: Language }) => {
  const t = (key: string) => UI_TRANSLATIONS[language][key] || key;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#f4ece1]">
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" 
           style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-map.png)' }} />
      
      {/* Decorative Border */}
      <div className="absolute inset-8 border-[12px] border-double border-black/10 rounded-sm" />
      <div className="absolute inset-10 border border-black/5" />

      {/* Compass Rose */}
      <div className="absolute bottom-20 right-20 opacity-20 transform scale-150">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" stroke="currentColor" className="text-black">
          <circle cx="80" cy="80" r="60" strokeDasharray="4 4" />
          <path d="M80 0 L90 70 L80 80 L70 70 Z" fill="currentColor" />
          <path d="M80 160 L70 90 L80 80 L90 90 Z" fill="currentColor" />
          <path d="M0 80 L70 70 L80 80 L70 90 Z" fill="currentColor" />
          <path d="M160 80 L90 90 L80 80 L90 70 Z" fill="currentColor" />
          <text x="76" y="20" className="text-[10px] font-serif font-bold">N</text>
        </svg>
      </div>

      {/* Old Map Annotations */}
      <div className="absolute top-24 left-24 opacity-20 font-serif italic text-black text-2xl tracking-widest select-none">
        {t('app.terraIncognita')}
      </div>
      
      {/* Decorative Ship */}
      <div className="absolute top-1/4 right-1/4 opacity-10 transform rotate-12 select-none">
        <svg width="80" height="60" viewBox="0 0 80 60" fill="none" stroke="black" strokeWidth="1">
          <path d="M10 40 L70 40 L60 55 L20 55 Z" />
          <path d="M40 40 L40 10 L65 25 L40 25" />
          <path d="M40 35 L40 15 L20 25 L40 25" />
          <text x="20" y="58" className="text-[6px] font-serif">{t('app.hmsDiscovery')}</text>
        </svg>
      </div>

      {/* Decorative Sea Monster */}
      <div className="absolute bottom-1/4 left-1/3 opacity-10 transform -rotate-6 select-none">
        <svg width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="black" strokeWidth="1">
          <path d="M10 30 Q 25 10, 40 30 T 70 30 T 90 30" />
          <path d="M15 32 Q 25 15, 35 32" opacity="0.5" />
          <circle cx="12" cy="28" r="1" fill="black" />
          <text x="40" y="38" className="text-[6px] font-serif">{t('app.leviathan')}</text>
        </svg>
      </div>

      <div className="absolute bottom-32 left-40 opacity-10 transform -rotate-12 select-none">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="black" strokeWidth="1">
          <path d="M10 40 Q 30 10, 60 40 T 110 40" />
          <text x="35" y="65" className="text-[8px] font-serif">{t('app.mareIgnotum')}</text>
        </svg>
      </div>

      {/* Sketch Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.15)]" />
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
        className={`flex items-center gap-3 p-4 backdrop-blur-md border transition-all duration-700 relative overflow-hidden ${viewMode === '3D' ? 'bg-[#fcf8f2]/80 border-[#d3cbbd] text-[#4a3b2c] shadow-[0_4px_20px_rgba(139,90,43,0.1)]' : 'bg-black/5 border-black/20 text-black'}`}
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
            className={`absolute top-full right-0 mt-2 min-w-[140px] backdrop-blur-xl border p-1 shadow-2xl z-50 ${viewMode === '3D' ? 'bg-[#fdfaf5]/95 border-[#cbb387]' : 'bg-white/90 border-black/10'}`}
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
                    ? (viewMode === '3D' ? 'bg-[#ece3d3] text-[#4a3b2c]' : 'bg-black/10 text-black') 
                    : (viewMode === '3D' ? 'text-[#8b7965] hover:bg-[#f5efe6] hover:text-[#4a3b2c]' : 'text-black/40 hover:bg-black/5 hover:text-black')
                }`}
              >
                {t(lang.key)}
                {currentLanguage === lang.code && (
                  <motion.div layoutId="activeLang" className={`w-1.5 h-1.5 rounded-full ${viewMode === '3D' ? 'bg-[#8b5a2b]' : 'bg-black'}`} />
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
          <div className={`absolute inset-0 ${viewMode === '3D' ? 'bg-[#f5efe6]' : 'bg-[#f4ece1]'}`} />
          
          {/* Animated Elements */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <BookOpen className={`w-16 h-16 ${viewMode === '3D' ? 'text-[#8b5a2b]' : 'text-black'}`} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h2 className={`text-4xl font-serif tracking-[0.4em] uppercase mb-4 ${viewMode === '3D' ? 'text-[#4a3b2c]' : 'text-black'}`}>
                {t('settings.language')}
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className={`h-px w-12 ${viewMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/20'}`} />
                <span className={`text-xs font-serif font-bold tracking-widest uppercase ${viewMode === '3D' ? 'text-[#a39481]' : 'text-black/40'}`}>
                  {targetLanguage ? t(`lang.${targetLanguage}`) : ''}
                </span>
                <div className={`h-px w-12 ${viewMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/20'}`} />
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

const ViewTransition = ({ isTransitioning, targetMode, language }: { isTransitioning: boolean, targetMode: '3D' | '2D' | null, language: Language }) => {
  const t = (key: string) => UI_TRANSLATIONS[language][key] || key;
  
  return (
    <AnimatePresence>
      {isTransitioning && targetMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Transition background */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={`absolute inset-0 ${targetMode === '3D' ? 'bg-[#fcf8f2]' : 'bg-[#f4ece1]'}`}
          />
          
          {/* Holographic / Ink Ripple Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute w-[800px] h-[800px] rounded-full blur-3xl ${targetMode === '3D' ? 'bg-[#d3cbbd]/20' : 'bg-black/10'}`}
          />

          {/* Transition elements */}
          <div className="relative flex flex-col items-center">
             <motion.div
               initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
               animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
               exit={{ y: -40, opacity: 0, filter: 'blur(10px)' }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className="flex flex-col items-center gap-10"
             >
               <div className="relative w-48 h-48">
                  {/* Outer Ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 rounded-full border-2 border-dashed ${targetMode === '3D' ? 'border-[#8b5a2b]/40' : 'border-black/20'}`}
                  />
                  {/* Inner Ring */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-4 rounded-full border border-dotted ${targetMode === '3D' ? 'border-[#cbb387]/50' : 'border-black/10'}`}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {targetMode === '3D' ? (
                        <BookOpen className="w-20 h-20 text-[#8b5a2b]" />
                      ) : (
                        <Layout className="w-20 h-20 text-black" />
                      )}
                    </motion.div>
                  </div>
               </div>

               <div className="text-center">
                 <motion.h3 
                   initial={{ opacity: 0, letterSpacing: '0.2em' }}
                   animate={{ opacity: 1, letterSpacing: '0.8em' }}
                   className={`text-3xl font-serif uppercase mb-4 ${targetMode === '3D' ? 'text-[#4a3b2c]' : 'text-black'}`}
                 >
                   {targetMode === '3D' ? t('transition.3d') : t('transition.2d')}
                 </motion.h3>
                 
                 <div className="flex items-center justify-center gap-6">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: 100 }}
                     className={`h-px ${targetMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/20'}`} 
                   />
                   <span className={`text-[10px] font-serif font-bold tracking-[0.5em] uppercase ${targetMode === '3D' ? 'text-[#a39481]' : 'text-black/40'}`}>
                     {targetMode === '3D' ? t('transition.reconfiguring') : t('transition.rendering')}
                   </span>
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: 100 }}
                     className={`h-px ${targetMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/20'}`} 
                   />
                 </div>
               </div>
             </motion.div>
          </div>
          
          {/* Glitch / Scanline lines */}
          <div className="absolute inset-0 pointer-events-none">
             {Array.from({ length: 15 }).map((_, i) => (
               <motion.div 
                 key={i}
                 initial={{ x: '-100%', opacity: 0 }}
                 animate={{ x: '200%', opacity: [0, 0.5, 0] }}
                 transition={{ 
                   duration: 0.8, 
                   delay: Math.random() * 1.5, 
                   repeat: Infinity,
                   repeatDelay: Math.random() * 2
                 }}
                 className={`absolute h-px w-full ${targetMode === '3D' ? 'bg-[#cbb387]/30' : 'bg-black/10'}`}
                 style={{ top: `${Math.random() * 100}%` }}
               />
             ))}
          </div>

          {/* Vignette */}
          <div className={`absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.5)]`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App Component ---

export default function App() {
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
  const [unlockedProgress, setUnlockedProgress] = useState<Record<string, number>>({});
  
  // Map Navigation State
  const [focusedWorld, setFocusedWorld] = useState<NovelWorld | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [targetWorld, setTargetWorld] = useState<NovelWorld | null>(null);
  
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [isTransitioningView, setIsTransitioningView] = useState(false);
  const [pendingViewMode, setPendingViewMode] = useState<'3D' | '2D' | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggleViewMode = () => {
    if (isTransitioningView) return;
    
    const nextMode = viewMode === '3D' ? '2D' : '3D';
    setPendingViewMode(nextMode);
    setIsTransitioningView(true);
    
    // Switch the view mode in the middle of the transition
    setTimeout(() => {
      setViewMode(nextMode);
    }, 800);

    // End the transition
    setTimeout(() => {
      setIsTransitioningView(false);
      setPendingViewMode(null);
    }, 1600);
  };

  const handleEnterWorld = (world: NovelWorld) => {
    setTargetWorld(world);
    setIsEntering(true);
    
    if (unlockedProgress[world.id] === undefined) {
      setUnlockedProgress(prev => ({ ...prev, [world.id]: 0 }));
    }
    
    setTimeout(() => {
      setSelectedWorld(world);
      const maxUnlocked = unlockedProgress[world.id] || 0;
      setActiveChapter(world.chapters[maxUnlocked]);
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
    }, 1500);
  };

  const handleChapterClick = (chapter: StoryChapter, index: number) => {
    if (!selectedWorld) return;
    const maxUnlocked = unlockedProgress[selectedWorld.id] || 0;
    if (index <= maxUnlocked) {
      setActiveChapter(chapter);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  const goToNextChapter = () => {
    if (!selectedWorld || !activeChapter) return;
    const currentIndex = selectedWorld.chapters.findIndex(c => c.id === activeChapter.id);
    const maxUnlocked = unlockedProgress[selectedWorld.id] || 0;
    if (currentIndex < selectedWorld.chapters.length - 1) {
      if (currentIndex === maxUnlocked) {
        setUnlockedProgress(prev => ({ ...prev, [selectedWorld.id]: maxUnlocked + 1 }));
      }
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

  return (
    <div className="min-h-screen bg-[#f5efe6] text-black selection:bg-[#8b5a2b]/30 selection:text-white overflow-hidden font-sans">
      
      {/* View Mode Transition Overlay */}
      <ViewTransition isTransitioning={isTransitioningView} targetMode={pendingViewMode} language={language} />
      
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
            {viewMode === '3D' ? (
              <LibraryEnvironment 
                worlds={worlds} 
                focusedWorld={focusedWorld} 
                setFocusedWorld={setFocusedWorld} 
                language={language}
                onEnterWorld={handleEnterWorld}
              />
            ) : (
              <SketchBackground language={language} />
            )}

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
                    onSelect={() => setFocusedWorld(world)}
                    language={language}
                  />
                ))}
              </motion.div>
            )}

            {/* Hub UI Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col z-30">
              {/* Top Bar HUD */}
              <header className="p-12 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <motion.button 
                    onClick={handleToggleViewMode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto group relative"
                  >
                    {/* Dynamic Hover Border */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-[-12px] border transition-all duration-700 ${(viewMode as string) === '3D' ? 'border-[#cbb387]' : 'border-black/20'}`} 
                    />

                    <div className={`p-4 backdrop-blur-md border transition-all duration-700 relative overflow-hidden ${(viewMode as string) === '3D' ? 'bg-[#fcf8f2]/90 border-[#d3cbbd] text-[#4a3b2c] shadow-[0_4px_15px_rgba(139,90,43,0.15)]' : 'bg-black/5 border-black/20 text-black'}`}>
                      {(viewMode as string) === '3D' ? <PenTool className="w-6 h-6" /> : <Library className="w-6 h-6" />}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none">
                       <div className={`px-3 py-1.5 rounded-sm shadow-xl flex items-center gap-3 ${(viewMode as string) === '3D' ? 'bg-[#4a3b2c] text-[#fcf8f2]' : 'bg-black text-white'}`}>
                         <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${(viewMode as string) === '3D' ? 'bg-[#d4b886]' : 'bg-[#fff]'}`} />
                         <span className="text-[10px] font-serif tracking-[0.2em] uppercase font-bold">
                           {(viewMode as string) === '3D' ? t('nav.manuscript') : t('nav.starMap')}
                         </span>
                       </div>
                       {/* Tooltip Arrow */}
                       <div className={`w-2 h-2 rotate-45 mx-auto -mt-1 ${(viewMode as string) === '3D' ? 'bg-[#4a3b2c]' : 'bg-black'}`} />
                    </div>
                  </motion.button>
                  <div className="flex flex-col">
                    <h1 className={`text-3xl font-bold font-serif tracking-[0.5em] uppercase transition-colors duration-700 ${(viewMode as string) === '3D' ? 'text-[#3d2314] drop-shadow-sm' : 'text-black/80'}`}>
                      {(viewMode as string) === '3D' ? t('app.title3D') : t('app.title2D')}
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                       <div className={`flex items-center gap-2 text-[10px] font-serif tracking-[0.3em] font-bold uppercase transition-colors duration-700 ${(viewMode as string) === '3D' ? 'text-[#8b5a2b]' : 'text-black/40'}`}>
                        {(viewMode as string) === '3D' ? <BookOpen className="w-3 h-3" /> : <PenTool className="w-3 h-3" />}
                        <span>{(viewMode as string) === '3D' ? t('app.status3D') : t('app.status2D')}</span>
                      </div>
                      <div className={`w-1 h-1 rounded-full ${(viewMode as string) === '3D' ? 'bg-[#cbb387]' : 'bg-black/10'}`} />
                      <span className={`text-[10px] font-mono tracking-[0.3em] uppercase transition-colors duration-700 ${(viewMode as string) === '3D' ? 'text-[#a39481]' : 'text-black/20'}`}>
                        {(viewMode as string) === '3D' ? t('app.protocol') : t('app.manuscript')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-16 pointer-events-auto items-center">
                   {/* Language Selector */}
                   <LanguageSelector 
                     currentLanguage={language} 
                     onLanguageChange={handleLanguageChange} 
                     viewMode={viewMode} 
                   />

                   <div className="flex flex-col items-end gap-2">
                      <span className={`text-[9px] font-serif font-bold uppercase tracking-widest ${(viewMode as string) === '3D' ? 'text-[#a39481]' : 'text-black/20'}`}>{t('app.sync')}</span>
                      <div className={`flex items-center gap-3 px-4 py-2 border rounded-sm transition-all duration-500 ${(viewMode as string) === '3D' ? 'bg-[#fcf8f2] border-[#d3cbbd] text-[#8b5a2b]' : 'bg-black/5 border-black/10 text-black'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-serif font-bold uppercase tracking-widest">{t('app.stable')}</span>
                      </div>
                   </div>
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
                    <div className={`relative p-12 backdrop-blur-3xl border rounded-sm overflow-hidden group transition-all duration-700 ${(viewMode as string) === '3D' ? 'bg-[#fcf8f2]/95 border-[#d3cbbd] shadow-[0_15px_50px_rgba(139,90,43,0.15)]' : 'bg-[#f4ece1]/90 border-black/20 shadow-2xl'}`}>
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
                            className="absolute top-0 left-0 h-px bg-[#cbb387]" 
                          />
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 left-0 w-px bg-[#cbb387]" 
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
                          className="absolute inset-0 border-4 border-double border-black/10 m-2 pointer-events-none" 
                        />
                      )}
                      
                      <div className="relative z-10">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between mb-10"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full shadow-sm ${(viewMode as string) === '3D' ? 'bg-[#8b5a2b]' : 'bg-black'}`} />
                            <span className={`text-xs font-serif font-bold tracking-[0.4em] uppercase ${(viewMode as string) === '3D' ? 'text-[#8b5a2b]' : 'text-black/60'}`}>
                              {(viewMode as string) === '3D' ? t('world.dataLink') : t('world.manuscriptIdentified')}
                            </span>
                          </div>
                          <div className={`flex items-center gap-2 text-[10px] font-mono ${(viewMode as string) === '3D' ? 'text-[#a39481]' : 'text-black/20'}`}>
                            <BookOpen className="w-3 h-3" />
                            <span>REF::{focusedWorld.id.toUpperCase()}</span>
                          </div>
                        </motion.div>

                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className={`text-6xl font-bold font-serif tracking-tighter mb-8 uppercase leading-none transition-colors ${(viewMode as string) === '3D' ? 'text-[#4a3b2c]' : 'text-black'}`}
                        >
                          {focusedWorld.name[language]}
                        </motion.h2>
                        
                        <motion.div 
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          className="flex items-center gap-6 mb-10 origin-left"
                        >
                          <div className={`h-px flex-1 ${(viewMode as string) === '3D' ? 'bg-gradient-to-r from-[#d3cbbd] to-transparent' : 'bg-black/20'}`} />
                          <span className={`text-[10px] font-serif font-bold uppercase tracking-[0.5em] ${(viewMode as string) === '3D' ? 'text-[#a39481]' : 'text-black/40'}`}>
                            {(viewMode as string) === '3D' ? t('detail.synopsis3D') : t('detail.synopsis2D')}
                          </span>
                        </motion.div>

                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className={`text-lg leading-relaxed mb-12 tracking-wide font-serif italic border-l-2 pl-6 transition-colors ${(viewMode as string) === '3D' ? 'text-[#6b5a45] border-[#cbb387]' : 'text-black/70 border-black/20'}`}
                        >
                          "{focusedWorld.shortDescription[language]}"
                        </motion.p>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="grid grid-cols-2 gap-6 mb-12"
                        >
                          <div className={`flex flex-col gap-3 p-6 border transition-all ${(viewMode as string) === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd] text-[#4a3b2c] shadow-[0_2px_10px_rgba(139,90,43,0.05)]' : 'bg-black/5 border-black/10 hover:border-black/40 text-black'}`}>
                            <span className={`text-[10px] font-serif font-bold uppercase tracking-widest ${(viewMode as string) === '3D' ? 'text-[#a39481]' : 'text-black/30'}`}>{t('detail.classification')}</span>
                            <span className="text-lg tracking-widest font-serif">{focusedWorld.genre[language]}</span>
                          </div>
                          <div className={`flex flex-col gap-3 p-6 border transition-all ${(viewMode as string) === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd] text-[#4a3b2c] shadow-[0_2px_10px_rgba(139,90,43,0.05)]' : 'bg-black/5 border-black/10 hover:border-black/40 text-black'}`}>
                            <span className={`text-[10px] font-serif font-bold uppercase tracking-widest ${(viewMode as string) === '3D' ? 'text-[#a39481]' : 'text-black/30'}`}>{t('detail.narrativeUnits')}</span>
                            <span className="text-lg tracking-widest font-serif">{focusedWorld.chapters.length} {t('detail.chapters')}</span>
                          </div>
                        </motion.div>

                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          onClick={() => handleEnterWorld(focusedWorld)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full group relative py-6 text-sm font-bold tracking-[0.8em] uppercase overflow-hidden transition-all duration-500 ${(viewMode as string) === '3D' ? 'bg-[#8b5a2b] text-[#fcf8f2] hover:bg-[#6b451f] shadow-lg hover:shadow-xl' : 'bg-black text-white hover:bg-black/80 shadow-xl'}`}
                        >
                          <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${(viewMode as string) === '3D' ? 'bg-[#fcf8f2]/20' : 'bg-white/10'}`} />
                          
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
                  <div className={`h-px w-24 ${viewMode === '3D' ? 'bg-amber-600/30' : 'bg-black/10'}`} />
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-ping ${viewMode === '3D' ? 'bg-amber-600' : 'bg-black'}`} />
                    <span className={`text-[9px] font-mono tracking-[0.4em] uppercase transition-colors ${viewMode === '3D' ? 'text-amber-600/60' : 'text-black/40'}`}>
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
            className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${viewMode === '3D' ? 'bg-[#110e0b]' : 'bg-[#f4ece1]'}`}
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
                    <BookOpen className="w-24 h-24 text-[#8b5a2b]" />
                  </div>
                  <h2 className="text-5xl font-serif tracking-[0.6em] text-[#4a3b2c] uppercase mb-6 drop-shadow-sm">
                    {t('transition.descending')}: {targetWorld.name[language]}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="h-px w-20 bg-[#cbb387]" />
                    <p className="text-[#8b5a2b] font-serif font-bold text-xs tracking-[0.5em] uppercase animate-pulse">
                      {t('transition.syncing')}
                    </p>
                    <div className="h-px w-20 bg-[#cbb387]" />
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
                      className="absolute w-64 h-64 bg-black/5 rounded-full blur-3xl"
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative flex flex-col items-center z-10"
                >
                  <div className="w-72 h-72 border-4 border-double border-black/20 flex items-center justify-center mb-16 relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-10px] border border-black/10 border-dashed rounded-full"
                    />
                    <PenTool className="w-20 h-20 text-black/60" />
                  </div>
                  
                  <h2 className="text-5xl font-serif tracking-[0.5em] text-black uppercase mb-8">
                    {t('transition.tracing')}: {targetWorld.name[language]}
                  </h2>
                  
                  <div className="flex items-center gap-8">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      className="h-px bg-black/20" 
                    />
                    <p className="text-black/40 font-serif italic text-sm tracking-widest animate-pulse">
                      {t('transition.inking')}
                    </p>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      className="h-px bg-black/20" 
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
            className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${viewMode === '3D' ? 'bg-[#f4ece1]' : 'bg-[#f4ece1]'}`}
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
                  <BookOpen className="w-16 h-16 text-[#8b5a2b]/60" />
                </div>
                <h2 className="text-4xl font-serif tracking-[0.6em] text-[#6b5a45] uppercase mb-4">
                  {t('transition.disconnecting')}{targetWorld.name[language]}
                </h2>
                <p className="text-[#a39481] font-serif font-bold text-[10px] tracking-[0.4em] uppercase animate-pulse">
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
                <div className="w-64 h-64 border border-black/10 flex items-center justify-center mb-12 relative">
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-5px] border border-black/5 border-dashed rounded-full"
                  />
                  <PenTool className="w-16 h-16 text-black/20" />
                </div>
                <h2 className="text-4xl font-serif tracking-[0.4em] text-black/60 uppercase mb-6">
                  {t('transition.closing')}{targetWorld.name[language]}
                </h2>
                <p className="text-black/30 font-serif italic text-sm tracking-widest animate-pulse">
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
            className={`fixed inset-0 z-50 flex transition-colors duration-700 ${viewMode === '3D' ? 'bg-[#fcf8f2]' : 'bg-[#f4ece1]'}`}
          >
            {/* Sidebar - Main Storyline Timeline */}
            <div className={`w-96 border-r flex flex-col transition-colors duration-700 ${viewMode === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd]' : 'bg-[#e8dfd1] border-black/10'}`}>
              <div className={`p-12 border-b transition-colors duration-700 ${viewMode === '3D' ? 'border-[#d3cbbd]' : 'border-black/10'}`}>
                <button 
                  onClick={handleExitWorld}
                  className={`flex items-center gap-4 transition-all mb-12 group ${viewMode === '3D' ? 'text-[#a39481] hover:text-[#4a3b2c]' : 'text-black/40 hover:text-black'}`}
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  <span className="text-xs font-serif font-bold tracking-[0.4em] uppercase">
                    {viewMode === '3D' ? t('reader.back3D') : t('reader.back2D')}
                  </span>
                </button>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-2 h-2 rounded-full ${viewMode === '3D' ? 'bg-[#8b5a2b]' : 'bg-black'}`} />
                    <span className={`text-[10px] font-serif font-bold tracking-[0.5em] uppercase ${viewMode === '3D' ? 'text-[#8b5a2b]' : 'text-black/60'}`}>
                      {viewMode === '3D' ? t('reader.activeSector') : t('reader.currentManuscript')}
                    </span>
                  </div>
                  <h2 className={`text-4xl font-bold font-serif tracking-widest uppercase leading-tight transition-colors duration-700 ${viewMode === '3D' ? 'text-[#4a3b2c]' : 'text-black'}`}>
                    {selectedWorld.name[language]}
                  </h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className={`absolute left-4 top-0 bottom-0 w-px ${viewMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/5'}`} />
                  
                  <div className="space-y-16 relative">
                    {selectedWorld.chapters.map((chapter, index) => {
                      const maxUnlocked = unlockedProgress[selectedWorld.id] || 0;
                      const isUnlocked = index <= maxUnlocked;
                      const isActive = activeChapter.id === chapter.id;
                      const isCompleted = index < maxUnlocked;

                      return (
                        <div 
                          key={chapter.id}
                          className={`relative flex gap-10 group ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'}`}
                          onClick={() => handleChapterClick(chapter, index)}
                        >
                          {/* Timeline Node */}
                          <div className="relative z-10 mt-2">
                            {isCompleted ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${viewMode === '3D' ? 'bg-[#8b5a2b] shadow-[0_2px_10px_rgba(139,90,43,0.3)]' : 'bg-black shadow-lg'}`}>
                                <CheckCircle2 className={`w-5 h-5 ${viewMode === '3D' ? 'text-[#fcf8f2]' : 'text-white'}`} />
                              </div>
                            ) : isActive ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${viewMode === '3D' ? 'bg-[#fcf8f2] border-2 border-[#8b5a2b] shadow-[0_2px_10px_rgba(139,90,43,0.3)]' : 'bg-black/10 border-2 border-black shadow-inner'}`}>
                                <div className={`w-3 h-3 rounded-full animate-pulse ${viewMode === '3D' ? 'bg-[#8b5a2b]' : 'bg-black'}`} />
                              </div>
                            ) : isUnlocked ? (
                              <div className={`w-8 h-8 rounded-full border-2 transition-all ${viewMode === '3D' ? 'border-[#cbb387] bg-transparent group-hover:border-[#8b5a2b]/50' : 'border-black/20 bg-transparent group-hover:border-black'}`} />
                            ) : (
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${viewMode === '3D' ? 'border-[#d3cbbd] bg-transparent' : 'border-black/5 bg-transparent'}`}>
                                <Lock className={`w-4 h-4 ${viewMode === '3D' ? 'text-[#8b5a2b]/30' : 'text-black/10'}`} />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-3">
                            <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isActive ? (viewMode === '3D' ? 'text-[#8b5a2b]' : 'text-black') : (viewMode === '3D' ? 'text-[#8b7965]/50' : 'text-black/20')}`}>
                              {t('reader.unit')} {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className={`text-xl font-serif tracking-widest uppercase transition-all ${isActive ? (viewMode === '3D' ? 'text-[#4a3b2c] font-bold' : 'text-black font-bold') : isUnlocked ? (viewMode === '3D' ? 'text-[#6b5a45] group-hover:text-[#4a3b2c]' : 'text-black/50 group-hover:text-black') : (viewMode === '3D' ? 'text-[#d3cbbd]' : 'text-black/10')}`}>
                              {isUnlocked ? chapter.title[language] : t('reader.encrypted')}
                            </h3>
                            {isUnlocked && (
                              <div className="flex items-center gap-4 opacity-50">
                                <div className={`h-px w-6 ${viewMode === '3D' ? 'bg-[#cbb387]' : 'bg-black'}`} />
                                <span className={`text-[10px] font-mono uppercase tracking-widest ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-black'}`}>
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
              <div className={`relative z-10 px-20 py-10 border-b flex items-center justify-between backdrop-blur-2xl transition-colors duration-700 ${viewMode === '3D' ? 'bg-[#fcf8f2]/80 border-[#d3cbbd]' : 'bg-white/40 border-black/5'}`}>
                <div className="flex items-center gap-8">
                  <div className={`p-3 border transition-colors ${viewMode === '3D' ? 'bg-[#fdfaf5] border-[#d3cbbd]' : 'bg-black/5 border-black/10'}`}>
                    {viewMode === '3D' ? <BookOpen className="w-5 h-5 text-[#8b5a2b]" /> : <PenTool className="w-5 h-5 text-black" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-mono tracking-[0.6em] uppercase ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-black/40'}`}>
                      {viewMode === '3D' ? t('reader.protocolActive') : t('reader.reviewProgress')}
                    </span>
                    <span className={`text-sm font-serif tracking-[0.2em] uppercase mt-1 ${viewMode === '3D' ? 'text-[#4a3b2c]' : 'text-black/80'}`}>{activeChapter.title[language]}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-12 text-[10px] font-mono tracking-[0.3em] uppercase ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-black/30'}`}>
                  <div className="flex items-center gap-3">
                    {viewMode === '3D' ? (
                      <div className="w-2 h-2 bg-[#8b5a2b] rounded-full animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    )}
                    <span>{viewMode === '3D' ? t('reader.syncStable') : t('reader.inkFlowing')}</span>
                  </div>
                  <div className={`w-px h-4 ${viewMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/10'}`} />
                  <span>{t('reader.payload')}: {activeChapter.wordCount} Bits</span>
                </div>
              </div>

              {/* Content Container */}
              <div 
                ref={contentRef}
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
                      <h1 className={`text-7xl font-serif font-bold tracking-[0.3em] leading-tight text-center uppercase transition-colors duration-700 ${viewMode === '3D' ? 'text-[#4a3b2c]' : 'text-black'}`}>
                        {activeChapter.title[language]}
                      </h1>
                      <div className={`h-px w-32 mt-16 ${viewMode === '3D' ? 'bg-gradient-to-r from-transparent via-[#cbb387] to-transparent' : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'}`} />
                    </div>
                    
                    <div className={`novel-content text-2xl leading-[2.4] font-serif tracking-wider space-y-16 transition-colors duration-700 ${viewMode === '3D' ? 'text-[#4a3b2c]' : 'text-black/80'}`}>
                      {activeChapter.content[language].split('\n').map((para, i) => (
                        <p key={i} className={`first-letter:text-5xl first-letter:mr-2 first-letter:font-bold ${viewMode === '3D' ? 'first-letter:text-[#8b5a2b]' : 'first-letter:text-black/60'}`}>{para}</p>
                      ))}
                    </div>

                    {/* Chapter End / Navigation */}
                    <div className={`mt-64 pt-32 border-t flex flex-col items-center text-center transition-colors duration-700 ${viewMode === '3D' ? 'border-[#d3cbbd]' : 'border-black/10'}`}>
                      {(() => {
                        const currentIndex = selectedWorld.chapters.findIndex(c => c.id === activeChapter.id);
                        const isLastChapter = currentIndex === selectedWorld.chapters.length - 1;
                        const maxUnlocked = unlockedProgress[selectedWorld.id] || 0;
                        const isNextUnlocked = currentIndex < maxUnlocked;

                        if (isLastChapter) {
                          return (
                            <div className="flex flex-col items-center gap-10">
                              <div className={`w-24 h-px mb-8 ${viewMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/20'}`} />
                              <span className={`text-2xl font-serif tracking-[1em] uppercase ${viewMode === '3D' ? 'text-[#8b7965]' : 'text-black/40'}`}>{t('reader.end')}</span>
                              <p className={`text-xs font-mono tracking-[0.6em] uppercase mt-8 ${viewMode === '3D' ? 'text-[#6b5a45]/50' : 'text-black/10'}`}>{t('reader.awaiting')}</p>
                            </div>
                          );
                        }
 
                        if (isNextUnlocked) {
                          return (
                            <button
                              onClick={goToNextChapter}
                              className={`group relative px-24 py-8 text-sm font-bold tracking-[0.8em] uppercase overflow-hidden transition-all duration-700 ${viewMode === '3D' ? 'bg-[#8b5a2b] text-[#fcf8f2] hover:bg-[#6b451f] shadow-lg hover:shadow-xl' : 'bg-black text-white hover:bg-black/80 shadow-2xl'}`}
                            >
                              <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${viewMode === '3D' ? 'bg-[#fcf8f2]/20' : 'bg-white/10'}`} />
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
                              <ChevronDown className={`w-10 h-10 ${viewMode === '3D' ? 'text-[#8b5a2b]' : 'text-black'}`} />
                              <span className={`text-xs font-mono tracking-[0.6em] uppercase ${viewMode === '3D' ? 'text-[#4a3b2c]' : 'text-black'}`}>
                                {viewMode === '3D' ? t('reader.sync3D') : t('reader.sync2D')}
                              </span>
                            </motion.div>
                            <motion.div 
                              className={`h-2 w-2 rounded-full ${viewMode === '3D' ? 'bg-[#cbb387]' : 'bg-black/60'}`}
                              onViewportEnter={() => {
                                if (currentIndex === maxUnlocked) {
                                  setUnlockedProgress(prev => ({ ...prev, [selectedWorld.id]: maxUnlocked + 1 }));
                                }
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
