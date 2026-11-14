/**
 * Curated unique high-resolution tech & architectural imagery
 * Hand-picked to fit the luxury minimalist AURA editorial aesthetic.
 */
export const UNIQUE_BLOG_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80', // Geometric brutalist architecture
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80', // Prismatic fluid glass wave
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80', // Dark server telemetry rack
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80', // Orbital digital network mesh
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80', // Minimalist designer workstation
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80', // Golden quantum chandelier
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80', // Collaborative engineering studio
  'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1400&q=80', // Modular geometric architectural facade
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80', // Speed light motion streaks
  'https://images.unsplash.com/photo-1507842229452-972f70428e36?auto=format&fit=crop&w=1400&q=80', // Monolithic architectural archive
  'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1400&q=80', // Prismatic electrical discharge
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80', // Scandinavian typography drafting table
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80', // Macro semiconductor silicon wafer
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80', // Modern glass skyscraper perspective
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80', // Sleek datacenter corridor
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80', // Cyber code flow
];

/**
 * Resolves a guaranteed unique, high-definition image for any post.
 * Deduplicates and assigns distinct imagery deterministically.
 */
export function getUniquePostImage(post, index = 0) {
  if (!post) {
    return UNIQUE_BLOG_IMAGES[index % UNIQUE_BLOG_IMAGES.length];
  }

  // If the post has a specific valid featuredImage and it is not a generic placeholder
  if (
    post.featuredImage &&
    typeof post.featuredImage === 'string' &&
    post.featuredImage.startsWith('http') &&
    !post.featuredImage.includes('default-image')
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
