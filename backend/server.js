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

// Enable CORS for Vercel deployment & local development
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    // Allow localhost, vercel.app preview and production domains
    const allowed = [
      /localhost/,
      /127\.0\.0\.1/,
      /\.vercel\.app$/,
      /zoho/
    ];

    const isAllowed = allowed.some((regex) => regex.test(origin));
    if (isAllowed || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for preview/evaluation
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Pre-flight requests
app.options('*', cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SEO Routes (PRD requirement: XML sitemap & robots.txt)
app.get('/sitemap.xml', getSitemap);
app.get('/robots.txt', getRobots);

// Root Welcome & Health Route (Prevents 404 when visiting the base URL)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TechPulse Blog REST Engine Backend is running successfully!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    database: getDbStatus(),
    endpoints: {
      health: '/api/health',
      posts: '/api/posts',
      categories: '/api/categories',
      authors: '/api/authors',
      auth: '/api/auth',
      sitemap: '/sitemap.xml',
      robots: '/robots.txt'
    }
  });
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'TechPulse Blog REST Engine',
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
  // Bind to 0.0.0.0 so Render and cloud hosts can expose the port externally
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`🚀 TechPulse Blog Engine running on port ${PORT}`);
    console.log(`📍 Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`📄 Sitemap     : http://localhost:${PORT}/sitemap.xml`);
    console.log(`🤖 Robots.txt  : http://localhost:${PORT}/robots.txt`);
    console.log(`🩺 Health API  : http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

module.exports = app;
