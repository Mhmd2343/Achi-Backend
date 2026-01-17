/**
 * URL normalization utilities for client-side redirects
 * Handles trailing slash normalization and path cleanup
 */

import { normalizePathname } from './urlUtils'
import { stripLocalePrefix } from '../utils/langRouting'

/**
 * Check if current pathname needs normalization
 * Returns normalized pathname if different, null if already normalized
 * 
 * @param {string} currentPathname - Current browser pathname
 * @returns {string|null} - Normalized pathname or null if no change needed
 */
export const getNormalizedPathname = (currentPathname) => {
  // Strip locale prefix for normalization check
  const cleanPath = stripLocalePrefix(currentPathname)
  const normalized = normalizePathname(cleanPath)
  
  // If normalized is different from clean path, return normalized
  // But we need to preserve locale prefix if it exists
  const hasLocalePrefix = currentPathname.match(/^\/(fr|lb)(\/|$)/)
  const localePrefix = hasLocalePrefix ? currentPathname.match(/^\/(fr|lb)/)[0] : ''
  
  // Build final normalized path with locale prefix if it existed
  const finalNormalized = localePrefix + normalized
  
  // Only return if different from current
  if (finalNormalized !== currentPathname && finalNormalized !== currentPathname + '/') {
    return finalNormalized
  }
  
  return null
}

/**
 * Optional trailing slash normalization redirect
 * Should be called once on app load
 * Single-hop redirect to normalized version
 * 
 * @param {Function} navigate - React Router navigate function
 * @param {string} currentPathname - Current pathname
 * @returns {boolean} - True if redirect was performed
 */
export const normalizeTrailingSlash = (navigate, currentPathname) => {
  const normalized = getNormalizedPathname(currentPathname)
  
  if (normalized) {
    // Single-hop redirect
    navigate(normalized, { replace: true })
    return true
  }
  
  return false
}

