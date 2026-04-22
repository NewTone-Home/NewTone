import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-subtle)] text-[var(--ink-primary)] hover:bg-[var(--border-subtle)]/30 transition-colors bg-[var(--bg-secondary)] shadow-sm"
      aria-label="Toggle Theme"
    >
      {theme === 'day' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
