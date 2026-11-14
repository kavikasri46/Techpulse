import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SeoHead from '../../components/common/SeoHead';

export default function AdminRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Calculate password strength score (0 to 4)
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Too Short', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-stone-200', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      return setError('Please provide your full administrator name.');
    }
    if (!email.trim()) {
      return setError('Please enter your administrator work email.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match. Please verify your password confirmation.');
    }
    if (!agreed) {
      return setError('Please accept the administrator terms of service.');
    }

    setLoading(true);

    try {
      await register(name.trim(), email.trim(), password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center font-sans">
      <SeoHead
        title="Admin Registration - TechPulse Editorial Studio"
        description="Create your administrator account for the TechPulse publishing platform."
      />

      {/* Main Split-Screen Container */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">

        {/* ===================================================================== */}
        {/* LEFT COLUMN: Editorial Architecture Photography (Clean Image, No Over-Text) */}
        {/* ===================================================================== */}
        <div className="hidden lg:flex lg:col-span-6 relative bg-stone-900 overflow-hidden flex-col justify-between p-12 xl:p-16 text-white">
          {/* Distinct Warm Editorial Architectural Photo */}
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80"
            alt="Editorial Studio Space"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05] scale-105"
          />
          {/* Warm Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-black/40 to-stone-950/40" />

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
                  Editorial Collective
                </span>
              </div>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-stone-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Unified Admin Portal
            </span>
          </div>

          {/* Minimal Punchy Statement (Clean, No Cluttered Paragraphs) */}
          <div className="relative z-10 my-auto py-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-bold text-amber-300 mb-4 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Master Administrative Console
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5">
              Architecting knowledge for the global engineering fleet.
            </h1>
            <p className="text-stone-300 text-sm xl:text-base leading-relaxed font-light">
              One unified administrative dashboard for publications, author curation, real-time telemetry, and technical reviews.
            </p>
          </div>

          {/* Bottom Security / Trust Pill */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-stone-300 font-light">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full platform administrative privileges</span>
            </div>
            <span className="font-mono text-[11px] text-stone-400">v2.4 LTS</span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: Clean Administrator Registration Card                   */}
        {/* ===================================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 bg-[#FAF9F5] overflow-y-auto">
          
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 hover:text-stone-900 transition group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Site</span>
            </Link>

            <Link
              to="/signin"
              className="text-xs font-semibold tracking-wider uppercase text-stone-700 hover:text-[#E42528] transition"
            >
              Already Registered? Sign In →
            </Link>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-md mx-auto my-auto py-4">
            
            <div className="mb-8">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#E42528] mb-2">
                Administrator Access
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Create Admin Account
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 font-normal">
                Register as an overall administrator to access the editorial studio, publish blueprints, and curate authors.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 shadow-2xs animate-fadeIn">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#E42528] mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition"
                  />
                </div>
              </div>

              {/* Administrator Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Administrator Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Password (min. 6 characters) *
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition"
                  />
                </div>

                {/* Password Strength Progress Bar */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-full flex-1 transition-all duration-300 ${
                            strength >= step ? strengthColors[strength] : 'bg-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-stone-500">
                      <span>Password Strength:</span>
                      <span className="font-semibold text-stone-800">{strengthLabels[strength]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Confirm Password *
                  </label>
                  {confirmPassword && password === confirmPassword && (
                    <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600 select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>
                    I confirm this administrator account will govern TechPulse publications in accordance with our editorial standards.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Creating Admin Account...</span>
                  ) : (
                    <>
                      <span>Register Administrator</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Sign In Link */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 text-center text-xs text-stone-500">
              <span>Already have an admin account? </span>
              <Link to="/signin" className="font-semibold text-stone-900 hover:text-[#E42528] underline underline-offset-2 transition">
                Sign In to Studio
              </Link>
            </div>
          </div>

          {/* Simple Bottom Footer */}
          <div className="text-center text-[11px] text-stone-400 font-serif pt-6">
            TechPulse Editorial Collective • Administrator Portal
          </div>

        </div>

      </div>
    </div>
  );
}
