import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowLeft, Home, Search } from 'lucide-react';
import SeoHead from '../components/common/SeoHead';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <SeoHead title="404 - Page Not Found" />

      <div className="max-w-md">
        <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <Terminal className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          The page or article you requested could not be located. It might have been migrated or the URL slug changed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider transition shadow-xs w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <Link
            to="/blog"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider transition w-full sm:w-auto justify-center"
          >
            <Search className="w-4 h-4" /> Browse All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

