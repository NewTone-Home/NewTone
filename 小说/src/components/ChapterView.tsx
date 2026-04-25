import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS } from '../locales';
import { loadChapter, listChapters } from '../services/chapterLoader';
import { markChapterRead, getFontSize } from '../services/progressService';
import { FontSize, Route } from '../types';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const FS_MAP: Record<FontSize, string> = { 
  small: '16px', 
  medium: '18px', 
  large: '22px' 
};

interface ChapterViewProps {
  route: Route;
  currentRouteChapter: number;
}

export function ChapterView({ route, currentRouteChapter }: ChapterViewProps) {
  const { lang } = useTheme();
  const navigate = useNavigate();
  const chapters = listChapters(route);
  const currentChapter = loadChapter(route, currentRouteChapter);
  const fs = getFontSize();

  const t = (key: string) => UI_TRANSLATIONS[lang]?.[key] || key;

  if (!currentChapter) return null;

  const isLastChapter = currentRouteChapter === chapters.length;

  const handleNext = () => {
    // Current design uses route chapter as main chapter for simplified progress
    markChapterRead(route, currentChapter.chapter, currentRouteChapter);
    if (!isLastChapter) {
      navigate(`/read/${route}/${currentRouteChapter + 1}`);
    }
  };

  const prev = () => navigate(`/read/${route}/${currentRouteChapter - 1}`);

  return (
    <div className="read-content" style={{ '--reader-font-size': FS_MAP[fs] } as React.CSSProperties}>
      {lang !== 'zh' && <div className="read-no-translation">{t(`reader.noTranslation.${lang}`)}</div>}
      <h1 className="read-title">{currentChapter.title}</h1>
      <div className="read-time-anchor">{currentChapter.timeAnchor}</div>
      
      <div className="read-body markdown-body">
        <ReactMarkdown>{currentChapter.content}</ReactMarkdown>
      </div>
      
      <div className="read-nav">
        <button disabled={currentRouteChapter === 1} onClick={prev} className="read-nav-btn">
          ← {t('reader.prev')}
        </button>
        <span className="read-nav-progress">{currentRouteChapter} / {chapters.length}</span>
        <button onClick={handleNext} className="read-nav-btn primary" disabled={isLastChapter}>
          {isLastChapter ? t('sidebar.locked') : `${t('reader.next')} →`}
        </button>
      </div>
    </div>
  );
}
