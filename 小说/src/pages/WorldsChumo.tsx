import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { GlobalHeader } from '../components/GlobalHeader';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { CharacterCard } from '../components/CharacterCard';
import { MainLineCard } from '../components/MainLineCard';
import { Language } from '../types';

const characterRoutes = [
  { 
    id:'jixiujie', romanIndex:'I', trigram:'☰',
    name:{zh:'修 杰',en:'JI XIUJIE',ja:'修 杰'},
    epithet:{zh:'札',en:'SCROLL',ja:'札'},
    colorLabel:{zh:'青白',en:'QINGBAI',ja:'青白'}, colorHex:'#C4E5EA',
    bio:{
      identity:{zh:'易学研究生 · 祖宅继承者',en:'Graduate in Yi studies · heir of the ancestral house',ja:'易学院生 · 祖宅の継承者'},
      anchor:'札', 
      metadata: {
        volumeNum: {zh:'卷其一', en:'VOL. I', ja:'巻之一'},
        appears:   {zh:'见 · 第一章至卷尾', en:'APPEARS · CH.I — END', ja:'登場 · 第一章より末'},
        words:     {zh:'字 · 约一万二千', en:'WORDS · ~12,400', ja:'字数 · 約一万二千'},
        role:      {zh:'别 · 札记 POV', en:'ROLE · JOURNAL POV', ja:'役 · 札記 POV'},
      }
    },
    seal: { kanji: '修' },
    quote:{zh:'「青石狮子咧开嘴，我听见名字被念出。」',en:'"The stone lion parted its jaws; I heard my name spoken."',ja:'「石の獅子が口を開き、吾の名が呼ばれるを聞けり。」'},
    locked:false, unlockChapter:0, route:'/worlds/chumo/letter-1' 
  },
  { 
    id:'sunruoyu', romanIndex:'II', trigram:'☱',
    name:{zh:'若 雨',en:'SUN RUOYU',ja:'若 雨'},
    epithet:{zh:'筮',en:'ORACLE',ja:'筮'},
    colorLabel:{zh:'朱砂',en:'ZHUSHA',ja:'朱砂'}, colorHex:'#A83535',
    bio:{
      identity:{zh:'商业策划 · 身世成谜的少女',en:'Business strategist · a girl of unknown past',ja:'商业策劃者 · 素性不明の少女'},
      anchor:'筮', 
      metadata: {
        volumeNum: {zh:'卷其二', en:'VOL. II', ja:'巻之二'},
        appears:   {zh:'见 · 第二章起', en:'APPEARS · CH.II —', ja:'登場 · 第二章より'},
        words:     {zh:'字 · 约八千', en:'WORDS · ~8,000', ja:'字数 · 約八千'},
        role:      {zh:'别 · 筮辞 POV', en:'ROLE · ORACLE POV', ja:'役 · 筮辞 POV'},
      }
    },
    seal: { kanji: '雨' },
    quote:{zh:'「灯火深处，那姑娘笑得无端熟悉。」',en:'"Deep in the lantern light, her smile — unbearably familiar."',ja:'「灯火の奥、あの娘の笑みは故あらず熟悉。」'},
    locked:false, unlockChapter:0, route:'/worlds/chumo/letter-2' 
  },
  { 
    id:'jiyunling', romanIndex:'III', trigram:'☲',
    name:{zh:'云 灵',en:'JI YUNLING',ja:'云 灵'},
    epithet:{zh:'笺',en:'QUILL',ja:'笺'},
    colorLabel:{zh:'胭脂',en:'YANZHI',ja:'胭脂'}, colorHex:'#D8A8A4',
    bio:{
      identity:null, anchor:null, metadata: null
    },
    seal: { kanji: '封' },
    quote:null,
    locked:true, unlockChapter:3,
    unlockHint:{zh:'启封条件 · 读完主线第 3 章',en:'Unseals after Main Chapter III',ja:'本線第三章読了にて開封'},
    route:'/worlds/chumo/letter-3' 
  },
  { 
    id:'elder', romanIndex:'IV', trigram:'☶',
    name:{zh:'长 者',en:'THE ELDER',ja:'长 者'},
    epithet:{zh:'藏',en:'ARCHIVE',ja:'藏'},
    colorLabel:{zh:'黄铜',en:'HUANGTONG',ja:'黄铜'}, colorHex:'#C19A5E',
    bio:{
      identity:null, anchor:null, metadata: null
    },
    seal: { kanji: '缄' },
    quote:null,
    locked:true, unlockChapter:8,
    unlockHint:{zh:'启封条件 · 读完主线第 8 章',en:'Unseals after Main Chapter VIII',ja:'本線第八章読了にて開封'},
    route:'/worlds/chumo/letter-4' 
  },
];

const titleStrings: Record<Language, string> = { 
  zh: '初墨卷 · 五卷选角', 
  en: 'THE FIRST INK · CHARACTER SELECTION', 
  ja: '初墨の巻 · 選角' 
};
const backStrings: Record<Language, string> = { 
  zh: '← 返回海图', 
  en: '← BACK TO ATLAS', 
  ja: '← 海図へ戻る' 
};

export const WorldsChumo: React.FC = () => {
  const navigate = useNavigate();
  const { lang = 'zh' } = useTheme();
  const { progress } = useReadingProgress();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const isLocked = (char: any) => char.locked && progress < char.unlockChapter;

  return (
    <div className="chumo-page">
      <GlobalHeader />
      <div className="chumo-title">{titleStrings[lang as Language]}</div>
      
      <div className={`card-row ${activeCardId ? 'has-active' : ''}`}>
        {characterRoutes.map((char) => (
          <div 
            key={char.id}
            className={`card-wrapper ${activeCardId === char.id ? 'active' : ''}`}
            onClickCapture={() => setActiveCardId(char.id)}
          >
            <CharacterCard 
              data={char} 
              locked={isLocked(char)} 
              lang={lang as Language} 
            />
          </div>
        ))}
        <div 
          className={`card-wrapper ${activeCardId === 'mainline' ? 'active' : ''}`}
          onClickCapture={() => setActiveCardId('mainline')}
        >
          <MainLineCard lang={lang as Language} />
        </div>
      </div>

      <div className="chumo-back" onClick={() => navigate('/library')}>
        {backStrings[lang as Language]}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .chumo-page { position:fixed; inset:0; background:var(--bg); overflow:hidden; }
        
        .chumo-title { 
          position:absolute; top:24px; left:50%; transform:translateX(-50%); 
          z-index:15; font-family:var(--font-display); font-size:13px; 
          letter-spacing:0.35em; color:var(--brass); text-transform:uppercase; pointer-events:none; 
        }
        
        .chumo-back { 
          position:absolute; bottom:24px; left:32px; z-index:15; 
          font-family:'Noto Serif SC',serif; font-size:11px; letter-spacing:0.25em; 
          color:var(--ink); opacity:0.5; cursor:pointer; transition:opacity 0.3s; 
          text-transform:uppercase;
        }
        .chumo-back:hover { opacity:1; }

        .card-row { display:flex; width:100%; height:100vh; padding-top:60px; padding-bottom:60px; box-sizing:border-box; }
        
        .card-wrapper { flex: 1; min-width: 0; position: relative; transition: flex 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s; }
        
        /* Flex expansion on hover (desktop) */
        @media (min-width: 769px) {
          .card-row:hover .card-wrapper { flex: 0.2; opacity: 0.3; }
          .card-row .card-wrapper:hover { flex: 10; opacity: 1; }
        }

        /* Mobile tap behavior */
        @media (max-width: 768px) {
          .card-row { flex-direction: column; height: auto; min-height: 100vh; padding: 60px 0; }
          .card-wrapper { flex: none; height: 20vh; width: 100%; border-bottom: 1px solid rgba(139,111,62,0.18); }
          .card-row.has-active .card-wrapper { height: 10vh; opacity: 0.3; }
          .card-row.has-active .card-wrapper.active { height: 70vh; opacity: 1; }
          
          .dt-name-zh { font-size: 36px !important; }
          .dt-quote { font-size: 14px !important; margin-bottom: 24px !important; }
          .dt-anchor { top: 60px !important; font-size: 100px !important; }
          .cd-anchor-char { font-size: 70px !important; }
        }

        .card {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-right: 1px solid rgba(139,111,62,0.18);
          cursor: pointer;
        }
        .card-wrapper:last-child .card { border-right: none; }

        /* 内容切换 */
        .card-default { position:absolute; inset:0; opacity:1; transition:opacity 0.3s; padding:32px 24px; display:flex; flex-direction:column; justify-content:space-between; }
        .card-detail  { position:absolute; inset:0; opacity:0; pointer-events:none; transition:opacity 0.3s 0.2s; padding:80px 10%; display:flex; flex-direction:column; justify-content:center; }
        
        @media (min-width: 769px) {
          .card-wrapper:hover .card-default { opacity:0.12; }
          .card-wrapper:hover .card-detail  { opacity:1; pointer-events:auto; }
        }
        @media (max-width: 768px) {
          .card-wrapper.active .card-default { opacity:0.12; }
          .card-wrapper.active .card-detail  { opacity:1; pointer-events:auto; }
        }

        /* Gradient */
        .card-gradient {
          position:absolute; inset:0; z-index:-1; pointer-events:none; transition:opacity 0.4s;
          background: radial-gradient(ellipse at 50% 45%, var(--char-color) 0%, transparent 75%);
          opacity: 0.14;
        }
        .card:hover .card-gradient { opacity: 0.25; }
        .card[data-locked=true] .card-gradient { opacity: 0.08; }

        /* Typography & Components Inner */
        .cd-roman { font-family:var(--font-display); font-size:28px; letter-spacing:0.2em; color:var(--brass); opacity:0.8; }
        .cd-vol { font-family:var(--font-display); font-size:10px; letter-spacing:0.25em; color:var(--ink); opacity:0.6; margin-top:4px; text-transform:uppercase; }
        .cd-trigram { font-family:serif; font-size:20px; color:var(--ink); opacity:0.5; margin-top:6px; }
        .cd-anchor { display:flex; justify-content:center; align-items:center; flex:1; }
        .cd-anchor-char { font-family:'Noto Serif SC',serif; font-size:130px; font-weight:900; color:var(--char-color); opacity:0.3; line-height:1; text-shadow: 0 0 50px rgba(139,111,62,0.1); }
        .cd-anchor-blur { display:block; width:100px; height:100px; filter:blur(12px); background: radial-gradient(circle, rgba(46,36,24,0.35) 0%, transparent 70%); }
        .cd-name-zh { font-family:'Noto Serif SC',serif; font-size:24px; font-weight:600; letter-spacing:0.4em; color:var(--ink); }
        .cd-name-latin { font-family:var(--font-display); font-size:10px; letter-spacing:0.25em; color:var(--brass); text-transform:uppercase; margin-top:6px; }
        .cd-swatch { display:flex; align-items:center; gap:6px; margin-top:10px; font-family:var(--font-display); font-size:9px; letter-spacing:0.2em; color:var(--ink); opacity:0.55; text-transform:uppercase; }
        .cd-swatch-box { width:10px; height:10px; border:1px solid var(--brass); display:inline-block; }
        
        .cd-locked-footer { display: flex; flex-direction: column; align-items: flex-start; }
        .cd-wax { width:56px; height:56px; border-radius:50%; background: radial-gradient(circle at 35% 30%, #a83535 0%, #6b1f1a 85%); box-shadow: 0 3px 10px rgba(107,31,26,0.45), inset 0 -5px 10px rgba(0,0,0,0.35); display:flex; align-items:center; justify-content:center; font-family:'Noto Serif SC',serif; font-size:24px; font-weight:700; color:rgba(255,245,230,0.9); }
        .cd-wax-label { font-family:'Noto Serif SC',serif; font-size:10px; color:var(--brass); letter-spacing:0.35em; margin-top:10px; text-transform:uppercase; }

        .dt-header { display:flex; justify-content:space-between; font-family:var(--font-display); font-size:11px; letter-spacing:0.3em; color:var(--brass); text-transform:uppercase; padding-bottom:14px; margin-bottom:36px; border-bottom:1px solid rgba(139,111,62,0.25); }
        .dt-anchor { font-family:'Noto Serif SC',serif; font-size:180px; font-weight:900; color:var(--char-color); opacity:0.18; line-height:0.9; letter-spacing:0; position:absolute; top:120px; right:8%; pointer-events:none; z-index:-1; }
        .dt-name-zh { font-family:'Noto Serif SC',serif; font-size:72px; font-weight:600; letter-spacing:0.4em; margin:0 0 8px 0; color:var(--ink); }
        .dt-name-latin { font-family:var(--font-display); font-size:13px; letter-spacing:0.35em; color:var(--brass); text-transform:uppercase; }
        .dt-name-ja { font-family:'Noto Serif JP',serif; font-size:14px; letter-spacing:0.15em; color:var(--ink); opacity:0.6; margin-top:4px; }
        .dt-identity { font-family:'Noto Serif SC',serif; font-size:15px; font-style:italic; color:var(--ink); opacity:0.75; margin:28px 0; }
        .dt-divider { color:var(--brass); opacity:0.4; font-size:14px; letter-spacing:0.5em; margin-bottom:20px; }
        .dt-quote { font-family:'Noto Serif SC',serif; font-size:20px; font-style:italic; line-height:1.7; margin:0 0 44px 0; padding:0; border:none; color:var(--ink); max-width:600px; }
        .dt-cta { align-self:flex-start; padding:14px 32px; border:1px solid var(--brass); background:transparent; color:var(--ink); font-family:'Noto Serif SC',serif; font-size:13px; letter-spacing:0.3em; cursor:pointer; transition:all 0.3s; }
        .dt-cta:hover { background:var(--brass); color:var(--bg); }
        .dt-meta { display:flex; flex-wrap:wrap; gap:16px 32px; font-family:'Noto Serif SC',serif; font-size:11px; color:var(--ink); opacity:0.5; border-top:1px solid rgba(139,111,62,0.22); padding-top:14px; margin-top:48px; letter-spacing:0.06em; }

        .locked-detail { align-items:center; justify-content:center; animation: waxShake 0.12s infinite; }
        @keyframes waxShake { 0%,100%{transform:translate(0);} 25%{transform:translate(-1px,0.5px);} 50%{transform:translate(0.5px,-1px);} 75%{transform:translate(-0.5px,1px);} }
        .locked-detail .glitch-text { font-size:160px; color:#a83535; opacity:0.92; font-family:'Noto Serif SC',serif; font-weight:900; }
        .dt-red-stamp { font-family:'Noto Serif SC',serif; font-size:14px; letter-spacing:0.4em; color:#a83535; border:2px solid #a83535; padding:8px 20px; transform:rotate(-4deg); opacity:0.78; margin-top:32px; }
        .dt-unlock-hint { font-family:'Noto Serif SC',serif; font-size:12px; color:var(--brass); letter-spacing:0.3em; text-align:center; line-height:1.8; margin-top:16px; }
        .dt-paper-lines { position:absolute; inset:0; pointer-events:none; background: repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(139,111,62,0.06) 3px, rgba(139,111,62,0.06) 4px); animation: scanflicker 0.3s infinite alternate; }
        @keyframes scanflicker { from{opacity:0.5;} to{opacity:0.8;} }
      `}} />
    </div>
  );
};

export default WorldsChumo;
