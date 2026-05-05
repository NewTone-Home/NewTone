import React, { useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { listChapters } from '../services/chapterLoader';
import { Route } from '../types';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { getRouteProgress } from '../services/progressService';

type Props = {
  route: Route;
  currentChapter: number;
  onSelect: (chapter: number) => void;
};

const ChapterNav: React.FC<Props> = ({ route, currentChapter, onSelect }) => {
  const { progress, isVisible } = useReadingProgress(route);
  const chapters = listChapters(route);
  
  // Track initial progress to avoid repeating animations on already-unlocked chapters
  const initialProgress = useRef(progress);

  const items = useMemo(() => {
    if (route === 'jixiu') {
      // Special logic for jixiu: only show visible chapters
      return chapters
        .filter(ch => isVisible(ch.chapter))
        .map(ch => ({
          chapter: ch.chapter,
          title: ch.title,
          isRead: ch.chapter <= progress,
          isCurrent: ch.chapter === currentChapter,
          isLocked: false,
          shouldAnimate: ch.chapter > initialProgress.current + 1
        }));
    } else {
      // Original logic for other characters
      const progLegacy = getRouteProgress(route);
      return chapters.map(ch => ({
        chapter: ch.chapter,
        title: ch.title,
        isRead: progLegacy.readChapters.includes(ch.chapter),
        isCurrent: ch.chapter === currentChapter,
        isLocked: ch.chapter > progLegacy.unlockedCount + 1 && !progLegacy.readChapters.includes(ch.chapter),
        shouldAnimate: false
      }));
    }
  }, [route, chapters, progress, isVisible, currentChapter]);

  // Handle case where no chapters exist
  if (items.length === 0) {
    return null;
  }

  const getIndicator = (item: any) => {
    if (item.isLocked) return '·';
    if (item.isRead) return '●';
    if (item.isCurrent) return '○';
    return '·';
  };

  return (
    <nav className="chapter-nav" id="chapter-navigation">
      {items.map((item) => {
        const content = (
          <button
            type="button"
            id={`chapter-item-${item.chapter}`}
            className={`cn-item ${item.isCurrent ? 'current' : ''} ${item.isRead ? 'read' : ''} ${item.isLocked ? 'locked' : ''}`}
            disabled={item.isLocked}
            onClick={(e) => {
              e.stopPropagation();
              if (!item.isLocked) {
                console.log(`[Nav] Selecting chapter ${item.chapter}`);
                onSelect(item.chapter);
              }
            }}
          >
            <span className="cn-dot">{getIndicator(item)}</span>
            <span className="cn-title">{item.title}</span>
          </button>
        );

        if (item.shouldAnimate && route === 'jixiu') {
          return (
            <motion.div
              key={item.chapter}
              initial={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
              animate={{ opacity: 1, filter: 'blur(0)', y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ display: 'inline-block' }}
            >
              {content}
            </motion.div>
          );
        }

        return <div key={item.chapter} style={{ display: 'inline-block' }}>{content}</div>;
      })}
    </nav>
  );
};

export default ChapterNav;
