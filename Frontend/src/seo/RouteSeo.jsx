/**
 * RouteSeo component - Centralized SEO management for routes
 * Uses react-helmet-async to manage meta tags, canonical URLs, and robots directives
 */

import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getCanonicalUrl } from './urlUtils'
import { getRouteSEO, isRouteIndexable, DEFAULT_SEO } from './seoConfig'
import { stripLocalePrefix } from '../utils/langRouting'

/**
 * RouteSeo component
 * Automatically handles SEO for each route based on configuration
 * 
 * @param {Object} props
 * @param {string} [props.title] - Override page title
 * @param {string} [props.description] - Override meta description
 * @param {string} [props.ogImage] - Override Open Graph image
 * @param {boolean} [props.indexable] - Override indexable setting
 * @param {string} [props.canonical] - Override canonical URL
 */
const RouteSeo = ({
  title,
  description,
  ogImage,
  indexable,
  canonical: canonicalOverride,
}) => {
  const location = useLocation()
  // Strip locale prefix for route matching (canonical URLs are language-agnostic)
  // The actual browser pathname may have /fr or /lb prefix, but we match routes without it
  const cleanPathname = stripLocalePrefix(location.pathname)
  const search = location.search
  
  // Get route-specific SEO config (using clean pathname without locale prefix)
  const routeSEO = getRouteSEO(cleanPathname)
  
  // Determine if route is indexable
  const shouldIndex = indexable !== undefined 
    ? indexable 
    : isRouteIndexable(cleanPathname, search)
  
  // Use provided values or fall back to route config or defaults
  const finalTitle = title || routeSEO.title || DEFAULT_SEO.title
  const finalDescription = description || routeSEO.description || DEFAULT_SEO.description
  const finalOgImage = ogImage || routeSEO.ogImage || DEFAULT_SEO.ogImage
  
  // Build canonical URL - self-referencing, normalized, no query/hash, no locale prefix
  // getCanonicalUrl ensures:
  // - Absolute URL (https://)
  // - No query parameters
  // - No hash (#)
  // - Lowercase
  // - Consistent trailing slash rule (no trailing slash except root)
  // - No locale prefix (/fr, /lb)
  const canonicalUrlValue = canonicalOverride || getCanonicalUrl(location.pathname, search)
  
  // Determine robots content
  const robotsContent = shouldIndex ? 'index,follow' : 'noindex,follow'
  
  // Build full URL for og:url (same as canonical for consistency)
  const ogUrl = canonicalUrlValue
  
  return (
    <Helmet>
      {/* Primary meta tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL - Self-referencing, exactly one per page */}
      {/* react-helmet-async ensures only one canonical tag exists in DOM */}
      {/* For indexable pages: canonical points to page's own preferred URL */}
      {/* For noindex pages: canonical still included (Google best practice) */}
      <link rel="canonical" href={canonicalUrlValue} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
    </Helmet>
  )
}

export default RouteSeo

