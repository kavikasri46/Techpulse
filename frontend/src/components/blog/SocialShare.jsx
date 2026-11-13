import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';

export default function SocialShare({ title, url }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || 'Check out this engineering article on TechPulse');

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2">Share:</span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white text-slate-600 flex items-center justify-center transition"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0077b5] hover:text-white text-slate-600 flex items-center justify-center transition"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1877f2] hover:text-white text-slate-600 flex items-center justify-center transition"
      >
        <Facebook className="w-3.5 h-3.5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
          copied
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
        }`}
        title="Copy article link"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>

      {copied && (
        <span className="text-xs font-medium text-emerald-600 animate-fadeIn">
          Link copied!
        </span>
      )}
    </div>
  );
}

