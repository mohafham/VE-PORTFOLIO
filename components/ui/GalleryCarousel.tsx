'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';

/* ── Thumbnail SVGs ──────────────────────────────────── */

const KillCamThumb = () => (
  <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="80" height="110" rx="12" fill="#030b1a" />
    {/* Grid scanlines */}
    {[0,1,2,3,4,5,6].map(i => (
      <line key={i} x1="0" y1={i * 16} x2="80" y2={i * 16} stroke="#3b82f6" strokeWidth="0.3" strokeOpacity="0.15" />
    ))}
    {[0,1,2,3,4].map(i => (
      <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="110" stroke="#3b82f6" strokeWidth="0.3" strokeOpacity="0.15" />
    ))}
    {/* Scope rings */}
    <circle cx="40" cy="55" r="28" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 3" />
    <circle cx="40" cy="55" r="18" stroke="#3b82f6" strokeWidth="1.2" strokeOpacity="0.6" />
    <circle cx="40" cy="55" r="8" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.9" />
    <circle cx="40" cy="55" r="2.5" fill="#3b82f6" />
    {/* Crosshair lines */}
    <line x1="40" y1="27" x2="40" y2="37" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="73" x2="40" y2="83" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="55" x2="22" y2="55" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="58" y1="55" x2="68" y2="55" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
    {/* Corner brackets */}
    <path d="M6 20 L6 6 L20 6" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M74 20 L74 6 L60 6" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M6 90 L6 104 L20 104" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M74 90 L74 104 L60 104" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.7" />
    {/* Glow */}
    <circle cx="40" cy="55" r="10" fill="#3b82f6" fillOpacity="0.08" />
  </svg>
);

const SyncEditThumb = () => (
  <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="80" height="110" rx="12" fill="#050a1c" />
    {/* Beat bars */}
    {[
      { x: 8, h: 28 }, { x: 16, h: 45 }, { x: 24, h: 60 }, { x: 32, h: 80 }, { x: 40, h: 90 },
      { x: 48, h: 72 }, { x: 56, h: 50 }, { x: 64, h: 32 }, { x: 72, h: 18 },
    ].map((bar, i) => (
      <rect key={i} x={bar.x - 3} y={55 - bar.h / 2} width="6" height={bar.h} rx="3"
        fill="#3b82f6" fillOpacity={0.3 + (i === 4 ? 0.6 : i / 20)} />
    ))}
    {/* Lightning bolt */}
    <path d="M44 12 L34 36 L42 36 L36 58 L54 30 L44 30 Z" fill="#fbbf24" fillOpacity="0.9" stroke="#fbbf24" strokeWidth="0.5" />
    {/* Timeline bar */}
    <rect x="6" y="78" width="68" height="5" rx="2.5" fill="#1e293b" />
    <rect x="6" y="78" width="42" height="5" rx="2.5" fill="#3b82f6" fillOpacity="0.8" />
    <circle cx="48" cy="80.5" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
    {/* Bottom decorative line */}
    <line x1="6" y1="95" x2="50" y2="95" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
    <line x1="54" y1="95" x2="74" y2="95" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3 3" />
  </svg>
);

const DirectorsCutThumb = () => (
  <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="80" height="110" rx="12" fill="#0a041a" />
    {/* Film strip top */}
    <rect x="6" y="6" width="68" height="16" rx="3" fill="#1a0d3c" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.5" />
    {[0,1,2,3,4].map(i => (
      <rect key={i} x={10 + i * 13} y="9" width="9" height="10" rx="2" fill="#0a041a" stroke="#a855f7" strokeWidth="0.5" strokeOpacity="0.7" />
    ))}
    {/* Aperture / lens */}
    <circle cx="40" cy="62" r="26" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.25" />
    <circle cx="40" cy="62" r="20" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5" />
    {/* Aperture blades */}
    {[0,60,120,180,240,300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x2 = 40 + Math.cos(rad) * 18;
      const y2 = 62 + Math.sin(rad) * 18;
      return <line key={i} x1="40" y1="62" x2={x2} y2={y2} stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />;
    })}
    <circle cx="40" cy="62" r="8" fill="#1a0d3c" stroke="#a855f7" strokeWidth="2" />
    <circle cx="40" cy="62" r="3.5" fill="#a855f7" fillOpacity="0.9" />
    {/* Film strip bottom */}
    <rect x="6" y="90" width="68" height="14" rx="3" fill="#1a0d3c" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.5" />
    {[0,1,2,3,4].map(i => (
      <rect key={i} x={10 + i * 13} y="93" width="9" height="8" rx="2" fill="#0a041a" stroke="#a855f7" strokeWidth="0.5" strokeOpacity="0.7" />
    ))}
  </svg>
);

const ColorGradeThumb = () => (
  <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="80" height="110" rx="12" fill="#080312" />
    {/* Color wheel */}
    {[
      { start: 0, end: 60, color: '#ef4444' }, { start: 60, end: 120, color: '#f97316' },
      { start: 120, end: 180, color: '#eab308' }, { start: 180, end: 240, color: '#22c55e' },
      { start: 240, end: 300, color: '#3b82f6' }, { start: 300, end: 360, color: '#a855f7' },
    ].map((seg, i) => {
      const startRad = (seg.start * Math.PI) / 180;
      const endRad = (seg.end * Math.PI) / 180;
      const r = 22;
      const x1 = 40 + Math.cos(startRad) * r;
      const y1 = 45 + Math.sin(startRad) * r;
      const x2 = 40 + Math.cos(endRad) * r;
      const y2 = 45 + Math.sin(endRad) * r;
      return (
        <path key={i}
          d={`M 40 45 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
          fill={seg.color} fillOpacity="0.55" />
      );
    })}
    <circle cx="40" cy="45" r="10" fill="#080312" />
    <circle cx="40" cy="45" r="5" fill="#a855f7" fillOpacity="0.7" />
    {/* Color bars below */}
    {[
      { color: '#ef4444', w: 35 }, { color: '#22c55e', w: 50 },
      { color: '#3b82f6', w: 42 }, { color: '#a855f7', w: 28 },
    ].map((bar, i) => (
      <g key={i}>
        <rect x="6" y={78 + i * 8} width="68" height="5" rx="2.5" fill="#1e0a3c" />
        <rect x="6" y={78 + i * 8} width={bar.w} height="5" rx="2.5" fill={bar.color} fillOpacity="0.7" />
      </g>
    ))}
  </svg>
);

const ViralHookThumb = () => (
  <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="80" height="110" rx="12" fill="#020f07" />
    {/* Phone outline */}
    <rect x="24" y="8" width="32" height="58" rx="7" fill="#071a0f" stroke="#22c55e" strokeWidth="1.2" />
    <rect x="31" y="6" width="18" height="4" rx="2" fill="#071a0f" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.6" />
    {/* Screen content */}
    <rect x="27" y="14" width="26" height="46" rx="4" fill="#040e08" />
    {/* Play circle */}
    <circle cx="40" cy="37" r="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.2" />
    <polygon points="37,32 37,42 48,37" fill="#22c55e" fillOpacity="0.9" />
    {/* Trending arrows */}
    <path d="M10 85 L22 72 L32 78 L48 62 L58 68 L70 52" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" fill="none" />
    {/* Dots on trend line */}
    {[[22,72],[32,78],[48,62],[58,68]].map(([x,y], i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill="#22c55e" fillOpacity="0.9" />
    ))}
    <path d="M62 48 L70 52 L66 44" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const LoopReelThumb = () => (
  <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="80" height="110" rx="12" fill="#021008" />
    {/* Orbital rings */}
    <ellipse cx="40" cy="50" rx="30" ry="12" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />
    <ellipse cx="40" cy="50" rx="12" ry="30" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />
    <circle cx="40" cy="50" r="28" stroke="#22c55e" strokeWidth="0.7" strokeOpacity="0.2" strokeDasharray="5 4" />
    {/* Center play */}
    <circle cx="40" cy="50" r="16" fill="#0a1e10" stroke="#22c55e" strokeWidth="1.5" />
    <polygon points="36,44 36,56 50,50" fill="#22c55e" fillOpacity="0.9" />
    {/* Orbiting dots */}
    <circle cx="70" cy="50" r="4" fill="#22c55e" fillOpacity="0.8" />
    <circle cx="40" cy="22" r="3" fill="#22c55e" fillOpacity="0.5" />
    <circle cx="10" cy="50" r="3" fill="#22c55e" fillOpacity="0.4" />
    {/* Loop arrows at orbit ends */}
    <path d="M68 44 Q72 50 68 56" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Bottom stats */}
    <rect x="8" y="88" width="64" height="4" rx="2" fill="#0a1e10" />
    <rect x="8" y="88" width="54" height="4" rx="2" fill="#22c55e" fillOpacity="0.7" />
    <text x="8" y="103" fontSize="7" fill="#22c55e" fillOpacity="0.6" fontFamily="monospace">2.4M VIEWS</text>
    <text x="46" y="103" fontSize="7" fill="#22c55e" fillOpacity="0.4" fontFamily="monospace">98% RET</text>
  </svg>
);

/* ── Gallery Data ─────────────────────────────────────── */

const GALLERY_ITEMS = [
  { id: 1, label: 'Kill Cam',      category: 'Gaming',     Thumb: KillCamThumb,     accent: '#3b82f6', url: 'https://youtu.be/40NdgCfwS4c' },
  { id: 2, label: 'Sync Edit',     category: 'Gaming',     Thumb: SyncEditThumb,    accent: '#3b82f6', url: 'https://youtu.be/pbBeZpyD2ds' },
  { id: 3, label: "Director's Cut",category: 'Films',      Thumb: DirectorsCutThumb,accent: '#a855f7', url: 'https://youtu.be/PjAPixgfJcU' },
  { id: 4, label: 'Color Grade',   category: 'Films',      Thumb: ColorGradeThumb,  accent: '#a855f7', url: 'https://youtu.be/WwOPXkTmRjk' },
  { id: 5, label: 'Viral Hook',    category: 'Short Form', Thumb: ViralHookThumb,   accent: '#22c55e', url: 'https://youtu.be/mDIgktGDkEU' },
  { id: 6, label: 'Loop Reel',     category: 'Short Form', Thumb: LoopReelThumb,    accent: '#22c55e', url: 'https://youtu.be/IswD1FleZKE' },
];

const CARD_W   = 82;   // px  – each thumbnail card width
const CARD_GAP = 10;   // px  – gap between cards
const STEP     = CARD_W + CARD_GAP;

interface GalleryCarouselProps {
  /** accent colour to tint the drag-bar & active dot */
  accent?: string;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ accent = '#3b82f6' }) => {
  const trackRef       = useRef<HTMLDivElement>(null);
  const containerRef   = useRef<HTMLDivElement>(null);
  const isDragging     = useRef(false);
  const startX         = useRef(0);
  const currentOffset  = useRef(0);
  const velocity       = useRef(0);
  const lastMouseX     = useRef(0);
  const rafRef         = useRef<number>(0);
  const dragDistance   = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Clamp helper ── */
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const getMaxOffset = useCallback(() => {
    if (!containerRef.current) return 0;
    const totalW = GALLERY_ITEMS.length * STEP - CARD_GAP;
    return -(totalW - containerRef.current.clientWidth);
  }, []);

  const applyOffset = useCallback((offset: number, snap = false) => {
    if (!trackRef.current) return;
    const maxOffset = getMaxOffset();
    const clamped = clamp(offset, Math.min(maxOffset, 0), 0);
    currentOffset.current = clamped;
    trackRef.current.style.transition = snap ? 'transform 0.35s cubic-bezier(0.25,1,0.5,1)' : 'none';
    trackRef.current.style.transform = `translateX(${clamped}px)`;
    // compute which card is most centered
    if (containerRef.current) {
      const center = -clamped + containerRef.current.clientWidth / 2;
      const closest = Math.round((center - CARD_W / 2) / STEP);
      setActiveIdx(clamp(closest, 0, GALLERY_ITEMS.length - 1));
    }
  }, [getMaxOffset]);

  /* ── Mouse handlers ── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current     = e.clientX - currentOffset.current;
    lastMouseX.current = e.clientX;
    velocity.current   = 0;
    dragDistance.current = 0;
    cancelAnimationFrame(rafRef.current);
    if (trackRef.current) trackRef.current.style.transition = 'none';
    e.preventDefault();
  }, []);

  const onGlobalMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    dragDistance.current += Math.abs(e.clientX - lastMouseX.current);
    velocity.current = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;
    applyOffset(e.clientX - startX.current);
  }, [applyOffset]);

  const onGlobalMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    /* Momentum deceleration */
    const momentum = () => {
      velocity.current *= 0.9;
      if (Math.abs(velocity.current) < 0.5) {
        /* Snap to nearest card */
        const snapped = Math.round(-currentOffset.current / STEP) * STEP;
        applyOffset(-snapped, true);
        return;
      }
      applyOffset(currentOffset.current + velocity.current);
      rafRef.current = requestAnimationFrame(momentum);
    };
    rafRef.current = requestAnimationFrame(momentum);
  }, [applyOffset]);

  /* ── Touch handlers ── */
  const touchStartX = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX - currentOffset.current;
    velocity.current = 0;
    dragDistance.current = 0;
    cancelAnimationFrame(rafRef.current);
    if (trackRef.current) trackRef.current.style.transition = 'none';
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    dragDistance.current += Math.abs(e.touches[0].clientX - (touchStartX.current + currentOffset.current));
    velocity.current = e.touches[0].clientX - (touchStartX.current + currentOffset.current);
    applyOffset(e.touches[0].clientX - touchStartX.current);
  }, [applyOffset]);

  const onTouchEnd = useCallback(() => {
    const momentum = () => {
      velocity.current *= 0.9;
      if (Math.abs(velocity.current) < 0.5) {
        const snapped = Math.round(-currentOffset.current / STEP) * STEP;
        applyOffset(-snapped, true);
        return;
      }
      applyOffset(currentOffset.current + velocity.current);
      rafRef.current = requestAnimationFrame(momentum);
    };
    rafRef.current = requestAnimationFrame(momentum);
  }, [applyOffset]);

  /* ── Global attach ── */
  useEffect(() => {
    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup',   onGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup',   onGlobalMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onGlobalMouseMove, onGlobalMouseUp]);

  return (
    <div className="flex flex-col h-full gap-2 select-none">
      {/* ── Drag hint label ── */}
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: accent, opacity: 0.7 }}>
          Gallery
        </span>
        <span className="text-[9px] text-slate-500 flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5H8M2 5L4 3M2 5L4 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          drag
        </span>
      </div>

      {/* ── Track container ── */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing rounded-xl"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-4 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(5,9,15,0.7), transparent)' }} />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-4 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(5,9,15,0.7), transparent)' }} />

        {/* ── Scrollable track ── */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ gap: `${CARD_GAP}px`, willChange: 'transform' }}
        >
          {GALLERY_ITEMS.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={item.id}
                className="flex-shrink-0 flex flex-col gap-1.5"
                style={{ width: `${CARD_W}px` }}
              >
                {/* Thumbnail */}
                <div
                  className="flex-1 rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    outline: isActive ? `1.5px solid ${item.accent}` : '1.5px solid transparent',
                    boxShadow: isActive ? `0 0 14px ${item.accent}40` : 'none',
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? 'scale(1)' : 'scale(0.96)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (dragDistance.current < 6) {
                      window.open(item.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <item.Thumb />
                </div>
                {/* Label */}
                <div className="text-center">
                  <span
                    className="text-[9px] font-semibold tracking-wide leading-none"
                    style={{ color: isActive ? item.accent : '#64748b' }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex items-center justify-center gap-1.5">
        {GALLERY_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => applyOffset(-(idx * STEP), true)}
            className="rounded-full transition-all duration-300"
            style={{
              width:  activeIdx === idx ? '14px' : '5px',
              height: '5px',
              background: activeIdx === idx ? accent : '#334155',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
