export type Language = 'zh' | 'en' | 'ja';

export interface LocalizedString {
  zh: string;
  en: string;
  ja: string;
}

export interface StoryChapter {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  wordCount: number;
}

export interface NovelWorld {
  id: string;
  name: LocalizedString;
  genre: LocalizedString;
  shortDescription: LocalizedString;
  imageUrl: string;
  chapters: StoryChapter[];
}
