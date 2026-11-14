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
  ArrowUpRight
} from 'lucide-react';
import { postService, categoryService } from '../../services/api';
import SeoHead from '../../components/common/SeoHead';

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

const getCategoryBadgeStyle = (categoryName = '') => {
  const norm = categoryName.toLowerCase();
  if (norm.includes('software') || norm.includes('development') || norm.includes('code')) {
    return 'bg-blue-50 text-blue-700 border-blue-200/70';
  }
  if (norm.includes('cloud') || norm.includes('fleet') || norm.includes('devops') || norm.includes('infrastructure')) {
    return 'bg-sky-50 text-sky-700 border-sky-200/70';
  }
  if (norm.includes('cyber') || norm.includes('security') || norm.includes('zero')) {
    return 'bg-rose-50 text-rose-700 border-rose-200/70';
  }
  if (norm.includes('ai') || norm.includes('intelligence') || norm.includes('machine') || norm.includes('learning')) {
    return 'bg-purple-50 text-purple-700 border-purple-200/70';
  }
  if (norm.includes('mobile') || norm.includes('web') || norm.includes('app')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200/70';
  }
  if (norm.includes('innovation') || norm.includes('quantum') || norm.includes('emerging') || norm.includes('insight')) {
    return 'bg-amber-50 text-amber-800 border-amber-200/70';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200/70';
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
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

  const currentPostToDelete = useMemo(
    () => posts.find((p) => p._id === deleteId),
    [posts, deleteId]
  );

  return (
    <div className="space-y-7">
      <SeoHead title="Publications & Content - TechPulse Editorial Studio" />

      {/* Header Row: Title, Subtitle & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Publications & Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Review published engineering deep-dives, manage draft queues, and observe live fleet engagement.
          </p>
        </div>

        <Link
          to="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E42528] hover:bg-[#C71B1E] text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* KPI Stat Cards (Humanized SaaS Metric Grid) */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Published Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500">Live Articles</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{stats.publishedPosts}</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
          </div>

          {/* Drafts Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500">Draft Pipeline</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileClock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{stats.draftPosts}</span>
              <span className="text-[11px] text-slate-400 font-medium">Pending review</span>
            </div>
          </div>

          {/* Scheduled / Categories Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500">Active Topics</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{categories.length}</span>
              <span className="text-[11px] text-slate-400 font-medium">Domain channels</span>
            </div>
          </div>

          {/* Total Fleet Reads Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500">Total Readership</span>
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.totalViews.toLocaleString()}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-700">
                <TrendingUp className="w-3 h-3" />
                Live
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar: Humanized Segmented Controls */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row gap-3.5 lg:items-center lg:justify-between">
        
        {/* Left: Segmented Tabs (Linear / Notion Style) */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Articles', count: stats?.totalPosts ?? posts.length },
            { id: 'published', label: 'Published', count: stats?.publishedPosts ?? 0 },
            { id: 'draft', label: 'Drafts', count: stats?.draftPosts ?? 0 },
          ].map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  active
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
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

        {/* Right: Search & Category Filter */}
        <div className="flex items-center gap-2.5 flex-1 max-w-xl justify-end">
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, tags..."
              className="w-full pl-8 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition cursor-pointer"
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
        </div>
      </div>

      {/* Publications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 pl-5">Article</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Spotlight</th>
                <th className="py-3 px-4 text-right">Readership</th>
                <th className="py-3 px-4 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-slate-400">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                      <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
                      Loading publications...
                    </div>
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((post) => {
                  const authorName = post.author?.name || 'TechPulse Contributor';
                  const initials = getInitials(authorName);
                  const gradient = getAvatarGradient(authorName);
                  const categoryName = post.category?.name || 'General';
                  const catBadgeStyle = getCategoryBadgeStyle(categoryName);

                  return (
                    <tr
                      key={post._id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 px-4 pl-5">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-12 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100 border border-slate-200/60"
                          />
                          <div className="min-w-0 max-w-md">
                            <Link
                              to={`/admin/posts/edit/${post._id}`}
                              className="font-semibold text-slate-900 hover:text-[#E42528] transition-colors truncate block text-sm"
                              title={post.title}
                            >
                              {post.title}
                            </Link>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                              <span>/{post.slug}</span>
                              {post.readingTime && (
                                <>
                                  <span>•</span>
                                  <span className="font-sans text-slate-400">{post.readingTime}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Topic Category Chip */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${catBadgeStyle}`}
                        >
                          {categoryName}
                        </span>
                      </td>

                      {/* Humanized Author Column with Initials Badge */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full bg-gradient-to-tr ${gradient} text-white font-bold text-[10px] flex items-center justify-center shadow-2xs flex-shrink-0`}
                            title={authorName}
                          >
                            {initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-slate-900 leading-tight truncate max-w-[130px]">
                              {authorName}
                            </span>
                            {post.author?.title && (
                              <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                                {post.author.title}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status with Live Dot Indicator */}
                      <td className="py-3.5 px-4 text-center">
                        {post.status === 'published' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Published
                          </span>
                        ) : post.status === 'draft' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Draft
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            Scheduled
                          </span>
                        )}
                      </td>

                      {/* Featured Spotlight Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(post)}
                          title={post.isFeatured ? 'Spotlighted on homepage (Click to toggle)' : 'Click to spotlight'}
                          className={`p-1.5 rounded-lg transition-all ${
                            post.isFeatured
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 ring-1 ring-amber-200/60'
                              : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${post.isFeatured ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>

                      {/* Readership / Views */}
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700 font-mono">
                        {(post.views || 0).toLocaleString()}
                      </td>

                      {/* Action Bar */}
                      <td className="py-3.5 px-4 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {post.status === 'published' && (
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              title="Preview on live site"
                              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <Link
                            to={`/admin/posts/edit/${post._id}`}
                            title="Edit publication"
                            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
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
      </div>

      {/* Humanized Delete Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Delete Publication</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{currentPostToDelete?.title || 'this article'}"</span>? This will unpublish the story immediately from the fleet blog.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 hover:bg-slate-100 transition"
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
