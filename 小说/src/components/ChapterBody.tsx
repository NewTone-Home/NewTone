import React, { useEffect, useRef } from 'react'
import { loadChapter } from '../services/chapterLoader'
import { Route } from '../types'
import { useTheme } from '../contexts/ThemeContext'
import ReactMarkdown from 'react-markdown'
import { useReadingProgress } from '../hooks/useReadingProgress'

type Props = {
  route: Route
  currentChapter: number
  charColor: string
  isClosing?: boolean
  onAdvance: (nextChapter: number) => void
}

export function ChapterBody({ route, currentChapter, charColor, isClosing }: Props) {
  const { fontSize } = useTheme()
  const { markRead } = useReadingProgress(route)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const chapterData = loadChapter(route, currentChapter)

  useEffect(() => {
    if (route !== 'jixiu') return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log(`[Sentinel] TRIGGERED: ${route} ch${currentChapter} is now read.`);
        markRead(currentChapter);
      }
    }, { 
      threshold: 0.01,
      root: null,
      rootMargin: '0px 0px 50px 0px' // Trigger slightly before reaching absolute bottom for better UX
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

  if (!chapterData) {
    return (
      <div className="chapter-body">
        <div className="chapter-meta">资源加载中...</div>
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
          {chapterData.title}
        </h2>
        <div className="read-time-anchor-l3">
          {chapterData.timeAnchor}
        </div>
        
        <ReactMarkdown>{chapterData.content}</ReactMarkdown>

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
