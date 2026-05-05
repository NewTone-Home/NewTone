import React, { useState, useEffect, useRef } from 'react';

interface FadeTextProps {
  children: string;
  className?: string;
}

export const FadeText: React.FC<FadeTextProps> = ({ children, className }) => {
  const [displayText, setDisplayText] = useState(children);
  const [opacity, setOpacity] = useState(1);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (children !== displayText) {
      // 1. Fade out
      setOpacity(0);
      const timer = setTimeout(() => {
        // 2. Change text
        setDisplayText(children);
        // 3. Fade in
        setOpacity(1);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [children, displayText]);

  return (
    <span
      className={className}
      style={{
        opacity,
        transition: 'opacity 0.3s ease',
        display: 'inline-block',
      }}
    >
      {displayText}
    </span>
  );
};
