import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Type, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS } from '../locales';
import { FontSize, Language } from '../types';

interface ReaderToolClusterProps {
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
}

export const ReaderToolCluster: React.FC<ReaderToolClusterProps> = ({ fontSize, setFontSize }) => {
  const { theme, setTheme, lang, setLang } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [activeOption, setActiveOption] = useState<'font' | 'theme' | 'lang' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => UI_TRANSLATIONS[lang]?.[key] || key;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setActiveOption(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!expanded) {
      setExpanded(true);
    }
  };

  const dots = [
    { id: 'top', className: 'top-[6px] left-1/2 -translate-x-1/2' },
    { id: 'left', className: 'bottom-[10px] left-[12px]' },
    { id: 'right', className: 'bottom-[10px] right-[12px]' },
  ];

  const icons = [
    { id: 'font', type: 'top', Icon: Type, pos: 'top-[6px] left-1/2 -translate-x-1/2' },
    { id: 'theme', type: 'left', Icon: theme === 'day' ? Sun : Moon, pos: 'bottom-[10px] left-[12px]' },
    { id: 'lang', type: 'right', label: lang.toUpperCase(), pos: 'bottom-[10px] right-[12px]' },
  ];

  const variants = {
    collapsed: { scale: 1, opacity: 1, rotate: 0 },
    expanded: { scale: 0, opacity: 0, rotate: 360 },
  };

  const iconVariants = {
    collapsed: { scale: 0, opacity: 0, rotate: -360 },
    expanded: { scale: 1, opacity: 1, rotate: 0 },
  };

  return (
    <div 
      className="relative w-[64px] h-[64px] flex items-center justify-center cursor-pointer select-none"
      ref={containerRef}
      onClick={toggleExpand}
    >
      {/* Collapsed Dots Cluster */}
      <AnimatePresence>
        {!expanded && (
          <motion.div
            className="absolute inset-0"
            initial="expanded"
            animate="collapsed"
            exit="expanded"
            variants={variants}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="w-full h-full relative"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              {dots.map(dot => (
                <span 
                  key={dot.id}
                  className={`absolute w-[6px] h-[6px] rounded-full bg-[var(--brass)] opacity-50 shadow-[0_0_8px_var(--brass)] transition-shadow duration-300 ${dot.className}`}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Icons Cluster */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute inset-0"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={iconVariants}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {icons.map(icon => (
              <motion.button
                key={icon.id}
                className={`absolute w-6 h-6 flex items-center justify-center text-[var(--brass)] hover:drop-shadow-[0_0_4px_var(--brass)] transition-all ${icon.pos}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveOption(activeOption === icon.id ? null : icon.id as any);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon.id === 'lang' ? (
                  <span className="text-[10px] font-bold border border-[var(--brass)] rounded-[2px] px-[2px] min-w-[18px] text-center">
                    {lang === 'zh' ? '中' : lang === 'ja' ? '日' : 'EN'}
                  </span>
                ) : (
                  <icon.Icon size={20} strokeWidth={1.5} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options */}
      <AnimatePresence>
        {expanded && activeOption === 'font' && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[-30px] left-1/2 -translate-x-1/2 flex gap-4 bg-[var(--bg)] border border-[var(--brass)] rounded-full px-4 py-1 shadow-xl z-50 whitespace-nowrap"
          >
            {(['small', 'medium', 'large'] as FontSize[]).map((size, idx) => (
              <motion.button 
                key={size}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setFontSize(size)}
                className={`text-xs p-1 relative ${fontSize === size ? 'text-[var(--brass)] font-bold' : 'text-[var(--ink)] opacity-60'}`}
              >
                {t(`fontSize.${size}`)}
                {fontSize === size && (
                  <motion.div layoutId="font-active" className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-[var(--brass)] rounded-full" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {expanded && activeOption === 'theme' && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[54px] left-[6px] flex flex-col gap-2 bg-[var(--bg)] border border-[var(--brass)] rounded-lg p-2 shadow-xl z-50"
          >
            {(['day', 'night'] as const).map((t_mode, idx) => (
              <motion.button 
                key={t_mode}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setTheme(t_mode)}
                className={`p-2 w-8 h-8 flex items-center justify-center transition-colors rounded-md relative ${theme === t_mode ? 'bg-[var(--brass)] bg-opacity-10 text-[var(--brass)]' : 'text-[var(--ink)]'}`}
              >
                {t_mode === 'day' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === t_mode && (
                  <motion.div layoutId="theme-active" className="absolute -bottom-1 w-4 h-[1.5px] bg-[var(--brass)] rounded-full" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {expanded && activeOption === 'lang' && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[54px] right-[6px] flex flex-col gap-2 bg-[var(--bg)] border border-[var(--brass)] rounded-lg p-2 shadow-xl z-50"
          >
            {(['zh', 'en', 'ja'] as Language[]).map((l, idx) => (
              <motion.button 
                key={l}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setLang(l)}
                className={`p-2 text-xs font-serif transition-colors rounded-md relative ${lang === l ? 'bg-[var(--brass)] bg-opacity-10 text-[var(--brass)]' : 'text-[var(--ink)]'}`}
              >
                {l === 'zh' ? '中' : l === 'en' ? 'EN' : '日'}
                {lang === l && (
                  <motion.div layoutId="lang-active" className="absolute -bottom-1 w-4 h-[1.5px] bg-[var(--brass)] rounded-full" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .reader-toolbar .rt-right {
          overflow: visible !important;
        }
      `}} />
    </div>
  );
};
