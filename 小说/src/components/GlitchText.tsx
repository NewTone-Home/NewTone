import { useEffect, useState } from 'react';

export function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  
  useEffect(() => {
    const glitchChars = '封缄密锁禁■▌▐░▒▓';
    const id = setInterval(() => {
      if (Math.random() > 0.85) {
        const glitched = text.split('').map(c =>
          Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c
        ).join('');
        setDisplay(glitched);
        setTimeout(() => setDisplay(text), 80);
      }
    }, 200);
    return () => clearInterval(id);
  }, [text]);

  return <span className="glitch-text">{display}</span>;
}
