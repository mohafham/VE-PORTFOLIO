'use client';

import React, { useState, useEffect } from 'react';
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';
import GalleryCarousel from './ui/GalleryCarousel';
import OrbitalGallery from './ui/OrbitalGallery';

/* ── Card data ─────────────────────────────────────────── */

const _KEEP_GamingGraphic = () => (
  <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-44 h-48">
    <ellipse cx="90" cy="130" rx="70" ry="55" fill="#3b82f6" fillOpacity="0.07" />
    {[0,1,2,3,4].map(row =>
      [0,1,2,3,4].map(col => {
        const active = (row + col) % 3 === 0;
        return (
          <rect
            key={`${row}-${col}`}
            x={20 + col * 14} y={10 + row * 14}
            width="10" height="10" rx="2"
            fill={active ? '#3b82f6' : '#1e293b'}
            fillOpacity={active ? 0.5 : 0.3}
          />
        );
      })
    )}
    <path
      d="M30 120 C30 105 42 95 58 95 L122 95 C138 95 150 105 150 120 L150 145 C150 162 138 172 122 172 L100 172 L90 160 L80 172 L58 172 C42 172 30 162 30 145 Z"
      fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5"
    />
    <circle cx="60" cy="145" r="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
    <circle cx="60" cy="145" r="5" fill="#3b82f6" fillOpacity="0.8" />
    <circle cx="105" cy="145" r="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
    <circle cx="105" cy="145" r="5" fill="#3b82f6" fillOpacity="0.8" />
    <rect x="48" y="118" width="8" height="20" rx="2" fill="#3b82f6" fillOpacity="0.7" />
    <rect x="38" y="128" width="28" height="8" rx="2" fill="#3b82f6" fillOpacity="0.7" />
    <circle cx="128" cy="115" r="5" fill="#ef4444" fillOpacity="0.9" />
    <circle cx="120" cy="125" r="5" fill="#3b82f6" fillOpacity="0.9" />
    <circle cx="136" cy="125" r="5" fill="#22c55e" fillOpacity="0.9" />
    <circle cx="128" cy="135" r="5" fill="#fbbf24" fillOpacity="0.9" />
    <path d="M88 50 L78 72 L88 72 L82 92 L100 65 L89 65 Z" fill="#fbbf24" fillOpacity="0.9" stroke="#fbbf24" strokeWidth="0.5" />
    <line x1="15" y1="108" x2="28" y2="108" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
    <line x1="10" y1="116" x2="27" y2="116" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
    <line x1="155" y1="108" x2="168" y2="108" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
    <line x1="156" y1="116" x2="173" y2="116" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
    <ellipse cx="90" cy="175" rx="52" ry="4" fill="#3b82f6" fillOpacity="0.25" />
  </svg>
);

const _UNUSED_FilmsGraphic = () => (
  <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-44 h-48">
    <circle cx="90" cy="105" r="62" fill="#a855f7" fillOpacity="0.06" />
    <circle cx="90" cy="105" r="52" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" />
    <circle cx="90" cy="105" r="38" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="90" cy="105" r="22" fill="#1a0d3c" stroke="#a855f7" strokeWidth="2" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <line key={angle}
          x1={90 + Math.cos(rad) * 24} y1={105 + Math.sin(rad) * 24}
          x2={90 + Math.cos(rad) * 50} y2={105 + Math.sin(rad) * 50}
          stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5" />
      );
    })}
    <polygon points="84,96 84,114 103,105" fill="#a855f7" fillOpacity="0.9" />
    <rect x="25" y="22" width="130" height="35" rx="5" fill="#0f172a" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5" />
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={30 + i * 21} y="27" width="14" height="10" rx="2" fill="#1e1340" stroke="#a855f7" strokeWidth="0.7" strokeOpacity="0.7" />
    ))}
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={32 + i * 21} y="37" width="10" height="5" rx="1" fill="#a855f7" fillOpacity="0.3" />
    ))}
    <rect x="25" y="163" width="130" height="22" rx="5" fill="#0f172a" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5" />
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={30 + i * 21} y="168" width="14" height="10" rx="2" fill="#1e1340" stroke="#a855f7" strokeWidth="0.7" strokeOpacity="0.7" />
    ))}
    <ellipse cx="90" cy="105" rx="68" ry="68" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.3" />
    <ellipse cx="90" cy="190" rx="52" ry="4" fill="#a855f7" fillOpacity="0.25" />
  </svg>
);

const _UNUSED_ShortFormGraphic = () => (
  <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-44 h-48">
    <ellipse cx="90" cy="110" rx="55" ry="70" fill="#22c55e" fillOpacity="0.06" />
    <rect x="52" y="18" width="76" height="152" rx="14" fill="#0a1e14" stroke="#22c55e" strokeWidth="1.5" />
    <rect x="58" y="26" width="64" height="136" rx="8" fill="#0d2a1c" />
    <rect x="78" y="22" width="24" height="5" rx="2.5" fill="#0a1e14" />
    <rect x="62" y="30" width="56" height="100" rx="4" fill="#071a0f" />
    {[0,1,2,3].map(i => (
      <rect key={i} x="62" y={40 + i * 22} width="56" height="1" fill="#22c55e" fillOpacity="0.1" />
    ))}
    <circle cx="90" cy="80" r="18" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
    <polygon points="85,72 85,88 102,80" fill="#22c55e" fillOpacity="0.9" />
    <rect x="62" y="133" width="56" height="3" rx="1.5" fill="#1e293b" />
    <rect x="62" y="133" width="32" height="3" rx="1.5" fill="#22c55e" fillOpacity="0.8" />
    <circle cx="72" cy="143" r="5" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1" />
    <text x="69.5" y="146.5" fontSize="7" fill="#22c55e" fillOpacity="0.9">♥</text>
    <circle cx="90" cy="143" r="5" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1" />
    <text x="87.5" y="146.5" fontSize="7" fill="#22c55e" fillOpacity="0.9">✦</text>
    <circle cx="108" cy="143" r="5" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1" />
    <text x="105.5" y="147" fontSize="7" fill="#22c55e" fillOpacity="0.9">↑</text>
    <circle cx="148" cy="65" r="12" fill="#0a1e14" stroke="#22c55e" strokeWidth="1" />
    <text x="142" y="70" fontSize="10" fill="#22c55e" fillOpacity="0.9">♥</text>
    <circle cx="145" cy="95" r="10" fill="#0a1e14" stroke="#22c55e" strokeWidth="1" />
    <text x="140" y="100" fontSize="9" fill="#22c55e" fillOpacity="0.9">↑</text>
    <circle cx="32" cy="75" r="10" fill="#0a1e14" stroke="#22c55e" strokeWidth="1" />
    <text x="27.5" y="80" fontSize="10" fill="#22c55e" fillOpacity="0.9">✦</text>
    <path d="M90 160 L84 168 M90 160 L96 168" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="90" y1="160" x2="90" y2="172" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <ellipse cx="90" cy="185" rx="50" ry="4" fill="#22c55e" fillOpacity="0.25" />
  </svg>
);

/* ── Card data ──────────────────────────────────────────  */

const cards = [
  {
    tag: 'Hype & Precision',
    title: 'GAMING EDITS',
    description:
      "High-energy cuts, motion blur, sync edits and jaw-dropping visual effects that transform raw gameplay footage into cinematic content people can't stop watching.",
    accent: '#3b82f6',
    cardBg: 'from-[#060e1e] to-[#0a1628]',
    borderColor: 'border-blue-500/20',
    topLine: 'from-transparent via-blue-500/60 to-transparent',
  },
  {
    tag: 'Cinematic Quality',
    title: 'LONG-FORM FILMS',
    description:
      'Masterful cinematic storytelling — color grading, seamless pacing and narrative structure that holds attention from the first frame to the last credit.',
    accent: '#a855f7',
    cardBg: 'from-[#0d0618] to-[#140826]',
    borderColor: 'border-purple-500/20',
    topLine: 'from-transparent via-purple-500/60 to-transparent',
  },
  {
    tag: 'Engineered for Virality',
    title: 'SHORT FORM CONTENT',
    description:
      'Scroll-stopping reels, shorts and TikToks engineered for maximum retention and virality — hooks in the first second, optimized for every algorithm.',
    accent: '#22c55e',
    cardBg: 'from-[#040f0a] to-[#071710]',
    borderColor: 'border-green-500/20',
    topLine: 'from-transparent via-green-500/60 to-transparent',
  },
];

/* ── MasterySection ───────────────────────────────────── */

export default function MasterySection() {
  const [itemDistance, setItemDistance] = useState(800);

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 768;
      setItemDistance(isMobile ? window.innerHeight * 0.55 : window.innerHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section id="services" className="relative h-screen flex flex-col overflow-hidden bg-[#05090f]">

      {/* Animated grid background */}
      <div className="absolute inset-0 mastery-grid-bg pointer-events-none" />

      {/* Neon ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-[40px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-600/5 blur-[40px] sm:blur-[100px] pointer-events-none" />

      {/* Scan-line overlay */}
      <div className="absolute inset-0 mastery-scanlines pointer-events-none opacity-[0.025]" />

      {/* ── Section header ── */}
      <div className="relative z-10 pt-6 sm:pt-10 pb-2 pl-4 sm:pl-10 pr-4 sm:pr-6 lg:pl-40 lg:pr-20 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-6 h-px bg-blue-500" />
          <span className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase">
            What I Do
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          <span className="text-white">Areas of </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
            Mastery
          </span>
        </h2>
      </div>

      {/* ── Main area: ScrollStack + Orbital right panel ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

      {/* ── ScrollStack ── */}
      <ScrollStack
        className="flex-1 min-h-0"
        itemDistance={itemDistance}
        itemStackDistance={52}
        stackPosition="18%"
        baseScale={0.88}
        itemScale={0.04}
        blurAmount={1.5}
      >
        {cards.map((card) => (
          <ScrollStackItem
            key={card.title}
            itemClassName={`bg-gradient-to-br ${card.cardBg} ${card.borderColor} border overflow-hidden`}
          >
            {/* Neon top edge line */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.topLine}`} />

            {/* Corner bracket accents */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 rounded-tl-sm opacity-40"
              style={{ borderColor: card.accent }} />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 rounded-tr-sm opacity-40"
              style={{ borderColor: card.accent }} />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 rounded-bl-sm opacity-40"
              style={{ borderColor: card.accent }} />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 rounded-br-sm opacity-40"
              style={{ borderColor: card.accent }} />

            {/* Content row */}
            <div className="flex h-full items-center gap-6">

              {/* Left: text */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <span
                  className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase mb-4 px-3 py-1.5 rounded-full w-fit"
                  style={{
                    color: card.accent,
                    background: `${card.accent}12`,
                    border: `1px solid ${card.accent}35`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: card.accent }} />
                  {card.tag}
                </span>

                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4 leading-none"
                  style={{ color: '#fff', textShadow: `0 0 40px ${card.accent}40` }}
                >
                  {card.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{card.description}</p>

                <div
                  className="mt-5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                  style={{ color: card.accent }}
                >
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Right: draggable gallery carousel */}
              <div className="flex-shrink-0 h-full w-44 sm:w-60 hidden sm:block">
                <GalleryCarousel accent={card.accent} />
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      {/* ── Right: Orbital satellite gallery ── */}
      <div className="hidden lg:flex flex-col flex-shrink-0 w-[400px] items-center justify-center relative" style={{ transform: 'translate(-140px, -110px)' }}>
        {/* Subtle ambient glow behind the orbit */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(148,163,184,0.04) 0%, transparent 70%)',
          }}
        />
        <OrbitalGallery />

        {/* ── Label below orbit ── */}
        <div className="relative flex flex-col items-center gap-2 mt-8 pointer-events-none select-none">
          {/* Decorative side lines */}
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-slate-500/60" />
            <span
              className="text-[10px] font-bold tracking-[0.35em] uppercase"
              style={{ color: 'rgba(148,163,184,0.45)', letterSpacing: '0.35em' }}
            >
              Portfolio
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-slate-500/60" />
          </div>

          <h3
            className="text-[22px] font-black tracking-[0.12em] uppercase leading-none text-center"
            style={{
              background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 18px rgba(148,163,184,0.2))',
            }}
          >
            High&#8209;Impact Edits
          </h3>

          {/* Bottom accent bar */}
          <div className="flex items-center gap-1.5">
            <div className="h-[1.5px] w-6 rounded-full bg-gradient-to-r from-transparent via-slate-400/50 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-slate-500/60" />
            <div className="h-[1.5px] w-6 rounded-full bg-gradient-to-r from-transparent via-slate-400/50 to-transparent" />
          </div>
        </div>
      </div>

      </div>{/* end flex row */}
    </section>
  );
}
