import React from 'react';
import { getRouteProgress } from '../services/progressService';
import { listChapters } from '../services/chapterLoader';
import { Route } from '../types';

type Props = {
  route: Route;
  currentChapter: number;
  onSelect: (chapter: number) => void;
};

const cnNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const ChapterNav: React.FC<Props> = ({ route, currentChapter, onSelect }) => {
  const progress = getRouteProgress(route);
  const chapters = listChapters(route);
  const total = chapters.length;

  const items = chapters.map(ch => ({
    chapter: ch.chapter,
    title: ch.title,
    isRead: progress.readChapters.includes(ch.chapter),
    isCurrent: ch.chapter === currentChapter,
    isLocked: ch.chapter > progress.unlockedCount + 1 && !progress.readChapters.includes(ch.chapter)
  }));

  // 如果没有章节数据，提供占位
  if (items.length === 0) {
    items.push({
      chapter: 1,
      title: '第一章',
      isRead: false,
      isCurrent: true,
      isLocked: false
    });
  }

  const getIndicator = (item: any) => {
    if (item.isLocked) return '·';
    if (item.isRead) return '●';
    if (item.isCurrent) return '○';
    return '·';
  };

  return (
    <nav className="chapter-nav" id="chapter-navigation">
      {items.map((item) => (
        <button
          key={item.chapter}
          id={`chapter-item-${item.chapter}`}
          className={`cn-item ${item.isCurrent ? 'current' : ''} ${item.isRead ? 'read' : ''} ${item.isLocked ? 'locked' : ''}`}
          disabled={item.isLocked}
          onClick={() => !item.isLocked && onSelect(item.chapter)}
        >
          <span className="cn-dot">{getIndicator(item)}</span>
          <span className="cn-title">{item.title}</span>
        </button>
      ))}
    </nav>
  );
};

export default ChapterNav;
