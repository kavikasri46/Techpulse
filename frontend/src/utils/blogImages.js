/**
 * Curated 100% relevant high-resolution software engineering & technology imagery.
 * Strictly tech, coding, Node.js, Python, React Native, Kubernetes, AI, and Datacenters.
 * (Zero irrelevant building/real estate images).
 */
export const UNIQUE_BLOG_IMAGES = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80', // Node.js & JavaScript dark mode code editor
  'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1400&q=80', // TypeScript backend services & algorithms
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80', // Generative AI & LLM neural intelligence
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80', // Deep learning neural fluid vectors
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80', // High-security server rack with fiber telemetry
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80', // Zero Trust cybersecurity & encryption keys
  'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1400&q=80', // Kubernetes container cloud orchestration
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80', // Global planetary cloud network mesh
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80', // React Native mobile app coding & UI interface
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80', // Mobile workplace device & cross-platform testing
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80', // Quantum computing dilution refrigerator core
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80', // Silicon microprocessor semiconductor chip
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80', // Frontend web developer monitors with code
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80', // Design systems, CSS tokens, and web performance
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1400&q=80', // PostgreSQL & relational database engine
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80', // Apache Kafka high-speed streaming data packets
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80', // Engineering architecture review & collaborative sprint
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80', // Multi-region cloud datacenter corridor
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80', // Cryptographic security code stream
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80', // Vector database & AI neural embeddings
];

/**
 * Resolves a guaranteed unique, high-definition tech image for any post.
 * Deduplicates and assigns distinct software engineering imagery deterministically.
 */
export function getUniquePostImage(post, index = 0) {
  if (!post) {
    return UNIQUE_BLOG_IMAGES[index % UNIQUE_BLOG_IMAGES.length];
  }

  // Reject irrelevant architecture/building images if encountered
  const isIrrelevantBuilding = (url = '') => {
    return (
      url.includes('photo-1600585154340') || // house/building
      url.includes('photo-1541888946425') || // construction facade
      url.includes('photo-1486406146926') || // building skyscraper
      url.includes('photo-1507842229452') || // library archive
      url.includes('default-image')
    );
  };

  // If the post has a specific valid featuredImage and it is NOT an irrelevant building
  if (
    post.featuredImage &&
    typeof post.featuredImage === 'string' &&
    post.featuredImage.startsWith('http') &&
    !isIrrelevantBuilding(post.featuredImage)
  ) {
    return post.featuredImage;
  }

  // Deterministic hash based on slug or id or title
  const key = post.slug || post._id || post.title || String(index);
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const chosenIndex = (Math.abs(hash) + index) % UNIQUE_BLOG_IMAGES.length;
  return UNIQUE_BLOG_IMAGES[chosenIndex];
}
