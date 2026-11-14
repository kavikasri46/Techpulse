import React from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FileEdit,
  FolderTree,
  Users,
  ExternalLink,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TechPulseLogo from '../common/TechPulseLogo';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Articles & Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'New Article', path: '/admin/posts/new', icon: FileEdit },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Authors', path: '/admin/authors', icon: Users },
  ];

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'E';

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col font-sans text-slate-900">
      {/* Modern Refined Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 w-full shadow-xs">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand & Studio Tag */}
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2.5 group">
                <TechPulseLogo variant="dark" />
                <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide bg-slate-800 text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded-md">
                  Editorial Studio
                </span>
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden md:flex items-center gap-1 ml-6 pl-6 border-l border-slate-800">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-slate-800 text-white font-semibold shadow-xs border border-slate-700/60'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`
                      }
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Right: Live Blog & Editor Profile */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-700/70 transition shadow-2xs"
                title="Preview live publication"
              >
                <span>Live Blog</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              {/* User Profile Pill */}
              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-red-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-800 shadow-xs flex-shrink-0">
                  {userInitial}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-white leading-tight">{user?.name || 'Editorial Team'}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={handleLogout}
                title="Sign out of editorial session"
                aria-label="Sign out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Subnav Strip */}
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-1.5 overflow-x-auto flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition ${
                    isActive ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`
                }
              >
                <Icon className="w-3 h-3" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <Outlet />
      </main>
    </div>
  );
}
