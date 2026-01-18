// Frontend/src/components/Header.js
import React, { useEffect, useState, useRef, useLayoutEffect, useMemo } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ImageWebp from "./ImageWebp"
import CountryWeather from "./CountryWeather"
import { applyLocalePrefix } from "../utils/langRouting"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang } from "../utils/langRouting"
import useNavConfig from "../cms/useNavConfig"
import pageSectionsRegistry from "../cms/pageSectionsRegistry"

function Header({ handleLanguage, currentLanguage, handleCountry, currentCountry = "Country", onHeightChange }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const { urlLang } = useLangRouter()
  const currentLang = urlLang
  const cleanPath = location.pathname.replace(/^\/(fr|lb)(?=\/|$)/, "")
  const isHome = cleanPath === "/" || cleanPath === ""
  const ASSET = process.env.PUBLIC_URL || ""

  const [showCountry, setshowCountry] = useState(false)
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef(null)

  const { config: navConfig, items: navItems, setNavConfig } = useNavConfig()

  const [addOpen, setAddOpen] = useState(false)
  const [newLabel, setNewLabel] = useState({ en: "", fr: "", ar: "" })
  const [pickPageId, setPickPageId] = useState("home")
  const [pickSectionId, setPickSectionId] = useState("")
  const [jumpEnabled, setJumpEnabled] = useState(false)

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const sync = () => {
      try {
        setEditMode(localStorage.getItem("achi_nav_edit_mode_v1") === "1")
      } catch {
        setEditMode(false)
      }
    }

    sync()
    window.addEventListener("storage", sync)
    window.addEventListener("achi_nav_edit_mode_updated", sync)

    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener("achi_nav_edit_mode_updated", sync)
    }
  }, [])

  useLayoutEffect(() => {
    if (!headerRef.current) return

    const measureHeight = () => {
      if (headerRef.current && onHeightChange) {
        const height = headerRef.current.offsetHeight
        onHeightChange(height)
      }
    }

    measureHeight()
    const resizeObserver = new ResizeObserver(measureHeight)
    resizeObserver.observe(headerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [onHeightChange, showCountry, open])

  useEffect(() => {
    document.body.classList.toggle("home-page", isHome)
    return () => document.body.classList.remove("home-page")
  }, [isHome])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      setIsScrolled(scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setPickSectionId("")
    setJumpEnabled(false)
  }, [pickPageId])

  const closeAllDropdowns = () => {
    setshowCountry(false)
  }

  const applyLocaleChange = (newCountry, newLanguage) => {
    const finalCountry = newCountry !== null && newCountry !== undefined ? newCountry : currentCountry
    const finalLanguage = newLanguage !== null && newLanguage !== undefined ? newLanguage : currentLang

    let syncedLanguage = finalLanguage
    if (newCountry) {
      if (newCountry === "France" && finalLanguage !== "fr") {
        syncedLanguage = "fr"
      } else if (newCountry === "Lebanon" && finalLanguage !== "ar") {
        syncedLanguage = "ar"
      }
    }

    applyLocalePrefix({
      currentPathname: location.pathname,
      country: finalCountry,
      language: syncedLanguage,
      navigate,
      onLanguageChange: (lang) => {
        if (handleLanguage) {
          handleLanguage(lang)
          i18n.changeLanguage(lang)
        }
      },
      onCountryChange: (country) => {
        if (handleCountry) {
          handleCountry(country)
        }
      }
    })
  }

  const handleLanguageChange = (lang) => {
    applyLocaleChange(null, lang)
  }

  const handleCountryChange = (country) => {
    applyLocaleChange(country, null)
    setshowCountry(false)
  }

  const goToHomeSection = (id) => {
    closeAllDropdowns()
    const hash = id.startsWith("#") ? id : `#${id}`
    if (!isHome) {
      const home = buildPathWithLang(urlLang, "/")
      navigate(`${home}${hash}`)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }, 200)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
    setOpen(false)
  }

  const headerWrapClass = "fixed top-0 left-0 w-full z-[999999]"

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#FA7800] font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] inline-block"
      : "text-white font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] hover:text-[#FA7800] transition duration-300 inline-block"

  const mobileNavLinkClass = ({ isActive }) =>
    isActive ? "block ltr:ml-[20px] rtl:mr-[20px] text-[#FA7800]" : "block ltr:ml-[20px] rtl:mr-[20px] text-[#FFFFFF]"

  const uid = () => {
    try {
      return `nav-${Date.now()}-${Math.random().toString(16).slice(2)}`
    } catch {
      return `nav-${Date.now()}`
    }
  }

  const defaultIds = useMemo(() => {
    return new Set(["home", "about", "services", "sectors", "clients", "projects", "blog", "gallery", "contact"])
  }, [])

  const defaultItems = useMemo(() => {
    return [
      { id: "home", kind: "route", path: "/", labelKey: "nav.home", enabled: true },
      { id: "about", kind: "route", path: "/about", labelKey: "nav.about", enabled: true },
      { id: "services", kind: "route", path: "/services", labelKey: "nav.services", enabled: true },
      { id: "sectors", kind: "route", path: "/sectors", labelKey: "nav.sectors", enabled: true },
      { id: "clients", kind: "section", targetId: "clients", labelKey: "nav.clients", enabled: true },
      { id: "projects", kind: "route", path: "/projects", labelKey: "nav.projects", enabled: true },
      { id: "blog", kind: "route", path: "/blog", labelKey: "nav.blog", enabled: true },
      { id: "gallery", kind: "route", path: "/gallery", labelKey: "nav.gallery", enabled: true },
      { id: "contact", kind: "section", targetId: "contactForm", labelKey: "nav.contact", enabled: true }
    ]
  }, [])

  const itemsSortedAll = useMemo(() => {
    const list = Array.isArray(navConfig?.items) ? navConfig.items.slice() : []
    return list.sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0))
  }, [navConfig])

  const customItems = useMemo(() => {
    const list = Array.isArray(navConfig?.items) ? navConfig.items : []
    return list
      .filter((x) => x && x.enabled !== false)
      .filter((x) => !defaultIds.has(x.id))
      .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0))
  }, [navConfig, defaultIds])

  const nextOrder = useMemo(() => {
    const base = [...defaultItems, ...itemsSortedAll]
    const max = base.reduce((m, it) => Math.max(m, Number(it?.order || 0)), 0)
    return max + 10
  }, [defaultItems, itemsSortedAll])

  const resolveLabel = (it) => {
    if (!it) return ""
    if (it.labelKey) return t(it.labelKey)
    if (it.label) {
      if (currentLang === "fr") return it.label.fr || it.label.en || it.label.ar || ""
      if (currentLang === "ar") return it.label.ar || it.label.en || it.label.fr || ""
      return it.label.en || it.label.fr || it.label.ar || ""
    }
    return ""
  }

  const pageOptions = useMemo(() => {
    return [
      { id: "home", label: t("nav.home"), path: "/" },
      { id: "about", label: t("nav.about"), path: "/about" },
      { id: "services", label: t("nav.services"), path: "/services" },
      { id: "sectors", label: t("nav.sectors"), path: "/sectors" },
      { id: "projects", label: t("nav.projects"), path: "/projects" },
      { id: "blog", label: t("nav.blog"), path: "/blog" },
      { id: "gallery", label: t("nav.gallery"), path: "/gallery" }
    ]
  }, [t])

  const selectedPage = useMemo(() => {
    return pageOptions.find((p) => p.id === pickPageId) || pageOptions[0]
  }, [pageOptions, pickPageId])

  const sectionOptions = useMemo(() => {
    const raw = pageSectionsRegistry?.[pickPageId]
    const list = Array.isArray(raw) ? raw : []
    return list
      .filter((x) => x && x.id)
      .map((x) => ({ id: x.id, label: x.label || x.id }))
  }, [pickPageId])

  const computedTo = useMemo(() => {
    const base = buildPathWithLang(urlLang, selectedPage?.path || "/")
    const hash = jumpEnabled && pickSectionId ? `#${pickSectionId}` : ""
    return `${base}${hash}`
  }, [urlLang, selectedPage, jumpEnabled, pickSectionId])

  const addNavItem = () => {
    const id = uid()

    const en = (newLabel.en || "").trim()
    const fr = (newLabel.fr || "").trim()
    const ar = (newLabel.ar || "").trim()

    const autoLabel =
      (jumpEnabled && pickSectionId
        ? (sectionOptions.find((s) => s.id === pickSectionId)?.label || "")
        : (selectedPage?.label || "")) || "New Item"

    const label = {
      en: en || autoLabel,
      fr: fr || en || autoLabel,
      ar: ar || en || autoLabel
    }

    const path = selectedPage?.path || "/"
    const hash = jumpEnabled && pickSectionId ? pickSectionId : ""

    const full = {
      id,
      kind: "route",
      path,
      hash,
      label,
      order: nextOrder,
      enabled: true
    }

    setNavConfig((prev) => {
      const items = Array.isArray(prev?.items) ? prev.items : []
      return { ...(prev || {}), items: [...items, full] }
    })

    setAddOpen(false)
    setNewLabel({ en: "", fr: "", ar: "" })
    setPickPageId("home")
    setPickSectionId("")
    setJumpEnabled(false)

    navigate(computedTo)
  }

  const removeNavItem = (id) => {
    if (defaultIds.has(id)) return
    setNavConfig((prev) => {
      const items = Array.isArray(prev?.items) ? prev.items : []
      return { ...(prev || {}), items: items.filter((x) => x && x.id !== id) }
    })
  }

  const renderNavItemDesktop = (it) => {
    const text = resolveLabel(it)
    const coreClass =
      "text-white font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] hover:text-[#FA7800] transition duration-300 inline-block"

    if (it.kind === "section") {
      return (
        <div className="relative inline-flex items-center" key={it.id}>
          <button className={coreClass} onClick={() => goToHomeSection(it.targetId || "contactForm")}>
            {text}
          </button>
          {editMode ? (
            <button
              type="button"
              onClick={() => removeNavItem(it.id)}
              className="absolute -top-[10px] -right-[10px] w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[12px] font-[900] flex items-center justify-center"
              aria-label="Delete menu item"
              title="Delete"
            >
              ×
            </button>
          ) : null}
        </div>
      )
    }

    const base = buildPathWithLang(urlLang, it.path || "/")
    const to = `${base}${it.hash ? `#${it.hash}` : ""}`

    return (
      <div className="relative inline-flex items-center" key={it.id}>
        <NavLink to={to} className={navLinkClass} onClick={closeAllDropdowns}>
          {text}
        </NavLink>
        {editMode ? (
          <button
            type="button"
            onClick={() => removeNavItem(it.id)}
            className="absolute -top-[10px] -right-[10px] w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[12px] font-[900] flex items-center justify-center"
            aria-label="Delete menu item"
            title="Delete"
          >
            ×
          </button>
        ) : null}
      </div>
    )
  }

  const renderNavItemMobile = (it) => {
    const text = resolveLabel(it)

    if (it.kind === "section") {
      return (
        <li key={it.id} className="relative">
          <div className="relative inline-flex items-center">
            <p
              className="font-[500] text-[20px] cursor-pointer hover:text-[#FA7800] transition duration-500 font-saira py-2"
              onClick={() => goToHomeSection(it.targetId || "contactForm")}
            >
              {text}
            </p>

            {editMode ? (
              <button
                type="button"
                onClick={() => removeNavItem(it.id)}
                className="ml-[10px] w-[22px] h-[22px] rounded-full bg-red-600 text-white text-[14px] font-[900] flex items-center justify-center"
                aria-label="Delete menu item"
                title="Delete"
              >
                ×
              </button>
            ) : null}
          </div>
        </li>
      )
    }

    const base = buildPathWithLang(urlLang, it.path || "/")
    const to = `${base}${it.hash ? `#${it.hash}` : ""}`

    return (
      <li key={it.id} className="relative inline-flex items-center">
        <NavLink to={to} className={mobileNavLinkClass} onClick={() => setOpen(false)}>
          <p className="font-[500] text-[20px] font-saira py-2">{text}</p>
        </NavLink>

        {editMode ? (
          <button
            type="button"
            onClick={() => removeNavItem(it.id)}
            className="ml-[10px] w-[22px] h-[22px] rounded-full bg-red-600 text-white text-[14px] font-[900] flex items-center justify-center"
            aria-label="Delete menu item"
            title="Delete"
          >
            ×
          </button>
        ) : null}
      </li>
    )
  }

  return (
    <>
      <header ref={headerRef} className={headerWrapClass}>
        <div
          dir="ltr"
          className="header-top-bar bg-[#28509E] hidden md:flex flex-row justify-between items-center pt-[10px] pb-[10px] border-b-[0.5px] border-white/15 px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]"
        >
          <div className="flex items-center">
            <Link to={`/`} className="hidden md:block" onClick={() => { closeAllDropdowns(); setOpen(false) }}>
              <ImageWebp
                srcWebp={`${ASSET}/assets/ArchiScaffoldinglogo_lossyalpha.webp`}
                src={`${ASSET}/assets/ArchiScaffoldinglogo_lossyalpha.webp`}
                alt="siteLogo"
                className="2xl:w-[150px] w-[100px]"
              />
            </Link>
          </div>

          <div className="flex flex-row items-center gap-[20px] md:gap-[20px] lg:gap-[20px] xl:gap-[20px] flex-nowrap">
            <div className="inline-flex items-center gap-[8px]">
              <ImageWebp
                srcWebp={`${ASSET}/assets/emailIcon_lossyalpha.webp`}
                src={`${ASSET}/assets/emailIcon_lossyalpha.webp`}
                className="w-[20px] h-[20px] flex-shrink-0"
                alt="emailIcon"
              />
              <span className="text-[14px] text-white font-[500] leading-[1] font-saira whitespace-nowrap inline-block">achi.gr@hotmail.com</span>
            </div>

            <div className="inline-flex items-center gap-[8px]">
              <ImageWebp
                srcWebp={`${ASSET}/assets/wpicon_lossyalpha.webp`}
                src={`${ASSET}/assets/wpicon_lossyalpha.webp`}
                className="w-[20px] h-[20px] flex-shrink-0"
                alt="whatsappIcon"
              />
              <span className="text-[14px] text-white font-[500] leading-[1] font-saira whitespace-nowrap inline-block" dir="ltr">
                +96103322811
              </span>
            </div>

            <div className="hidden xl:inline-flex items-center gap-[20px]">
              <a className="cursor-pointer inline-flex items-center" href="https://facebook.com/ACHISCAFF" target="_blank" rel="noreferrer">
                <img src={`${ASSET}/assets/iconoir_facebook.svg`} alt="Facebook" className="w-[20px] h-[20px]" />
              </a>
              <a className="cursor-pointer inline-flex items-center" href="https://www.instagram.com/achiscaffoldinglb" target="_blank" rel="noreferrer">
                <img src={`${ASSET}/assets/mdi_instagram.svg`} alt="Instagram" className="w-[20px] h-[20px]" />
              </a>
              <a className="cursor-pointer inline-flex items-center" href="https://twitter.com/AchiScaffolding" target="_blank" rel="noreferrer">
                <img src={`${ASSET}/assets/ri_twitter-x-fill.svg`} alt="X" className="w-[20px] h-[20px]" />
              </a>
              <a className="cursor-pointer inline-flex items-center" href="https://www.linkedin.com/company/achi-scaffolding/" target="_blank" rel="noreferrer">
                <img src={`${ASSET}/assets/basil_linkedin-outline.svg`} alt="LinkedIn" className="w-[20px] h-[20px]" />
              </a>
              <a className="cursor-pointer inline-flex items-center" href="https://www.tiktok.com/@achiscaffolding" target="_blank" rel="noreferrer">
                <img src={`${ASSET}/assets/ph_tiktok-logo.svg`} alt="TikTok" className="w-[20px] h-[20px]" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-[18px] relative flex-nowrap">
            <div className="inline-flex items-center gap-[8px] cursor-pointer relative" onClick={() => { closeAllDropdowns(); setshowCountry(!showCountry) }}>
              <CountryWeather country="Lebanon" coordinates={{ lat: 33.8938, lon: 35.5018 }} />
              <span className="text-white font-saira font-[500] text-[14px] leading-[1] whitespace-nowrap inline-block">Lebanon</span>
              <ExpandMoreIcon fontSize={"small"} className="text-white cursor-pointer flex-shrink-0" style={{ fontSize: "18px" }} />
              <div className={`absolute right-0 top-[50px] bg-white p-[16px] ${showCountry ? "flex" : "hidden"} z-[999]`}>
                <div className="flex flex-col">
                  <span
                    className="text-[#00204A] font-saira font-[500] text-[14px] leading-[1] cursor-pointer hover:text-[#FA7800] transition duration-500 inline-block"
                    onClick={() => handleCountryChange("Lebanon")}
                  >
                    Lebanon
                  </span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-[8px]" role="group" aria-label="Language selector">
              <button
                type="button"
                onClick={() => handleLanguageChange("en")}
                aria-label="Switch to English"
                aria-current={currentLang === "en" ? "true" : "false"}
                className={`lang-btn ${currentLang === "en" ? "is-active" : ""}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange("fr")}
                aria-label="Switch to French"
                aria-current={currentLang === "fr" ? "true" : "false"}
                className={`lang-btn ${currentLang === "fr" ? "is-active" : ""}`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange("ar")}
                aria-label="Switch to Arabic"
                aria-current={currentLang === "ar" ? "true" : "false"}
                className={`lang-btn ${currentLang === "ar" ? "is-active" : ""}`}
              >
                AR
              </button>
            </div>
          </div>
        </div>

        <nav
          dir="ltr"
          className={`hidden md:block transition-all duration-300 ${
            isHome
              ? `relative border-b-0 ${isScrolled ? "bg-[#28509E]/90 backdrop-blur-md" : "bg-transparent"}`
              : `relative border-b-[#FFFFFF]/70 border-b-[0.5px] border-solid ${isScrolled ? "bg-[#28509E] backdrop-blur-md" : "bg-[#28509E]"}`
          }`}
        >
          <div className="w-full flex justify-center">
            <ul
              className={`${
                isHome
                  ? "flex gap-8 py-[18px] px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]"
                  : "flex gap-8 py-[12px] px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]"
              }`}
            >
              <li><NavLink to={buildPathWithLang(urlLang, "/")} className={navLinkClass} onClick={closeAllDropdowns}>{t("nav.home")}</NavLink></li>
              <li><NavLink to={buildPathWithLang(urlLang, "/about")} className={navLinkClass} onClick={closeAllDropdowns}>{t("nav.about")}</NavLink></li>
              <li><NavLink to={buildPathWithLang(urlLang, "/services")} className={navLinkClass} onClick={closeAllDropdowns}>{t("nav.services")}</NavLink></li>
              <li><NavLink to={buildPathWithLang(urlLang, "/sectors")} className={navLinkClass} onClick={closeAllDropdowns}>{t("nav.sectors")}</NavLink></li>

              <li>
                <button
                  className="text-white font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] hover:text-[#FA7800] transition duration-300 inline-block"
                  onClick={() => goToHomeSection("clients")}
                >
                  {t("nav.clients")}
                </button>
              </li>

              <li><NavLink to={buildPathWithLang(urlLang, "/projects")} className={navLinkClass} onClick={closeAllDropdowns}>{t("nav.projects")}</NavLink></li>
              <li><NavLink to={buildPathWithLang(urlLang, "/blog")} className={navLinkClass} onClick={closeAllDropdowns}>{t("nav.blog")}</NavLink></li>
              <li><NavLink to={buildPathWithLang(urlLang, "/gallery")} className={navLinkClass} onClick={closeAllDropdowns}>{t("nav.gallery")}</NavLink></li>

              <li className="flex items-center">
                <button
                  className="text-white font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] hover:text-[#FA7800] transition duration-300 inline-block"
                  onClick={() => goToHomeSection("contactForm")}
                >
                  {t("nav.contact")}
                </button>
              </li>

              {customItems.map((it) => (
                <li key={it.id} className="flex items-center">
                  {renderNavItemDesktop(it)}
                </li>
              ))}

              {editMode ? (
                <li className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setAddOpen(true)}
                    className="w-[26px] h-[26px] rounded-[6px] border border-white text-white font-[900] leading-none flex items-center justify-center"
                    aria-label="Add menu item"
                    title="Add menu item"
                  >
                    +
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>

        <div className="bg-[#28509E] flex md:hidden flex-row justify-between items-center pt-[8px] pb-[8px] sm:pr-[20px] border-b-[#FFFFFF]/70 border-b-[0.5px] border-solid">
          <div className="flex flex-row justify-between items-center w-[100%] px-[8px] sm:px-[0px] ltr:ml-[20px] rtl:mr-[20px]">
            <Link to={`/`} onClick={() => { closeAllDropdowns(); setOpen(false) }}>
              <img className="w-[90px]" src={`${ASSET}/assets/ArchiScaffoldinglogo.png`} alt="siteLogo" />
            </Link>
          </div>

          <div className="ltr:mr-[20px] rtl:ml-[20px] md:hidden">
            <MenuIcon sx={{ fontSize: "40px" }} className="text-white cursor-pointer" onClick={() => { closeAllDropdowns(); setOpen(!open) }} />
          </div>
        </div>
      </header>

      <ul
        className={`md:hidden bg-[#28509E] text-white fixed w-full top-0 overflow-y-auto bottom-0 py-[40px] text-start duration-500 ${
          open ? "left-0" : "left-[-100%]"
        } z-[99999999] ltr:pl-3 rtl:pr-3`}
      >
        <li>
          <div className="flex justify-between items-center mb-[25px]">
            <div className="flex flex-row justify-between items-center w-[100%] px-[8px] sm:px-[0px]">
              <Link to={`/`} onClick={() => setOpen(false)}>
                <ImageWebp
                  srcWebp={`${ASSET}/assets/ArchiScaffoldinglogo_lossyalpha.webp`}
                  className="w-[90px]"
                  src={`${ASSET}/assets/ArchiScaffoldinglogo_lossyalpha.webp`}
                  alt="siteLogo"
                />
              </Link>
            </div>
            <div className="ltr:mr-5 rtl:ml-5">
              <CloseIcon fontSize={"large"} className="text-[#BED0FF] cursor-pointer" onClick={() => setOpen(false)} />
            </div>
          </div>
        </li>

        {Array.isArray(navItems) && navItems.length ? (
          <>
            {navItems.map((it) => renderNavItemMobile(it))}
            {editMode ? (
              <li className="ltr:ml-[20px] rtl:mr-[20px] mt-[10px]">
                <button
                  type="button"
                  onClick={() => { setAddOpen(true); setOpen(false) }}
                  className="w-[42px] h-[42px] rounded-[10px] border border-white text-white font-[900] text-[22px] leading-none flex items-center justify-center"
                  aria-label="Add menu item"
                  title="Add menu item"
                >
                  +
                </button>
              </li>
            ) : null}
          </>
        ) : null}

        <li className="ltr:ml-[20px] rtl:mr-[20px] mt-[30px] pt-[20px] border-t-[#FFFFFF] border-t-[1px] border-solid">
          <p className="font-[500] text-[18px] font-saira mb-[16px] text-white/90">Language</p>
          <div className="inline-flex items-center gap-[8px]" role="group" aria-label="Language selector">
            <button
              type="button"
              onClick={() => { handleLanguageChange("en"); setOpen(false) }}
              aria-label="Switch to English"
              aria-current={currentLang === "en" ? "true" : "false"}
              className={`lang-btn ${currentLang === "en" ? "is-active" : ""}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => { handleLanguageChange("fr"); setOpen(false) }}
              aria-label="Switch to French"
              aria-current={currentLang === "fr" ? "true" : "false"}
              className={`lang-btn ${currentLang === "fr" ? "is-active" : ""}`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => { handleLanguageChange("ar"); setOpen(false) }}
              aria-label="Switch to Arabic"
              aria-current={currentLang === "ar" ? "true" : "false"}
              className={`lang-btn ${currentLang === "ar" ? "is-active" : ""}`}
            >
              AR
            </button>
          </div>
        </li>
      </ul>

      {editMode && addOpen ? (
        <div className="fixed inset-0 z-[999999999] bg-black/50 flex items-center justify-center p-[16px]">
          <div className="bg-white w-full max-w-[560px] rounded-[14px] p-[16px]">
            <div className="flex items-center justify-between mb-[12px]">
              <div className="font-[900] text-[18px]">Add Menu Item</div>
              <button type="button" onClick={() => setAddOpen(false)} className="font-[900] text-[18px]">
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-[10px]">
              <div className="grid grid-cols-3 gap-[10px]">
                <input value={newLabel.en} onChange={(e) => setNewLabel((p) => ({ ...p, en: e.target.value }))} className="border p-[10px] rounded-[10px]" placeholder="Name EN (optional)" />
                <input value={newLabel.fr} onChange={(e) => setNewLabel((p) => ({ ...p, fr: e.target.value }))} className="border p-[10px] rounded-[10px]" placeholder="Name FR (optional)" />
                <input value={newLabel.ar} onChange={(e) => setNewLabel((p) => ({ ...p, ar: e.target.value }))} className="border p-[10px] rounded-[10px]" placeholder="Name AR (optional)" />
              </div>

              <label className="flex flex-col gap-[6px]">
                <span className="font-[800]">Choose page</span>
                <select value={pickPageId} onChange={(e) => setPickPageId(e.target.value)} className="border p-[10px] rounded-[10px]">
                  {pageOptions.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-[10px]">
                <input type="checkbox" checked={jumpEnabled} onChange={(e) => setJumpEnabled(e.target.checked)} />
                <span className="font-[800]">Jump to section (optional)</span>
              </label>

              {jumpEnabled ? (
                <label className="flex flex-col gap-[6px]">
                  <span className="font-[800]">Choose section</span>
                  <select
                    value={pickSectionId}
                    onChange={(e) => setPickSectionId(e.target.value)}
                    className="border p-[10px] rounded-[10px]"
                    disabled={!sectionOptions.length}
                  >
                    <option value="">{sectionOptions.length ? "Choose a section..." : "No sections registered for this page"}</option>
                    {sectionOptions.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </label>
              ) : null}

              <div className="rounded-xl bg-gray-50 p-3 text-sm">
                <div className="font-semibold mb-1">Preview</div>
                <div className="break-all">{computedTo}</div>
              </div>

              <div className="flex gap-[10px] justify-end mt-[6px]">
                <button type="button" onClick={() => setAddOpen(false)} className="px-[14px] py-[10px] rounded-[10px] bg-gray-200 font-[800]">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addNavItem}
                  disabled={jumpEnabled && sectionOptions.length > 0 && !pickSectionId}
                  className={`px-[14px] py-[10px] rounded-[10px] font-[900] ${
                    jumpEnabled && sectionOptions.length > 0 && !pickSectionId ? "bg-gray-300 text-gray-500" : "bg-[#28509E] text-white"
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Header
