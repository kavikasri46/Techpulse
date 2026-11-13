import { useEffect } from 'react';

export default function SeoHead({
  title,
  description,
  image,
  url,
  article = null,
}) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title
      ? `${title} | TechPulse Blog`
      : 'TechPulse Blog - Insights on Engineering, AI & Cloud Computing';
    document.title = fullTitle;

    // 2. Helper to set meta tags
    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const finalDesc =
      description ||
      'In-depth software engineering tutorials, system design patterns, cloud native strategies, and AI breakthroughs.';
    const finalImage =
      image ||
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';
    const finalUrl = url || window.location.href;

    // Standard Meta
    setMeta('description', finalDesc);

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', finalDesc, true);
    setMeta('og:image', finalImage, true);
    setMeta('og:url', finalUrl, true);
    setMeta('og:type', article ? 'article' : 'website', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', finalDesc);
    setMeta('twitter:image', finalImage);

    // 3. Structured Data JSON-LD
    let scriptEl = document.getElementById('json-ld-schema');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'json-ld-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (article) {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.shortDescription || finalDesc,
        image: article.featuredImage || finalImage,
        datePublished: article.publishedAt || article.createdAt,
        dateModified: article.updatedAt || article.publishedAt || article.createdAt,
        author: {
          '@type': 'Person',
          name: article.author?.name || 'TechPulse Editorial Team',
          jobTitle: article.author?.title || 'Technical Writer',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TechPulse',
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/favicon.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': finalUrl,
        },
      };
      scriptEl.textContent = JSON.stringify(schemaData);
    } else {
      const siteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TechPulse Blog',
        url: window.location.origin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/blog?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
      scriptEl.textContent = JSON.stringify(siteSchema);
    }
  }, [title, description, image, url, article]);

  return null;
}

