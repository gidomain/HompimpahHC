'use client';
import { useEffect, useRef, useState } from 'react';
import { TRACKS, HAS_PLAYLIST, type Track } from '@/lib/tracks';

function useVisualizer(audio: HTMLAudioElement | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<{ ac: AudioContext; analyser: AnalyserNode } | null>(null);

  useEffect(() => {
    if (!audio || !canvasRef.current) return;

    const ac = ctxRef.current?.ac ?? new AudioContext();
    let analyser = ctxRef.current?.analyser;
    if (!analyser) {
      analyser = ac.createAnalyser();
      analyser.fftSize = 256;
      const src = ac.createMediaElementSource(audio);
      src.connect(analyser);
      analyser.connect(ac.destination);
      ctxRef.current = { ac, analyser };
    }

    const canvas = canvasRef.current;
    const g = canvas.getContext('2d')!;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser!.getByteFrequencyData(data);
      const { width: w, height: h } = canvas;
      g.clearRect(0, 0, w, h);
      g.fillStyle = '#c00000';
      const bw = w / data.length;
      for (let i = 0; i < data.length; i++) {
        const bh = (data[i] / 255) * h;
        g.fillRect(i * bw, h - bh, Math.max(1, bw - 1), bh);
      }
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [audio]);

  return canvasRef;
}

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const canvasRef = useVisualizer(audioEl);

  const track: Track = TRACKS[idx];

  useEffect(() => {
    setAudioEl(audioRef.current);
  }, []);

  // ── AUTOPLAY STRATEGY ──
  // 1. Load halaman → coba autoplay muted (browser allow ini)
  // 2. User interaksi pertama (klik/scroll/keydown) → unmute
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    // Set muted dulu biar autoplay diizinkan
    el.muted = true;
    el.volume = 0.8;

    // Coba autoplay muted
    el.play().then(() => {
      setPlaying(true);
      // Pasang listener buat unmute
      const unlock = () => {
        el.muted = false;
        setUnlocked(true);
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
        window.removeEventListener('scroll', unlock);
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
      window.addEventListener('scroll', unlock, { once: true, passive: true });
    }).catch(() => {
      // Autoplay gagal total — fallback: tunggu interaksi user
      setPlaying(false);
    });
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.play().catch(() => {});
    else el.pause();
  }, [playing, idx]);

  const prev = () => setIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  const next = () => setIdx((i) => (i + 1) % TRACKS.length);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t-2 border-[#c00000] bg-black/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 md:gap-4">

        {HAS_PLAYLIST && (
          <button
            onClick={prev}
            className="hidden md:grid w-8 h-8 place-items-center text-[#7a7a7a] hover:text-white transition-colors text-sm"
            aria-label="Track sebelumnya"
          >
            ◀◀
          </button>
        )}

        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-11 h-11 grid place-items-center border-2 border-[#c00000] text-[#c00000] hover:bg-[#c00000] hover:text-black transition-colors shrink-0"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '❚❚' : '▶'}
        </button>

        {HAS_PLAYLIST && (
          <button
            onClick={next}
            className="hidden md:grid w-8 h-8 place-items-center text-[#7a7a7a] hover:text-white transition-colors text-sm"
            aria-label="Track berikutnya"
          >
            ▶▶
          </button>
        )}

        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div className="hidden md:flex flex-col min-w-0">
            <span className="hc-tag text-[#c00000] text-[9px] leading-none mb-1 flex items-center gap-2">
              {!unlocked && (
                <span className="text-[#7a7a7a] normal-case tracking-normal">
                  KLIK DI MANA AJA BUAT SUARA
                </span>
              )}
              {unlocked && (
                <>
                  {HAS_PLAYLIST
                    ? `NOW PLAYING ${String(idx + 1).padStart(2, '0')}/${String(TRACKS.length).padStart(2, '0')}`
                    : 'NOW PLAYING'}
                </>
              )}
            </span>
            <span
              className="text-xs md:text-sm tracking-[0.2em] text-white uppercase truncate font-black"
              style={{ fontFamily: 'var(--font-anton)' }}
            >
              {track.title}
            </span>
          </div>
          <canvas ref={canvasRef} className="flex-1 h-8 min-w-0" width={800} height={32} />
        </div>

        {HAS_PLAYLIST && (
          <select
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="hidden md:block bg-black border-2 border-[#333] text-[#7a7a7a] text-xs tracking-[0.2em] uppercase px-2 py-2 hover:border-[#c00000] focus:outline-none focus:border-[#c00000]"
            aria-label="Pilih track"
          >
            {TRACKS.map((t, i) => (
              <option key={t.id} value={i}>
                {String(i + 1).padStart(2, '0')} — {t.title}
              </option>
            ))}
          </select>
        )}

        <audio
          ref={audioRef}
          src={track.src}
          crossOrigin="anonymous"
          loop={!HAS_PLAYLIST}
          onEnded={HAS_PLAYLIST ? next : undefined}
        />
      </div>
    </div>
  );
}