import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Share2,
  Tag,
  ArrowLeft,
  UserCheck
} from 'lucide-react';
import { postService } from '../services/api';
import TableOfContents from '../components/blog/TableOfContents';
import SocialShare from '../components/blog/SocialShare';
import RelatedPosts from '../components/blog/RelatedPosts';
import RichArticleBody from '../components/blog/RichArticleBody';
import SeoHead from '../components/common/SeoHead';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await postService.getPostBySlug(slug);
        if (res && res.success) {
          setData(res);
        } else {
          setError(res?.message || 'Article not found');
        }
      } catch (err) {
        setError(err.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-6" />
        <div className="h-10 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-10" />
        <div className="h-96 bg-slate-200 rounded-2xl mb-10" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded" />
          <div className="h-4 bg-slate-200 rounded" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-slate-600 mb-6">{error || "The article you're looking for doesn't exist or has been removed."}</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-500 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Articles
        </Link>
      </div>
    );
  }

  const { data: post, related, navigation } = data;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <article className="py-10">
      {/* Dynamic SEO Tags & JSON-LD Structured Data */}
      <SeoHead
        title={post.seoTitle || post.title}
        description={post.metaDescription || post.shortDescription}
        image={post.featuredImage}
        article={post}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          <Link to="/" className="hover:text-slate-800 transition">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-slate-800 transition">Blog</Link>
          <span>/</span>
          <Link
            to={`/blog?category=${post.category?.slug}`}
            className="text-brand-600 hover:text-brand-700 transition"
          >
            {post.category?.name || 'Technology'}
          </Link>
        </nav>

        {/* Article Header Container */}
        <div className="max-w-4xl mx-auto mb-10">
          {/* Category Badge */}
          {post.category && (
            <span
              className="inline-block text-xs uppercase font-extrabold tracking-wider px-3.5 py-1 rounded-full text-white shadow-xs mb-4"
              style={{ backgroundColor: post.category.color || '#2563eb' }}
            >
              {post.category.name}
            </span>
          )}

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-8">
            {post.shortDescription}
          </p>

          {/* Author Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <img
                src={post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={post.author?.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{post.author?.name}</h4>
                <p className="text-xs text-slate-500">{post.author?.title}</p>
              </div>
            </div>

            {/* Reading Details & Date */}
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {post.readingTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-slate-400" />
                {post.views} views
              </span>
            </div>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="max-w-5xl mx-auto mb-14">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Two-Column Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Table of Contents & Social Share (Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <TableOfContents contentHtml={post.content} />

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <SocialShare title={post.title} />
            </div>
          </aside>

          {/* Main Column: Content Prose */}
          <main className="lg:col-span-8 min-w-0">
            
            {/* Mobile Social Share Bar */}
            <div className="lg:hidden mb-8 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <SocialShare title={post.title} />
            </div>

            {/* Rich Article Body */}
            <RichArticleBody content={post.content} />

            {/* Tags Strip */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?search=${encodeURIComponent(tag)}`}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-700 transition"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Box */}
            {post.author && (
              <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-xs flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600">Article Author</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{post.author.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mb-2">{post.author.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            )}

            {/* Previous and Next Article Navigation Links */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {navigation?.prev ? (
                <Link
                  to={`/blog/${navigation.prev.slug}`}
                  className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-brand-300 hover:shadow-md transition flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-600 flex items-center gap-1 mb-2">
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous Story
                  </span>
                  <h5 className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition line-clamp-2">
                    {navigation.prev.title}
                  </h5>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {navigation?.next && (
                <Link
                  to={`/blog/${navigation.next.slug}`}
                  className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-brand-300 hover:shadow-md transition flex flex-col justify-between text-right sm:text-right"
                >
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-600 flex items-center justify-end gap-1 mb-2">
                    Next Story <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <h5 className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition line-clamp-2">
                    {navigation.next.title}
                  </h5>
                </Link>
              )}
            </div>

          </main>
        </div>

        {/* Related Articles Section */}
        {related && related.length > 0 && (
          <RelatedPosts posts={related} />
        )}

      </div>
    </article>
  );
}

