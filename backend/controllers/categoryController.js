const mongoose = require('mongoose');
const Category = require('../models/Category');
const Post = require('../models/Post');
const localStore = require('../data/localStore');
const { createSlug } = require('../utils/slugify');

/**
 * @desc    Get all categories with published post count
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find().sort({ name: 1 }).lean();

      // Aggregate counts for published posts
      const counts = await Post.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);

      const countMap = counts.reduce((acc, curr) => {
        acc[curr._id.toString()] = curr.count;
        return acc;
      }, {});

      const categoriesWithCount = categories.map(cat => ({
        ...cat,
        postCount: countMap[cat._id.toString()] || 0
      }));

      return res.status(200).json({ success: true, count: categoriesWithCount.length, data: categoriesWithCount });
    } else {
      const categories = localStore.getCategories();
      return res.status(200).json({ success: true, count: categories.length, data: categories });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single category by slug
 * @route   GET /api/categories/:slug
 * @access  Public
 */
const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState === 1) {
      const category = await Category.findOne({ slug });
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, data: category });
    } else {
      const category = localStore.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, data: category });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
const createCategory = async (req, res, next) => {
  try {
    const { name, description, color } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    if (mongoose.connection.readyState === 1) {
      const slug = createSlug(name);
      const category = await Category.create({ name, slug, description, color });
      return res.status(201).json({ success: true, data: category });
    } else {
      const category = localStore.createCategory({ name, description, color });
      return res.status(201).json({ success: true, data: category });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, color } = req.body;

    if (mongoose.connection.readyState === 1) {
      const updateData = { name, description, color };
      if (name) {
        updateData.slug = createSlug(name);
      }
      const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, data: category });
    } else {
      const category = localStore.updateCategory(id, { name, description, color });
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, data: category });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } else {
      const success = localStore.deleteCategory(id);
      if (!success) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};

