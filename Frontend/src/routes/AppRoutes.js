// Frontend/src/routes/AppRoutes.js
import { useEffect, useMemo, useState } from "react"
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products"
import Projects from "../pages/Projects"
import Sectors from "../pages/Sectors"
import ProjectDetails from "../pages/ProjectDetails"
import Gallery from "../pages/Gallery"
import Blog from "../pages/Blog"
import BlogItem from "../pages/BlogItem"
import Services from "../pages/Services"
import SingleService from "../components/services/SingleService"
import PageNotFound from "../pages/PageNotFound"
import AdminHomeEditor from "../pages/AdminHomeEditor"

import LangRouter, { useLangRouter } from "../routing/LangRouter"
import RouteSeo from "../seo/RouteSeo"
import { normalizeTrailingSlash } from "../seo/urlNormalizer"
import { initMixedContentGuard } from "../seo/mixedContentGuard"
import { stripPublicBase } from "../utils/langRouting"

import "glider-js/glider.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function AppRoutesInner({
  showMenu,
  setshowMenu,
  handleLanguage,
  currentLanguage,
  handleCountry,
  currentCountry
}) {
  const { i18n } = useTranslation()
  const { cleanLocation } = useLangRouter()
  const navigate = useNavigate()
  const location = useLocation()
  const [headerHeight, setHeaderHeight] = useState(0)

  const isHome = useMemo(() => cleanLocation.pathname === "/", [cleanLocation.pathname])

  const localBusinessSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://achi-scaffolding.github.io/#organization",
      name: "ACHI Scaffolding",
      alternateName: "ACHI",
      url: "https://achi-scaffolding.github.io",
      logo: "https://achi-scaffolding.github.io/assets/ArchiScaffoldinglogo.png",
      image: "https://achi-scaffolding.github.io/assets/ArchiScaffoldinglogo.png",
      description:
        "ACHI Scaffolding delivers engineered scaffolding and temporary works solutions for construction, industrial, and complex urban projects across Lebanon.",
      telephone: "+96103322811",
      email: "achi.gr@hotmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LB",
        addressRegion: "Lebanon",
        addressLocality: "Lebanon"
      },
      areaServed: [
        { "@type": "City", name: "Beirut" },
        { "@type": "City", name: "Mount Lebanon" },
        { "@type": "City", name: "North Lebanon" },
        { "@type": "City", name: "South Lebanon" },
        { "@type": "City", name: "Bekaa" }
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+96103322811",
          contactType: "customer support",
          areaServed: "LB",
          availableLanguage: ["en", "fr", "ar"]
        },
        {
          "@type": "ContactPoint",
          telephone: "+96103322811",
          email: "achi.gr@hotmail.com",
          contactType: "technical support",
          areaServed: "LB",
          availableLanguage: ["en", "fr", "ar"]
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          areaServed: "LB",
          availableLanguage: ["en", "fr", "ar"]
        }
      ],
      sameAs: ["https://www.facebook.com/ACHISCAFF", "https://www.instagram.com/achiscaffoldinglb"]
    }
  }, [])

  useEffect(() => {
    initMixedContentGuard()
  }, [])

  useEffect(() => {
    normalizeTrailingSlash(navigate, location.pathname + (location.search || "") + (location.hash || ""))
  }, [navigate, location.pathname, location.search, location.hash])

  useEffect(() => {
    const lang = (i18n.resolvedLanguage || i18n.language || "").toLowerCase()
    const desiredPrefix = lang.startsWith("ar") ? "/lb" : lang.startsWith("fr") ? "/fr" : ""

    const rawPath = stripPublicBase(location.pathname) || "/"
    if (rawPath === "/admin" || rawPath.startsWith("/admin/")) return

    const hasFr = rawPath === "/fr" || rawPath.startsWith("/fr/")
    const hasLb = rawPath === "/lb" || rawPath.startsWith("/lb/")
    const hasAnyPrefix = hasFr || hasLb

    const withoutPrefix = hasFr ? rawPath.replace(/^\/fr/, "") || "/" : hasLb ? rawPath.replace(/^\/lb/, "") || "/" : rawPath

    if (!desiredPrefix) {
      if (hasAnyPrefix) {
        const target = `${withoutPrefix}${location.search || ""}${location.hash || ""}`
        navigate(target, { replace: true })
      }
      return
    }

    const desiredHasPrefix = desiredPrefix === "/fr" ? hasFr : hasLb
    if (!desiredHasPrefix) {
      const target = `${desiredPrefix}${withoutPrefix}${location.search || ""}${location.hash || ""}`
      navigate(target, { replace: true })
    }
  }, [
    i18n.language,
    i18n.resolvedLanguage,
    location.pathname,
    location.search,
    location.hash,
    navigate
  ])

  useEffect(() => {
    if (headerHeight === 0) return

    const scrollToHash = (retryCount = 0) => {
      const hash = window.location.hash || location.hash
      if (!hash) return

      const element = document.querySelector(hash) || document.getElementById(hash.slice(1))
      if (!element) {
        if (retryCount < 3) setTimeout(() => scrollToHash(retryCount + 1), 100 * (retryCount + 1))
        return
      }

      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - 20
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }

    const onHash = () => scrollToHash()
    if (location.hash || window.location.hash) scrollToHash()

    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [headerHeight, location.pathname, location.hash])

  return (
    <>
      <RouteSeo />
      <ScrollToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="App" onClick={() => { if (showMenu) setshowMenu(false) }}>
        <Header
          handleLanguage={handleLanguage}
          currentLanguage={currentLanguage}
          handleCountry={handleCountry}
          currentCountry={currentCountry}
          onHeightChange={setHeaderHeight}
        />

        <div style={headerHeight > 0 ? { paddingTop: `${headerHeight}px` } : {}} className="main-content-wrapper">
          <Routes location={cleanLocation} key={cleanLocation.pathname}>
            <Route path="/" element={<Home showMenu={showMenu} setshowMenu={setshowMenu} direction={i18n.dir()} userLang={i18n.language} />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/services" element={<Services showMenu={showMenu} setshowMenu={setshowMenu} userLang={i18n.language} />} />
            <Route path="/services/serviceItem" element={<SingleService />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-post-1" element={<BlogItem />} />
            <Route path="/blog-post-2" element={<BlogItem />} />
            <Route path="/blog-post-3" element={<BlogItem />} />
            <Route path="/admin/home" element={<AdminHomeEditor />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default function AppRoutes(props) {
  return (
    <LangRouter>
      <AppRoutesInner {...props} />
    </LangRouter>
  )
}
