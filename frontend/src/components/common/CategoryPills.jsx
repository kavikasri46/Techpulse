import React from 'react';
import { Layers } from 'lucide-react';

export default function CategoryPills({ categories = [], selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
          !selectedCategory
            ? 'bg-slate-900 text-white shadow-sm'
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        All Topics
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.slug;
        return (
          <button
            key={cat._id || cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              isSelected
                ? 'bg-brand-600 text-white shadow-sm font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: cat.color || '#2563eb' }}
            />
            {cat.name}
            {cat.postCount !== undefined && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-500'
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

