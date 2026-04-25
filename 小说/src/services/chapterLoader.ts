import { ChapterData, Route, ChapterMeta } from '../types';

/**
 * 新扫描规则：每条路线独立文件夹，每个 .md 文件 = 该路线的一章。
 */
const modules = import.meta.glob('../chapters/*/chapter-*.md', {
  eager: true,
  as: 'raw',
}) as Record<string, string>;

function parsePath(path: string): { routeId: Route; chapterNumber: number } | null {
  // 路径如 '../chapters/jixiu/chapter-1.md'
  const match = path.match(/\.\.\/chapters\/([^/]+)\/chapter-(\d+)\.md/);
  if (!match) return null;

  const routeId = match[1] as Route;
  const chapterNumber = parseInt(match[2], 10);

  // 校验 routeId
  const validRoutes: Route[] = ['jixiu', 'ruoyu', 'yunling', 'chengyuan'];
  if (!validRoutes.includes(routeId)) {
    console.warn(`Invalid route directory detected: ${routeId}`);
    return null;
  }

  return { routeId, chapterNumber };
}

function parseChapterMarkdown(content: string, routeId: Route, chapterNumber: number): ChapterData | null {
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

  return {
    routeId,
    chapter: parseInt(fm.chapter) || chapterNumber,
    title: fm.title || '无标题',
    timeAnchor: fm.timeAnchor || '',
    content: bodyRaw.trim(),
  };
}

/**
 * 导出 API：按路线 + 章节号查询
 */
export function loadChapter(routeId: Route, chapterNumber: number): ChapterData | null {
  for (const path in modules) {
    const info = parsePath(path);
    if (info && info.routeId === routeId && info.chapterNumber === chapterNumber) {
      return parseChapterMarkdown(modules[path], routeId, chapterNumber);
    }
  }
  return null;
}

/**
 * 用于章节导航
 */
export function listChapters(routeId: Route): ChapterMeta[] {
  const chapters: ChapterMeta[] = [];
  for (const path in modules) {
    const info = parsePath(path);
    if (info && info.routeId === routeId) {
      const data = parseChapterMarkdown(modules[path], routeId, info.chapterNumber);
      if (data) {
        chapters.push({
          chapter: data.chapter,
          title: data.title,
          routeId: data.routeId,
        });
      }
    }
  }
  return chapters.sort((a, b) => a.chapter - b.chapter);
}

// 兼容旧版本的导出（如果有组件还在引用）
export function loadAllChapters(): ChapterData[] {
  const chapters: ChapterData[] = [];
  for (const path in modules) {
    const info = parsePath(path);
    if (info) {
      const data = parseChapterMarkdown(modules[path], info.routeId, info.chapterNumber);
      if (data) chapters.push(data);
    }
  }
  return chapters;
}
