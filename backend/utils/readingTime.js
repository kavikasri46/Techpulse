/**
 * Calculate estimated reading time in minutes based on average 200 words/minute
 */
function calculateReadingTime(text) {
  if (!text) return '1 min read';
  
  // Strip HTML tags if present
  const cleanText = text.replace(/<[^>]*>?/gm, ' ');
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  
  return `${minutes} min read`;
}

module.exports = { calculateReadingTime };

