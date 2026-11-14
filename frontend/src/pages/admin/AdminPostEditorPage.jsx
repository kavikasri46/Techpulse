import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Upload,
  Calendar,
  Sparkles,
  Eye,
  FileCode,
  Tag,
  Clock,
  Layers,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { postService, categoryService, authorService, uploadService } from '../../services/api';
import RichArticleBody from '../../components/blog/RichArticleBody';
import SeoHead from '../../components/common/SeoHead';

export default function AdminPostEditorPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('published');
  const [scheduledPublishDate, setScheduledPublishDate] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Dropdown options
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load dropdown data
  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [catsRes, authsRes] = await Promise.all([
          categoryService.getCategories(),
          authorService.getAuthors()
        ]);
        if (catsRes?.success) setCategories(catsRes.data);
        if (authsRes?.success) setAuthors(authsRes.data);

        if (!isEditing) {
          if (catsRes?.data?.length > 0) setCategory(catsRes.data[0]._id);
          if (authsRes?.data?.length > 0) setAuthor(authsRes.data[0]._id);
        }
      } catch (err) {
        console.error('Failed to load form dependencies:', err);
      }
    };
    loadDropdowns();
  }, [isEditing]);

  // Load post details if editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await postService.getPostById(id);
        if (res?.success) {
          const p = res.data;
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setShortDescription(p.shortDescription || '');
          setContent(p.content || '');
          setFeaturedImage(p.featuredImage || '');
          setCategory(p.category?._id || p.category || '');
          setAuthor(p.author?._id || p.author || '');
          setTags(Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''));
          setStatus(p.status || 'published');
          setScheduledPublishDate(
            p.scheduledPublishDate ? new Date(p.scheduledPublishDate).toISOString().slice(0, 16) : ''
          );
          setIsFeatured(Boolean(p.isFeatured));
          setSeoTitle(p.seoTitle || '');
          setMetaDescription(p.metaDescription || '');
        }
      } catch (err) {
        setErrorMessage('Failed to load article for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, isEditing]);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      );
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadService.uploadImage(file);
      if (res?.success) {
        setFeaturedImage(res.url);
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const insertSnippet = (snippet) => {
    setContent((prev) => prev + '\n' + snippet);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const postPayload = {
      title,
      slug,
      shortDescription,
      content,
      featuredImage:
        featuredImage ||
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      category,
      author,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      scheduledPublishDate: scheduledPublishDate || null,
      isFeatured,
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || shortDescription
    };

    try {
      if (isEditing) {
        await postService.updatePost(id, postPayload);
        setSuccessMessage('TechPulse Blog article updated successfully!');
      } else {
        await postService.createPost(postPayload);
        setSuccessMessage('Article published to TechPulse Blog!');
        setTimeout(() => navigate('/admin'), 1200);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error saving article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SeoHead title={isEditing ? 'Edit Article' : 'Compose Article'} />

      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-md bg-white border border-[#E5E7EB] hover:bg-slate-50 text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {isEditing ? 'Edit Blog Article' : 'Compose Technical Article'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              TechPulse Studio rich text publishing with automated SEO schema injection.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition border ${
              previewMode
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? 'Back to Editor' : 'Live Preview'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-1.5 px-5 py-2 rounded-md bg-[#E42528] hover:bg-[#C71B1E] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Publishing...' : isEditing ? 'Update Article' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {/* Feedback alerts */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Live Preview Mode */}
      {previewMode ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E5E7EB] shadow-2xs max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded bg-red-50 text-[#E42528]">
              Live Preview Mode
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 leading-tight">
              {title || 'Untitled Tech Article'}
            </h1>
            <p className="text-base text-slate-600 mt-2">{shortDescription}</p>
          </div>
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Preview"
              className="w-full aspect-[16/9] object-cover rounded-xl mb-8"
            />
          )}
          <RichArticleBody content={content || '<p>No content provided yet...</p>'} />
        </div>
      ) : (
        /* Edit Form Grid */
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Slug */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., How We Scale Multi-Datacenter Cloud Infrastructure"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  URL Slug (SEO Friendly)
                </label>
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-600">
                  <span className="text-slate-400 select-none">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="how-to-scale-multi-datacenter"
                    className="flex-1 bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Description / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Concise overview shown in blog listing and search results..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                />
              </div>
            </div>

            {/* Content Editor with Formatting Helpers */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Article Body (HTML / Rich Text) *
                </label>

                {/* Quick Insert Snippet Toolbar */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                  <button
                    type="button"
                    onClick={() => insertSnippet('<h2>Section Heading</h2>\n<p>Explain the architecture and design patterns...</p>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                  >
                    + H2 Heading
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<pre><code class="language-javascript">\nconst cluster = require("cluster");\n// Multi-worker process\n</code></pre>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono"
                  >
                    + Code Block
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<blockquote>\n  "We believe privacy is not an afterthought; it is our foundational architecture."\n</blockquote>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 italic"
                  >
                    + Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<table>\n  <thead><tr><th>Tier</th><th>Latency</th><th>Redundancy</th></tr></thead>\n  <tbody><tr><td>Edge Fleet</td><td>&lt; 5ms</td><td>Active-Active</td></tr></tbody>\n</table>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                  >
                    + Table
                  </button>
                </div>
              </div>

              <textarea
                rows={16}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post HTML here..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E42528] leading-relaxed"
              />
            </div>

            {/* SEO Metadata Box */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E42528]" />
                SEO & Open Graph Meta
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Custom SEO Title (Max 70 chars)
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={title || 'Leave blank to use Article Title'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Meta Description (Max 160 chars)
                  </label>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={shortDescription || 'Leave blank to use short description'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Settings (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Publishing Settings */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Publication Status
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                >
                  <option value="published">Published (Live on Blog)</option>
                  <option value="draft">Draft (Private)</option>
                  <option value="scheduled">Scheduled for Future</option>
                </select>
              </div>

              {status === 'scheduled' && (
                <div className="pt-2 animate-fadeIn">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Schedule Publication Date
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledPublishDate}
                    onChange={(e) => setScheduledPublishDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Featured Article</p>
                  <p className="text-[11px] text-slate-400">Hero spotlight on Home</p>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#E42528] rounded border-slate-300 focus:ring-[#E42528]"
                />
              </div>
            </div>

            {/* Taxonomy & Author */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Category & Author
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                >
                  <option value="">Select a Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Author *
                </label>
                <select
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                >
                  <option value="">Select an Author</option>
                  {authors.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name} ({a.title})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Cloud, Kubernetes, Zero Trust"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Cover Image
              </h3>

              {featuredImage && (
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={featuredImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border border-dashed border-slate-300 hover:border-[#E42528] hover:bg-red-50/50 cursor-pointer text-xs font-bold text-slate-700 transition">
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                  <span>{uploading ? 'Uploading...' : 'Upload Image from Computer'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

          </div>

        </form>
      )}
    </div>
  );
}
