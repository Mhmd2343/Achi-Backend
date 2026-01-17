import React from "react";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Mission = () => {
  // const handleScrollToElement = (e) => {
  //   const element = document.getElementById("contactForm");
  //   element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  // }
  const {t} = useTranslation();
  return (
    <div className="h-full">
      <motion.div 
          initial={{opacity : 0 ,scale : 0.8}}
          whileInView={{opacity : 1, scale : 1}}
          transition={{duration : 0.8 , delay : 0.5}}
          viewport={{once : true}}
          className="flex flex-col justify-center items-center px-2">

        <h1 className="uppercase text-[#003A80] font-sairaStencil md:mb-[5px] text-[35px] leading-[36.4px] font-[400] md:text-[40px] 2xl:leading-[66px] xl:leading-[66px] lg:leading-[56.4px]">
          {t('mission.title')}
        </h1>
        <p className="md:pr-[10px] w-full md:w-full px-8 text-[15px] 2xl:text-[20px] xl:text-[17px] lg:text-[17px] md:text-[15px] sm:text-[15px] xl:leading-[32px] lg:leading-[32px] leading-[24px] text-[#003A80] mt-[15px] sm:mt-[10px] md:mt-[10px] mb-[30px] text-center font-saira font-[400]">
          {t('mission.description')}
        </p>
        <a href='https://wa.me/+96103322811' target="_blank" rel="noreferrer" className='text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[700] leading-[29px] py-[12px] px-[55px] bg-[#28509e] rounded-[12px] uppercase border-2 border-[#28509e] transition duration-500'>
          {t('mission.btnText')}
        </a>
      </motion.div >
    </div>
  );
};

export default Mission;