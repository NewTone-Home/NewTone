import { Route, RouteProgress, FontSize } from '../types';

const PREFIX = 'newtone-';

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
    chengyuan: 5,
    main: 10
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

export function isRouteUnlocked(route: Route): boolean {
  if (route === 'main' || route === 'jixiu' || route === 'ruoyu') return true;

  // Check overall progress
  const allRoutes: Route[] = ['main', 'jixiu', 'ruoyu', 'yunling', 'chengyuan'];
  let totalReadCount = 0;
  let mainReadCount = 0;

  for (const r of allRoutes) {
    const prog = getRouteProgress(r);
    if (prog) {
      if (r === 'main') {
        mainReadCount = prog.readChapters.length;
      }
      totalReadCount = Math.max(totalReadCount, prog.readChapters.length);
    }
  }

  if (route === 'yunling') {
    return totalReadCount >= 3;
  }
  if (route === 'chengyuan') {
    return mainReadCount >= 8;
  }

  return false;
}

export function getFontSize(): FontSize {
  return (localStorage.getItem(`${PREFIX}reader-fontsize`) as FontSize) || 'medium';
}

export function setFontSize(size: FontSize): void {
  localStorage.setItem(`${PREFIX}reader-fontsize`, size);
}
