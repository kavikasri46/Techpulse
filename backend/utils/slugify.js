/**
 * Utility to generate URL-safe slugs from strings
 */
function createSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, '');   // Trim leading/trailing dashes
}

module.exports = { createSlug };

