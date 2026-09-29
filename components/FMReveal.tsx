'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function FMReveal({
  children, delay = 0, y = 24, className,
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 20,
        mass: 0.9,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}