import React, { useState, useEffect } from 'react';
import { PageToolPill } from './PageToolPill';

export type HeaderPhase = 'idle' | 'vanishing' | 'gone';

export const GlobalHeader = ({ isReading, hideSocial }: { isReading?: boolean, hideSocial?: boolean }) => {
  const [phase, setPhase] = useState<HeaderPhase>('idle');

  useEffect(() => {
    if (isReading) {
      setPhase('vanishing');
      const timer = setTimeout(() => setPhase('gone'), 800);
      return () => clearTimeout(timer);
    } else {
      setPhase('idle');
    }
  }, [isReading]);

  return (
    <header className="absolute top-5 right-6 z-50">
      <PageToolPill phase={phase} />
    </header>
  );
};
