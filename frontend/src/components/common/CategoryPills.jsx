import React from 'react';
import { Layers } from 'lucide-react';

export default function CategoryPills({ categories = [], selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
          !selectedCategory
            ? 'bg-[#111111] text-white shadow-2xs'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        All Domains
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.slug;
        return (
          <button
            key={cat._id || cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              isSelected
                ? 'bg-[#E42528] text-white shadow-2xs font-extrabold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: isSelected ? '#ffffff' : (cat.color || '#E42528') }}
            />
            {cat.name}
            {cat.postCount !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-red-800 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.postCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
