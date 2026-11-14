import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  FileCheck2,
  FileClock,
  Eye,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  ExternalLink,
  Star,
  Layers,
  Sparkles,
  User,
  TrendingUp,
  X,
  ChevronDown,
  CheckCircle2,
  ArrowUpRight,
  Code2,
  Cloud,
  Shield,
  Cpu,
  Smartphone,
  Zap,
  Compass,
  Tag,
  BookOpen,
  Clock,
  Calendar,
  Hash,
  UserCheck,
  Briefcase,
  RefreshCw,
  Sliders,
  ArrowUpDown,
  LayoutGrid,
  Clock3,
  Activity,
  CheckCheck,
  Globe2,
  GitPullRequest
} from 'lucide-react';
import { postService, categoryService } from '../../services/api';
import SeoHead from '../../components/common/SeoHead';
import { getUniquePostImage } from '../../utils/blogImages';

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

const getCategoryIcon = (categoryName = '') => {
  const norm = categoryName.toLowerCase();
  if (norm.includes('software') || norm.includes('development') || norm.includes('code')) {
    return Code2;
  }
  if (norm.includes('cloud') || norm.includes('fleet') || norm.includes('devops') || norm.includes('infrastructure')) {
    return Cloud;
  }
  if (norm.includes('cyber') || norm.includes('security') || norm.includes('zero')) {
    return Shield;
  }
  if (norm.includes('ai') || norm.includes('intelligence') || norm.includes('machine') || norm.includes('learning')) {
    return Cpu;
  }
  if (norm.includes('mobile') || norm.includes('web') || norm.includes('app')) {
    return Smartphone;
  }
  if (norm.includes('quantum') || norm.includes('innovation') || norm.includes('emerging')) {
    return Zap;
  }
  if (norm.includes('insight') || norm.includes('leadership') || norm.includes('culture')) {
    return Compass;
  }
  return Tag;
};

const getCategoryBadgeStyle = (categoryName = '') => {
  const norm = categoryName.toLowerCase();
  if (norm.includes('software') || norm.includes('development') || norm.includes('code')) {
    return 'bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100/70';
  }
  if (norm.includes('cloud') || norm.includes('fleet') || norm.includes('devops') || norm.includes('infrastructure')) {
    return 'bg-sky-50 text-sky-700 border-sky-200/80 hover:bg-sky-100/70';
  }
  if (norm.includes('cyber') || norm.includes('security') || norm.includes('zero')) {
    return 'bg-rose-50 text-rose-700 border-rose-200/80 hover:bg-rose-100/70';
  }
  if (norm.includes('ai') || norm.includes('intelligence') || norm.includes('machine') || norm.includes('learning')) {
    return 'bg-purple-50 text-purple-700 border-purple-200/80 hover:bg-purple-100/70';
  }
  if (norm.includes('mobile') || norm.includes('web') || norm.includes('app')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100/70';
  }
  if (norm.includes('innovation') || norm.includes('quantum') || norm.includes('emerging')) {
    return 'bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100/70';
  }
  if (norm.includes('insight') || norm.includes('leadership') || norm.includes('culture')) {
    return 'bg-orange-50 text-orange-800 border-orange-200/80 hover:bg-orange-100/70';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200/80 hover:bg-slate-200/70';
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Sorting
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async (showSpin = false) => {
    try {
      if (showSpin) setIsRefreshing(true);
      else setLoading(true);

      const [statsRes, postsRes, catRes] = await Promise.all([
        postService.getAdminStats(),
        postService.getAdminPosts({
          status: statusFilter,
          category: categoryFilter,
          search: searchQuery,
          limit: 50
        }),
        categoryService.getCategories()
      ]);

      if (statsRes?.success) setStats(statsRes.data);
      if (postsRes?.success) setPosts(postsRes.data);
      if (catRes?.success) setCategories(catRes.data);
    } catch (err) {
      console.error('Failed to load editorial dashboard:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadData();
  };

  const handleDeletePost = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await postService.deletePost(deleteId);
      setDeleteId(null);
      loadData();
    } catch (e) {
      alert('Could not delete publication: ' + e.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleFeatured = async (post) => {
    try {
      await postService.updatePost(post._id, { isFeatured: !post.isFeatured });
      setPosts((prev) =>
        prev.map((p) => (p._id === post._id ? { ...p, isFeatured: !p.isFeatured } : p))
      );
    } catch (e) {
      alert('Could not update featured spotlight');
    }
  };

  // Client-side sort
  const sortedPosts = useMemo(() => {
    const list = [...posts];
    if (sortBy === 'views') {
      return list.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    if (sortBy === 'title') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    // Default 'latest'
    return list.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
  }, [posts, sortBy]);

  const currentPostToDelete = useMemo(
    () => posts.find((p) => p._id === deleteId),
    [posts, deleteId]
  );

  return (
    <div className="space-y-7 animate-fadeIn">
      <SeoHead title="Publications & Content - TechPulse Editorial Studio" />

      {/* Header Row: Title, Subtitle, Badges & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs text-[11px] font-semibold text-stone-700 tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E42528]" />
            <span>TechPulse Editorial Control Center</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            <span className="text-[10px] text-emerald-700 font-mono">Live Sync</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>Publications & Overview</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 mt-1">
            <span>Review published engineering deep-dives, manage draft queues, and observe live fleet engagement.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* Manual Refresh Sync Button */}
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 text-xs font-semibold shadow-2xs hover:shadow-xs transition disabled:opacity-50"
            title="Refresh database telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-[#E42528]' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <Link
            to="/admin/posts/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E42528] to-[#C71B1E] hover:from-[#C71B1E] hover:to-[#A31417] text-white font-semibold text-xs tracking-wider uppercase shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards (4 Metric Cards with Distinct Icons & Border Glows) */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* 1. Live Articles Card */}
          <div className="group bg-white p-5 rounded-2xl border border-slate-200/80 border-l-4 border-l-emerald-500 shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                Live Articles
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {stats.publishedPosts}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>100% syndicated on edge</span>
            </div>
          </div>

          {/* 2. Draft Pipeline Card */}
          <div className="group bg-white p-5 rounded-2xl border border-slate-200/80 border-l-4 border-l-amber-500 shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <GitPullRequest className="w-3.5 h-3.5 text-amber-600" />
                Draft Pipeline
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileClock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {stats.draftPosts}
              </span>
              <span className="inline-flex items-center text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                Zero backlog
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>All submissions reviewed</span>
            </div>
          </div>

          {/* 3. Active Topics Card */}
          <div className="group bg-white p-5 rounded-2xl border border-slate-200/80 border-l-4 border-l-blue-500 shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                Active Topics
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {categories.length}
              </span>
              <span className="inline-flex items-center text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                Domain Channels
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
              <FolderTree className="w-3 h-3 text-blue-500" />
              <span>Full taxonomy coverage</span>
            </div>
          </div>

          {/* 4. Total Readership Card */}
          <div className="group bg-white p-5 rounded-2xl border border-slate-200/80 border-l-4 border-l-rose-500 shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                Total Readership
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {stats.totalViews.toLocaleString()}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <ArrowUpRight className="w-3 h-3" />
                +14.8% Live
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
              <Globe2 className="w-3 h-3 text-rose-500" />
              <span>Global edge CDN verified</span>
            </div>
          </div>

        </div>
      )}

      {/* Filter and Search Bar: Humanized Controls with Rich Icons */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row gap-3.5 lg:items-center lg:justify-between">
        
        {/* Left: Segmented Tabs (All / Published / Drafts) with Icons */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Articles', icon: LayoutGrid, count: stats?.totalPosts ?? posts.length },
            { id: 'published', label: 'Published', icon: CheckCircle2, count: stats?.publishedPosts ?? 0 },
            { id: 'draft', label: 'Drafts', icon: Clock3, count: stats?.draftPosts ?? 0 },
          ].map((tab) => {
            const active = statusFilter === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  active
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <TabIcon className={`w-3.5 h-3.5 ${active ? 'text-[#E42528]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active ? 'bg-slate-100 text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Search, Category Filter & Sorting */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1 max-w-2xl justify-end">
          
          {/* Search Box with Search Icon */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, slug, tags..."
              className="w-full pl-8 pr-12 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 pointer-events-none">
                ⌘K
              </span>
            )}
          </form>

          {/* Category Dropdown with Filter Icon */}
          <div className="relative">
            <Filter className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-7 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition cursor-pointer"
            >
              <option value="all">All Topics</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Selector with ArrowUpDown Icon */}
          <div className="relative">
            <ArrowUpDown className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-7 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="views">Most Read</option>
              <option value="title">Alphabetical</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Publications Table (Enhanced Visuals with Dedicated Icons in every column) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200/80 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 pl-5">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    Article
                  </span>
                </th>
                <th className="py-3 px-4">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    Topic
                  </span>
                </th>
                <th className="py-3 px-4">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    Author
                  </span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    Status
                  </span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-slate-400" />
                    Spotlight
                  </span>
                </th>
                <th className="py-3 px-4 text-right">
                  <span className="inline-flex items-center justify-end gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    Readership
                  </span>
                </th>
                <th className="py-3 px-4 pr-5 text-right">
                  <span className="inline-flex items-center justify-end gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-slate-400">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                      <div className="w-4 h-4 border-2 border-slate-300 border-t-[#E42528] rounded-full animate-spin" />
                      Loading publications telemetry...
                    </div>
                  </td>
                </tr>
              ) : sortedPosts.length > 0 ? (
                sortedPosts.map((post, idx) => {
                  const authorName = post.author?.name || 'TechPulse Contributor';
                  const initials = getInitials(authorName);
                  const gradient = getAvatarGradient(authorName);
                  const categoryName = post.category?.name || 'General';
                  const catBadgeStyle = getCategoryBadgeStyle(categoryName);
                  const CatIcon = getCategoryIcon(categoryName);
                  const postImg = getUniquePostImage(post, idx);

                  return (
                    <tr
                      key={post._id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* 1. Thumbnail, Title & Metadata with Icons */}
                      <td className="py-3.5 px-4 pl-5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80 shadow-2xs">
                            <img
                              src={postImg}
                              alt={post.title}
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                              }}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="min-w-0 max-w-md">
                            <Link
                              to={`/admin/posts/edit/${post._id}`}
                              className="font-bold text-slate-900 group-hover:text-[#E42528] transition-colors truncate block text-sm"
                              title={post.title}
                            >
                              {post.title}
                            </Link>
                            <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                              <span className="flex items-center gap-1 text-slate-400">
                                <Hash className="w-3 h-3 text-slate-300" />
                                {post.slug}
                              </span>
                              {post.readingTime && (
                                <>
                                  <span className="text-slate-300">•</span>
                                  <span className="font-sans flex items-center gap-1 text-slate-500">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    {post.readingTime}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Topic Category Chip with Domain Icon */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-2xs transition-all ${catBadgeStyle}`}
                        >
                          <CatIcon className="w-3 h-3 flex-shrink-0" />
                          <span>{categoryName}</span>
                        </span>
                      </td>

                      {/* 3. Author Column with 3D Avatar & Role */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full bg-gradient-to-tr ${gradient} text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white shadow-2xs flex-shrink-0`}
                            title={authorName}
                          >
                            {initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-slate-900 leading-tight truncate max-w-[140px]">
                              {authorName}
                            </span>
                            {post.author?.title ? (
                              <span className="text-[10px] text-slate-400 truncate max-w-[140px] flex items-center gap-1 mt-0.5">
                                <Briefcase className="w-2.5 h-2.5 text-slate-300" />
                                {post.author.title}
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400">Staff Architect</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 4. Status with Live Pulsing Dot */}
                      <td className="py-3.5 px-4 text-center">
                        {post.status === 'published' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Published
                          </span>
                        ) : post.status === 'draft' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 shadow-2xs">
                            <Clock3 className="w-3 h-3 text-amber-500" />
                            Draft
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 shadow-2xs">
                            <Calendar className="w-3 h-3 text-blue-500" />
                            Scheduled
                          </span>
                        )}
                      </td>

                      {/* 5. Spotlight Star Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(post)}
                          title={post.isFeatured ? 'Spotlighted on homepage (Click to toggle)' : 'Click to spotlight'}
                          className={`p-1.5 rounded-lg transition-all ${
                            post.isFeatured
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 ring-1 ring-amber-200/80 shadow-2xs'
                              : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${post.isFeatured ? 'fill-amber-400 text-amber-500' : ''}`} />
                        </button>
                      </td>

                      {/* 6. Readership with Trend Icon */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1 font-bold text-slate-800 font-mono text-xs">
                          <span>{(post.views || 0).toLocaleString()}</span>
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                        </div>
                      </td>

                      {/* 7. Action Bar with Hover Icons */}
                      <td className="py-3.5 px-4 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {post.status === 'published' && (
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              title="Preview on live site"
                              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <Link
                            to={`/admin/posts/edit/${post._id}`}
                            title="Edit publication"
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteId(post._id)}
                            title="Remove publication"
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-1">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">No articles match your criteria</p>
                      <p className="text-xs text-slate-400">
                        Try adjusting search keywords or changing the status filter.
                      </p>
                      {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setStatusFilter('all');
                            setCategoryFilter('all');
                          }}
                          className="mt-2 text-xs font-semibold text-[#E42528] hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary Bar with Icons */}
        <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Showing <strong className="text-slate-800 font-semibold">{sortedPosts.length}</strong> of{' '}
              <strong className="text-slate-800 font-semibold">{posts.length}</strong> publications
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-mono">
              Database Sync: MongoDB Atlas
            </span>
            <Link
              to="/admin/posts/new"
              className="text-[#E42528] hover:underline font-semibold flex items-center gap-1"
            >
              <span>+ Create Story</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Humanized Delete Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Publication</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{currentPostToDelete?.title || 'this article'}"</span>? This will unpublish the story immediately from the fleet blog.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeletePost}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition shadow-sm disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
