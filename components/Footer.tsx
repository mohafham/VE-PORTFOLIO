'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Twitter } from 'lucide-react';

/* Discord SVG — lucide-react doesn't ship Discord */
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="connect" className="w-full relative overflow-hidden" style={{ background: '#06070d' }}>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes grid-drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(60px, 60px); }
        }
        @keyframes neon-pulse {
          0%,100% { text-shadow: 0 0 12px rgba(46,134,193,0.18), 0 0 28px rgba(46,134,193,0.08); }
          50%     { text-shadow: 0 0 22px rgba(46,134,193,0.32), 0 0 48px rgba(46,134,193,0.14); }
        }
        @keyframes scan {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: calc(100% + 2px); opacity: 0; }
        }
        @keyframes card-border-pulse {
          0%,100% { border-color: rgba(46,134,193,0.15); }
          50%     { border-color: rgba(46,134,193,0.38); }
        }
        .footer-card      { animation: card-border-pulse 5s ease-in-out infinite; }
        .footer-card-d1   { animation: card-border-pulse 5s ease-in-out infinite 1.6s; }
        .footer-card-d2   { animation: card-border-pulse 5s ease-in-out infinite 3.2s; }
        .scan-line        { animation: scan 2.8s linear infinite; }
      `}</style>

      {/* ── Animated grid background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div style={{
          position: 'absolute',
          inset: -60,
          backgroundImage:
            'linear-gradient(rgba(46,134,193,0.055) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(46,134,193,0.055) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'grid-drift 22s linear infinite',
        }} />
        {/* Radial glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[280px] rounded-full blur-[40px] sm:blur-[130px]"
          style={{ background: 'rgba(46,134,193,0.07)' }} />
        <div className="absolute bottom-0 left-1/4 w-[420px] h-[180px] rounded-full blur-[40px] sm:blur-[100px]"
          style={{ background: 'rgba(46,134,193,0.05)' }} />
        <div className="absolute bottom-0 right-1/4 w-[340px] h-[160px] rounded-full blur-[40px] sm:blur-[90px]"
          style={{ background: 'rgba(110,40,230,0.05)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pt-16 sm:pt-24 pb-12 sm:pb-16">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center text-[11px] font-medium tracking-[0.35em] uppercase mb-4"
          style={{ color: 'rgba(46,134,193,0.65)' }}
        >
          — Your cup of tea? —
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center font-bold tracking-tight text-white"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', lineHeight: 1.05, animation: 'neon-pulse 4.5s ease-in-out infinite' }}
        >
          Let&apos;s&nbsp;start
        </motion.h2>

        {/* Neon rule */}
        <div className="mt-10 sm:mt-14 mb-10 sm:mb-14 relative">
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(46,134,193,0.55) 50%, transparent)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-36 blur-sm"
            style={{ background: 'rgba(46,134,193,0.9)' }} />
        </div>

        {/* ── Three glassmorphism cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

          {/* Email card */}
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pvyom96@gmail.com"
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ scale: 1.025, y: -5 }}
            className="footer-card group relative flex flex-col gap-4 p-6 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8,12,24,0.75)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(46,134,193,0.15)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
              style={{ background: '#2E86C1', boxShadow: '0 0 8px rgba(46,134,193,1)' }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono"
              style={{ color: 'rgba(46,134,193,0.6)' }}>{'// EMAIL'}</span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(46,134,193,0.08)', border: '1px solid rgba(46,134,193,0.22)' }}>
                <Mail className="w-5 h-5" style={{ color: '#2E86C1' }} />
              </div>
              <span className="text-white/75 font-medium text-sm break-all group-hover:text-white transition-colors duration-200">
                pvyom96@gmail.com
              </span>
            </div>
            <div className="mt-auto flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-mono group-hover:gap-3 transition-all duration-200"
              style={{ color: 'rgba(46,134,193,0.6)' }}>
              Send message <span>›</span>
            </div>
            {/* Bottom edge glow on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(46,134,193,0.7), transparent)' }} />
          </motion.a>

          {/* Centre CTA card */}
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pvyom96@gmail.com"
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.27 }}
            whileHover={{ scale: 1.04, y: -7 }}
            whileTap={{ scale: 0.97 }}
            className="footer-card-d1 group relative flex flex-col items-center justify-center gap-5 p-6 sm:p-8 rounded-2xl overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(145deg, rgba(46,134,193,0.13) 0%, rgba(46,134,193,0.04) 100%)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(46,134,193,0.38)',
              boxShadow: '0 8px 48px rgba(46,134,193,0.14), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}
          >
            {/* Moving scanline */}
            <div className="scan-line absolute left-0 right-0 h-px opacity-20 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(46,134,193,0.95), transparent)' }} />

            <span className="text-[10px] tracking-[0.3em] uppercase font-mono"
              style={{ color: 'rgba(46,134,193,0.7)' }}>{'// INITIATE'}</span>
            <span className="text-white font-bold text-2xl tracking-wider"
              style={{ textShadow: '0 0 24px rgba(46,134,193,0.55)' }}>
              Get in touch
            </span>
            <div className="h-px w-10 group-hover:w-28 transition-all duration-500 ease-out"
              style={{ background: 'linear-gradient(90deg, rgba(46,134,193,0.4), rgba(46,134,193,0.9))' }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono"
              style={{ color: 'rgba(46,134,193,0.5)' }}>Click to connect →</span>
          </motion.a>

          {/* Phone card */}
          <motion.a
            href="tel:+918081413254"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.38 }}
            whileHover={{ scale: 1.025, y: -5 }}
            className="footer-card-d2 group relative flex flex-col gap-4 p-6 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8,12,24,0.75)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(46,134,193,0.15)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
              style={{ background: '#2E86C1', boxShadow: '0 0 8px rgba(46,134,193,1)' }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono"
              style={{ color: 'rgba(46,134,193,0.6)' }}>{'// PHONE'}</span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(46,134,193,0.08)', border: '1px solid rgba(46,134,193,0.22)' }}>
                <Phone className="w-5 h-5" style={{ color: '#2E86C1' }} />
              </div>
              <span className="text-white/75 font-medium text-sm group-hover:text-white transition-colors duration-200">
                +91 8081413254
              </span>
            </div>
            <div className="mt-auto flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-mono group-hover:gap-3 transition-all duration-200"
              style={{ color: 'rgba(46,134,193,0.6)' }}>
              Call now <span>›</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(46,134,193,0.7), transparent)' }} />
          </motion.a>

        </div>

        {/* Bottom neon rule */}
        <div className="mt-12 sm:mt-16 mb-8 sm:mb-10 h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(46,134,193,0.28) 50%, transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[13px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.22)' }}>
            © {new Date().getFullYear()}{' '}
            <span className="font-bold" style={{ color: '#2E86C1' }}>RaiJiN</span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-3">

            {/* Twitter / X */}
            <a
              href="https://twitter.com/Rai_Jin_Sama"
              target="_blank" rel="noopener noreferrer" aria-label="Twitter"
              className="flex items-center justify-center w-9 h-9 rounded-full text-slate-400
                border border-white/10 bg-white/[0.04]
                hover:text-white hover:border-white/25 hover:bg-white/[0.08]
                transition-all duration-200"
            >
              {/* X (Twitter) logo */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </a>

            {/* Mail */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pvyom96@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Mail"
              className="flex items-center justify-center w-9 h-9 rounded-full text-slate-400
                border border-white/10 bg-white/[0.04]
                hover:text-white hover:border-white/25 hover:bg-white/[0.08]
                transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/users/raijin1715"
              target="_blank" rel="noopener noreferrer" aria-label="Discord"
              className="flex items-center justify-center w-9 h-9 rounded-full text-slate-400
                border border-white/10 bg-white/[0.04]
                hover:text-[#5865F2] hover:border-[#5865F2]/30 hover:bg-[#5865F2]/[0.08]
                transition-all duration-200"
            >
              <DiscordIcon className="w-4 h-4" />
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}
