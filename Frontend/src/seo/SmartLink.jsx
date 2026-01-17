/**
 * SmartLink component - Ensures clean internal links
 * Normalizes paths, removes junk query params, and maintains consistency
 */

import { Link } from 'react-router-dom'
import { buildInternalHref } from './urlUtils'
import { buildPathWithLang } from '../utils/langRouting'
import { useTranslation } from 'react-i18next'

/**
 * SmartLink - Enhanced Link component with URL normalization
 * 
 * @param {Object} props - All props from react-router-dom Link plus:
 * @param {string} props.to - Path to navigate to (will be normalized)
 * @param {boolean} [props.preserveLang] - If true, preserves language prefix in link
 */
const SmartLink = ({ to, preserveLang = true, ...props }) => {
  const { i18n } = useTranslation()
  
  // Normalize the path
  const normalizedPath = buildInternalHref(to)
  
  // If preserveLang is true and we're in a language context, add language prefix
  let finalPath = normalizedPath
  if (preserveLang && i18n.language) {
    finalPath = buildPathWithLang(i18n.language, normalizedPath)
  }
  
  return <Link to={finalPath} {...props} />
}

export default SmartLink

