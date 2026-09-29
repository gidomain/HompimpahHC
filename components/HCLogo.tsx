'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function HCLogo({
  src = '/images/logo-hc.png',
  alt = 'H0MP1MP4H',
  className = '',
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Mouse parallax — logo tilt mengikuti kursor
  useEffect(() => {
    if (!mounted || !wrapRef.current) return;
    const el = wrapRef.current;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.setProperty('--rx', `${-dy * 8}deg`);
      el.style.setProperty('--ry', `${dx * 8}deg`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mounted]);

  return (
    <div ref={wrapRef} className={`hc-logo-wrap relative ${className}`} style={{ perspective: '1200px' }}>
      {/* Layer RGB split — 2 salinan di belakang dengan warna berbeda */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="hc-logo-r hc-logo-layer absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
      <img
        src={src}
        alt=""
        aria-hidden
        className="hc-logo-y hc-logo-layer absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* Logo utama */}
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="hc-logo-main relative w-full h-full object-contain select-none"
      />
    </div>
  );
}