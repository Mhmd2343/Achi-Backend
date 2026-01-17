// Frontend/src/pages/About.js
import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import StatsHighlights from "../components/StatsHighlights"
import SEO from "../components/SEO"
import { getLangFromPath } from "../utils/langRouting"

const About = () => {
  const publicUrl = process.env.PUBLIC_URL || ""
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const currentLang = getLangFromPath(location.pathname)

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

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("about.schema.name"),
    url: `${publicUrl || "https://as-group1.github.io/ACHI-"}`,
    logo: `${publicUrl}/assets/ArchiScaffoldinglogo.png`,
    description: t("about.schema.description")
  }

  return (
    <main className="about-page">
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        canonical={`${publicUrl}/about`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <section className="home-about w-full p-0 m-0">
        <div className="about-layout grid grid-cols-1 lg:grid-cols-2 items-stretch w-full lg:h-[520px]">
          <div
            className="about-image min-h-[260px] lg:min-h-[480px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${publicUrl}/assets/about.webp)` }}
            aria-label={t("about.hero.imageAria")}
            role="img"
          />

          <div className="about-panel bg-[#274f9f] text-white px-[20px] py-[28px] lg:px-[70px] lg:py-[70px] flex flex-col justify-center relative">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="section-title about-title"
              style={{
                fontFamily: '"Rajdhani", sans-serif',
                fontSize: "42px",
                fontWeight: 700,
                textTransform: "uppercase",
                margin: "0 0 12px",
                color: "#ffffff",
                lineHeight: "1.2"
              }}
            >
              {t("about.hero.panelTitleLine1")}
              <br />
              {t("about.hero.panelTitleLine2")}
            </motion.h2>

            <div className="about-panel-copy">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="font-['Open_Sans'] text-white/90 text-body leading-[1.6] max-w-[640px]"
              >
                {t("about.hero.panelBody")}
              </motion.p>
            </div>

            <span className="hidden lg:block absolute right-[24px] top-[30px] w-[6px] h-[64px] bg-[#1b3a73]" />
          </div>
        </div>
      </section>

      <section id="about-main" className="about-main bg-white pt-[90px] pb-0">
        <div className="w-[90%] max-w-[980px] mx-auto">
          <div className="about-intro">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="about-hero-title text-[#214f9b] uppercase"
              style={{
                fontFamily: '"Rajdhani", sans-serif',
                fontSize: "42px",
                fontWeight: 700,
                textTransform: "uppercase",
                margin: "0 0 12px",
                lineHeight: "1.2"
              }}
            >
              {t("about.main.h1")}
            </motion.h1>

            <p className="sr-only">{t("about.main.srOnly")}</p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[#4a5c7a] text-body leading-[1.7] mt-[10px]"
            >
              {t("about.main.p1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[#4a5c7a] text-[16px] leading-[1.7] mt-[12px]"
            >
              {t("about.main.p2")}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[#4a5c7a] text-body leading-[1.7] mt-[10px] pl-[18px] list-disc"
            >
              <li>{t("about.main.bullets.b1")}</li>
              <li>{t("about.main.bullets.b2")}</li>
              <li>{t("about.main.bullets.b3")}</li>
            </motion.ul>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[#4a5c7a] text-[16px] leading-[1.7] mt-[12px]"
            >
              {t("about.main.p3")}
            </motion.p>
          </div>

          <div className="grid-2 grid grid-cols-1 lg:grid-cols-2 gap-[28px] mt-[40px]">
            <article className="card bg-white p-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <h2
                className="about-subtitle text-[#214f9b]"
                style={{
                  fontFamily: '"Rajdhani", sans-serif',
                  fontSize: "22px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  margin: "0 0 12px"
                }}
              >
                {t("about.cards.mission.title")}
              </h2>

              <p className="text-[#4a5c7a] leading-[1.6]">
                {t("about.cards.mission.body")}
              </p>

              <div className="mt-[22px] flex justify-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-[34px] py-[12px] rounded-[40px] border-[2px] border-[#214f9b] text-[#214f9b] font-[600] uppercase text-[15px] font-['Rajdhani'] hover:bg-[#214f9b] hover:text-white transition"
                >
                  {t("about.cards.mission.cta")}
                </Link>
              </div>
            </article>

            <article className="card bg-white p-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <h2
                className="about-subtitle text-[#214f9b]"
                style={{
                  fontFamily: '"Rajdhani", sans-serif',
                  fontSize: "22px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  margin: "0 0 12px"
                }}
              >
                {t("about.cards.vision.title")}
              </h2>

              <p className="text-[#4a5c7a] leading-[1.6]">
                {t("about.cards.vision.body")}
              </p>

              <div className="mt-[22px] flex justify-center">
                <button
                  type="button"
                  onClick={() => goToHomeSection("contactForm")}
                  className="inline-flex items-center justify-center px-[34px] py-[12px] rounded-[40px] border-[2px] border-[#214f9b] text-[#214f9b] font-[600] uppercase text-[15px] font-['Rajdhani'] hover:bg-[#214f9b] hover:text-white transition cursor-pointer"
                  aria-label={t("about.cards.vision.cta") || "Get in touch"}
                >
                  {t("about.cards.vision.cta")}
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <StatsHighlights className="py-[90px]" />
    </main>
  )
}

export default About
