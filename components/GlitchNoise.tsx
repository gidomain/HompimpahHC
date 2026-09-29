'use client';
import { useEffect, useState } from 'react';

const FRAGMENTS = [
  'ERR: SIGNAL LOST',
  '/// SYS.LOAD 0x4A',
  'REC ● 00:04:17',
  '> TRACKING...',
  'CH 06 // 60Hz',
  'BOGOR - 06°35\'S',
  'NO SIGNAL',
  '// H0MP1MP4H',
];

export function GlitchNoise() {
  const [frags, setFrags] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      if (Math.random() > 0.55) {
        const frag = {
          id: id++,
          text: FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        };
        setFrags((f) => [...f.slice(-4), frag]);
        setTimeout(() => {
          setFrags((f) => f.filter((x) => x.id !== frag.id));
        }, 180);
      }
    };
    const interval = setInterval(tick, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[8000]" aria-hidden>
      {frags.map((f) => (
        <span
          key={f.id}
          className="absolute hc-tag text-[#ff0033] mix-blend-screen"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            textShadow: '-1px 0 #00ffdd, 1px 0 #ff0033',
            transform: `translate3d(${(Math.random() - 0.5) * 6}px, 0, 0)`,
          }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}