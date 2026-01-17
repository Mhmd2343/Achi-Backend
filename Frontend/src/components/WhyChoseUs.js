import React from 'react'
import { motion } from 'framer-motion'
import Slider from "react-slick"
import { useTranslation } from 'react-i18next'
import ImageWebp from './ImageWebp'

const WhyChoseUs = ({ direction }) => {
  const { t } = useTranslation()

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1800,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    swipeToSlide: true,
    slidesToShow: 3,
    swipe: true,
    responsive: [
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 1000, settings: { slidesToShow: 2 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
    ],
    rtl: direction === 'rtl',
  }

  return (
    <section
      id="WhychoseUs"
      aria-labelledby="whychoseus-title"
      className="py-[60px] mt-[80px] bg-bgwhychose bg-cover bg-center shadow-choseBg"
    >
      <motion.h2
        id="whychoseus-title"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="
          font-[Rajdhani]
          text-h2
          font-[700]
          uppercase
          mb-[40px]
          text-white
          text-center
        "
      >
        {t('whychoseus.sectionTitle')}
      </motion.h2>

      <p className="sr-only">
        ACHI Scaffolding delivers industrial and construction scaffolding systems and access solutions for construction, restoration, and industrial projects, including shoring and propping systems.
      </p>

      <Slider {...settings}>
        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/shield(1)1_lossyalpha.webp"
            src="/assets/shield(1)1_lossyalpha.webp"
            alt="Safety-driven scaffolding systems aligned with site constraints"
            className="mb-[20px] w-[60px]"
          />
          <h3 className="font-saira font-[700] text-h4 text-white mb-[12px]">
            {t('whychoseus.firstCardtitle')}
          </h3>
          <p className="font-saira font-[400] text-small text-white">
            {t('whychoseus.firstCardDescription')}
          </p>
        </div>

        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/support1_lossyalpha.webp"
            src="/assets/support1_lossyalpha.webp"
            alt="Reliable scaffolding support and execution for time-sensitive projects"
            className="mb-[20px] w-[60px]"
          />
          <h3 className="font-saira font-[700] text-h4 text-white mb-[12px]">
            {t('whychoseus.secondCardtitle')}
          </h3>
          <p className="font-saira font-[400] text-small text-white">
            {t('whychoseus.secondCardDescription')}
          </p>
        </div>

        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/technical-support1_lossyalpha.webp"
            src="/assets/technical-support1_lossyalpha.webp"
            alt="Technical guidance and clear communication with contractors and engineers"
            className="mb-[20px] w-[60px]"
          />
          <h3 className="font-saira font-[700] text-h4 text-white mb-[12px]">
            {t('whychoseus.thirdCardTitle')}
          </h3>
          <p className="font-saira font-[400] text-small text-white">
            {t('whychoseus.thirdCardDescription')}
          </p>
        </div>

        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/inventory1_lossyalpha.webp"
            src="/assets/inventory1_lossyalpha.webp"
            alt="Execution-ready scaffolding inventory and modular equipment availability"
            className="mb-[20px] w-[60px]"
          />
          <h3 className="font-saira font-[700] text-h4 text-white mb-[12px]">
            {t('whychoseus.fourthCardTitle')}
          </h3>
          <p className="font-saira font-[400] text-small text-white">
            {t('whychoseus.fourthCardDescription')}
          </p>
        </div>

        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/design-team1.png"
            src="/assets/design-team1.png"
            alt="Operational experience and engineering support for complex scaffolding projects"
            className="mb-[20px] w-[60px]"
          />
          <h3 className="font-saira font-[700] text-h4 text-white mb-[12px]">
            {t('whychoseus.fifthCardTitle')}
          </h3>
          <p className="font-saira font-[400] text-small text-white">
            {t('whychoseus.fifthCardDescription')}
          </p>
        </div>

        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/services/hard-hat.png"
            src="/assets/services/hard-hat.png"
            alt="Safety focused scaffolding team delivering compliant access systems"
            className="mb-[20px] w-[60px] brightness-0 invert"
          />
          <h3 className="font-saira font-[700] text-[18px] text-white mb-[12px] text-center">
            {t("whychoseus.sixthCardTitle")}
          </h3>
          <p className="font-saira font-[400] text-[13px] text-white leading-[1.7] text-left w-full">
           {t("whychoseus.sixthCardDescription")}
          </p>

        </div>

        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/services/lightbulb.png"
            src="/assets/services/lightbulb.png"
            alt="Innovative scaffolding solutions designed for real site conditions"
            className="mb-[20px] w-[60px] brightness-0 invert"
          />
          <h3 className="font-saira font-[700] text-[18px] text-white mb-[12px] text-center">
            {t("whychoseus.seventhCardTitle")}
          </h3>
          <p className="font-saira font-[400] text-[13px] text-white leading-[1.7] text-left w-full">
            {t("whychoseus.seventhCardDescription")}
          </p>

        </div>

        <div className="flex flex-col items-center bg-[#00204a7a] p-[30px] rounded-[0] h-full">
          <ImageWebp
            srcWebp="/assets/services/codesandbox.png"
            src="/assets/services/codesandbox.png"
            alt="Quality in scaffolding execution through precision and experience"
            className="mb-[20px] w-[60px] brightness-0 invert"
          />
          <h3 className="font-saira font-[700] text-[18px] text-white mb-[12px] text-center">
            {t("whychoseus.eighthCardTitle")}
          </h3>
         <p className="font-saira font-[400] text-[13px] text-white leading-[1.7] text-left w-full">
           {t("whychoseus.eighthCardDescription")}
         </p>

        </div>
      </Slider>
    </section>
  )
}

export default WhyChoseUs
