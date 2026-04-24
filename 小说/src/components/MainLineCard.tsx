import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ChapterNav from './ChapterNav';
import { ChapterBody } from './ChapterBody';
import { ZhupiAnnotations } from './ZhupiAnnotations';
import { getRouteProgress, getTotalChaptersForRoute } from '../services/progressService';
import { Route } from '../types';

export interface MainLineCardProps {
  data: any;
  active?: boolean;
  reading?: boolean;
  currentChapter?: number;
  onSelect?: () => void;
  onStartReading?: () => void;
  onExitReading?: () => void;
  onChapterSelect?: (chapter: number) => void;
}

export function MainLineCard({ 
  data, 
  active, 
  reading,
  currentChapter, 
  onSelect,
  onStartReading,
  onExitReading,
  onChapterSelect
}: MainLineCardProps) {
  const navigate = useNavigate();
  const { lang } = useTheme();

  const ctaText = {
    zh: '启封 →',
    en: 'UNLOCK →',
    ja: '启封 →'
  };

  return (
    <div
      className="card"
      data-active={active || undefined}
      data-reading={reading || undefined}
      style={{ '--char-color': '#8B6F3E' } as React.CSSProperties}
      onClick={() => {
        onSelect?.()
      }}
    >
      <div className="card-gradient" />
      
      {/* === Direct child for texture === */}
      <div className="cd-anchor-char">{data?.anchor}</div>

      {/* === compact 默认态 === */}
      <div className="card-default">
        <div className="cd-top">
          <div className="cd-roman">{data?.romanIndex}</div>
          <div className="cd-vol">{data?.volumeNum?.[lang]}</div>
          <div className="cd-trigram">{data?.trigram}</div>
        </div>

        <div className="cd-anchor">
          {/* Moved to root level */}
        </div>

        <div className="cd-bottom">
          <div className="cd-name-zh">{data?.name?.zh || ''}</div>
          <div className="cd-name-latin">{data?.name?.en || ''}</div>
          <div className="cd-swatch">
            <span className="cd-swatch-box" style={{ background: data?.colorHex }} />
            <span>{data?.colorLabel?.[lang]}</span>
          </div>
        </div>
      </div>

      {/* === 普通 detail 态 === */}
      <div className="card-detail">
        <div className={`cd-header cd-header-full ${reading ? 'cd-header-collapsed' : ''}`}>
          <div className="dt-header">
            <span>{data?.romanIndex} · {data?.volumeNum?.[lang]}</span>
            <span>{data?.trigram} · {data?.epithet?.[lang]} · {data?.colorLabel?.[lang]} · {data?.colorHex}</span>
          </div>
          <div className="dt-anchor">{data?.anchor}</div>
          <h1 className="dt-name-zh">{data?.name?.zh}</h1>
          <div className="dt-name-latin">{data?.name?.en}</div>
          <div className="dt-name-ja">{data?.name?.ja}</div>
          <div className="dt-identity">{data?.identity?.[lang]}</div>
          <div className="dt-divider">· · ·</div>

          <div className="dt-preview-block">
            <blockquote className="dt-quote">{data?.quote?.[lang]}</blockquote>
            <button className="dt-cta" onClick={e => { e.stopPropagation(); onStartReading?.() }}>
              {ctaText[lang]}
            </button>
          </div>
        </div>

        {reading && (
          <div className="cd-header cd-header-compact">
            <span className="cd-compact-symbol">☯</span>
            <span className="cd-compact-name">{data?.name?.zh}</span>
          </div>
        )}

        <div className="dt-reader-block" id="mainline-reader-block">
          <button 
            className="back-to-letter" 
            onClick={(e) => { e.stopPropagation(); onExitReading?.() }}
          >← 合卷</button>
          {reading && (
            <>
              <ZhupiAnnotations />
              <ChapterNav 
                route={data.id} 
                currentChapter={currentChapter ?? 1}
                onSelect={(n) => onChapterSelect?.(n)}
              />
              <div 
                className="dt-progress-line" 
                id="mainline-progress-line"
                style={{ '--progress': (getRouteProgress(data.id).readChapters.length / getTotalChaptersForRoute(data.id)) } as React.CSSProperties}
              />
              <ChapterBody 
                route={data.id}
                currentChapter={currentChapter ?? 1}
                charColor={data?.colorHex || '#8B6F3E'}
                onAdvance={(n) => onChapterSelect?.(n)}
              />
            </>
          )}
        </div>

        <div className="dt-meta">
          {data?.metadata && (
            <>
              <span>{data.metadata.volumeNum?.[lang]}</span>
              <span>{data.metadata.appears?.[lang]}</span>
              <span>{data.metadata.words?.[lang]}</span>
              <span>{data.metadata.role?.[lang]}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
