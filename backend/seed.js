const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const User = require('./models/User');
const Category = require('./models/Category');
const Author = require('./models/Author');
const Post = require('./models/Post');
const localStore = require('./data/localStore');
const { initialCategories, initialAuthors, initialPosts } = require('./data/initialData');

const seedData = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techpulse_blog';

  try {
    console.log(`[Seed] Attempting MongoDB connection at ${uri}...`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed] Connected to MongoDB.');

    // Clear existing collections
    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Author.deleteMany(),
      Post.deleteMany()
    ]);
    console.log('[Seed] Cleared existing collections.');

    // 1. Create Admin User
    const adminUser = await User.create({
      name: 'Editorial Director',
      email: 'admin@techpulse.io',
      password: 'Admin@123', // Will be hashed by pre-save hook
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    });
    console.log(`[Seed] Created Admin User: ${adminUser.email}`);

    // 2. Create Categories
    const categoryDocs = [];
    for (const cat of initialCategories) {
      const created = await Category.create({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        color: cat.color
      });
      categoryDocs.push({ oldId: cat._id, doc: created });
    }
    console.log(`[Seed] Created ${categoryDocs.length} initial categories.`);

    // 3. Create Authors
    const authorDocs = [];
    for (const author of initialAuthors) {
      const created = await Author.create({
        name: author.name,
        title: author.title,
        bio: author.bio,
        avatar: author.avatar,
        email: author.email,
        socialLinks: author.socialLinks
      });
      authorDocs.push({ oldId: author._id, doc: created });
    }
    console.log(`[Seed] Created ${authorDocs.length} initial authors.`);

    // 4. Create Articles
    for (const post of initialPosts) {
      const mappedCategory = categoryDocs.find(c => c.oldId === post.category);
      const mappedAuthor = authorDocs.find(a => a.oldId === post.author);

      await Post.create({
        title: post.title,
        slug: post.slug,
        shortDescription: post.shortDescription,
        content: post.content,
        featuredImage: post.featuredImage,
        category: mappedCategory ? mappedCategory.doc._id : categoryDocs[0].doc._id,
        author: mappedAuthor ? mappedAuthor.doc._id : authorDocs[0].doc._id,
        tags: post.tags,
        readingTime: post.readingTime,
        status: post.status,
        isFeatured: post.isFeatured,
        views: post.views,
        publishedAt: post.publishedAt,
        seoTitle: post.seoTitle,
        metaDescription: post.metaDescription
      });
    }
    console.log(`[Seed] Created ${initialPosts.length} rich tech articles.`);

    console.log('\n===========================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('===========================================');
    console.log('Admin Credentials:');
    console.log('  Email    : admin@techpulse.io');
    console.log('  Password : Admin@123');
    console.log('===========================================\n');

    process.exit(0);
  } catch (error) {
    console.warn(`[Seed Warning] Could not connect to MongoDB: ${error.message}`);
    console.log('[Seed Info] Resetting localStore JSON fallback data instead...');
    localStore.resetDefaults();
    console.log('✅ Local store reset with all initial categories, authors, and articles!');
    process.exit(0);
  }
};

seedData();

