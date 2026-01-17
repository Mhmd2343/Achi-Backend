import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Values = () => {
    const {t} = useTranslation();
    return (
        <div className='bg-[#28509E] pt-[40px] sm:pt-[40px] md:pt-[60px] pb-[90px]' id='values'>
            <motion.h1
              initial={{opacity : 0 ,scale : 0.8}}
              whileInView={{opacity : 1, scale : 1}}
              transition={{duration : 0.8, delay : 0.5}}
              viewport={{once : true}}
                className='text-center mb-[40px] text-[30px] 2xl:text-[40px] xl:text-[40px] lg:text-[35px] md:text-[40px] sm:text-[30px] font-sairaStencil font-[600px] leading-[53.3px] text-[#FFFFFF] lg:leading-[73.3px] uppercase'
            >
                {t('values.title')}
            </motion.h1>
            <div className='grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-start gap-x-4 px-[20px] md:px-[50px] sm:px-[100px] mb-[20px] gap-y-6 lg:gap-y-10'>
                <div className='h-full flex justify-center items-start md:items-center flex-col w-full bg-[#F7F7F7] p-[20px] md:p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/reliability.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[20px] md:text-[25px] text-[#28509E]'>{t('values.firstValueTitle')}</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px] xl:text-[18px] text-[#333333] text-start md:text-center'>{t('values.firstValueDescription')}</p>
                </div>
                <div className='h-full flex justify-center items-start md:items-center flex-col w-full bg-[#F7F7F7] p-[20px] md:p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/target.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[20px] md:text-[25px] text-[#28509E]'>{t('values.secondValueTitle')}</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px]  xl:text-[18px] text-[#333333] text-start md:text-center'>{t('values.secondValueDescription')}</p>
                </div>
                <div className='h-full flex justify-center items-start md:items-center flex-col w-full bg-[#F7F7F7] p-[20px] md:p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/innovation.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[20px] md:text-[25px] text-[#28509E]'>{t('values.thirdValueTitle')}</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px]  xl:text-[18px] text-[#333333] text-start md:text-center'>{t('values.thirdValueDescription')}</p>
                </div>
                <div className='h-full flex justify-center items-start md:items-center flex-col w-full md:flex sm:flex bg-[#F7F7F7] p-[20px] md:p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/collaboration.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[20px] md:text-[25px] text-[#28509E]'>{t('values.fourthValueTitle')}</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px]  xl:text-[18px] text-[#333333] text-start md:text-center'>{t('values.fourthValueDescription')}</p>
                </div>
                <div className='h-full flex justify-center items-start md:items-center flex-col w-full md:flex sm:flex bg-[#F7F7F7] p-[20px] md:p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/diver.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[20px] md:text-[25px] text-[#28509E]'>{t('values.fifthValueTitle')}</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px] xl:text-[18px] text-[#333333] text-start md:text-center'>{t('values.fifthValueDescription')}</p>
                </div>
                <div className='h-full flex justify-center items-start md:items-center flex-col w-full md:flex sm:flex bg-[#F7F7F7] p-[20px] md:p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/diver.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[20px] md:text-[25px] text-[#28509E]'>{t('values.sixthValueTitle')}</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px] xl:text-[18px] text-[#333333] text-start md:text-center'>{t('values.sixthValueDescription')}</p>
                </div>
            </div>
            {/* <div className='hidden grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 justify-center sm:grid-cols-1 place-items-start px-[50px]  2xl:px-[300px] xl:px-[235px] lg:px-[235px] md:hidden sm:px-[200px] gap-x-4 2xl:grid lg:grid'>
                <div className='flex justify-center items-center flex-col w-full bg-[#F7F7F7] p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/collaboration.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[25px] text-[#28509E]'>Collaboration</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px] xl:text-[18px] text-[#333333] text-center'>We value <strong>teamwork and transparency,</strong> working closely with our clients to co-create the best solutions for them.</p>
                </div>
                <div className='flex justify-center items-center flex-col w-full bg-[#F7F7F7] p-[40px] xl:px-[50px] rounded-[20px]'>
                    <motion.img animate={{ rotate: 360 }} transition={{ type: "spring", duration: 5, bounce: 0.6, repeat: Infinity }} src="/assets/diver.png" alt='serviceIcon' className='w-[60px] xl:w-[90px] mb-[10px]' />
                    <div className='flex flex-row justify-center items-center mb-[20px]'>
                        <p className='font-saira font-[700] text-[25px] text-[#28509E] text-center'>Diversity</p>
                    </div>
                    <p className='font-saira font-[400] text-[15px] xl:text-[18px] text-[#333333] text-center'>We celebrate diversity and inclusivity, <strong>fostering a supportive and welcoming environment</strong> for our team and clients.</p>
                </div>
            </div> */}
        </div>
      )
}

export default Values