import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, Sparkles, BookOpen, Clock, ShieldCheck, Flame } from 'lucide-react';
import { postService, categoryService } from '../services/api';
import FeaturedPost from '../components/blog/FeaturedPost';
import PostCard from '../components/blog/PostCard';
import CategoryPills from '../components/common/CategoryPills';
import SeoHead from '../components/common/SeoHead';

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [featRes, trendRes, catRes, latestRes] = await Promise.all([
          postService.getFeaturedPosts(),
          postService.getTrendingPosts(5),
          categoryService.getCategories(),
          postService.getPosts({ limit: 6, sortBy: 'latest' })
        ]);

        if (featRes?.success) setFeaturedPosts(featRes.data);
        if (trendRes?.success) setTrendingPosts(trendRes.data);
        if (catRes?.success) setCategories(catRes.data);
        if (latestRes?.success) setLatestPosts(latestRes.data);
      } catch (err) {
        console.error('Failed to load home page content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleSelectCategory = (slug) => {
    if (slug) {
      navigate(`/blog?category=${slug}`);
    } else {
      navigate('/blog');
    }
  };

  return (
    <div>
      <SeoHead
        title="TechPulse - Enterprise Engineering & Tech Blog"
        description="Read in-depth software architecture blueprints, cloud native infrastructure patterns, and artificial intelligence breakthroughs inspired by Zoho Blog standards."
      />

      {/* Top Corporate Hero Banner */}
      <section className="bg-gradient-to-b from-brand-50/70 via-slate-50 to-slate-50 border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-200 text-brand-700 text-xs font-semibold shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Engineering Insights & Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Where technical depth meets enterprise reality<span className="text-brand-600">.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
              Curated articles, deep architectural reviews, and hands-on system designs written for engineering teams building mission-critical software.
            </p>
          </div>

          {/* Category Navigation Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Browse by Tech Domain</span>
              <Link to="/blog" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                View all categories <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 1. Featured Articles Section */}
        {featuredPosts.length > 0 && (
          <FeaturedPost posts={featuredPosts} />
        )}

        {/* 2. Trending Section + Latest Posts Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          
          {/* Latest Posts (8 cols) */}
          <section className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Latest Publications</h2>
              </div>
              <Link
                to="/blog"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
              >
                Browse All Posts <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            <div className="mt-10 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-brand-500 hover:bg-brand-50 text-slate-800 hover:text-brand-700 font-semibold text-sm transition shadow-2xs"
              >
                Explore Full Article Archive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Sidebar: Trending / Popular Articles + Topics (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Trending Articles Widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-slate-900">Popular & Trending</h3>
              </div>

              <div className="space-y-4">
                {trendingPosts.map((post, idx) => (
                  <Link
                    key={post._id}
                    to={`/blog/${post.slug}`}
                    className="group flex items-start gap-3.5 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <span className="text-2xl font-extrabold text-slate-300 group-hover:text-brand-600 transition font-mono w-6">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white inline-block mb-1"
                        style={{ backgroundColor: post.category?.color || '#2563eb' }}
                      >
                        {post.category?.name}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readingTime} • {post.views} views
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Corporate Focus Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
              <ShieldCheck className="w-8 h-8 text-brand-400 mb-3" />
              <h4 className="text-lg font-bold">Rigorous Engineering Standards</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                All TechPulse publications are peer-reviewed by principal architects and vetted against production enterprise workloads.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>100% Technical Depth</span>
                <span>Zero Clickbait</span>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

