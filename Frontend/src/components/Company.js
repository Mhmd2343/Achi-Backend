// src/components/Company.js
import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import ImageWebp from "./ImageWebp"
import SmartLink from "../seo/SmartLink"

const Company = () => {
  const { t } = useTranslation()
  const ASSET = process.env.PUBLIC_URL || ""

  return (
    <section
      className="mt-[40px] h-full flex flex-col md:flex-row bg-[#FAFAFA] px-[0px]"
      id="aboutUs"
      aria-labelledby="home-about-title"
    >
      <div className="w-full hidden md:block">
        <ImageWebp
          srcWebp={`${ASSET}/assets/35629365_219471271995447_497227010943221760_n2_lossyalpha.webp`}
          src={`${ASSET}/assets/35629365_219471271995447_497227010943221760_n2_lossyalpha.webp`}
          alt={t("aboutUs.imageAlt") || "ACHI Scaffolding team and scaffolding installation project"}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="block md:hidden bg-gray-900">
        <ImageWebp
          srcWebp={`${ASSET}/assets/35629365_219471271995447_497227010943221760_n2_lossyalpha.webp`}
          src={`${ASSET}/assets/35629365_219471271995447_497227010943221760_n2_lossyalpha.webp`}
          alt={t("aboutUs.imageAlt") || "ACHI Scaffolding team and scaffolding installation project"}
          className="opacity-70 w-full"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="bg-[#28509E] pt-[26px] pb-[70px] md:py-[30px] md:pt-[45px] lg:px-[40px] md:px-[20px] px-[20px] sm:px-[30px] flex flex-col justify-start items-start text-white text-start w-full">
        <motion.h2
          id="home-about-title"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="block md:hidden w-full font-[Rajdhani] text-h2 font-[700] uppercase mb-[12px] leading-[1.15] text-white"
        >
          {t("aboutUs.title")}
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="hidden md:block w-full font-[Rajdhani] text-h2 font-[700] uppercase mb-[12px] leading-[1.15] text-white whitespace-pre-line"
        >
          {t("aboutUs.titleMultiLine")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-saira text-body font-[400] mt-[16px]"
        >
          {t("aboutUs.description")}
        </motion.p>

        <SmartLink
          to="/about"
          className="mt-[24px] inline-flex items-center justify-center bg-white text-[#214f9b] font-[700] uppercase rounded-[12px] px-[28px] py-[14px] text-[13px] hover:bg-[#25D366] hover:text-white transition duration-300"
          aria-label={t("aboutUs.ctaAria") || "Learn more about ACHI Scaffolding"}
        >
          {t("aboutUs.button") || "Learn more about us"}
        </SmartLink>
      </div>
    </section>
  )
}

export default Company
