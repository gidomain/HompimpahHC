'use client';
import { useEffect, useRef } from 'react';

export function KineticTitle({
  text, className = '', radius = 260, power = -45,
}: { text: string; className?: string; radius?: number; power?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const letters = Array.from(el.querySelectorAll<HTMLElement>('[data-k]'));
    const state = letters.map(() => ({ x: 0, y: 0 }));
    let mx = -9999, my = -9999;
    let lastT = performance.now();

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((t - lastT) / 16.67, 3);
      lastT = t;

      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const r = letter.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        const dist = Math.hypot(dx, dy);
        let tx = 0, ty = 0;
        if (dist < radius && dist > 1) {
          const p = (1 - dist / radius) ** 2;
          tx = (dx / dist) * p * power;
          ty = (dy / dist) * p * power;
        }
        const s = state[i];
        // Lerp smooth dengan dt compensation
        const k = Math.min(0.12 * dt, 0.5);
        s.x += (tx - s.x) * k;
        s.y += (ty - s.y) * k;

        // Skip update kalau hampir nol (hemat render)
        if (Math.abs(s.x) < 0.05 && Math.abs(s.y) < 0.05 && tx === 0 && ty === 0) {
          if (letter.style.transform !== 'translate3d(0,0,0)') {
            letter.style.transform = 'translate3d(0,0,0)';
          }
          continue;
        }
        letter.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [text, radius, power]);

  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {text.split('').map((c, i) => (
        <span key={i} data-k className="inline-block will-change-transform" aria-hidden>
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </h1>
  );
}