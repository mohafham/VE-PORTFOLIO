'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
  action?: 'underline' | 'highlight';
  /** trigger the animation */
  animate?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  color = '#2E86C1',
  action = 'underline',
  animate = false,
  className = '',
}: HighlighterProps) {
  const controls = useAnimation();
  const containerRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  // Measure real width after mount / resize
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => setWidth(containerRef.current!.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [children]);

  // Fire animation as soon as animate flips to true
  useEffect(() => {
    if (animate && width > 0) {
      controls.start({ pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } });
    } else if (!animate) {
      controls.set({ pathLength: 0, opacity: 0 });
    }
  }, [animate, width, controls]);

  if (action === 'highlight') {
    return (
      <span className={`relative inline-block ${className}`} ref={containerRef}>
        <motion.span
          className="absolute inset-0 rounded-sm -z-10"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
        {children}
      </span>
    );
  }

  // underline — animated SVG brush stroke
  const h = 10; // svg height
  // Gentle wave path spanning full width
  const path = width > 0
    ? `M 2 ${h * 0.4} C ${width * 0.2} ${h * 0.1}, ${width * 0.4} ${h * 0.85}, ${width * 0.6} ${h * 0.4} S ${width * 0.85} ${h * 0.1}, ${width - 2} ${h * 0.5}`
    : 'M 0 5 L 100 5';

  return (
    <span className={`relative inline-block ${className}`} ref={containerRef}>
      {children}
      {width > 0 && (
        <span
          className="absolute left-0 pointer-events-none"
          style={{ bottom: '-6px', width, height: h }}
          aria-hidden
        >
          <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none" overflow="visible">
            <motion.path
              d={path}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={controls}
            />
          </svg>
        </span>
      )}
    </span>
  );
}
