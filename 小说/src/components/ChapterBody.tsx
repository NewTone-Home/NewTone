import React, { useState, useEffect } from 'react'
import { markChapterRead } from '../services/progressService'
import { loadChapter, listChapters } from '../services/chapterLoader'
import { CoinButton } from './CoinButton'
import { Route } from '../types'
import { useTheme } from '../contexts/ThemeContext'
import ReactMarkdown from 'react-markdown'

type Props = {
  route: Route
  currentChapter: number
  charColor: string
  isClosing?: boolean
  onAdvance: (nextChapter: number) => void
}

const cnNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

export function ChapterBody({ route, currentChapter, charColor, isClosing, onAdvance }: Props) {
  const { fontSize } = useTheme()

  const chapterData = loadChapter(route, currentChapter)
  const chapters = listChapters(route)
  const total = chapters.length
  const isLast = currentChapter >= total

  const handleNext = () => {
    if (!isLast) {
      markChapterRead(route, currentChapter, currentChapter)
      onAdvance(currentChapter + 1)
    } else {
      markChapterRead(route, currentChapter, currentChapter)
    }
  }

  const fontSizeMap = {
    S: '15px',
    M: '17px',
    L: '19px'
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
      </div>
    </div>
  )
}
