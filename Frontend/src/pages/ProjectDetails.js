import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { Link, useLocation, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { getLangFromPath } from "../utils/langRouting"
import AlternatingSection from "../components/AlternatingSection"

const ProjectDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const location = useLocation()

  const base = process.env.PUBLIC_URL || ""
  const currentLang = getLangFromPath(location.pathname)

  const langPath = (path) => {
    const prefix = currentLang === "fr" ? "fr" : currentLang === "ar" ? "lb" : ""
    if (!prefix) return path
    return `/${prefix}${path}`
  }

  const PROJECT_MEDIA = useMemo(
    () => ({
      "aishti-mall": {
        hero: `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/edit.JPG`,
        gallery: [
          `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/Home banner 6.jpg`,
          `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/Home Banner 5.JPG`,
          `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/0W0A1226 2.JPG`,
        ],
      },
      "beirut-business-center": {
        hero: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
        gallery: [
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/Home banner 2.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17893.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17898.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17899 copy.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17899.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17900.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17901.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC19484.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC19485.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC19487.JPG`,
        ],
      },
      "hotel-le-gray": {
        hero: `${base}/assets/workDone/HOTEL LE GRAY/IMG_2186.JPG`,
        gallery: [`${base}/assets/workDone/HOTEL LE GRAY/IMG_2186.JPG`],
      },
    }),
    [base]
  )

  const safeId = id && PROJECT_MEDIA[id] ? id : "aishti-mall"
  const media = PROJECT_MEDIA[safeId]

  // Limit gallery to first 3 images for aishti-mall project (3 images outside hero)
  const limitedGallery = safeId === "aishti-mall" 
    ? (media.gallery || []).slice(0, 3)
    : (media.gallery || [])

  // Use hero property for hero section (keep separate from gallery)
  const heroImage = media.hero

  const NS = "projectDetails"
  const keyBase = `${NS}.items.${safeId}`

  const canonical = `${base}${langPath(`/project/${safeId}`)}`

  // Extract location from project title or description
  const heroTitle = t(`${keyBase}.heroTitle`)
  const description = t(`${keyBase}.seoDescription`)
  
  // Structured Data for SEO - Using CreativeWork schema
  const projectSchema = useMemo(() => {
    const paragraphs = Array.isArray(t(`${keyBase}.paragraphs`, { returnObjects: true }))
      ? t(`${keyBase}.paragraphs`, { returnObjects: true }).filter((p) => !p.match(/^\[.*Contact.*\]$/i))
      : []
    const articleBody = paragraphs.join(" ")
    
    // Extract location from title (e.g., "Aïshti Mall - Metn, Lebanon")
    const locationMatch = heroTitle.match(/- (.+)$/)
    const location = locationMatch ? locationMatch[1].trim() : "Lebanon"

    // Build image array: hero + 3 gallery images (4 total)
    const allImages = []
    if (heroImage) {
      const heroUrl = heroImage.startsWith('http') ? heroImage : `${base}${heroImage}`
      allImages.push(heroUrl)
    }
    limitedGallery.forEach((img) => {
      const fullUrl = img.startsWith('http') ? img : `${base}${img}`
      if (!allImages.includes(fullUrl)) {
        allImages.push(fullUrl)
      }
    })

    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": heroTitle,
      "headline": heroTitle,
      "description": description,
      "image": allImages.length > 0 ? allImages : undefined,
      "url": canonical,
      "author": {
        "@type": "Organization",
        "name": "ACHI Scaffolding"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ACHI Scaffolding",
        "url": `${base}${langPath("/")}`,
        "logo": {
          "@type": "ImageObject",
          "url": `${base}/assets/ArchiScaffoldinglogo.png`
        }
      },
      "spatialCoverage": {
        "@type": "Place",
        "name": location
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonical
      },
      "text": articleBody,
      "inLanguage": currentLang === "fr" ? "fr" : currentLang === "ar" ? "ar" : "en"
    }
  }, [t, keyBase, heroImage, base, canonical, heroTitle, description, langPath, limitedGallery, currentLang])

  const breadcrumbSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${base}${langPath("/")}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": `${base}${langPath("/projects")}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": t(`${keyBase}.heroTitle`),
          "item": canonical
        }
      ]
    }
  }, [base, langPath, canonical, t, keyBase])

  // Group paragraphs into sections with headings
  const contentSections = useMemo(() => {
    const paragraphs = Array.isArray(t(`${keyBase}.paragraphs`, { returnObjects: true }))
      ? t(`${keyBase}.paragraphs`, { returnObjects: true }).filter((p) => !p.match(/^\[.*Contact.*\]$/i))
      : []

    const sections = []
    let currentSection = null
    const maxGalleryImages = limitedGallery.length || 3
    // For aishti-mall: only show images in first 3 sections, then no images
    const isAishtiMall = safeId === "aishti-mall"
    let imageSectionCount = 0
    const maxImageSections = isAishtiMall ? 3 : Infinity

    paragraphs.forEach((para, idx) => {
      // Check if paragraph is a heading (short text, uppercase, or contains key section words)
      const isHeading = para.length < 80 && (
        para === para.toUpperCase() ||
        /^(Project Overview|Scope|Site Constraints|Safety|Project Outcome|Location|Discuss)/i.test(para) ||
        (para.length < 50 && !para.includes(".") && !para.includes(","))
      )

      if (isHeading) {
        // Save previous section if exists
        if (currentSection && currentSection.body.length > 0) {
          sections.push(currentSection)
        }
        // Start new section
        // For aishti-mall: only assign images to first 3 sections
        const shouldHaveImage = isAishtiMall ? imageSectionCount < maxImageSections : true
        currentSection = {
          title: para,
          body: [],
          imageIndex: shouldHaveImage ? imageSectionCount : null,
          hasImage: shouldHaveImage
        }
        if (shouldHaveImage) {
          imageSectionCount++
        }
      } else if (currentSection) {
        // Add paragraph to current section
        currentSection.body.push(para)
      } else {
        // First paragraph without heading - create section with main heading
        const shouldHaveImage = isAishtiMall ? imageSectionCount < maxImageSections : true
        currentSection = {
          title: t(`${keyBase}.heading`),
          body: [para],
          imageIndex: shouldHaveImage ? imageSectionCount : null,
          hasImage: shouldHaveImage
        }
        if (shouldHaveImage) {
          imageSectionCount++
        }
      }
    })

    // Add last section
    if (currentSection && currentSection.body.length > 0) {
      sections.push(currentSection)
    }

    return sections
  }, [t, keyBase, limitedGallery.length, safeId])

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#003A80] focus:text-white focus:rounded focus:font-bold"
      >
        Skip to main content
      </a>

      <main id="main-content" className="bg-white" itemScope itemType="https://schema.org/Article">
        <SEO
          title={t(`${keyBase}.seoTitle`)}
          description={t(`${keyBase}.seoDescription`)}
          canonical={canonical}
          ogTitle={heroTitle}
          ogDescription={description}
          ogImage={heroImage ? `${base}${heroImage}` : undefined}
          ogType="article"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <header className="bg-[#214f9b] text-white overflow-hidden border-t border-white/25">
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[280px] md:min-h-[320px] lg:h-[360px]">
              {/* LEFT – text (still centered & constrained) */}
              <div className="flex flex-col justify-start px-[20px] sm:px-[40px] md:px-[60px] lg:pl-[calc((100vw-1400px)/2+80px)] pt-[30px] md:pt-[40px] lg:pt-[50px] pb-[40px]">
                <h1
                  itemProp="headline"
                  className=" mt-[25px] md:mt-[70px] font-[Rajdhani] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700] uppercase m-0 leading-[1.2]"
                >
                  {t(`${keyBase}.heroTitle`)}
                </h1>
                <p className="sr-only" itemProp="description">
                  {description}
                </p>
              </div>

              {/* RIGHT – image (full bleed to screen edge) */}
              <figure className="w-full h-[240px] md:h-[320px] lg:h-[480px] m-0">
                <img
                  src={heroImage}
                  alt={t(`${keyBase}.heroImageAlt`) || `${heroTitle} - ACHI Scaffolding project`}
                  itemProp="image"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  width="800"
                  height="480"
                  style={{
                    aspectRatio: "16/9",
                    objectPosition: safeId === "aishti-mall" ? "center 35%" : "center center"
                  }}
                />
              </figure>
            </div>
          </div>
        </header>


        {/* Alternating Content Sections */}
        <article itemProp="articleBody">
          {contentSections.map((section, index) => {
            // For aishti-mall: only show image if section hasImage is true and imageIndex is valid
            const shouldShowImage = section.hasImage !== false && section.imageIndex !== null && section.imageIndex < limitedGallery.length
            const imageSrc = shouldShowImage ? limitedGallery[section.imageIndex] : null
            // Generate descriptive alt text for SEO
            const imageAlt = shouldShowImage 
              ? (t(`${keyBase}.galleryAlt`, { index: section.imageIndex + 1 }) || `${heroTitle} - ${section.title} - ACHI Scaffolding project image ${section.imageIndex + 1}`)
              : ""
            // Check if this is the last image for Aishti Mall (3rd image, index 2)
            const isLastAishtiImage = safeId === "aishti-mall" && shouldShowImage && section.imageIndex === 2
            
            return (
              <section
                key={`section-${index}`}
                aria-labelledby={`section-heading-${index}`}
                className="w-full py-[40px] md:py-[50px]"
              >
                <AlternatingSection
                  title={section.title}
                  titleId={`section-heading-${index}`}
                  body={
                    <div className="space-y-[16px]">
                      {section.body.map((para, pIdx) => (
                        <p
                          key={`para-${index}-${pIdx}`}
                          className="font-['Open_Sans'] text-[16px] md:text-[17px] leading-[1.7] text-[#333333] m-0"
                          itemProp="text"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  }
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                  reverse={index % 2 === 1}
                  adjustImagePosition={isLastAishtiImage}
                />
              </section>
            )
          })}
        </article>

        {/* DEBUG: Image count check (remove after verification) */}
        {safeId === "aishti-mall" && typeof window !== "undefined" && process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  setTimeout(function() {
                    const main = document.querySelector('main#main-content');
                    if (main) {
                      const images = main.querySelectorAll('img');
                      const count = images.length;
                      console.log('AISHTI-MALL IMG COUNT:', count);
                      if (count !== 4) {
                        console.warn('WARNING: Expected 4 images (1 hero + 3 gallery), found:', count);
                      }
                    }
                  }, 1000);
                })();
              `
            }}
          />
        )}

      {/* Back to Projects Link */}
      <section className="max-w-[1400px] mx-auto px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[40px]">
        <div className="flex justify-center">
          <Link
            to={langPath("/projects")}
            className="inline-flex items-center gap-[12px] font-[Rajdhani] text-[14px] md:text-[15px] uppercase font-[700] text-[#214f9b] border-2 border-[#214f9b] px-[24px] py-[10px] rounded-[30px] hover:bg-[#214f9b] hover:text-white transition-all duration-300"
            aria-label={t(`${NS}.backToProjectsAria`)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="rtl:rotate-180">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t(`${NS}.backToProjects`)}
          </Link>
        </div>
      </section>

      <section id="contactForm" className="bg-[#214f9b] text-white mt-[80px] md:mt-[100px]" aria-labelledby="contact-form-title">
        <div className="max-w-[1400px] mx-auto px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[60px] md:py-[80px]">
          <div className="flex flex-col lg:flex-row justify-between gap-[50px] lg:gap-[80px]">
            <div className="flex-1 lg:basis-[55%]">
              <form className="flex flex-col gap-[18px]" onSubmit={(e) => e.preventDefault()} aria-label={t(`${NS}.contact.formAria`) || "Contact form"}>
                <label htmlFor="name" className="sr-only">
                  {t(`${NS}.contact.form.name`) || "Name"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t(`${NS}.contact.form.name`)}
                  className="w-full px-[20px] py-[14px] bg-transparent rounded-[12px] border border-white/50 text-white placeholder-white/70 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/20 transition-all text-[16px] ltr:text-left rtl:text-right"
                  aria-required="true"
                />
                <label htmlFor="email" className="sr-only">
                  {t(`${NS}.contact.form.email`) || "Email"}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t(`${NS}.contact.form.email`)}
                  className="w-full px-[20px] py-[14px] bg-transparent rounded-[12px] border border-white/50 text-white placeholder-white/70 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/20 transition-all text-[16px] ltr:text-left rtl:text-right"
                  aria-required="true"
                />
                <label htmlFor="phone" className="sr-only">
                  {t(`${NS}.contact.form.phone`) || "Phone"}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t(`${NS}.contact.form.phone`)}
                  className="w-full px-[20px] py-[14px] bg-transparent rounded-[12px] border border-white/50 text-white placeholder-white/70 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/20 transition-all text-[16px] ltr:text-left rtl:text-right"
                  aria-required="true"
                />
                <label htmlFor="message" className="sr-only">
                  {t(`${NS}.contact.form.message`) || "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t(`${NS}.contact.form.message`)}
                  className="w-full px-[20px] py-[14px] bg-transparent rounded-[12px] border border-white/50 text-white placeholder-white/70 outline-none resize-none focus:border-white/80 focus:ring-2 focus:ring-white/20 transition-all text-[16px] ltr:text-left rtl:text-right"
                  aria-required="true"
                />
              </form>
            </div>

            <div className="flex-1 lg:basis-[45%] flex flex-col items-center justify-center text-center">
              <h2 id="contact-form-title" className="font-[Rajdhani] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700] uppercase mb-[32px] leading-[1.2]">
                {t(`${NS}.contact.title`)}
              </h2>

              <button
                type="button"
                className="px-[40px] md:px-[50px] py-[14px] md:py-[16px] text-[16px] md:text-[18px] rounded-[30px] bg-[#FF8A00] hover:bg-[#ffaa44] transition-all duration-300 text-white font-[Rajdhani] font-[700] uppercase shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#214f9b]"
                aria-label={t(`${NS}.contact.sendAria`) || "Send message"}
              >
                {t(`${NS}.contact.send`)}
              </button>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

export default ProjectDetails
