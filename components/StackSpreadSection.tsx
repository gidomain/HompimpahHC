'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type CardDef = {
  label: string;
  gradient: string;
  stack: { x: number; y: number; r: number };
  end: { x: number; y: number; w: number; h: number };
};

const CARDS: CardDef[] = [
  { label: 'HANDS',   gradient: 'linear-gradient(135deg,#3a3a3a,#5a0000)', stack: { x: -8,  y: -10, r: -18 }, end: { x: -20, y: -34, w: 17, h: 22 } },
  { label: 'SMOKE',   gradient: 'linear-gradient(135deg,#8b2e0e,#2a0e05)', stack: { x: 14,  y: -10, r: 20  }, end: { x: 32,  y: -30, w: 18, h: 32 } },
  { label: 'MIC',     gradient: 'linear-gradient(135deg,#7a7a7a,#1a1a1a)',    stack: { x: -16, y: 0,   r: -4  }, end: { x: -36, y: -2,  w: 15, h: 32 } },
  { label: 'GUITAR',  gradient: 'linear-gradient(135deg,#f0ece0,#8a6a00)', stack: { x: 1,   y: -10, r: -2  }, end: { x: 6,   y: -32, w: 25, h: 30 } },
  { label: 'DRUMS',   gradient: 'linear-gradient(135deg,#3a3a3a,#5a0000)', stack: { x: 18,  y: 1,   r: 6   }, end: { x: 37,  y: 6,   w: 18, h: 32 } },
  { label: 'STAGE',   gradient: 'linear-gradient(135deg,#7a7a7a,#1a1a1a)',    stack: { x: -6,  y: 10,  r: 6   }, end: { x: -24, y: 34,  w: 22, h: 25 } },
  { label: 'CROWD',   gradient: 'linear-gradient(135deg,#8b2e0e,#2a0e05)', stack: { x: 8,   y: 7,   r: 3   }, end: { x: 2,   y: 36,  w: 20, h: 26 } },
  { label: 'MOSHPIT', gradient: 'linear-gradient(135deg,#f0ece0,#8a6a00)', stack: { x: 20,  y: 12,  r: -7  }, end: { x: 30,  y: 34,  w: 16, h: 20 } },
];

const SCATTER_START = 0.15;
const SCATTER_END = 0.85;

function Card({
  card, progress, index, total,
}: {
  card: CardDef;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const depth = 0.55 + (index / (total - 1)) * 0.75;

  const x = useTransform(progress, [0, 1], [card.stack.x, card.end.x]);
  const y = useTransform(progress, [0, 1], [card.stack.y, card.end.y]);
  const r = useTransform(progress, [0, 1], [card.stack.r, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${card.end.w}vw`,
        height: `${card.end.h}vh`,
        zIndex: index + 1,
        x: useTransform(x, (v) => `calc(-50% + ${v}vw)`),
        y: useTransform(y, (v) => `calc(-50% + ${v}vh)`),
        rotate: r,
        opacity: useTransform(progress, [0, 0.05], [0.85, 1]),
      }}
      data-depth={depth}
    >
      <div
        className="relative h-full w-full overflow-hidden border-2 border-[#f0ece0]"
        style={{ background: card.gradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white text-xs md:text-sm font-black tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-anton)' }}
          >
            {card.label}
          </span>
        </div>
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/60" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/60" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/60" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/60" />
      </div>
    </motion.div>
  );
}

export function StackSpreadSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1]
  );

  const textOpacity = useTransform(progress, [0.3, 0.7], [0, 1]);
  const hintOpacity = useTransform(progress, [0, 0.15], [1, 0]);
  const [p, setP] = useState(0);

  useEffect(() => {
    const unsub = progress.on('change', setP);
    return () => unsub();
  }, [progress]);

  return (
    <section
      id="spread"
      ref={wrapRef}
      className="relative w-full"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#3a3a3a] z-20" />
        <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[#3a3a3a] z-20" />
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-[#3a3a3a] z-20" />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#3a3a3a] z-20" />

        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-[#7a7a7a] uppercase z-20 font-bold">
          SCATTER {(p * 100).toFixed(0)}%
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: textOpacity }}
        >
          <h2
            className="text-[10vw] md:text-[5vw] font-black leading-[0.9] tracking-tight uppercase text-white"
            style={{ fontFamily: 'var(--font-anton)' }}
          >
            RAW. <span className="text-[#7a7a7a]">LOUD.</span> BOGOR.
          </h2>
          <p className="mt-4 text-xs md:text-base leading-relaxed tracking-wide uppercase font-bold text-[#7a7a7a] max-w-[42ch]">
            Tiga orang. Dua gitar. Satu distorsi yang gak minta izin.
          </p>
        </motion.div>

        <div className="absolute inset-0 z-10">
          {CARDS.map((card, i) => (
            <Card key={card.label} card={card} progress={progress} index={i} total={CARDS.length} />
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white"
          style={{ opacity: hintOpacity }}
        >
          <span>SCROLL</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" aria-hidden>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}