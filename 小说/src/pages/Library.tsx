import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { IslandMarker } from '../components/IslandMarker';
import { CompassRose } from '../components/CompassRose';
import { GlobalHeader } from '../components/GlobalHeader';

type Language = 'zh' | 'en' | 'ja';

interface IslandData {
  id: string;
  title: Record<Language, string>;
  subtitle?: string;
  position: { top: string; left: string };
  size: 'main' | 'locked';
  locked: boolean;
  onClick?: () => void;
  hoverContent: Record<Language, string>;
}

export const Library: React.FC = () => {
  const navigate = useNavigate();
  const { lang: language } = useTheme();
  const l = language as Language;

  const islands: IslandData[] = [
    {
      id: 'chumo',
      title: { zh: '初墨卷', en: 'THE FIRST INK', ja: '初墨の巻' },
      subtitle: 'VOLUME I',
      position: { top: '70%', left: '18%' },
      size: 'main',
      locked: false,
      onClick: () => navigate('/worlds/chumo'),
      hoverContent: {
        zh: '4 封残信 · 3 章连载中',
        en: '4 Letters · 3 Chapters ongoing',
        ja: '4 通の残簡 · 3 章連載中',
      },
    },
    {
      id: 'volume-2',
      title: { zh: '待启之卷 · 二', en: 'VOLUME II · SEALED', ja: '待啓の巻 · 二' },
      position: { top: '58%', left: '46%' },
      size: 'locked',
      locked: true,
      hoverContent: { zh: '待启 · 敬请期待', en: 'Sealed · Coming soon', ja: '封緘中 · 近日公開' },
    },
    {
      id: 'volume-3',
      title: { zh: '待启之卷 · 三', en: 'VOLUME III · SEALED', ja: '待啓の巻 · 三' },
      position: { top: '36%', left: '62%' },
      size: 'locked',
      locked: true,
      hoverContent: { zh: '待启 · 敬请期待', en: 'Sealed · Coming soon', ja: '封緘中 · 近日公開' },
    },
    {
      id: 'volume-4',
      title: { zh: '待启之卷 · 四', en: 'VOLUME IV · SEALED', ja: '待啓の巻 · 四' },
      position: { top: '18%', left: '80%' },
      size: 'locked',
      locked: true,
      hoverContent: { zh: '待启 · 敬请期待', en: 'Sealed · Coming soon', ja: '封緘中 · 近日公開' },
    },
  ];

  const terraIncognita = {
    zh: '未知之地',
    en: 'TERRA INCOGNITA',
    ja: '未知の地'
  };

  const volumeLabel = {
    zh: 'VOLUME I · 初墨卷',
    en: 'VOLUME I · THE FIRST INK',
    ja: 'VOLUME I · 初墨の巻'
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center relative overflow-x-hidden md:overflow-hidden">
      <GlobalHeader />
      
      {/* Map Content - Desktop Overlay */}
      <div className="hidden md:block w-full max-w-[1200px] h-[100vh] mx-auto relative">
        
        {/* VOLUME TOP LABEL */}
        <div 
          className="absolute top-[6%] left-0 w-full text-center pointer-events-none z-10"
          style={{ fontFamily: 'var(--font-display)', fontSize: '14px', letterSpacing: '0.3em', color: 'var(--brass)', textTransform: 'uppercase' }}
        >
          {volumeLabel[l]}
        </div>

        {/* TERRA INCOGNITA */}
        <div 
          className="absolute top-[8%] left-[8%] pointer-events-none opacity-40 select-none z-10"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '16px', 
            letterSpacing: '0.2em', 
            color: 'var(--brass)', 
            transform: 'rotate(-8deg)' 
          }}
        >
          {terraIncognita[l]}
        </div>

        {/* COMPASS ROSE */}
        <CompassRose />

        {/* SEA MAP SVG LAYER (Routes) */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]"
        >
          {/* Path 1: Chumo -> Vol 2 */}
          <path 
            d="M 18,70 Q 35,68 46,58" 
            fill="none" 
            stroke="var(--brass)" 
            strokeWidth="0.5" 
            strokeDasharray="1 1.5" 
            opacity="0.35" 
          />
          {/* Path 2: Vol 2 -> Vol 3 */}
          <path 
            d="M 46,58 Q 55,50 62,36" 
            fill="none" 
            stroke="var(--brass)" 
            strokeWidth="0.5" 
            strokeDasharray="1 1.5" 
            opacity="0.35" 
          />
          {/* Path 3: Vol 3 -> Vol 4 */}
          <path 
            d="M 62,36 Q 72,30 80,18" 
            fill="none" 
            stroke="var(--brass)" 
            strokeWidth="0.5" 
            strokeDasharray="1 1.5" 
            opacity="0.35" 
          />
        </svg>

        {/* ISLANDS */}
        {islands.map((island) => (
          <IslandMarker
            key={island.id}
            title={island.title[l]}
            subtitle={island.subtitle}
            position={island.position}
            size={island.size}
            locked={island.locked}
            onClick={island.onClick}
            hoverContent={island.hoverContent[l]}
          />
        ))}
      </div>

      {/* Mobile Layout Fallback */}
      <div className="md:hidden w-full px-6 pt-24 pb-32 flex flex-col gap-12 z-10">
        <div className="text-center mb-4">
          <p className="font-display text-[14px] tracking-[0.3em] text-[var(--brass)] uppercase">
            {volumeLabel[l]}
          </p>
        </div>

        {islands.map((island) => (
          <div 
            key={island.id} 
            className="flex items-center gap-6 p-4 border border-[var(--brass)]/10 bg-[var(--brass)]/5 rounded-sm"
            onClick={!island.locked ? island.onClick : undefined}
          >
            <div className={`
              flex-shrink-0 flex items-center justify-center rounded-full border border-dashed border-[var(--brass)]
              ${island.size === 'main' ? 'w-12 h-12' : 'w-10 h-10'}
            `}>
              {island.locked ? (
                <span className="text-[var(--brass)] opacity-50 font-sans text-[10px]">🔒</span>
              ) : (
                <span className="text-[var(--brass)] font-sans text-[12px]">🖋️</span>
              )}
            </div>
            <div className="flex-1">
              <div className="font-display text-sm tracking-wider text-[var(--ink)]">
                {island.title[l]}
              </div>
              <div className="font-body text-[11px] text-[var(--brass)] mt-1 opacity-80 italic">
                {island.hoverContent[l]}
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Compass */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-[60px] h-[60px]">
             {/* Simple mobile compass visualization */}
             <svg width="60" height="60" viewBox="0 0 120 120" className="animate-[spin_60s_linear_infinite]">
                <circle cx="60" cy="60" r="58" stroke="var(--brass)" strokeWidth="2" opacity="0.5" fill="none" />
                <path d="M60 10 L65 60 L60 65 L55 60 Z" fill="var(--brass)" />
                <path d="M60 110 L55 60 L60 55 L65 60 Z" fill="var(--brass)" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
