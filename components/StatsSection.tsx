'use client';

import React from 'react';

const stats = [
  { value: '50+', label: 'Happy Clients', sub: 'Worldwide', icon: 'groups' },
  { value: '1.2k', label: 'Projects Done', sub: '& Counting', icon: 'movie_filter' },
  { value: '08+', label: 'Years Active', sub: 'In The Game', icon: 'workspace_premium' },
];

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-20 max-w-[1440px] mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-effect rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="material-icons text-primary text-3xl">{stat.icon}</span>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary/60 to-accent/60 mt-3"></div>
            </div>
            <p className="text-5xl font-black text-white mb-1 tracking-tight">{stat.value}</p>
            <p className="text-slate-300 font-medium text-lg">{stat.label}</p>
            <p className="text-slate-500 text-sm mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
