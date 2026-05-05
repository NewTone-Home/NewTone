import { useState, useCallback, useEffect } from 'react';
import { Route } from '../types';

export function useReadingProgress(route?: Route) {
  const STORAGE_KEY = route ? `newtone-reading-progress.${route}` : 'newtone-reading-progress';

  const [progress, setProgressState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        if (route) {
          const val = parseInt(saved, 10);
          return isNaN(val) ? 0 : val;
        } else {
          // Legacy object-based storage for global progress in WorldsChumoLetter
          const parsed = JSON.parse(saved);
          return typeof parsed.latestChapterRead === 'number' ? parsed.latestChapterRead : 0;
        }
      }
      return 0;
    } catch (e) {
      return 0;
    }
  });

  // Keep state in sync if localStorage changes externally (other tabs) or via custom event (same tab)
  useEffect(() => {
    const sync = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        if (route) {
          setProgressState(parseInt(saved, 10) || 0);
        } else {
          try {
            const parsed = JSON.parse(saved);
            setProgressState(typeof parsed.latestChapterRead === 'number' ? parsed.latestChapterRead : 0);
          } catch {
            setProgressState(0);
          }
        }
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) sync();
    };
    
    const handleCustomSync = () => sync();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('newtone-progress-sync', handleCustomSync);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('newtone-progress-sync', handleCustomSync);
    };
  }, [STORAGE_KEY, route]);

  const markRead = useCallback((chapterIndex: number) => {
    setProgressState(prev => {
      if (chapterIndex > prev) {
        console.log(`[Progress] markRead: ${route} ch${chapterIndex} (prev N=${prev})`);
        if (route) {
          localStorage.setItem(STORAGE_KEY, chapterIndex.toString());
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ latestChapterRead: chapterIndex }));
        }
        // Dispatch event for same-tab reactivity
        window.dispatchEvent(new Event('newtone-progress-sync'));
        return chapterIndex;
      }
      return prev;
    });
  }, [STORAGE_KEY, route]);

  const isVisible = useCallback((chapterIndex: number) => {
    return chapterIndex <= progress + 1;
  }, [progress]);

  return { progress, markRead, isVisible };
}
