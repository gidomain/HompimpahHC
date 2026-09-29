'use client';
import { motion } from 'framer-motion';

export function SnapSection({
  id, children, className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: false, margin: '-8% 0px' }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // expo out — smooth landing
      }}
      className={`snap-section px-5 md:px-10 py-16 md:py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}