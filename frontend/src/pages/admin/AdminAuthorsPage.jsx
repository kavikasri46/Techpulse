import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Mail, Twitter, Linkedin, Github, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authorService } from '../../services/api';
import SeoHead from '../../components/common/SeoHead';

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal form state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const res = await authorService.getAuthors();
      if (res?.success) {
        setAuthors(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setTitle('Technical Writer & Software Engineer');
    setBio('');
    setAvatar('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80');
    setEmail('');
    setTwitter('');
    setLinkedin('');
    setGithub('');
    setError('');
    setShowModal(true);
  };

  const openEditModal = (a) => {
    setEditingId(a._id);
    setName(a.name);
    setTitle(a.title || '');
    setBio(a.bio || '');
    setAvatar(a.avatar || '');
    setEmail(a.email || '');
    setTwitter(a.socialLinks?.twitter || '');
    setLinkedin(a.socialLinks?.linkedin || '');
    setGithub(a.socialLinks?.github || '');
    setError('');
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    const authorPayload = {
      name,
      title,
      bio,
      avatar,
      email,
      socialLinks: { twitter, linkedin, github }
    };

    try {
      if (editingId) {
        await authorService.updateAuthor(editingId, authorPayload);
        setMessage('Author profile updated');
      } else {
        await authorService.createAuthor(authorPayload);
        setMessage('Author added successfully');
      }
      setShowModal(false);
      loadAuthors();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this author profile?')) return;
    try {
      await authorService.deleteAuthor(id);
      loadAuthors();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <SeoHead title="Manage Authors - Admin" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Author & Contributor Profiles
          </h1>
          <p className="text-xs text-slate-500">
            Manage author bios, job titles, avatars, and social presence.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Author</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div
            key={author._id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{author.name}</h3>
                  <p className="text-xs text-slate-500">{author.title}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {author.bio || 'No biography written yet.'}
              </p>

              <div className="flex items-center gap-3 text-slate-400 text-xs pt-2">
                {author.email && (
                  <span className="flex items-center gap-1" title={author.email}>
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                )}
                {author.socialLinks?.twitter && (
                  <span className="flex items-center gap-1">
                    <Twitter className="w-3.5 h-3.5" />
                  </span>
                )}
                {author.socialLinks?.linkedin && (
                  <span className="flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5" />
                  </span>
                )}
                {author.socialLinks?.github && (
                  <span className="flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(author)}
                className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(author._id)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingId ? 'Edit Author Profile' : 'Add New Author'}
            </h3>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kavin Raj"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Principal Cloud Architect"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@techpulse.io"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Author Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief background and engineering focus..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase mb-2">Social Links</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="Twitter URL"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="LinkedIn URL"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="GitHub URL"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Author'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

