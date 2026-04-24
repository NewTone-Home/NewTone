import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { GlitchText } from './GlitchText';
import { UI_TRANSLATIONS } from '../locales';
import ChapterNav from './ChapterNav';
import { ChapterBody } from './ChapterBody';
import { ZhupiAnnotations } from './ZhupiAnnotations';
import { getRouteProgress, getTotalChaptersForRoute } from '../services/progressService';
import { Route } from '../types';

export interface CharacterCardProps {
  data: any;
  locked?: boolean;
  active?: boolean;
  reading?: boolean;
  currentChapter?: number;
  onSelect?: () => void;
  onStartReading?: () => void;
  onExitReading?: () => void;
  onChapterSelect?: (chapter: number) => void;
}

export function CharacterCard({ 
  data, 
  locked, 
  active, 
  reading,
  currentChapter, 
  onSelect,
  onStartReading,
  onExitReading,
  onChapterSelect
}: CharacterCardProps) {
  const navigate = useNavigate();
  const { lang } = useTheme();

  const ctaText = {
    zh: '启封 →',
    en: 'UNLOCK →',
    ja: '启封 →'
  };

  const sealedLabel = {
    zh: '封 · 缄',
    en: 'SEALED',
    ja: '封·緘'
  };
  
  const forbiddenLabel = {
    zh: '封 · 缄 · 不得启',
    en: 'SEALED · FORBIDDEN',
    ja: '封·緘·開くべからず'
  };

  return (
    <div
      className="card"
      data-locked={locked || undefined}
      data-active={active || undefined}
      data-reading={reading || undefined}
      style={{ '--char-color': data.colorHex } as React.CSSProperties}
      onClick={() => {
        if (locked) return
        onSelect?.()
      }}
    >
      <div className="card-gradient" />
      
      {/* === Direct children for texture === */}
      {!locked && <div className="cd-anchor-char">{data.anchor}</div>}
      {locked && (
        <>
          <div className="cd-wax">{data?.seal?.kanji}</div>
          <div className="cd-anchor-blur" />
        </>
      )}

      {/* === compact 默认态 === */}
      <div className="card-default">
        <div className="cd-top">
          <div className="cd-roman">{data.romanIndex}</div>
          <div className="cd-vol">{data.volumeNum[lang]}</div>
          <div className="cd-trigram">{data.trigram}</div>
        </div>

        <div className="cd-anchor">
          {/* Moved to root level */}
        </div>

        <div className="cd-bottom">
          {!locked ? (
            <>
              <div className="cd-name-zh">{data?.name?.zh || ''}</div>
              <div className="cd-name-latin">{data?.name?.en || ''}</div>
              <div className="cd-swatch">
                <span className="cd-swatch-box" style={{ background: data?.colorHex }} />
                <span>{data?.colorLabel?.[lang]}</span>
              </div>
            </>
          ) : (
            <>
              <div className="cd-wax-label">{sealedLabel[lang]}</div>
            </>
          )}
        </div>
      </div>

      {/* === 普通 detail 态 === */}
      {!locked && (
        <div className="card-detail">
          <div className={`cd-header cd-header-full ${reading ? 'cd-header-collapsed' : ''}`}>
            <div className="dt-header">
              <span>{data?.romanIndex} · {data?.volumeNum?.[lang]}</span>
              <span>{data?.trigram} · {data?.epithet?.[lang]} · {data?.colorLabel?.[lang]} · {data?.colorHex}</span>
            </div>
            <div className="dt-anchor">{data?.anchor}</div>
            <h1 className="dt-name-zh">{data?.name?.zh}</h1>
            {data?.alias && (
              <div className="dt-alias" style={{ fontSize: '14px', opacity: 0.7, marginTop: '-4px', marginBottom: '8px', fontFamily: 'var(--font-sans)', color: 'var(--brass)' }}>
                {data.alias[lang]}
              </div>
            )}
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
              <span className="cd-compact-symbol">{data.trigram}</span>
              <span className="cd-compact-name">{data?.name?.zh}</span>
            </div>
          )}

          <div className="dt-reader-block" id="character-reader-block">
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
                  id="character-progress-line"
                  style={{ '--progress': (getRouteProgress(data.id).readChapters.length / getTotalChaptersForRoute(data.id)) } as React.CSSProperties}
                />
                <ChapterBody 
                  route={data.id}
                  currentChapter={currentChapter ?? 1}
                  charColor={data.colorHex}
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
      )}

      {/* === 锁定 detail 态（震颤 + 火漆 + 朱批） === */}
      {locked && (
        <div className="card-detail locked-detail">
          {data?.seal && <GlitchText text={data.seal.kanji} />}
          <div className="dt-red-stamp">{data?.seal?.kanji}</div>
          <div className="dt-unlock-hint">{data?.unlockHint?.[lang]}</div>
          <div className="dt-paper-lines" />
        </div>
      )}
    </div>
  );
}
