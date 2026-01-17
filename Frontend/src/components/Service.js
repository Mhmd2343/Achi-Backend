// Frontend/src/components/Service.js
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ImageWebp from "./ImageWebp";

const WA_ICON = `${process.env.PUBLIC_URL}/assets/Whatsapp.svg`;

function GridItems({ index, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-items-stretch gap-[24px] lg:px-[50px] sm:px-[20px] px-[20px] mb-[50px] 2xl:mb-[0px] xl:mb-[0px]"
    >
      <div
        className="flex group/parent justify-center items-start flex-col w-full"
        id="PonteggiTradizionale"
      >
        <div className="relative group hover:bg-gray-900 overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/361641065_768035905323121_6701313797518833287_n2_lossyalpha.webp"
            id="switchImageAnim"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/361641065_768035905323121_6701313797518833287_n2_lossyalpha.webp"
            alt="Scaffolding service"
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
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.firstService")}
        </h3>
      </div>

      <div
        className="flex group/parent justify-center items-start flex-col w-full"
        id="ponteggiMultidirezionale"
      >
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/Suspendedscaffolding12_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/Suspendedscaffolding12_lossyalpha.webp"
            alt="Scaffolding service"
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
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.secondService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="ponteggiSospesi">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/SDC14429_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/SDC14429_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.thirdService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="pontegggiInternee">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/HomeBanner42_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/HomeBanner42_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.fourthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="StruturraPortata">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/HomeBanner12_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/HomeBanner12_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.fifthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="puntellamenti">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/20819369_135108873765021_8187137705964148355_o(1)2_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/20819369_135108873765021_8187137705964148355_o(1)2_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.sixthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="scaffoldingDesign">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/Scaffoldingdesign2_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/Scaffoldingdesign2_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.seventhService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="specializedLaborforce">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/361641065_768035905323121_6701313797518833287_n2_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/361641065_768035905323121_6701313797518833287_n2_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.ninthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="highRiseScaffolding">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/SDC14429_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/SDC14429_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.tenthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="circularDomeScaffolding">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/SDC14429_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/SDC14429_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.eleventhService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="scaffoldingForEvents">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/HomeBanner42_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/HomeBanner42_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.twelfthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="industrialScaffolding">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/HomeBanner42_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/HomeBanner42_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.thirteenthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="roofScaffolding">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/HomeBanner42_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/HomeBanner42_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.fourteenthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="mobileSuspendedScaffolding">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/Suspendedscaffolding12_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/Suspendedscaffolding12_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.fifteenthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="scaffoldingAccessStairs">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/SDC14429_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/SDC14429_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.sixteenthService")}
        </h3>
      </div>

      <div className="flex group/parent justify-center items-start flex-col w-full" id="unloadingLoadingPlatforms">
        <div className="relative hover:bg-gray-900 group overflow-hidden" style={{ borderRadius: 0 }}>
          <ImageWebp
            srcWebp="/assets/SDC14429_lossyalpha.webp"
            className="object-cover w-full block group-hover:opacity-50 h-[180px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
            style={{ borderRadius: 0, objectFit: 'cover', width: '100%' }}
            src="/assets/SDC14429_lossyalpha.webp"
            alt="Scaffolding service"
          />
          <div className="block w-full h-fit">
            <div className="absolute top-0 bottom-0 w-full h-full overflow-hidden p-2 flex items-center">
              <div className="w-full">
                <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 flex justify-center items-center">
                    <a
                      href="https://wa.me/+96103322811"
                      target="_blank"
                      rel="noreferrer"
                      className="flex rtl:flex-row-reverse justify-center items-center text-[12px] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] sm:text-[15px] text-white font-saira font-[600] leading-[29px] py-[10px] px-[30px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500"
                      aria-label="Contact ACHI Scaffolding on WhatsApp"
                    >
                      <img src={WA_ICON} className="w-[24px] mr-[10px]" alt="WhatsApp" />
                      {t("service.contactBtn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[14px] font-saira font-[700] leading-[1.4] text-[#28509E] group-hover/parent:text-[#ff8e26] transition-colors duration-300 mt-[12px] mb-[12px] lg:mt-[16px] lg:mb-[12px] xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[14px] capitalize inline-block border-b-[3px] border-[#28509E] pb-[6px]">
          {t("service.seventeenthService")}
        </h3>
      </div>
    </motion.div>
  );
}

const Service = ({ direction }) => {
  const { t } = useTranslation();

  return (
    <div id="service">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-[30px] 2xl:text-[40px] xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[30px] font-saira font-[700] leading-[53.3px] text-[#003A80] my-[30px] lg:mt-[30px] lg:mb-[50px] lg:leading-[73.3px]"
      >
        {t("service.title")}
      </motion.h2>

      <GridItems index={0} t={t} />
    </div>
  );
};

export default Service;
