import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Layout & Pages
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BlogListingPage from './pages/BlogListingPage';
import BlogDetailPage from './pages/BlogDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Layout & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPostEditorPage from './pages/admin/AdminPostEditorPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminAuthorsPage from './pages/admin/AdminAuthorsPage';

// Protected Route Guard for Admin
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-sm">
        Verifying staff credentials...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Site Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogListingPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Auth Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/signup" element={<AdminRegisterPage />} />
      <Route path="/signup" element={<AdminRegisterPage />} />
      <Route path="/register" element={<AdminRegisterPage />} />

      {/* Protected Admin CMS Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="posts/new" element={<AdminPostEditorPage />} />
        <Route path="posts/edit/:id" element={<AdminPostEditorPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="authors" element={<AdminAuthorsPage />} />
      </Route>
    </Routes>
  );
}

