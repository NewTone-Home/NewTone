import React, { Suspense, useState, useCallback, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import WorldsChumo from './pages/WorldsChumo';
import Landing from './pages/Landing';
import LibraryPage from './pages/Library';
import { ThemeProvider, useLang } from './contexts/ThemeContext';
import DevResetButton from './components/DevResetButton';

type TransitionContextType = {
  triggerTransition: (toPath: string, label?: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

function MainApp() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [phase, setPhase] = useState<'idle' | 'show' | 'hide'>('idle');
  const [overlayLabel, setOverlayLabel] = useState<string>('翻阅卷宗中');

  const triggerTransition = useCallback((toPath: string, label?: string) => {
    setOverlayLabel(label ?? '翻阅卷宗中');
    setPhase('show');
    setTimeout(() => navigate(toPath), 600);
    setTimeout(() => setPhase('hide'), 2100);
    setTimeout(() => setPhase('idle'), 2700);
  }, [navigate]);

  const ctxValue: TransitionContextType = { triggerTransition };

  return (
    <TransitionContext.Provider value={ctxValue}>
      <div className="min-h-screen relative w-full overflow-hidden flex flex-col">
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[#F3E9D0] text-[#8B6F3E]">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/worlds/chumo" element={<WorldsChumo />} />
            <Route path="/read/:route/:chapter" element={<WorldsChumo />} />
            <Route path="/read/:route" element={<WorldsChumo />} />
            <Route path="*" element={<Navigate to="/library" replace />} />
          </Routes>
        </Suspense>
        {phase !== 'idle' && (
          <div
            className={'app-transition-overlay ' + (phase === 'show' ? 'is-show' : 'is-hide')}
            aria-hidden="true"
          >
            <div className="app-transition-corner tl" />
            <div className="app-transition-corner tr" />
            <div className="app-transition-corner bl" />
            <div className="app-transition-corner br" />
            <div className="app-transition-card">
              <div className="app-transition-ornament">
                <span>◆</span>
                <span className="app-transition-ornament-line" />
                <span>◇</span>
                <span className="app-transition-ornament-line" />
                <span>◆</span>
              </div>
              <div className="app-transition-text">
                {overlayLabel}
                <span className="app-transition-dot">.</span>
                <span className="app-transition-dot">.</span>
                <span className="app-transition-dot">.</span>
              </div>
              <div className="app-transition-rule" />
            </div>
          </div>
        )}
        <DevResetButton />
      </div>
    </TransitionContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
