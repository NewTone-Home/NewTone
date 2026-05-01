import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS } from '../locales';
import { ScrambleText } from './ScrambleText';

interface IslandMarkerProps {
  id: string; // Used to determine volume number
  position: { top: string; left: string };
  width: number;
  height: number;
  zIndex?: number;
  locked: boolean;
  coordinates?: string;
  onClick?: () => void;
}

const ROMAN: Record<1|2|3|4, string> = { 1:'I', 2:'II', 3:'III', 4:'IV' };

function VolumeDiamondSVG({ volume, locked, sealedLabel }:
  { volume: 1|2|3|4; locked: boolean; sealedLabel: string }) {
  const isActive = !locked;

  // 24 scale ticks (active only)
  const ticks = [];
  if (isActive) {
    for (let i = 0; i < 24; i++) {
      const a = (i * 15) * Math.PI / 180;
      const r1 = 100;
      const r2 = i % 4 === 0 ? 108 : 104;
      const x1 = 120 + Math.sin(a) * r1, y1 = 120 - Math.cos(a) * r1;
      const x2 = 120 + Math.sin(a) * r2, y2 = 120 - Math.cos(a) * r2;
      ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="currentColor" strokeWidth="0.4" opacity="0.42" />);
    }
  }

  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%">
      {/* Outer glow diamond (active) */}
      {isActive && (
        <polygon points="120,12 228,120 120,228 12,120"
          fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.22" />
      )}

      {/* Orbit ring dashed (active) */}
      {isActive && (
        <circle cx="120" cy="120" r="118" fill="none"
          stroke="currentColor" strokeWidth="0.3" opacity="0.20"
          strokeDasharray="0.8 2.4" />
      )}

      {/* 24 ticks */}
      <g>{ticks}</g>

      {/* Main Diamond */}
      <polygon points="120,28 212,120 120,212 28,120"
        fill="none" stroke="currentColor"
        strokeWidth={isActive ? 1.4 : 0.9}
        strokeDasharray={isActive ? undefined : "4 5"}
        strokeLinejoin="miter"
        opacity={isActive ? 1 : 0.6} />

      {/* Inner Diamond */}
      <polygon points="120,72 168,120 120,168 72,120"
        fill="none" stroke="currentColor" strokeWidth="0.5"
        opacity={isActive ? 0.45 : 0.28} />

      {/* Inner sub-grid (active) */}
      {isActive && (
        <g stroke="currentColor" strokeWidth="0.3" opacity="0.22" fill="none">
          <line x1="84"  y1="120" x2="156" y2="120" />
          <line x1="120" y1="84"  x2="120" y2="156" />
          <line x1="100" y1="100" x2="140" y2="140" />
          <line x1="140" y1="100" x2="100" y2="140" />
        </g>
      )}

      {/* Center cross (active) */}
      {isActive && (
        <g stroke="currentColor" strokeWidth="0.4" opacity="0.30">
          <line x1="120" y1="92"  x2="120" y2="148" />
          <line x1="92"  y1="120" x2="148" y2="120" />
        </g>
      )}

      {/* 4 vertex ticks (active) */}
      {isActive && (
        <g stroke="currentColor" strokeWidth="0.8" opacity="0.6">
          <line x1="120" y1="22"  x2="120" y2="14"  />
          <line x1="218" y1="120" x2="226" y2="120" />
          <line x1="120" y1="218" x2="120" y2="226" />
          <line x1="22"  y1="120" x2="14"  y2="120" />
        </g>
      )}

      {/* 4 satellite dots (active) */}
      {isActive && (
        <g fill="currentColor" opacity="0.55">
          <circle cx="120" cy="60"  r="1.6" />
          <circle cx="180" cy="120" r="1.6" />
          <circle cx="120" cy="180" r="1.6" />
          <circle cx="60"  cy="120" r="1.6" />
        </g>
      )}

      {/* 4 corner L shapes (at outer diamond vertices) */}
      <g stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.55">
        <path d="M 114 32 L 120 26 L 126 32" />
        <path d="M 208 114 L 214 120 L 208 126" />
        <path d="M 126 208 L 120 214 L 114 208" />
        <path d="M 32 126 L 26 120 L 32 114" />
      </g>

      {/* Center Roman Numeral */}
      <text x="120" y="132" textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="38" fontWeight="300"
        fill="currentColor" opacity={isActive ? 0.95 : 0.5}
        letterSpacing="2">
        {ROMAN[volume as 1|2|3|4]}
      </text>

      {/* SEALED label (locked) */}
      {locked && (
        <text x="120" y="178" textAnchor="middle"
          fontFamily="JetBrains Mono, monospace" fontSize="8"
          fill="currentColor" opacity="0.5" letterSpacing="3">
          {sealedLabel}
        </text>
      )}
    </svg>
  );
}

export const IslandMarker: React.FC<IslandMarkerProps> = ({
  id,
  position,
  width,
  zIndex,
  locked,
  coordinates,
  onClick,
}) => {
  const { lang } = useLang();
  
  const volumeMap: Record<string, 1|2|3|4> = {
    'chumo': 1,
    'volume-2': 2,
    'volume-3': 3,
    'volume-4': 4
  };
  const volume = volumeMap[id] || 1;

  const getT = (key: string, params?: Record<string, string>) => {
    let text = UI_TRANSLATIONS[lang][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{{${k}}}`, v);
      });
    }
    return text;
  };

  const annotation = volume === 1 
    ? getT('library.enterVolume', { n: 'I' })
    : getT('library.notYetInscribed');

  const volTitle = getT(`library.volume.label.${volume}`);

  return (
    <div
      data-volume={volume}
      data-locked={locked}
      style={{
        top: position.top,
        left: position.left,
        zIndex: zIndex ?? (10 - volume),
        '--plate-size': `${width}px`
      } as React.CSSProperties}
      className="plate-wrap group pointer-events-auto"
    >
      <div className="plate-enter-shift">
        <div className="plate-float relative flex flex-col items-center justify-center">
          
          <div 
            className="plate-annotation" 
            data-volume={volume} 
            data-active={volume === 1} 
            data-locked={locked}
          >
            <ScrambleText text={annotation} />
          </div>

          <motion.div
            className="volume-plate transition-opacity duration-500"
            style={{ 
              width: '100%', 
              height: '100%',
            }}
            whileHover={{ 
              y: locked ? -3 : -6,
              transition: { duration: 0.4 }
            }}
            onClick={!locked ? onClick : undefined}
          >
            <VolumeDiamondSVG 
              volume={volume as 1|2|3|4} 
              locked={locked} 
              sealedLabel={getT('library.sealed')} 
            />
          </motion.div>

          <div className="volume-label">
            <div className="tracking-[0.1em]">
               <ScrambleText text={volTitle} />
            </div>
            
            {coordinates && (
              <div className="volume-coord">
                 <ScrambleText text={coordinates} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

