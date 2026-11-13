import React, { useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function RichArticleBody({ content }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Assign deterministic IDs to all headings so TableOfContents can link smoothly
    const headings = containerRef.current.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-');
        heading.id = `section-${index}-${text}`;
      }
    });

    // 2. Wrap <pre><code> blocks with a Copy button toolbar
    const preBlocks = containerRef.current.querySelectorAll('pre');
    preBlocks.forEach((pre) => {
      // Avoid duplicate copy buttons if re-rendered
      if (pre.parentNode.classList.contains('code-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper relative group my-6';

      const copyBtn = document.createElement('button');
      copyBtn.className =
        'absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1 transition opacity-80 group-hover:opacity-100 z-10 border border-slate-700';
      copyBtn.innerHTML = '<span>Copy</span>';

      copyBtn.addEventListener('click', () => {
        const codeText = pre.innerText;
        navigator.clipboard.writeText(codeText);
        copyBtn.innerHTML = '<span class="text-emerald-400">Copied!</span>';
        setTimeout(() => {
          copyBtn.innerHTML = '<span>Copy</span>';
        }, 2000);
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(copyBtn);
      wrapper.appendChild(pre);
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

