import React from 'react';
import { useTranslation } from 'react-i18next';
import ImageWebp from './ImageWebp';

const ContactInfos = () => {
  const { t } = useTranslation();
  const ASSET = process.env.PUBLIC_URL || "";

  return (
    <div className="flex flex-col justify-center items-start w-full my-[5px] md:my-[10px] px-0">
      <div className="flex justify-start items-center mb-[20px]">
        <ImageWebp
          srcWebp={`${ASSET}/assets/localisationsicon_lossyalpha.webp`}
          src={`${ASSET}/assets/localisationsicon_lossyalpha.webp`}
          className="ltr:mr-[10px] rtl:ml-[10px] ltr:sm:mr-[10px] rtl:sm:ml-[10px] w-[20px] md:w-[22px] lg:w-[22px]"
          alt="phone"
        />
        <p
          className="text-[15px] text-white font-[400] leading-[30px] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[13px] font-rubik"
          dir="ltr"
        >
          +96103322811
        </p>
      </div>

      <div className="flex justify-start items-center mb-[20px]">
        <ImageWebp
          srcWebp={`${ASSET}/assets/emailIcon_lossyalpha.webp`}
          src={`${ASSET}/assets/emailIcon_lossyalpha.webp`}
          className="ltr:mr-[10px] rtl:ml-[10px] ltr:sm:mr-[10px] rtl:sm:ml-[10px] w-[20px] md:w-[22px] lg:w-[22px]"
          alt="email"
        />
        <p className="text-[15px] text-white font-[400] leading-[30px] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[13px] font-rubik">
          achi.gr@hotmail.com
        </p>
      </div>

      <div className="flex justify-start items-center">
        <ImageWebp
          srcWebp={`${ASSET}/assets/localisationsicon_lossyalpha.webp`}
          src={`${ASSET}/assets/localisationsicon_lossyalpha.webp`}
          className="ltr:mr-[9px] rtl:ml-[9px] ltr:sm:mr-[8px] rtl:sm:ml-[8px] w-[22px] h-[22px] md:w-[22px] md:h-[22px] lg:w-[22px] lg:h-[22px]"
          alt="location"
        />
        <p className="text-[15px] text-white font-[400] leading-[30px] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[13px] font-rubik">
          {t('header.Lebanon')}
        </p>
      </div>
    </div>
  );
};

export default ContactInfos;
