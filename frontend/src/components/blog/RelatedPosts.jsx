import React from 'react';
import PostCard from './PostCard';

export default function RelatedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-brand-600">Keep Exploring</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Related Articles</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

