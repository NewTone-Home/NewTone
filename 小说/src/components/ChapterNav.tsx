import React, { useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { listChapters } from '../services/chapterLoader';
import { Route } from '../types';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { getRouteProgress, isChapterUnlocked, getGlobalReadingState } from '../services/progressService';
import { useTheme } from '../contexts/ThemeContext';
import { FadeText } from './FadeText';
import { ScrambleText } from './ScrambleText';

type Props = {
  route: Route;
  currentChapter: number;
  onSelect: (chapter: number) => void;
  lang?: string;
};

const ChapterNav: React.FC<Props> = ({ route, currentChapter, onSelect, lang: langProp }) => {
  const { lang: contextLang } = useTheme();
  const lang = langProp ?? contextLang;
  const { progress, isVisible } = useReadingProgress(route);
  const chapters = listChapters(route);
  
  // Track initial progress to avoid repeating animations on already-unlocked chapters
  const initialProgress = useRef(progress);

  const getChapterTitle = (ch: any) => {
    // If title is "第X章", localize it
    const match = ch.title.match(/第([一二三四五六七八九十]|[\d]+)章/);
    if (match) {
      const num = match[1];
      if (lang === 'en') return `Chapter ${ch.chapter}`;
      if (lang === 'ja') return `第${num}章`;
      return ch.title;
    }
    return ch.title;
  };

  const items = useMemo(() => {
    const globalState = getGlobalReadingState();
    const progLegacy = getRouteProgress(route);

    return chapters.map(ch => {
      const unlocked = isChapterUnlocked(route as Route, ch.chapter, globalState);
      const isRead = progLegacy.readChapters.includes(ch.chapter) || (route === 'jixiu' && ch.chapter <= progress);

      return {
        chapter: ch.chapter,
        title: getChapterTitle(ch),
        isRead,
        isCurrent: ch.chapter === currentChapter,
        isLocked: !unlocked && !isRead,
        shouldAnimate: route === 'jixiu' && ch.chapter > initialProgress.current + 1
      };
    });
  }, [route, chapters, progress, currentChapter, lang]);

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
            <span className="cn-title">
              {route === 'jixiu' ? <ScrambleText text={item.title} /> : item.title}
            </span>
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
