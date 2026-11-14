import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Bookmark, Share2 } from 'lucide-react';
import { getUniquePostImage, UNIQUE_BLOG_IMAGES } from '../../utils/blogImages';

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

export default function PostCard({ post, index = 0 }) {
  if (!post) return null;

  const authorName = post.author?.name || 'TechPulse Contributor';
  const initials = getInitials(authorName);
  const gradient = getAvatarGradient(authorName);

  const initialImg = getUniquePostImage(post, index);
  const [imgSrc, setImgSrc] = useState(initialImg);
  const [bookmarked, setBookmarked] = useState(false);

  const handleImgError = () => {
    // Graceful fallback to guaranteed unique image
    const fallback = UNIQUE_BLOG_IMAGES[(index + 3) % UNIQUE_BLOG_IMAGES.length];
    setImgSrc(fallback);
  };

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-stone-400 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail with guaranteed unique photography */}
      <Link
        to={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-stone-100"
      >
        <img
          src={imgSrc}
          alt={post.title}
          onError={handleImgError}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Pill Tag */}
        {post.category && (
          <span className="absolute top-3 left-3 text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full text-stone-900 bg-white/90 backdrop-blur-md border border-stone-200 shadow-2xs">
            {post.category.name}
          </span>
        )}

        {/* Quick bookmark pill */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setBookmarked(!bookmarked);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full transition-all backdrop-blur-md ${
            bookmarked
              ? 'bg-[#E42528] text-white shadow-xs'
              : 'bg-white/80 text-stone-600 hover:text-stone-950 hover:bg-white shadow-2xs'
          }`}
          title={bookmarked ? 'Saved to bookmarks' : 'Bookmark story'}
          aria-label="Bookmark"
        >
          <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </Link>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2.5 text-xs text-stone-500 mb-2.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {publishedDate}
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {post.readingTime || '4 min read'}
            </span>
          </div>

          {/* Title in Serif */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#E42528] transition-colors line-clamp-2 leading-snug mb-2.5">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 font-normal">
            {post.shortDescription}
          </p>
        </div>

        {/* Footer: Author & Read More */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${gradient} text-white font-bold text-[10px] flex items-center justify-center shadow-2xs flex-shrink-0`}>
              {initials}
            </div>
            <span className="text-xs font-semibold text-stone-800 line-clamp-1">
              {authorName}
            </span>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-semibold tracking-wider uppercase text-stone-800 group-hover:text-[#E42528] flex items-center gap-1 transition-all"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
