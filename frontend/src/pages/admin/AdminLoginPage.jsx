import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TechPulseLogo from '../../components/common/TechPulseLogo';
import SeoHead from '../../components/common/SeoHead';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center font-sans">
      <SeoHead
        title="Editorial Studio Sign In - TechPulse Engineering"
        description="Authenticate into the TechPulse content management studio."
      />

      {/* Main Split-Screen Container */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
        
        {/* ===================================================================== */}
        {/* LEFT COLUMN (Desktop): Luxury Editorial Atelier Photography (50%)     */}
        {/* ===================================================================== */}
        <div className="hidden lg:flex lg:col-span-6 relative bg-stone-900 overflow-hidden flex-col justify-between p-12 xl:p-16 text-white">
          {/* Background Photography with Warm Editorial Grade */}
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80"
            alt="Editorial Studio Workspace"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.08] scale-105"
          />
          {/* Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          {/* Top Brand Tag */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-[#E42528] text-white flex items-center justify-center font-serif font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                T
              </span>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.25em] text-xs font-bold text-white uppercase">
                  TechPulse
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-stone-300 font-sans">
                  Editorial Studio
                </span>
              </div>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-stone-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Cluster Active
            </span>
          </div>

          {/* Center Editorial Manifesto */}
          <div className="relative z-10 my-auto py-12 max-w-lg">
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase font-bold text-[#E42528] mb-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              Blueprints & Systems Research
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.14] mb-6">
              Engineering clarity in an era of distributed complexity.
            </h1>
            <p className="text-stone-300 text-sm xl:text-base leading-relaxed font-light">
              Access the TechPulse CMS to publish peer-reviewed architectural case studies, zero-trust infrastructure manuals, and distributed systems teardowns.
            </p>
          </div>

          {/* Bottom Floating Glass Card */}
          <div className="relative z-10 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/15 shadow-xl">
            <div className="flex items-center justify-between mb-3 text-xs text-stone-200">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero-Trust Perimeters
              </span>
              <span className="font-mono text-[11px] text-stone-400">v2.6 Enterprise</span>
            </div>
            <p className="text-stone-300 text-xs italic font-serif leading-relaxed">
              "Simplicity is prerequisite for reliability."
              <span className="not-italic text-stone-400 font-sans ml-2 text-[11px]">— Edsger W. Dijkstra</span>
            </p>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: Refined Studio Login Form (50%)                        */}
        {/* ===================================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 bg-[#FAF9F5]">
          
          {/* Top Bar: Return Link */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-600 hover:text-stone-950 transition group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Publication</span>
            </Link>

            <Link
              to="/signup"
              className="text-xs font-semibold text-[#E42528] hover:text-[#C71B1E] hover:underline"
            >
              Apply as Contributor →
            </Link>
          </div>

          {/* Center Form Card */}
          <div className="max-w-md w-full mx-auto my-auto">
            
            {/* Header */}
            <div className="text-center sm:text-left mb-8">
              <div className="inline-block lg:hidden mb-4">
                <TechPulseLogo />
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#E42528] mb-2 block">
                CMS Studio Access
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                Welcome Back
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                Enter your staff credentials to access editorial drafts, manage category taxonomies, and publish articles.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200/90 text-red-700 text-xs shadow-2xs animate-fadeIn">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#E42528]" />
                  <span>{error}</span>
                </div>
                <p className="text-[11px] text-red-600/90 ml-6">
                  Please verify your email/username and password.
                </p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or username"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition"
                  />
                </div>
              </div>

              {/* Password with Eye Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 transition"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition"
                  />
                </div>
              </div>

              {/* Remember Me & Help */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-stone-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-300 text-stone-900 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Remember this session</span>
                </label>
                <span className="text-stone-400 hover:text-stone-700 cursor-pointer transition">
                  Need help?
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Enter Editorial Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Footer Callout */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 text-center text-xs text-stone-500">
              <span>Looking to contribute technical blueprints? </span>
              <Link to="/signup" className="font-semibold text-stone-900 hover:text-[#E42528] underline underline-offset-2 transition">
                Join the Contributor Collective
              </Link>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="mt-8 text-center text-xs text-stone-400 font-serif">
            TechPulse Engineering Publication • Private Edge Network
          </div>

        </div>

      </div>
    </div>
  );
}
