const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB, getDbStatus } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { getSitemap, getRobots } = require('./controllers/seoController');

// Load environment configuration
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security and utility middleware
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: true, // allow any origin in dev, or specify clientUrl
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SEO Routes (PRD requirement: XML sitemap & robots.txt)
app.get('/sitemap.xml', getSitemap);
app.get('/robots.txt', getRobots);

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: getDbStatus()
  });
});

// Mount Resource API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/authors', require('./routes/authorRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 TechPulse Blog Backend running on port ${PORT}`);
    console.log(`📍 Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`📄 Sitemap     : http://localhost:${PORT}/sitemap.xml`);
    console.log(`🤖 Robots.txt  : http://localhost:${PORT}/robots.txt`);
    console.log(`🩺 Health API  : http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

module.exports = app;
