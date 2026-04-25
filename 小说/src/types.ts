export type Language = 'zh' | 'en' | 'ja';
export type Route = 'jixiu' | 'ruoyu' | 'yunling' | 'chengyuan';

export interface LocalizedString {
  zh: string;
  en: string;
  ja: string;
}

export interface ChapterData {
  routeId: Route;
  chapter: number;
  title: string;
  timeAnchor: string;
  content: string;
}

export interface ChapterMeta {
  chapter: number;
  title: string;
  routeId: Route;
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
