import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * SEO Component for dynamic meta tag management
 * Updates document head with page-specific SEO tags
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.canonical - Canonical URL (defaults to current URL without locale prefix)
 * @param {string} props.robots - Robots meta content (default: "index,follow")
 * @param {string} props.ogTitle - Open Graph title (defaults to title)
 * @param {string} props.ogDescription - Open Graph description (defaults to description)
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogUrl - Open Graph URL (defaults to canonical)
 * @param {string} props.ogType - Open Graph type (default: "website", use "article" for blog posts)
 */
const SEO = ({
  title = 'Industrial & Construction Scaffolding Systems | ACHI',
  description = 'ACHI Scaffolding delivers access systems, shoring, and scaffolding solutions for construction, restoration, and industrial projects. Request technical consultation.',
  canonical,
  robots = 'index,follow',
  ogTitle,
  ogDescription,
  ogImage = 'https://achi-scaffolding.github.io/assets/ArchiScaffoldinglogo.png',
  ogUrl,
  ogType = 'website',
  noindex = false
}) => {
  const location = useLocation()
  const baseUrl = 'https://achi-scaffolding.github.io'
  
  // Get clean pathname (without locale prefix)
  const getCleanPath = () => {
    const pathname = location.pathname
    // Remove locale prefixes (/fr, /lb) for canonical URLs
    const cleanPath = pathname.replace(/^\/(fr|lb)(\/|$)/, '/').replace(/\/$/, '') || '/'
    return cleanPath
  }

  // Build canonical URL
  const getCanonicalUrl = () => {
    if (canonical) return canonical
    const cleanPath = getCleanPath()
    return `${baseUrl}${cleanPath}`
  }

  // Determine robots content
  const getRobotsContent = () => {
    if (noindex) return 'noindex,follow'
    return robots
  }

  useEffect(() => {
    const canonicalUrl = getCanonicalUrl()
    const robotsContent = getRobotsContent()
    const finalOgTitle = ogTitle || title
    const finalOgDescription = ogDescription || description
    const finalOgUrl = ogUrl || canonicalUrl

    // Update or create title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Update description
    updateMetaTag('description', description)

    // Update robots
    updateMetaTag('robots', robotsContent)

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // Update Open Graph tags
    updateMetaTag('og:title', finalOgTitle, 'property')
    updateMetaTag('og:description', finalOgDescription, 'property')
    updateMetaTag('og:url', finalOgUrl, 'property')
    updateMetaTag('og:image', ogImage, 'property')
    updateMetaTag('og:type', ogType, 'property')
    updateMetaTag('og:site_name', 'ACHI Scaffolding', 'property')

    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', finalOgTitle)
    updateMetaTag('twitter:description', finalOgDescription)
    updateMetaTag('twitter:image', ogImage)
  }, [location.pathname, title, description, canonical, robots, ogTitle, ogDescription, ogImage, ogUrl, ogType, noindex])

  return null
}

export default SEO

