export type Language = 'zh' | 'en' | 'ja';
export type Route = 'main' | 'jixiu' | 'ruoyu' | 'yunling' | 'chengyuan';

export interface LocalizedString {
  zh: string;
  en: string;
  ja: string;
}

export interface ChapterSegment {
  character: string;
  content: string;
}

export interface ChapterData {
  mainChapter: number;
  title: string;
  timeAnchor: string;
  segments: ChapterSegment[];
  routeChapter?: number; // Calculated per route
}

export interface RouteProgress {
  currentRouteChapter: number;
  readMainChapters: number[];
  lastReadAt: string;
}

export type FontSize = 'small' | 'medium' | 'large';

export interface NovelWorld {
  id: string;
  name: LocalizedString;
  shortDescription?: LocalizedString;
  description?: LocalizedString;
  genre: LocalizedString;
  wordCount?: string;
  chapters: StoryChapter[];
  imageUrl: string;
  isLocked?: boolean;
}

export interface StoryChapter {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  wordCount: number;
}
