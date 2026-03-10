'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const STATUS_COLOR: Record<TimelineItem['status'], string> = {
  completed:   '#2E86C1',
  'in-progress': '#5BC0D4',
  pending:     '#334155',
};

const STATUS_GLOW: Record<TimelineItem['status'], string> = {
  completed:   'rgba(46,134,193,0.7)',
  'in-progress': 'rgba(91,192,212,0.7)',
  pending:     'rgba(51,65,85,0.5)',
};

// Orbit radii for up to 6 items
const ORBIT_RADII = [90, 140, 185, 225, 260, 290];
const NODE_R = 20;

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [activeId,   setActiveId]   = useState<number | null>(null);
  const [angles,     setAngles]     = useState<number[]>(() =>
    timelineData.map((_, i) => (i / timelineData.length) * 360)
  );
  const [paused, setPaused] = useState<Record<number, boolean>>({});
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const SIZE = 620; // svg viewport
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  // Angular speed per item (deg/sec) — each orbit slightly different
  const SPEEDS = timelineData.map((_, i) => 12 + i * 3.5);

  const tick = useCallback((now: number) => {
    if (lastRef.current === 0) lastRef.current = now;
    const dt = (now - lastRef.current) / 1000;
    lastRef.current = now;
    setAngles(prev =>
      prev.map((a, i) => (paused[timelineData[i].id] ? a : (a + SPEEDS[i] * dt) % 360))
    );
    rafRef.current = requestAnimationFrame(tick);
  }, [paused, timelineData, SPEEDS]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const nodePositions = angles.map((deg, i) => {
    const r = ORBIT_RADII[i] ?? 260;
    const rad = (deg * Math.PI) / 180;
    return {
      x: Math.round((CX + r * Math.cos(rad)) * 1000) / 1000,
      y: Math.round((CY + r * Math.sin(rad)) * 1000) / 1000,
    };
  });

  const handleNodeClick = (item: TimelineItem, idx: number) => {
    if (activeId === item.id) {
      setActiveId(null);
      setPaused(p => ({ ...p, [item.id]: false }));
    } else {
      setActiveId(item.id);
      setPaused(p => ({ ...p, [item.id]: true }));
    }
  };

  const activeItem = timelineData.find(d => d.id === activeId);
  const activeIdx  = timelineData.findIndex(d => d.id === activeId);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      <div className="relative w-full" style={{ maxWidth: SIZE }}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full h-auto"
          style={{ maxHeight: '520px' }}
        >
          {/* ── Orbit rings ── */}
          {timelineData.map((_, i) => (
            <circle
              key={`ring-${i}`}
              cx={CX} cy={CY}
              r={ORBIT_RADII[i]}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          ))}

          {/* ── Center hub ── */}
          <circle cx={CX} cy={CY} r={42} fill="rgba(14,22,36,0.9)" stroke="rgba(46,134,193,0.35)" strokeWidth="1.5"/>
          <circle cx={CX} cy={CY} r={34} fill="none" stroke="rgba(46,134,193,0.15)" strokeWidth="1"/>
          {/* Pulsing ring */}
          <motion.circle
            cx={CX} cy={CY} r={46}
            fill="none"
            stroke="rgba(46,134,193,0.2)"
            strokeWidth="1"
            animate={{ r: [44, 50, 44], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <text x={CX} y={CY - 7} textAnchor="middle" fill="#5BC0D4" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="sans-serif">TOOLS</text>
          <text x={CX} y={CY + 9} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="sans-serif">click a node</text>

          {/* ── Relation lines ── */}
          {timelineData.map((item, i) => {
            const from = nodePositions[i];
            return item.relatedIds.map(rid => {
              const ti = timelineData.findIndex(d => d.id === rid);
              if (ti < 0 || ti < i) return null;
              const to = nodePositions[ti];
              const isActive = activeId === item.id || activeId === rid;
              return (
                <line
                  key={`rel-${item.id}-${rid}`}
                  x1={from.x} y1={from.y}
                  x2={to.x}   y2={to.y}
                  stroke={isActive ? 'rgba(46,134,193,0.55)' : 'rgba(255,255,255,0.05)'}
                  strokeWidth={isActive ? 1.2 : 0.6}
                  strokeDasharray="3 5"
                />
              );
            });
          })}

          {/* ── Line from active node to center ── */}
          {activeId !== null && (
            <motion.line
              x1={nodePositions[activeIdx]?.x ?? CX}
              y1={nodePositions[activeIdx]?.y ?? CY}
              x2={CX} y2={CY}
              stroke="rgba(46,134,193,0.4)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}

          {/* ── Nodes ── */}
          {timelineData.map((item, i) => {
            const { x, y } = nodePositions[i];
            const isActive  = activeId === item.id;
            const color     = STATUS_COLOR[item.status];
            const glow      = STATUS_GLOW[item.status];
            const Icon      = item.icon;
            const energyArc = (item.energy / 100) * 2 * Math.PI * NODE_R;
            const arcTotal  = 2 * Math.PI * NODE_R;

            return (
              <g
                key={item.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNodeClick(item, i)}
              >
                {/* Glow behind node */}
                {isActive && (
                  <circle cx={x} cy={y} r={NODE_R + 10} fill={glow} opacity={0.25}/>
                )}
                {/* Node bg */}
                <circle
                  cx={x} cy={y} r={NODE_R}
                  fill={isActive ? 'rgba(14,22,36,0.95)' : 'rgba(14,22,36,0.85)'}
                  stroke={color}
                  strokeWidth={isActive ? 2 : 1.2}
                />
                {/* Energy arc */}
                <circle
                  cx={x} cy={y} r={NODE_R}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeDasharray={`${energyArc} ${arcTotal}`}
                  strokeDashoffset={arcTotal * 0.25}
                  strokeLinecap="round"
                  opacity={0.6}
                  transform={`rotate(-90 ${x} ${y})`}
                />
                {/* Icon (rendered as foreign object for lucide) */}
                <foreignObject x={x - 10} y={y - 10} width={20} height={20} style={{ pointerEvents: 'none' }}>
                  <div
                    style={{
                      width: 20, height: 20,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isActive ? color : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <Icon size={13} />
                  </div>
                </foreignObject>
                {/* Label */}
                <text
                  x={x}
                  y={y + NODE_R + 14}
                  textAnchor="middle"
                  fill={isActive ? color : 'rgba(255,255,255,0.55)'}
                  fontSize="9"
                  fontWeight={isActive ? '700' : '400'}
                  fontFamily="sans-serif"
                  letterSpacing="0.5"
                >
                  {item.title.length > 14 ? item.title.slice(0, 13) + '…' : item.title}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ── Detail panel ── */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: '2%', width: '88%', maxWidth: 360 }}
            >
              <div
                className="rounded-2xl px-5 py-4 backdrop-blur-xl border"
                style={{
                  background: 'rgba(10,16,26,0.88)',
                  borderColor: STATUS_COLOR[activeItem.status] + '55',
                  boxShadow: `0 4px 32px ${STATUS_GLOW[activeItem.status]}33`,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: STATUS_COLOR[activeItem.status] }}
                  >
                    {activeItem.category}
                  </span>
                  <span className="text-xs text-white/30">{activeItem.date}</span>
                </div>
                <p className="text-white font-semibold text-sm mb-1">{activeItem.title}</p>
                <p className="text-white/50 text-xs leading-relaxed">{activeItem.content}</p>
                {/* Energy bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-white/30 mb-1">
                    <span>Proficiency</span>
                    <span>{activeItem.energy}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${STATUS_COLOR[activeItem.status]}, #5BC0D4)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeItem.energy}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
