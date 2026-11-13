import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Youtube, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import ZohoLogo from '../common/ZohoLogo';

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
    <footer className="bg-[#18181B] text-slate-400 text-sm mt-20 border-t border-[#27272A]">
      {/* Top Banner / Zoho Newsletter */}
      <div className="border-b border-[#27272A] bg-[#212124] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#FFC600]">
                Zoho Engineering Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                Get our deep-dives on cloud architecture & software engineering.
              </h3>
              <p className="mt-2 text-slate-300 text-sm max-w-xl leading-relaxed">
                Join 100,000+ developers, system engineers, and technology leaders following Zoho's engineering journeys, zero-trust cloud setups, and privacy-first AI.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-950/70 border border-emerald-600 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Welcome to Zoho Blog updates! You're subscribed to technical notifications.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    className="flex-1 px-4 py-3 rounded-lg bg-[#2D2D30] border border-[#3E3E42] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E42528] text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-[#E42528] hover:bg-[#C71B1E] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
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
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <ZohoLogo />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Zoho Corporation is a multi-national technology company providing 55+ software applications for business, enterprise collaboration, and cloud infrastructure. We are 100% privately held, bootstrapped, and dedicated to user privacy.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Link to="/blog" className="w-8 h-8 rounded-md bg-[#27272A] hover:bg-[#E42528] hover:text-white flex items-center justify-center transition" title="Zoho Blog Twitter Updates">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link to="/blog" className="w-8 h-8 rounded-md bg-[#27272A] hover:bg-[#0F65AF] hover:text-white flex items-center justify-center transition" title="Zoho Blog LinkedIn">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link to="/blog" className="w-8 h-8 rounded-md bg-[#27272A] hover:bg-[#111111] hover:text-white flex items-center justify-center transition" title="Zoho Open Source GitHub">
                <Github className="w-4 h-4" />
              </Link>
              <Link to="/blog" className="w-8 h-8 rounded-md bg-[#27272A] hover:bg-[#E42528] hover:text-white flex items-center justify-center transition" title="Zoho Video Engineering Series">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs tracking-wider uppercase">Blog Domains</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/blog?category=software-development" className="hover:text-white transition">Software Development</Link></li>
              <li><Link to="/blog?category=artificial-intelligence-machine-learning" className="hover:text-white transition">AI & Machine Learning</Link></li>
              <li><Link to="/blog?category=cloud-computing" className="hover:text-white transition">Cloud & Infrastructure</Link></li>
              <li><Link to="/blog?category=cybersecurity" className="hover:text-white transition">Zero-Trust Cybersecurity</Link></li>
              <li><Link to="/blog?category=web-and-mobile-app-development" className="hover:text-white transition">Web & Mobile Apps</Link></li>
              <li><Link to="/blog?category=technology-innovation" className="hover:text-white transition">Technology & Innovation</Link></li>
              <li><Link to="/blog?category=industry-insights" className="hover:text-white transition">Industry Insights</Link></li>
            </ul>
          </div>

          {/* Zoho Suite (Internal Navigation - No External Redirects) */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs tracking-wider uppercase">Featured Architecture</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/blog?category=software-development" className="hover:text-white transition">Zoho CRM Platform</Link></li>
              <li><Link to="/blog?category=cloud-computing" className="hover:text-white transition">Zoho Mail Core</Link></li>
              <li><Link to="/blog?category=technology-innovation" className="hover:text-white transition">Workplace Systems</Link></li>
              <li><Link to="/blog?category=web-and-mobile-app-development" className="hover:text-white transition">Creator Low-Code Engine</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Zoho One Engineering</Link></li>
            </ul>
          </div>

          {/* Legal & Editorial (Internal Navigation) */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/admin/login" className="hover:text-white transition text-[#FFC600] font-semibold">Author Sign In</Link></li>
              <li><Link to="/admin/signup" className="hover:text-white transition text-emerald-400 font-semibold">Create Author Account</Link></li>
              <li><Link to="/blog?category=cybersecurity" className="hover:text-white transition">Privacy Commitment</Link></li>
              <li><Link to="/blog?category=cybersecurity" className="hover:text-white transition">Security Architecture</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">All Engineering Articles</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()}, Zoho Corporation Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Privacy-First Architecture
            </span>
            <span>•</span>
            <span>MERN Stack</span>
            <span>•</span>
            <span>Schema.org JSON-LD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
