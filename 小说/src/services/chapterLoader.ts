import { ChapterData, Route, ChapterSegment } from '../types';
import { getRouteProgress } from './progressService';

export type RouteChapter = ChapterData & { routeChapter: number };

export function loadAllChapters(): ChapterData[] {
  const modules = import.meta.glob('../chapters/*.md', { eager: true, as: 'raw' });
  const chapters: ChapterData[] = [];

  for (const path in modules) {
    const rawContent = modules[path] as string;
    const chapter = parseChapterMarkdown(rawContent);
    if (chapter) {
      chapters.push(chapter);
    }
  }

  // Sort by mainChapter number
  return chapters.sort((a, b) => a.mainChapter - b.mainChapter);
}

export function getChaptersForRoute(route: Route): RouteChapter[] {
  const allChapters = loadAllChapters();
  const routeChapters: RouteChapter[] = [];
  let currentRouteChapter = 1;

  for (const chapter of allChapters) {
    let filteredSegments: ChapterSegment[] = [];

    if (route === 'main') {
      filteredSegments = chapter.segments;
    } else {
      // Filter segments: keep those that match the character route or 'narrative'
      filteredSegments = chapter.segments.filter(s => s.character === route || s.character === 'narrative');
    }

    if (filteredSegments.length > 0) {
      routeChapters.push({
        ...chapter,
        segments: filteredSegments,
        routeChapter: currentRouteChapter++
      });
    }
  }

  return routeChapters;
}

export function getUnlockedChaptersForRoute(route: Route): RouteChapter[] {
  const all = getChaptersForRoute(route);
  const progress = getRouteProgress(route);
  const readMains = progress.readChapters;
  const maxRead = readMains.length > 0 ? Math.max(...readMains) : 0;
  return all.filter(ch => ch.mainChapter <= maxRead + 1);
}

function parseChapterMarkdown(content: string): ChapterData | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) return null;

  const fmRaw = frontmatterMatch[1];
  const bodyRaw = frontmatterMatch[2];

  const fm: any = {};
  fmRaw.split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val.length > 0) {
      fm[key.trim()] = val.join(':').trim();
    }
  });

  const segments: ChapterSegment[] = [];
  const segmentRegex = /:::\s*(\w+)\s*\n([\s\S]*?)\n:::/g;
  let match;

  while ((match = segmentRegex.exec(bodyRaw)) !== null) {
    segments.push({
      character: match[1],
      content: match[2].trim()
    });
  }

  return {
    mainChapter: parseInt(fm.mainChapter) || 0,
    title: fm.title || 'Untitled',
    timeAnchor: fm.timeAnchor || '',
    segments
  };
}
