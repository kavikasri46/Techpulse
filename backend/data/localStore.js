const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { initialCategories, initialAuthors, initialPosts } = require('./initialData');
const { createSlug } = require('../utils/slugify');
const { calculateReadingTime } = require('../utils/readingTime');

const DB_FILE = path.join(__dirname, 'store.json');

class LocalStore {
  constructor() {
    this.categories = [];
    this.authors = [];
    this.posts = [];
    this.users = [];
    this.init();
  }

  init() {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.categories = parsed.categories || [];
        this.authors = parsed.authors || [];
        this.posts = parsed.posts || [];
        this.users = parsed.users || [];
        console.log('[LocalStore] Loaded persistent data from store.json');
        return;
      } catch (e) {
        console.warn('[LocalStore] Failed to read store.json, re-initializing defaults.');
      }
    }

    this.resetDefaults();
  }

  resetDefaults() {
    this.categories = JSON.parse(JSON.stringify(initialCategories));
    this.authors = JSON.parse(JSON.stringify(initialAuthors));
    this.posts = JSON.parse(JSON.stringify(initialPosts));
    
    // Default admin user: admin@techpulse.io / Admin@123
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('Admin@123', salt);

    this.users = [
      {
        _id: 'user_admin',
        name: 'Editorial Director',
        email: 'admin@techpulse.io',
        password: hashedPassword,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString()
      }
    ];

    this.save();
    console.log('[LocalStore] Initialized default categories, authors, posts, and admin account.');
  }

  save() {
    try {
      const data = {
        categories: this.categories,
        authors: this.authors,
        posts: this.posts,
        users: this.users
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('[LocalStore] Error saving store.json:', e.message);
    }
  }

  // Categories
  getCategories() {
    return this.categories.map(cat => {
      const count = this.posts.filter(p => p.category === cat._id && p.status === 'published').length;
      return { ...cat, postCount: count };
    });
  }

  getCategoryBySlug(slug) {
    return this.categories.find(c => c.slug === slug);
  }

  createCategory(data) {
    const newCat = {
      _id: 'cat_' + Date.now(),
      name: data.name,
      slug: data.slug || createSlug(data.name),
      description: data.description || '',
      color: data.color || '#2563eb',
      createdAt: new Date().toISOString()
    };
    this.categories.push(newCat);
    this.save();
    return newCat;
  }

  updateCategory(id, data) {
    const idx = this.categories.findIndex(c => c._id === id);
    if (idx === -1) return null;
    this.categories[idx] = {
      ...this.categories[idx],
      ...data,
      slug: data.slug || (data.name ? createSlug(data.name) : this.categories[idx].slug),
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.categories[idx];
  }

  deleteCategory(id) {
    const idx = this.categories.findIndex(c => c._id === id);
    if (idx === -1) return false;
    this.categories.splice(idx, 1);
    this.save();
    return true;
  }

  // Authors
  getAuthors() {
    return this.authors;
  }

  getAuthorById(id) {
    return this.authors.find(a => a._id === id);
  }

  createAuthor(data) {
    const newAuthor = {
      _id: 'auth_' + Date.now(),
      name: data.name,
      title: data.title || 'Technical Writer & Engineer',
      bio: data.bio || '',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      email: data.email || '',
      socialLinks: data.socialLinks || { twitter: '', linkedin: '', github: '' },
      createdAt: new Date().toISOString()
    };
    this.authors.push(newAuthor);
    this.save();
    return newAuthor;
  }

  updateAuthor(id, data) {
    const idx = this.authors.findIndex(a => a._id === id);
    if (idx === -1) return null;
    this.authors[idx] = { ...this.authors[idx], ...data, updatedAt: new Date().toISOString() };
    this.save();
    return this.authors[idx];
  }

  deleteAuthor(id) {
    const idx = this.authors.findIndex(a => a._id === id);
    if (idx === -1) return false;
    this.authors.splice(idx, 1);
    this.save();
    return true;
  }

  // Populate helper
  populatePost(post) {
    const categoryObj = this.categories.find(c => c._id === post.category) || {
      name: 'General',
      slug: 'general',
      color: '#2563eb'
    };
    const authorObj = this.authors.find(a => a._id === post.author) || {
      name: 'Editorial Team',
      title: 'TechPulse Contributor',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    return {
      ...post,
      category: categoryObj,
      author: authorObj
    };
  }

  // Posts
  getPosts({ category, tag, search, status = 'published', page = 1, limit = 9, featured, sortBy = 'latest' } = {}) {
    let list = this.posts.slice();

    if (status && status !== 'all') {
      list = list.filter(p => p.status === status);
    }

    if (featured !== undefined) {
      const isFeat = featured === 'true' || featured === true;
      list = list.filter(p => Boolean(p.isFeatured) === isFeat);
    }

    if (category) {
      const cat = this.categories.find(c => c.slug === category || c._id === category);
      if (cat) {
        list = list.filter(p => p.category === cat._id);
      }
    }

    if (tag) {
      const lowerTag = tag.toLowerCase();
      list = list.filter(p => Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase() === lowerTag));
    }

    if (search) {
      const query = search.toLowerCase();
      list = list.filter(p =>
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(query)) ||
        (p.content && p.content.toLowerCase().includes(query)) ||
        (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(query)))
      );
    }

    // Sort
    if (sortBy === 'popular' || sortBy === 'views') {
      list.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      list.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
    }

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit).map(p => this.populatePost(p));

    return {
      posts: paginated,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit) || 1
    };
  }

  getPostBySlug(slug) {
    const post = this.posts.find(p => p.slug === slug);
    if (!post) return null;

    // increment view count
    post.views = (post.views || 0) + 1;
    this.save();

    const populated = this.populatePost(post);

    // Get related posts in same category
    const related = this.posts
      .filter(p => p.status === 'published' && p.category === post.category && p._id !== post._id)
      .slice(0, 3)
      .map(p => this.populatePost(p));

    // Get previous and next post
    const publishedList = this.posts
      .filter(p => p.status === 'published')
      .sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));

    const currentIndex = publishedList.findIndex(p => p._id === post._id);
    const prevPost = currentIndex > 0 ? this.populatePost(publishedList[currentIndex - 1]) : null;
    const nextPost = currentIndex < publishedList.length - 1 ? this.populatePost(publishedList[currentIndex + 1]) : null;

    return {
      post: populated,
      related,
      navigation: {
        prev: prevPost ? { title: prevPost.title, slug: prevPost.slug } : null,
        next: nextPost ? { title: nextPost.title, slug: nextPost.slug } : null
      }
    };
  }

  getPostById(id) {
    const post = this.posts.find(p => p._id === id);
    if (!post) return null;
    return this.populatePost(post);
  }

  createPost(data) {
    const readingTime = calculateReadingTime(data.content || '');
    const slug = data.slug ? createSlug(data.slug) : createSlug(data.title);

    const newPost = {
      _id: 'post_' + Date.now(),
      title: data.title,
      slug,
      shortDescription: data.shortDescription,
      content: data.content,
      featuredImage: data.featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      category: data.category,
      author: data.author,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(t => t.trim()) : []),
      readingTime,
      status: data.status || 'published',
      scheduledPublishDate: data.scheduledPublishDate || null,
      publishedAt: data.status === 'published' ? new Date().toISOString() : null,
      isFeatured: Boolean(data.isFeatured),
      views: 0,
      seoTitle: data.seoTitle || data.title,
      metaDescription: data.metaDescription || data.shortDescription,
      createdAt: new Date().toISOString()
    };

    this.posts.unshift(newPost);
    this.save();
    return this.populatePost(newPost);
  }

  updatePost(id, data) {
    const idx = this.posts.findIndex(p => p._id === id);
    if (idx === -1) return null;

    const existing = this.posts[idx];
    const updated = {
      ...existing,
      ...data,
      slug: data.slug ? createSlug(data.slug) : (data.title ? createSlug(data.title) : existing.slug),
      readingTime: data.content ? calculateReadingTime(data.content) : existing.readingTime,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(t => t.trim()) : existing.tags),
      updatedAt: new Date().toISOString()
    };

    if (data.status === 'published' && existing.status !== 'published') {
      updated.publishedAt = new Date().toISOString();
    }

    this.posts[idx] = updated;
    this.save();
    return this.populatePost(updated);
  }

  deletePost(id) {
    const idx = this.posts.findIndex(p => p._id === id);
    if (idx === -1) return false;
    this.posts.splice(idx, 1);
    this.save();
    return true;
  }

  // Users
  getUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    const user = this.users.find(u => u._id === id);
    if (!user) return null;
    const { password, ...safe } = user;
    return safe;
  }
}

// Singleton instance
const localStore = new LocalStore();

module.exports = localStore;

