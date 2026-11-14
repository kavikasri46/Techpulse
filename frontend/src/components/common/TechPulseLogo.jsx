import React from 'react';

/**
 * TechPulse Brand Logo Component
 * Uses the custom stylized "T" red & black emblem + TECHPULSE wordmark + Blog badge
 */
export default function TechPulseLogo({ size = 'default', showBadge = true, variant = 'light' }) {
  const isLarge = size === 'large';
  const isDark = variant === 'dark';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Brand "T" Dynamic Emblem */}
      <div className={`${isLarge ? 'w-11 h-11' : 'w-9 h-9'} rounded-xl ${isDark ? 'bg-white p-1 shadow-sm' : 'bg-transparent'} flex items-center justify-center transform transition-transform group-hover:scale-105 overflow-hidden flex-shrink-0`}>
        <img
          src="/logo.png"
          alt="TechPulse Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Wordmark & Engineering Badge */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className={`font-black tracking-tight leading-none ${isDark ? 'text-white' : 'text-[#111111]'} ${isLarge ? 'text-2xl' : 'text-xl'}`}>
            TECH<span className="text-[#E42528]">PULSE</span>
          </span>
        </div>
        {showBadge && (
          <span className="text-[10px] uppercase font-black tracking-wider text-white bg-[#E42528] px-2 py-0.5 rounded shadow-2xs">
            Blog
          </span>
        )}
      </div>
    </div>
  );
}
