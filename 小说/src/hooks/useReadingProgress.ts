import { useState } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('newtone-reading-progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.latestChapterRead === 'number' ? parsed.latestChapterRead : 0;
      }
      return 0;
    } catch (e) {
      console.error('Failed to load reading progress', e);
      return 0;
    }
  });
  
  const markChapterRead = (chapterNum: number) => {
    setProgress(prev => {
      const next = Math.max(prev, chapterNum);
      localStorage.setItem('newtone-reading-progress', JSON.stringify({ latestChapterRead: next }));
      return next;
    });
  };
  
  return { progress, markChapterRead };
}
