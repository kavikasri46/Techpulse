import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Clock, FileText, Loader2 } from 'lucide-react';
import { postService } from '../../services/api';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Live search debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await postService.getPosts({ search: query, limit: 5 });
        if (res && res.success) {
          setResults(res.data);
        }
      } catch (e) {
        console.error('Search error', e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPost = (slug) => {
    onClose();
    navigate(`/blog/${slug}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/blog?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative mx-auto max-w-2xl transform rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all overflow-hidden">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-slate-200 px-4">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, keywords, topics, or tags..."
            className="h-14 w-full border-0 bg-transparent pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-base"
          />
          {loading && <Loader2 className="w-5 h-5 text-brand-500 animate-spin mr-2" />}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4">
          {results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Found Articles ({results.length})
              </p>
              {results.map((post) => (
                <div
                  key={post._id}
                  onClick={() => handleSelectPost(post.slug)}
                  className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition border border-transparent hover:border-slate-200"
                >
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                        {post.category?.name || 'Article'}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readingTime}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition truncate">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {post.shortDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition self-center" />
                </div>
              ))}
            </div>
          ) : query ? (
            !loading && (
              <div className="py-12 text-center">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No articles match "{query}"</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "Node", "AI", "Cloud", or "Architecture"</p>
              </div>
            )
          ) : (
            <div className="py-8 px-4 text-center">
              <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-3">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Clean Architecture', 'Autonomous Agents', 'Zero Trust', 'Kubernetes', 'React Native'].map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setQuery(topic)}
                    className="px-3 py-1 text-xs rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-700 transition"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {query && (
          <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span>Press <kbd className="font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200">Enter</kbd> to see all search results</span>
            <button
              onClick={handleSearchSubmit}
              className="text-brand-600 font-semibold hover:underline"
            >
              View Full Results →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

