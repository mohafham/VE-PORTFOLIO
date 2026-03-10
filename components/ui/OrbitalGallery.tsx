'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';




const ITEMS = [
  {
    id: '40NdgCfwS4c',
    label: 'Gaming Edit',
    category: 'Gaming',
    accent: '#3b82f6',
    url: 'https://youtu.be/40NdgCfwS4c',
  },
  {
    id: 'pbBeZpyD2ds',
    label: 'Sync Edit',
    category: 'Gaming',
    accent: '#3b82f6',
    url: 'https://youtu.be/pbBeZpyD2ds',
  },
  {
    id: 'PjAPixgfJcU',
    label: 'Long Film',
    category: 'Film',
    accent: '#a855f7',
    url: 'https://youtu.be/PjAPixgfJcU',
  },
  {
    id: 'WwOPXkTmRjk',
    label: 'Cinematic',
    category: 'Film',
    accent: '#a855f7',
    url: 'https://youtu.be/WwOPXkTmRjk',
  },
  {
    id: 'mDIgktGDkEU',
    label: 'Viral Hook',
    category: 'Short Form',
    accent: '#22c55e',
    url: 'https://youtu.be/mDIgktGDkEU',
  },
  {
    id: 'IswD1FleZKE',
    label: 'Loop Reel',
    category: 'Short Form',
    accent: '#22c55e',
    url: 'https://youtu.be/IswD1FleZKE',
  },
];

const N = ITEMS.length;
const RADIUS_X = 170; // horizontal radius of the ellipse
const RADIUS_Y = 68;  // vertical tilt gives depth
const CY = 0;         // vertical centre offset
const CARD_W = 100;
const CARD_H = 138;

/* ═══════════════════════════════════════════════════════════
   OrbitalGallery
   ═══════════════════════════════════════════════════════════ */

export default function OrbitalGallery() {
  const angleRef    = useRef(0);
  const velRef      = useRef(0.004);
  const dragRef     = useRef<{ active: boolean; lastX: number; totalDrag: number }>({ active: false, lastX: 0, totalDrag: 0 });
  const rafRef      = useRef<number>(0);
  const clickUrlRef = useRef<string | null>(null);
  const [items, setItems] = useState(() =>
    ITEMS.map((item, i) => {
      const angle = (2 * Math.PI * i) / N;
      return { ...item, angle };
    })
  );

  /* ── animation loop ── */
  const tick = useCallback(() => {
    if (!dragRef.current.active) {
      angleRef.current += velRef.current;
    }
    const base = angleRef.current;

    setItems(ITEMS.map((item, i) => {
      const angle = base + (2 * Math.PI * i) / N;
      return { ...item, angle };
    }));

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { active: true, lastX: e.clientX, totalDrag: 0 };
    velRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;
    dragRef.current.totalDrag += Math.abs(dx);
    angleRef.current += dx * 0.012;
    velRef.current = dx * 0.0008;
  }, []);

  const onPointerUp = useCallback(() => {
    const totalDrag = dragRef.current.totalDrag;
    dragRef.current.active = false;
    if (Math.abs(velRef.current) < 0.003) velRef.current = 0.004;
    // navigate only if it was a tap/click (< 6px movement)
    if (totalDrag < 6 && clickUrlRef.current) {
      window.open(clickUrlRef.current, '_blank', 'noopener,noreferrer');
    }
    clickUrlRef.current = null;
  }, []);

  const onPointerLeave = useCallback(() => {
    dragRef.current.active = false;
    if (Math.abs(velRef.current) < 0.003) velRef.current = 0.004;
    clickUrlRef.current = null;
  }, []);

  /* ── sorted by depth (z) so front items are on top ── */
  const sorted = [...items].sort((a, b) => Math.sin(a.angle) - Math.sin(b.angle));

  return (
    <div
      className="select-none cursor-grab active:cursor-grabbing"
      style={{ width: RADIUS_X * 2 + CARD_W + 16, height: RADIUS_Y * 2 + CARD_H + 32, position: 'relative' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {/* Orbit ellipse ring */}
      <svg
        viewBox={`0 0 ${RADIUS_X * 2 + CARD_W + 16} ${RADIUS_Y * 2 + CARD_H + 32}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ellipse
          cx={(RADIUS_X * 2 + CARD_W + 16) / 2}
          cy={(RADIUS_Y * 2 + CARD_H + 32) / 2 + CY}
          rx={RADIUS_X + 6}
          ry={RADIUS_Y + 6}
          fill="none"
          stroke="rgba(148,163,184,0.07)"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        {/* Glow orb at centre */}
        <circle
          cx={(RADIUS_X * 2 + CARD_W + 16) / 2}
          cy={(RADIUS_Y * 2 + CARD_H + 32) / 2 + CY}
          r="8"
          fill="rgba(148,163,184,0.12)"
        />
        <circle
          cx={(RADIUS_X * 2 + CARD_W + 16) / 2}
          cy={(RADIUS_Y * 2 + CARD_H + 32) / 2 + CY}
          r="3"
          fill="rgba(255,255,255,0.25)"
        />
      </svg>

      {/* Orbit cards */}
      {sorted.map((item) => {
        const cx = (RADIUS_X * 2 + CARD_W + 16) / 2 + RADIUS_X * Math.cos(item.angle);
        const cy = (RADIUS_Y * 2 + CARD_H + 32) / 2 + CY + RADIUS_Y * Math.sin(item.angle);
        const sinA  = Math.sin(item.angle);               // -1 (top) → +1 (bottom)
        const depth = (sinA + 1) / 2;                     //  0 → 1
        const scale = 0.55 + 0.45 * depth;
        const opacity = 0.35 + 0.65 * depth;
        const blur = (1 - depth) * 2.5;

        return (
          <div
            key={item.id}
            onPointerDown={() => { clickUrlRef.current = item.url; }}
            style={{
              position: 'absolute',
              left: cx - (CARD_W * scale) / 2,
              top : cy - (CARD_H * scale) / 2,
              width : CARD_W * scale,
              height: CARD_H * scale,
              opacity,
              filter: `blur(${blur}px)`,
              transition: 'filter 0.05s linear',
              zIndex: Math.round(depth * 100),
              borderRadius: 10 * scale,
              border: `1.5px solid ${item.accent}${depth > 0.75 ? '99' : '44'}`,
              boxShadow: depth > 0.75
                ? `0 0 ${14 * depth}px ${item.accent}55, 0 4px 20px rgba(0,0,0,0.7)`
                : `0 2px 8px rgba(0,0,0,0.5)`,
              overflow: 'hidden',
              background: '#05090f',
              cursor: depth > 0.65 ? 'pointer' : 'grab',
            }}
          >
            {/* YouTube thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
              alt={item.label}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                userSelect: 'none',
              }}
            />

            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
              pointerEvents: 'none',
            }} />

            {/* Play button — show when near front */}
            {depth > 0.6 && (
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -58%)',
                width: 28 * scale, height: 28 * scale,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)',
                border: `1.5px solid ${item.accent}99`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                boxShadow: `0 0 12px ${item.accent}55`,
                pointerEvents: 'none',
              }}>
                <svg
                  width={10 * scale} height={10 * scale}
                  viewBox="0 0 10 12" fill="none"
                >
                  <polygon points="0,0 10,6 0,12" fill={item.accent} fillOpacity="0.95" />
                </svg>
              </div>
            )}

            {/* Label bar — only when near front */}
            {depth > 0.65 && (
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: `${5 * scale}px ${4 * scale}px ${4 * scale}px`,
                pointerEvents: 'none',
              }}>
                <span style={{
                  fontSize: 7 * scale,
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: 5.5 * scale,
                  color: item.accent,
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  opacity: 0.85,
                }}>
                  {item.category}
                </span>
              </div>
            )}
          </div>
        );
      })}

      {/* Drag hint */}
      <div style={{
        position: 'absolute', bottom: 2, left: 0, right: 0,
        textAlign: 'center',
        fontSize: 9,
        color: 'rgba(148,163,184,0.3)',
        fontFamily: 'monospace',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        ← drag →
      </div>
    </div>
  );
}
