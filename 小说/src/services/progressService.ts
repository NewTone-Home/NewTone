import { Route, RouteProgress, FontSize, ChapterType } from '../types';
import { CHAPTER_METADATA_REGISTRY } from '../data';

const PREFIX = 'newtone-';

export interface ReadingState {
  readChapters: Set<string>;
}

export function getGlobalReadingState(): ReadingState {
  const allRoutes: Route[] = ['jixiu', 'ruoyu', 'yunling', 'chengyuan'];
  const readChapters = new Set<string>();

  allRoutes.forEach(route => {
    const data = localStorage.getItem(`${PREFIX}progress-${route}`);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const chapters = parsed.readChapters || parsed.readMainChapters || [];
        chapters.forEach((chNum: number) => {
          readChapters.add(`${route}-${chNum}`);
        });
      } catch (e) {
        // ignore
      }
    }
    
    // Also check the other storage key used by useReadingProgress hook
    const hookData = localStorage.getItem(`newtone-reading-progress.${route}`);
    if (hookData) {
      const maxRead = parseInt(hookData, 10);
      if (!isNaN(maxRead)) {
        for (let i = 1; i <= maxRead; i++) {
          readChapters.add(`${route}-${i}`);
        }
      }
    }
  });

  return { readChapters };
}

export function findPreviousMainChapter(mainOrder: number): { id: string } | null {
  if (!mainOrder || mainOrder <= 1) return null;
  
  for (const [id, meta] of Object.entries(CHAPTER_METADATA_REGISTRY)) {
    if (meta.type === 'main' && meta.mainOrder === mainOrder - 1) {
      return { id };
    }
  }
  return null;
}

export function isVolumeUnsealed(volumeId: Route, state?: ReadingState): boolean {
  const readingState = state || getGlobalReadingState();
  
  switch (volumeId) {
    case 'jixiu':
      return true; // 默认开放
    case 'ruoyu':
      // 读完修杰 ch3 后破缄（修杰 ch3 末尾发出加密消息 = M4）
      return readingState.readChapters.has('jixiu-3');
    case 'yunling':
      // 待 Phase 2 后段某 M 触发，当前永久封缄
      return false;
    case 'chengyuan':
      // 待规划，当前永久封缄
      return false;
    default:
      return false;
  }
}

export function isChapterUnlocked(route: Route, chapterNumber: number, state?: ReadingState): boolean {
  const readingState = state || getGlobalReadingState();
  
  // 1. 卷未破缄 → 任何章都锁
  if (!isVolumeUnsealed(route, readingState)) return false;

  const id = `${route}-${chapterNumber}`;
  const meta = CHAPTER_METADATA_REGISTRY[id];

  // If no metadata, default to unlocked for existing chapters (backward compatibility)
  if (!meta) return true;

  // 2. 主线章：必须前一个主线章读完
  if (meta.type === 'main') {
    if (!meta.mainOrder) return true; // Safety
    const prevMain = findPreviousMainChapter(meta.mainOrder);
    if (!prevMain) return true; // 第一个主线章
    return readingState.readChapters.has(prevMain.id);
  }

  // 3. 支线 / 交叉线 / 番外：卷破缄即解锁
  return true;
}

export function getRouteProgress(route: string): { readChapters: number[], unlockedCount: number } {
  const data = localStorage.getItem(`${PREFIX}progress-${route}`);
  const defaultValue = { readChapters: [], unlockedCount: 1 };
  
  if (!data) return defaultValue;
  try {
    const parsed = JSON.parse(data);
    // Be robust: handle both old and new field names
    return {
      readChapters: parsed.readChapters || parsed.readMainChapters || [],
      unlockedCount: parsed.unlockedCount || parsed.currentRouteChapter || 1
    };
  } catch {
    return defaultValue;
  }
}

export function getTotalChaptersForRoute(route: string): number {
  const totals: Record<string, number> = {
    jixiu: 8,
    ruoyu: 8,
    yunling: 6,
    chengyuan: 5
  };
  return totals[route] || 0;
}

export function markChapterRead(route: Route, mainChapter: number, routeChapter: number): void {
  const existing = getRouteProgress(route);

  if (!existing.readChapters.includes(mainChapter)) {
    existing.readChapters.push(mainChapter);
  }
  
  existing.unlockedCount = Math.max(existing.unlockedCount, routeChapter);
  const saveAt = new Date().toISOString();

  // We save with the new keys
  localStorage.setItem(`${PREFIX}progress-${route}`, JSON.stringify({
    ...existing,
    lastReadAt: saveAt
  }));
}

export function getActiveRoute(): Route | null {
  return localStorage.getItem(`${PREFIX}active-route`) as Route | null;
}

export function setActiveRoute(route: Route): void {
  localStorage.setItem(`${PREFIX}active-route`, route);
}

/**
 * @deprecated Use isVolumeUnsealed instead
 */
export function isRouteUnlocked(route: Route): boolean {
  return isVolumeUnsealed(route);
}

export function getFontSize(): FontSize {
  return (localStorage.getItem(`${PREFIX}reader-fontsize`) as FontSize) || 'medium';
}

export function setFontSize(size: FontSize): void {
  localStorage.setItem(`${PREFIX}reader-fontsize`, size);
}

export const progressService = {
  getRouteProgress,
  markChapterRead,
  getActiveRoute,
  setActiveRoute,
  isRouteUnlocked,
  isVolumeUnsealed,
  isChapterUnlocked,
  getGlobalReadingState,
  getFontSize,
  setFontSize,
  clearAll() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  },
};
