import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';

export const GlobalHeader = () => {
  return (
    <header className="absolute top-5 right-6 z-50 flex items-center gap-3">
      <ThemeToggle />
      <LangToggle />
    </header>
  );
};
