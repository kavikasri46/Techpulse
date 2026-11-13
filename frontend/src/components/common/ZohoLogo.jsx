import React from 'react';

/**
 * Official Zoho 4-tile logo component matching the brand identity
 * Features the signature 4 interconnected rounded square tiles:
 * Red, Green, Blue, Yellow + ZOHO wordmark + optional "Blog" tag
 */
export default function ZohoLogo({ size = 'default', showBadge = true }) {
  const isLarge = size === 'large';

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* 4 interconnected rounded tiles as seen on zoho.com */}
      <div className="flex items-center -space-x-1">
        {/* Red tile */}
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#E42528] -rotate-6 transform transition-transform group-hover:rotate-0`} />
        {/* Green tile */}
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#009639] rotate-3 transform transition-transform group-hover:rotate-0`} />
        {/* Blue tile */}
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#0F65AF] -rotate-3 transform transition-transform group-hover:rotate-0`} />
        {/* Yellow tile */}
        <div className={`${isLarge ? 'w-5 h-7' : 'w-4 h-6'} rounded-md border-3 border-[#FFC600] rotate-6 transform transition-transform group-hover:rotate-0`} />
      </div>

      {/* Brand text & Blog badge */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className={`font-black tracking-[0.18em] text-[#111111] leading-none ${isLarge ? 'text-2xl' : 'text-xl'}`}>
            ZOHO
          </span>
        </div>
        {showBadge && (
          <span className="text-[10px] uppercase font-black tracking-wider text-white bg-[#E42528] px-1.5 py-0.5 rounded shadow-2xs">
            Blog
          </span>
        )}
      </div>
    </div>
  );
}
