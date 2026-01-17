// src/components/Footer.js
import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ImageWebp from "./ImageWebp"
import { getLangFromPath } from "../utils/langRouting"

const Footer = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const ASSET = process.env.PUBLIC_URL || ""

  const currentLang = getLangFromPath(location.pathname)
  const currentYear = new Date().getFullYear()

  const langPath = (path) => {
    const prefix = currentLang === "fr" ? "fr" : currentLang === "ar" ? "lb" : ""
    if (!prefix) return path
    return `/${prefix}${path}`
  }

  const cleanPath = location.pathname.replace(/^\/(fr|lb)(?=\/|$)/, "")
  const isHome = cleanPath === "/" || cleanPath === ""

  const goToHomeSection = (id) => {
    const hash = id.startsWith('#') ? id : `#${id}`
    if (!isHome) {
      // Navigate to language-aware homepage with hash
      navigate(`${langPath("/")}${hash}`)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }, 250)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
  }

  return (
    <footer className="bg-[#28509E] border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] pt-[28px] md:pt-[36px] pb-[0]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-[24px] md:gap-y-[28px] gap-x-[32px] md:gap-x-[40px] lg:gap-x-[48px] mb-[24px] md:mb-[28px]">
          {/* Column 1: Brand */}
          <div className="flex flex-col justify-start items-start">
            <Link to={langPath("/")} className="focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm">
              <ImageWebp
                srcWebp="/assets/ArchiScaffoldinglogo_lossyalpha.webp"
                src="/assets/ArchiScaffoldinglogo_lossyalpha.webp"
                alt={t("footer.logoAlt")}
                className="max-w-[140px] h-auto block"
              />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col justify-start items-start">
            <nav aria-label={t("footer.links.ariaLabel") || "Footer navigation"}>
              <div className="grid grid-cols-2 gap-x-[24px] gap-y-[8px] w-full">
                <ul className="space-y-[8px]" role="list">
                  <li>
                    <Link
                      to={langPath("/")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.home")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={langPath("/about")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.about")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={langPath("/services")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.services")}
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => goToHomeSection("clients")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] text-left focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.clients")}
                    </button>
                  </li>
                </ul>

                <ul className="space-y-[8px]" role="list">
                  <li>
                    <Link
                      to={langPath("/sectors")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.sectors")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={langPath("/projects")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.projects")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={langPath("/blog")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.blog")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={langPath("/gallery")}
                      className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 block py-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                    >
                      {t("footer.links.gallery")}
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Column 3: Contact (NAP) */}
          <div className="flex flex-col justify-start items-start">
            <h3 className="font-[Rajdhani] text-[16px] font-[700] uppercase mb-[12px] text-white tracking-[0.5px]">
              {t("footer.contact.title")}
            </h3>
            <address className="not-italic space-y-[10px]">
              <div className="flex items-center">
                <span className="sr-only">{t("footer.contact.phoneLabel") || "Phone"}: </span>
                <a
                  href={`tel:${t("footer.contact.phoneHref")}`}
                  className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                  aria-label={`${t("footer.contact.phoneLabel") || "Phone"}: ${t("footer.contact.phoneText")}`}
                >
                  <i className="fa-solid fa-phone text-[14px] w-[18px] mr-[10px] text-white/90 flex-shrink-0" aria-hidden="true"></i>
                  {t("footer.contact.phoneText")}
                </a>
              </div>

              <div className="flex items-start">
                <span className="sr-only">{t("footer.contact.emailLabel") || "Email"}: </span>
                <a
                  href={`mailto:${t("footer.contact.emailHref")}`}
                  className="font-['Open_Sans'] text-white/90 text-[14px] hover:text-[#FF8A00] transition-colors duration-200 flex items-center break-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                  aria-label={`${t("footer.contact.emailLabel") || "Email"}: ${t("footer.contact.emailText")}`}
                >
                  <i className="fa-regular fa-envelope text-[14px] w-[18px] mr-[10px] text-white/90 flex-shrink-0 mt-[2px]" aria-hidden="true"></i>
                  {t("footer.contact.emailText")}
                </a>
              </div>

              <div className="flex items-center">
                <i className="fa-solid fa-location-dot text-[14px] w-[18px] mr-[10px] text-white/90 flex-shrink-0" aria-hidden="true"></i>
                <span className="font-['Open_Sans'] text-white/90 text-[14px]">
                  {t("footer.contact.location")}
                </span>
              </div>
            </address>
          </div>

          {/* Column 4: Social Media */}
          <div className="flex flex-col justify-start items-start">
            <h3 className="font-[Rajdhani] text-[16px] font-[700] uppercase mb-[12px] text-white tracking-[0.5px]">
              {t("footer.social.title")}
            </h3>
            <div className="flex gap-[12px] items-center flex-nowrap">
              <a
                href={t("footer.social.facebook.url")}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-200 p-[8px] inline-flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                aria-label={t("footer.social.facebook.aria")}
              >
                <img
                  src={`${ASSET}${t("footer.social.facebook.icon")}`}
                  alt={t("footer.social.facebook.alt")}
                  className="w-[20px] h-[20px]"
                  width="20"
                  height="20"
                />
              </a>

              <a
                href={t("footer.social.instagram.url")}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-200 p-[8px] inline-flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                aria-label={t("footer.social.instagram.aria")}
              >
                <img
                  src={`${ASSET}${t("footer.social.instagram.icon")}`}
                  alt={t("footer.social.instagram.alt")}
                  className="w-[20px] h-[20px]"
                  width="20"
                  height="20"
                />
              </a>

              <a
                href={t("footer.social.x.url")}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-200 p-[8px] inline-flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                aria-label={t("footer.social.x.aria")}
              >
                <img
                  src={`${ASSET}${t("footer.social.x.icon")}`}
                  alt={t("footer.social.x.alt")}
                  className="w-[20px] h-[20px]"
                  width="20"
                  height="20"
                />
              </a>

              <a
                href={t("footer.social.linkedin.url")}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-200 p-[8px] inline-flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                aria-label={t("footer.social.linkedin.aria")}
              >
                <img
                  src={`${ASSET}${t("footer.social.linkedin.icon")}`}
                  alt={t("footer.social.linkedin.alt")}
                  className="w-[20px] h-[20px]"
                  width="20"
                  height="20"
                />
              </a>

              <a
                href={t("footer.social.tiktok.url")}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-200 p-[8px] inline-flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E] rounded-sm"
                aria-label={t("footer.social.tiktok.aria")}
                >
                <img
                  src={`${ASSET}${t("footer.social.tiktok.icon")}`}
                  alt={t("footer.social.tiktok.alt")}
                  className="w-[20px] h-[20px]"
                  width="20"
                  height="20"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/10 pt-[20px] md:pt-[24px] pb-[8px]">
          <p className="text-[12px] md:text-[13px] text-white/70 font-['Open_Sans'] text-center">
            © {currentYear} ACHI Scaffolding. {t("footer.copyright") || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
