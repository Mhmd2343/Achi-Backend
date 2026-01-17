// src/components/services/ServicesPageAllServices.js
import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ImageWebp from "../ImageWebp"
import { useLangRouter } from "../../routing/LangRouter"
import { buildPathWithLang } from "../../utils/langRouting"

const ServicesPageAllServices = () => {
  const { t } = useTranslation()
  const { urlLang } = useLangRouter()
  const NS = "servicesPage.allServices"

  const services = useMemo(
    () => [
      { key: "specializedLaborforce", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
      { key: "facades", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
      { key: "suspended", imgWebp: "/assets/services/Suspended scaffolding 1 2(1).png", img: "/assets/services/Suspended scaffolding 1 2(1).png" },
      { key: "highCapacity", imgWebp: "/assets/services/Home Banner 1 2(1).png", img: "/assets/services/Home Banner 1 2(1).png" },
      { key: "highRise", imgWebp: "/assets/services/SDC14429(1).png", img: "/assets/services/SDC14429(1).png" },
      { key: "circularDome", imgWebp: "/assets/services/SDC14429(1).png", img: "/assets/services/SDC14429(1).png" },
      { key: "events", imgWebp: "/assets/services/Home Banner 4 2(1).png", img: "/assets/services/Home Banner 4 2(1).png" },
      { key: "industrial", imgWebp: "/assets/services/Home Banner 4 2(1).png", img: "/assets/services/Home Banner 4 2(1).png" },
      { key: "roof", imgWebp: "/assets/services/Home Banner 4 2(1).png", img: "/assets/services/Home Banner 4 2(1).png" },
      { key: "mobileSuspendedBridges", imgWebp: "/assets/services/Suspended scaffolding 1 2(1).png", img: "/assets/services/Suspended scaffolding 1 2(1).png" },
      { key: "accessStairs", imgWebp: "/assets/services/SDC14429(1).png", img: "/assets/services/SDC14429(1).png" },
      { key: "adjustableProps", imgWebp: "/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png", img: "/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png" },
      { key: "proppingShoring", imgWebp: "/assets/services/SDC14429(1).png", img: "/assets/services/SDC14429(1).png" },
      { key: "unloadingLoadingPlatforms", imgWebp: "/assets/services/SDC14429(1).png", img: "/assets/services/SDC14429(1).png" },
      { key: "designConsulting", imgWebp: "/assets/services/stock-photo-engineers-are-helping-to-design-work-on-blueprints-and-collaborate-on-structural-analyzing-of-1724713963 1.png", img: "/assets/services/stock-photo-engineers-are-helping-to-design-work-on-blueprints-and-collaborate-on-structural-analyzing-of-1724713963 1.png" }
    ],
    []
  )

  const visibleServiceKeys = [
    "adjustableProps",
    "highRise",
    "suspended",
    "events",
    "facades",
    "proppingShoring"
  ]

  const visibleServices = services.filter((s) => visibleServiceKeys.includes(s.key))
  
  // Keep only the first service
  const firstService = visibleServices[0]

  if (!firstService) {
    return null
  }

  const title = t(`${NS}.items.${firstService.key}.title`)

  return (
    <section className="w-full bg-white py-[70px]" aria-labelledby="all-services-heading">
      <div className="max-w-[1250px] mx-auto px-[20px]">
        <h2
          id="all-services-heading"
          className="font-[Rajdhani] text-[42px] font-[700] uppercase mb-[12px] text-[#003A80] text-center"
        >
          {t(`${NS}.title`)}
        </h2>

        <p className="text-center text-[#4a5c7a] font-['Open_Sans'] text-[16px] leading-[1.7] max-w-[980px] mx-auto mt-[10px] mb-[35px]">
          {t(`${NS}.description`)}
        </p>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-fr gap-[24px]"
          role="list"
          aria-label={t(`${NS}.listAriaLabel`)}
        >
          <Link
            to={buildPathWithLang(urlLang, "/services/serviceItem")}
            className="relative flex group/parent bg-transparent text-left items-start flex-col w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
            style={{ borderRadius: 0 }}
            aria-label={title}
          >
            <div className="relative group w-full overflow-hidden aspect-square" style={{ borderRadius: 0 }}>
              <ImageWebp
                srcWebp={firstService.imgWebp}
                src={firstService.img}
                alt={t(`${NS}.items.${firstService.key}.imageAlt`)}
                className="object-cover w-full h-full block"
                style={{ borderRadius: 0, objectFit: "cover" }}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="w-full pt-[12px] text-left">
              <h3
                className="text-[22px] font-saira font-[900] sm:font-[900] md:font-[900] lg:font-[800] xl:font-[800] 2xl:font-[800] leading-[1.4] text-[#28509E] mt-[0px] mb-[0px] capitalize inline-block border-b-[2px] border-[#28509E] pb-[6px]"
              >
                {title}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesPageAllServices
