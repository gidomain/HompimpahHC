'use client';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: '01', name: 'START' },
  { id: 'manifesto', label: '02', name: 'MANIFESTO' },
  { id: 'tour', label: '03', name: 'JADWAL' },
  { id: 'origin', label: '04', name: 'ASAL' },
];

export function PageIndicator() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(s.id); },
        { threshold: 0.5 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Navigasi halaman"
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 justify-end"
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className={`hc-tag transition-all duration-300 ${
                isActive
                  ? 'text-[#f0ece0] opacity-100'
                  : 'text-[#7a7a7a] opacity-0 group-hover:opacity-100'
              }`}
            >
              {s.name}
            </span>
            <span className="hc-tag text-[#7a7a7a] tabular-nums">{s.label}</span>
            <span
              className={`block h-[2px] transition-all duration-500 ${
                isActive
                  ? 'w-10 bg-[#3a3a3a]'
                  : 'w-4 bg-[#3a3a3a] group-hover:w-6 group-hover:bg-[#7a7a7a]'
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}