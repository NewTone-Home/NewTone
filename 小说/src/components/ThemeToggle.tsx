import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:rotate-[6deg] hover:scale-[1.05] hover:shadow-[0_0_12px_var(--brass)] bg-[var(--brass)]/10 border border-[var(--brass)]/20"
      aria-label="切换主题"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {theme === 'day' ? (
          <g stroke="var(--brass)" strokeWidth="1.2">
            <circle cx="12" cy="12" r="2.5" fill="var(--brass)" stroke="none" />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="12" y1="8"
                x2="12" y2="4"
                transform={`rotate(${i * 45} 12 12)`}
              />
            ))}
          </g>
        ) : (
          <path 
            d="M12 3c.132 0 .263 0 .393.007a9 9 0 1 0 8.6 8.6c.007.13.007.261.007.393a9 9 0 0 1-9-9Z" 
            fill="var(--brass)" 
          />
        )}
      </svg>
    </button>
  );
};
