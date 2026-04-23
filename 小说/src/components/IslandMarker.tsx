import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface IslandMarkerProps {
  title: string;
  subtitle?: string;
  position: { top: string; left: string };
  size: 'main' | 'locked';
  locked: boolean;
  onClick?: () => void;
  hoverContent?: string;
}

export const IslandMarker: React.FC<IslandMarkerProps> = ({
  title,
  subtitle,
  position,
  size,
  locked,
  onClick,
  hoverContent,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`
          flex items-center justify-center rounded-full transition-all duration-300
          ${size === 'main' 
            ? 'w-[88px] h-[88px] border-2 border-dashed border-[var(--brass)] bg-[rgba(139,111,62,0.08)]' 
            : 'w-[64px] h-[64px] border border-dashed border-[var(--brass)] bg-[rgba(139,111,62,0.03)]'
          }
          ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${isHovered && size === 'main' ? 'border-solid bg-[rgba(139,111,62,0.15)] shadow-[0_0_20px_rgba(184,147,90,0.2)]' : ''}
        `}
        whileHover={locked ? { x: [0, -2, 2, -2, 0] } : { scale: 1.05 }}
        transition={locked ? { duration: 0.4 } : { duration: 0.3 }}
        onClick={!locked ? onClick : undefined}
      >
        {locked ? (
          <Lock className="w-6 h-6 text-[var(--brass)] opacity-50" />
        ) : (
          <Feather className="w-8 h-8 text-[var(--brass)]" />
        )}
      </motion.div>

      <div className="mt-3 text-center">
        <div 
          className={`
            font-display text-[14px] tracking-[0.1em] text-[var(--ink)] transition-all duration-300
            ${isHovered && size === 'main' ? 'text-shadow-[0_0_8px_rgba(184,147,90,0.4)]' : ''}
          `}
        >
          {title}
        </div>
        {size === 'main' && subtitle && (
          <div className="mt-1 font-sans text-[11px] tracking-[0.2em] text-[var(--brass)] uppercase">
            {subtitle}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isHovered && hoverContent && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`
              absolute left-[100%] ml-3 z-50 p-[10px_14px] min-w-[180px]
              bg-[var(--bg)] border border-[var(--brass)] shadow-[0_4px_16px_rgba(46,36,24,0.15)]
              pointer-events-none
            `}
            style={{
              // Fallback logic to check if it's too far right could be added here in a real scenario
              // but following spec "圆圈右侧 12px"
            }}
          >
            <div className="font-body text-[13px] text-[var(--ink)]">
              {hoverContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
