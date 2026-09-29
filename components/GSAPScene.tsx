'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function GSAPScene({
  children, scene, className,
}: { children: React.ReactNode; scene: (el: HTMLElement) => void; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => scene(ref.current!), ref);
    return () => ctx.revert();
  }, [scene]);

  return <div ref={ref} className={className}>{children}</div>;
}