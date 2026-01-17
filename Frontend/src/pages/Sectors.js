// src/pages/Sectors.js
import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { sectors } from "../data/sectors"
import SEO from "../components/SEO"

const Sectors = () => {
  const { t, i18n } = useTranslation()

  const NS = "sectors"

  const normalizeKey = (raw) => {
    const k = (raw || "").toString().trim()
    if (!k) return ""
    const map = {
      renovation: "renovation",
      construction: "construction",
      industrial: "industrial",
      oilGas: "oilGas",
      "oil-gas": "oilGas",
      oil_and_gas: "oilGas",

      domes: "domes",
      domesReligious: "domes",
      domes_religious: "domes",
      domesreligious: "domes",

      events: "events",
      eventsStages: "events",
      events_stages: "events",
      eventsinstallations: "events",
      installations: "events",

      marine: "marine",
      navalMarine: "marine",
      naval_marine: "marine",
      naval: "marine"
    }
    return map[k] || k
  }

  const keyFromTitle = (title) => {
    const t0 = (title || "").toString().trim()
    const map = {
      Renovation: "renovation",
      Construction: "construction",
      "Industrial Facilities": "industrial",
      "Oil & Gas Sites": "oilGas",
      "Domes & Religious Structures": "domes",
      "Events & Installations": "events",
      "Naval & Marine Projects": "marine"
    }
    return map[t0] || ""
  }

  const items = useMemo(() => {
    return sectors.map((s) => {
      const fromDataKey = normalizeKey(s?.key)
      const fromTitle = normalizeKey(keyFromTitle(s?.title))
      const k = fromDataKey || fromTitle
      return { ...s, _tKey: k }
    })
  }, [])

  return (
    <main id="sectors" className="bg-[#f5f7fb] text-[#1b3155]">
      <SEO title={t(`${NS}.seo.title`)} description={t(`${NS}.seo.description`)} canonical={t(`${NS}.seo.canonical`)} />

      <section className="py-[60px]" aria-labelledby="sectors-page-title">
        <div className="w-[90%] max-w-[1200px] mx-auto">
            <div className="bg-white shadow-[0_10px_30px_rgba(17,35,64,0.08)] px-[22px] md:px-[38px] py-[28px] md:py-[34px] rounded-[0]">
            <motion.h1
              id="sectors-page-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#214f9b] font-[900] uppercase text-h1 leading-[1.1] text-center md:text-center"
            >
              {t(`${NS}.industries.title`)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-[12px] text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.8] max-w-[980px] text-center md:text-left"
            >
              {t(`${NS}.industries.description`)}
            </motion.p>

            <div className="mt-[18px] grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              <div className="flex items-start gap-[10px]">
                <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[#214f9b]" />
                <p className="text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.7]">
                  {t(`${NS}.industries.items.construction`)}
                </p>
              </div>

              <div className="flex items-start gap-[10px]">
                <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[#214f9b]" />
                <p className="text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.7]">
                  {t(`${NS}.industries.items.restoration`)}
                </p>
              </div>

              <div className="flex items-start gap-[10px]">
                <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[#214f9b]" />
                <p className="text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.7]">
                  {t(`${NS}.industries.items.industrial`)}
                </p>
              </div>

              <div className="flex items-start gap-[10px]">
                <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[#214f9b]" />
                <p className="text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.7]">
                  {t(`${NS}.industries.items.residential`)}
                </p>
              </div>
            </div>

            <nav className="sr-only" aria-label={t(`${NS}.internalLinks.ariaLabel`)}>
              <ul>
                <li>
                  <Link to={t(`${NS}.internalLinks.products.href`)}>{t(`${NS}.internalLinks.products.label`)}</Link>
                </li>
                <li>
                  <Link to={t(`${NS}.internalLinks.projects.href`)}>{t(`${NS}.internalLinks.projects.label`)}</Link>
                </li>
                <li>
                  <Link to={t(`${NS}.internalLinks.services.href`)}>{t(`${NS}.internalLinks.services.label`)}</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section className="pb-[60px]" aria-label={t(`${NS}.grid.ariaLabel`)}>
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]" dir="ltr">
            {items.map((sector, idx) => (
              <motion.article
                key={`${sector.title}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[32px] flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300 rounded-[0]"
              >
                <h2  className={`font-[Rajdhani] text-[#214f9b] text-h3 md:text-h2 font-[700] uppercase mb-[16px] ${
                   (i18n.resolvedLanguage || i18n.language || "").startsWith("ar")
                    ? "text-center": ""  }`}>  {t(`${NS}.titles.${sector._tKey}`)}
                </h2>

                <p className="font-['Open_Sans'] text-[#4a5c7a] text-[15px] leading-[1.7] flex-1">
                  {t(`${NS}.subtitles.${sector._tKey}`)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[55px] bg-[#eef3fb]" aria-labelledby="sectors-cta-title">
        <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[18px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 id="sectors-cta-title" className="text-[#214f9b] font-[900] uppercase text-h3 md:text-h2">
              {t(`${NS}.cta.title`)}
            </h2>
            <p className="mt-[8px] text-[#4a5c7a] text-[14px] leading-[1.7]">
              {t(`${NS}.cta.description`)}
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            href={t(`${NS}.cta.whatsapp.href`)}
            target="_blank"
            rel="noreferrer"
            aria-label={t(`${NS}.cta.whatsapp.ariaLabel`)}
            className="inline-flex items-center justify-center px-[18px] py-[12px] rounded-[12px] bg-[#28509E] text-white font-[900] uppercase text-[13px] border-2 border-white hover:bg-[#25D366] hover:border-[#25D366] transition"
          >
            {t(`${NS}.cta.whatsapp.label`)}
          </motion.a>
        </div>
      </section>
    </main>
  )
}

export default Sectors
