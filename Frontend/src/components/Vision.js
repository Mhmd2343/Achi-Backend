import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const Vision = () => {

  const {t} = useTranslation();

  const handleScrollToElement = (e) => {
    const element = document.getElementById("contactForm");
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  return (
    <div className="bg-missionBg h-full bg-no-repeat bg-cover bg-center md:bg-initial mb-[60px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="py-[80px] ltr:pl-[20px] rtl:pr-[20px]  2xl:w-[1235px] xl:w-[982px] lg:w-[850px] md:w-[500px] sm:w-[400px] ltr:sm:pl-[50px] ltr:md:pl-[50px] ltr:lg:pl-[100px] rtl:sm:pr-[50px] rtl:md:pr-[50px] rtl:lg:pr-[100px]"
      >
        <h1 className="uppercase font-sairaStencil text-white text-[35px] leading-[36.4px] font-[400] 2xl:text-[40px] xl:text-[40px] lg:text-[40px] md:text-[40px] sm:text-[35px] 2xl:leading-[66px] xl:leading-[66px] lg:leading-[56.4px]">
          {t('vision.title')}
        </h1>
        <p className="pr-[10px] text-[15px] 2xl:text-[20px] xl:text-[17px] lg:text-[17px] md:text-[15px] sm:text-[15px] w-full 2xl:w-[982px] lg:w-[760px] md:w-[680px] sm:w-[380px] xl:w-[730px] xl:leading-[32px] lg:leading-[32px] leading-[24px] font-[400] text-white font-saira mt-[15px] sm:mt-[10px] md:mt-[10px] mb-[30px]">
          {t('vision.description')}
        </p>
        <button
          className="text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[700] leading-[29px] py-[12px] px-[55px] bg-[#7a95b981] rounded-[12px] uppercase hover:bg-transparent border-solid border-2 border-[#FF8E26] transition duration-500"
          onClick={handleScrollToElement}
        >
          {t('vision.btnText')}
        </button>
      </motion.div>
    </div>
  );
};

export default Vision;
