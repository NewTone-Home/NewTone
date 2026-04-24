import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'day' | 'night';
type Lang = 'zh' | 'en' | 'ja';
type FontSize = 'S' | 'M' | 'L';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('newtone-theme');
    return (saved as Theme) || 'day';
  });

  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('newtone-lang');
    return (saved as Lang) || 'zh';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem('newtone-font-size');
    return (saved as FontSize) || 'M';
  });

  useEffect(() => {
    localStorage.setItem('newtone-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('newtone-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('newtone-font-size', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'day' ? 'night' : 'day'));
  };

  const toggleLang = () => {
    setLangState(prev => {
      if (prev === 'zh') return 'en';
      if (prev === 'en') return 'ja';
      return 'zh';
    });
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeState, lang, toggleLang, setLang: setLangState, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useLang = () => {
  const { lang, toggleLang } = useTheme();
  return { lang, toggleLang };
};
