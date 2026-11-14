import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  Clock,
  Star,
  ChevronRight,
  TrendingUp,
  Cpu,
  Server,
  Lock,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { postService, categoryService } from '../services/api';
import SeoHead from '../components/common/SeoHead';

// Curated avatar gradient palette for humanized author badges
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

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [featRes, trendRes, catRes, latestRes] = await Promise.all([
          postService.getFeaturedPosts(),
          postService.getTrendingPosts(6),
          categoryService.getCategories(),
          postService.getPosts({ limit: 8, sortBy: 'latest' })
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

  // 6 Domain category representations matching "Shop By Category" in AURA
  const domainCards = [
    {
      title: 'Architecture',
      slug: 'software-development',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Cloud Fleet',
      slug: 'cloud-computing',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Enterprise AI',
      slug: 'artificial-intelligence-machine-learning',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Cybersecurity',
      slug: 'cybersecurity',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Mobile Systems',
      slug: 'web-and-mobile-app-development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Telemetry & DevOps',
      slug: 'software-development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // 4 Curated Blueprint Series matching "Curated Looks" in AURA
  const curatedSeries = [
    {
      title: 'Clean Architecture Microservices',
      category: 'Software Architecture',
      slug: 'clean-architecture-in-enterprise-nodejs-lessons-from-techpulse-mail',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Zero Trust Cloud Perimeter',
      category: 'Cybersecurity Fleet',
      slug: 'zero-trust-architecture-explained-practical-implementation-in-techpulse-cloud',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Private Enterprise Neural Models',
      category: 'AI & Inference',
      slug: 'privacy-first-ai-building-enterprise-llm-agents-without-selling-customer-data',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Kubernetes Multi-Cluster GitOps',
      category: 'Cloud Engineering',
      slug: 'mastering-kubernetes-multi-cluster-management-ebpf-service-meshes-techpulse',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const primaryHeroPost = featuredPosts[0] || latestPosts[0];

  return (
    <div className="bg-[#FAF9F5] text-stone-900 font-sans min-h-screen">
      <SeoHead
        title="TechPulse Engineering - Architectural Deep Dives, Cloud Systems & AI Research"
        description="Official TechPulse Engineering publication: Modern architectural blueprints, distributed systems, zero-trust cloud fleets, and enterprise AI."
      />

      {/* ========================================================================= */}
      {/* 1. LUXURY SPLIT EDITORIAL HERO (AURA STYLE: Modern Essentials)            */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Hero Column: Big Serif Typography & Dual Actions */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:pr-4">
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-stone-900 tracking-tight leading-[1.12]">
              Modern Architecture.<br />
              Effortless At Scale.
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Timeless engineering patterns. Zero-trust perimeters. Resilient multi-region bare-metal fleets. Built for builders who care about craft.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5">
              <Link
                to="/blog"
                className="px-6 py-3 rounded-none bg-[#1F2421] hover:bg-stone-900 text-white text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-xs"
              >
                Explore Stories
              </Link>

              {primaryHeroPost && (
                <Link
                  to={`/blog/${primaryHeroPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-stone-700 hover:text-stone-950 transition group"
                >
                  <span>Featured Release</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Hero Column: Large Clean Editorial Portrait Image */}
          <div className="lg:col-span-5 xl:col-span-6">
            <Link
              to={primaryHeroPost ? `/blog/${primaryHeroPost.slug}` : '/blog'}
              className="group block relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200/80 shadow-xs"
            >
              <img
                src={primaryHeroPost?.featuredImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'}
                alt={primaryHeroPost?.title || 'Modern Engineering'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              {primaryHeroPost && (
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block mb-1.5 border border-white/20">
                    {primaryHeroPost.category?.name || 'Architecture'}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug line-clamp-2 text-white">
                    {primaryHeroPost.title}
                  </h3>
                </div>
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EXPLORE BY DOMAIN (AURA STYLE: "Shop By Category" Strip)              */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 border-t border-[#EAE6DE]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight">
            Explore By Domain
          </h2>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs tracking-wider uppercase font-medium text-stone-600 hover:text-stone-950 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Clean Square Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {domainCards.map((cat) => (
            <Link
              key={cat.title}
              to={`/blog?category=${cat.slug}`}
              className="group block text-center"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-200/80 mb-3 border border-stone-200/60 shadow-2xs">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <span className="text-xs sm:text-[13px] font-medium tracking-wide text-stone-800 group-hover:text-stone-950 transition">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CURATED BLUEPRINTS (AURA STYLE: "Curated Looks" Horizontal Cards)     */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-14 border-t border-[#EAE6DE]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Intro Tile (AURA Soft Tint Box) */}
          <div className="lg:col-span-3 bg-[#E5E5DE] p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight leading-snug mb-3">
                Curated Series
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                End-to-end architectural blueprints designed for enterprise fleets operating at multi-region scale.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-stone-800 hover:text-stone-950 group"
              >
                <span>Explore Series</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 4 Clean Series Vertical Cards */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {curatedSeries.map((item) => (
              <Link
                key={item.title}
                to={`/blog/${item.slug}`}
                className="group bg-white rounded-2xl p-3 border border-stone-200/70 shadow-2xs flex flex-col justify-between hover:shadow-xs transition"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-2 leading-snug mb-2">
                    {item.title}
                  </h4>
                  <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-stone-500 group-hover:text-stone-900 transition">
                    Read Blueprint →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LATEST PUBLICATIONS (AURA STYLE: "New Arrivals" 4-Column Grid)        */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-14 border-t border-[#EAE6DE]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight">
              Latest Publications
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-normal">
              Fresh insights on cloud infrastructure, distributed consensus, and AI safety.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs tracking-wider uppercase font-medium text-stone-600 hover:text-stone-950 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Column Minimalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPosts.slice(0, 4).map((post) => {
            const authorName = post.author?.name || 'TechPulse Architect';
            const initials = getInitials(authorName);
            const gradient = getAvatarGradient(authorName);

            return (
              <div
                key={post._id}
                className="group bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  {/* Aspect 4/5 Image Container */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="relative block aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 mb-3.5"
                  >
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <button
                      type="button"
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-stone-950 transition"
                      title="Bookmark article"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  {/* Title in Serif Font */}
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-stone-950 transition line-clamp-2 leading-snug mb-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>

                {/* Author & Reading Time Row */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${gradient} text-white font-bold text-[9px] flex items-center justify-center flex-shrink-0`}>
                      {initials}
                    </div>
                    <span className="font-medium text-stone-700 line-clamp-1">{authorName}</span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-400">{post.readingTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ARCHITECTURAL FAVORITES & SEASONAL EDIT (AURA STYLE: Split Banner)     */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-14 border-t border-[#EAE6DE]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Architectural Favorites List (55%) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight">
                Architectural Favorites
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Timeless deep-dives. Most read by senior system engineers.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {trendingPosts.slice(0, 4).map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl p-3 border border-stone-200/70 shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 mb-2.5">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-semibold text-stone-900 line-clamp-2 leading-tight mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="text-stone-500 font-mono text-[10px]">
                        {(post.views || 1800).toLocaleString()} reads
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Seasonal Edit Card (45% Banner) */}
          <div className="lg:col-span-5 bg-[#EBE7DF] rounded-2xl p-8 flex flex-col justify-between border border-stone-300/60 shadow-2xs">
            <div>
              <span className="text-[10.5px] tracking-[0.22em] uppercase font-semibold text-stone-500 block mb-2">
                Special Edition
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-tight mb-3">
                Post-Quantum Cryptography Fleet Migration
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Threat modeling Shor's algorithm, NIST standardization, and upgrading enterprise PKI across bare-metal datacenters.
              </p>
            </div>

            <div className="space-y-4">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-300">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
                  alt="Quantum Cryptography"
                  className="w-full h-full object-cover"
                />
              </div>

              <Link
                to="/blog/quantum-computing-horizons-preparing-techpulse-cloud-post-quantum-cryptography"
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-none bg-[#1F2421] hover:bg-stone-900 text-white text-xs font-semibold tracking-[0.16em] uppercase transition shadow-xs"
              >
                Read Special Issue →
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
