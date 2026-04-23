import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/ThemeContext';
import { GlobalHeader } from '../components/GlobalHeader';
import { SubscribeModal } from '../components/SubscribeModal';

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
    ja: '地図へ →',
  },
  ctaSecondary: {
    zh: '订阅更新',
    en: 'SUBSCRIBE',
    ja: '更新を受け取る',
  },
}

export const Landing = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lang } = useLang();

  return (
    <div className="min-h-screen relative bg-[var(--bg)] transition-colors duration-500 flex flex-col items-center justify-center overflow-hidden">
      <GlobalHeader />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* VOLUME I Label */}
        <div 
          className="landing-animate-fade-up"
          style={{ animationDelay: '0.0s' }}
        >
          <span className="font-display text-[14px] tracking-[0.3em] uppercase text-[var(--brass)]">
            {i18n.volumeLabel[lang]}
          </span>
        </div>

        {/* Brand Name */}
        <div 
          className="mt-4 landing-animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <h1 className="font-display text-[clamp(64px,12vw,140px)] leading-none tracking-[0.08em] font-normal text-[var(--ink)]">
            NEWTONE
          </h1>
        </div>

        {/* Tagline */}
        <div 
          className="mt-8 max-w-[600px] landing-animate-fade-up"
          style={{ animationDelay: '0.9s' }}
        >
          <p className="font-body text-[20px] italic text-[var(--ink)] opacity-75">
            {i18n.tagline[lang]}
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className="mt-12 flex items-center gap-6 landing-animate-fade-up"
          style={{ animationDelay: '1.3s' }}
        >
          <button
            onClick={() => navigate('/library')}
            className="px-8 py-[14px] border border-[var(--brass)] bg-transparent text-[var(--ink)] font-display text-[14px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[var(--brass)] hover:text-[var(--bg)] rounded-[2px]"
          >
            {i18n.ctaPrimary[lang]}
          </button>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-2 py-[14px] bg-transparent border-none border-b border-dashed border-[var(--brass)] text-[var(--brass)] font-display text-[14px] tracking-[0.2em] uppercase transition-all duration-300 hover:border-solid"
          >
            {i18n.ctaSecondary[lang]}
          </button>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30 flex gap-4 pointer-events-none">
        <span className="text-xl">✦</span>
        <span className="text-xl">✦</span>
        <span className="text-xl">✦</span>
      </div>

      {/* Subscription Modal */}
      <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
      `}</style>
    </div>
  );
};

export default Landing;
