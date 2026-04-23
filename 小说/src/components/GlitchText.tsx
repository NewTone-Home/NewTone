import React from 'react';

interface GlitchTextProps {
  text: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
  return (
    <div className="glitch-text" data-text={text} id="glitch-text-display">
      {text}
    </div>
  );
};
