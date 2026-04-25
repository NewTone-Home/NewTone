import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS, ROUTE_FALLBACK } from '../locales';
import { listChapters } from '../services/chapterLoader';
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
  
  const allChapters = listChapters(route);
  const totalChapters = allChapters.length;
  
  // 简单逻辑：已读章节 + 下一章
  const unlockedLimit = progress.unlockedCount + 1;
  const unlockedChapters = allChapters.filter(ch => ch.chapter <= unlockedLimit || progress.readChapters.includes(ch.chapter));
  
  const readMains = progress.readChapters;
  const readCount = readMains.length;
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
          const isRead = readMains.includes(ch.chapter);
          const isCurrent = ch.chapter === currentRouteChapter;
          return (
            <div
              key={ch.chapter}
              className={`cs-item ${isCurrent ? 'current' : ''} ${isRead ? 'read' : ''}`}
              onClick={() => onSelect(ch.chapter)}
            >
              <div className="cs-item-indicator">
                {isRead ? '◉' : isCurrent ? '○' : '·'}
              </div>
              <div className="cs-item-body">
                <div className="cs-item-title">{ch.title}</div>
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
