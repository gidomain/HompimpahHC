'use client';
import { useEffect, useRef } from 'react';

export function MagneticButton({
  children, href, className = '', strength = 0.35,
}: { children: React.ReactNode; href: string; className?: string; strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let tx = 0, ty = 0, x = 0, y = 0;
    let active = false;
    let lastT = performance.now();

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) * 1.3 + 40;
      if (dist < radius) {
        active = true;
        tx = dx * strength;
        ty = dy * strength;
      } else if (active) {
        active = false;
        tx = 0;
        ty = 0;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((t - lastT) / 16.67, 3);
      lastT = t;

      const k = Math.min(0.15 * dt, 0.5);
      x += (tx - x) * k;
      y += (ty - y) * k;

      if (Math.abs(x) < 0.05 && Math.abs(y) < 0.05 && !active) {
        if (el.style.transform !== 'translate3d(0,0,0)') {
          el.style.transform = 'translate3d(0,0,0)';
        }
        return;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [strength]);

  return (
    <a ref={ref} href={href} className={`inline-block will-change-transform ${className}`}>
      {children}
    </a>
  );
}