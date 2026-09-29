'use client';
import { useEffect, useRef } from 'react';

export function VelocityMarquee({
  children, className = '', baseSpeed = 1.1,
}: { children: React.ReactNode; className?: string; baseSpeed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0, lastY = window.scrollY, v = 0;
    let lastT = performance.now();

    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((t - lastT) / 16.67, 3);
      lastT = t;

      const y = window.scrollY;
      const rawV = (y - lastY) / dt;
      lastY = y;

      // Smooth velocity (lerp lebih lambat = lebih halus)
      v += (rawV - v) * 0.08;

      // Speed berbasis velocity + base
      const speedBoost = Math.min(Math.abs(v) * 0.4, 12);
      const speed = (baseSpeed + speedBoost) * dt;
      const dir = v < -1 ? 1 : -1;
      x += speed * dir;

      const half = el.scrollWidth / 2;
      if (half > 0) {
        if (x < -half) x += half;
        if (x > 0) x -= half;
      }

      el.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [baseSpeed]);

  return (
    <div className={`overflow-hidden border-y-2 border-[#f0ece0] py-3 ${className}`}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <span className="hc-display text-2xl md:text-4xl px-8 flex items-center gap-8 shrink-0">{children}</span>
        <span className="hc-display text-2xl md:text-4xl px-8 flex items-center gap-8 shrink-0" aria-hidden>{children}</span>
      </div>
    </div>
  );
}