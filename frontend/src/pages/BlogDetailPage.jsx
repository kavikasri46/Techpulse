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
  ShieldCheck,
  Building2,
  User,
  Mail,
  Twitter,
  Linkedin,
  Github
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
        <h2 className="text-3xl font-black text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-slate-600 mb-6">{error || "The article you're looking for doesn't exist or has been relocated."}</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#E42528] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#C71B1E] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return to TechPulse Blog
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
    <article className="py-10 bg-[#FAFAFB]">
      {/* Dynamic SEO Tags & JSON-LD Structured Data */}
      <SeoHead
        title={`${post.seoTitle || post.title} - TechPulse Blog`}
        description={post.metaDescription || post.shortDescription}
        image={post.featuredImage}
        article={post}
      />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          <Link to="/" className="hover:text-[#E42528] transition">TechPulse</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[#E42528] transition">Blog</Link>
          <span>/</span>
          <Link
            to={`/blog?category=${post.category?.slug}`}
            className="text-[#E42528] font-bold hover:underline transition"
          >
            {post.category?.name || 'Technology'}
          </Link>
        </nav>

        {/* Article Header Container */}
        <div className="w-full max-w-[1400px] mx-auto mb-8">
          {/* Category Badge */}
          {post.category && (
            <span
              className="inline-block text-xs uppercase font-extrabold tracking-wider px-3.5 py-1 rounded-sm text-white shadow-2xs mb-4"
              style={{ backgroundColor: post.category.color || '#E42528' }}
            >
              {post.category.name}
            </span>
          )}

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight leading-[1.18] mb-6">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-8">
            {post.shortDescription}
          </p>

          {/* Author Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E5E7EB] bg-white px-4 rounded-xl">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[#E42528] flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{post.author?.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{post.author?.title || 'Engineer at TechPulse'}</p>
              </div>
            </div>

            {/* Reading Details & Date */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {post.readingTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {post.views} views
              </span>
            </div>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="w-full max-w-[1500px] mx-auto mb-12">
          <div className="aspect-[21/9] sm:aspect-[16/7] rounded-2xl overflow-hidden shadow-md border border-[#E5E7EB] bg-slate-900">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Two-Column Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-[1500px] mx-auto">
          
          {/* Left Column: Table of Contents & Social Share (Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <TableOfContents contentHtml={post.content} />

            <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-2xs">
              <SocialShare title={post.title} />
            </div>

            {/* TechPulse Info Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] text-xs space-y-2">
              <span className="font-extrabold uppercase tracking-wider text-[#0F65AF] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> TechPulse Engineering
              </span>
              <p className="text-slate-600 leading-relaxed">
                This article was authored by members of TechPulse Corporation's engineering divisions. All code examples are vetted for enterprise reliability.
              </p>
            </div>
          </aside>

          {/* Main Column: Content Prose */}
          <main className="lg:col-span-8 min-w-0 bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-2xs">
            
            {/* Mobile Social Share Bar */}
            <div className="lg:hidden mb-8 p-4 rounded-xl bg-slate-50 border border-[#E5E7EB]">
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
                      className="text-xs font-semibold px-3 py-1 rounded-md bg-slate-100 hover:bg-red-50 hover:text-[#E42528] text-slate-700 transition"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Box */}
            {post.author && (
              <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[#E42528] flex-shrink-0 shadow-2xs">
                  <User className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] uppercase font-black tracking-wider text-[#E42528]">Article Contributor</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{post.author.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mb-2">{post.author.title || 'TechPulse Engineer'}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">{post.author.bio}</p>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 text-slate-500">
                    {post.author.email && (
                      <a
                        href={`mailto:${post.author.email}`}
                        className="p-1.5 rounded-md hover:text-[#E42528] hover:bg-red-50 transition"
                        title={post.author.email}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={post.author.socialLinks?.twitter || 'https://twitter.com/techpulse'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-md hover:text-[#E42528] hover:bg-red-50 transition"
                      title="Twitter / X"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={post.author.socialLinks?.linkedin || 'https://linkedin.com/company/techpulse'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-md hover:text-[#E42528] hover:bg-red-50 transition"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={post.author.socialLinks?.github || 'https://github.com/techpulse'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-md hover:text-[#E42528] hover:bg-red-50 transition"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Previous and Next Article Navigation Links */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {navigation?.prev ? (
                <Link
                  to={`/blog/${navigation.prev.slug}`}
                  className="group p-5 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#E42528] transition flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-slate-400 group-hover:text-[#E42528] flex items-center gap-1 mb-2">
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous Story
                  </span>
                  <h5 className="text-sm font-bold text-slate-800 group-hover:text-[#E42528] transition line-clamp-2">
                    {navigation.prev.title}
                  </h5>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {navigation?.next && (
                <Link
                  to={`/blog/${navigation.next.slug}`}
                  className="group p-5 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#E42528] transition flex flex-col justify-between text-right"
                >
                  <span className="text-xs font-bold text-slate-400 group-hover:text-[#E42528] flex items-center justify-end gap-1 mb-2">
                    Next Story <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <h5 className="text-sm font-bold text-slate-800 group-hover:text-[#E42528] transition line-clamp-2">
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
