// src/pages/Services.js
import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import ServicesPageAllServices from "../components/services/ServicesPageAllServices"
import SEO from "../components/SEO"

const Services = () => {
  const { t, i18n } = useTranslation()

  const NS = "servicesPage"

  const isArabic = (i18n.resolvedLanguage || i18n.language || "").toLowerCase().startsWith("ar")

  const orgSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: t(`${NS}.schema.name`),
      url: t(`${NS}.schema.url`),
      logo: t(`${NS}.schema.logo`),
      description: t(`${NS}.schema.description`)
    }),
    [t]
  )

  return (
    <div id="ServicesPage">
      <SEO title={t(`${NS}.seo.title`)} description={t(`${NS}.seo.description`)} canonical={t(`${NS}.seo.canonical`)} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <p className="sr-only">{t(`${NS}.srOnly.entityDefinition`)}</p>

      <section
        className="relative pt-[110px] pb-[200px] md:pt-[130px] md:pb-[240px] overflow-hidden"
        aria-label={t(`${NS}.hero.ariaLabel`)}
      >
        <div
          className={`absolute inset-0 bg-servicePageBanner bg-no-repeat bg-cover bg-center ${
            isArabic ? "scale-x-[-1] origin-center" : ""
          }`}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative max-w-[1250px] mx-auto px-[20px]"
        >
          <h1 className="font-[Rajdhani] text-white text-h1 font-[700] uppercase leading-[0.95]">
            {t(`${NS}.hero.title`)}
          </h1>

          <p className="text-white/90 font-['Open_Sans'] text-body leading-[1.7] max-w-[650px] mt-[12px]">
            {t(`${NS}.hero.description`)}
          </p>

          <div className="mt-[28px]">
            <a
              href={t(`${NS}.hero.whatsapp.href`)}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={t(`${NS}.hero.whatsapp.ariaLabel`)}
              className="inline-flex w-fit px-[28px] sm:px-[34px]
             text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px]
             text-white font-saira font-[700] leading-[29px]
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

      <main aria-label={t(`${NS}.main.ariaLabel`)}>
        <ServicesPageAllServices />
      </main>
    </div>
  )
}

export default Services
