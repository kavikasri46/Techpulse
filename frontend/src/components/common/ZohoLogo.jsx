import React from 'react';
import { Link } from 'react-router-dom';

export default function ZohoLogo({ size = 'default', showBadge = true }) {
  const isLarge = size === 'large';
  const blockClass = isLarge ? 'w-6 h-6 rounded-md text-xs font-black' : 'w-5 h-5 rounded-[4px] text-[10px] font-black';

  return (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Iconic Zoho 4-tile cube icon */}
      <div className="grid grid-cols-2 gap-1">
        <div className={`${blockClass} bg-[#E42528] text-white flex items-center justify-center shadow-2xs`}>
          Z
        </div>
        <div className={`${blockClass} bg-[#009639] text-white flex items-center justify-center shadow-2xs`}>
          O
        </div>
        <div className={`${blockClass} bg-[#0F65AF] text-white flex items-center justify-center shadow-2xs`}>
          H
        </div>
        <div className={`${blockClass} bg-[#FFC600] text-slate-900 flex items-center justify-center shadow-2xs`}>
          O
        </div>
      </div>

      {/* Brand Name & Blog Tag */}
      <div className="flex items-baseline gap-1.5">
        <span className={`font-black tracking-tight text-slate-900 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
          ZOHO
        </span>
        {showBadge && (
          <span className="text-xs uppercase font-extrabold tracking-wider text-white bg-[#E42528] px-2 py-0.5 rounded-sm shadow-2xs">
            Blog
          </span>
        )}
      </div>
    </div>
  );
}
