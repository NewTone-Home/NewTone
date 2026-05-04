import React from 'react';
import { useLang } from '../contexts/ThemeContext';
import { GlobalHeader } from '../components/GlobalHeader';
import { ScrambleText } from '../components/ScrambleText';
import { useTransition } from '../App';

const i18n = {
  volumeLabel: {
    zh: 'VOLUME I · 初墨卷',
    en: 'VOLUME I · THE FIRST INK',
    ja: 'VOLUME I · 初墨の巻',
  },
  tagline: {
    zh: '「各执己理，孰为真相。」',
    en: '"Each holds their reason; where lies the truth?"',
    ja: '「各々己が理を執り、いづれか真ならん。」',
  },
  ctaPrimary: {
    zh: '进入地图 →',
    en: 'ENTER THE ATLAS →',
    ja: '地图へ →',
  },
  loading: {
    zh: '翻阅卷宗中',
    en: 'Reading Dossier',
    ja: '巻物を閲覧中',
  },
}

export const Landing = () => {
  const { triggerTransition } = useTransition();
  const { lang } = useLang();

  return (
    <div className="home-page min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <GlobalHeader />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* VOLUME I Label */}
        <div 
          className="landing-animate-fade-up"
          style={{ animationDelay: '0.0s' }}
        >
          <ScrambleText 
            className="volume-tag font-display text-[14px] tracking-[0.3em] uppercase" 
            text={i18n.volumeLabel[lang]} 
          />
        </div>

        {/* Brand Name */}
        <div 
          className="mt-4 landing-animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <h1 className="newtone-title font-display text-[clamp(64px,12vw,140px)] leading-none tracking-[0.08em] font-normal">
            <ScrambleText text="NEWTONE" />
          </h1>
        </div>

        {/* Tagline */}
        <div 
          className="mt-8 max-w-[600px] landing-animate-fade-up"
          style={{ animationDelay: '0.9s' }}
        >
          <p className="tagline font-body text-[20px] italic">
            <ScrambleText text={i18n.tagline[lang]} />
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className="mt-12 flex items-center justify-center landing-animate-fade-up"
          style={{ animationDelay: '1.3s' }}
        >
          <button
            onClick={() => triggerTransition('/library')}
            className="btn-enter px-8 py-[14px] font-display text-[14px] tracking-[0.2em] uppercase rounded-[2px]"
          >
            <ScrambleText text={i18n.ctaPrimary[lang]} />
          </button>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="dots-bottom absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30 flex gap-4 pointer-events-none">
        <span className="text-xl">◆</span>
        <span className="text-xl">◆</span>
        <span className="text-xl">◆</span>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .landing-animate-fade-up {
          opacity: 0;
          animation: fadeUp 1.0s forwards;
        }
        /* Override specific animation durations as per request */
        .landing-animate-fade-up:nth-child(3) {
          animation-duration: 0.8s;
        }
        .landing-animate-fade-up:nth-child(4) {
          animation-duration: 0.6s;
        }

        .home-page .btn-enter {
          border: 1px solid var(--ink, #2E2418) !important;
          background: transparent !important;
          color: var(--ink, #2E2418) !important;
          position: relative !important;
          overflow: hidden !important;
          z-index: 0;
          transition: color 350ms ease, transform 250ms ease, box-shadow 300ms ease, letter-spacing 300ms ease !important;
        }
        .home-page .btn-enter::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--ink, #2E2418);
          transform: translateY(101%);
          transition: transform 450ms cubic-bezier(0.65, 0, 0.35, 1);
          z-index: -1;
        }
        .home-page .btn-enter:hover {
          color: var(--bg, #EDE2C4) !important;
          letter-spacing: 0.28em !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(46, 36, 24, 0.18);
        }
        .home-page .btn-enter:hover::before {
          transform: translateY(0);
        }
        .home-page .btn-enter:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(46, 36, 24, 0.14);
        }
      `}</style>
    </div>
  );
};

export default Landing;
