// Frontend/src/components/StatsHighlights.js
import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import ImageWebp from "./ImageWebp"

const StatsHighlights = ({ className = "" }) => {
  const { t } = useTranslation()

  const items = [
    { icon: "users", value: "460", key: "clients" },
    { icon: "home", value: "10", key: "experience" },
    { icon: "trophy(2)", value: "13", key: "awards" },
    { icon: "messages-square", value: "350", key: "consultations" }
  ]

  return (
    <section className={`w-full bg-white py-[70px] ${className}`}>
      <div className="max-w-[1250px] mx-auto px-[20px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-x-[14px] sm:gap-x-[18px] md:gap-x-[22px] gap-y-[14px] sm:gap-y-[16px] md:gap-y-[18px]"
        >
          {items.map((item, i) => {
            const label = t(`statsHighlights.items.${item.key}.label`)
            const alt = t(`statsHighlights.items.${item.key}.alt`)

            return (
              <div
                key={i}
                className="bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[16px] sm:p-[18px] md:p-[22px] flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px]"
              >
                <ImageWebp
                  srcWebp={`/assets/services/${item.icon}.png`}
                  src={`/assets/services/${item.icon}.png`}
                  alt={alt}
                  className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[52px] md:h-[52px] object-contain flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-[Rajdhani] text-[#003A80] text-[28px] sm:text-[32px] md:text-[38px] font-[700] leading-[1]">
                    {item.value}
                  </div>
                  <div className="font-saira text-[#4A5C7A] text-[13px] sm:text-[14px] md:text-[16px] mt-[4px] sm:mt-[5px] md:mt-[6px]">
                    {label}
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsHighlights
