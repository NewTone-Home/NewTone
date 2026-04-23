import React from 'react';
import { motion } from 'motion/react';

export const CompassRose: React.FC = () => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '78%',
        left: '85%',
        width: '120px',
        height: '120px',
        zIndex: 5,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Circle */}
        <circle cx="60" cy="60" r="58" stroke="var(--brass)" strokeWidth="1" opacity="0.5" />
        {/* Inner Circle */}
        <circle cx="60" cy="60" r="20" stroke="var(--brass)" strokeWidth="1" opacity="0.5" />
        
        {/* Main Axes (N/E/S/W) */}
        <line x1="60" y1="0" x2="60" y2="120" stroke="var(--brass)" strokeWidth="1.2" />
        <line x1="0" y1="60" x2="120" y2="60" stroke="var(--brass)" strokeWidth="1.2" />
        
        {/* Points (N/E/S/W) */}
        <path d="M60 2 L65 55 L60 60 L55 55 Z" fill="var(--brass)" />
        <path d="M60 118 L55 65 L60 60 L65 65 Z" fill="var(--brass)" />
        <path d="M2 60 L55 55 L60 60 L55 65 Z" fill="var(--brass)" />
        <path d="M118 60 L65 65 L60 60 L65 55 Z" fill="var(--brass)" />

        {/* Sub Axes (NE/SE/SW/NW) */}
        <g transform="rotate(45, 60, 60)">
          <line x1="60" y1="15" x2="60" y2="105" stroke="var(--brass)" strokeWidth="0.8" />
          <line x1="15" y1="60" x2="105" y2="60" stroke="var(--brass)" strokeWidth="0.8" />
        </g>

        {/* Letters - they should stay upright normally, but for a "rotating compass" effect 
            we can either keep them inside the rotated div or rotate them back.
            The spec says "N/E/S/W 字母标注". To keep them readable, 
            usually they don't rotate with the compass, but the spec says the COMPASS rotates.
        */}
        <text x="60" y="15" textAnchor="middle" fontSize="12" fontFamily="var(--font-display)" fill="var(--brass)" opacity="0.6">N</text>
        <text x="105" y="63" textAnchor="middle" fontSize="12" fontFamily="var(--font-display)" fill="var(--brass)" opacity="0.6">E</text>
        <text x="60" y="110" textAnchor="middle" fontSize="12" fontFamily="var(--font-display)" fill="var(--brass)" opacity="0.6">S</text>
        <text x="15" y="63" textAnchor="middle" fontSize="12" fontFamily="var(--font-display)" fill="var(--brass)" opacity="0.6">W</text>
      </svg>
    </motion.div>
  );
};
