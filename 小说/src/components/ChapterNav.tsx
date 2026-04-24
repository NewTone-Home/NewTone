import React from 'react';
import { getRouteProgress, getTotalChaptersForRoute } from '../services/progressService';

type Props = {
  route: string;
  currentChapter: number;
  onSelect: (chapter: number) => void;
};

const cnNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const ChapterNav: React.FC<Props> = ({ route, currentChapter, onSelect }) => {
  const progress = getRouteProgress(route);
  const total = getTotalChaptersForRoute(route);

  const items = [];
  for (let i = 1; i <= progress.unlockedCount; i++) {
    items.push({
      chapter: i,
      title: `第${cnNum[i] || i}章`,
      isRead: progress.readChapters.includes(i),
      isCurrent: i === currentChapter,
      isLocked: false
    });
  }

  if (progress.unlockedCount < total) {
    items.push({
      chapter: progress.unlockedCount + 1,
      title: '未解锁章节',
      isRead: false,
      isCurrent: false,
      isLocked: true
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
