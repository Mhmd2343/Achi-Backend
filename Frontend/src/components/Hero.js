import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ImageWebp from "./ImageWebp";

const Hero = ({ showMenu, setshowMenu, direction, userLang }) => {
  const { t } = useTranslation();

  const ASSET = process.env.PUBLIC_URL || "";

  const panelBase =
    "flex flex-col ltr:ml-[20px] rtl:mr-[20px] max-w-[650px] ltr:2xl:ml-[100px] ltr:xl:ml-[80px] ltr:lg:ml-[60px] ltr:md:ml-[40px] ltr:sm:ml-[20px] rtl:2xl:mr-[100px] rtl:xl:mr-[80px] rtl:lg:mr-[60px] rtl:md:mr-[40px] rtl:sm:mr-[20px] p-[20px] rounded-[10px] bg-gradient-to-tr from-black/60 via-black/30 to-black/5";
  const panelSlide1 = `${panelBase} mt-[0px]`;

  return (
    <div id="hero">
      {/* <Navbar showMenu={showMenu} setshowMenu={setshowMenu} userLang={userLang} withBg={false} /> */}

      <div
        className="bg-firstSlideBg min-h-[800px] md:min-h-[700px] bg-no-repeat bg-cover bg-center flex items-center"
        dir={direction}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className={panelSlide1}
        >
          <h2 className="font-[Rajdhani] uppercase text-white text-h2 font-[700] leading-[1.15] mb-[24px]">
            {t("banner1.title")}
          </h2>

          <p className="text-body font-[400] text-white font-saira mb-[30px] leading-[26px]">
            {t("banner1.subtitle")}
          </p>

          <a
            href="https://wa.me/+96103322811"
            target="_blank"
            rel="noreferrer"
              className="self-start inline-flex justify-center items-center px-[16px] py-[12px] text-[11px] 2xl:text-[13px] xl:text-[13px] lg:text-[13px] md:text-[13px] sm:text-[13px] text-white font-saira font-[700] leading-[26px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500 heroBtn whitespace-nowrap"
          >
            {t("banner1.button")}
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
