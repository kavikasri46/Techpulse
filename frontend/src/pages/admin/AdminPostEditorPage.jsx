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

        // Preselect first category and author if creating new
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
        setErrorMessage('Failed to load post for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, isEditing]);

  // Auto-generate slug and SEO titles if empty
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

  // Image File Upload handler
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

  // Quick insertion helpers for rich formatting
  const insertSnippet = (snippet) => {
    setContent((prev) => prev + '\n' + snippet);
  };

  // Save handler
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
        setSuccessMessage('Article updated successfully!');
      } else {
        await postService.createPost(postPayload);
        setSuccessMessage('Article published successfully!');
        setTimeout(() => navigate('/admin'), 1200);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error saving post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SeoHead title={isEditing ? 'Edit Article' : 'Write New Article'} />

      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isEditing ? 'Edit Blog Publication' : 'Create New Technical Article'}
            </h1>
            <p className="text-xs text-slate-500">
              Compose in-depth content with code blocks, tables, and full SEO controls.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition border ${
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
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Article'}</span>
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
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700">
              Preview Mode
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
              {title || 'Untitled Article'}
            </h1>
            <p className="text-base text-slate-500 mt-2">{shortDescription}</p>
          </div>
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Preview"
              className="w-full aspect-[16/9] object-cover rounded-2xl mb-8"
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
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Clean Architecture in Modern Node.js Applications"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  URL Slug (SEO Friendly)
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-600">
                  <span className="text-slate-400 select-none">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="clean-architecture-in-modern-nodejs"
                    className="flex-1 bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-slate-900"
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
                  placeholder="Concise 1-2 sentence overview shown in article listings and social previews..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Content Editor with Formatting Helpers */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Article Body (HTML / Rich Text) *
                </label>

                {/* Quick Insert Snippet Toolbar */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                  <button
                    type="button"
                    onClick={() => insertSnippet('<h2>Section Heading</h2>\n<p>Explain the concept here...</p>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                  >
                    + H2 Heading
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<pre><code class="language-javascript">\nconst server = express();\nserver.listen(5000);\n</code></pre>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono"
                  >
                    + Code Block
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<blockquote>\n  "Architecture is the decisions that wish you could get right early on."\n</blockquote>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 italic"
                  >
                    + Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<table>\n  <thead><tr><th>Feature</th><th>Advantage</th></tr></thead>\n  <tbody><tr><td>Zero Trust</td><td>Microsegmentation</td></tr></tbody>\n</table>')}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700"
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
                placeholder="Write or paste your article HTML here. Supports h2, h3, paragraphs, code blocks, tables, and blockquotes..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
              />
            </div>

            {/* SEO Metadata Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Search Engine Optimization (SEO)
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Settings (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Publishing Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Publication Status
              </h3>

              {/* Status Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="published">Published (Live)</option>
                  <option value="draft">Draft (Unpublished)</option>
                  <option value="scheduled">Scheduled for Future</option>
                </select>
              </div>

              {/* Scheduled Date picker */}
              {status === 'scheduled' && (
                <div className="pt-2 animate-fadeIn">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Schedule Publication Date
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledPublishDate}
                    onChange={(e) => setScheduledPublishDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              )}

              {/* Is Featured Toggle */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Featured Article</p>
                  <p className="text-[11px] text-slate-400">Highlight in homepage hero slot</p>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Taxonomy & Metadata */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Taxonomy & Author
              </h3>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select a Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Author *
                </label>
                <select
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select an Author</option>
                  {authors.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name} ({a.title})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Node.js, TypeScript, Cloud"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Featured Cover Image
              </h3>

              {featuredImage && (
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-brand-500 hover:bg-brand-50/50 cursor-pointer text-xs font-semibold text-slate-700 transition">
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

