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
  Sparkles,
  Layers,
  Globe2,
  ShieldCheck,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TechPulseLogo from '../../components/common/TechPulseLogo';
import SeoHead from '../../components/common/SeoHead';

const DOMAINS = [
  'Software Architecture & Clean Code',
  'Cloud Fleet & Kubernetes Orchestration',
  'Private AI & Autonomous LLM Agents',
  'Zero-Trust Cybersecurity & Cryptography',
  'Web & Offline-First Mobile Systems',
  'Database Internals & Distributed Storage',
  'Engineering Leadership & Culture',
];

const SAMPLE_AUTHORS = [
  'Kavin Raj',
  'Priya Devi',
  'Aravind Kumar',
  'Nithish Kumar',
  'Harish Anand',
  'Keerthana Raj',
];

export default function AdminRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState(DOMAINS[0]);
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
      return setError('Please provide your full author or engineer name.');
    }
    if (!email.trim()) {
      return setError('Please enter your work email address.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match. Please verify your password confirmation.');
    }
    if (!agreed) {
      return setError('Please accept the editorial code of integrity.');
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
    <div className="min-h-screen bg-[#F7F5F0] text-stone-900 font-sans py-12 sm:py-16">
      <SeoHead
        title="Apply as Contributor - TechPulse Engineering Collective"
        description="Join our roster of engineering architects, systems researchers, and technical authors."
      />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-stone-200/80">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-600 hover:text-stone-950 transition group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Publications</span>
          </Link>

          <Link to="/" className="flex items-center justify-center">
            <TechPulseLogo />
          </Link>

          <Link
            to="/signin"
            className="text-xs font-semibold tracking-wider uppercase text-stone-800 hover:text-[#E42528] transition"
          >
            Already an Author? Sign In →
          </Link>
        </div>

        {/* Masthead Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-800 text-[11px] font-bold tracking-[0.2em] uppercase border border-stone-200/90 shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E42528]" />
            Author Fellowship & Contributor Guild
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-[1.14] mb-4">
            Join the TechPulse Engineering Collective
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Publish blueprints, distributed systems research, and high-scale architecture teardowns read by over 45,000 platform leaders and engineers.
          </p>
        </div>

        {/* Two-Column Grid: Left Perks & Proof | Right Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =================================================================== */}
          {/* LEFT COLUMN: Contributor Perks, Pillars & Author Social Proof (50%) */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 3 Value Proposition Pillar Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-[#E42528]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                    Peer-Reviewed Blueprints
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Collaborate directly with senior staff engineers. Every architectural proposal and benchmark is verified for reproducibility before public release.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 flex-shrink-0">
                  <Globe2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                    Global Edge Syndication
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Blueprints are instantly distributed through our multi-region edge mesh across 180+ global points of presence with sub-50ms cache warming.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                    Bespoke Author Profile & Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Showcase your engineering thought leadership on a dedicated profile page with real-time view telemetry and reader bookmark counts.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Author Guild Showcase Box */}
            <div className="bg-[#EBE7DF] rounded-2xl p-6 border border-stone-300/80">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Active Staff Author Roster
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900 text-white text-[10px] font-mono">
                  20 Authors Active
                </span>
              </div>

              {/* Sample Author Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {SAMPLE_AUTHORS.map((authorName) => (
                  <span
                    key={authorName}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-800 text-xs font-medium border border-stone-300/60 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {authorName}
                  </span>
                ))}
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-stone-200 text-stone-600 text-xs font-medium">
                  +14 more authors
                </span>
              </div>

              <p className="text-xs text-stone-600 italic font-serif leading-relaxed border-t border-stone-300/60 pt-3">
                "The finest engineering documentation is crafted by builders who have operated systems under heavy load."
              </p>
            </div>

          </div>

          {/* =================================================================== */}
          {/* RIGHT COLUMN: Contributor Registration Form (50%)                  */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm">
            
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#E42528] mb-1.5 block">
                Application Form
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Create Contributor Account
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 font-normal">
                Fill out the form below to initialize your staff author profile.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 shadow-2xs animate-fadeIn">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#E42528] mt-0.5" />
                <span>{error}</span>
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
                    placeholder="e.g. Kavin Raj"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Work / Contributor Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com or name@techpulse.io"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Primary Technical Domain */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Primary Domain of Focus
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 focus:bg-white transition cursor-pointer"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password with Strength Meter */}
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 focus:bg-white transition"
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600 select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>
                    I commit to uphold the TechPulse editorial code of technical integrity, objective benchmarks, and peer review.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#E42528] hover:bg-[#C71B1E] text-white text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Contributor Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Return / Sign In */}
            <div className="mt-8 pt-6 border-t border-stone-200 text-center text-xs text-stone-500">
              <span>Already an approved author or editor? </span>
              <Link to="/signin" className="font-semibold text-stone-900 hover:text-[#E42528] underline underline-offset-2 transition">
                Sign in to your CMS Studio
              </Link>
            </div>

          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-stone-400 font-serif">
          TechPulse Engineering Collective • Dedicated to Technical Truth and Architectural Clarity
        </div>

      </div>
    </div>
  );
}
