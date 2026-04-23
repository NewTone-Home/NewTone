import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlitchText } from './GlitchText';
import { Language } from '../types';

interface CharacterCardProps {
  data: any;
  locked: boolean;
  lang: Language;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ data, locked, lang }) => {
  const navigate = useNavigate();
  const { 
    romanIndex, name, epithet, colorLabel, colorHex, 
    bio, seal, quote, unlockHint, route 
  } = data;

  const ctaText: Record<Language, string> = {
    zh: '开启档案 →',
    en: 'OPEN DOSSIER →',
    ja: 'アーカイブを開く →'
  };

  const handleCardClick = () => {
    if (!locked && route) {
      navigate(route);
    }
  };

  return (
    <div 
      className="card" 
      data-locked={locked} 
      style={{ '--char-color': colorHex } as React.CSSProperties}
      onClick={handleCardClick}
    >
      <div className="card-gradient" />
      
      {/* === compact 默认态 === */}
      <div className="card-default">
        <div>
          <div className="cd-roman">{romanIndex}</div>
          <div className="cd-vol">{bio?.metadata?.volumeNum[lang] || (lang === 'zh' ? '封 · 缄' : lang === 'ja' ? '封 · 緘' : 'SEALED')}</div>
          <div className="cd-trigram">{bio?.trigram || data.trigram}</div>
        </div>
        
        <div className="cd-anchor">
          {!locked && bio?.anchor ? (
            <span className="cd-anchor-char">{bio.anchor}</span>
          ) : (
            <span className="cd-anchor-blur" />
          )}
        </div>
        
        <div>
          {!locked ? (
            <>
              <div className="cd-name-zh">{name.zh}</div>
              <div className="cd-name-latin">{name.en}</div>
              <div className="cd-swatch">
                <span className="cd-swatch-box" style={{ background: colorHex }} />
                <span>{colorLabel[lang]}</span>
              </div>
            </>
          ) : (
            <div className="cd-locked-footer">
              <div className="cd-wax">{seal.kanji}</div>
              <div className="cd-wax-label">{lang === 'en' ? 'SEALED' : '封 · 缄'}</div>
            </div>
          )}
        </div>
      </div>
      
      {/* === 普通 detail 态 === */}
      {!locked && bio && (
        <div className="card-detail">
          <div className="dt-header">
            <span>{romanIndex} · {bio.metadata.volumeNum[lang]}</span>
            <span>{bio.trigram || data.trigram} · {epithet[lang]} · {colorLabel[lang]} · {colorHex}</span>
          </div>
          <div className="dt-anchor">{bio.anchor}</div>
          <h1 className="dt-name-zh">{name.zh}</h1>
          <div className="dt-name-latin">{name.en}</div>
          <div className="dt-name-ja">{name.ja}</div>
          <div className="dt-identity">{bio.identity[lang]}</div>
          <div className="dt-divider">· · ·</div>
          <blockquote className="dt-quote">{quote[lang]}</blockquote>
          <button 
            className="dt-cta" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(route);
            }}
          >
            {ctaText[lang]}
          </button>
          <div className="dt-meta">
            <span>{bio.metadata.volumeNum[lang]}</span>
            <span>{bio.metadata.appears[lang]}</span>
            <span>{bio.metadata.words[lang]}</span>
            <span>{bio.metadata.role[lang]}</span>
          </div>
        </div>
      )}
      
      {/* === 锁定 detail 态 === */}
      {locked && (
        <div className="card-detail locked-detail">
          <GlitchText text={seal.kanji} />
          <div className="dt-red-stamp">
            {lang === 'zh' ? '封 · 缄 · 不得启' : lang === 'ja' ? '封 · 緘 · 閲覧禁' : 'SEALED · DO NOT OPEN'}
          </div>
          <div className="dt-unlock-hint">{unlockHint?.[lang]}</div>
          <div className="dt-paper-lines" />
        </div>
      )}
    </div>
  );
};
