import React, { useState, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

type GroupKey = 'size' | 'tone' | 'tongue'

const LABELS: Record<GroupKey, Record<string, string>> = {
  size:   { zh: '字', en: 'Type',   ja: '字' },
  tone:   { zh: '调', en: 'Tone',   ja: '調' },
  tongue: { zh: '言', en: 'Tongue', ja: '言' },
}

const OPTIONS = {
  size:   [
    { val: 'S', label: { zh: '小', en: 'S',     ja: '小' } },
    { val: 'M', label: { zh: '中', en: 'M',     ja: '中' } },
    { val: 'L', label: { zh: '大', en: 'L',     ja: '大' } },
  ],
  tone:   [
    { val: 'day',   label: { zh: '日', en: 'Day',   ja: '昼' } },
    { val: 'night', label: { zh: '夜', en: 'Night', ja: '夜' } },
  ],
  tongue: [
    { val: 'zh', label: { zh: '中', en: '中', ja: '中' } },
    { val: 'en', label: { zh: 'EN', en: 'EN', ja: 'EN' } },
    { val: 'ja', label: { zh: '日', en: '日', ja: '日' } },
  ],
}

export const ZhupiAnnotations: React.FC = () => {
  const { theme, setTheme, lang, setLang, fontSize, setFontSize } = useTheme()
  const [active, setActive] = useState<GroupKey | null>(null)
  const hideTimerRef = useRef<number | undefined>(undefined)
  
  const handleEnter = (key: GroupKey) => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    setActive(key)
  }
  const handleLeave = () => {
    hideTimerRef.current = window.setTimeout(() => setActive(null), 800)
  }
  
  const currentValue = (key: GroupKey) => {
    if (key === 'size') return fontSize
    if (key === 'tone') return theme
    if (key === 'tongue') return lang
  }
  
  const applyValue = (key: GroupKey, val: string) => {
    if (key === 'size') setFontSize(val as any)
    if (key === 'tone') setTheme(val as any)
    if (key === 'tongue') setLang(val as any)
  }
  
  const groups: GroupKey[] = ['size', 'tone', 'tongue']
  
  return (
    <div className="zp-annotations">
      {groups.map(key => (
        <div
          key={key}
          className={`zp-group ${active === key ? 'zp-active' : ''}`}
          onMouseEnter={() => handleEnter(key)}
          onMouseLeave={handleLeave}
        >
          <div className="zp-label">{LABELS[key][lang]}</div>
          <div className="zp-options">
            {OPTIONS[key].map(opt => (
              <button
                key={opt.val}
                className={`zp-option ${currentValue(key) === opt.val ? 'zp-current' : ''}`}
                onClick={() => applyValue(key, opt.val)}
              >
                {opt.label[lang]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
