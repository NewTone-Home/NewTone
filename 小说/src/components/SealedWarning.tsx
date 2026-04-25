import React from 'react';

const SealedWarning: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div 
      className="sealed-warning-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        color: '#8B2F28',
        fontFamily: '"Songti SC", "Source Han Serif SC", serif',
        textAlign: 'center',
        animation: 'fadeIn 0.3s ease both',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes glitchShift {
          0%, 100% {
            transform: translate(0, 0);
            text-shadow:
              2px 0 rgba(0, 200, 220, 0.7),
              -2px 0 rgba(220, 30, 50, 0.7);
          }
          10% {
            transform: translate(-3px, 1px);
            text-shadow:
              4px 0 rgba(0, 200, 220, 0.8),
              -4px 0 rgba(220, 30, 50, 0.8);
          }
          20% {
            transform: translate(3px, -2px);
            text-shadow:
              -2px 0 rgba(0, 200, 220, 0.6),
              2px 0 rgba(220, 30, 50, 0.6);
          }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(2px, 0px); }
          50% {
            transform: translate(0, 0);
            text-shadow: none;
            opacity: 0.5;
          }
          55% { opacity: 1; }
          70% { transform: translate(-2px, 1px); }
          85% { transform: translate(1px, -1px); }
        }

        @keyframes scanlineShift {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes stampIn {
          0%   { transform: scale(1.4); opacity: 0; }
          60%  { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes baguaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .seal-text {
          font-size: 56px;
          font-weight: bold;
          letter-spacing: 0.4em;
          margin-bottom: 24px;
          animation: stampIn 0.5s ease-out both, glitchShift 1.4s steps(8, end) infinite 0.5s;
          user-select: none;
          position: relative;
        }
        .seal-text::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 3px,
            rgba(139, 47, 40, 0.08) 3px,
            rgba(139, 47, 40, 0.08) 4px
          );
          pointer-events: none;
          animation: scanlineShift 0.3s steps(3) infinite;
        }
        .bagua-wrap {
          position: absolute;
          z-index: -1;
          opacity: 0.35;
          animation: baguaSpin 8s linear infinite;
          user-select: none;
          pointer-events: none;
        }
        .warning-sub {
          font-size: 14px;
          color: #5A4A3A;
          opacity: 0.7;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          max-width: 80%;
          line-height: 1.6;
          position: relative;
        }
      `}</style>

      <div className="bagua-wrap">
        <svg width="240" height="240" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="50" y="15" textAnchor="middle" fontSize="6" fill="currentColor">☰</text>
          <text x="75" y="25" textAnchor="middle" fontSize="6" fill="currentColor">☱</text>
          <text x="85" y="50" textAnchor="middle" fontSize="6" fill="currentColor">☲</text>
          <text x="75" y="75" textAnchor="middle" fontSize="6" fill="currentColor">☳</text>
          <text x="50" y="85" textAnchor="middle" fontSize="6" fill="currentColor">☴</text>
          <text x="25" y="75" textAnchor="middle" fontSize="6" fill="currentColor">☵</text>
          <text x="15" y="50" textAnchor="middle" fontSize="6" fill="currentColor">☶</text>
          <text x="25" y="25" textAnchor="middle" fontSize="6" fill="currentColor">☷</text>
        </svg>
      </div>

      <div className="seal-text">此·卷·封·缄</div>
      
      <div className="warning-sub">
        缄者，慎言也。时机未至，此卷不可阅。
      </div>
    </div>
  );
};

export default SealedWarning;
