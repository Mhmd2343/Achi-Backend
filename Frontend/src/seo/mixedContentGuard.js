/**
 * Mixed Content Guard (dev-only)
 * Scans document for http:// resources and logs warnings
 * Helps identify insecure content that should be converted to https://
 */

/**
 * Check for mixed content (http:// resources on https:// page)
 * Only runs in development mode
 */
export const checkMixedContent = () => {
  // Only run in development
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const warnings = []

  // Check images
  const images = document.querySelectorAll('img[src]')
  images.forEach((img) => {
    const src = img.getAttribute('src')
    if (src && src.startsWith('http://')) {
      warnings.push(`Image with insecure src: ${src}`)
    }
  })

  // Check scripts
  const scripts = document.querySelectorAll('script[src]')
  scripts.forEach((script) => {
    const src = script.getAttribute('src')
    if (src && src.startsWith('http://')) {
      warnings.push(`Script with insecure src: ${src}`)
    }
  })

  // Check links (stylesheets, etc.)
  const links = document.querySelectorAll('link[href]')
  links.forEach((link) => {
    const href = link.getAttribute('href')
    if (href && href.startsWith('http://')) {
      warnings.push(`Link with insecure href: ${href}`)
    }
  })

  // Check iframes
  const iframes = document.querySelectorAll('iframe[src]')
  iframes.forEach((iframe) => {
    const src = iframe.getAttribute('src')
    if (src && src.startsWith('http://')) {
      warnings.push(`Iframe with insecure src: ${src}`)
    }
  })

  // Log warnings
  if (warnings.length > 0) {
    console.warn('[Mixed Content Guard] Found insecure http:// resources:')
    warnings.forEach((warning) => {
      console.warn(`  - ${warning}`)
    })
    console.warn(
      '[Mixed Content Guard] Consider converting these to https:// for production'
    )
  }
}

/**
 * Initialize mixed content guard
 * Call this after DOM is loaded
 */
export const initMixedContentGuard = () => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  // Run check after a short delay to ensure all resources are loaded
  setTimeout(() => {
    checkMixedContent()
  }, 1000)

  // Also check on any dynamic content changes (optional, can be removed if too noisy)
  const observer = new MutationObserver(() => {
    checkMixedContent()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  // Cleanup observer after 10 seconds to avoid performance issues
  setTimeout(() => {
    observer.disconnect()
  }, 10000)
}

