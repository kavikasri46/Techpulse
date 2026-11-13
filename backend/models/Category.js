const mongoose = require('mongoose');
const { createSlug } = require('../utils/slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [80, 'Category name cannot exceed 80 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    color: {
      type: String,
      default: '#2563eb' // default blue accent
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Auto-generate slug before validation if not provided
categorySchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = createSlug(this.name);
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);

