const mongoose = require('mongoose');
const Author = require('../models/Author');
const localStore = require('../data/localStore');

/**
 * @desc    Get all authors
 * @route   GET /api/authors
 * @access  Public
 */
const getAuthors = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const authors = await Author.find().sort({ name: 1 });
      return res.status(200).json({ success: true, count: authors.length, data: authors });
    } else {
      const authors = localStore.getAuthors();
      return res.status(200).json({ success: true, count: authors.length, data: authors });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get author by ID
 * @route   GET /api/authors/:id
 * @access  Public
 */
const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const author = await Author.findById(id);
      if (!author) {
        return res.status(404).json({ success: false, message: 'Author not found' });
      }
      return res.status(200).json({ success: true, data: author });
    } else {
      const author = localStore.getAuthorById(id);
      if (!author) {
        return res.status(404).json({ success: false, message: 'Author not found' });
      }
      return res.status(200).json({ success: true, data: author });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new author
 * @route   POST /api/authors
 * @access  Private/Admin
 */
const createAuthor = async (req, res, next) => {
  try {
    const { name, title, bio, avatar, email, socialLinks } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Author name is required' });
    }

    if (mongoose.connection.readyState === 1) {
      const author = await Author.create({ name, title, bio, avatar, email, socialLinks });
      return res.status(201).json({ success: true, data: author });
    } else {
      const author = localStore.createAuthor({ name, title, bio, avatar, email, socialLinks });
      return res.status(201).json({ success: true, data: author });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update author
 * @route   PUT /api/authors/:id
 * @access  Private/Admin
 */
const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const author = await Author.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!author) {
        return res.status(404).json({ success: false, message: 'Author not found' });
      }
      return res.status(200).json({ success: true, data: author });
    } else {
      const author = localStore.updateAuthor(id, req.body);
      if (!author) {
        return res.status(404).json({ success: false, message: 'Author not found' });
      }
      return res.status(200).json({ success: true, data: author });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete author
 * @route   DELETE /api/authors/:id
 * @access  Private/Admin
 */
const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const author = await Author.findByIdAndDelete(id);
      if (!author) {
        return res.status(404).json({ success: false, message: 'Author not found' });
      }
      return res.status(200).json({ success: true, message: 'Author deleted successfully' });
    } else {
      const success = localStore.deleteAuthor(id);
      if (!success) {
        return res.status(404).json({ success: false, message: 'Author not found' });
      }
      return res.status(200).json({ success: true, message: 'Author deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};

