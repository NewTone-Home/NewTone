import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { GlitchText } from './GlitchText';
import { ROUTE_FALLBACK, UI_TRANSLATIONS } from '../locales';
import ChapterNav from './ChapterNav';
import { ChapterBody } from './ChapterBody';
import { ZhupiAnnotations } from './ZhupiAnnotations';
import SealedWarning from './SealedWarning';
import { CoinButton } from './CoinButton';
import { getRouteProgress, getTotalChaptersForRoute, markChapterRead } from '../services/progressService';
import { Route } from '../types';

export interface CharacterCardProps {
  data: any;
  locked?: boolean;
  active?: boolean;
  reading?: boolean;
  isClosing?: boolean;
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
  isClosing,
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
      data-reading={(reading || isClosing) || undefined}
      data-closing={isClosing || undefined}
      style={{ '--char-color': data.colorHex, position: 'relative' } as React.CSSProperties}
      onClick={() => {
        onSelect?.()
      }}
    >
      <div className="card-gradient" />
      
      {/* === Direct children for texture === */}
      {!locked && <div className="cd-anchor-char">{data.anchor}</div>}
      {locked && (
        <>
          <div 
            className="cd-wax" 
            style={{ 
              position: 'absolute', 
              bottom: '72px', 
              left: '24px', 
              width: '68px', 
              height: '68px', 
              borderRadius: '50%',
              background: '#8B2F28',
              color: '#F3E9D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontFamily: '"Songti SC", "Source Han Serif SC", serif',
              fontWeight: 'bold',
              transform: 'rotate(-4deg)',
              zIndex: 10,
              filter: 'saturate(0.95)',
              boxShadow: '0 0 1px 1px rgba(139, 47, 40, 0.4)'
            }}
          >
            {data?.seal?.kanji}
          </div>
          <div 
            className="cd-anchor-blur" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }} 
          />
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

      {/* === 内容层 (通过 AnimatePresence 实现丝滑切换) === */}
      <AnimatePresence mode="wait">
        {(active || isClosing) && !locked && (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={isClosing ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="card-detail" 
            data-reading={reading || isClosing}
          >
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
                <span className="cd-compact-symbol">☰</span>
                <span className="cd-compact-name">
                  {ROUTE_FALLBACK[data.id] || data?.name?.zh}
                </span>
              </div>
            )}

            <div className="dt-reader-block" id="character-reader-block">
              {reading && (
                <>
                  <button 
                    className="back-to-letter" 
                    onClick={(e) => { e.stopPropagation(); onExitReading?.() }}
                  >← 合卷</button>
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
                    key={`${data.id}-${currentChapter}`}
                    route={data.id}
                    currentChapter={currentChapter ?? 1}
                    charColor={data.colorHex}
                    isClosing={isClosing}
                    onAdvance={(n) => onChapterSelect?.(n)}
                  />

                  <div className="cb-coin-wrap">
                    <CoinButton 
                      charColor={data.colorHex}
                      onNext={() => {
                        const total = getTotalChaptersForRoute(data.id);
                        const cur = currentChapter ?? 1;
                        markChapterRead(data.id, cur, cur);
                        if (cur < total) {
                          onChapterSelect?.(cur + 1);
                        }
                      }}
                      disabled={(currentChapter ?? 1) >= getTotalChaptersForRoute(data.id)}
                    />
                  </div>
                </>
              )}
            </div>

            {!reading && (
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
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === 锁定 detail 态（震颤 + 火漆 + 朱批） === */}
      {locked && (
        <div className="card-detail locked-detail" style={active ? { animation: 'none' } : {}}>
          {active && !reading && (
            <>
              <div 
                className="dt-red-stamp" 
                style={{ 
                  position: 'absolute', 
                  bottom: '72px', 
                  left: '24px', 
                  width: '68px', 
                  height: '68px', 
                  borderRadius: '50%',
                  background: '#8B2F28',
                  color: '#F3E9D0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontFamily: '"Songti SC", "Source Han Serif SC", serif',
                  fontWeight: 'bold',
                  transform: 'rotate(-4deg)',
                  margin: 0,
                  zIndex: 10,
                  filter: 'saturate(0.95)',
                  boxShadow: '0 0 1px 1px rgba(139, 47, 40, 0.4)'
                }}
              >
                {data?.seal?.kanji}
              </div>
              <div className="dt-paper-lines" />
            </>
          )}

          {active && (
            <SealedWarning onBack={() => onSelect?.()} />
          )}
        </div>
      )}
    </div>
  );
}
