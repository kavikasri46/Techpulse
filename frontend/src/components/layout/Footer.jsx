import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Linkedin, Youtube, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-bold tracking-wider text-brand-400">Stay Ahead in Tech</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Engineering insights delivered straight to your inbox.
              </h3>
              <p className="mt-2 text-slate-400 max-w-xl">
                Join 45,000+ senior developers, system architects, and tech leaders receiving our weekly deep-dives on software design, cloud, and AI.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you for subscribing! Check your inbox for the welcome dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md shadow-brand-600/30"
                  >
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                TechPulse<span className="text-brand-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An enterprise publication dedicated to clean code, distributed systems, resilient cloud infrastructure, and practical artificial intelligence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Categories</h4>
            <ul className="space-y-2.5">
              <li><Link to="/blog?category=software-development" className="hover:text-white transition">Software Development</Link></li>
              <li><Link to="/blog?category=artificial-intelligence-machine-learning" className="hover:text-white transition">AI & Machine Learning</Link></li>
              <li><Link to="/blog?category=web-and-mobile-app-development" className="hover:text-white transition">Web & Mobile Dev</Link></li>
              <li><Link to="/blog?category=cloud-computing" className="hover:text-white transition">Cloud & DevOps</Link></li>
              <li><Link to="/blog?category=cybersecurity" className="hover:text-white transition">Cybersecurity</Link></li>
              <li><Link to="/blog?category=industry-insights" className="hover:text-white transition">Industry Insights</Link></li>
            </ul>
          </div>

          {/* Editorial & Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/blog" className="hover:text-white transition">All Publications</Link></li>
              <li><a href="#about" className="hover:text-white transition">About TechPulse</a></li>
              <li><a href="#authors" className="hover:text-white transition">Editorial Board</a></li>
              <li><a href="#guidelines" className="hover:text-white transition">Writing Guidelines</a></li>
              <li><a href="#contact" className="hover:text-white transition">Press & Media</a></li>
            </ul>
          </div>

          {/* Technical & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Engineers & SEO</h4>
            <ul className="space-y-2.5">
              <li><a href="http://localhost:5000/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white transition">XML Sitemap</a></li>
              <li><a href="http://localhost:5000/robots.txt" target="_blank" rel="noreferrer" className="hover:text-white transition">robots.txt</a></li>
              <li><a href="http://localhost:5000/api/health" target="_blank" rel="noreferrer" className="hover:text-white transition">API Health Status</a></li>
              <li><Link to="/admin/login" className="hover:text-white transition">Staff CMS Portal</Link></li>
              <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TechPulse Inc. Inspired by Zoho Blog corporate architecture. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with MERN Stack</span>
            <span>•</span>
            <span>Schema.org JSON-LD</span>
            <span>•</span>
            <span>SEO Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

