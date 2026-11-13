import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

export default function TableOfContents({ contentHtml }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!contentHtml) return;

    // Parse HTML to extract H2 and H3 elements
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, 'text/html');
    const elements = doc.querySelectorAll('h2, h3');

    const extracted = [];
    elements.forEach((el, index) => {
      const text = el.textContent.trim();
      const tag = el.tagName.toLowerCase();
      // Generate an id if none exists
      const id = el.id || `section-${index}-${text.toLowerCase().replace(/[^\w]+/g, '-')}`;
      extracted.push({ id, text, level: tag === 'h2' ? 2 : 3 });
    });

    setHeadings(extracted);
  }, [contentHtml]);

  // Observer to track which section is currently in view
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs sticky top-24">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
        <List className="w-4 h-4 text-brand-600" />
        <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-800">
          Table of Contents
        </h4>
      </div>

      <nav className="space-y-1 text-sm max-h-[70vh] overflow-y-auto pr-1">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <button
              key={h.id}
              onClick={() => scrollToHeading(h.id)}
              className={`w-full text-left py-1.5 px-2 rounded-lg transition-all flex items-start gap-1.5 ${
                h.level === 3 ? 'pl-5 text-xs text-slate-500' : 'text-xs sm:text-sm font-medium'
              } ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-bold border-l-2 border-brand-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ChevronRight
                className={`w-3 h-3 flex-shrink-0 mt-0.5 transition-transform ${
                  isActive ? 'rotate-90 text-brand-600' : 'text-slate-400 opacity-60'
                }`}
              />
              <span className="line-clamp-2">{h.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

