import { cn } from '@/lib/cn';

export function GlitchText({
  children,
  className,
  shadow = true,
}: {
  children: string;
  className?: string;
  shadow?: boolean;
}) {
  return (
    <span
      className={cn('relative inline-block', className)}
      aria-label={children}
      style={shadow ? { animation: 'glitch-shadow 3s infinite' } : undefined}
    >
      <span aria-hidden className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 text-[#3a3a3a] mix-blend-screen animate-[glitch_3.5s_steps(1)_infinite]"
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-[#f0ece0] mix-blend-screen animate-[glitch_3.5s_steps(1)_infinite_reverse]"
      >
        {children}
      </span>
    </span>
  );
}