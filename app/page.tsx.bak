"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Pause, MapPin, ArrowUpRight, Volume2, Instagram, Youtube, Music, Mail } from "lucide-react";

const AUDIO_URL = "/audio/track-01.mp4";

const ARTISTS = [
  { name: "Muhammad Ade Mulya", role: "VOKAL", quote: "Suara adalah senjata." },
  { name: "mr X", role: "GITAR", quote: "Riff bukan dekorasi." },
  { name: "Tisen 88", role: "BASS", quote: "Low-end yang menggetarkan." },
  { name: "Fachrizal", role: "DRUM", quote: "Chaos butuh beat." },
];

const RELEASES = [
  { title: "MANIFESTO", year: 2024, type: "LP", tracks: 10, dur: "42:18" },
  { title: "KOTA TERBAKAR", year: 2023, type: "EP", tracks: 5, dur: "18:42" },
  { title: "SUARA DARI BAWAH", year: 2022, type: "Single", tracks: 1, dur: "3:47" },
];

const SHOWS = [
  { date: "12 OKT 2024", city: "JAKARTA", venue: "Kopi Panggung", status: "SOLD OUT" },
  { date: "19 OKT 2024", city: "BANDUNG", venue: "Lapangan Gasibu", status: "SELLING FAST" },
  { date: "02 NOV 2024", city: "SURABAYA", venue: "Underground Club", status: "TICKETS" },
  { date: "16 NOV 2024", city: "YOGYAKARTA", venue: "Jogja Expo Center", status: "TICKETS" },
];

const TICKER_ITEMS = ["RAW ENERGY", "FUTURE ANARCHY", "JAKARTA HARDCORE", "NO COMPROMISE", "H2C // 2019", "SONIC WEAPON", "SYSTEM OVERRIDE"];

function AnimatedText({ text, className = "", delay = 0, as = "span" }) {
  const Tag = as;
  const letters = text.split("");
  return (
    <Tag className={className}>
      {letters.map((char, i) => (
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

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const update = () => {
      if (el.duration) setProgress((el.currentTime / el.duration) * 100);
    };
    el.addEventListener("timeupdate", update);
    return () => el.removeEventListener("timeupdate", update);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setPlaying(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch((e) => console.log("Blocked:", e));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <div className="min-h-screen bg-void text-bone font-body relative">
      <audio ref={audioRef} src={AUDIO_URL} loop />
      <div className="scanlines fixed inset-0 z-[60] mix-blend-overlay" />

      <AnimatePresence>
        {!entered && (
          <motion.div
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void-deep px-6"
          >
            <div className="w-full max-w-2xl font-body text-sm text-steel mb-10">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-bone">&gt; INITIALIZING H2C_PROTOCOL...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-1">&gt; SCANNING FREQUENCY [432Hz]... <span className="text-acid">OK</span></motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="mt-1">&gt; LOADING SONIC WEAPONS... <span className="text-acid">OK</span></motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-4 text-acid">&gt; [ ACCESS GRANTED ]</motion.p>
            </div>

            <img
              src="/logo-h2c.png"
              alt="H2C"
              className="w-[60vw] max-w-md"
            />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="text-steel text-[10px] tracking-[0.5em] mt-4 mb-10">HOMPIMPAH HARDCORE</motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 }}
              onClick={handleEnter}
              className="group border-2 border-acid text-acid px-10 py-4 tracking-[0.3em] uppercase hover:bg-acid hover:text-void transition-all duration-500 flex items-center gap-3"
            >
              <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              [ MASUK ]
            </motion.button>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="mt-6 text-steel text-[10px] tracking-widest">AUDIO AKAN OTOMATIS DIPUTAR</motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pb-24"
        >
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-4 border-b border-steel/30 bg-void/90 backdrop-blur-md">
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

          <motion.section style={{ opacity: heroOpacity }} className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 relative">
            <div className="max-w-7xl mx-auto w-full">
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-[10px] tracking-[0.5em] text-acid mb-8">EST. 2019 // JAKARTA, INDONESIA</motion.p>

              <div className="grid md:grid-cols-12 gap-8 items-end">
                <div className="md:col-span-8">
                  <img
                    src="/logo-h2c.png"
                    alt="Hompimpah Hardcore"
                    className="w-full max-w-3xl mb-6"
                  />
                  <AnimatedText text="GANGGUAN DALAM SISTEM" as="h2" className="brutal-text text-2xl md:text-4xl leading-tight text-bone" delay={0.6} />
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="md:col-span-4 text-sm text-steel leading-relaxed">
                  <p>Hompimpah Hardcore - dibentuk di sela-sela hiruk-pikuk Jakarta. Suara yang lahir dari kemarahan, kebosanan, dan keinginan untuk mengganggu ketenangan.</p>
                  <p className="mt-3">Kami main di basement, cafe kecil, dan panggung yang lampunya mati.</p>
                </motion.div>
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

          <div className="border-y border-steel/30 py-4 overflow-hidden bg-acid/5">
            <div className="flex whitespace-nowrap animate-marquee">
              {[0, 1].map((k) => (
                <div key={k} className="flex items-center">
                  {TICKER_ITEMS.map((item, i) => (
                    <span key={i} className="flex items-center">
                      <span className="text-[10px] tracking-[0.5em] text-steel px-6">{item}</span>
                      <span className="text-acid">&#9670;</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <section id="crew" className="px-6 md:px-10 py-28">
            <SectionHeader index="01" title="THE CREW" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {ARTISTS.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12 }}
                  className="group border border-steel/30 hover:border-acid transition-colors bg-void-deep/50 overflow-hidden"
                >
                  <div className="aspect-[3/4] bg-steel/10 flex items-end p-4 relative overflow-hidden">
                    <div className="absolute inset-0 scanlines opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void-deep via-transparent to-transparent" />
                    <span className="editorial-text text-[8rem] text-bone/10 group-hover:text-acid/20 transition-colors leading-none relative z-10">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] tracking-[0.4em] text-acid mb-2">{m.role}</p>
                    <h3 className="editorial-text text-4xl text-bone mb-3">{m.name}</h3>
                    <p className="text-xs text-steel italic leading-relaxed">&ldquo;{m.quote}&rdquo;</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="music" className="px-6 md:px-10 py-28 border-t border-steel/30">
            <SectionHeader index="02" title="DISCOGRAPHY" />
            <div className="mt-16 flex flex-col">
              {RELEASES.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 12 }}
                  className="group grid grid-cols-12 gap-4 items-center py-8 border-b border-steel/30 hover:border-acid transition-colors cursor-pointer px-2"
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
                  <div className="col-span-6 md:col-span-3 flex justify-end gap-5 text-[10px] tracking-widest text-steel">
                    <a href="#" className="hover:text-acid transition-colors">SPOTIFY</a>
                    <a href="#" className="hover:text-acid transition-colors">BANDCAMP</a>
                    <a href="#" className="hover:text-acid transition-colors">YT</a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="shows" className="px-6 md:px-10 py-28 border-t border-steel/30">
            <SectionHeader index="03" title="LIVE DATES" />
            <div className="mt-16 flex flex-col">
              {SHOWS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-12 gap-4 items-center py-8 border-b border-steel/30 hover:bg-acid/5 transition-colors px-4 group"
                >
                  <div className="col-span-12 md:col-span-2 text-steel text-xs tracking-widest">{s.date}</div>
                  <div className="col-span-8 md:col-span-4">
                    <h3 className="editorial-text text-3xl text-bone group-hover:text-acid transition-colors leading-none">{s.city}</h3>
                    <p className="text-xs text-steel flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {s.venue}</p>
                  </div>
                  <div className="col-span-4 md:col-span-3 text-[10px] tracking-[0.3em]">
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="col-span-12 md:col-span-3 flex justify-end">
                    <button className="border border-steel text-steel px-6 py-2 text-[10px] tracking-[0.3em] hover:border-acid hover:text-acid hover:bg-acid/10 transition-all">TIKET</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="press" className="px-6 md:px-10 py-28 border-t border-steel/30">
            <SectionHeader index="04" title="PRESS KIT" />
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                { title: "EPK", desc: "PDF // 2MB" },
                { title: "PHOTOS", desc: "ZIP // 45MB" },
                { title: "RIDER", desc: "PDF // 500KB" },
              ].map((item, i) => (
                <motion.a key={i} href="#" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-steel/30 hover:border-acid p-8 flex flex-col gap-6 transition-colors group">
                  <span className="text-[10px] tracking-[0.3em] text-steel group-hover:text-acid transition-colors">{item.desc}</span>
                  <h4 className="editorial-text text-3xl text-bone group-hover:text-acid transition-colors">{item.title}</h4>
                  <ArrowUpRight className="w-5 h-5 text-steel group-hover:text-acid group-hover:translate-x-1 group-hover:-translate-y-1 transition-all mt-auto" />
                </motion.a>
              ))}
            </div>
          </section>

          <section id="contact" className="px-6 md:px-10 py-28 border-t border-steel/30">
            <SectionHeader index="05" title="CONTACT" />
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 max-w-3xl border border-acid/40 bg-void-deep p-8 md:p-12 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-acid" />
              <form className="flex flex-col gap-6 text-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="NAMA" placeholder="John Doe" />
                  <Field label="EMAIL" placeholder="john@example.com" type="email" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] text-steel block mb-2">PESAN</label>
                  <textarea rows={5} className="w-full bg-transparent border border-steel focus:border-acid outline-none p-3 text-bone resize-none transition-colors" placeholder="Tulis pesan kamu..." />
                </div>
                <button type="button" className="bg-acid text-void py-4 tracking-[0.3em] hover:bg-bone transition-colors text-xs">[ KIRIM PESAN ]</button>
              </form>
            </motion.div>
          </section>

          <footer className="px-6 md:px-10 py-16 border-t border-steel/30 text-center">
            <AnimatedText text="H2C" as="p" className="editorial-text text-7xl md:text-9xl text-bone" />
            <p className="text-[10px] tracking-[0.5em] text-steel mt-4">HOMPIMPAH HARDCORE // EST. 2019</p>
            <div className="flex justify-center gap-8 mt-8 text-steel">
              <a href="#" className="hover:text-acid transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-acid transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="hover:text-acid transition-colors"><Music className="w-5 h-5" /></a>
              <a href="#" className="hover:text-acid transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-[10px] text-steel/50 mt-10">Copyright 2024 H2C. ALL RIGHTS RESERVED.</p>
          </footer>

          <div className="fixed bottom-0 inset-x-0 z-50 border-t-2 border-acid bg-void-deep/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
              <button onClick={togglePlay} className="w-12 h-12 grid place-items-center bg-acid text-void hover:bg-bone transition-colors shrink-0" aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div className="flex-1 min-w-0 flex items-center gap-4">
                <div className="hidden md:flex flex-col min-w-0 w-40">
                  <span className="text-[9px] tracking-[0.3em] text-acid">NOW PLAYING</span>
                  <span className="editorial-text text-lg text-bone truncate leading-none">MANIFESTO - 01</span>
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
                <span className="text-xs text-bone">{Math.floor(progress)}%</span>
              </div>
            </div>
            <div className="h-[2px] bg-steel/30">
              <div className="h-full bg-acid transition-all duration-300" style={{ width: progress + "%" }} />
            </div>
          </div>
        </motion.main>
      )}
    </div>
  );
}

function SectionHeader({ index, title }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between border-b border-steel/30 pb-6">
      <div>
        <span className="text-[10px] tracking-[0.5em] text-acid">{index} //</span>
        <AnimatedText text={title} as="h2" className="editorial-text text-5xl md:text-7xl text-bone mt-3 leading-none" delay={0.2} />
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  if (status === "SOLD OUT") return <span className="text-warm animate-pulse">&#9679; SOLD OUT</span>;
  if (status === "SELLING FAST") return <span className="text-acid animate-pulse">&#9679; SELLING FAST</span>;
  return <span className="text-steel">&#9679; TICKETS AVAILABLE</span>;
}

function Field({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] text-steel block mb-2">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full bg-transparent border-b border-steel focus:border-acid outline-none p-2 text-bone transition-colors" />
    </div>
  );
}


