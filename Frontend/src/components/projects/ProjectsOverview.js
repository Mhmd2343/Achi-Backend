// src/components/projects/ProjectsOverview.js
import React, { useMemo } from "react"
import { motion } from "framer-motion"
import ImageWebp from "../ImageWebp"
import { useTranslation } from "react-i18next"
import SmartLink from "../../seo/SmartLink"

const ProjectsOverview = () => {
  const { t } = useTranslation()
  const base = process.env.PUBLIC_URL || ""

  const projects = useMemo(
    () => [
      {
        id: "aishti-mall",
        title: "AISHTI Mall",
        img: `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/IMG_2189.JPG`,
        alt: "AISHTI Mall scaffolding project"
      },
      // {
      //   id: "beirut-business-center",
      //   title: "Beirut Business Center",
      //   img: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
      //   alt: "Beirut Business Center scaffolding project"
      // },
      // {
      //   id: "hotel-le-gray",
      //   title: "Hotel Le Gray",
      //   img: `${base}/assets/workDone/HOTEL LE GRAY/IMG_2186.JPG`,
      //   alt: "Hotel Le Gray scaffolding project"
      // }
    ],
    [base]
  )

  return (
    <section id="projects-overview" aria-labelledby="home-projects-title">
      <header className="px-[20px] sm:px-[20px] lg:px-[50px]">
        <motion.h2
          id="home-projects-title"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-h2 font-[Rajdhani] font-[700] uppercase mb-[40px] text-[#003A80] my-[30px] lg:mt-[30px] lg:mb-[50px]"
        >
          {t("projectsOverview.title")}
        </motion.h2>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-fr gap-[24px] justify-items-stretch lg:px-[50px] sm:px-[20px] px-[20px] mb-[40px]"
      >
        {projects.map((project) => (
          <SmartLink
            key={project.id}
            to={`/project/${project.id}`}
            className="relative flex group/parent bg-transparent text-left items-start flex-col w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
            style={{ borderRadius: 0 }}
            aria-labelledby={`${project.id}-title`}
          >
            <div className="relative group w-full overflow-hidden" style={{ borderRadius: 0 }}>
              <ImageWebp
                srcWebp={project.img}
                src={project.img}
                className="object-cover w-full block h-[220px] md:h-[280px] lg:h-[300px] xl:h-[320px]"
                style={{ borderRadius: 0, objectFit: "cover", width: "100%" }}
                alt={project.alt}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="w-full pt-[12px] text-left">
              <h3
                id={`${project.id}-title`}
                className="text-[22px] font-saira font-[900] sm:font-[900] md:font-[900] lg:font-[800] xl:font-[800] 2xl:font-[800] leading-[1.4] text-[#28509E] mt-[0px] mb-[0px] capitalize inline-block border-b-[2px] border-[#28509E] pb-[6px]"
              >
                {project.title}
              </h3>
            </div>
          </SmartLink>
        ))}
      </motion.div>

      <div className="w-full text-center mt-[80px] mb-[80px]">
        <SmartLink
          to="/projects"
          className="group inline-flex items-center justify-center gap-[8px] text-small md:text-body text-white font-saira font-[700] px-[32px] py-[14px] bg-[#003A80] rounded-[8px] hover:bg-[#28509E] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          aria-label={t("projectsOverview.viewAll")}
        >
          {t("projectsOverview.viewAll")}
          <svg className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </SmartLink>
      </div>
    </section>
  )
}

export default ProjectsOverview
