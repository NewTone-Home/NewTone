import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS } from '../locales';
import { getChaptersForRoute } from '../services/chapterLoader';
import { markChapterRead, getFontSize } from '../services/progressService';
import { FontSize, Route } from '../types';
import { useNavigate } from 'react-router-dom';

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
  const chapters = getChaptersForRoute(route);
  const currentChapter = chapters[currentRouteChapter - 1];
  const fs = getFontSize();

  const t = (key: string) => UI_TRANSLATIONS[lang]?.[key] || key;

  if (!currentChapter) return null;

  const isLastChapter = currentRouteChapter === chapters.length;

  const handleNext = () => {
    markChapterRead(route, currentChapter.mainChapter, currentChapter.routeChapter);
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
      
      {currentChapter.segments.map((seg, i) => (
        <React.Fragment key={i}>
          <div className="read-body">{seg.content}</div>
          {i < currentChapter.segments.length - 1 && (
            <div className="read-divider">※　　※　　※</div>
          )}
        </React.Fragment>
      ))}
      
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
