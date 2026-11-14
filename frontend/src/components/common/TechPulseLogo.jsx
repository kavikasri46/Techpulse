import React from 'react';

/**
 * TechPulse Luxury Editorial Brand Logo Component
 * Matches the refined, high-end editorial aesthetic of the reference design
 */
export default function TechPulseLogo({ size = 'default', showBadge = true, variant = 'light' }) {
  const isLarge = size === 'large';
  const isDark = variant === 'dark';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Brand "T" Dynamic Emblem */}
      <div
        className={`${
          isLarge ? 'w-11 h-11' : 'w-9 h-9'
        } rounded-xl ${
          isDark ? 'bg-white p-1 shadow-sm' : 'bg-transparent'
        } flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 overflow-hidden flex-shrink-0`}
      >
        <img
          src="/logo.png"
          alt="TechPulse Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Luxury Editorial Wordmark */}
      <div className="flex flex-col text-left">
        <span
          className={`font-serif tracking-[0.22em] font-semibold leading-tight uppercase ${
            isDark ? 'text-white' : 'text-stone-900'
          } ${isLarge ? 'text-2xl' : 'text-base sm:text-lg'}`}
        >
          Tech<span className="text-[#E42528]">Pulse</span>
        </span>
        <span
          className={`text-[8.5px] tracking-[0.28em] font-sans uppercase font-semibold mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-stone-400'
          }`}
        >
          Engineering
        </span>
      </div>
    </div>
  );
}
