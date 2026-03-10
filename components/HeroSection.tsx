'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Highlighter } from '@/components/ui/highlighter';
import { X } from 'lucide-react';

const IM_PART   = "I'm ";
const NAME_PART = "RaiJin";
const FULL_TEXT = IM_PART + NAME_PART;

const greetings = [
  { text: 'Hey',        language: 'English'  },
  { text: 'こんにちは',  language: 'Japanese' },
  { text: 'Bonjour',    language: 'French'   },
  { text: 'Hola',       language: 'Spanish'  },
  { text: '안녕하세요',  language: 'Korean'   },
  { text: 'Ciao',       language: 'Italian'  },
  { text: 'Hey,',       language: 'Final'    },
];

export default function HeroSection() {
  const [charCount,  setCharCount]  = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [greetIdx,   setGreetIdx]   = useState(0);
  const [greetDone,  setGreetDone]  = useState(false);
  const [showreel,   setShowreel]   = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const imDisplayed   = FULL_TEXT.slice(0, Math.min(charCount, IM_PART.length));
  const nameDisplayed = charCount > IM_PART.length
    ? FULL_TEXT.slice(IM_PART.length, charCount)
    : '';

  // greeting cycle — 320 ms per word, starts immediately
  useEffect(() => {
    if (greetDone) return;
    const iv = setInterval(() => {
      setGreetIdx(i => {
        const next = i + 1;
        if (next >= greetings.length - 1) {
          clearInterval(iv);
          setGreetDone(true);
          return greetings.length - 1; // land on final greeting
        }
        return next;
      });
    }, 320);
    return () => clearInterval(iv);
  }, [greetDone]);

  // typewriter — 85 ms per character, starts after greeting finishes + 400 ms
  useEffect(() => {
    if (!greetDone) return;
    let interval: ReturnType<typeof setInterval>;
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setCharCount(c => {
          if (c >= FULL_TEXT.length) {
            clearInterval(interval);
            setTypingDone(true);
            return c;
          }
          return c + 1;
        });
      }, 85);
    }, 400);
    return () => { clearTimeout(startDelay); clearInterval(interval); };
  }, [greetDone]);



  return (
    <div id="portfolio" className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 flex flex-col justify-end pb-10 sm:pb-16">
        <div className="max-w-4xl space-y-6">
          <h1 className="relative leading-tight tracking-tight">

            {/* Dynamic greeting — Inter bold, cycles languages */}
            <span className="block relative text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 font-inter font-bold min-h-[1.2em]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={greetIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute inset-0 flex items-center gap-3"
                >
                  {/* bullet dot */}
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: '#ffffff' }}
                  />
                  <span className="text-white tracking-tight">
                    {greetings[greetIdx].text}
                  </span>
                </motion.span>
              </AnimatePresence>
            </span>

            {/* Typewriter line */}
            <span className="inline-flex items-baseline flex-wrap gap-3 md:gap-4">

              {/* "I'm" — Playfair Display bold */}
              {imDisplayed && (
                <span className="relative inline-block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif-modern font-bold">
                  <span className="absolute inset-0 text-primary/50 blur-xl scale-110 select-none">{imDisplayed}</span>
                  <span className="absolute inset-0 text-white/20 blur-md select-none">{imDisplayed}</span>
                  <span className="relative bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.9)]">
                    {imDisplayed}
                  </span>
                </span>
              )}

              {/* "RaiJin" — Bungee, each letter spaced out, with animated underline on complete */}
              {nameDisplayed && (
                <Highlighter action="underline" color="#2E86C1" animate={typingDone} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bungee">
                  <span className="absolute inset-0 text-primary/30 blur-xl scale-105 select-none">
                    {nameDisplayed.split('').join(' ')}
                  </span>
                  <span className="absolute inset-0 text-blue-300/20 blur-md select-none">
                    {nameDisplayed.split('').join(' ')}
                  </span>
                  <span
                    className="relative drop-shadow-[0_2px_8px_rgba(46,134,193,0.6)]"
                    style={{ color: '#2E86C1', textShadow: '0 0 28px rgba(46,134,193,0.5), 0 0 60px rgba(46,134,193,0.25)' }}
                  >
                    {nameDisplayed.split('').join(' ')}
                  </span>
                </Highlighter>
              )}


            </span>
          </h1>
          
          {/* Tagline */}
          <p className="flex flex-wrap items-center gap-y-2 font-display text-base sm:text-lg md:text-2xl font-medium tracking-wide">
            {['Gaming Edits', 'Long-Form Films', 'Short-Form Contents'].map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && (
                  <span className="mx-3 w-1 h-1 rounded-full bg-[#2E86C1]/60 inline-block self-center" />
                )}
                <span className="relative text-white/85 hover:text-white transition-colors duration-200
                  after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:h-px after:w-0 hover:after:w-full
                  after:bg-[#2E86C1] after:transition-[width] after:duration-300 after:ease-out
                  pb-0.5">
                  {item}
                </span>
              </React.Fragment>
            ))}
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
            {/* Hire Me — blue glass morphism */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pvyom96@gmail.com"
              target="_blank" rel="noopener noreferrer"
              className="flex min-w-[140px] sm:min-w-[180px] items-center justify-center rounded-full h-12 sm:h-14 px-6 sm:px-8
                bg-primary/30 backdrop-blur-xl
                border border-primary/50
                shadow-[0_8px_32px_rgba(37,123,244,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]
                text-white text-base font-bold tracking-wide
                hover:bg-primary/50 hover:border-primary/70
                hover:shadow-[0_8px_40px_rgba(37,123,244,0.55)]
                hover:scale-105
                transition-all duration-200"
            >
              Hire Me
            </a>
            {/* View Showreel — white glass morphism */}
            <button
              onClick={() => setShowreel(true)}
              className="flex min-w-[140px] sm:min-w-[180px] items-center justify-center rounded-full h-12 sm:h-14 px-6 sm:px-8
                bg-white/[0.07] backdrop-blur-xl
                border border-white/[0.18]
                shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
                text-white text-base font-bold
                hover:bg-white/[0.14] hover:border-white/[0.3]
                hover:shadow-[0_8px_36px_rgba(255,255,255,0.12)]
                hover:scale-105
                transition-all duration-200"
            >
              View Showreel
            </button>
          </div>
        </div>
      </div>

      {/* ── Showreel Modal ── */}
      <AnimatePresence>
        {showreel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => { setShowreel(false); videoRef.current?.pause(); }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl mx-4 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => { setShowreel(false); videoRef.current?.pause(); }}
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full
                  bg-black/60 backdrop-blur text-white/70 hover:text-white hover:bg-black/80
                  transition-all duration-150"
              >
                <X className="w-4 h-4" />
              </button>

              <video
                ref={videoRef}
                src="/showreel.mp4"
                controls
                autoPlay
                className="w-full h-auto block"
                style={{ maxHeight: '80vh' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
