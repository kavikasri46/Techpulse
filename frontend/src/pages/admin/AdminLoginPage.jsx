import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail, AlertCircle, Sparkles, Server, Check, Settings2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getApiBaseUrl, setCustomApiBaseUrl } from '../../services/api';
import TechPulseLogo from '../../components/common/TechPulseLogo';
import SeoHead from '../../components/common/SeoHead';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showServerConfig, setShowServerConfig] = useState(false);
  const [serverUrl, setServerUrl] = useState(() => getApiBaseUrl());
  const [savedServerMsg, setSavedServerMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please verify credentials.');
      if (err.message && err.message.includes('405')) {
        setShowServerConfig(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@techpulse.io');
    setPassword('Admin@123');
    setError('');
  };

  const handleSaveServerUrl = (e) => {
    e.preventDefault();
    setCustomApiBaseUrl(serverUrl);
    setSavedServerMsg('Saved! Testing connection with new backend URL...');
    setTimeout(() => setSavedServerMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SeoHead title="TechPulse Accounts - CMS Sign In" description="TechPulse Editorial Staff Portal" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-3">
          <TechPulseLogo size="large" />
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Editorial Staff Sign In
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Sign in to your TechPulse Blog content management studio.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-sm border border-[#E5E7EB]">
          
          {/* Quick Demo Fill Helper */}
          <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between">
            <div className="text-xs text-slate-800">
              <span className="font-bold flex items-center gap-1 text-[#E42528]">
                <Sparkles className="w-3.5 h-3.5 text-[#E42528]" /> Staff Evaluation Account:
              </span>
              <p className="font-mono text-[11px] text-slate-600 mt-0.5">admin@techpulse.io / Admin@123</p>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#E42528] text-white hover:bg-[#C71B1E] transition whitespace-nowrap shadow-2xs"
            >
              Auto Fill
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Staff Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@techpulse.io"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E42528] focus:border-[#E42528] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E42528] focus:border-[#E42528] transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#E42528] hover:bg-[#C71B1E] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition disabled:opacity-50"
              >
                {loading ? 'Verifying Account...' : 'Sign In to TechPulse CMS'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Don't have an account?</span>
            <Link to="/admin/signup" className="font-bold text-[#E42528] hover:underline">
              Create Account →
            </Link>
          </div>

          <div className="mt-3 text-center">
            <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-[#E42528] transition">
              ← Return to TechPulse Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
