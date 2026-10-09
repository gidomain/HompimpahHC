'use client';

import { useState, useCallback } from 'react';
import ReflexShowreel from '@/components/ReflexShowreel';

export default function ShowreelPreview() {
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);

  const handleComplete = useCallback(() => {
    setPlaying(false);
  }, []);

  return (
    <div className="min-h-screen bg-void-deep text-bone flex flex-col items-center justify-center gap-8 px-6">
      {playing && (
        <ReflexShowreel key={runId} onComplete={handleComplete} />
      )}

      {!playing && (
        <div className="text-center z-[300]">
          <p className="font-mono text-steel text-xs tracking-[0.5em] mb-6">SHOWREEL SELESAI</p>
          <button
            onClick={() => { setRunId((n) => n + 1); setPlaying(true); }}
            className="border-2 border-acid text-acid px-10 py-4 tracking-[0.3em] uppercase hover:bg-acid hover:text-void transition-all"
          >
            [ REPLAY ]
          </button>
        </div>
      )}
    </div>
  );
}
