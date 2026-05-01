import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IslandMarker } from '../components/IslandMarker';
import { GlobalHeader } from '../components/GlobalHeader';
import { useLang } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS } from '../locales';
import { ScrambleText } from '../components/ScrambleText';

function VoidPaperBg() {
  return (
    <>
      <div className="lib-void-paper-base" aria-hidden="true" />
      <svg className="lib-void-paper-noise"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600" aria-hidden="true">
        <defs>
          <filter id="lib-paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="7" />
            <feColorMatrix values="0 0 0 0 0.55
                                   0 0 0 0 0.60
                                   0 0 0 0 0.68
                                   0 0 0 0 0.05 0" />
          </filter>
          <filter id="lib-paper-fiber">
            <feTurbulence type="turbulence" baseFrequency="0.022 0.55" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0.72
                                   0 0 0 0 0.76
                                   0 0 0 0 0.82
                                   0 0 0 0.025 0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#lib-paper-grain)" />
        <rect width="100%" height="100%" filter="url(#lib-paper-fiber)" />
      </svg>
      <div className="lib-void-paper-vignette" aria-hidden="true" />
    </>
  );
}

function LightFieldBg() {
  return (
    <svg className="lib-light-bg" preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1600 1000">
      <defs>
        <radialGradient id="lib-orb-cool" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#E6ECEE" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E6ECEE" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lib-orb-warm" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#FFF6E2" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#F4E4C0" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#F4E4C0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lib-horizon" x1="0%" y1="40%" x2="0%" y2="60%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%"  stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Horizontal highlight band simulating soft horizon */}
      <rect x="0" y="380" width="1600" height="240" fill="url(#lib-horizon)" />

      {/* 4 Soft orbs (warm + cool dispersed on edges) */}
      <circle cx="220"  cy="180" r="360" fill="url(#lib-orb-warm)" />
      <circle cx="1380" cy="280" r="320" fill="url(#lib-orb-cool)" />
      <circle cx="380"  cy="860" r="380" fill="url(#lib-orb-cool)" />
      <circle cx="1280" cy="820" r="300" fill="url(#lib-orb-warm)" />

      {/* 5 organic contour lines */}
      <g fill="none" stroke="#9AA5B0" strokeWidth="0.6" opacity="0.18">
        <path d="M -50 580 Q 360 520 800 560 T 1660 520" />
        <path d="M -50 640 Q 340 580 800 620 T 1660 580" />
        <path d="M -50 700 Q 320 640 800 680 T 1660 640" />
        <path d="M -50 760 Q 300 700 800 740 T 1660 700" />
        <path d="M -50 820 Q 280 760 800 800 T 1660 760" />
      </g>

      {/* Sparse texture rounds (better than heavy grid) */}
      <g fill="#9AA5B0" opacity="0.15">
        <circle cx="120"  cy="120" r="1.2" />
        <circle cx="380"  cy="240" r="0.9" />
        <circle cx="640"  cy="180" r="1.1" />
        <circle cx="940"  cy="260" r="0.8" />
        <circle cx="1240" cy="160" r="1.0" />
        <circle cx="180"  cy="460" r="0.9" />
        <circle cx="500"  cy="420" r="1.1" />
        <circle cx="780"  cy="380" r="0.8" />
        <circle cx="1080" cy="440" r="1.0" />
        <circle cx="1380" cy="500" r="0.9" />
        <circle cx="240"  cy="720" r="1.0" />
        <circle cx="540"  cy="680" r="0.8" />
        <circle cx="900"  cy="740" r="1.1" />
        <circle cx="1180" cy="700" r="0.9" />
        <circle cx="1440" cy="780" r="1.0" />
      </g>
    </svg>
  );
}

function InkTrailRealtime() {
  const lineRefs = useRef<(SVGLineElement | null)[]>([null, null, null]);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setEntered(true), reduced ? 0 : 1700); // Wait for plate animation shift to end
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    let stopped = false;
    const tick = () => {
      if (stopped) return;
      const wraps = document.querySelectorAll<HTMLElement>('.plate-wrap');
      if (wraps.length >= 4) {
        // Collect coordinates of centers
        const c = Array.from(wraps)
          .sort((a, b) => Number(a.dataset.volume) - Number(b.dataset.volume))
          .slice(0, 4)
          .map(el => {
            const r = el.getBoundingClientRect();
            // We use fixed positioning SVG, so getBoundingClientRect coordinates are perfect
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          });
        
        if (c.length >= 4) {
          for (let i = 0; i < 3; i++) {
            const line = lineRefs.current[i];
            if (!line) continue;
            line.setAttribute('x1', String(c[i].x));
            line.setAttribute('y1', String(c[i].y));
            line.setAttribute('x2', String(c[i + 1].x));
            line.setAttribute('y2', String(c[i + 1].y));
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { stopped = true; if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <svg className="ink-trail-rt"
      style={{
        position: 'fixed', 
        inset: 0,
        width: '100vw', 
        height: '100vh',
        pointerEvents: 'none', 
        zIndex: 1,
        opacity: entered ? 1 : 0,
        transition: 'opacity 700ms ease',
      }}
    >
      {[0, 1, 2].map(i => (
        <line key={i}
          ref={el => { lineRefs.current[i] = el; }}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.5" />
      ))}
    </svg>
  );
}

export const Library: React.FC = () => {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const { lang } = useLang();

  const getT = (key: string) => UI_TRANSLATIONS[lang][key] || key;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setEntered(true);
      return;
    }
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Mouse Parallax Logic
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const wraps = document.querySelectorAll('.plate-wrap');
    const COEFFS: Record<number, number> = { 1: 8, 2: 14, 3: 20, 4: 28 };
    let raf = 0;
    let nextX = 0, nextY = 0;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      nextX = (e.clientX - cx) / cx;
      nextY = (e.clientY - cy) / cy;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const apply = () => {
      raf = 0;
      wraps.forEach(el => {
        const v = Number((el as HTMLElement).dataset.volume || '1');
        const k = COEFFS[v] ?? 10;
        (el as HTMLElement).style.setProperty('--px', `${-nextX * k}px`);
        (el as HTMLElement).style.setProperty('--py', `${-nextY * k}px`);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const islands = [
    {
      id: 'chumo',
      volume: 1 as const,
      left: '17%',
      top: '50%',
      size: 200,
      z: 4,
      locked: false,
      coords: "35.2500° N / 122.7167° E",
      onClick: () => navigate('/worlds/chumo'),
    },
    {
      id: 'volume-2',
      volume: 2 as const,
      left: '40%',
      top: '48%',
      size: 180,
      z: 3,
      locked: true,
      coords: "33.3333° S / 110.0333° W",
    },
    {
      id: 'volume-3',
      volume: 3 as const,
      left: '62%',
      top: '52%',
      size: 160,
      z: 2,
      locked: true,
      coords: "12.7833° N / 88.5167° E",
    },
    {
      id: 'volume-4',
      volume: 4 as const,
      left: '83%',
      top: '49%',
      size: 140,
      z: 1,
      locked: true,
      coords: "48.1000° N / 16.3667° E",
    },
  ];

  const STATUS_TEXTS = [
    { id: 's1', text: getT('library.status.indexing'), top: '14%', left: '4%', opacity: 0.55, fontSize: 10 },
    { id: 's2', text: getT('library.status.volumeIActive'), top: '74%', left: '40%', opacity: 0.40, fontSize: 10 },
    { id: 's3', text: getT('library.status.trace'), top: '32%', left: '46%', opacity: 0.35, fontSize: 9 },
    { id: 's4', text: getT('library.status.sealedRange'), top: '18%', right: '5%', opacity: 0.45, fontSize: 10 },
    { id: 's5', text: getT('library.status.lastWrite'), bottom: '14%', left: '6%', opacity: 0.50, fontSize: 10 },
  ];

  return (
    <div 
      className={`min-h-screen flex flex-col items-center relative overflow-hidden library-page ${!entered ? 'library-enter' : ''}`}
    >
      <div className="lib-void-base" />
      <div className="lib-bg-layer lib-bg-light" aria-hidden="true" />
      <VoidPaperBg />
      <LightFieldBg />

      {/* Global Header Toggle */}
      <div className="lib-toggle-topright z-50">
        <GlobalHeader />
      </div>

      {/* Status Texts Layer */}
      <div className="lib-marginalia-layer" aria-hidden="true">
        {STATUS_TEXTS.map(s => (
          <div
            key={s.id}
            className="lib-marginalia"
            style={{
              top: s.top,
              left: s.left,
              right: (s as any).right,
              bottom: (s as any).bottom,
              fontSize: `${s.fontSize}px`,
              '--mg-op': s.opacity
            } as React.CSSProperties}
          >
            <ScrambleText text={s.text} />
          </div>
        ))}
      </div>

      {/* Map Content Container */}
      <div className="relative w-full flex-1 flex items-center justify-center z-10">
        <header className="lib-title">
          <p className="lib-title-en"><ScrambleText text={getT('library.title.en')} /></p>
          <p className="lib-title-cn"><ScrambleText text={getT('library.title.cn')} /></p>
        </header>

        <div className="lib-unknown-land">
          <div className="lib-unknown-land-title"><ScrambleText text={getT('library.unchartedTitle')} /></div>
          <div className="lib-unknown-land-note"><ScrambleText text={getT('library.unchartedNote')} /> · <ScrambleText text="此处尚无记载" /></div>
        </div>

        <div className="lib-compass-bottom">
          <div className="lib-coord-line"><ScrambleText text="35.2500° N" /></div>
          <div className="lib-coord-line"><ScrambleText text="122.7167° E" /></div>
          <div className="lib-coord-note"><ScrambleText text={getT('library.originPoint')} /></div>
        </div>

        {/* REALTIME INK TRAIL LAYER */}
        <InkTrailRealtime />

        {/* ISLANDS */}
        {islands.map((island) => (
          <IslandMarker
            key={island.id}
            id={island.id}
            position={{ top: island.top, left: island.left }}
            width={island.size}
            height={island.size}
            zIndex={island.z}
            locked={island.locked}
            coordinates={island.coords}
            onClick={island.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
