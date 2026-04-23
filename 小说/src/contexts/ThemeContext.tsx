import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'day' | 'night';
type Lang = 'zh' | 'en' | 'ja';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  toggleLang: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('newtone-theme');
    return (saved as Theme) || 'day';
  });

  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('newtone-lang');
    return (saved as Lang) || 'zh';
  });

  useEffect(() => {
    localStorage.setItem('newtone-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('newtone-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'day' ? 'night' : 'day'));
  };

  const toggleLang = () => {
    setLang(prev => {
      if (prev === 'zh') return 'en';
      if (prev === 'en') return 'ja';
      return 'zh';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
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
