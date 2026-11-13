import React from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FileEdit,
  FolderTree,
  Users,
  ExternalLink,
  LogOut,
  Shield,
  Terminal,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Posts & Analytics', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Write New Article', path: '/admin/posts/new', icon: FileEdit },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Authors', path: '/admin/authors', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Brand */}
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  TechPulse<span className="text-brand-400">.CMS</span>
                </span>
              </Link>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-slate-800 text-brand-300 border border-slate-700">
                Editorial Control Panel
              </span>
            </div>

            {/* Right Profile & Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'}
                  alt={user?.name || 'Admin'}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-white leading-tight">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-slate-400 font-mono capitalize">{user?.role || 'Administrator'}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Admin Navigation Strip */}
        <div className="bg-slate-800/80 border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 overflow-x-auto py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
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
        </div>
      </header>

      {/* Main Admin Outlet Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

