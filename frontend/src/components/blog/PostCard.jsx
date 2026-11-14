import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Bookmark, Share2 } from 'lucide-react';

const AVATAR_GRADIENTS = [
  'from-rose-500 to-red-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-pink-600',
  'from-teal-500 to-emerald-600',
];

const getInitials = (name = '') => {
  if (!name) return 'TP';
  const clean = name.trim().split(/\s+/);
  if (clean.length === 1) return clean[0].slice(0, 2).toUpperCase();
  return (clean[0][0] + clean[clean.length - 1][0]).toUpperCase();
};

const getAvatarGradient = (name = '') => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const idx = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
};

export default function PostCard({ post }) {
  if (!post) return null;

  const authorName = post.author?.name || 'TechPulse Contributor';
  const initials = getInitials(authorName);
  const gradient = getAvatarGradient(authorName);

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <article className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <Link
        to={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Category Pill Tag */}
        {post.category && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full text-white bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xs">
            {post.category.name}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readingTime || '4 min read'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E42528] transition-colors line-clamp-2 leading-snug mb-2.5">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
            {post.shortDescription}
          </p>
        </div>

        {/* Footer: Author & Read More */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${gradient} text-white font-bold text-[10px] flex items-center justify-center shadow-2xs flex-shrink-0`}>
              {initials}
            </div>
            <span className="text-xs font-semibold text-slate-800 line-clamp-1">
              {authorName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-[#E42528] rounded-lg hover:bg-slate-50 transition"
              title="Bookmark story"
              aria-label="Bookmark"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-[#E42528] rounded-lg hover:bg-slate-50 transition"
              title="Share story"
              aria-label="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <Link
              to={`/blog/${post.slug}`}
              className="text-xs font-bold text-[#E42528] group-hover:text-[#C71B1E] flex items-center gap-1 transition ml-1"
            >
              Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
