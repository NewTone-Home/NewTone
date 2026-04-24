import React, { useState } from 'react'

type Props = {
  charColor: string
  onNext: () => void
  disabled?: boolean
}

export const CoinButton: React.FC<Props> = ({ charColor, onNext, disabled }) => {
  const [flipping, setFlipping] = useState(false)
  const [hover, setHover] = useState(false)
  
  const handleClick = () => {
    if (disabled || flipping) return
    setFlipping(true)
    setTimeout(() => {
      onNext()
      setFlipping(false)
    }, 600)
  }
  
  return (
    <button
      className={`cb-coin ${hover ? 'cb-hover' : ''} ${flipping ? 'cb-flipping' : ''} ${disabled ? 'cb-disabled' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ '--cb-color': charColor } as React.CSSProperties}
      aria-label="下一章"
    >
      <svg viewBox="0 0 48 48" width="44" height="44">
        {/* 外圆 */}
        <circle cx="24" cy="24" r="19" fill="none" 
                stroke="currentColor" strokeWidth="1.5" />
        {/* 内层细圈（装饰），外圆往里收 2.5px */}
        <circle cx="24" cy="24" r="16.5" fill="none"
                stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        {/* 方孔 */}
        <rect x="19" y="19" width="10" height="10" fill="none"
              stroke="currentColor" strokeWidth="1.5" />
        {/* 四决纹：方孔四角向外延伸的短斜线 */}
        <line x1="19" y1="19" x2="15" y2="15" 
              stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <line x1="29" y1="19" x2="33" y2="15"
              stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <line x1="19" y1="29" x2="15" y2="33"
              stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <line x1="29" y1="29" x2="33" y2="33"
              stroke="currentColor" strokeWidth="1" opacity="0.7" />
      </svg>
      <span className="cb-label">下一章 →</span>
    </button>
  )
}
