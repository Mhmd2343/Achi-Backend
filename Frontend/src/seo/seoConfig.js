/**
 * SEO configuration and route rules
 * Defines which routes are indexable, canonical URLs, and meta defaults
 */

import { hasFilterParams } from './urlUtils'

const BASE_URL = 'https://achi-scaffolding.github.io'
const SITE_NAME = 'ACHI Scaffolding'

/**
 * Default SEO values
 */
export const DEFAULT_SEO = {
  title: 'Industrial & Construction Scaffolding Systems | ACHI',
  description: 'ACHI Scaffolding delivers access systems, shoring, and scaffolding solutions for construction, restoration, and industrial projects. Request technical consultation.',
  ogImage: `${BASE_URL}/assets/ArchiScaffoldinglogo.png`,
  siteName: SITE_NAME,
}

/**
 * Route-specific SEO configuration
 * Maps route patterns to SEO settings
 */
export const ROUTE_SEO_CONFIG = {
  // Homepage
  '/': {
    title: 'Industrial & Construction Scaffolding Systems | ACHI',
    description: 'ACHI Scaffolding delivers access systems, shoring, and scaffolding solutions for construction, restoration, and industrial projects.',
    indexable: true,
  },
  
  // Main pages
  '/about': {
    title: 'About Us | ACHI Scaffolding',
    description: 'Learn about ACHI Scaffolding, a leading provider of industrial and construction scaffolding systems, access solutions, and technical expertise.',
    indexable: true,
  },
  
  '/products': {
    title: 'Scaffolding Products | ACHI Scaffolding',
    description: 'Browse our comprehensive range of scaffolding products, access systems, and construction equipment designed for industrial and commercial projects.',
    indexable: true,
  },
  
  '/services': {
    title: 'Scaffolding Services | ACHI Scaffolding',
    description: 'Professional scaffolding services including installation, rental, technical consultation, and project management for construction and industrial projects.',
    indexable: true,
  },
  
  '/services/serviceItem': {
    title: 'Service Details | ACHI Scaffolding',
    description: 'Detailed information about our scaffolding services and solutions.',
    indexable: false, // Individual service items may be dynamic
  },
  
  '/projects': {
    title: 'Our Projects | ACHI Scaffolding',
    description: 'Explore our portfolio of successful scaffolding projects across construction, restoration, and industrial sectors.',
    indexable: true,
  },
  
  '/sectors': {
    title: 'Industry Sectors | ACHI Scaffolding',
    description: 'ACHI Scaffolding serves diverse industry sectors including construction, restoration, industrial maintenance, and event infrastructure.',
    indexable: true,
  },
  
  '/gallery': {
    title: 'Project Gallery | ACHI Scaffolding',
    description: 'View our project gallery showcasing scaffolding installations, construction projects, and industrial access solutions.',
    indexable: true,
  },
  
  '/blog': {
    title: 'Blog | ACHI Scaffolding',
    description: 'Read the latest news, insights, and updates from ACHI Scaffolding about scaffolding systems, construction industry trends, and project highlights.',
    indexable: true,
  },
  
  '/blog-post-1': {
    title: 'Blog Post | ACHI Scaffolding',
    description: 'Read our latest blog post about scaffolding systems and construction industry insights.',
    indexable: true,
  },
  
  '/blog-post-2': {
    title: 'Blog Post | ACHI Scaffolding',
    description: 'Read our latest blog post about scaffolding systems and construction industry insights.',
    indexable: true,
  },
  
  '/blog-post-3': {
    title: 'Blog Post | ACHI Scaffolding',
    description: 'Read our latest blog post about scaffolding systems and construction industry insights.',
    indexable: true,
  },
}

/**
 * Patterns for routes that should be noindex
 * These patterns take precedence over ROUTE_SEO_CONFIG
 */
export const NOINDEX_PATTERNS = [
  // Admin/internal pages (if they exist)
  /^\/admin/,
  /^\/login/,
  /^\/dashboard/,
  /^\/cart/,
  /^\/checkout/,
  /^\/thank-you/,
  
  // Filter/search result pages (detected by query params)
  // This is handled dynamically in RouteSeo component
]

/**
 * Check if a route should be indexed
 * 
 * @param {string} pathname - Current pathname
 * @param {string} search - Search string (query params)
 * @returns {boolean} - True if route should be indexed
 */
export const isRouteIndexable = (pathname, search = '') => {
  // Check against noindex patterns
  for (const pattern of NOINDEX_PATTERNS) {
    if (pattern.test(pathname)) {
      return false
    }
  }
  
  // Check if URL has filter/search params
  if (hasFilterParams(pathname + search)) {
    return false
  }
  
  // Check route-specific config
  const routeConfig = ROUTE_SEO_CONFIG[pathname]
  if (routeConfig && routeConfig.indexable === false) {
    return false
  }
  
  // Default to indexable
  return true
}

/**
 * Get SEO config for a route
 * 
 * @param {string} pathname - Current pathname
 * @returns {Object} - SEO configuration object
 */
export const getRouteSEO = (pathname) => {
  const routeConfig = ROUTE_SEO_CONFIG[pathname] || {}
  
  return {
    title: routeConfig.title || DEFAULT_SEO.title,
    description: routeConfig.description || DEFAULT_SEO.description,
    ogImage: routeConfig.ogImage || DEFAULT_SEO.ogImage,
    indexable: isRouteIndexable(pathname),
  }
}

/**
 * List of canonical routes for sitemap generation
 * Only includes indexable routes
 */
export const CANONICAL_ROUTES = [
  '/',
  '/about',
  '/products',
  '/services',
  '/projects',
  '/sectors',
  '/gallery',
  '/blog',
  '/blog-post-1',
  '/blog-post-2',
  '/blog-post-3',
]

