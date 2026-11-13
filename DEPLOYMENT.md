# 🚀 Production Deployment Guide: Vercel (Frontend) & Render (Backend)

This repository is pre-configured for instant zero-hassle cloud deployment with **Vercel** for the React frontend and **Render** for the Node/Express backend.

---

## 🛠️ Step 1: Deploy Backend to Render

1. Sign in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub / GitLab repository containing this project.
4. Configure the service settings:
   - **Name**: `zoho-blog-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `<Your MongoDB Atlas connection string>` (e.g. `mongodb+srv://...`)
   - `JWT_SECRET` = `zoho_production_jwt_super_secret_key_2026`
   - `JWT_EXPIRES_IN` = `7d`
   - `CLIENT_URL` = `https://your-frontend-project.vercel.app` (you can update this after Vercel deploys)
6. Click **Create Web Service**.
7. Once deployed, copy your Render service URL (e.g., `https://zoho-blog-backend.onrender.com`).
8. Optional: Run seed script once on Render using the **Manual Deploy > Run Command** or Shell tab:
   ```bash
   node seed.js
   ```

---

## ⚡ Step 2: Deploy Frontend to Vercel

1. Sign in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** > **Project** and import your Git repository.
3. Configure the Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and choose `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://zoho-blog-backend.onrender.com/api` *(replace with your Render URL from Step 1)*
5. Click **Deploy**.
6. Vercel will automatically build the React application and provide you with a live URL (e.g. `https://zoho-blog.vercel.app`).
7. Thanks to [`frontend/vercel.json`](./frontend/vercel.json), all single-page client-side routes (`/blog`, `/blog/:slug`, `/admin`, etc.) work without 404 errors on browser refresh.

---

## 🔐 Admin CMS Access in Production

- **URL**: `https://your-frontend.vercel.app/admin/login`
- **Default Email**: `admin@techpulse.io`
- **Default Password**: `Admin@123`
*(Or click the 1-click **Auto Fill** button on the login screen).*

