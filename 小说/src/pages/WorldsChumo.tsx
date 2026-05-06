import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { GlobalHeader } from '../components/GlobalHeader';
import { CharacterCard } from '../components/CharacterCard';
import { isVolumeUnsealed } from '../services/progressService';
import { Route as ReadingRoute } from '../types';
import { ScrambleText } from '../components/ScrambleText';

const CHARACTERS = [
  {
    id: 'jixiu',
    romanIndex: 'I',
    trigram: '☰',
    anchor: '札',
    colorHex: '#C4E5EA',
    colorLabel: { zh: '青白', en: 'QINGBAI', ja: '青白' },
    volumeNum: { zh: '卷其一', en: 'VOL. I', ja: '巻其一' },
    name: { zh: '姬修杰·札', en: null, ja: null },
    epithet: { zh: '札', en: 'LETTER', ja: '札' },
    identity: { zh: '执子者·亦为子', en: 'He who plays, and is played.', ja: '駒を運ぶ者、また駒なり' },
    quote: { zh: '「我不在棋盘外，我只是还没看见自己脚下的格子。」', en: '"I\'m not outside the board. I just haven\'t seen the square beneath my feet yet."', ja: '「私は盤の外にいるのではない。ただ、自分の足元の格がまだ見えていないだけだ。」' },
    metadata: {
      appears: { zh: '见·第一章·第二章', en: 'Ch.1 – Ch.2', ja: '第一章・第二章' },
      words: { zh: '字·约四千', en: '~4,000 words', ja: '約四千字' },
      role: { zh: '别·三人称限知', en: '3rd-person limited', ja: '三人称限定' }
    },
    unlock: 0,
    route: '/read/jixiu/1'
  },
  {
    id: 'ruoyu',
    romanIndex: 'II',
    trigram: '☱',
    anchor: '筮',
    colorHex: '#A83535',
    colorLabel: { zh: '朱砂', en: 'ZHUSHA', ja: '朱砂' },
    volumeNum: { zh: '卷其二', en: 'VOL. II', ja: '巻其二' },
    name: { zh: '孙若雨·筮', en: 'SUN RUOYU', ja: 'ソン・ルオユ' },
    epithet: { zh: '筮', en: 'DIVINATION', ja: '筮' },
    identity: { zh: '商业策划·身世成谜的少女', en: 'Business planner · a girl with a mysterious past', ja: '商業企画・身世に謎を秘めた少女' },
    quote: { zh: '「灯火深处，那姑娘笑得无端熟悉。」', en: '"Deep in the lamplight, that girl smiled with inexplicable familiarity."', ja: '「灯火の奥、あの娘の笑みにそこはかとなき懐かしさ。」' },
    metadata: {
      volumeNum: { zh: '卷其二', en: 'VOL. II', ja: '巻其二' },
      appears: { zh: '见·第二章起字', en: 'APPEARS · FROM CH.2', ja: '登場·第二章より' },
      words: { zh: '字·约八千', en: 'WORDS · ~8,000', ja: '字数·約八千' },
      role: { zh: '别·筮辞 POV', en: 'ROLE · DIVINATION POV', ja: '役·筮辞 POV' }
    },
    unlock: 0,
    route: '/read/ruoyu/1'
  },
  {
    id: 'yunling',
    romanIndex: 'III',
    trigram: '☲',
    anchor: '笺',
    colorHex: '#D8A8A4',
    colorLabel: { zh: '桃樱', en: 'TAOYING', ja: '桃桜' },
    volumeNum: { zh: '封·缄', en: 'SEALED', ja: '封·緘' },
    name: { zh: '姬云灵·笺', en: 'JI YUNLING', ja: 'キ・ウンレイ' },
    epithet: { zh: '笺', en: 'NOTE', ja: '笺' },
    seal: { kanji: '封' },
    unlockHint: { zh: '启封条件·累计读完 3 章', en: 'Unlock · Total 3 Chapters', ja: '解封条件·累計三章読了' },
    unlock: 3,
    route: '/read/yunling/1'
  },
  {
    id: 'chengyuan',
    romanIndex: 'IV',
    trigram: '☶',
    anchor: '藏',
    colorHex: '#C19A5E',
    colorLabel: { zh: '青铜', en: 'QINGTONG', ja: '青銅' },
    volumeNum: { zh: '封·缄', en: 'SEALED', ja: '封·緘' },
    name: { zh: '姬承渊·藏', en: 'JI CHENGYUAN', ja: 'キ・ショウエン' },
    alias: { zh: '老爷子', en: 'The Old Master', ja: '御老人' },
    epithet: { zh: '藏', en: 'HIDDEN', ja: '蔵' },
    seal: { kanji: '缄' },
    unlockHint: { zh: '启封条件·累计读完 8 章', en: 'Unlock · Total 8 Chapters', ja: '解封条件·累計八章読了' },
    unlock: 8,
    route: '/read/chengyuan/1'
  }
];

export function WorldsChumo() {
  const navigate = useNavigate();
  const params = useParams();
  const { lang } = useTheme();
  const [effectiveLang, setEffectiveLang] = useState(lang);

  useEffect(() => {
    if (lang !== effectiveLang) {
      const timer = setTimeout(() => {
        setEffectiveLang(lang);
      }, 350); 
      return () => clearTimeout(timer);
    }
  }, [lang, effectiveLang]);

  const isTransitioning = lang !== effectiveLang;
  const selectedRoute = (params.route ?? undefined) as ReadingRoute | undefined;
  const currentChapter = params.chapter ? Number(params.chapter) : 1;

  const [isReading, setIsReading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // URL Guard: If route is sealed, kick back to library
  useEffect(() => {
    if (selectedRoute && !isVolumeUnsealed(selectedRoute)) {
       navigate('/library', { replace: true });
    }
  }, [selectedRoute, navigate]);

  const handleExitReading = () => {
    setIsClosing(true);
    // 700ms 动画结束后彻底清理状态
    setTimeout(() => {
      setIsReading(false);
      setIsClosing(false);
      navigate('/worlds/chumo');
    }, 700);
  };

  // 切换路线或回 L1 时自动退出阅读态
  useEffect(() => { setIsReading(false) }, [selectedRoute]);

  const title = { zh: '初墨卷 · 四卷选角', en: 'CHUMO · FOUR VOLUMES', ja: '初墨巻·四巻選角' };
  const back = { zh: '← 返回书架', en: '← Back to Library', ja: '← 書架に戻る' };

  const handleSelect = (id: ReadingRoute) => {
    if (isReading) return; // L3 状态，偷瞄卡不响应
    if (selectedRoute === id) {
      navigate('/worlds/chumo'); // 点自己则关闭，回 L1
    } else if (selectedRoute) {
      navigate('/worlds/chumo'); // L2 状态，点其它偷瞄也回 L1 (或跳切，这里跳切更直观)
      // If you want to jump directly: navigate(`/read/${id}/1`);
    } else {
      navigate(`/read/${id}/1`); // L1 状态，进入 L2
    }
  };

  // ESC 键全局监听，关闭展开的卡片
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isReading && !isClosing) {
          handleExitReading();
        } else if (selectedRoute && !isClosing) {
          navigate('/worlds/chumo');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReading, isClosing, selectedRoute, navigate]);

  return (
    <div className="chumo-page">
      <GlobalHeader hideSocial isReading={isReading} />
      <div 
        className="chumo-content-wrap" 
        style={{ 
          opacity: isTransitioning ? 0 : 1, 
          transition: 'opacity 0.35s ease-in-out',
          display: 'contents' // Keep layout intact
        }}
      >
        {!selectedRoute && <div className="chumo-title"><ScrambleText text={title[effectiveLang]} /></div>}
        <div className="card-row" data-has-active={selectedRoute ? 'true' : 'false'}>
          <CharacterCard 
            data={CHARACTERS[0]} 
            locked={!isVolumeUnsealed('jixiu')}
            active={selectedRoute === 'jixiu'} 
            reading={isReading && selectedRoute === 'jixiu'}
            isClosing={isClosing && selectedRoute === 'jixiu'}
            currentChapter={currentChapter}
            lang={effectiveLang}
            onSelect={() => handleSelect('jixiu')}
            onStartReading={() => setIsReading(true)}
            onExitReading={handleExitReading}
            onChapterSelect={(n) => navigate(`/read/jixiu/${n}`)}
          />
          <CharacterCard 
            data={CHARACTERS[1]} 
            locked={!isVolumeUnsealed('ruoyu')}
            active={selectedRoute === 'ruoyu'} 
            reading={isReading && selectedRoute === 'ruoyu'}
            isClosing={isClosing && selectedRoute === 'ruoyu'}
            currentChapter={currentChapter}
            lang={effectiveLang}
            onSelect={() => handleSelect('ruoyu')}
            onStartReading={() => setIsReading(true)}
            onExitReading={handleExitReading}
            onChapterSelect={(n) => navigate(`/read/ruoyu/${n}`)}
          />
          <CharacterCard 
            data={CHARACTERS[2]} 
            locked={!isVolumeUnsealed('yunling')} 
            active={selectedRoute === 'yunling'} 
            reading={isReading && selectedRoute === 'yunling'}
            isClosing={isClosing && selectedRoute === 'yunling'}
            currentChapter={currentChapter}
            lang={effectiveLang}
            onSelect={() => handleSelect('yunling')}
            onStartReading={() => setIsReading(true)}
            onExitReading={handleExitReading}
            onChapterSelect={(n) => navigate(`/read/yunling/${n}`)}
          />
          <CharacterCard 
            data={CHARACTERS[3]} 
            locked={!isVolumeUnsealed('chengyuan')} 
            active={selectedRoute === 'chengyuan'} 
            reading={isReading && selectedRoute === 'chengyuan'}
            isClosing={isClosing && selectedRoute === 'chengyuan'}
            currentChapter={currentChapter}
            lang={effectiveLang}
            onSelect={() => handleSelect('chengyuan')}
            onStartReading={() => setIsReading(true)}
            onExitReading={handleExitReading}
            onChapterSelect={(n) => navigate(`/read/chengyuan/${n}`)}
          />
        </div>
        {!selectedRoute && (
          <div className="chumo-back" onClick={() => navigate('/library')}>
            <ScrambleText text={back[effectiveLang]} />
          </div>
        )}
      </div>
    </div>
  );
}

export default WorldsChumo;
