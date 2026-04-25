import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { HeaderPhase } from './GlobalHeader';

export const PageToolPill: React.FC<{ phase?: HeaderPhase }> = ({ phase = 'idle' }) => {
  const { theme, setTheme, lang, setLang } = useTheme();
  const [pillMode, setPillMode] = useState<'theme' | 'lang'>(() => {
    return (localStorage.getItem('pill-mode') as 'theme' | 'lang') || 'theme';
  });
  const [showOptions, setShowOptions] = useState(false);
  const [modePhase, setModePhase] = useState<'idle' | 'switching'>('idle');
  const [displayIcon, setDisplayIcon] = useState('');
  const hideTimerRef = useRef<number | undefined>(undefined);
  const hoveringRef = useRef(false);

  const themeOptions = [
    { value: 'day', icon: '☀' },
    { value: 'night', icon: '☾' }
  ];
  const langOptions = [
    { value: 'zh', icon: '中' },
    { value: 'en', icon: 'EN' },
    { value: 'ja', icon: '日' }
  ];

  const getIconFor = (mode: 'theme' | 'lang') => {
    if (mode === 'theme') {
      return themeOptions.find(o => o.value === theme)?.icon || '☀';
    }
    return langOptions.find(o => o.value === lang)?.icon || '中';
  };

  useEffect(() => {
    if (modePhase === 'idle') {
      setDisplayIcon(getIconFor(pillMode));
    }
  }, [pillMode, theme, lang, modePhase]);

  useEffect(() => {
    localStorage.setItem('pill-mode', pillMode);
  }, [pillMode]);

  const handleEnter = () => {
    hoveringRef.current = true;
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    if (modePhase === 'idle') setShowOptions(true);
  };

  const handleLeave = () => {
    hoveringRef.current = false;
    if (modePhase !== 'idle') return;
    hideTimerRef.current = window.setTimeout(() => {
      setShowOptions(false);
    }, 1500);
  };

  const handlePillClick = () => {
    if (modePhase !== 'idle') return;
    const newMode = pillMode === 'theme' ? 'lang' : 'theme';
    
    setModePhase('switching');
    
    // ① 立即：收选项 + 滑块回升
    setShowOptions(false);
    
    // ② 400ms 后：滑块已回到药丸内，切换 pillMode
    setTimeout(() => {
      setPillMode(newMode);
    }, 400);
    
    // ③ 750ms 后：滑块已到位，切换图标
    setTimeout(() => {
      setDisplayIcon(getIconFor(newMode));
    }, 750);
    
    // ④ 800ms 后：若用户仍在 hover，重新展开
    setTimeout(() => {
      setModePhase('idle');
      if (hoveringRef.current) {
        setShowOptions(true);
      }
    }, 800);
  };

  const currentOptions = pillMode === 'theme' ? themeOptions : langOptions;
  const currentValue = pillMode === 'theme' ? theme : lang;

  const applyValue = (val: string) => {
    if (pillMode === 'theme') {
      setTheme(val as 'day' | 'night');
    } else {
      setLang(val as 'zh' | 'en' | 'ja');
    }
  };

  return (
    <div 
      className={`theme-pill-group ${phase === 'vanishing' ? 'pill-vanishing' : ''}`}
      style={{ display: phase === 'gone' ? 'none' : 'flex' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* 药丸本体 */}
      <div 
        className="yinyang-pill"
        onClick={handlePillClick}
      >
        {/* 背后太极图腾（默认被滑块遮住） */}
        <div className={`pill-taiji-bg pos-${pillMode}`}>☯</div>
        
        {/* 滑块：绝对定位，左右切换 */}
        <div className={`pill-slider pos-${pillMode} ${showOptions ? 'dropped' : ''}`}>
          <span key={displayIcon} className="slider-icon">{displayIcon}</span>
        </div>
      </div>
      
      {/* 下方选项（排除当前值，stagger 淡入，对齐滑块轴线） */}
      <div className={`header-options ${pillMode === 'theme' ? 'align-left' : 'align-right'} ${showOptions ? 'visible' : ''}`}>
        {currentOptions
          .filter(opt => opt.value !== currentValue)
          .map((opt, i) => (
            <button 
              key={opt.value}
              className="header-option"
              style={{ '--opt-i': i } as React.CSSProperties}
              onClick={(e) => {
                e.stopPropagation();
                applyValue(opt.value);
              }}
            >
              {opt.icon}
            </button>
          ))}
      </div>
    </div>
  );
};

