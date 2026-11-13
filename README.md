# TechPulse - Full Stack Technology Blog Website (MERN Stack)

A production-grade, content-focused technology blog platform inspired by the **Zoho Blog** corporate aesthetic. Built according to the **Project Requirement Document** using modern full-stack web standards: **MongoDB, Express.js, React (Vite), and Node.js**.

---

## 📑 Project Structure

```
project requirement/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection & status diagnostic
│   ├── controllers/
│   │   ├── authController.js     # Admin authentication & token verification
│   │   ├── postController.js     # Blog CRUD, pagination, search & filters
│   │   ├── categoryController.js # Taxonomy management & post counts
│   │   ├── authorController.js   # Author bios, titles & social profiles
│   │   └── seoController.js      # Dynamic XML Sitemap & robots.txt
│   ├── data/
│   │   ├── initialData.js        # Seed dataset (7 categories, 8 articles)
│   │   ├── localStore.js         # Zero-config persistence fallback
│   │   └── store.json            # Persistent JSON database fallback
│   ├── middleware/
│   │   ├── auth.js               # JWT bearer token verification
│   │   ├── upload.js             # Multer image upload handler (5MB limit)
│   │   └── errorHandler.js       # Centralized HTTP error handler
│   ├── models/
│   │   ├── User.js               # Admin schema with bcrypt password hashing
│   │   ├── Post.js               # Article schema with text indexing & SEO
│   │   ├── Category.js           # Category schema with auto-slug
│   │   └── Author.js             # Author profile schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── postRoutes.js         # /api/posts
│   │   ├── categoryRoutes.js     # /api/categories
│   │   ├── authorRoutes.js       # /api/authors
│   │   └── uploadRoutes.js       # /api/upload
│   ├── uploads/                  # Uploaded featured & inline images
│   ├── seed.js                   # Database initialization script
│   ├── server.js                 # Express server entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg           # TechPulse icon
│   │   └── robots.txt            # Search crawler directives
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/            # Admin layout, headers & navigation
│   │   │   ├── blog/             # Cards, featured hero, TOC, social share
│   │   │   ├── common/           # Pagination, search modal, SEO head, pills
│   │   │   └── layout/           # Main corporate header, footer & layout
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication state & JWT storage
│   │   ├── pages/
│   │   │   ├── HomePage.jsx             # Hero, category pills, latest & trending
│   │   │   ├── BlogListingPage.jsx      # Search, category filter & pagination
│   │   │   ├── BlogDetailPage.jsx       # 2-col layout, TOC, code blocks, related
│   │   │   ├── NotFoundPage.jsx         # 404 handler
│   │   │   └── admin/
│   │   │       ├── AdminLoginPage.jsx       # Secure sign-in with 1-click autofill
│   │   │       ├── AdminDashboardPage.jsx   # Metrics, post table & filters
│   │   │       ├── AdminPostEditorPage.jsx  # Rich authoring, SEO & scheduling
│   │   │       ├── AdminCategoriesPage.jsx  # Category CRUD & colors
│   │   │       └── AdminAuthorsPage.jsx     # Author profiles & social links
│   │   ├── services/
│   │   │   └── api.js            # Modular API service with fetch wrapper
│   │   ├── App.jsx               # React Router DOM route hierarchy
│   │   ├── main.jsx              # React 18 root mounting
│   │   └── index.css             # Tailwind CSS & Zoho Blog corporate typography
│   ├── index.html                # SEO meta, Google Analytics & fonts
│   ├── vite.config.js            # Vite build & API proxy configuration
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20+)
- **npm** or **yarn**
- *(Optional)* **MongoDB** running locally or a MongoDB Atlas URI (if MongoDB is not installed, the server automatically uses an embedded JSON store so the entire website runs right out of the box).

---

### 2. Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Seed database with initial articles, categories, and admin credentials
npm run seed

# 3. Start the Express API server
npm run dev
# Or production mode:
npm start
```

Backend will be running at **`http://localhost:5000`**:
- Dynamic XML Sitemap: `http://localhost:5000/sitemap.xml`
- Robots Directive: `http://localhost:5000/robots.txt`
- Healthcheck Endpoint: `http://localhost:5000/api/health`

---

### 3. Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 🔐 Admin CMS Credentials

An administrator account is pre-configured during seeding:
- **Login URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@techpulse.io`
- **Password:** `Admin@123`
*(A convenient "Auto Fill" button is also provided on the sign-in screen for rapid evaluation).*

---

## 🌟 Feature Checklist (PRD Compliance)

### 1. Homepage (`/`)
- [x] Header with company logo, navigation links, global search toggle (`⌘K` / `Ctrl+K`), and CMS portal link.
- [x] Featured / highlighted articles hero section.
- [x] Category-based article navigation pills with active counters.
- [x] Popular & trending articles sidebar section sorted by view counts.
- [x] Latest blog posts grid with thumbnails, titles, short descriptions, author details, and published dates.
- [x] Corporate footer with categories, company info, sitemap links, and social links.

### 2. Blog Listing Page (`/blog`)
- [x] Separate listing view with full catalog of published articles.
- [x] Category filtering with active pills and dropdown options.
- [x] Real-time keyword search across titles, descriptions, tags, and content.
- [x] Sorting by Latest, Most Popular (views), and Oldest.
- [x] Numbered pagination controls.

### 3. Blog Detail Page (`/blog/:slug`)
- [x] SEO-friendly slug-based URLs (`/blog/clean-architecture-in-modern-nodejs-and-typescript-applications`).
- [x] Article title, high-resolution featured image, author avatar and name, publication date, and view counter.
- [x] Estimated reading time badge (auto-calculated from word count).
- [x] Complete rich content support for headings, paragraphs, styled tables, blockquotes, and code snippets with a 1-click **Copy to Clipboard** button.
- [x] Sticky, auto-generated **Table of Contents** with intersection observer scroll tracking.
- [x] Social media sharing buttons (Twitter/X, LinkedIn, Facebook, and Copy Link).
- [x] Author biography box with social profile links.
- [x] Previous and Next article navigation cards.
- [x] Related articles grid from the same topic domain.

### 4. Content Management System (`/admin`)
- [x] Creating, editing, and deleting blog posts.
- [x] Saving articles as **drafts**, **publishing** them, or **scheduling** for future release dates.
- [x] Uploading featured images via Multer (`/api/upload`) or setting external URLs.
- [x] Creating and managing all 7 initial categories with custom accent color pickers.
- [x] Creating and managing author profiles (bios, titles, avatars, social links).
- [x] Custom SEO title, meta description, and URL slug customization.
- [x] Quick 1-click toggle for Featured articles.
- [x] Metrics dashboard tracking total articles, published counts, drafts, scheduled posts, and total view counts.

### 5. Configured Initial Categories
1. **Software Development**
2. **Artificial Intelligence & Machine Learning**
3. **Web and Mobile App Development**
4. **Technology & Innovation**
5. **Cybersecurity**
6. **Cloud Computing**
7. **Industry Insights**

### 6. Design & SEO Requirements
- [x] Clean corporate aesthetic inspired by Zoho Blog.
- [x] Fully responsive layout across desktop, tablet, and mobile devices.
- [x] Dynamic XML Sitemap at `/sitemap.xml`.
- [x] Search engine crawler `robots.txt` at `/robots.txt`.
- [x] Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) and Twitter Card metadata.
- [x] `schema.org/BlogPosting` and `schema.org/WebSite` JSON-LD structured data.
- [x] Google Analytics / Search Console integration hooks.
- [x] Secured admin authentication via JWT and bcrypt password hashing.

#   s o f t r a t e - p r o j e c t  
 