'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function SplitReveal({
  text, className = '',
}: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const chars = el.querySelectorAll('[data-c]');
    gsap.set(chars, { yPercent: 115, opacity: 0 });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(chars, {
            yPercent: 0, opacity: 1,
            duration: 0.9, stagger: 0.022, ease: 'expo.out',
          });
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <span
          key={wi}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginRight: '0.22em' }}
        >
          {word.split('').map((c, ci) => (
            <span key={ci} data-c className="inline-block will-change-transform" aria-hidden>
              {c}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}