import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Server,
  Lock,
  Globe2
} from 'lucide-react';
import TechPulseLogo from '../common/TechPulseLogo';

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
    <footer className="bg-[#F4F1EA] text-stone-600 font-sans border-t border-[#E5E0D6] mt-24">
      {/* Fleet Principles Strip (AURA Style "Free Shipping / Secure Payments" bar) */}
      <div className="border-b border-[#E7E2D7] bg-[#EFECE5]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/80 border border-stone-300/80 flex items-center justify-center text-stone-800 flex-shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-stone-900 tracking-wide">Zero-Leakage AI</h5>
                <p className="text-[11px] text-stone-500 mt-0.5">Private neural inference pipelines</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/80 border border-stone-300/80 flex items-center justify-center text-stone-800 flex-shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-stone-900 tracking-wide">Multi-Region Fleet</h5>
                <p className="text-[11px] text-stone-500 mt-0.5">99.999% bare-metal reliability</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/80 border border-stone-300/80 flex items-center justify-center text-stone-800 flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-stone-900 tracking-wide">Zero Trust Core</h5>
                <p className="text-[11px] text-stone-500 mt-0.5">mTLS & eBPF microsegmentation</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/80 border border-stone-300/80 flex items-center justify-center text-stone-800 flex-shrink-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-stone-900 tracking-wide">Open Architecture</h5>
                <p className="text-[11px] text-stone-500 mt-0.5">Peer-reviewed RFCs & telemetry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Multi-Column Footer */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <TechPulseLogo />
            </Link>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              TechPulse Blog is a premier engineering publication dedicated to large-scale distributed systems, post-quantum cryptography, and enterprise software craftsmanship.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://twitter.com/techpulse"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-stone-300/80 hover:border-stone-900 hover:text-stone-950 flex items-center justify-center transition"
                title="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/techpulse"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-stone-300/80 hover:border-stone-900 hover:text-stone-950 flex items-center justify-center transition"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/techpulse"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-stone-300/80 hover:border-stone-900 hover:text-stone-950 flex items-center justify-center transition"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com/techpulse"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-stone-300/80 hover:border-stone-900 hover:text-stone-950 flex items-center justify-center transition"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 1: Domains */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 mb-4 tracking-wider uppercase">
              Domains
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-stone-600">
              <li><Link to="/blog?category=software-development" className="hover:text-stone-950 transition">Software Architecture</Link></li>
              <li><Link to="/blog?category=cloud-computing" className="hover:text-stone-950 transition">Cloud Fleet & eBPF</Link></li>
              <li><Link to="/blog?category=artificial-intelligence-machine-learning" className="hover:text-stone-950 transition">Enterprise AI Models</Link></li>
              <li><Link to="/blog?category=cybersecurity" className="hover:text-stone-950 transition">Zero Trust Security</Link></li>
              <li><Link to="/blog?category=web-and-mobile-app-development" className="hover:text-stone-950 transition">Offline-First Mobile</Link></li>
              <li><Link to="/blog?category=technology-innovation" className="hover:text-stone-950 transition">Quantum Computing</Link></li>
            </ul>
          </div>

          {/* Column 2: Editorial & Studio */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 mb-4 tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-stone-600">
              <li><Link to="/admin" className="hover:text-stone-950 transition">Editorial CMS Studio</Link></li>
              <li><Link to="/admin/login" className="hover:text-stone-950 transition">Staff Sign In</Link></li>
              <li><Link to="/admin/authors" className="hover:text-stone-950 transition">Author Profiles</Link></li>
              <li><Link to="/blog" className="hover:text-stone-950 transition">All Publications</Link></li>
              <li><Link to="/blog?category=industry-insights" className="hover:text-stone-950 transition">Engineering Leadership</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter (AURA Style minimal form) */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 mb-2 tracking-wider uppercase">
              Newsletter
            </h4>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Be the first to know about new architectural releases, RFCs, and fleet updates.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Thank you for subscribing to TechPulse Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-3 pr-10 py-2.5 rounded-none border-b border-stone-400 bg-transparent text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-stone-800 hover:text-stone-950 transition"
                    title="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 mt-12 border-t border-[#E5E0D6] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} TechPulse Corporation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/blog?category=cybersecurity" className="hover:text-stone-900 transition">Privacy Policy</Link>
            <Link to="/blog?category=cybersecurity" className="hover:text-stone-900 transition">Terms & Conditions</Link>
            <Link to="/blog" className="hover:text-stone-900 transition">Security Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
