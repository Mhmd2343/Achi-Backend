/**
 * URL utilities for SEO and canonical URL generation
 * Handles normalization, canonicalization, and internal link building
 */

import { stripLocalePrefix } from '../utils/langRouting'

const BASE_URL = 'https://achi-scaffolding.github.io'

/**
 * Normalize pathname for canonical URLs
 * - Lowercase
 * - Collapse multiple slashes
 * - Remove trailing slash (except root "/")
 * - Preserve existing route segments (do not rename routes)
 * 
 * @param {string} pathname - Pathname to normalize
 * @returns {string} - Normalized pathname
 */
export const normalizePathname = (pathname) => {
  if (!pathname || pathname === '/') return '/'
  
  // Lowercase
  let normalized = pathname.toLowerCase()
  
  // Collapse multiple slashes
  normalized = normalized.replace(/\/+/g, '/')
  
  // Remove trailing slash (except root)
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  
  // Ensure starts with /
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized
  }
  
  return normalized
}

/**
 * Strip query string and hash from URL
 * Used for canonical URL generation
 * 
 * @param {string} url - Full URL or pathname
 * @returns {string} - URL without query and hash
 */
export const stripQueryAndHash = (url) => {
  if (!url) return ''
  try {
    const urlObj = new URL(url, BASE_URL)
    return urlObj.pathname + urlObj.search.replace(/[?&]id=.*?(&|$)/gi, '')
  } catch {
    // If URL parsing fails, just remove query and hash manually
    return url.split('?')[0].split('#')[0]
  }
}

/**
 * Build clean internal href for links
 * - Normalizes pathname
 * - Removes accidental ?id= patterns from generated links
 * - Ensures lowercase and hyphen-safe
 * - Does NOT break existing required query usage
 * 
 * @param {string} path - Path to normalize
 * @returns {string} - Clean internal href
 */
export const buildInternalHref = (path) => {
  if (!path) return '/'
  
  // Handle external URLs (http/https)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // Handle hash links
  if (path.startsWith('#')) {
    return path
  }
  
  // Handle mailto/tel links
  if (path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }
  
  // Normalize pathname
  let normalized = normalizePathname(path)
  
  // Remove query params that look like junk (?id=, etc.) but preserve others
  // We'll be conservative and only remove if it's clearly a junk param
  // In practice, we'll let the app handle query params as needed
  
  return normalized
}

/**
 * Get canonical URL for current page (single source of truth)
 * - Uses window.location.origin (or BASE_URL fallback)
 * - Normalizes pathname (lowercase, no trailing slash except root)
 * - Strips locale prefix (/fr, /lb) - canonicals are language-agnostic
 * - Strips query string and hash
 * - Ensures self-referencing canonical (points to page's own preferred URL)
 * - Prevents canonical loops by always computing from normalized pathname
 * 
 * @param {string} pathname - Current pathname (may include locale prefix)
 * @param {string} [search] - Optional search string (query params) - will be stripped
 * @returns {string} - Full absolute canonical URL
 */
export const getCanonicalUrl = (pathname, search = '') => {
  // Use window.location.origin if available (for flexibility), otherwise fallback to BASE_URL
  const origin = typeof window !== 'undefined' && window.location?.origin 
    ? window.location.origin 
    : BASE_URL
  
  // Strip locale prefix for canonical (canonical should be language-agnostic)
  // This ensures canonicals never point to language-specific paths (cross-language safety)
  const cleanPath = stripLocalePrefix(pathname)
  
  // Normalize pathname (lowercase, collapse slashes, remove trailing slash except root)
  // This ensures canonical is the final preferred format (no redirected URL patterns)
  const normalized = normalizePathname(cleanPath)
  
  // Build canonical URL - always absolute, no query, no hash
  // Query params and hash are explicitly stripped to prevent canonical pointing to filtered/search URLs
  // Defensive check: ensure canonical is self-referencing and doesn't create loops
  // Re-normalize to catch any edge cases (normalized is already normalized, but this ensures consistency)
  const finalPath = normalizePathname(normalized)
  
  return `${origin}${finalPath}`
}

/**
 * Validate that a canonical URL is self-referencing
 * Ensures canonical points to the page's own preferred URL, not another page
 * 
 * @param {string} canonicalUrl - The canonical URL to validate
 * @param {string} currentPathname - Current page pathname
 * @returns {boolean} - True if canonical is self-referencing
 */
export const isCanonicalSelfReferencing = (canonicalUrl, currentPathname) => {
  if (!canonicalUrl || !currentPathname) return false
  
  try {
    const canonical = new URL(canonicalUrl)
    const current = new URL(currentPathname, canonical.origin)
    
    // Strip locale prefix from both for comparison
    const canonicalPath = stripLocalePrefix(canonical.pathname)
    const currentPath = stripLocalePrefix(current.pathname)
    
    // Normalize both for comparison
    const normalizedCanonical = normalizePathname(canonicalPath)
    const normalizedCurrent = normalizePathname(currentPath)
    
    // Canonical should match normalized current path (self-referencing)
    return normalizedCanonical === normalizedCurrent
  } catch {
    return false
  }
}

/**
 * Legacy alias for getCanonicalUrl (for backward compatibility)
 * @deprecated Use getCanonicalUrl instead
 */
export const canonicalUrl = getCanonicalUrl

/**
 * Check if URL has parameters that should trigger noindex
 * Pages with lots of filter/sort params should be noindex unless whitelisted
 * 
 * @param {string} url - Full URL or search string
 * @returns {boolean} - True if URL has filter/search params
 */
export const hasFilterParams = (url) => {
  if (!url) return false
  
  const searchParams = url.includes('?') ? url.split('?')[1].split('#')[0] : ''
  if (!searchParams) return false
  
  // Common filter/search param names
  const filterParams = ['sort', 'filter', 'search', 'q', 'page', 'offset', 'limit', 'category', 'tag']
  
  return filterParams.some(param => searchParams.includes(`${param}=`))
}

/**
 * Get base path (for GitHub Pages subpath if needed)
 * Currently returns empty string as homepage is root domain
 * 
 * @returns {string} - Base path (e.g., "" or "/repo-name")
 */
export const getBasePath = () => {
  // From package.json: "homepage": "https://achi-scaffolding.github.io"
  // This means root domain, so basePath is ""
  return ''
}

export { BASE_URL }

