import React, { useEffect, useRef } from 'react'
import { loadChapter } from '../services/chapterLoader'
import { Route } from '../types'
import { useTheme } from '../contexts/ThemeContext'
import ReactMarkdown from 'react-markdown'
import { useReadingProgress } from '../hooks/useReadingProgress'
import { UI_TRANSLATIONS } from '../locales'
import { FadeText } from './FadeText'
import { ScrambleText } from './ScrambleText'

type Props = {
  route: Route
  currentChapter: number
  charColor: string
  isClosing?: boolean
  lang?: string
  onAdvance: (nextChapter: number) => void
}

const ChapterParagraph = ({ children, route }: { children: any, route: string }) => {
  // Ensure children is a string for ScrambleText
  const textContent = React.Children.toArray(children)
    .map(child => (typeof child === 'string' || typeof child === 'number') ? child : '')
    .join('');

  if (route === 'jixiu' && textContent) {
    return <p style={{ marginBottom: '1.5em' }}><ScrambleText text={textContent} /></p>;
  }
  return <p>{children}</p>;
};

export function ChapterBody({ route, currentChapter, charColor, isClosing, lang: langProp }: Props) {
  const { fontSize, lang: contextLang } = useTheme()
  const lang = langProp ?? contextLang
  const { markRead } = useReadingProgress(route)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const chapterData = loadChapter(route, currentChapter)

  const getChapterTitle = (title: string, chNum: number) => {
    const match = title.match(/第([一二三四五六七八九十]|[\d]+)章/);
    if (match) {
      if (lang === 'en') return `Chapter ${chNum}`;
      if (lang === 'ja') return `第${match[1]}章`;
      return title;
    }
    return title;
  };

  useEffect(() => {
    if (route !== 'jixiu') return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log(`[Sentinel] TRIGGERED: ${route} ch${currentChapter} is now read.`);
        markRead(currentChapter);
      }
    }, { 
      threshold: 0.5,
      root: null,
      rootMargin: '0px 0px -20px 0px' // Trigger only when well into view
    })

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [route, currentChapter, markRead])

  const fontSizeMap = {
    S: '16px',
    M: '18px',
    L: '22px'
  }

  const getSubtitle = () => {
    if (route === 'jixiu') {
      return UI_TRANSLATIONS[lang as any]?.[`jixiu.ch${currentChapter}.subtitle`] || chapterData.timeAnchor;
    }
    return chapterData.timeAnchor;
  };

  const getChapterContent = () => {
    if (route === 'jixiu') {
      const translated = UI_TRANSLATIONS[lang as any]?.[`jixiu.ch${currentChapter}.content`];
      if (translated) return translated;
    }
    return chapterData.content;
  };

  const paragraphComponent = React.useMemo(() => {
    return (props: any) => <ChapterParagraph {...props} route={route} />;
  }, [route]);

  if (!chapterData) {
    return (
      <div className="chapter-body">
        <div className="chapter-meta">{UI_TRANSLATIONS[lang as any]?.['common.loading'] || ''}</div>
      </div>
    )
  }

  return (
    <div 
      className={`chapter-body ${isClosing ? 'is-closing' : ''}`}
      style={{ '--reader-font-size': fontSizeMap[fontSize] } as React.CSSProperties}
    >
      <div className="markdown-body">
        <h2 className="chapter-heading-l3">
          {route === 'jixiu' ? (
            <ScrambleText text={getChapterTitle(chapterData.title, currentChapter)} />
          ) : (
            getChapterTitle(chapterData.title, currentChapter)
          )}
        </h2>
        <div className="read-time-anchor-l3">
          {route === 'jixiu' ? (
            <ScrambleText text={getSubtitle()} />
          ) : (
            getSubtitle()
          )}
        </div>
        
        {route === 'jixiu' ? (
          getChapterContent().split('\n\n').map((para, idx) => {
            if (para.trim() === '---') return <hr key={idx} />;
            return (
              <p key={idx} style={{ marginBottom: '1.5em' }}>
                <ScrambleText text={para.trim()} delay={idx * 50} />
              </p>
            );
          })
        ) : (
          <ReactMarkdown components={{ p: paragraphComponent }}>
            {getChapterContent()}
          </ReactMarkdown>
        )}

        {/* Sentinel for progressive unlocking */}
        <div 
          ref={sentinelRef} 
          data-end-sentinel 
          style={{ height: '1px', width: '100%', marginTop: '20px' }} 
        />
      </div>
    </div>
  )
}
