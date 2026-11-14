/**
 * Dynamic API Base URL resolution:
 * 1. User-configured custom URL in localStorage (useful for instant connecting on Vercel without rebuilding)
 * 2. Vite environment variable VITE_API_BASE_URL (configured in Vercel project settings)
 * 3. Fallback to '/api' (proxied by Vite in local development)
 */
export function getApiBaseUrl() {
  const custom = typeof window !== 'undefined' ? localStorage.getItem('custom_api_base_url') : null;
  if (custom && custom.trim()) {
    const trimmed = custom.trim();
    return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
  }

  // In local development under Vite dev server, /api can be proxied.
  // In production (Vercel), default directly to live Render backend.
  const defaultUrl = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? '/api'
    : 'https://softrate-project-1.onrender.com/api';

  const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || defaultUrl;
  return rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
}

export function setCustomApiBaseUrl(url) {
  if (typeof window === 'undefined') return;
  if (url && url.trim()) {
    let clean = url.trim();
    if (clean.endsWith('/')) clean = clean.slice(0, -1);
    if (!clean.endsWith('/api') && !clean.includes('/api/')) {
      clean = `${clean}/api`;
    }
    localStorage.setItem('custom_api_base_url', clean);
  } else {
    localStorage.removeItem('custom_api_base_url');
  }
}

/**
 * Common fetch wrapper with JSON serialization and token injection
 */
async function request(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('techpulse_token') : null;

  const headers = {
    ...options.headers,
  };

  // If not FormData, default to application/json
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 405) {
        const errorMsg =
          'Error 405: The request was sent to Vercel static files instead of the Render backend. Please set your Render Backend URL in Vercel (VITE_API_BASE_URL) or in the Backend Settings box below.';
        const err = new Error(errorMsg);
        err.status = 405;
        throw err;
      }

      const errorMsg = data?.message || `HTTP error ${res.status}: ${res.statusText}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    console.error(`[API Request Error] ${options.method || 'GET'} ${url}:`, error.message);
    throw error;
  }
}

// ----------------- POSTS SERVICE -----------------
export const postService = {
  getPosts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.tag) query.append('tag', params.tag);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    return request(`/posts?${query.toString()}`);
  },

  getFeaturedPosts: () => request('/posts/featured'),

  getTrendingPosts: (limit = 5) => request(`/posts/trending?limit=${limit}`),

  getPostBySlug: (slug) => request(`/posts/${slug}`),

  // Admin APIs
  getAdminPosts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    return request(`/posts/admin/all?${query.toString()}`);
  },

  getAdminStats: () => request('/posts/admin/stats'),

  getPostById: (id) => request(`/posts/admin/${id}`),

  createPost: (postData) =>
    request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    }),

  updatePost: (id, postData) =>
    request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    }),

  deletePost: (id) =>
    request(`/posts/${id}`, {
      method: 'DELETE',
    }),
};

// ----------------- CATEGORIES SERVICE -----------------
export const categoryService = {
  getCategories: () => request('/categories'),

  getCategoryBySlug: (slug) => request(`/categories/slug/${slug}`),

  createCategory: (data) =>
    request('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCategory: (id, data) =>
    request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCategory: (id) =>
    request(`/categories/${id}`, {
      method: 'DELETE',
    }),
};

// ----------------- AUTHORS SERVICE -----------------
export const authorService = {
  getAuthors: () => request('/authors'),

  getAuthorById: (id) => request(`/authors/${id}`),

  createAuthor: (data) =>
    request('/authors', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateAuthor: (id, data) =>
    request(`/authors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteAuthor: (id) =>
    request(`/authors/${id}`, {
      method: 'DELETE',
    }),
};

// ----------------- AUTH SERVICE -----------------
export const authService = {
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getMe: () => request('/auth/me'),
};

// ----------------- MEDIA UPLOAD SERVICE -----------------
export const uploadService = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return request('/upload', {
      method: 'POST',
      body: formData,
    });
  },
};

