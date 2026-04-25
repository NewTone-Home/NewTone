import { useState, useRef } from 'react';

export default function DevResetButton() {
  if (!import.meta.env.DEV) return null;

  const [armed, setArmed] = useState(false);
  const [hover, setHover] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  function handleClick() {
    if (!armed) {
      // 第一次点：进入待确认状态
      setArmed(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setArmed(false), 3000);
      return;
    }
    // 第二次点（3 秒内）：真清除
    try {
      localStorage.clear();
      sessionStorage.clear();
      location.reload();
    } catch (e) {
      console.error('[DevReset] 清除失败：', e);
    }
  }

  return (
    <button
      id="dev-reset-button"
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={armed ? '再点一次确认清除' : 'DEV: 清除所有进度'}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: 'none',
        background: armed ? 'rgba(220, 38, 38, 0.8)' : 'rgba(20, 20, 20, 0.6)',
        color: '#fff',
        fontSize: 20,
        cursor: 'pointer',
        opacity: hover || armed ? 1 : 0.5,
        transform: hover ? 'scale(1.08)' : 'scale(1)',
        transition: 'all 0.2s ease',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {armed ? '!' : '⟲'}
    </button>
  );
}
