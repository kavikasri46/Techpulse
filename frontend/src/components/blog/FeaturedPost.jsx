import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedPost({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 3);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recently';

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-6">
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/10 text-amber-600">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Featured & Editors' Picks
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Card (8 columns) */}
        {mainPost && (
          <div className="lg:col-span-7 xl:col-span-8 group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <Link
              to={`/blog/${mainPost.slug}`}
              className="relative block aspect-[16/9] overflow-hidden bg-slate-900"
            >
              <img
                src={mainPost.featuredImage}
                alt={mainPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              {mainPost.category && (
                <span
                  className="absolute top-4 left-4 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full text-white shadow-md"
                  style={{ backgroundColor: mainPost.category.color || '#2563eb' }}
                >
                  {mainPost.category.name}
                </span>
              )}
            </Link>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(mainPost.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {mainPost.readingTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight mb-3">
                  <Link to={`/blog/${mainPost.slug}`}>{mainPost.title}</Link>
                </h3>

                <p className="text-slate-600 text-base leading-relaxed line-clamp-3 mb-6">
                  {mainPost.shortDescription}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={mainPost.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={mainPost.author?.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{mainPost.author?.name}</h5>
                    <p className="text-[11px] text-slate-500">{mainPost.author?.title}</p>
                  </div>
                </div>

                <Link
                  to={`/blog/${mainPost.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white text-xs font-bold transition-all shadow-xs"
                >
                  Read Story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Side Stacked Cards (4-5 columns) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          {sidePosts.map((post) => (
            <div
              key={post._id}
              className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between flex-1"
            >
              <div className="flex gap-4">
                <Link
                  to={`/blog/${post.slug}`}
                  className="relative w-28 h-24 sm:w-32 sm:h-28 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0"
                >
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: post.category?.color || '#2563eb' }}
                    >
                      {post.category?.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{post.readingTime}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {post.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>By {post.author?.name}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Read <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

