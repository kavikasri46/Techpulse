import React from 'react';

/**
 * TechPulse Brand Logo Component
 * Sleek modern tech-crest emblem + TECHPULSE wordmark + Blog tag
 */
export default function ZohoLogo({ size = 'default', showBadge = true }) {
  const isLarge = size === 'large';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Dynamic 4-element energetic pulse mark */}
      <div className="flex items-center -space-x-1.5 relative">
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#E42528] -rotate-6 transform transition-transform group-hover:rotate-0 shadow-2xs`} />
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#009639] rotate-3 transform transition-transform group-hover:rotate-0 shadow-2xs`} />
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#0F65AF] -rotate-3 transform transition-transform group-hover:rotate-0 shadow-2xs`} />
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#FFC600] rotate-6 transform transition-transform group-hover:rotate-0 shadow-2xs`} />
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
