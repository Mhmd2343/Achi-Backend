import { useEffect, useMemo, createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLangFromPath, stripLocalePrefix } from '../utils/langRouting'

// Context to provide clean location to child Routes
const LangRouterContext = createContext(null)

export const useLangRouter = () => {
  const context = useContext(LangRouterContext)
  if (!context) {
    throw new Error('useLangRouter must be used within LangRouter')
  }
  return context
}

/**
 * Language-aware router wrapper
 * 
 * Responsibilities:
 * 1. Read first URL segment (fr, lb, or none)
 * 2. Map prefix → i18n language (fr→fr, lb→ar, default→en)
 * 3. Sync i18n language from URL
 * 4. Set <html dir="rtl"> for Arabic, <html dir="ltr"> for EN/FR
 * 5. Remove language prefix before passing routing to <Routes>
 */
function LangRouter({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  // Extract language from URL
  const urlLang = useMemo(() => {
    return getLangFromPath(location.pathname)
  }, [location.pathname])

  // Get clean path without locale prefix for Routes
  const cleanPath = useMemo(() => {
    return stripLocalePrefix(location.pathname)
  }, [location.pathname])

  // Create modified location object with clean path
  const cleanLocation = useMemo(() => {
    return { ...location, pathname: cleanPath }
  }, [location, cleanPath])

  // Sync i18n language from URL
  useEffect(() => {
    if (i18n.language !== urlLang) {
      i18n.changeLanguage(urlLang)
    }
  }, [urlLang, i18n])

  // Set HTML dir and lang attributes
  useEffect(() => {
    const isRTL = urlLang === 'ar'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = urlLang === 'ar' ? 'ar' : urlLang === 'fr' ? 'fr' : 'en'
  }, [urlLang])

  // Persist language selection to localStorage
  useEffect(() => {
    if (urlLang) {
      localStorage.setItem('selectedLanguage', urlLang)
    }
  }, [urlLang])

  // Handle initial load: if URL has no prefix but localStorage has a saved language
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage')
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const hasLangPrefix = pathSegments[0] === 'fr' || pathSegments[0] === 'lb'

    // If no prefix in URL and we have a saved language preference (and it's not English)
    if (!hasLangPrefix && savedLang && savedLang !== 'en') {
      const prefix = savedLang === 'fr' ? 'fr' : savedLang === 'ar' ? 'lb' : ''
      if (prefix) {
        const newPath = `/${prefix}${location.pathname === '/' ? '' : location.pathname}`
        navigate(newPath, { replace: true })
        return
      }
    }
    
    // If URL has prefix, ensure i18n is synced
    if (hasLangPrefix && i18n.language !== urlLang) {
      i18n.changeLanguage(urlLang)
    }
  }, []) // Only run on mount

  // Provide clean location via context
  return (
    <LangRouterContext.Provider value={{ cleanLocation, urlLang }}>
      {children}
    </LangRouterContext.Provider>
  )
}

export default LangRouter

