import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const GlobalFooter = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isLibrary = location.pathname === '/library';
  const isWorldHub = location.pathname === '/worlds/chumo';
  const isReader = location.pathname.startsWith('/read');

  if (isLanding || isLibrary || isWorldHub) return null;

  return (
    <footer className="fixed bottom-4 left-0 right-0 z-10 flex justify-between items-center px-8 font-display text-[12px] text-[var(--brass)] pointer-events-none">
      {!isReader ? (
        <>
          <div className="flex items-center gap-1 font-label text-[16px]">
            <span className="not-italic">🧭</span>
            <span>25°13′N · 121°42′E</span>
          </div>
          <div className="flex-1 text-center font-display tracking-[0.2em] uppercase hidden sm:block">
            CARTOGRAPHER'S ARCHIVE · VOLUME I · 初墨卷
          </div>
          <div className="pointer-events-auto font-display italic">
            <Link 
              to="/library" 
              className="hover:text-[var(--seal-red)] transition-colors group"
            >
              <span className="mr-2">→</span>
              <span className="border-b border-transparent group-hover:border-[var(--seal-red)]">← RETURN TO ATLAS</span>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full text-center font-display tracking-[0.2em] uppercase">
          CARTOGRAPHER'S ARCHIVE · VOLUME I · 初墨卷
        </div>
      )}
    </footer>
  );
};
