import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PlaceholderPage: React.FC<{ title: string, topRightControls?: React.ReactNode }> = ({ title, topRightControls }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-serif flex flex-col items-center justify-center relative transition-colors duration-300">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 hover:text-[var(--brass)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold tracking-widest text-sm text-[var(--ink)]">返回</span>
        </button>
      </div>

      {topRightControls && (
        <div className="pointer-events-auto">
          {topRightControls}
        </div>
      )}
      
      <h1 className="text-4xl font-bold tracking-[0.2em] mb-4 text-[var(--ink)]">{title}</h1>
      <p className="text-[var(--ink)]/60 tracking-widest uppercase">CONSTRUCTING · UNDER DEVELOPMENT</p>
    </div>
  );
};
