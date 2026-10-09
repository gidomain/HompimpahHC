'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const SCENES = [
  { id: 'hook',   duration: 1000 },
  { id: 'typo',   duration: 2000 },
  { id: 'video',  duration: 8000 },
  { id: 'photos', duration: 6000 },
  { id: 'final',  duration: 2500 },
] as const;

type SceneId = (typeof SCENES)[number]['id'];

const ORANGE = '#FF6B00';
const ACID = '#C6FF00';

const PHOTOS = [
  { src: '/HompimpahHC/showreel/band-01.jpg', label: 'H2C BOGOR',          position: 'center 40%' },
  { src: '/HompimpahHC/showreel/band-02.jpg', label: 'DJARUM ON STAGE', position: 'center 15%' },
  { src: '/HompimpahHC/showreel/band-03.jpg', label: 'LIVE // 2024',       position: 'center 35%' },
  { src: '/HompimpahHC/showreel/band-04.jpg', label: 'JKT ON STAGE',           position: 'center 8%' },
  { src: '/HompimpahHC/showreel/band-05.jpg', label: 'BOGOR HARDCORE',     position: 'center 5%' },
  { src: '/HompimpahHC/showreel/band-07.jpg', label: 'MASCOT',            position: 'center 2%' },
  { src: '/HompimpahHC/showreel/band-06.jpg', label: 'WE ARE H2C',       position: 'center 88%' },
  
];


export default function ReflexShowreel({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (index >= SCENES.length) {
      onCompleteRef.current();
      return;
    }
    const t = setTimeout(() => setIndex((i) => i + 1), SCENES[index].duration);
    return () => clearTimeout(t);
  }, [index]);

  const skip = useCallback(() => {
    onCompleteRef.current();
  }, []);

  const current: SceneId | undefined = SCENES[index]?.id;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black overflow-hidden cursor-pointer select-none"
      onClick={skip}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {current === 'hook'   && <HookScene   key="hook" />}
      {current === 'typo'   && <TypoScene   key="typo" />}
      {current === 'photos' && <PhotosScene key="photos" />}
      {current === 'video'  && <VideoScene  key="video" />}
      {current === 'final'  && <FinalScene  key="final" />}

      <div className="absolute bottom-6 right-6 text-[10px] text-white/40 font-mono tracking-[0.3em] z-10">
        CLICK TO SKIP
      </div>
    </motion.div>
  );
}

/* ---------- SCENE 1 — HOOK (1s) ---------- */
function HookScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">

      {/* White flash di awal */}
      <motion.div
        className="absolute inset-0 bg-white z-30 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Pulse rings nyebar dari tengah — putih, netral */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            borderColor: i % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
            width: 100,
            height: 100,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 25, opacity: 0 }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Soft white glow di belakang logo */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-[5]"
        style={{
          background: 'white',
          width: 300,
          height: 300,
          filter: 'blur(100px)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.1, 0.8], opacity: [0, 0.5, 0.3] }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* H2C logo slam-in dari zoom ekstrim — warna natural, tanpa filter */}
      <motion.img
        src="/HompimpahHC/logo-h2c.png"
        alt="H2C"
        className="relative w-[60vw] max-w-[600px] z-10"
        initial={{ scale: 6, opacity: 0, rotate: -12 }}
        animate={{
          scale: [6, 1.08, 1],
          opacity: [0, 1, 1],
          rotate: [-12, 3, 0],
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.6, 1],
        }}
        style={{
          willChange: 'transform, opacity',
        }}
      />

      {/* Scanline sweep — netral putih */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.25) 3px, rgba(255,255,255,0.25) 4px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.5, times: [0, 0.3, 1] }}
      />
    </div>
  );
}

/* ---------- SCENE 2 — TYPOGRAPHY (1.5s) ---------- */
function TypoScene() {
  const words = 'BOGOR UNIT HARDCORE'.split(' ');

  let globalIndex = 0;

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div
        className="flex flex-wrap items-center justify-center"
        style={{
          fontFamily: 'Anton, sans-serif',
          gap: '1em',   // ← pakai inline style biar pasti jalan
          rowGap: '0.2em',
        }}
      >
        {words.map((word, wi) => (
          <div key={wi} className="flex">
            {word.split('').map((letter, li) => {
              const idx = globalIndex++;
              return (
                <motion.span
                  key={li}
                  className="text-white inline-block"
                  style={{
                    fontSize: 'clamp(36px, 7vw, 110px)',
                    lineHeight: 1,
                  }}
                  initial={{
                    x: (idx % 2 === 0 ? -1 : 1) * 500,
                    y: ((idx % 3) - 1) * 300,
                    opacity: 0,
                    rotate: (idx % 2 === 0 ? -1 : 1) * 40,
                    scale: 0.5,
                  }}
                  animate={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>
        ))}

        {/* Dot merah di akhir */}
        <motion.span
          className="inline-block"
          style={{
            color: '#FF1A1A',
            fontSize: 'clamp(36px, 7vw, 110px)',
            lineHeight: 1,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.6, 1], opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          .
        </motion.span>
      </div>
    </div>
  );
}

/* ---------- SCENE 3 — PHOTO MONTAGE (2.5s) ---------- */
function PhotosScene() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHOTOS.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
           {PHOTOS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: idx === i ? 1 : 0,
            scale: idx === i ? 1 : 1.15,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Blur fill — nutupin area kosong di HP */}
          <img
            src={p.src}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'blur(40px) brightness(0.35) saturate(1.3)',
              transform: 'scale(1.15)',
            }}
          />
          {/* Foto utama — contain di HP, cover di desktop */}
          <img
            src={p.src}
            alt={p.label}
            className="absolute inset-0 w-full h-full object-contain object-center md:object-cover md:[object-position:var(--obj-pos)]"
            style={{
              filter: 'contrast(1.15) saturate(0.85)',
              '--obj-pos': p.position,
            } as React.CSSProperties}
          />
        </motion.div>
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,107,0,0.25) 3px, rgba(255,107,0,0.25) 4px)',
        }}
        animate={{ y: ['-5%', '5%', '-5%'] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute left-0 right-0 h-[12%] pointer-events-none mix-blend-screen"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(255,0,60,0.4), rgba(0,229,255,0.4), transparent)',
        }}
        initial={{ top: '-15%' }}
        animate={{ top: '115%' }}
        transition={{ duration: 1.8, ease: 'linear' }}
      />

      <div className="absolute bottom-12 left-8 md:left-16 z-10">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: ORANGE }}
          />
          <span className="font-mono text-white text-xs md:text-sm tracking-[0.5em]">
            {PHOTOS[idx].label}
          </span>
        </motion.div>
      </div>

      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/40" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/40" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/40" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/40" />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-mono text-white/70 text-[10px] tracking-[0.4em]">REC</span>
      </div>
    </div>
  );
}

/* ---------- SCENE 4 — VIDEO (2.5s) ---------- */
function VideoScene() {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      <video
        src="/HompimpahHC/showreel/scene-04.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'contrast(1.2) saturate(0.9) brightness(0.85)',
          willChange: 'transform',
          objectPosition: 'center 45%',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Color tint */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-color"
        style={{
          background: `linear-gradient(135deg, ${ORANGE}66 0%, transparent 50%, ${ACID}44 100%)`,
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)',
        }}
      />

      {/* RGB split logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Ghost merah */}
        <motion.img
          src="/HompimpahHC/logo-h2c.png"
          alt=""
          className="absolute w-[45vw] max-w-[500px]"
          style={{
            mixBlendMode: 'screen',
            filter: 'sepia(1) saturate(10) hue-rotate(-30deg) brightness(1.4)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0], x: [-8, -14, -8] }}
          transition={{ duration: 2.5 }}
        />

        {/* Ghost cyan */}
        <motion.img
          src="/HompimpahHC/logo-h2c.png"
          alt=""
          className="absolute w-[45vw] max-w-[500px]"
          style={{
            mixBlendMode: 'screen',
            filter: 'sepia(1) saturate(10) hue-rotate(150deg) brightness(1.4)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0], x: [8, 14, 8] }}
          transition={{ duration: 2.5 }}
        />

        {/* Logo utama */}
        <motion.img
          src="/HompimpahHC/logo-h2c.png"
          alt="H2C"
          className="relative w-[45vw] max-w-[500px]"
          style={{
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1.05, 1, 1.1] }}
          transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
        />
      </div>

      {/* LIVE indicator */}
      <div className="absolute top-8 left-8 flex items-center gap-2 z-10">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-mono text-white/70 text-[10px] tracking-[0.4em]">LIVE</span>
      </div>

      {/* Corner marks */}
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/40" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/40" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/40" />

      {/* Sweeping color bar */}
      <motion.div
        className="absolute left-0 right-0 h-[10%] pointer-events-none mix-blend-screen"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(255,107,0,0.3), rgba(198,255,0,0.3), transparent)',
        }}
        initial={{ top: '-15%' }}
        animate={{ top: '115%' }}
        transition={{ duration: 2.5, ease: 'linear' }}
      />
    </div>
  );
}

// /* ---------- SCENE 5 — CAMERA MOVE (2.5s) ---------- */
// function CameraScene() {
//   return (
//     <div className="absolute inset-0 flex items-center justify-center">
//       <motion.div
//         className="relative"
//         style={{ perspective: 400 }}
//         initial={{ scale: 0.3, opacity: 0 }}
//         animate={{ scale: 4, opacity: 1 }}
//         transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
//       >
//         {Array.from({ length: 14 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute border"
//             style={{
//               borderColor: i % 2 === 0 ? ORANGE : ACID,
//               width: 400,
//               height: 400,
//               left: '50%',
//               top: '50%',
//               marginLeft: -200,
//               marginTop: -200,
//               transform: `rotateX(${i * 12}deg) rotateY(${i * 12}deg)`,
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0, 0.8, 0.2] }}
//             transition={{ duration: 2.5, delay: i * 0.04 }}
//           />
//         ))}
//       </motion.div>

//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <motion.span
//           className="absolute font-bold"
//           style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 11vw, 180px)', color: '#FF0040', mixBlendMode: 'screen' }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0, 0.9, 0], x: [-6, -10, -6] }}
//           transition={{ duration: 2.5 }}
//         >
//           H2C
//         </motion.span>
//         <motion.span
//           className="absolute font-bold"
//           style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 11vw, 180px)', color: '#00E5FF', mixBlendMode: 'screen' }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0, 0.9, 0], x: [6, 10, 6] }}
//           transition={{ duration: 2.5 }}
//         >
//           H2C
//         </motion.span>
//         <motion.span
//           className="relative font-bold text-white"
//           style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 11vw, 180px)' }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1.05, 1, 1.1] }}
//           transition={{ duration: 2.5, times: [0, 0.2, 0.8, 1] }}
//         >
//           H2C
//         </motion.span>
//       </div>
//     </div>
//   );
// }

// /* ---------- SCENE 6 — COLOUR SHIFT (2.5s) ---------- */
// function ColorScene() {
//   return (
//     <div className="absolute inset-0">
//       <motion.div
//         className="absolute inset-0"
//         style={{ background: ORANGE, transformOrigin: 'bottom' }}
//         initial={{ scaleY: 0 }}
//         animate={{ scaleY: [0, 1, 1, 0] }}
//         transition={{ duration: 2.5, times: [0, 0.3, 0.55, 1], ease: 'easeInOut' }}
//       />
//       <motion.div
//         className="absolute inset-0 bg-white"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: [0, 0, 1, 1, 0] }}
//         transition={{ duration: 2.5, times: [0, 0.3, 0.4, 0.7, 1] }}
//       />
//       <div className="absolute inset-0 flex items-center justify-center gap-5">
//         {[0, 1, 2].map((i) => (
//           <motion.div
//             key={i}
//             className="bg-black/90 backdrop-blur rounded-xl border border-white/10 p-5"
//             style={{ width: 180, height: 240 }}
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: [0, 0, 1, 1, 0], y: [60, 60, 0, 0, -40] }}
//             transition={{ duration: 2.5, times: [0, 0.4, 0.55, 0.85, 1], delay: i * 0.08 }}
//           >
//             <div className="h-2 w-14 rounded-full mb-4" style={{ background: i === 1 ? ORANGE : ACID }} />
//             <div className="h-1 w-full rounded bg-white/20 mb-2" />
//             <div className="h-1 w-3/4 rounded bg-white/20 mb-2" />
//             <div className="h-1 w-5/6 rounded bg-white/20 mb-6" />
//             <div className="h-14 w-full rounded bg-white/5 border border-white/10" />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

/* ---------- SCENE 7 — FINAL FRAME (2.5s) ---------- */
function FinalScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{ borderColor: '#FF1A1A', width: 900, height: 900 }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.1, delay: i * 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}

      <div className="relative flex flex-col items-center gap-6">
        <motion.img
          src="/HompimpahHC/showreel/r-logo.png"
          alt="R"
          className="w-[40vw] max-w-[340px]"
          style={{ filter: 'invert(1) contrast(1.2)', willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0.6, rotate: -8, filter: 'invert(1) contrast(1.2) blur(12px)' }}
          animate={{ opacity: 1, scale: 2, rotate: 0, filter: 'invert(1) contrast(1.2) blur(0px)' }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          className="flex items-end gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-white font-mono tracking-[0.4em]"
            style={{ fontSize: 'clamp(12px, 1.2vw, 16px)' }}
          >
            H2C
          </span>
          <motion.span
            className="rounded-full inline-block"
            style={{ background: ORANGE, width: 8, height: 8, marginBottom: 4 }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.9 }}
          />
          <span
            className="text-white font-mono tracking-[0.4em]"
            style={{ fontSize: 'clamp(12px, 1.2vw, 16px)' }}
          >
            BOGOR UNIT BOGOR.
          </span>
        </motion.div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 4px)',
        }}
      />
    </div>
  );
}
