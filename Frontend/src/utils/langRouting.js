/**
 * Language routing utilities
 * Maps URL prefixes to i18n languages:
 * - /fr → fr
 * - /lb → ar (Arabic/Lebanon)
 * - / (no prefix) → en (default)
 */

export const SUPPORTED_PREFIXES = ["fr", "lb"]

const trimSlashes = (s) => (s || "").replace(/^\/+|\/+$/g, "")

const getPublicBasePath = () => {
  const raw = process.env.PUBLIC_URL || ""
  if (!raw) return ""
  try {
    if (/^https?:\/\//i.test(raw)) {
      const u = new URL(raw)
      return "/" + trimSlashes(u.pathname)
    }
  } catch (e) {}
  return "/" + trimSlashes(raw)
}

export const stripPublicBase = (pathname) => {
  const p = pathname || "/"
  const base = getPublicBasePath()

  if (!base || base === "/") return p
  if (p === base) return "/"
  if (p.startsWith(base + "/")) return p.slice(base.length) || "/"
  return p
}

export const getCountryPrefix = (country) => {
  if (country === "France") return "fr"
  if (country === "Lebanon") return "lb"
  return ""
}

export const getLocalePrefix = ({ country, language }) => {
  const countryPrefix = country ? getCountryPrefix(country) : ""
  const langPrefix = language ? getLangPrefix(language) : ""

  if (language === "en") {
    return ""
  }

  if (countryPrefix && langPrefix && countryPrefix === langPrefix) {
    return countryPrefix
  }

  if (langPrefix) return langPrefix
  if (countryPrefix) return countryPrefix

  return ""
}

export const getLangFromPath = (pathname) => {
  const clean = stripPublicBase(pathname)
  const segments = clean.split("/").filter(Boolean)
  const firstSegment = segments[0]?.toLowerCase()

  if (firstSegment === "fr") return "fr"
  if (firstSegment === "lb") return "ar"
  return "en"
}

export const getLangPrefix = (lang) => {
  if (lang === "fr") return "fr"
  if (lang === "ar") return "lb"
  return ""
}

export const stripLocalePrefix = (pathname, supportedPrefixes = SUPPORTED_PREFIXES) => {
  const clean = stripPublicBase(pathname)
  const segments = clean.split("/").filter(Boolean)
  const firstSegment = segments[0]?.toLowerCase()

  if (supportedPrefixes.includes(firstSegment)) {
    const rest = "/" + segments.slice(1).join("/")
    return rest === "/" ? "/" : rest
  }

  return clean || "/"
}

export const stripLangPrefix = stripLocalePrefix

export const buildLocalizedPath = (prefix, pathnameWithoutPrefix) => {
  const normalizedPath = pathnameWithoutPrefix.startsWith("/") ? pathnameWithoutPrefix : `/${pathnameWithoutPrefix}`

  if (!prefix) {
    return normalizedPath
  }

  return `/${prefix}${normalizedPath}`
}

export const buildPathWithLang = (lang, cleanPath) => {
  const prefix = getLangPrefix(lang)
  return buildLocalizedPath(prefix, cleanPath)
}

export const prefixToLang = (prefix) => {
  if (prefix === "fr") return "fr"
  if (prefix === "lb") return "ar"
  return "en"
}

export const applyLocalePrefix = ({ currentPathname, country, language, navigate, onLanguageChange, onCountryChange }) => {
  const cleanPath = stripLocalePrefix(currentPathname)

  const newPrefix = getLocalePrefix({ country, language })

  const newPath = buildLocalizedPath(newPrefix, cleanPath)

  const currentClean = stripPublicBase(currentPathname) || "/"

  if (navigate && newPath !== currentClean) {
    navigate(newPath)
  }

  if (language && onLanguageChange) {
    onLanguageChange(language)
  }

  if (country && onCountryChange) {
    onCountryChange(country)
  }

  return newPath
}

export const withLangHash = (pathname, sectionHash) => {
  const currentLang = getLangFromPath(pathname)
  const prefix = getLangPrefix(currentLang)
  const hash = sectionHash.startsWith("#") ? sectionHash : `#${sectionHash}`

  if (!prefix) {
    return `/${hash}`
  }

  return `/${prefix}/${hash}`
}
