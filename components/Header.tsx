'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionMap: Record<string, string> = {
    Portfolio: 'portfolio',
    Insights: 'insights',
    Services: 'services',
    Connect: 'connect',
  };

  const handleNavClick = (item: string) => {
    const id = sectionMap[item];
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 pointer-events-none">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 flex items-center justify-between pointer-events-auto">

        {/* Logo — console icon + cyan-to-blue gradient text */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full
            bg-white/[0.07] backdrop-blur-xl
            border border-white/[0.15]
            shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]
            hover:bg-white/[0.13] hover:border-white/[0.28]
            hover:shadow-[0_4px_28px_rgba(0,200,255,0.3)]
            hover:scale-105
            transition-all duration-200"
        >
          {/* Gaming controller icon */}
          <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ctrlBody" x1="0" y1="0" x2="32" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#40E0D0"/>
                <stop offset="55%" stopColor="#29B6F6"/>
                <stop offset="100%" stopColor="#1565C0"/>
              </linearGradient>
              <linearGradient id="ctrlGrip" x1="0" y1="0" x2="0" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#29B6F6" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#0D47A1" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            {/* Controller body */}
            <path
              d="M7 4 C4 4 1 7 1 11 C1 16 4 21 7.5 21 C9.5 21 10.5 19.5 13 18 L16 18 L19 18 C21.5 19.5 22.5 21 24.5 21 C28 21 31 16 31 11 C31 7 28 4 25 4 Z"
              fill="url(#ctrlBody)" fillOpacity="0.18" stroke="url(#ctrlBody)" strokeWidth="1.3"
            />
            {/* Left grip */}
            <path d="M7.5 13 C5 14 2.5 17.5 3.5 20 C5 20.5 7 18.5 8.5 16 Z" fill="url(#ctrlGrip)"/>
            {/* Right grip */}
            <path d="M24.5 13 C27 14 29.5 17.5 28.5 20 C27 20.5 25 18.5 23.5 16 Z" fill="url(#ctrlGrip)"/>
            {/* D-pad vertical */}
            <rect x="8" y="8.5" width="2" height="6" rx="0.6" fill="white" fillOpacity="0.85"/>
            {/* D-pad horizontal */}
            <rect x="6" y="10.5" width="6" height="2" rx="0.6" fill="white" fillOpacity="0.85"/>
            {/* Face buttons — ▲ △ ○ × */}
            {/* Circle (top) */}
            <circle cx="22" cy="8"  r="1.35" fill="none" stroke="#40E0D0" strokeWidth="1.2"/>
            {/* Cross (bottom) */}
            <path d="M21.3 12.3 L22.7 13.7 M22.7 12.3 L21.3 13.7" stroke="#29B6F6" strokeWidth="1.2" strokeLinecap="round"/>
            {/* Square (left) */}
            <rect x="19" y="9.8" width="2.1" height="2.1" rx="0.4" fill="none" stroke="#7C4DFF" strokeWidth="1.2"/>
            {/* Triangle (right) */}
            <path d="M24.2 10 L25.8 10 L25 11.8 Z" fill="none" stroke="#40E0D0" strokeWidth="1.1"/>
            {/* Center home dot */}
            <circle cx="16" cy="10" r="2" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="1"/>
            <circle cx="16" cy="10" r="0.8" fill="white" fillOpacity="0.6"/>
            {/* Shoulder bumper hints */}
            <path d="M9 4.5 C10.5 3.2 13.5 3 16 3 C18.5 3 21.5 3.2 23 4.5" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" fill="none"/>
          </svg>

          {/* "RaiJin" — Space Grotesk bold, cyan-to-blue gradient */}
          <span className="text-[1.05rem] font-black tracking-wide font-display">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #40E0D0 0%, #29B6F6 40%, #1565C0 100%)' }}
            >
              RaiJin
            </span>
          </span>
        </button>

        {/* Dynamic Island Nav — glass morphism floating pill */}
        <nav
          className={`hidden md:flex items-center gap-0.5 px-3 py-1.5 rounded-full transition-all duration-500
            bg-white/[0.07] backdrop-blur-2xl
            border border-white/[0.12]
            shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.09)]
            ${scrolled ? 'bg-black/[0.18]' : ''}`}
        >
          {['Portfolio', 'Insights', 'Services', 'Connect'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-300
                hover:text-white
                hover:bg-white/[0.1]
                hover:shadow-[0_0_14px_rgba(37,123,244,0.25)]
                hover:border-white/[0.15]
                border border-transparent
                transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Contact — hover dropdown with social links (desktop only) */}
        <div className="relative group hidden md:block">
          <button
            className="px-6 py-2.5 rounded-full
              bg-white/[0.07] backdrop-blur-xl
              border border-white/[0.15]
              shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]
              text-white text-sm font-semibold
              hover:bg-white/[0.14] hover:border-white/[0.28]
              hover:shadow-[0_4px_24px_rgba(37,123,244,0.35)]
              hover:scale-105
              transition-all duration-200"
          >
            Contact
          </button>

          {/* Dropdown — appears on hover via group-hover */}
          <div
            className="absolute right-0 top-full pt-2
              opacity-0 translate-y-1 pointer-events-none
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
              transition-all duration-200 ease-out"
          >
            <div
              className="flex flex-col gap-1 p-2 rounded-2xl"
              style={{
                background: 'rgba(8,12,24,0.82)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Twitter */}
              <a
                href="https://twitter.com/Rai_Jin_Sama"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400
                  hover:text-white hover:bg-white/[0.07] transition-all duration-150 group/item"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
                <span className="text-xs font-medium whitespace-nowrap">@Rai_Jin_Sama</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com/users/raijin1715"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400
                  hover:text-[#5865F2] hover:bg-[#5865F2]/[0.08] transition-all duration-150"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-xs font-medium whitespace-nowrap">raijin1715</span>
              </a>

              {/* Mail */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pvyom96@gmail.com"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400
                  hover:text-[#2E86C1] hover:bg-[#2E86C1]/[0.08] transition-all duration-150"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span className="text-xs font-medium whitespace-nowrap">pvyom96@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full
            bg-white/[0.07] backdrop-blur-xl border border-white/[0.15]
            text-white/80 hover:text-white hover:bg-white/[0.13]
            transition-all duration-200"
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5H16M2 9H16M2 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>

      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden pointer-events-auto"
          style={{
            background: 'rgba(8,12,24,0.92)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div className="flex flex-col p-4 gap-1">
            {['Portfolio', 'Insights', 'Services', 'Connect'].map((item) => (
              <button
                key={item}
                onClick={() => { handleNavClick(item); setMobileOpen(false); }}
                className="px-4 py-3 rounded-xl text-sm font-medium text-slate-300
                  hover:text-white hover:bg-white/[0.08] text-left transition-all duration-150"
              >
                {item}
              </button>
            ))}

            <div className="h-px bg-white/10 my-2" />

            {/* Social links */}
            <a
              href="https://twitter.com/Rai_Jin_Sama"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400
                hover:text-white hover:bg-white/[0.07] transition-all duration-150"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
              <span className="text-xs font-medium">@Rai_Jin_Sama</span>
            </a>

            <a
              href="https://discord.com/users/raijin1715"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400
                hover:text-[#5865F2] hover:bg-[#5865F2]/[0.08] transition-all duration-150"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="text-xs font-medium">raijin1715</span>
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pvyom96@gmail.com"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400
                hover:text-[#2E86C1] hover:bg-[#2E86C1]/[0.08] transition-all duration-150"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="text-xs font-medium">pvyom96@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
