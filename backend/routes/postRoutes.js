const express = require('express');
const router = express.Router();
const {
  getPosts,
  getFeaturedPosts,
  getTrendingPosts,
  getPostBySlug,
  getAdminPosts,
  getAdminStats,
  createPost,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');

// Public post queries
router.get('/', getPosts);
router.get('/featured', getFeaturedPosts);
router.get('/trending', getTrendingPosts);

// Admin specific management endpoints (must be defined before /:slug)
router.get('/admin/stats', protect, authorize('admin'), getAdminStats);
router.get('/admin/all', protect, authorize('admin'), getAdminPosts);
router.get('/admin/:id', protect, authorize('admin'), getPostById);

// Public single post by slug
router.get('/:slug', getPostBySlug);

// Admin mutation endpoints
router.post('/', protect, authorize('admin'), createPost);
router.put('/:id', protect, authorize('admin'), updatePost);
router.delete('/:id', protect, authorize('admin'), deletePost);

module.exports = router;

