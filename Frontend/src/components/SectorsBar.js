// Frontend/src/components/SectorsBar.js
import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { sectors } from "../data/sectors"
import SmartLink from "../seo/SmartLink"

const SectorsBar = () => {
  const { t } = useTranslation()

  const NS = "homeSectors"

  const getTitle = (sector) => t(`${NS}.items.${sector.key}.title`)

  const getAriaLabel = (sector) => t(`${NS}.items.${sector.key}.ariaLabel`, { title: getTitle(sector) })
  const getTitleAttr = (sector) => t(`${NS}.items.${sector.key}.titleAttr`, { title: getTitle(sector) })

  return (
    <section id="sectors-bar" className="py-[70px] bg-[#f5f7fb]" aria-labelledby="sectors-bar-title">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <motion.h2
          id="sectors-bar-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-[Rajdhani] text-h2 font-[700] uppercase mb-[40px] text-[#003A80] text-center"
        >
          {t(`${NS}.title`)}
        </motion.h2>

        <p className="sr-only">{t(`${NS}.srDescription`)}</p>

        <div className="relative">
          <ul className="hidden md:flex flex-nowrap gap-[16px] lg:gap-[20px]" aria-label={t(`${NS}.listAriaLabel`)} dir="ltr">
            {sectors.map((sector, idx) => (
              <motion.li
                key={sector.key || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex-1 min-w-0 list-none"
              >
                <SmartLink
                  to="/sectors"
                  className="group block bg-white rounded-[0] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[28px] h-full flex flex-col items-center text-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-[4px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#214f9b] focus:ring-offset-2"
                  aria-label={getAriaLabel(sector)}
                  title={getTitleAttr(sector)}
                >
                  <div className="mb-[16px] w-[64px] h-[64px] flex items-center justify-center flex-shrink-0">
                    <i
                      className={`fa-solid ${sector.icon || "fa-building"} text-[#214f9b] text-[40px] group-hover:text-[#ff8e26] group-hover:scale-110 transition-all duration-300`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-[Rajdhani] text-[#214f9b] text-h5 md:text-h4 font-[600] uppercase leading-[1.3] group-hover:text-[#ff8e26] transition-colors duration-300">
                    {getTitle(sector)}
                  </h3>
                </SmartLink>
              </motion.li>
            ))}
          </ul>

          <div className="md:hidden overflow-x-auto scrollbar-hide pb-[10px] -mx-[20px] px-[20px]">
            <ul className="flex flex-nowrap gap-[16px]" aria-label={t(`${NS}.listAriaLabel`)} dir="ltr">
              {sectors.map((sector, idx) => (
                <motion.li
                  key={sector.key || idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[160px] list-none"
                >
                  <SmartLink
                    to="/sectors"
                    className="group block bg-white rounded-[0] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[24px] h-full flex flex-col items-center text-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#214f9b] focus:ring-offset-2"
                    aria-label={getAriaLabel(sector)}
                    title={getTitleAttr(sector)}
                  >
                    <div className="mb-[12px] w-[56px] h-[56px] flex items-center justify-center flex-shrink-0">
                      <i
                        className={`fa-solid ${sector.icon || "fa-building"} text-[#214f9b] text-[36px] group-hover:text-[#ff8e26] group-hover:scale-110 transition-all duration-300`}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="font-[Rajdhani] text-[#214f9b] text-h6 font-[600] uppercase leading-[1.3] group-hover:text-[#ff8e26] transition-colors duration-300">
                      {getTitle(sector)}
                    </h3>
                  </SmartLink>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectorsBar
