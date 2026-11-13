const mongoose = require('mongoose');
const Post = require('../models/Post');
const Category = require('../models/Category');
const localStore = require('../data/localStore');

/**
 * @desc    Generate dynamic XML sitemap
 * @route   GET /sitemap.xml
 * @access  Public
 */
const getSitemap = async (req, res, next) => {
  try {
    const siteUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    let posts = [];
    let categories = [];

    if (mongoose.connection.readyState === 1) {
      posts = await Post.find({ status: 'published' }).select('slug updatedAt publishedAt').lean();
      categories = await Category.find().select('slug updatedAt').lean();
    } else {
      posts = localStore.posts.filter(p => p.status === 'published');
      categories = localStore.categories;
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    xml += `  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${siteUrl}/blog</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

    // Category pages
    categories.forEach(cat => {
      xml += `  <url>\n    <loc>${siteUrl}/blog?category=${cat.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Individual post pages
    posts.forEach(post => {
      const lastModDate = post.updatedAt || post.publishedAt || new Date().toISOString();
      const formattedDate = new Date(lastModDate).toISOString().split('T')[0];
      xml += `  <url>\n    <loc>${siteUrl}/blog/${post.slug}</loc>\n    <lastmod>${formattedDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    return res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate robots.txt
 * @route   GET /robots.txt
 * @access  Public
 */
const getRobots = (req, res) => {
  const siteUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const serverUrl = process.env.SITE_URL || 'http://localhost:5000';

  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${serverUrl}/sitemap.xml
`;

  res.header('Content-Type', 'text/plain');
  return res.status(200).send(robots);
};

module.exports = { getSitemap, getRobots };

