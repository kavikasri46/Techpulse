import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Shield, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TechPulseLogo from '../common/TechPulseLogo';

export default function Header({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  // Navigation items matching official menu + Blog topics
  const navLinks = [
    { name: 'Blog', path: '/blog' },
    { name: 'Software Engineering', path: '/blog?category=software-development' },
    { name: 'Cloud Fleet', path: '/blog?category=cloud-computing' },
    { name: 'Cybersecurity', path: '/blog?category=cybersecurity' },
    { name: 'Innovation', path: '/blog?category=technology-innovation' },
  ];

  // Precise active link detection so clicked link immediately changes color
  const isLinkActive = (path) => {
    if (path === '/') {
      return currentPath === '/';
    }
    if (path === '/blog') {
      // Active if browsing the main blog catalog or on an article detail page without query
      return (currentPath === '/blog' && !currentCategory) || currentPath.startsWith('/blog/');
    }
    if (path.includes('?category=')) {
      const cat = path.split('?category=')[1];
      return currentPath === '/blog' && currentCategory === cat;
    }
    return currentPath === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-2xs font-sans w-full">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3">
            <TechPulseLogo />
          </Link>

          {/* Desktop Nav Links with prominent color change on click */}
          <nav className="hidden xl:flex items-center gap-2 h-full">
            <Link
              to="/"
              className={`px-3.5 py-2 text-[14px] transition-all rounded-md flex items-center relative ${
                isLinkActive('/')
                  ? 'text-[#E42528] font-extrabold bg-red-50 border border-red-200/70 shadow-2xs'
                  : 'text-[#222222] font-semibold hover:text-[#E42528] hover:bg-slate-50'
              }`}
            >
              Home
              {isLinkActive('/') && (
                <span className="absolute -bottom-1 left-3 right-3 h-[3px] bg-[#E42528] rounded-full" />
              )}
            </Link>

            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 text-[14px] transition-all rounded-md flex items-center relative ${
                    active
                      ? 'text-[#E42528] font-extrabold bg-red-50 border border-red-200/70 shadow-2xs'
                      : 'text-[#222222] font-semibold hover:text-[#E42528] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1 left-3 right-3 h-[3px] bg-[#E42528] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-[#E42528] rounded-full hover:bg-slate-100 transition"
              title="Search TechPulse Blog (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language / Region Selector */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-700 font-medium">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>English</span>
            </div>

            {/* Admin CMS or Sign In Link */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F65AF] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition"
                >
                  <Shield className="w-3.5 h-3.5" />
                  CMS Studio
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-slate-500 hover:text-[#E42528] px-1.5 py-1 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#E42528] transition"
              >
                Sign In
              </Link>
            )}

            {/* Red Sign Up Button pointing to internal signup */}
            <Link
              to="/admin/signup"
              className="inline-flex items-center px-4 py-2 rounded-md border-2 border-[#E42528] text-[#E42528] hover:bg-[#E42528] hover:text-white text-xs font-bold uppercase tracking-wider transition"
            >
              Sign Up
            </Link>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm transition-all ${
              isLinkActive('/')
                ? 'bg-red-50 text-[#E42528] font-bold border-l-4 border-[#E42528]'
                : 'text-slate-800 font-medium hover:bg-slate-50 hover:text-[#E42528]'
            }`}
          >
            Home
          </Link>

          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm transition-all ${
                  active
                    ? 'bg-red-50 text-[#E42528] font-bold border-l-4 border-[#E42528]'
                    : 'text-slate-800 font-medium hover:bg-slate-50 hover:text-[#E42528]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#0F65AF] text-white font-bold text-sm"
                >
                  <Shield className="w-4 h-4" /> Go to TechPulse CMS
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm text-[#E42528] hover:bg-red-50 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md border border-slate-300 text-slate-800 font-semibold text-xs hover:bg-slate-50 transition"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" /> Sign In
                </Link>
                <Link
                  to="/admin/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center py-2.5 rounded-md bg-[#E42528] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#C71B1E] transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
