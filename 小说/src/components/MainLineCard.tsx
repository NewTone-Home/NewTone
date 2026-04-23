import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../types';

interface MainLineCardProps {
  lang: Language;
}

export const MainLineCard: React.FC<MainLineCardProps> = ({ lang }) => {
  const navigate = useNavigate();

  const mainLine = {
    romanIndex: '※',
    trigram: '☯',
    anchor: '主',
    name: { zh: '主 线', en: 'MAIN LINE', ja: '本 線' },
    epithet: { zh: '合', en: 'CONVERGE', ja: '合' },
    colorLabel: { zh: '黄铜', en: 'HUANGTONG', ja: '黄銅' },
    colorHex: '#8B6F3E',
    bio: {
      identity: {
        zh: '修杰 × 若雨 · 交叉视角完整叙事',
        en: 'Xiujie × Ruoyu · full dual-POV narrative',
        ja: '修杰 × 若雨 · 完全交叉視点'
      },
      metadata: {
        volumeNum: { zh: '主卷', en: 'MAIN', ja: '本線' },
        appears: { zh: '见 · 全卷', en: 'SPANS · ALL', ja: '登場 · 全巻' },
        words: { zh: '字 · 约两万', en: 'WORDS · ~20,000', ja: '字数 · 約二万' },
        role: { zh: '别 · 双主 POV', en: 'ROLE · DUAL POV', ja: '役 · 双主 POV' }
      }
    },
    quote: {
      zh: '「两执一笔，真理于纸上分岔。」',
      en: '"Two hands, one brush — truth splits upon the page."',
      ja: '「二手一筆，真理は紙上にて分岐す。」'
    },
    route: '/read/main',
  };

  const ctaText: Record<Language, string> = {
    zh: '开始阅读 →',
    en: 'BEGIN READING →',
    ja: '読み始める →'
  };

  return (
    <div 
      className="card" 
      style={{ '--char-color': mainLine.colorHex } as React.CSSProperties}
      onClick={() => navigate(mainLine.route)}
    >
      <div className="card-gradient" />
      
      {/* === compact 默认态 === */}
      <div className="card-default">
        <div>
          <div className="cd-roman">{mainLine.romanIndex}</div>
          <div className="cd-vol">{mainLine.bio.metadata.volumeNum[lang]}</div>
          <div className="cd-trigram">{mainLine.trigram}</div>
        </div>
        
        <div className="cd-anchor">
          <span className="cd-anchor-char">{mainLine.anchor}</span>
        </div>
        
        <div>
          <div className="cd-name-zh">{mainLine.name.zh}</div>
          <div className="cd-name-latin">{mainLine.name.en}</div>
          <div className="cd-swatch">
            <span className="cd-swatch-box" style={{ background: mainLine.colorHex }} />
            <span>{mainLine.colorLabel[lang]}</span>
          </div>
        </div>
      </div>
      
      {/* === detail 态 === */}
      <div className="card-detail">
        <div className="dt-header">
          <span>{mainLine.romanIndex} · {mainLine.bio.metadata.volumeNum[lang]}</span>
          <span>{mainLine.trigram} · {mainLine.epithet[lang]} · {mainLine.colorLabel[lang]} · {mainLine.colorHex}</span>
        </div>
        <div className="dt-anchor">{mainLine.anchor}</div>
        <h1 className="dt-name-zh">{mainLine.name.zh}</h1>
        <div className="dt-name-latin">{mainLine.name.en}</div>
        <div className="dt-name-ja">{mainLine.name.ja}</div>
        <div className="dt-identity">{mainLine.bio.identity[lang]}</div>
        <div className="dt-divider">· · ·</div>
        <blockquote className="dt-quote">{mainLine.quote[lang]}</blockquote>
        <button 
          className="dt-cta" 
          onClick={(e) => {
            e.stopPropagation();
            navigate(mainLine.route);
          }}
        >
          {ctaText[lang]}
        </button>
        <div className="dt-meta">
          <span>{mainLine.bio.metadata.volumeNum[lang]}</span>
          <span>{mainLine.bio.metadata.appears[lang]}</span>
          <span>{mainLine.bio.metadata.words[lang]}</span>
          <span>{mainLine.bio.metadata.role[lang]}</span>
        </div>
      </div>
    </div>
  );
};
