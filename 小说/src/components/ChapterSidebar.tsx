import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS, ROUTE_FALLBACK } from '../locales';
import { getUnlockedChaptersForRoute, getChaptersForRoute } from '../services/chapterLoader';
import { Route } from '../types';
import { getRouteProgress } from '../services/progressService';

interface ChapterSidebarProps {
  route: Route;
  currentRouteChapter: number;
  onSelect: (num: number) => void;
}

export const ChapterSidebar: React.FC<ChapterSidebarProps> = ({
  route,
  currentRouteChapter,
  onSelect
}) => {
  const { lang } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const progress = getRouteProgress(route);
  
  const unlockedChapters = getUnlockedChaptersForRoute(route);
  const allChapters = getChaptersForRoute(route);
  
  const readMains = progress.readChapters;
  const readCount = readMains.length;
  const totalChapters = allChapters.length;
  const hasLockedAhead = unlockedChapters.length < totalChapters;

  const t = (key: string) => {
    const section = UI_TRANSLATIONS[lang];
    if (!section) return key;
    return section[key] || key;
  };

  return (
    <aside className={`chapter-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="cs-header">
        <div className="cs-route-name">{t(`route.${route}.label`) || ROUTE_FALLBACK[route]}</div>
        <div className="cs-route-deco">· · ·</div>
        <div className="cs-progress">
          <div className="cs-progress-track">
            {Array.from({ length: totalChapters }).map((_, i) => (
              <span
                key={i}
                className={`cs-progress-dot ${i < readCount ? 'filled' : ''} ${i === currentRouteChapter - 1 ? 'current' : ''}`}
              />
            ))}
          </div>
          <div className="cs-progress-text">
            {readCount} <span className="cs-sep">/</span> {totalChapters}
          </div>
        </div>
      </div>

      <nav className="cs-list">
        {unlockedChapters.map(ch => {
          const isRead = readMains.includes(ch.mainChapter);
          const isCurrent = ch.routeChapter === currentRouteChapter;
          return (
            <div
              key={ch.routeChapter}
              className={`cs-item ${isCurrent ? 'current' : ''} ${isRead ? 'read' : ''}`}
              onClick={() => onSelect(ch.routeChapter)}
            >
              <div className="cs-item-indicator">
                {isRead ? '◉' : isCurrent ? '○' : '·'}
              </div>
              <div className="cs-item-body">
                <div className="cs-item-title">{ch.title}</div>
                <div className="cs-item-anchor">{ch.timeAnchor}</div>
              </div>
            </div>
          );
        })}
        {hasLockedAhead && (
          <div className="cs-item locked">
            <div className="cs-item-indicator">·</div>
            <div className="cs-item-body">
              <div className="cs-item-title cs-locked-text">{t('sidebar.nextLocked')}</div>
              <div className="cs-item-anchor">{t('sidebar.readToUnlock')}</div>
            </div>
          </div>
        )}
      </nav>

      <button className="cs-collapse" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '›' : '‹'}
      </button>
    </aside>
  );
};
