import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  Clock,
  ShieldCheck,
  Flame,
  ChevronRight,
  Server,
  Cpu,
  Mail,
  Shield,
  Smartphone,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
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
    <div className="bg-[#FAFAFB]">
      <SeoHead
        title="Zoho Blog - Insights on Engineering, AI, Cloud & Work Culture"
        description="Official Zoho Blog: Explore deep-dives on distributed systems, privacy-first AI, enterprise software engineering, and cloud infrastructure directly from Zoho developers."
      />

      {/* ========================================================================= */}
      {/* 1. SIGNATURE ZOHO HERO SECTION (Matching zoho.com exactly)                 */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-[#E5E7EB] pt-12 pb-14 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column: Headline, Red Bar, Description & Red CTA Button */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#111111] tracking-tight leading-[1.12]">
                Your life's work,<br />
                powered by our code<span className="text-[#E42528]">.</span>
              </h1>

              {/* Zoho signature small red line under the headline */}
              <div className="w-12 h-1 bg-[#E42528] rounded-full" />

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                A unique and powerful technical publication covering how Zoho builds resilient cloud infrastructure, privacy-first AI models, and enterprise software for 100+ million global users.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#E42528] hover:bg-[#C71B1E] text-white text-xs font-black uppercase tracking-wider transition shadow-sm"
                >
                  <span>Explore Engineering Stories</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://www.zoho.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-sm border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold uppercase tracking-wider transition"
                >
                  <span>About Zoho Cloud</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Right Hero Column: 2x3 Grid (FEATURED APPS / TOPICS) */}
            <div className="lg:col-span-6 bg-[#F8F9FA] p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-2xs">
              <div className="mb-6">
                <span className="text-[11px] uppercase font-black tracking-widest text-[#111111]">
                  Featured Topics
                </span>
                <div className="w-6 h-0.5 bg-[#E42528] mt-1" />
              </div>

              {/* 2x3 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* 1. Cloud Infra */}
                <Link
                  to="/blog?category=cloud-computing"
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#0F65AF] hover:shadow-xs transition group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-md bg-blue-50 text-[#0F65AF] flex items-center justify-center">
                      <Server className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0F65AF] transition">
                      Cloud Fleet
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Bare-metal multi-datacenter orchestration with Cilium eBPF.
                  </p>
                </Link>

                {/* 2. Mail Engine */}
                <Link
                  to="/blog?category=software-development"
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#E42528] hover:shadow-xs transition group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-md bg-red-50 text-[#E42528] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#E42528] transition">
                      Mail Core
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    High-throughput event-driven messaging at petabyte scale.
                  </p>
                </Link>

                {/* 3. AI & Zia */}
                <Link
                  to="/blog?category=artificial-intelligence-machine-learning"
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#7c3aed] hover:shadow-xs transition group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition">
                      Zia AI
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Zero-leakage, privacy-first enterprise neural models.
                  </p>
                </Link>

                {/* 4. Zero Trust Security */}
                <Link
                  to="/blog?category=cybersecurity"
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#009639] hover:shadow-xs transition group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-md bg-emerald-50 text-[#009639] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#009639] transition">
                      Zero Trust
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Hardware MFA, perimeter microsegmentation & mTLS.
                  </p>
                </Link>

                {/* 5. Mobile & Offline-First */}
                <Link
                  to="/blog?category=web-and-mobile-app-development"
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#0F65AF] hover:shadow-xs transition group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition">
                      Offline-First
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Local-first mobile sync architecture with instant response.
                  </p>
                </Link>

                {/* 6. Clean System Architecture */}
                <Link
                  to="/blog?category=technology-innovation"
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#d97706] hover:shadow-xs transition group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition">
                      Innovation
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Post-quantum cryptography & next-generation runtime.
                  </p>
                </Link>

              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/80 text-right">
                <Link
                  to="/blog"
                  className="text-xs font-bold text-[#0F65AF] hover:text-[#0B4D85] inline-flex items-center gap-1 uppercase tracking-wider"
                >
                  Explore All Topics <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 2. DUAL HIGHLIGHT CARDS (Catalyst & Zia Agents as seen in screenshot)      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-[#E5E7EB]">
            
            {/* Catalyst by Zoho Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-50/80 via-sky-50/50 to-white border border-blue-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#0F65AF] bg-blue-100/80 px-2 py-0.5 rounded">
                  Full-Stack Cloud
                </span>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded bg-[#0F65AF] text-white flex items-center justify-center font-black text-xs">
                    C
                  </div>
                  <span className="font-extrabold text-base text-slate-900 tracking-tight">Catalyst by Zoho</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  Build, deploy, and scale production-ready applications with AI
                </h3>
              </div>
              <Link
                to="/blog?category=cloud-computing"
                className="mt-4 text-xs font-bold text-[#0F65AF] hover:underline flex items-center gap-1"
              >
                Read Cloud Case Studies <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Zia Agents Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-50/80 via-pink-50/40 to-white border border-purple-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded">
                  Agent Builder
                </span>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded bg-[#E42528] text-white flex items-center justify-center font-black text-xs">
                    Z
                  </div>
                  <span className="font-extrabold text-base text-slate-900 tracking-tight">Zoho Zia Agents</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  Zia Agent Studio—your digital workforce. Build autonomous agents that run on private models.
                </h3>
              </div>
              <Link
                to="/blog?category=artificial-intelligence-machine-learning"
                className="mt-4 text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
              >
                Explore AI Research <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="mt-10 pt-6 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                Explore by Domain
              </span>
              <Link to="/blog" className="text-xs font-bold text-[#E42528] hover:underline flex items-center gap-1">
                View all articles <ArrowRight className="w-3 h-3" />
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

      {/* ========================================================================= */}
      {/* 3. MAIN BLOG FEED & TRENDING GRID                                         */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
        
        {/* Featured Story Spotlight */}
        {featuredPosts.length > 0 && (
          <FeaturedPost posts={featuredPosts} />
        )}

        {/* Latest Publications + Trending Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          
          {/* Latest Posts (8 cols) */}
          <section className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#E42528]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight uppercase">
                  Latest Zoho Publications
                </h2>
              </div>
              <Link
                to="/blog"
                className="text-xs font-bold text-[#E42528] hover:text-[#C71B1E] flex items-center gap-1 group"
              >
                Browse Full Catalog <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-[#E5E7EB]" />
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
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-white border border-[#E5E7EB] hover:border-[#E42528] hover:text-[#E42528] text-slate-800 font-bold text-xs uppercase tracking-wider transition shadow-2xs"
              >
                Explore Full Article Library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Sidebar: Trending Zoho Articles + Privacy Commitment */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Trending Articles Widget */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-2xs">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
                <span className="w-7 h-7 rounded-md bg-red-50 text-[#E42528] flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Trending on Zoho Blog
                </h3>
              </div>

              <div className="space-y-4">
                {trendingPosts.map((post, idx) => (
                  <Link
                    key={post._id}
                    to={`/blog/${post.slug}`}
                    className="group flex items-start gap-3.5 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <span className="text-2xl font-black text-slate-300 group-hover:text-[#E42528] transition font-mono w-6">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white inline-block mb-1"
                        style={{ backgroundColor: post.category?.color || '#0F65AF' }}
                      >
                        {post.category?.name}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#E42528] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" /> {post.readingTime} • {post.views} views
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Zoho Privacy Pledge Card */}
            <div className="rounded-2xl p-6 bg-[#1A1A1A] text-white shadow-md border border-slate-800">
              <div className="w-10 h-10 rounded-md bg-[#E42528] flex items-center justify-center mb-3 text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black uppercase tracking-wide">Zoho's Privacy Commitment</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                We never monetize your data, never display third-party advertisements, and own our private data centers worldwide.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-[#FFC600] font-bold">
                <span>Zero Third-Party Ads</span>
                <span>Self-Hosted Cloud</span>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
