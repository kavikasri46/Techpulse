import React from 'react';

/**
 * TechPulse Brand Logo Component
 * Sleek modern TechPulse Red pulse emblem + TECHPULSE wordmark + Blog badge
 */
export default function TechPulseLogo({ size = 'default', showBadge = true }) {
  const isLarge = size === 'large';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Sleek TechPulse Red Emblem */}
      <div className={`${isLarge ? 'w-10 h-10' : 'w-8 h-8'} rounded-xl bg-gradient-to-tr from-[#C71B1E] to-[#E42528] flex items-center justify-center text-white shadow-sm shadow-red-500/20 transform transition-transform group-hover:scale-105`}>
        <svg
          className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h4l3-7 4 14 3-7h4" />
        </svg>
      </div>

      {/* Brand Wordmark & Engineering Badge */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-[#111111] leading-none ${isLarge ? 'text-2xl' : 'text-xl'}`}>
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
