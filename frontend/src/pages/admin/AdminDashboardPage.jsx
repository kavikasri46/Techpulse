import React, { useState, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';
import { postService, categoryService } from '../../services/api';
import SeoHead from '../../components/common/SeoHead';

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
      console.error('Failed to load admin dashboard:', err);
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

  const handleDeletePost = async () => {
    if (!deleteId) return;
    try {
      await postService.deletePost(deleteId);
      setDeleteId(null);
      loadData();
    } catch (e) {
      alert('Failed to delete post: ' + e.message);
    }
  };

  const handleToggleFeatured = async (post) => {
    try {
      await postService.updatePost(post._id, { isFeatured: !post.isFeatured });
      loadData();
    } catch (e) {
      alert('Failed to toggle featured status');
    }
  };

  return (
    <div className="space-y-8">
      <SeoHead title="Admin CMS Dashboard" />

      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Editorial Content Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your articles, review publishing schedules, monitor reading traffic, and curate featured highlights.
          </p>
        </div>

        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Top Metric Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Total Articles</span>
              <FileText className="w-4 h-4 text-brand-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{stats.totalPosts}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Published</span>
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">{stats.publishedPosts}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Drafts</span>
              <FileClock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-600">{stats.draftPosts}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Scheduled</span>
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-extrabold text-indigo-600">{stats.scheduledPosts}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Total Views</span>
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-extrabold text-purple-700">{stats.totalViews.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search article titles..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Views</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    Loading articles...
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Article Title & Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-12 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100"
                        />
                        <div className="min-w-0 max-w-sm">
                          <p className="font-bold text-slate-900 truncate">{post.title}</p>
                          <p className="text-[11px] text-slate-400 font-mono">/{post.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white inline-block"
                        style={{ backgroundColor: post.category?.color || '#2563eb' }}
                      >
                        {post.category?.name || 'General'}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author?.avatar}
                          alt={post.author?.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-medium text-slate-700">{post.author?.name || 'Staff'}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          post.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : post.status === 'draft'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(post)}
                        title={post.isFeatured ? 'Featured post (Click to unfeature)' : 'Click to feature'}
                        className={`p-1.5 rounded-lg transition ${
                          post.isFeatured ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' : 'text-slate-300 hover:text-slate-500'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${post.isFeatured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>

                    {/* Views */}
                    <td className="py-3 px-4 text-right font-mono text-slate-600">
                      {(post.views || 0).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {post.status === 'published' && (
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            title="Preview on live site"
                            className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          to={`/admin/posts/edit/${post._id}`}
                          title="Edit post"
                          className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post._id)}
                          title="Delete post"
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No articles match your current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to permanently delete this article? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-500 text-white transition shadow-sm"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

