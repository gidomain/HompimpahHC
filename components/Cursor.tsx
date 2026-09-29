'use client';
import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let dx = -100, dy = -100;
    let rx = -100, ry = -100;
    let scale = 1, targetScale = 1;
    let lastT = performance.now();

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      targetScale = t.closest('a, button, [data-cursor]') ? 2.2 : 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((t - lastT) / 16.67, 3); // normalize ke 60fps frame
      lastT = t;

      // Dot: responsif
      dx += (mx - dx) * Math.min(0.5 * dt, 0.9);
      dy += (my - dy) * Math.min(0.5 * dt, 0.9);

      // Ring: mengikuti dengan lag halus (lerp lebih kecil)
      rx += (mx - rx) * Math.min(0.15 * dt, 0.5);
      ry += (my - ry) * Math.min(0.15 * dt, 0.5);

      // Scale smooth
      scale += (targetScale - scale) * Math.min(0.18 * dt, 0.6);

      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-[#f0ece0] pointer-events-none mix-blend-difference hidden md:block will-change-transform"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-[#f0ece0] pointer-events-none mix-blend-difference hidden md:block will-change-transform"
        aria-hidden
      />
    </>
  );
}