"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Play, Pause, MapPin, ArrowUpRight, Volume2, Instagram, Youtube, Music, Mail, SkipBack, SkipForward } from "lucide-react";
import ReflexShowreel from "@/components/ReflexShowreel";

const TRACKS = [
  { src: "/HompimpahHC/audio/track-01.mp4", title: "Lawan Adalah Kunci", num: "01" },
  { src: "/HompimpahHC/audio/track-02.mp3", title: "Hari Ini Milik Kita", num: "02" },
  { src: "/HompimpahHC/audio/track-03.mp3", title: "Hardolin",           num: "03" },
  { src: "/HompimpahHC/audio/track-04.mp3", title: "Stand Up Wake Up",   num: "04" },
];

const ARTISTS = [
  { name: "Ademura",   role: "VOKAL",  quote: "Suara adalah senjata.",       img: "/HompimpahHC/crew/ademura.jpg" },
  { name: "Tissen 88", role: "GITAR",  quote: "Riff bukan dekorasi.",         img: "/HompimpahHC/crew/tissen.jpg" },
  { name: "Adam",      role: "GUITAR", quote: "Distosi yang menggetarkan.",   img: "/HompimpahHC/crew/adam.jpg" },
  { name: "Fachrizal", role: "DRUM",   quote: "Chaos butuh beat.",            img: "/HompimpahHC/crew/fachrizal.jpg" },
  { name: "Boby",      role: "BASS",   quote: "Low-end yang menggetarkan.",   img: "/HompimpahHC/crew/boby.jpg" },
];

const RELEASES = [
  { title: "Lawan Adalah Kunci", year: 2024, type: "LP", tracks: 10, dur: "42:18" },
  { title: "Haari Ini Milik Kita", year: 2023, type: "EP", tracks: 5, dur: "18:42" },
  { title: "Hardolin", year: 2022, type: "Single", tracks: 1, dur: "3:47" },
];

const SHOWS = [
  { date: "12 OKT 2024", city: "JAKARTA", venue: "Kopi Panggung", status: "SOLD OUT" },
  { date: "19 OKT 2024", city: "BANDUNG", venue: "Lapangan Gasibu", status: "SELLING FAST" },
  { date: "02 NOV 2024", city: "SURABAYA", venue: "Underground Club", status: "TICKETS" },
  { date: "16 NOV 2024", city: "YOGYAKARTA", venue: "Jogja Expo Center", status: "TICKETS" },
];

const TICKER_ITEMS = ["RAW ENERGY", "FUTURE ANARCHY", "JAKARTA HARDCORE", "NO COMPROMISE", "H2C // 2019", "SONIC WEAPON", "SYSTEM OVERRIDE"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** 0 = reduced motion, 0.55 = mobile/tablet kecil, 1 = desktop */
function useIntensity() {
  const reduce = useReducedMotion();
  const [level, setLevel] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia("(max-width: 1023px)");
    const f = () => setLevel(mq.matches ? 0.55 : tablet.matches ? 0.8 : 1);
    f();
    mq.addEventListener("change", f);
    tablet.addEventListener("change", f);
    return () => {
      mq.removeEventListener("change", f);
      tablet.removeEventListener("change", f);
    };
  }, []);
  return reduce ? 0 : level;
}

function AnimatedText({
  text,
  className = "",
  delay = 0,
  as = "span"
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const Tag = as;
  const letters = text.split("");
  return (
    <Tag className={className}>
      {letters.map((char: string, i: number) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * Reveal 3D terikat scroll: elemen masuk dari kejauhan (translateZ negatif),
 * miring di sumbu X (dan Y bila dir != 0), lalu "rata" di tengah layar,
 * dan sedikit mundur lagi saat keluar viewport.
 */
function Reveal3D({
  children,
  className = "",
  dir = 0,
  depth = 1,
}: {
  children: React.ReactNode;
  className?: string;
  dir?: number;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const k = useIntensity();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = scrollYProgress;

  const rotateX = useTransform(p, [0, 0.3, 0.72, 1], [38 * k * depth, 0, 0, -18 * k * depth]);
  const rotateY = useTransform(p, [0, 0.3, 0.72, 1], [28 * k * dir, 0, 0, -12 * k * dir]);
  const x = useTransform(p, [0, 0.3, 1], [60 * k * dir, 0, 0]);
  const y = useTransform(p, [0, 0.3, 0.72, 1], [70 * k, 0, 0, -30 * k]);
  const z = useTransform(p, [0, 0.3, 0.72, 1], [-220 * k * depth, 0, 0, -90 * k * depth]);
  const scale = useTransform(p, [0, 0.3, 0.72, 1], [1 - 0.08 * k, 1, 1, 1 - 0.03 * k]);
  const opacity = useTransform(p, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);

  if (k === 0) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          x,
          y,
          z,
          scale,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Kartu dengan tilt mengikuti kursor (hanya mouse, tidak mengganggu touch) */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const k = useIntensity();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || k === 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={k ? { y: -10, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-acid z-[70] pointer-events-none"
    />
  );
}

/** Ticker yang "terseret" (skew) mengikuti kecepatan scroll */
function Ticker() {
  const k = useIntensity();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 80, damping: 30 });
  const skewX = useTransform(smooth, [-2000, 0, 2000], [-10 * k, 0, 10 * k]);
  const scaleY = useTransform(smooth, [-2000, 0, 2000], [1.15, 1, 1.15]);

  return (
    <div className="border-y border-steel/30 py-4 overflow-hidden bg-acid/5">
      <motion.div style={{ skewX, scaleY }} className="flex whitespace-nowrap animate-marquee">
        {[0, 1].map((kk) => (
          <div key={kk} className="flex items-center">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="text-[10px] tracking-[0.5em] text-steel px-6">{item}</span>
                <span className="text-acid">&#9670;</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function FloatingShard({
  progress,
  top,
  left,
  size,
  speed,
  spin,
  round = false,
  className = "",
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  top: string;
  left: string;
  size: number;
  speed: number;
  spin: number;
  round?: boolean;
  className?: string;
}) {
  const k = useIntensity();
  const y = useTransform(progress, [0, 1], [0, -380 * speed * k]);
  const rotate = useTransform(progress, [0, 1], [0, spin * k]);
  const rotateX = useTransform(progress, [0, 1], [0, 220 * k]);
  const z = useTransform(progress, [0, 1], [0, 160 * speed * k]);
  return (
    <motion.div
      aria-hidden
      style={{
        top,
        left,
        width: size,
        height: size,
        y,
        rotate,
        rotateX,
        z,
        transformPerspective: 800,
      }}
      className={
        "absolute pointer-events-none border border-acid/30 " +
        (round ? "rounded-full " : "") +
        className
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const k = useIntensity();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Art: miring ke belakang & mengecil saat scroll turun
  const artRotateX = useTransform(p, [0, 1], [0, 32 * k]);
  const artY = useTransform(p, [0, 1], [0, -90 * k]);
  const artScale = useTransform(p, [0, 1], [1, 1 - 0.22 * k]);
  const artOpacity = useTransform(p, [0, 0.85], [1, 0.1]);

  // Teks: parallax berbeda kecepatan
  const textY = useTransform(p, [0, 1], [0, -150 * k]);
  const textZ = useTransform(p, [0, 1], [0, 120 * k]);
  const textOpacity = useTransform(p, [0, 0.7], [1, 0]);

  // Lantai grid perspektif
  const gridY = useTransform(scrollY, (v) => (v * 0.35 * k) % 64);
  const gridOpacity = useTransform(p, [0, 1], [0.9, 0.2]);

  // Mouse tilt (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 18 });
  const smy = useSpring(my, { stiffness: 90, damping: 18 });
  const mRotY = useTransform(smx, [-0.5, 0.5], [-12 * k, 12 * k]);
  const mRotX = useTransform(smy, [-0.5, 0.5], [9 * k, -9 * k]);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || k === 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.section
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-10 relative overflow-hidden"
    >
      {/* Lantai grid 3D */}
      <motion.div
        aria-hidden
        style={{
          opacity: gridOpacity,
          perspective: 600,
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 90%)",
          maskImage: "linear-gradient(to top, black 10%, transparent 90%)",
        }}
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none overflow-hidden"
      >
        <div
          style={{ transform: "rotateX(62deg)", transformOrigin: "50% 100%" }}
          className="absolute -inset-x-[50%] bottom-0 h-[200%] overflow-hidden text-acid/20"
        >
          <motion.div
            style={{
              y: gridY,
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              willChange: "transform",
            }}
            className="absolute inset-x-0 -top-16 bottom-0"
          />
        </div>
      </motion.div>

      {/* Shard melayang berlapis (depth) */}
      <FloatingShard progress={p} top="14%" left="6%" size={56} speed={0.5} spin={160} />
      <FloatingShard progress={p} top="26%" left="86%" size={84} speed={1.1} spin={-200} round />
      <FloatingShard progress={p} top="62%" left="78%" size={36} speed={0.8} spin={260} className="bg-acid/10" />
      <FloatingShard progress={p} top="70%" left="10%" size={70} speed={1.3} spin={-120} round className="hidden sm:block" />
      <FloatingShard progress={p} top="44%" left="48%" size={28} speed={0.35} spin={300} className="hidden md:block bg-acid/10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-[10px] tracking-[0.5em] text-acid mb-8">EST. 2014 // BOGOR, INDONESIA</motion.p>

        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div style={{ perspective: 1100 }}>
              <motion.div
                style={{
                  rotateX: artRotateX,
                  y: artY,
                  scale: artScale,
                  opacity: artOpacity,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <motion.div style={{ rotateX: mRotX, rotateY: mRotY, transformStyle: "preserve-3d" }}>
                  <motion.img
                    src="/HompimpahHC/hero-art.png"
                    alt="H2C Resistensi"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-2xl mb-8 mix-blend-screen"
                                      />
                </motion.div>
              </motion.div>
            </div>

            <AnimatedText
              text="H2C HARDCORE: BOGOR'S UNIT HARDCORE"
              as="h2"
              className="brutal-text text-lg md:text-4xl leading-tight text-bone"
              delay={0.6}
            />
          </div>

          <div style={{ perspective: 900 }} className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                style={{ y: textY, z: textZ, opacity: textOpacity, transformStyle: "preserve-3d" }}
                className="text-sm text-steel leading-relaxed"
              >
                <p>Alright, dengerin baik-baik. Ini bukan sekadar band, ini H2C unit Hardcore. Datang dari hiruk-pikuk Bogor yang sering lo kira cuma adem-ayem, mereka adalah anjing liar yang siap merobek telinga dengan brutalitas yang jujur dan tanpa kompromi. Lupain sound-sound manis atau lirik yang dibungkus rapi. H2C Hardcore ini anti-mainstream, bro. Mereka nyerang dengan riff-riff serrated-edge, pukulan drum yang bikin rusuk lo bergetar, dan vokal yang teriak dengan penuh amarah tentang protes di jalanan, bukan tentang musik cinta catchy, tapi tentang kekuatan mental yang mendobrak batas. Lirik-lirik mereka? Ini bukan puisi-puisi curhatan remaja. H2C Hardcore ini menantang status kemunafikan, kepalsuan hidup, dan realita pahit yang sering lo coba hindari. Mereka adalah suara bagi yang muak, bagi yang merasa ditindas, dan bagi mereka yang berani mempertanyakan status quo. Mereka nggak bakal basa-basi, nggak takut beda, dan nggak peduli lo suka atau nggak.</p>
                <p className="mt-3">Jadi, kalo lo nyari band yang bisa jadi soundtrack buat revolusi pribadi lo, buat malam-malam penuh kekesalan, atau cuma buat sekadar pengen ngegas energi hardcore yang asli dan nggak dibikin-bikin, Hompimpaah Hardcore adalah jawabannya. Mereka bukan cuma sekadar musik, mereka adalah pemberontakan, mereka mengguncang lo, dan mereka ada di sini bikin mikir dua kali tentang semua yang lo yakini. H2C Hardcore, ini bukan cuma musik moshpit, ini perlawanan.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="flex flex-wrap gap-3 mt-14">
          <a href="#music" className="group bg-acid text-void px-8 py-4 text-[10px] tracking-[0.3em] hover:bg-bone transition-colors flex items-center gap-2">
            <Music className="w-4 h-4" /> DENGERIN
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a href="#shows" className="border border-steel text-steel px-8 py-4 text-[10px] tracking-[0.3em] hover:border-acid hover:text-acid transition-colors">LIHAT JADWAL</a>
          <a href="#contact" className="border border-steel text-steel px-8 py-4 text-[10px] tracking-[0.3em] hover:border-acid hover:text-acid transition-colors">BOOK US</a>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const [scanOks, setScanOks] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const [playing, setPlaying] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const update = () => {
      if (!el.duration) return;
      const pr = el.currentTime / el.duration;
      if (barRef.current) barRef.current.style.transform = "scaleX(" + pr + ")";
      if (pctRef.current) pctRef.current.textContent = Math.floor(pr * 100) + "%";
    };
    el.addEventListener("timeupdate", update);
    return () => el.removeEventListener("timeupdate", update);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setScanOks([true, false, false, false]), 2800);
    const t2 = setTimeout(() => setScanOks([true, true, false, false]), 4100);
    const t3 = setTimeout(() => setScanOks([true, true, true, false]), 5400);
    const t4 = setTimeout(() => setScanOks([true, true, true, true]), 6600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Smooth scroll untuk anchor nav
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = prev; };
  }, []);

  // Auto-play saat ganti track (kalau sebelumnya playing)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
    if (pctRef.current) pctRef.current.textContent = "0%";
    el.load();
    if (playing) {
      el.play().catch(() => {});
    }
  }, [currentTrack]);

  const handleEnter = () => {
    setPlaying(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch((e) => console.log("Blocked:", e));
    }
    setShowReel(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  const nextTrack = useCallback(() => {
    setCurrentTrack((i) => (i + 1) % TRACKS.length);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrack((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  }, []);

  const handleReelComplete = useCallback(() => {
    setShowReel(false);
    setEntered(true);
  }, []);

  return (
    <div className="min-h-screen bg-void text-bone font-body relative overflow-x-hidden">
      <audio
        ref={audioRef}
        src={TRACKS[currentTrack].src}
        onEnded={nextTrack}
      />
      <div className="scanlines fixed inset-0 z-[60] opacity-40 pointer-events-none transform-gpu" />

      <AnimatePresence>
        {!entered && !showReel && (
          <motion.div
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-void-deep [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="flex min-h-full flex-col items-center justify-center px-6 py-8">
            <div className="w-full max-w-2xl font-body text-sm text-steel mb-6">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-bone">&gt; INITIALIZING H2C POWERD BY NUGIST... <motion.span initial={{ opacity: 0 }} animate={{ opacity: scanOks[0] ? 1 : 0 }} transition={{ duration: 0.2 }} className="text-acid">OK</motion.span></motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }} className="mt-1">&gt; SCANNING FREQUENCY [432Hz]... <motion.span initial={{ opacity: 0 }} animate={{ opacity: scanOks[1] ? 1 : 0 }} transition={{ duration: 0.2 }} className="text-acid">OK</motion.span></motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.4 }} className="mt-1">&gt; LOADING H2C BOGOR UNIT HARDCORE... <motion.span initial={{ opacity: 0 }} animate={{ opacity: scanOks[2] ? 1 : 0 }} transition={{ duration: 0.2 }} className="text-acid">OK</motion.span></motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.7 }} className="mt-4">&gt; [ <motion.span initial={{ color: "#dc2626" }} animate={{ color: scanOks[3] ? "#22c55e" : "#dc2626" }} transition={{ duration: 0.4 }}>ACCESS GRANTED</motion.span> ]</motion.p>
            </div>

            <motion.img
              src="/HompimpahHC/logo-h2c.png"
              alt="H2C"
              initial={{ opacity: 0, scale: 0.9, rotateY: 0 }}
              animate={{ opacity: 1, scale: 1, rotateY: 360 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="w-[40vw] max-w-xs"
              style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.9 }} className="text-steel text-[10px] tracking-[0.5em] mt-8 mb-10">H2C HARDCORE</motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 7.1 }}
              onClick={handleEnter}
              className="group border-2 border-acid text-acid px-10 py-4 tracking-[0.3em] uppercase hover:bg-acid hover:text-void transition-all duration-500 flex items-center gap-3"
            >
              <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              [ MASUK ]
            </motion.button>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7.3 }} className="mt-3 text-steel text-[10px] tracking-widest">Welcome to H2C</motion.p>

          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {showReel && (
        <ReflexShowreel onComplete={handleReelComplete} />
      )}

      {entered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pb-24"
        >
          <ScrollProgress />

          <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-4 border-b border-steel/30 bg-void/95 transform-gpu">
            <span className="editorial-text text-2xl text-acid">H2C</span>
            <div className="hidden md:flex gap-8 text-[10px] tracking-[0.3em] text-steel">
              {["CREW", "MUSIC", "SHOWS", "PRESS", "CONTACT"].map((item) => (
                <a key={item} href={"#" + item.toLowerCase()} className="hover:text-acid transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-acid group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </nav>

          <Hero />

          <Ticker />

          {/* ARTIST */}
          <section id="crew" className="px-6 md:px-10 py-20 md:py-28 scroll-mt-16">
            <SectionHeader index="01" title="Artist" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mt-12 md:mt-16">
              {ARTISTS.map((m, i) => (
                <Reveal3D key={m.name} dir={i % 2 === 0 ? -1 : 1} depth={1 + (i % 3) * 0.2}>
                  <TiltCard className="group border border-steel/30 hover:border-acid transition-colors bg-void-deep/50 overflow-hidden">
                    <div className="aspect-[3/4] bg-steel/10 relative overflow-hidden">
                      <img
                        src={m.img}
                        alt={m.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-void-deep via-void-deep/30 to-transparent pointer-events-none" />
                      <span className="editorial-text text-[6rem] sm:text-[8rem] text-bone/15 group-hover:text-acid/30 transition-colors leading-none absolute bottom-4 right-4 z-10">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="p-5 md:p-6">
                      <p className="text-[10px] tracking-[0.4em] text-acid mb-2">{m.role}</p>
                      <h3 className="editorial-text text-3xl md:text-4xl text-bone mb-3">{m.name}</h3>
                      <p className="text-xs text-steel italic leading-relaxed">&ldquo;{m.quote}&rdquo;</p>
                    </div>
                  </TiltCard>
                </Reveal3D>
              ))}
            </div>
          </section>

          {/* DISCOGRAPHY */}
          <section id="music" className="px-6 md:px-10 py-20 md:py-28 border-t border-steel/30 scroll-mt-16">
            <SectionHeader index="02" title="DISCOGRAPHY" />
            <div className="mt-12 md:mt-16 flex flex-col">
              {RELEASES.map((r, i) => (
                <Reveal3D key={r.title} dir={i % 2 === 0 ? -1 : 1} depth={0.8}>
                  <motion.div
                    whileHover={{ x: 12 }}
                    className="group grid grid-cols-12 gap-4 items-center py-6 md:py-8 border-b border-steel/30 hover:border-acid transition-colors cursor-pointer px-2"
                  >
                    <div className="col-span-2 md:col-span-1">
                      <div className="aspect-square bg-steel/20 flex items-center justify-center group-hover:bg-acid transition-colors">
                        <Play className="w-5 h-5 text-bone group-hover:text-void transition-colors" />
                      </div>
                    </div>
                    <div className="col-span-10 md:col-span-5">
                      <h3 className="editorial-text text-3xl md:text-5xl text-bone group-hover:text-acid transition-colors leading-none">{r.title}</h3>
                      <p className="text-[10px] tracking-[0.3em] text-steel mt-2">{r.year} // {r.type}</p>
                    </div>
                    <div className="col-span-6 md:col-span-3 text-xs text-steel">{r.tracks} TRACKS // {r.dur}</div>
                    <div className="col-span-6 md:col-span-3 flex justify-end gap-4 md:gap-5 text-[10px] tracking-widest text-steel">
                      <a href="#" className="hover:text-acid transition-colors">SPOTIFY</a>
                      <a href="#" className="hover:text-acid transition-colors">BANDCAMP</a>
                      <a href="#" className="hover:text-acid transition-colors">YT</a>
                    </div>
                  </motion.div>
                </Reveal3D>
              ))}
            </div>
          </section>

          {/* SHOWS */}
          <section id="shows" className="px-6 md:px-10 py-20 md:py-28 border-t border-steel/30 scroll-mt-16">
            <SectionHeader index="03" title="LIVE DATES" />
            <div className="mt-12 md:mt-16 flex flex-col">
              {SHOWS.map((s, i) => (
                <Reveal3D key={i} dir={i % 2 === 0 ? 1 : -1} depth={0.7}>
                  <div className="grid grid-cols-12 gap-4 items-center py-6 md:py-8 border-b border-steel/30 hover:bg-acid/5 transition-colors px-4 group">
                    <div className="col-span-12 md:col-span-2 text-steel text-xs tracking-widest">{s.date}</div>
                    <div className="col-span-8 md:col-span-4">
                      <h3 className="editorial-text text-3xl text-bone group-hover:text-acid transition-colors leading-none">{s.city}</h3>
                      <p className="text-xs text-steel flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {s.venue}</p>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-[10px] tracking-[0.3em]">
                      <StatusBadge status={s.status} />
                    </div>
                    <div className="col-span-12 md:col-span-3 flex md:justify-end">
                      <button className="border border-steel text-steel px-6 py-2 text-[10px] tracking-[0.3em] hover:border-acid hover:text-acid hover:bg-acid/10 transition-all">TIKET</button>
                    </div>
                  </div>
                </Reveal3D>
              ))}
            </div>
          </section>

          {/* PRESS */}
          <section id="press" className="px-6 md:px-10 py-20 md:py-28 border-t border-steel/30 scroll-mt-16">
            <SectionHeader index="04" title="PRESS KIT" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 md:mt-16">
              {[
                { title: "EPK", desc: "PDF // 2MB" },
                { title: "PHOTOS", desc: "ZIP // 45MB" },
                { title: "RIDER", desc: "PDF // 500KB" },
              ].map((item, i) => (
                <Reveal3D key={i} dir={i - 1} depth={1.1}>
                  <TiltCard className="h-full">
                    <a href="#" className="border border-steel/30 hover:border-acid p-8 flex flex-col gap-6 transition-colors group h-full bg-void/40">
                      <span className="text-[10px] tracking-[0.3em] text-steel group-hover:text-acid transition-colors">{item.desc}</span>
                      <h4 className="editorial-text text-3xl text-bone group-hover:text-acid transition-colors">{item.title}</h4>
                      <ArrowUpRight className="w-5 h-5 text-steel group-hover:text-acid group-hover:translate-x-1 group-hover:-translate-y-1 transition-all mt-auto" />
                    </a>
                  </TiltCard>
                </Reveal3D>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="px-6 md:px-10 py-20 md:py-28 border-t border-steel/30 scroll-mt-16">
            <SectionHeader index="05" title="CONTACT" />
            <Reveal3D className="mt-12 md:mt-16 max-w-3xl" depth={1.2}>
              <div className="border border-acid/40 bg-void-deep p-6 sm:p-8 md:p-12 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-acid" />
                <form className="flex flex-col gap-6 text-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="NAMA" placeholder="Nugist" />
                    <Field label="EMAIL" placeholder="Nugist@gidomain.com" type="email" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.3em] text-steel block mb-2">PESAN</label>
                    <textarea rows={5} className="w-full bg-transparent border border-steel focus:border-acid outline-none p-3 text-bone resize-none transition-colors" placeholder="Ga Usah Banyak Basa Basi Birokrasi..." />
                  </div>
                  <button type="button" className="bg-acid text-void py-4 tracking-[0.3em] hover:bg-bone transition-colors text-xs">[ KIRIM PESAN ]</button>
                </form>
              </div>
            </Reveal3D>
          </section>

          {/* FOOTER */}
          <footer className="px-6 md:px-10 py-16 border-t border-steel/30 text-center">
            <Reveal3D depth={1.4}>
              <img
                src="/HompimpahHC/logo-h2c.png"
                alt="H2C"
                className="w-40 sm:w-48 md:w-64 mx-auto"
              />
            </Reveal3D>
            <p className="text-[10px] tracking-[0.5em] text-steel mt-4">H2C HARDCORE // EST. 2014</p>
            <div className="flex justify-center gap-8 mt-8 text-steel">
              <a href="https://instagram.com/h2c.hardcore" target="_blank" rel="noopener noreferrer" className="hover:text-acid transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-acid transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="hover:text-acid transition-colors"><Music className="w-5 h-5" /></a>
              <a href="#" className="hover:text-acid transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-[10px] text-steel/50 mt-10">Copyright 2026 H2C. ALL RIGHTS RESERVED. POWERD BY NUGIST</p>
          </footer>

          <div className="fixed bottom-0 inset-x-0 z-50 border-t-2 border-acid bg-void-deep transform-gpu">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-2 md:gap-4">
              <button onClick={prevTrack} className="w-10 h-10 md:w-12 md:h-12 grid place-items-center border border-acid text-acid hover:bg-acid hover:text-void transition-colors shrink-0" aria-label="Previous">
                <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button onClick={togglePlay} className="w-12 h-12 grid place-items-center bg-acid text-void hover:bg-bone transition-colors shrink-0" aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={nextTrack} className="w-10 h-10 md:w-12 md:h-12 grid place-items-center border border-acid text-acid hover:bg-acid hover:text-void transition-colors shrink-0" aria-label="Next">
                <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <div className="flex-1 min-w-0 flex items-center gap-4">
                <div className="hidden md:flex flex-col min-w-0 w-52">
                  <span className="text-[9px] tracking-[0.3em] text-acid">NOW PLAYING</span>
                  <span className="editorial-text text-lg text-bone truncate leading-none">{TRACKS[currentTrack].title} - {TRACKS[currentTrack].num}</span>
                </div>
                <div className="flex-1 h-10 flex items-center gap-[2px] min-w-0">
                  {Array.from({ length: 56 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-acid/60"
                      style={{
                        height: (20 + Math.sin(i * 0.6) * 30 + (i % 7) * 4) + "%",
                        animation: playing ? "pulse-slow 0.8s ease-in-out " + (i * 0.015) + "s infinite alternate" : "none",
                        opacity: playing ? 1 : 0.4,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end w-24">
                <span className="text-[9px] tracking-[0.3em] text-steel">PROGRESS</span>
                <span ref={pctRef} className="text-xs text-bone">0%</span>
              </div>
            </div>
            <div className="h-[2px] bg-steel/30">
              <div ref={barRef} className="h-full w-full bg-acid" style={{ transform: "scaleX(0)", transformOrigin: "0% 50%", willChange: "transform" }} />
            </div>
          </div>
        </motion.main>
      )}
    </div>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <Reveal3D depth={1.3}>
      <div className="flex items-end justify-between border-b border-steel/30 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.5em] text-acid">{index} //</span>
          <AnimatedText text={title} as="h2" className="editorial-text text-4xl sm:text-5xl md:text-7xl text-bone mt-3 leading-none block" delay={0.2} />
        </div>
      </div>
    </Reveal3D>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "SOLD OUT") return <span className="text-warm animate-pulse">&#9679; SOLD OUT</span>;
  if (status === "SELLING FAST") return <span className="text-acid animate-pulse">&#9679; SELLING FAST</span>;
  return <span className="text-steel">&#9679; TICKETS AVAILABLE</span>;
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] text-steel block mb-2">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full bg-transparent border-b border-steel focus:border-acid outline-none p-2 text-bone transition-colors" />
    </div>
  );
}