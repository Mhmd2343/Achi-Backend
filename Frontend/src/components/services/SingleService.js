import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ImageWebp from "../ImageWebp"
import SEO from "../SEO"
import { useLangRouter } from "../../routing/LangRouter"
import { buildPathWithLang } from "../../utils/langRouting"

const SingleService = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { urlLang } = useLangRouter()

  const cleanPath = location.pathname.replace(/^\/(fr|lb)(?=\/|$)/, "")
  const isHome = cleanPath === "/" || cleanPath === ""

  const goToHomeSection = (id) => {
    const hash = id.startsWith('#') ? id : `#${id}`
    if (!isHome) {
      // Navigate to language-aware homepage with hash
      const home = buildPathWithLang(urlLang, "/")
      navigate(`${home}${hash}`)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }, 250)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
  }

  const handleScrollToContact = (e) => {
    e.preventDefault()
    goToHomeSection("contactForm")
  }
  const base = process.env.PUBLIC_URL || ""

  const NS = "singleService.facades"

  // Service Schema for JSON-LD
  const serviceSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Façade Scaffolding",
      description: t(`${NS}.seo.description`),
      provider: {
        "@type": "Organization",
        name: "ACHI Scaffolding"
      },
      areaServed: [
        "Beirut",
        "Mount Lebanon",
        "North Lebanon",
        "South Lebanon",
        "Bekaa"
      ],
      serviceType: "Façade scaffolding"
    }
  }, [t, NS])

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <main id="main-content" className="w-full bg-white">
        <SEO
          title={t(`${NS}.seo.title`)}
          description={t(`${NS}.seo.description`)}
          canonical={t(`${NS}.seo.canonical`)}
          ogType="website"
        />

        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#28509E] focus:text-white focus:rounded focus:font-bold"
        >
          Skip to content
        </a>

        {/* Service Hero Section */}
        <header className="w-full bg-gradient-to-br from-[#28509E] to-[#1b3155] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Title, Lead, Buttons */}
            <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] py-[60px] md:py-[80px] flex items-center">
              <div>
                <h1 className="font-[Rajdhani] text-white font-[700] uppercase text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] mb-[20px]">
                  {t(`${NS}.hero.h1`)}
                </h1>
                <p className="font-['Open_Sans'] text-white/90 text-[18px] md:text-[20px] leading-[1.6] mb-[30px] max-w-[600px]">
                  {t(`${NS}.hero.intro`)}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-[16px] mb-[40px]">
                  <Link
                    to={buildPathWithLang(urlLang, "/projects")}
                    className="inline-flex items-center justify-center px-[32px] py-[16px] bg-transparent border-2 border-white text-white font-[Rajdhani] font-[700] text-[16px] uppercase transition hover:bg-white/10 rounded-[0] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#28509E]"
                    aria-label={t(`${NS}.hero.secondaryButtonAria`)}
                  >
                    {t(`${NS}.hero.secondaryButton`)}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Service Image - Full Height */}
            <div className="w-full h-full order-first lg:order-last">
              <ImageWebp
                srcWebp={`${base}/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png`}
                src={`${base}/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png`}
                alt={t(`${NS}.images.heroAlt`)}
                className="w-full h-full object-cover rounded-[0]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </header>

        {/* "What It Is" Overview Strip */}
        <section className="w-full bg-[#f5f7fa] py-[50px] border-b border-[#e0e0e0]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.7] mb-[30px] text-center max-w-[900px] mx-auto">
              {t(`${NS}.overview.paragraph`)}
            </p>
            <div className="flex flex-wrap justify-center gap-[16px]">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center px-[24px] py-[14px] bg-white border border-[#e0e0e0] rounded-[0] shadow-sm"
                >
                  <span className="font-['Open_Sans'] text-[#1b3155] text-[15px] font-[600]">
                    {t(`${NS}.overview.chips.${idx}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications + Constraints Two-Column Section */}
        <section className="w-full bg-white py-[70px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
              {/* Typical Applications Card */}
              <div className="bg-white border border-[#e0e0e0] p-[32px] rounded-[0] shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-[16px] mb-[20px]">
                  <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#28509E] rounded-[0] flex-shrink-0">
                    <svg className="w-[28px] h-[28px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] font-[700] uppercase">
                    {t(`${NS}.sections.typicalApplications.title`)}
                  </h2>
                </div>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mb-[20px]">
                  {t(`${NS}.sections.typicalApplications.intro`)}
                </p>
                <ul className="list-disc pl-[24px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.7] space-y-[8px] flex-1">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <li key={idx}>{t(`${NS}.sections.typicalApplications.bullets.${idx}`)}</li>
                  ))}
                </ul>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mt-[20px]">
                  {t(`${NS}.sections.typicalApplications.closing`)}
                </p>
              </div>

              {/* Urban and Site Constraints Card */}
              <div className="bg-white border border-[#e0e0e0] p-[32px] rounded-[0] shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-[16px] mb-[20px]">
                  <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#28509E] rounded-[0] flex-shrink-0">
                    <svg className="w-[28px] h-[28px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] font-[700] uppercase">
                    {t(`${NS}.sections.urbanConstraints.title`)}
                  </h2>
                </div>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mb-[16px]">
                  {t(`${NS}.sections.urbanConstraints.intro`)}
                </p>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mb-[16px] font-[600]">
                  {t(`${NS}.sections.urbanConstraints.leadIn`)}
                </p>
                <ul className="list-disc pl-[24px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.7] space-y-[8px] flex-1">
                  {[0, 1, 2, 3].map((idx) => (
                    <li key={idx}>{t(`${NS}.sections.urbanConstraints.bullets.${idx}`)}</li>
                  ))}
                </ul>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mt-[20px]">
                  {t(`${NS}.sections.urbanConstraints.closing`)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* "How We Execute" Process Section */}
        <section className="w-full bg-[#f5f7fa] py-[70px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[42px] font-[700] uppercase text-center mb-[50px]">
              {t(`${NS}.sections.engineeringApproach.title`)}
            </h2>
            <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.7] mb-[40px] text-center max-w-[900px] mx-auto">
              {t(`${NS}.sections.engineeringApproach.intro`)}
            </p>

            {/* 4-Step Process Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[30px]">
              {[0, 1, 2, 3].map((idx, index) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e0e0e0] p-[28px] rounded-[0] shadow-sm relative"
                >
                  <div className="flex items-center gap-[16px] mb-[16px]">
                    <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#28509E] text-white font-[Rajdhani] font-[700] text-[20px] rounded-[0] flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="w-[2px] h-[24px] bg-[#28509E] flex-shrink-0 hidden lg:block absolute left-[52px] top-[52px]" />
                  </div>
                  <p className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.7]">
                    {t(`${NS}.sections.engineeringApproach.bullets.${idx}`)}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.7] text-center max-w-[900px] mx-auto">
              {t(`${NS}.sections.engineeringApproach.closing`)}
            </p>
          </div>
        </section>

        {/* Safety & Coordination Highlight Section */}
        <section className="w-full bg-white py-[70px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] items-start">
              {/* Left: Safety Content */}
              <div>
                <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[42px] font-[700] uppercase mb-[24px]">
                  {t(`${NS}.sections.safetyCoordination.title`)}
                </h2>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mb-[20px]">
                  {t(`${NS}.sections.safetyCoordination.intro`)}
                </p>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mb-[20px] font-[600]">
                  {t(`${NS}.sections.safetyCoordination.leadIn`)}
                </p>
                <ul className="list-disc pl-[24px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.7] space-y-[8px]">
                  {[0, 1, 2, 3].map((idx) => (
                    <li key={idx}>{t(`${NS}.sections.safetyCoordination.bullets.${idx}`)}</li>
                  ))}
                </ul>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mt-[20px]">
                  {t(`${NS}.sections.safetyCoordination.closing`)}
                </p>
              </div>

              {/* Right: Compliance Callout Box */}
              <div className="bg-[#28509E] text-white p-[32px] rounded-[0] border border-[#214f9b]">
                <h3 className="font-[Rajdhani] text-white text-[24px] font-[700] uppercase mb-[20px]">
                  {t(`${NS}.safetyCallout.title`)}
                </h3>
                <ul className="space-y-[12px]">
                  {[0, 1, 2].map((idx) => (
                    <li key={idx} className="flex items-start gap-[12px]">
                      <svg className="w-[20px] h-[20px] text-white flex-shrink-0 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-['Open_Sans'] text-white/90 text-[15px] leading-[1.6]">
                        {t(`${NS}.safetyCallout.items.${idx}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* "Why It Matters" Benefits Section */}
        <section className="w-full bg-[#f5f7fa] py-[70px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[42px] font-[700] uppercase text-center mb-[20px]">
              {t(`${NS}.sections.whyMatters.title`)}
            </h2>
            <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.7] mb-[50px] text-center max-w-[900px] mx-auto">
              {t(`${NS}.sections.whyMatters.intro`)}
            </p>

            {/* Professional List */}
            <div className="bg-white border border-[#e0e0e0] p-[40px] md:p-[50px] rounded-[0] shadow-sm max-w-[900px] mx-auto mb-[30px]">
              <ul className="space-y-[20px]">
                {[0, 1, 2].map((idx) => (
                  <li key={idx} className="flex items-start gap-[16px]">
                    <div className="w-[6px] h-[6px] bg-[#28509E] rounded-full mt-[10px] flex-shrink-0" />
                    <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[17px] leading-[1.7]">
                      <span className="font-[600] text-[#1b3155]">{t(`${NS}.sections.whyMatters.bullets.${idx}`)}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.7] text-center max-w-[900px] mx-auto">
              {t(`${NS}.sections.whyMatters.closing`)}
            </p>
          </div>
        </section>

        {/* Location & Coverage Section */}
        <section className="w-full bg-white py-[70px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[42px] font-[700] uppercase text-center mb-[20px]">
              {t(`${NS}.sections.locationCoverage.title`)}
            </h2>
            <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.7] mb-[40px] text-center max-w-[900px] mx-auto">
              {t(`${NS}.sections.locationCoverage.text`)}
            </p>

            {/* Region Grid */}
            <div className="flex flex-wrap justify-center gap-[16px] mb-[20px]">
              {["beirut", "mountLebanon", "northLebanon", "southLebanon", "bekaa"].map((region) => (
                <div
                  key={region}
                  className="inline-flex items-center px-[28px] py-[16px] bg-[#f5f7fa] border border-[#e0e0e0] rounded-[0]"
                >
                  <span className="font-['Open_Sans'] text-[#1b3155] text-[16px] font-[600]">
                    {t(`${NS}.coverage.regions.${region}`)}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-['Open_Sans'] text-[#666] text-[14px] text-center">
              {t(`${NS}.coverage.subtext`)}
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full bg-gradient-to-r from-[#28509E] to-[#1b3155] py-[80px] text-white overflow-hidden relative">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] text-center">
            <h2 className="font-[Rajdhani] text-white text-[36px] md:text-[48px] font-[700] uppercase mb-[24px]">
              {t(`${NS}.cta.title`)}
            </h2>
            <p className="font-['Open_Sans'] text-white/90 text-[18px] md:text-[20px] leading-[1.7] mb-[16px] max-w-[800px] mx-auto">
              {t(`${NS}.cta.text1`)}
            </p>
            <p className="font-['Open_Sans'] text-white/90 text-[18px] md:text-[20px] leading-[1.7] mb-[40px] max-w-[800px] mx-auto">
              {t(`${NS}.cta.text2`)}
            </p>
            <button
              type="button"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center px-[40px] py-[18px] bg-[#ff8a00] text-white font-[Rajdhani] font-[700] text-[18px] uppercase transition hover:bg-[#e77a00] rounded-[0] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#28509E] cursor-pointer"
              aria-label={t(`${NS}.cta.buttonAria`)}
            >
              {t(`${NS}.cta.buttonText`)}
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default SingleService
