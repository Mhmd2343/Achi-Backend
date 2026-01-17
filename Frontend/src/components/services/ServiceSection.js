import React from "react"
import { motion } from "framer-motion"
import ImageWebp from "../ImageWebp"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useLangRouter } from "../../routing/LangRouter"
import { buildPathWithLang } from "../../utils/langRouting"

const ServiceSection = () => {
  const { t } = useTranslation()
  const { urlLang } = useLangRouter()
  const ASSET = process.env.PUBLIC_URL || ""

  const services = [
    // {
    //   id: "adjustable-props",
    //   titleKey: "homeServicesOverview.items.adjustableProps.title",
    //   altKey: "homeServicesOverview.items.adjustableProps.alt",
    //   img: `${ASSET}/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png`,
    //   to: "/services/serviceItem",
    // },
    // {
    //   id: "high-rise-scaffolding",
    //   titleKey: "homeServicesOverview.items.highRise.title",
    //   altKey: "homeServicesOverview.items.highRise.alt",
    //   img: `${ASSET}/assets/gallery/69.webp`,
    //   to: "/services/serviceItem",
    // },
    // {
    //   id: "suspended-scaffolding",
    //   titleKey: "homeServicesOverview.items.suspended.title",
    //   altKey: "homeServicesOverview.items.suspended.alt",
    //   img: `${ASSET}/assets/services/Suspended scaffolding 1 2(1).png`,
    //   to: "/services/serviceItem",
    // },
    // {
    //   id: "scaffolding-events",
    //   titleKey: "homeServicesOverview.items.events.title",
    //   altKey: "homeServicesOverview.items.events.alt",
    //   img: `${ASSET}/assets/services/Home Banner 4 2(1).png`,
    //   to: "/services/serviceItem",
    // },
    {
      id: "facade-scaffolding",
      titleKey: "homeServicesOverview.items.facade.title",
      altKey: "homeServicesOverview.items.facade.alt",
      img: `${ASSET}/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png`,
      to: "/services/serviceItem",
    },
    // {
    //   id: "propping-shoring",
    //   titleKey: "homeServicesOverview.items.shoring.title",
    //   altKey: "homeServicesOverview.items.shoring.alt",
    //   img: `${ASSET}/assets/services/SDC14429(1).png`,
    //   to: "/services/serviceItem",
    // },
  ]

  return (
    <section id="services" aria-labelledby="home-services-title">
      <header className="px-[20px] sm:px-[20px] lg:px-[50px]">
        <motion.h2
          id="home-services-title"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-h2 font-[Rajdhani] font-[700] uppercase mb-[40px] text-[#003A80] my-[30px] lg:mt-[30px] lg:mb-[50px]"
        >
          {t("homeServicesOverview.title")}
        </motion.h2>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-fr gap-[24px] justify-items-stretch lg:px-[50px] sm:px-[20px] px-[20px] mb-[40px]"
      >
        {services.map((s) => (
          <Link
            key={s.id}
            to={buildPathWithLang(urlLang, s.to)}
            className="relative flex group/parent bg-transparent text-left items-start flex-col w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
            style={{ borderRadius: 0 }}
            aria-labelledby={`${s.id}-title`}
          >
            <div className="relative group w-full overflow-hidden" style={{ borderRadius: 0 }}>
              <ImageWebp
                srcWebp={s.img}
                src={s.img}
                className="object-cover w-full block h-[220px] md:h-[280px] lg:h-[300px] xl:h-[320px]"
                style={{ borderRadius: 0, objectFit: "cover", width: "100%" }}
                alt={t(s.altKey)}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="w-full pt-[12px] text-left">
              <h3
                id={`${s.id}-title`}
                className="text-[22px] font-saira font-[900] sm:font-[900] md:font-[900] lg:font-[800] xl:font-[800] 2xl:font-[800] leading-[1.4] text-[#28509E] mt-[0px] mb-[0px] capitalize inline-block border-b-[2px] border-[#28509E] pb-[6px]"
              >
                {t(s.titleKey)}
              </h3>
            </div>
          </Link>
        ))}
      </motion.div>

      <div className="w-full text-center mt-[80px] mb-[80px]">
        <Link
          to={buildPathWithLang(urlLang, "/services")}
          className="group inline-flex items-center justify-center gap-[8px] text-small md:text-body text-white font-saira font-[700] px-[32px] py-[14px] bg-[#003A80] rounded-[8px] hover:bg-[#28509E] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          aria-label={t("homeServicesOverview.viewAll")}
        >
          {t("homeServicesOverview.viewAll")}
          <svg
            className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default ServiceSection
