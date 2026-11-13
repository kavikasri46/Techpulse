const mongoose = require('mongoose');
const { createSlug } = require('../utils/slugify');
const { calculateReadingTime } = require('../utils/readingTime');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description / excerpt is required'],
      trim: true,
      maxlength: [400, 'Description cannot exceed 400 characters']
    },
    content: {
      type: String,
      required: [true, 'Article content is required']
    },
    featuredImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please specify an article category']
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Please specify an author']
    },
    readingTime: {
      type: String,
      default: '3 min read'
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'published'
    },
    scheduledPublishDate: {
      type: Date
    },
    publishedAt: {
      type: Date,
      default: Date.now
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    },
    // SEO fields
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [100, 'SEO title cannot exceed 100 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [250, 'Meta description cannot exceed 250 characters']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Auto slug generation and reading time calculation before validation
postSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = createSlug(this.title);
  }
  if (!this.seoTitle && this.title) {
    this.seoTitle = this.title;
  }
  if (!this.metaDescription && this.shortDescription) {
    this.metaDescription = this.shortDescription;
  }
  if (this.content) {
    this.readingTime = calculateReadingTime(this.content);
  }
  next();
});

// Text index for search functionality across title, shortDescription, content, tags
postSchema.index({
  title: 'text',
  shortDescription: 'text',
  content: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Post', postSchema);

