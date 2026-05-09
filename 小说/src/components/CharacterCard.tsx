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
import { listChapters } from '../services/chapterLoader';
import { getRouteProgress, getTotalChaptersForRoute, markChapterRead as markChapterReadLegacy, isChapterUnlocked } from '../services/progressService';
import { Route } from '../types';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { JIXIU_CH_METADATA } from '../data';

import { ScrambleText } from './ScrambleText';

import { FadeText } from './FadeText';

export interface CharacterCardProps {
  data: any;
  locked?: boolean;
  active?: boolean;
  reading?: boolean;
  isClosing?: boolean;
  currentChapter?: number;
  lang?: string;
  onSelect?: () => void;
  onStartReading?: () => void;
  onExitReading?: () => void;
  onChapterSelect?: (chapter: number) => void;
}

const SEALED_LABEL = {
  zh: '封 · 印 · 缄',
  en: 'SEALED',
  ja: '封·印·緘'
};

const FORBIDDEN_LABEL = {
  zh: '封 · 印 · 缄 · 不得启',
  en: 'SEALED · FORBIDDEN',
  ja: '封·印·緘·开くべからず'
};

const SEAL_GLYPHS = {
  ruoyu: '封',
  yunling: '印',
  chengyuan: '缄'
};

const CTA_TEXT = {
  zh: UI_TRANSLATIONS['zh']['jixiu.cta'],
  en: UI_TRANSLATIONS['en']['jixiu.cta'],
  ja: UI_TRANSLATIONS['ja']['jixiu.cta']
};

const BACK_TEXT = {
  zh: UI_TRANSLATIONS['zh']['jixiu.back'],
  en: UI_TRANSLATIONS['en']['jixiu.back'],
  ja: UI_TRANSLATIONS['ja']['jixiu.back']
};

const ActionText = ({ children, forceScramble, routeId, reading }: { children: string, forceScramble?: boolean, routeId: string, reading: boolean }) => {
  if (forceScramble) return <ScrambleText text={children} />;
  if (routeId === 'jixiu') {
    if (reading) return <ScrambleText text={children} />;
    return <FadeText>{children}</FadeText>;
  }
  return <ScrambleText text={children} />;
};

export function CharacterCard({ 
  data, 
  locked, 
  active, 
  reading,
  isClosing,
  currentChapter: currentChapterProp, 
  lang: langProp,
  onSelect,
  onStartReading,
  onExitReading,
  onChapterSelect
}: CharacterCardProps) {
  const navigate = useNavigate();
  const { lang: contextLang } = useTheme();
  const lang = langProp ?? contextLang;
  
  const currentChapter = currentChapterProp ?? 1;
  const { progress, markRead } = useReadingProgress(data.id as Route);
  const chapters = React.useMemo(() => listChapters(data.id as Route), [data.id]);
  const totalChapters = chapters.length;

  const [effectiveLang, setEffectiveLang] = React.useState(lang);
  const isJixiuDetail = active && data.id === 'jixiu';

  const unsealed = !locked;

  const currentVolumeLabel = React.useMemo(() => {
    if (!unsealed) return (SEALED_LABEL as any)[effectiveLang];
    const labels: Record<string, any> = {
      jixiu:    { zh: '卷其一', en: 'VOL. I', ja: '巻其一' },
      ruoyu:    { zh: '卷其二', en: 'VOL. II', ja: '巻其二' },
      yunling:  { zh: '卷其三', en: 'VOL. III', ja: '巻其三' },
      chengyuan:{ zh: '卷其四', en: 'VOL. IV', ja: '巻其四' }
    };
    return labels[data.id]?.[effectiveLang] || '';
  }, [data.id, unsealed, effectiveLang]);

  React.useEffect(() => {
    if (active) {
      if (lang !== effectiveLang) {
        const timer = setTimeout(() => {
          setEffectiveLang(lang);
        }, 300); 
        return () => clearTimeout(timer);
      }
    } else {
      setEffectiveLang(lang);
    }
  }, [lang, active, effectiveLang]);

  const isTransitioning = active && lang !== effectiveLang;

  // URL Protection for jixiu
  React.useEffect(() => {
    if (active && reading && data.id === 'jixiu') {
      if (currentChapter > progress + 1) {
        console.log(`[Card] Redirecting from ch${currentChapter} to ch${progress + 1}`);
        navigate(`/read/${data.id}/${progress + 1}`, { replace: true });
        onChapterSelect?.(progress + 1);
      }
    }
  }, [active, reading, data.id, currentChapter, progress, navigate, onChapterSelect]);

  // Meta data computing for jixiu
  const dynamicMeta = React.useMemo(() => {
    if (data.id !== 'jixiu') return data.metadata;
    
    // 见
    const appearsMap: Record<number, any> = {
      0: { zh: '见·第一章', en: 'Ch.1', ja: '第一章' },
      1: { zh: '见·第一章', en: 'Ch.1', ja: '第一章' }, // If they haven't finished ch1, they are reading ch1
    };
    
    const t = (key: string) => UI_TRANSLATIONS[effectiveLang][key] || '';
    
    // N is the number of chapters COMPLETE.
    const currentUnlockedIndex = Math.min(progress + 1, totalChapters);
    const zhNums = ['', '一', '二', '三', '四', '五', '六', '七', '八'];
    
    const zhAppears = `第${zhNums[currentUnlockedIndex]}章`;
    const enAppears = `Ch.${currentUnlockedIndex}`;
    const jaAppears = `第${zhNums[currentUnlockedIndex]}章`;

    const appearsInfo = {
      zh: `${t('meta.appears')}·${zhAppears}`,
      en: `${t('meta.appears')}·${enAppears}`,
      ja: `${t('meta.appears')}·${jaAppears}`
    };
    
    // 字
    const wordSum = JIXIU_CH_METADATA.slice(0, progress + 1).reduce((acc, ch) => acc + ch.words, 0);
    
    const sumsMap: Record<number, any> = {
      1150: { zh: '一千一百', en: '1,100', ja: '千百' },
      1850: { zh: '一千八百', en: '1,800', ja: '千八百' },
      3550: { zh: '三千五百', en: '3,550', ja: '三千五百' },
    };
    const s = sumsMap[wordSum] || { zh: wordSum.toString(), en: wordSum.toLocaleString(), ja: wordSum.toString() };

    const wordsInfo = {
      zh: `${t('meta.wordCount')}·约${s.zh}`,
      en: `~${s.en} ${t('meta.wordCount')}`,
      ja: `約${s.ja}${t('meta.wordCount')}`
    };

    return {
      ...data.metadata,
      appears: appearsInfo,
      words: wordsInfo
    };
  }, [data.id, data.metadata, progress, totalChapters, effectiveLang]);

  const nextChapterNum = currentChapter + 1;
  const hasNextInVolume = nextChapterNum <= totalChapters;
  const isNextUnlocked = isChapterUnlocked(data.id as Route, nextChapterNum);
  
  const [atBottom, setAtBottom] = React.useState(false);
  const [shakeTrigger, setShakeTrigger] = React.useState(0);

  React.useEffect(() => {
    setAtBottom(false);
  }, [currentChapter, data.id]);

  const showCoin = hasNextInVolume && atBottom;

  const initialShowCoin = React.useRef(showCoin);

  const [isGlitching, setIsGlitching] = React.useState(false);
  const [manualLockedOverlay, setManualLockedOverlay] = React.useState(false);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setManualLockedOverlay(true);
    // Only stop the CARD shake after 2s, keep the overlay
    setTimeout(() => {
      setIsGlitching(false);
    }, 2000);
  };

  return (
    <div
      className={`card ${isGlitching ? 'is-glitching' : ''}`}
      data-locked={locked || undefined}
      data-active={active || undefined}
      data-reading={(reading || isClosing) || undefined}
      data-closing={isClosing || undefined}
      style={{ '--char-color': data.colorHex, position: 'relative' } as React.CSSProperties}
      onClick={(e) => {
        // 封缄态不再拦截点击，允许正常路由跳转到专属封禁页
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
            {SEAL_GLYPHS[data.id as keyof typeof SEAL_GLYPHS] || data?.seal?.kanji}
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
          <div className="cd-vol">{currentVolumeLabel}</div>
          <div className="cd-trigram">{data.trigram}</div>
        </div>

        <div className="cd-anchor">
          {/* Moved to root level */}
        </div>

        <div className="cd-bottom">
          {!locked ? (
            <>
              <div className="cd-name-zh">
                <ActionText routeId={data.id} reading={reading}>{data?.name?.zh || UI_TRANSLATIONS['zh'][`route.${data.id}.label`] || ''}</ActionText>
              </div>
              {effectiveLang === 'en' && (
                <div className="cd-name-latin">
                  <ActionText routeId={data.id} reading={reading}>{data?.name?.en || ''}</ActionText>
                </div>
              )}
              <div className="cd-swatch">
                <span className="cd-swatch-box" style={{ background: data?.colorHex }} />
                <span><ActionText routeId={data.id} reading={reading}>{data?.colorLabel?.[effectiveLang]}</ActionText></span>
              </div>
            </>
          ) : (
            <>
              <div className="cd-wax-label"><ActionText routeId={data.id} reading={reading}>{(SEALED_LABEL as any)[effectiveLang]}</ActionText></div>
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: (reading || isClosing) ? '100vh' : '100%',
              overflow: (reading || isClosing) ? 'hidden' : 'visible'
            }}
          >
            <div className="cd-content-wrap" style={{ 
              opacity: isTransitioning ? 0 : 1, 
              transition: 'opacity 0.35s ease-in-out, height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              height: reading ? '0px' : 'auto',
              overflow: reading ? 'hidden' : 'visible',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {!reading && <div className="dt-anchor">{data?.anchor}</div>}
              <div className={`cd-header cd-header-full ${reading ? 'cd-header-collapsed' : ''}`}>
                  <div className="dt-header">
                    <span><ActionText routeId={data.id} reading={!!reading}>{`${data?.romanIndex} · ${currentVolumeLabel}`}</ActionText></span>
                    <span>
                      <ActionText routeId={data.id} reading={!!reading}>{data.id === 'jixiu' ? data?.colorLabel?.[effectiveLang] : `${data?.trigram} · ${data?.epithet?.[effectiveLang]} · ${data?.colorLabel?.[effectiveLang]} · ${data?.colorHex}`}</ActionText>
                    </span>
                  </div>
                  <h1 className="dt-name-zh">
                    <ActionText routeId={data.id} reading={!!reading}>{data?.name?.zh || UI_TRANSLATIONS['zh'][`route.${data.id}.label`] || ''}</ActionText>
                  </h1>
                  {data?.alias && (
                    <div className="dt-alias" style={{ fontSize: '14px', opacity: 0.7, marginTop: '-4px', marginBottom: '8px', fontFamily: 'var(--font-sans)', color: 'var(--brass)' }}>
                      <ActionText routeId={data.id} reading={!!reading}>{data.alias[effectiveLang]}</ActionText>
                    </div>
                  )}
                  {effectiveLang === 'en' && (
                    <>
                      <div className="dt-name-latin">
                        <ActionText routeId={data.id} reading={!!reading}>{data?.name?.en}</ActionText>
                      </div>
                      <div className="dt-name-ja">
                        <ActionText routeId={data.id} reading={!!reading}>{data?.name?.ja}</ActionText>
                      </div>
                    </>
                  )}
                  <div className="dt-identity">
                    <ActionText routeId={data.id} reading={!!reading}>{data?.identity?.[effectiveLang]}</ActionText>
                  </div>
                  <div className="dt-divider">· · ·</div>

                  <div className="dt-preview-block">
                    <blockquote className="dt-quote">
                      <ActionText routeId={data.id} reading={!!reading}>{data?.quote?.[effectiveLang]}</ActionText>
                    </blockquote>
                    <button className="dt-cta" onClick={e => { e.stopPropagation(); onStartReading?.() }}>
                      <ActionText routeId={data.id} reading={!!reading}>{(CTA_TEXT as any)[effectiveLang]}</ActionText>
                    </button>
                  </div>
                </div>
              </div>

            {reading && (
                  <div className="cd-compact-wrap" style={{ opacity: (data.id === 'jixiu' ? 1 : (isTransitioning ? 0 : 1)), transition: 'opacity 0.35s ease-in-out' }}>
                    <div className="cd-header cd-header-compact">
                      {data.id === 'jixiu' ? (
                        <>
                          <span className="cd-compact-symbol">☰</span>
                          <span className="cd-compact-name">
                            <ActionText routeId={data.id} reading={!!reading}>{UI_TRANSLATIONS[effectiveLang][`route.${data.id}.label`] || ROUTE_FALLBACK[data.id]}</ActionText>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="cd-compact-symbol">{data.trigram}</span>
                          <span className="cd-compact-name">
                            <ActionText routeId={data.id} reading={!!reading}>{UI_TRANSLATIONS[effectiveLang][`route.${data.id}.label`] || ROUTE_FALLBACK[data.id]}</ActionText>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
            )}

            <div 
              className="dt-reader-block" 
              id="character-reader-block"
              onClick={e => e.stopPropagation()} // Protect inner clicks from closing the card
            >
              {reading && (
                <>
                  <button 
                    className="back-to-letter" 
                    onClick={(e) => { e.stopPropagation(); onExitReading?.() }}
                  >
                    {data.id === 'jixiu' ? (
                      <ScrambleText text={(BACK_TEXT as any)[effectiveLang]} />
                    ) : (
                      data.id === 'jixiu' ? (BACK_TEXT as any)[effectiveLang] : (UI_TRANSLATIONS[lang as any]?.['read.close'] || '← BACK')
                    )}
                  </button>
                  <ZhupiAnnotations lang={effectiveLang} />
                  <ChapterNav 
                    route={data.id} 
                    currentChapter={currentChapter}
                    onSelect={(n) => onChapterSelect?.(n)}
                    lang={effectiveLang}
                  />
                  <div 
                    className="dt-progress-line" 
                    id="character-progress-line"
                    style={{ '--progress': (progress / totalChapters) } as React.CSSProperties}
                  />
                    <ChapterBody 
                      key={`${data.id}-${currentChapter}`}
                      route={data.id}
                      currentChapter={currentChapter}
                      charColor={data.colorHex}
                      isClosing={isClosing}
                      lang={effectiveLang}
                      onAdvance={(n) => onChapterSelect?.(n)}
                      onAtBottomChange={(val) => setAtBottom(val)}
                    />

                    <div className="cb-coin-wrap">
                      <AnimatePresence>
                        {showCoin && (
                          <motion.div
                            key="coin"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: 1, 
                              x: shakeTrigger ? [0, -10, 10, -10, 10, 0] : 0
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              opacity: { duration: 0.4 },
                              x: { duration: 0.4, ease: "easeInOut" }
                            }}
                          >
                            <CoinButton 
                              charColor={data.colorHex}
                              route={data.id}
                              onNext={() => {
                                if (!isNextUnlocked) {
                                  console.log(`[Coin] Next chapter ${nextChapterNum} is locked.`);
                                  setShakeTrigger(prev => prev + 1);
                                  // Reset shake trigger after animation
                                  setTimeout(() => setShakeTrigger(0), 500);
                                  return;
                                }
                                
                                const cur = currentChapter;
                                console.log(`[Coin] Clicked at ch${cur}`);
                                markRead(cur);
                                markChapterReadLegacy(data.id, cur, cur);
                                if (cur < totalChapters) {
                                  onChapterSelect?.(cur + 1);
                                }
                              }}
                              disabled={false} // Click is handled via isNextUnlocked logic above
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                </>
              )}
            </div>

            {!reading && (
              <div className="dt-meta" style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.35s ease-in-out' }}>
                {dynamicMeta && (
                  <>
                    <span><ActionText routeId={data.id} reading={false}>{currentVolumeLabel}</ActionText></span>
                    <motion.span
                      key={dynamicMeta.appears[effectiveLang]}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ActionText routeId={data.id} reading={false}>{dynamicMeta.appears[effectiveLang]}</ActionText>
                    </motion.span>
                    <motion.span
                      key={dynamicMeta.words[effectiveLang]}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ActionText routeId={data.id} reading={false}>{dynamicMeta.words[effectiveLang]}</ActionText>
                    </motion.span>
                    <span><ActionText routeId={data.id} reading={false}>{dynamicMeta.role?.[effectiveLang]}</ActionText></span>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === 锁定 detail 态（震颤 + 火漆 + 朱批） === */}
      {locked && (
        <div className="card-detail locked-detail" style={(active || manualLockedOverlay) ? { animation: 'none' } : {}}>
          {(active || manualLockedOverlay) && !reading && (
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
                {SEAL_GLYPHS[data.id as keyof typeof SEAL_GLYPHS] || data?.seal?.kanji}
              </div>
              <div className="dt-paper-lines" />
            </>
          )}

          {(active || manualLockedOverlay) && (
            <SealedWarning 
              unlockHint={data.unlockHint} 
              lang={effectiveLang} 
              showBack={false}
            />
          )}
        </div>
      )}
    </div>
  );
}
