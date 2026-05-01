import React from 'react';

const SCRAMBLE_POOL = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789刈灵岚枢鸿煜蜃辰玦暝';

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = React.useState(text);
  const ref = React.useRef<HTMLSpanElement>(null);
  const lastTextRef = React.useRef(text);

  React.useEffect(() => {
    if (text === lastTextRef.current) return;
    lastTextRef.current = text;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setDisplay(text); return; }

    const el = ref.current;
    let waveDelay = 0;
    if (el) {
      const r = el.getBoundingClientRect();
      const xN = r.left / window.innerWidth;
      const yN = r.top  / window.innerHeight;
      // Top-right (xN=1, yN=0) → 0ms；Bottom-left (xN=0, yN=1) → 520ms
      const fromTopRight = (1 - xN) + yN; // 0 ~ 2
      waveDelay = (fromTopRight / 2) * 520;
    }

    const totalFrames = 9;
    const tickMs = 48;
    let frame = 0;
    let intv: any = 0;

    const start = window.setTimeout(() => {
      intv = window.setInterval(() => {
        frame++;
        if (frame >= totalFrames) {
          clearInterval(intv);
          setDisplay(text);
          return;
        }
        const ratio = frame / totalFrames;
        // Gradually reveal characters from front to back
        const reveal = Math.floor(ratio * text.length);
        const out = Array.from(text).map((c, i) => {
          if (i < reveal) return c;
          if (c === ' ' || c === '\u00a0' || c === '·' || c === '—' || c === '-') return c;
          return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
        }).join('');
        setDisplay(out);
      }, tickMs);
    }, waveDelay);

    return () => { clearTimeout(start); if (intv) clearInterval(intv); };
  }, [text]);

  return <span ref={ref} className={className}>{display}</span>;
}
