import React, { useState, useEffect } from 'react'
import { getTotalChaptersForRoute, markChapterRead } from '../services/progressService'
import { CoinButton } from './CoinButton'
import { Route } from '../types'
import { useTheme } from '../contexts/ThemeContext'

type Props = {
  route: string
  currentChapter: number
  charColor: string
  onAdvance: (nextChapter: number) => void
}

const cnNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

export function ChapterBody({ route, currentChapter, charColor, onAdvance }: Props) {
  const [unfurling, setUnfurling] = useState(false)
  const { fontSize } = useTheme()

  useEffect(() => {
    setUnfurling(true)
    const t = setTimeout(() => setUnfurling(false), 600)
    return () => clearTimeout(t)
  }, [currentChapter])

  // Placeholder logic as requested
  const getChapterContent = (_route: string, chapter: number) => {
    return {
      title: `第${cnNum[chapter] || chapter}章`,
      segments: ['本章节内容待补充。']
    }
  }

  const content = getChapterContent(route, currentChapter)
  const total = getTotalChaptersForRoute(route)
  const isLast = currentChapter >= total

  const handleNext = () => {
    if (!isLast) {
      // Using currentChapter for both main and route chapter in this placeholder phase
      markChapterRead(route as Route, currentChapter, currentChapter)
      onAdvance(currentChapter + 1)
    } else {
      markChapterRead(route as Route, currentChapter, currentChapter)
    }
  }

  const fontSizeMap = {
    S: '15px',
    M: '17px',
    L: '19px'
  }

  return (
    <div 
      className={`chapter-body ${unfurling ? 'unfurling' : ''}`}
      style={{ '--reader-font-size': fontSizeMap[fontSize] } as React.CSSProperties}
    >
      <div className="chapter-meta">
        第 {cnNum[currentChapter] || currentChapter} 章 · 共 {cnNum[total] || total} 章
      </div>
      <h2 className="chapter-heading">{content.title}</h2>
      {content.segments.map((seg, i) => (
        <div key={i}>
          <p className="cb-text" style={{ fontSize: 'var(--reader-font-size)' }}>{seg}</p>
          {i < content.segments.length - 1 && (
            <div className="cb-divider">※　※　※</div>
          )}
        </div>
      ))}
      <div className="cb-coin-wrap">
        <CoinButton 
          charColor={charColor}
          onNext={handleNext}
          disabled={isLast}
        />
      </div>
    </div>
  )
}
