const mongoose = require('mongoose');
const Post = require('../models/Post');
const Category = require('../models/Category');
const Author = require('../models/Author');
const localStore = require('../data/localStore');
const { createSlug } = require('../utils/slugify');
const { calculateReadingTime } = require('../utils/readingTime');

/**
 * @desc    Get published blog posts with filtering, search & pagination
 * @route   GET /api/posts
 * @access  Public
 */
const getPosts = async (req, res, next) => {
  try {
    const { category, tag, search, page = 1, limit = 9, sortBy = 'latest', featured } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = { status: 'published' };

      // Category filter (support category slug or ObjectId)
      if (category) {
        let catDoc = null;
        if (mongoose.isValidObjectId(category)) {
          catDoc = await Category.findById(category);
        } else {
          catDoc = await Category.findOne({ slug: category });
        }
        if (catDoc) {
          query.category = catDoc._id;
        } else {
          // If category not found, return empty results
          return res.status(200).json({ success: true, count: 0, total: 0, page: Number(page), pages: 1, data: [] });
        }
      }

      // Tag filter
      if (tag) {
        query.tags = { $in: [new RegExp(`^${tag}$`, 'i')] };
      }

      // Featured filter
      if (featured !== undefined) {
        query.isFeatured = featured === 'true' || featured === true;
      }

      // Keyword search (title, shortDescription, content, tags)
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { shortDescription: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      // Sorting
      let sort = { publishedAt: -1, createdAt: -1 };
      if (sortBy === 'popular' || sortBy === 'views') {
        sort = { views: -1 };
      } else if (sortBy === 'oldest') {
        sort = { publishedAt: 1, createdAt: 1 };
      }

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, parseInt(limit, 10));
      const skip = (pageNum - 1) * limitNum;

      const total = await Post.countDocuments(query);
      const posts = await Post.find(query)
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar')
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean();

      return res.status(200).json({
        success: true,
        count: posts.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: posts
      });
    } else {
      // Local fallback
      const result = localStore.getPosts({
        category,
        tag,
        search,
        status: 'published',
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sortBy,
        featured
      });

      return res.status(200).json({
        success: true,
        count: result.posts.length,
        total: result.total,
        page: result.page,
        pages: result.pages,
        data: result.posts
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured articles for homepage
 * @route   GET /api/posts/featured
 * @access  Public
 */
const getFeaturedPosts = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const posts = await Post.find({ status: 'published', isFeatured: true })
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar')
        .sort({ publishedAt: -1 })
        .limit(3)
        .lean();

      return res.status(200).json({ success: true, count: posts.length, data: posts });
    } else {
      const result = localStore.getPosts({ status: 'published', featured: true, limit: 3 });
      return res.status(200).json({ success: true, count: result.posts.length, data: result.posts });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get trending/popular articles sorted by views
 * @route   GET /api/posts/trending
 * @access  Public
 */
const getTrendingPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;

    if (mongoose.connection.readyState === 1) {
      const posts = await Post.find({ status: 'published' })
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar')
        .sort({ views: -1 })
        .limit(limit)
        .lean();

      return res.status(200).json({ success: true, count: posts.length, data: posts });
    } else {
      const result = localStore.getPosts({ status: 'published', sortBy: 'popular', limit });
      return res.status(200).json({ success: true, count: result.posts.length, data: result.posts });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single post by slug, increment view, include related and prev/next navigation
 * @route   GET /api/posts/:slug
 * @access  Public
 */
const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState === 1) {
      const post = await Post.findOneAndUpdate(
        { slug, status: 'published' },
        { $inc: { views: 1 } },
        { new: true }
      )
        .populate('category', 'name slug description color')
        .populate('author', 'name title bio avatar socialLinks email');

      if (!post) {
        return res.status(404).json({ success: false, message: 'Article not found or not published' });
      }

      // Related posts in same category
      const related = await Post.find({
        status: 'published',
        category: post.category._id,
        _id: { $ne: post._id }
      })
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar')
        .limit(3)
        .lean();

      // Navigation: Previous & Next articles
      const prevPost = await Post.findOne({
        status: 'published',
        publishedAt: { $lt: post.publishedAt }
      })
        .sort({ publishedAt: -1 })
        .select('title slug')
        .lean();

      const nextPost = await Post.findOne({
        status: 'published',
        publishedAt: { $gt: post.publishedAt }
      })
        .sort({ publishedAt: 1 })
        .select('title slug')
        .lean();

      return res.status(200).json({
        success: true,
        data: post,
        related,
        navigation: {
          prev: prevPost || null,
          next: nextPost || null
        }
      });
    } else {
      const result = localStore.getPostBySlug(slug);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Article not found or not published' });
      }

      return res.status(200).json({
        success: true,
        data: result.post,
        related: result.related,
        navigation: result.navigation
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: Get all posts (drafts, scheduled, published)
 * @route   GET /api/posts/admin/all
 * @access  Private/Admin
 */
const getAdminPosts = async (req, res, next) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, parseInt(limit, 10));
      const skip = (pageNum - 1) * limitNum;

      const total = await Post.countDocuments(query);
      const posts = await Post.find(query)
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean();

      return res.status(200).json({
        success: true,
        count: posts.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: posts
      });
    } else {
      const result = localStore.getPosts({
        category: category !== 'all' ? category : undefined,
        search,
        status: status || 'all',
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sortBy: 'latest'
      });

      return res.status(200).json({
        success: true,
        count: result.posts.length,
        total: result.total,
        page: result.page,
        pages: result.pages,
        data: result.posts
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: Get stats summary
 * @route   GET /api/posts/admin/stats
 * @access  Private/Admin
 */
const getAdminStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const [totalPosts, publishedPosts, draftPosts, scheduledPosts, categoriesCount, authorsCount, viewsAgg] =
        await Promise.all([
          Post.countDocuments(),
          Post.countDocuments({ status: 'published' }),
          Post.countDocuments({ status: 'draft' }),
          Post.countDocuments({ status: 'scheduled' }),
          Category.countDocuments(),
          Author.countDocuments(),
          Post.aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }])
        ]);

      const totalViews = viewsAgg[0] ? viewsAgg[0].totalViews : 0;

      return res.status(200).json({
        success: true,
        data: {
          totalPosts,
          publishedPosts,
          draftPosts,
          scheduledPosts,
          categoriesCount,
          authorsCount,
          totalViews
        }
      });
    } else {
      const all = localStore.posts;
      const totalPosts = all.length;
      const publishedPosts = all.filter(p => p.status === 'published').length;
      const draftPosts = all.filter(p => p.status === 'draft').length;
      const scheduledPosts = all.filter(p => p.status === 'scheduled').length;
      const totalViews = all.reduce((acc, p) => acc + (p.views || 0), 0);

      return res.status(200).json({
        success: true,
        data: {
          totalPosts,
          publishedPosts,
          draftPosts,
          scheduledPosts,
          categoriesCount: localStore.categories.length,
          authorsCount: localStore.authors.length,
          totalViews
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: Create new blog post
 * @route   POST /api/posts
 * @access  Private/Admin
 */
const createPost = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      content,
      featuredImage,
      category,
      author,
      tags,
      status,
      scheduledPublishDate,
      isFeatured,
      seoTitle,
      metaDescription
    } = req.body;

    if (!title || !shortDescription || !content || !category || !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, short description, content, category, and author'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const postSlug = slug ? createSlug(slug) : createSlug(title);

      const post = await Post.create({
        title,
        slug: postSlug,
        shortDescription,
        content,
        featuredImage,
        category,
        author,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
        readingTime: calculateReadingTime(content),
        status: status || 'published',
        scheduledPublishDate: scheduledPublishDate || null,
        publishedAt: status === 'published' ? new Date() : null,
        isFeatured: Boolean(isFeatured),
        seoTitle: seoTitle || title,
        metaDescription: metaDescription || shortDescription
      });

      const populated = await Post.findById(post._id)
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar');

      return res.status(201).json({ success: true, data: populated });
    } else {
      const post = localStore.createPost({
        title,
        slug,
        shortDescription,
        content,
        featuredImage,
        category,
        author,
        tags,
        status,
        scheduledPublishDate,
        isFeatured,
        seoTitle,
        metaDescription
      });

      return res.status(201).json({ success: true, data: post });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: Get single post by ID (for editor)
 * @route   GET /api/posts/admin/:id
 * @access  Private/Admin
 */
const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const post = await Post.findById(id)
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar');

      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      return res.status(200).json({ success: true, data: post });
    } else {
      const post = localStore.getPostById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      return res.status(200).json({ success: true, data: post });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: Update blog post
 * @route   PUT /api/posts/:id
 * @access  Private/Admin
 */
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.title && !updateData.slug) {
      updateData.slug = createSlug(updateData.title);
    }
    if (updateData.content) {
      updateData.readingTime = calculateReadingTime(updateData.content);
    }

    if (mongoose.connection.readyState === 1) {
      const post = await Post.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        .populate('category', 'name slug color')
        .populate('author', 'name title avatar');

      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }

      return res.status(200).json({ success: true, data: post });
    } else {
      const post = localStore.updatePost(id, updateData);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      return res.status(200).json({ success: true, data: post });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: Delete blog post
 * @route   DELETE /api/posts/:id
 * @access  Private/Admin
 */
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } else {
      const success = localStore.deletePost(id);
      if (!success) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};

