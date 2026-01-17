import React from 'react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import ImageWebp from '../components/ImageWebp';
// import MetaTags from 'react-meta-tags';

const Maketplace = () => {
  const {t} = useTranslation();
  return (
    <div id='maketplace'>
      {/* <MetaTags>
        <title>Achi Scaffolding Marketplace | Your One-Stop Scaffolding Solution</title>
        <meta name="description" content="Discover the Achi Scaffolding Marketplace, your ultimate source for scaffolding solutions and services. Explore our wide range of offerings for your construction needs." />
        <meta property="og:title" content="Achi Scaffolding Marketplace | Your One-Stop Scaffolding Solution" />
      </MetaTags> */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-[30px] 2xl:text-[40px] xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[30px] font-saira font-[700] leading-[53.3px] text-[#003A80] my-[30px] lg:mt-[30px] lg:mb-[50px] lg:leading-[73.3px]"
      >
        {t('nav.marketplace')}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 2xl:place-items-start xl:place-items-start lg:place-items-start md:place-items-start sm:place-content-start place-items-center gap-x-8 px-[50px] sm:px-[45px] mb-[50px] 2xl:mb-[0px] xl:mb-[0px]"
      >
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 1
          </h3>
        </div>
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 2
          </h3>
        </div>
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 3
          </h3>
        </div>
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 4
          </h3>
        </div>
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 5
          </h3>
        </div>
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 6
          </h3>
        </div>
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 7
          </h3>
        </div>
        <div
          className="flex group/parent mb-[24px] lg:mb-[50px] justify-center items-start md:mb-[0px] flex-col 2xl:mb-[50px] xl:mb-[50px]"
          id="socialMarketing"
        >
          <div className="relative hover:bg-gray-900 group rounded-[17px]">
            <ImageWebp
              srcWebp='/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp'
              className="object-cover w-full h-full group-hover:opacity-50 rounded-[17px]"
              src="/assets/stock-photo-young-woman-using-smart-phone-social-media-concept-1573945981_lossyalpha.webp"
              alt="serviceIcon"
            />
            <div className="block w-full h-fit">
              <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
                <div className="w-full">
                  <div
                    className="transition-all transform 
                        translate-y-8 opacity-0 
                        group-hover:opacity-100 
                        group-hover:translate-y-0"
                  >
                    <div className="p-2 flex justify-center items-center">
                      <a
                        href="https://wa.me/+96103322811"
                        target="_blank"
                        rel="noreferrer"
                        className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      >
                        <img
                          src="/assets/Whatsapp.svg"
                          className="w-[24px] mr-[10px]"
                          alt="whatsappIcon"
                        />
                        {t('service.contactBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-[18px] font-saira font-[700] lg:leading-[42.18px] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[16px] mb-[24px] lg:mt-[24px] lg:mb-[24px] xl:text-[24px] lg:text-[24px] md:text-[22px] sm:text-[20px] capitalize">
            Item 8
          </h3>
        </div>
      </motion.div>
    </div>
  )
}

export default Maketplace