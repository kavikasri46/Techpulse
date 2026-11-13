const express = require('express');
const router = express.Router();
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getAuthors)
  .post(protect, authorize('admin'), createAuthor);

router.route('/:id')
  .get(getAuthorById)
  .put(protect, authorize('admin'), updateAuthor)
  .delete(protect, authorize('admin'), deleteAuthor);

module.exports = router;

