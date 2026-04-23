import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const LangToggle = () => {
  const { lang, toggleLang } = useTheme();

  const getLangChar = () => {
    if (lang === 'zh') return '中';
    if (lang === 'en') return 'EN';
    return '日';
  };

  const currentLangName = {
    zh: '中文',
    en: 'English',
    ja: '日本語'
  }[lang];

  return (
    <button
      onClick={toggleLang}
      className="font-display text-[16px] text-[var(--ink)] cursor-pointer hover:border-b hover:border-[var(--ink)] transition-colors p-1"
      aria-label={`切换语言（当前：${currentLangName}）`}
    >
      {getLangChar()}
    </button>
  );
};
