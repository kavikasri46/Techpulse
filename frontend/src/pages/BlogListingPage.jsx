import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, RefreshCw, BookOpen, Layers } from 'lucide-react';
import { postService, categoryService } from '../services/api';
import PostCard from '../components/blog/PostCard';
import Pagination from '../components/common/Pagination';
import CategoryPills from '../components/common/CategoryPills';
import SeoHead from '../components/common/SeoHead';

export default function BlogListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const sortParam = searchParams.get('sortBy') || 'latest';

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState(searchParam);

  useEffect(() => {
    categoryService.getCategories().then((res) => {
      if (res?.success) setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await postService.getPosts({
          category: categoryParam,
          search: searchParam,
          page: pageParam,
          limit: 9,
          sortBy: sortParam,
        });

        if (res?.success) {
          setPosts(res.data);
          setTotalPages(res.pages);
          setTotalCount(res.total);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryParam, searchParam, pageParam, sortParam]);

  const handleCategorySelect = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const currentCategoryObj = categories.find((c) => c.slug === categoryParam);

  return (
    <div className="py-10 bg-[#FAFAFB]">
      <SeoHead
        title={currentCategoryObj ? `${currentCategoryObj.name} Articles - TechPulse Blog` : 'All Technical Articles - TechPulse Blog'}
        description={
          currentCategoryObj
            ? currentCategoryObj.description
            : 'Explore all published engineering tutorials, system architecture blueprints, and technology insights from TechPulse Engineering.'
        }
      />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <Link to="/" className="hover:text-[#E42528] transition">TechPulse</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#E42528] transition">Blog</Link>
            <span>/</span>
            <span className="text-[#E42528] font-bold">
              {currentCategoryObj ? currentCategoryObj.name : 'All Stories'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {currentCategoryObj ? currentCategoryObj.name : 'TechPulse Engineering & Technical Articles'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            {currentCategoryObj
              ? currentCategoryObj.description
              : 'Browse our full library of software architecture case studies, DevOps manuals, zero-trust cloud infrastructure, and privacy-first AI insights.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-2xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Keyword Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles, keywords, tags..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E42528] focus:bg-white transition"
              />
            </form>

            {/* Sort Dropdown & Count */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-bold text-slate-500">
                {totalCount} {totalCount === 1 ? 'Article' : 'Articles'}
              </span>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-xs text-slate-500 whitespace-nowrap font-medium">
                  Sort:
                </label>
                <select
                  id="sort"
                  value={sortParam}
                  onChange={handleSortChange}
                  aria-label="Sort articles"
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                >
                  <option value="latest">Latest Published</option>
                  <option value="popular">Most Popular</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills Strip */}
          <div className="pt-3 border-t border-slate-100">
            <CategoryPills
              categories={categories}
              selectedCategory={categoryParam}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {(categoryParam || searchParam) && (
          <div className="flex items-center gap-2 mb-6 text-xs text-slate-600 flex-wrap">
            <span className="font-bold">Active Filters:</span>
            {categoryParam && (
              <span className="px-2.5 py-1 rounded bg-red-50 text-[#E42528] font-bold border border-red-200">
                Domain: {currentCategoryObj?.name || categoryParam}
              </span>
            )}
            {searchParam && (
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">
                Keyword: "{searchParam}"
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-[#E42528] hover:underline font-bold ml-2"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-[#E5E7EB]" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pageParam}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E5E7EB] max-w-lg mx-auto my-12">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No articles found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              No published articles match your current search criteria.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 rounded-md bg-[#E42528] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C71B1E] transition shadow-2xs"
            >
              View All Articles
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
