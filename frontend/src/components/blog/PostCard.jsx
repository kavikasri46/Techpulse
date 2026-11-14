import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function PostCard({ post }) {
  if (!post) return null;

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
          <span
            className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm text-white shadow-sm"
            style={{ backgroundColor: post.category.color || '#E42528' }}
          >
            {post.category.name}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readingTime || '4 min read'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#E42528] transition-colors line-clamp-2 leading-snug mb-2.5">
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
            <img
              src={post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
              alt={post.author?.name || 'Author'}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                {post.author?.name || 'TechPulse Staff'}
              </span>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-bold text-[#E42528] group-hover:text-[#C71B1E] flex items-center gap-1 transition"
          >
            Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
