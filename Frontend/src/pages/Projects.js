import React, { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { getLangFromPath } from "../utils/langRouting"
import ProjectCard from "../components/projects/ProjectCard"

const Projects = () => {
  const { t, i18n } = useTranslation()
  const NS = "projectsPage"
  const location = useLocation()

  const base = process.env.PUBLIC_URL || ""

  const currentLang = getLangFromPath(location.pathname)

  const isArabicRoute = currentLang === "lb" || currentLang === "ar"
  const prefix = currentLang === "fr" ? "/fr" : isArabicRoute ? "/lb" : ""
  const langPath = (path) => `${prefix}${path}`

  const isArabic =
    (i18n.resolvedLanguage || i18n.language || "").toLowerCase().startsWith("ar") || isArabicRoute

  const projects = useMemo(
    () => [
      {
        id: "aishti-mall",
        key: "aishtiMall",
        img: `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/IMG_2189.JPG`,
      },
      // {
      //   id: "beirut-business-center",
      //   key: "beirutBusinessCenter",
      //   img: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
      // },
      // {
      //   id: "hotel-le-gray",
      //   key: "hotelLeGray",
      //   img: `${base}/assets/workDone/HOTEL LE GRAY/IMG_2186.JPG`,
      // },
    ],
    [base]
  )

  const heroBg = `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/edit.JPG`
  const heroStyle = useMemo(() => ({ backgroundImage: `url("${heroBg}")` }), [heroBg])

  return (
    <main className="bg-[#f5f7fb] text-[#1b3155]">
      <SEO title={t(`${NS}.seo.title`)} description={t(`${NS}.seo.description`)} canonical={t(`${NS}.seo.canonical`)} />

      <section className="relative bg-no-repeat bg-cover bg-center overflow-hidden">
        <div
          className={`absolute inset-0 ${isArabic ? "scale-x-[-1] origin-center" : ""}`}
          style={heroStyle}
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-0 bg-[rgba(0,35,90,0.55)] backdrop-brightness-[0.9]" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`relative z-10 w-full h-full flex flex-col justify-center
                     pt-[110px] pb-[200px] md:pt-[130px] md:pb-[240px]
                     pl-[20px] md:pl-[70px] pr-[20px]
                     ${isArabic ? "text-right md:pr-[70px] md:pl-[20px]" : "text-left"}`}
        >
          <h1 className="font-[Rajdhani] text-white text-h1 font-[700] uppercase mb-[12px]">{t(`${NS}.hero.title`)}</h1>

          <p className={`text-white/90 font-['Open_Sans'] text-body leading-[1.7] max-w-[650px] ${isArabic ? "ml-auto" : ""}`}>
            {t(`${NS}.hero.description`)}
          </p>

          <div className={`mt-[28px] ${isArabic ? "flex justify-start" : ""}`}>
            <a
              href={t(`${NS}.hero.whatsapp.href`)}
              target="_blank"
              rel="noreferrer"
              aria-label={t(`${NS}.hero.whatsapp.ariaLabel`)}
              className="inline-flex w-fit px-[28px] sm:px-[34px]
                         text-[12px] md:text-[15px]
                         text-white font-[Rajdhani] font-[700] leading-[29px]
                         py-[15px]
                         bg-[#28509E] rounded-[12px] uppercase
                         hover:bg-[#25D366]
                         border-[#FFF] hover:border-[#25D366]
                         border-solid border-2
                         transition duration-500 heroBtn"
            >
              {t(`${NS}.hero.whatsapp.label`)}
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-[50px] md:py-[70px]">
        <div className="w-[90%] max-w-[1400px] mx-auto px-[20px]">
          <h2 className="text-center font-[Rajdhani] text-[#003A80] text-[36px] md:text-[42px] font-[700] uppercase leading-[1.2] mb-[50px]">
            {t(`${NS}.section.allProjectsTitle`)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} langPath={langPath} baseUrl={base} t={t} NS={NS} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-[50px] text-center" aria-label={t(`${NS}.stats.ariaLabel`)}>
        <div className="inline-flex items-center gap-[18px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/home.png`}
            alt={t(`${NS}.stats.iconAlt`)}
            className="w-[60px] h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col items-start leading-[1.1] mt-[6px]">
            <div className="font-[Rajdhani] text-[45px] font-[700] text-[#103781] ml-[10px]">{t(`${NS}.stats.value`)}</div>
            <div className="font-[Rajdhani] text-[30px] font-[700] text-[#103781] mt-[4px] tracking-[0.5px]">{t(`${NS}.stats.label`)}</div>
          </div>
        </div>
      </section>

      <section className="bg-[#214f9b] py-[70px] text-white" aria-label={t(`${NS}.newsletter.ariaLabel`)}>
        <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-[40px]">
          <h2 className="font-[Rajdhani] text-h2 font-[700] uppercase leading-[1.2] text-center">
            {t(`${NS}.newsletter.titleLine1`)}
            <br /> {t(`${NS}.newsletter.titleLine2`)}
          </h2>

          <form className="flex flex-col md:flex-row items-center gap-[20px] w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">
              {t(`${NS}.newsletter.emailLabel`)}
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="w-full md:w-[380px] px-[18px] py-[14px] rounded-[8px] border border-white/40 bg-transparent text-white text-[15px] outline-none"
              placeholder={t(`${NS}.newsletter.placeholder`)}
              autoComplete="email"
              inputMode="email"
            />
            <button
              type="submit"
              className="px-[34px] py-[14px] bg-[#ff8a00] rounded-[8px] text-white font-[Rajdhani] font-[700] text-[15px] uppercase transition hover:bg-[#e77a00] w-full md:w-auto"
              aria-label={t(`${NS}.newsletter.submitAriaLabel`)}
            >
              {t(`${NS}.newsletter.submitLabel`)}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Projects
