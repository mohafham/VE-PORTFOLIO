'use client';

import { useState, useRef, useCallback } from 'react';
import { Film, Box, Layers, Music, Scissors, Terminal, Rocket, Eye, Clock, Globe, Video, ChevronLeft, ChevronRight, X } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';

const analyticsImages = [
  { src: '/analytics1.png', alt: 'Analytics Screenshot 1' },
  { src: '/analytics2.png', alt: 'Analytics Screenshot 2' },
  { src: '/analytics3.png', alt: 'Analytics Screenshot 3' },
];

const toolsData = [
  {
    id: 1,
    title: 'Adobe Premiere Pro',
    date: 'Primary DAW',
    content: 'Industry-standard NLE used for all long-form edits, cinematic cuts, multi-cam workflows and colour grading via Lumetri.',
    category: 'Video Editing',
    icon: Film,
    relatedIds: [2, 3],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 2,
    title: 'Blender',
    date: '3D & Motion',
    content: 'Used for 3D motion graphics, logo animations, particle FX and cinematic title sequences embedded in video projects.',
    category: '3D & VFX',
    icon: Box,
    relatedIds: [1, 3],
    status: 'completed' as const,
    energy: 78,
  },
  {
    id: 3,
    title: 'Adobe Photoshop',
    date: 'Graphics',
    content: 'Thumbnail design, key-art creation, compositing and texture work that powers the visual identity of every project.',
    category: 'Design',
    icon: Layers,
    relatedIds: [1, 2, 4],
    status: 'completed' as const,
    energy: 88,
  },
  {
    id: 4,
    title: 'FL Studio',
    date: 'Audio',
    content: 'Custom sound design, beat production and audio mixing that complement the visual energy of gaming edits and films.',
    category: 'Audio Production',
    icon: Music,
    relatedIds: [3, 5],
    status: 'in-progress' as const,
    energy: 62,
  },
  {
    id: 5,
    title: 'CapCut',
    date: 'Short-Form',
    content: 'Rapid turnaround for scroll-stopping Reels, Shorts and TikToks optimised for algorithmic retention and engagement.',
    category: 'Short-Form',
    icon: Scissors,
    relatedIds: [4],
    status: 'completed' as const,
    energy: 82,
  },
];

const metrics = [
  { icon: Video,   label: 'Videos Edited',  value: '120+' },
  { icon: Eye,     label: 'Total Views',     value: '21M+' },
  { icon: Clock,   label: 'Exp. Ledger',     value: '3+ YRS' },
  { icon: Globe,   label: 'Global Reach',    value: 'INTL COLLAB' },
  { icon: Rocket,  label: 'Peak Reach',      value: '150K+' },
];

export default function ToolsSection() {
  const [hovered, setHovered] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setHovered(false), 200);
  }, []);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIdx(i => (i - 1 + analyticsImages.length) % analyticsImages.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIdx(i => (i + 1) % analyticsImages.length);
  };
  return (
    <div id="insights" className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060b12]" />
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Top / bottom separators */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-[40px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute -right-32 top-1/3 w-[420px] h-[420px] rounded-full bg-[#2E86C1]/[0.06] blur-[40px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[300px] rounded-full bg-purple-900/[0.05] blur-[40px] sm:blur-[100px] pointer-events-none" />

      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-20 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT — Decoding Creation panel ── */}
          <div className="flex flex-col items-center lg:items-start">

            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={12} className="text-[#2E86C1]" />
              <span className="text-[#2E86C1] tracking-[0.4em] text-[10px] font-bold uppercase font-mono-code">
                Kernel.Deep_Dive // Process_Active
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-wide text-white text-center lg:text-left leading-tight">
              DECODING<br />
              <span style={{ color: '#2E86C1' }}>CREATION</span>
            </h2>

            {/* Description */}
            <div className="max-w-md mb-8">
              <p className="text-base text-blue-100/60 leading-relaxed font-display tracking-tight text-center lg:text-left">
                Architecting visual narratives through{' '}
                <span style={{ color: '#2E86C1' }}>algorithmic precision</span> and deep-tier
                hardware acceleration. Integrating specialized neural engines and multi-threaded
                rendering pipelines to synthesize complex 8K data arrays into seamless cinematic
                reality. Efficiency is the core of every frame.
              </p>
            </div>

            {/* Metrics stack */}
            <div className="flex flex-col gap-1 w-full max-w-sm mx-auto lg:mx-0">
              {metrics.map(({ icon: Icon, label, value }) => (
                <div key={label} className="tab-item px-4 py-3 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <Icon size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: '#2E86C1' }} />
                    <span className="text-[11px] uppercase tracking-[0.2em] text-blue-200/60 font-semibold font-display">
                      {label}
                    </span>
                  </div>
                  <span className="font-mono-code text-lg font-bold" style={{ color: '#2E86C1' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8 justify-center lg:justify-start">

              {/* VIEW ANALYTICS button with hover carousel */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="px-6 py-2 border text-[11px] uppercase tracking-[0.3em] font-orbitron transition-all duration-300"
                  style={{
                    borderColor: hovered ? '#2E86C1' : 'rgba(46,134,193,0.4)',
                    background: hovered ? '#2E86C1' : 'rgba(46,134,193,0.05)',
                    color: hovered ? '#02060f' : '#2E86C1',
                  }}
                >
                  View Analytics
                </button>

                {/* Hover carousel popup */}
                {hovered && (
                  <div
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 w-72 rounded-xl overflow-hidden shadow-2xl border border-[#2E86C1]/30"
                    style={{ background: '#060b12' }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Image */}
                    <div
                      className="relative w-full h-44 cursor-pointer overflow-hidden group"
                      onClick={() => setLightbox(carouselIdx)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={analyticsImages[carouselIdx].src}
                        alt={analyticsImages[carouselIdx].alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      {/* Click hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-mono-code uppercase tracking-widest bg-black/50 px-3 py-1 rounded">
                          Click to expand
                        </span>
                      </div>
                    </div>

                    {/* Carousel controls */}
                    <div className="flex items-center justify-between px-3 py-2">
                      <button
                        onClick={prev}
                        className="p-1 rounded text-[#2E86C1] hover:bg-[#2E86C1]/20 transition-colors"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {/* Dots */}
                      <div className="flex gap-1.5">
                        {analyticsImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCarouselIdx(i); }}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                            style={{
                              background: i === carouselIdx ? '#2E86C1' : 'rgba(46,134,193,0.3)',
                              boxShadow: i === carouselIdx ? '0 0 6px #2E86C1' : 'none',
                            }}
                          />
                        ))}
                      </div>

                      <button
                        onClick={next}
                        className="p-1 rounded text-[#2E86C1] hover:bg-[#2E86C1]/20 transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#2E86C1', boxShadow: '0 0 8px #2E86C1' }}
                  />
                  <span className="text-[9px] font-mono-code uppercase tracking-widest text-blue-300/50">
                    System: Optimized
                  </span>
                </div>
                <div
                  className="w-32 h-px"
                  style={{ background: 'linear-gradient(to right, rgba(46,134,193,0.4), transparent)' }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT — Radial Timeline ── */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 mb-4">
              {/* Top accent */}
              <div className="flex items-center gap-1.5">
                <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#2E86C1]/60" />
                <div className="w-1 h-1 rounded-full bg-[#2E86C1]/60" />
                <div className="h-px w-6 bg-gradient-to-l from-transparent to-[#2E86C1]/60" />
              </div>
              <h3
                className="text-[22px] font-black tracking-[0.12em] uppercase leading-none text-center"
                style={{
                  background: 'linear-gradient(135deg, #93c5fd 0%, #2E86C1 50%, #93c5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 18px rgba(46,134,193,0.45))',
                }}
              >
                Editing Stack
              </h3>
              {/* Bottom accent */}
              <div className="flex items-center gap-1.5">
                <div className="h-[1.5px] w-6 rounded-full bg-gradient-to-r from-transparent via-[#2E86C1]/50 to-transparent" />
                <div className="w-1 h-1 rounded-full bg-[#2E86C1]/60" />
                <div className="h-[1.5px] w-6 rounded-full bg-gradient-to-r from-transparent via-[#2E86C1]/50 to-transparent" />
              </div>
            </div>
            <RadialOrbitalTimeline timelineData={toolsData} />
          </div>

        </div>
      </section>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + analyticsImages.length) % analyticsImages.length : null); }}
              className="absolute left-4 md:left-10 p-2 rounded-full bg-[#2E86C1]/20 hover:bg-[#2E86C1]/40 text-white transition-colors z-10"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <div
              className="relative max-w-5xl w-full mx-16 rounded-xl overflow-hidden shadow-2xl border border-[#2E86C1]/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={analyticsImages[lightbox].src}
                alt={analyticsImages[lightbox].alt}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % analyticsImages.length : null); }}
              className="absolute right-4 md:right-10 p-2 rounded-full bg-[#2E86C1]/20 hover:bg-[#2E86C1]/40 text-white transition-colors z-10"
            >
              <ChevronRight size={28} />
            </button>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {analyticsImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{
                    background: i === lightbox ? '#2E86C1' : 'rgba(46,134,193,0.3)',
                    boxShadow: i === lightbox ? '0 0 8px #2E86C1' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

