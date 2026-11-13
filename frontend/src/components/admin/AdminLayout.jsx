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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ZohoLogo from '../common/ZohoLogo';

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
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col">
      {/* Zoho Admin Top Bar */}
      <header className="bg-[#1A1A1A] text-white border-b border-[#2C2C2C] sticky top-0 z-50 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Brand */}
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2">
                <ZohoLogo />
                <span className="text-xs uppercase font-extrabold tracking-wider bg-[#0F65AF] text-white px-2 py-0.5 rounded-sm">
                  CMS Studio
                </span>
              </Link>
            </div>

            {/* Right Profile & Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-[#2A2A2A] hover:bg-[#333333] px-3 py-1.5 rounded-md border border-[#3E3E3E] transition"
              >
                <span>Live Zoho Blog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2 pl-3 border-l border-slate-700">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'}
                  alt={user?.name || 'Admin'}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-600"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-white leading-tight">{user?.name || 'Zoho Editor'}</p>
                  <p className="text-[10px] text-slate-400 font-mono capitalize">{user?.role || 'Administrator'}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-[#2A2A2A] transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Zoho Admin Subnav */}
        <div className="bg-[#242424] border-t border-[#333333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 overflow-x-auto py-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-[#E42528] text-white shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-[#333333]'
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
