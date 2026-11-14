import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Shield, Bookmark, User, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TechPulseLogo from '../common/TechPulseLogo';

export default function Header({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  // Refined editorial navigation channels
  const navLinks = [
    { name: 'All Stories', path: '/blog' },
    { name: 'Architecture', path: '/blog?category=software-development' },
    { name: 'Cloud Fleet', path: '/blog?category=cloud-computing' },
    { name: 'Cybersecurity', path: '/blog?category=cybersecurity' },
    { name: 'AI Research', path: '/blog?category=artificial-intelligence-machine-learning' },
    { name: 'Innovation', path: '/blog?category=technology-innovation' },
  ];

  const isLinkActive = (path) => {
    if (path === '/') return currentPath === '/';
    if (path === '/blog') {
      return (currentPath === '/blog' && !currentCategory) || currentPath.startsWith('/blog/');
    }
    if (path.includes('?category=')) {
      const cat = path.split('?category=')[1];
      return currentPath === '/blog' && currentCategory === cat;
    }
    return currentPath === path;
  };

  return (
    <div className="w-full bg-[#FAF9F5] border-b border-[#EAE6DE] font-sans sticky top-0 z-40 transition-colors">
      {/* Top Editorial Dispatch Bar (AURA Style Announcement Bar) */}
      <div className="bg-[#F2EFE8] border-b border-[#E7E2D7] py-2 px-4 text-center">
        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-stone-600 flex items-center justify-center gap-2">
          <span>TechPulse Engineering Dispatch</span>
          <span className="text-stone-400">•</span>
          <span>Architectural Blueprints, Cloud Systems & AI Research</span>
        </p>
      </div>

      {/* Main Luxury Navbar */}
      <header className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Toggle & Desktop Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7">
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-[12.5px] tracking-[0.12em] uppercase font-medium transition-colors relative py-1 ${
                      active
                        ? 'text-stone-950 font-semibold'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#E42528]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <Link to="/" className="flex items-center justify-center py-2 group">
            <TechPulseLogo />
          </Link>

          {/* Right: Actions (Search, Saved, Account, CMS Studio) */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-700 hover:text-stone-950 rounded-full hover:bg-stone-200/50 transition"
              title="Search articles (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks Quick Link */}
            <Link
              to="/blog"
              className="hidden sm:flex p-2 text-stone-700 hover:text-stone-950 rounded-full hover:bg-stone-200/50 transition"
              title="Saved reading list"
            >
              <Bookmark className="w-4 h-4" />
            </Link>

            {/* Account / Admin CMS Studio */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300/80 rounded-full shadow-2xs transition"
                >
                  <Shield className="w-3.5 h-3.5 text-[#E42528]" />
                  <span>CMS Studio</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-stone-500 hover:text-[#E42528] px-1 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/admin/login"
                  className="p-2 text-stone-700 hover:text-stone-950 rounded-full hover:bg-stone-200/50 transition"
                  title="Staff Portal Sign In"
                >
                  <User className="w-4 h-4" />
                </Link>
                <Link
                  to="/admin/login"
                  className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                >
                  Staff Portal
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF9F5] border-b border-[#EAE6DE] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs tracking-[0.15em] uppercase font-semibold text-stone-700 hover:text-stone-950 py-2 border-b border-stone-200/50"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs tracking-[0.15em] uppercase font-semibold text-[#E42528] py-2"
            >
              Staff Editorial Login →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
