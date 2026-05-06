import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UI_TRANSLATIONS } from '../locales';
import { ReaderToolCluster } from './ReaderToolCluster';
import { Route, FontSize } from '../types';
import { getFontSize, setFontSize as saveFs } from '../services/progressService';
import { ScrambleText } from './ScrambleText';
import { FadeText } from './FadeText';

interface ReaderToolbarProps {
  route: Route;
  onBack: () => void;
}

export const ReaderToolbar: React.FC<ReaderToolbarProps> = ({ route, onBack }) => {
  const { lang } = useTheme();
  const [fs, setFsState] = React.useState<FontSize>(getFontSize());
  
  const handleSetFs = (size: FontSize) => {
    setFsState(size);
    saveFs(size);
    // Notify app of change if needed, though most components read directly from progressService or pass via props
  };

  const t = (key: string) => {
    const section = UI_TRANSLATIONS[lang];
    if (!section) return key;
    return section[key] || key;
  };

  return (
    <div className="reader-toolbar">
      <div className="rt-left">
        <button className="rt-back" onClick={onBack}>
          <span className="rt-back-arrow">←</span>
          <span className="rt-back-text">
            {route === 'jixiu' ? (
              <ScrambleText text={t('read.back')} />
            ) : (
              <FadeText>{t('read.back')}</FadeText>
            )}
          </span>
        </button>
      </div>

      <div className="rt-right">
        <ReaderToolCluster fontSize={fs} setFontSize={handleSetFs} route={route} />
      </div>
    </div>
  );
};
