const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');

/**
 * @desc    Upload an image for article or author
 * @route   POST /api/upload
 * @access  Private/Admin
 */
router.post('/', protect, authorize('admin'), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
  }

  // Generate public URL path
  const host = req.get('host');
  const protocol = req.protocol;
  const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

  return res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    url: imageUrl,
    filename: req.file.filename
  });
});

module.exports = router;

