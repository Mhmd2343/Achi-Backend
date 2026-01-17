import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ImageWebp from "../components/ImageWebp"
import SEO from "../components/SEO"
import { useTranslation } from "react-i18next"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang } from "../utils/langRouting"


const hideBreadcrumb = true

const clamp01 = (n) => Math.max(0, Math.min(1, n))

const BlogItem = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { urlLang } = useLangRouter()

  const base = process.env.PUBLIC_URL || ""

  const cleanPath = useMemo(() => location.pathname.replace(/^\/(fr|lb)(?=\/|$)/, ""), [location.pathname])
const postId = useMemo(() => {
  const p = cleanPath.replace(/\/$/, "")
  const m = p.match(/\/blog-post-(\d+)$/)
  return m?.[1] || ""
}, [cleanPath])
  const cleanPathForHomeCheck = useMemo(
    () => location.pathname.replace(/^\/(fr|lb)(?=\/|$)/, ""),
    [location.pathname]
  )

  const isHome = cleanPathForHomeCheck === "/" || cleanPathForHomeCheck === ""

  const goToHomeSection = (id) => {
    if (!isHome) {
      navigate(`${buildPathWithLang(urlLang, "/")}#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const articleRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [tocOpen, setTocOpen] = useState(false)

  const months = useMemo(() => t("blogPage.months", { returnObjects: true }) || [], [t])

  const buildSectionsFromI18n = (pid) => {
    const raw = t(`blogItem.posts.${pid}.sections`, { returnObjects: true })
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return []

    return Object.entries(raw).map(([key, val]) => {
      const title = val?.title || ""
      const blocks = []

      const pushP = (x) => {
        if (!x) return
        const s = String(x).trim()
        if (!s) return
        blocks.push({ type: "p", text: s })
      }

      pushP(val?.p1)
      pushP(val?.p2)

      if (Array.isArray(val?.bullets) && val.bullets.length > 0) {
        blocks.push({ type: "ul", items: val.bullets.filter(Boolean).map((x) => String(x).trim()).filter(Boolean) })
      }

      pushP(val?.p3)
      pushP(val?.p4)

      return {
        id: `s-${key}`,
        h2: title,
        blocks,
      }
    })
  }

  const postConfig = useMemo(() => {

    const p1Sections = [
      {
        id: "regulatory-context",
        h2: t("blogItem.posts.1.sections.regulatoryContext.title"),
        blocks: [
          { type: "p", text: t("blogItem.posts.1.sections.regulatoryContext.p1") },
          { type: "p", text: t("blogItem.posts.1.sections.regulatoryContext.p2") },
          {
            type: "ul",
            items: [
              t("blogItem.posts.1.sections.regulatoryContext.bullets.0"),
              t("blogItem.posts.1.sections.regulatoryContext.bullets.1"),
              t("blogItem.posts.1.sections.regulatoryContext.bullets.2"),
            ],
          },
          { type: "p", text: t("blogItem.posts.1.sections.regulatoryContext.p3") },
        ],
      },
      {
        id: "risks",
        h2: t("blogItem.posts.1.sections.risks.title"),
        blocks: [
          { type: "p", text: t("blogItem.posts.1.sections.risks.p1") },
          {
            type: "ul",
            items: [
              t("blogItem.posts.1.sections.risks.bullets.0"),
              t("blogItem.posts.1.sections.risks.bullets.1"),
              t("blogItem.posts.1.sections.risks.bullets.2"),
              t("blogItem.posts.1.sections.risks.bullets.3"),
            ],
          },
          { type: "p", text: t("blogItem.posts.1.sections.risks.p2") },
        ],
      },
      {
        id: "engineering-led",
        h2: t("blogItem.posts.1.sections.engineeringLed.title"),
        blocks: [
          { type: "p", text: t("blogItem.posts.1.sections.engineeringLed.p1") },
          {
            type: "ul",
            items: [
              t("blogItem.posts.1.sections.engineeringLed.bullets.0"),
              t("blogItem.posts.1.sections.engineeringLed.bullets.1"),
              t("blogItem.posts.1.sections.engineeringLed.bullets.2"),
              t("blogItem.posts.1.sections.engineeringLed.bullets.3"),
            ],
          },
          { type: "p", text: t("blogItem.posts.1.sections.engineeringLed.p2") },
        ],
      },
      {
        id: "beyond-compliance",
        h2: t("blogItem.posts.1.sections.beyondCompliance.title"),
        blocks: [
          { type: "p", text: t("blogItem.posts.1.sections.beyondCompliance.p1") },
          { type: "p", text: t("blogItem.posts.1.sections.beyondCompliance.p2") },
          {
            type: "ul",
            items: [
              t("blogItem.posts.1.sections.beyondCompliance.bullets.0"),
              t("blogItem.posts.1.sections.beyondCompliance.bullets.1"),
              t("blogItem.posts.1.sections.beyondCompliance.bullets.2"),
            ],
          },
          { type: "p", text: t("blogItem.posts.1.sections.beyondCompliance.p3") },
        ],
      },
      {
        id: "evolving-expectations",
        h2: t("blogItem.posts.1.sections.evolvingExpectations.title"),
        blocks: [
          { type: "p", text: t("blogItem.posts.1.sections.evolvingExpectations.p1") },
          { type: "p", text: t("blogItem.posts.1.sections.evolvingExpectations.p2") },
          {
            type: "ul",
            items: [
              t("blogItem.posts.1.sections.evolvingExpectations.bullets.0"),
              t("blogItem.posts.1.sections.evolvingExpectations.bullets.1"),
              t("blogItem.posts.1.sections.evolvingExpectations.bullets.2"),
              t("blogItem.posts.1.sections.evolvingExpectations.bullets.3"),
            ],
          },
          { type: "p", text: t("blogItem.posts.1.sections.evolvingExpectations.p3") },
        ],
      },
      {
        id: "moving-forward",
        h2: t("blogItem.posts.1.sections.movingForward.title"),
        blocks: [
          { type: "p", text: t("blogItem.posts.1.sections.movingForward.p1") },
          { type: "p", text: t("blogItem.posts.1.sections.movingForward.p2") },
          {
            type: "ul",
            items: [
              t("blogItem.posts.1.sections.movingForward.bullets.0"),
              t("blogItem.posts.1.sections.movingForward.bullets.1"),
              t("blogItem.posts.1.sections.movingForward.bullets.2"),
            ],
          },
          { type: "p", text: t("blogItem.posts.1.sections.movingForward.p3") },
        ],
      },
      {
        id: "final-perspective",
        h2: t("blogItem.posts.1.sections.finalPerspective.title"),
        blocks: [{ type: "p", text: t("blogItem.posts.1.sections.finalPerspective.p1") }],
      },
      {
        id: "cta",
        h2: t("blogItem.posts.1.sections.cta.title"),
        blocks: [
          { type: "p", text: t("blogItem.posts.1.sections.cta.p1") },
          { type: "p", text: t("blogItem.posts.1.sections.cta.p2") },
        ],
      },
    ]

    const p2SectionsRaw = buildSectionsFromI18n("2")
    const p2Sections = p2SectionsRaw.map((s) => ({
      ...s,
      id: s.id.replace(/^s-/, "tw-"),
    }))

    const map = {
      "1": {
        seoTitle: t("blogItem.posts.1.seoTitle"),
        seoDescription: t("blogItem.posts.1.seoDescription"),
        canonical: t("blogItem.posts.1.canonical"),
        h1: t("blogItem.posts.1.h1"),
        image: `${base}/assets/blog/blog1.png`,
        imageAlt: t("blogItem.posts.1.imageAlt"),
        category: t("blogItem.posts.1.category"),
        readingTime: t("blogItem.posts.1.readingTime"),
   
        // END MERGED BLOCK
        keyTakeaways: [
          t("blogItem.posts.1.takeaways.0"),
          t("blogItem.posts.1.takeaways.1"),
          t("blogItem.posts.1.takeaways.2"),
        ],
        tocEnabled: true,
        sections: p1Sections,
        conclusion: t("blogItem.posts.1.conclusion"),
        recommended: [],
        externalSources: [
          {
            label: t("blogItem.externalSources.internationalSafetyBoards"),
            href: t("blogItem.externalSources.internationalSafetyBoardsHref"),
          },
          {
            label: t("blogItem.externalSources.publicWorksLebanon"),
            href: t("blogItem.externalSources.publicWorksLebanonHref"),
          },
        ],
      },
  "2": {
  seoTitle: t("blogItem.posts.2.seoTitle"),
  seoDescription: t("blogItem.posts.2.seoDescription"),
  canonical: t("blogItem.posts.2.canonical"),
  h1: t("blogItem.posts.2.h1"),
  image: `${base}/assets/blog/blog2.png`,
  imageAlt: t("blogItem.posts.2.imageAlt"),
  category: t("blogItem.posts.2.category"),
  readingTime: t("blogItem.posts.2.readingTime"),
 
  keyTakeaways: [
    t("blogItem.posts.2.takeaways.0"),
    t("blogItem.posts.2.takeaways.1"),
    t("blogItem.posts.2.takeaways.2"),
  ],
  tocEnabled: true,
  sections: p2Sections,
  conclusion: t("blogItem.posts.2.conclusion"),
  recommended: [],
  externalSources: [],
},

      "3": {
        seoTitle: t("blogItem.posts.3.seoTitle"),
        seoDescription: t("blogItem.posts.3.seoDescription"),
        canonical: t("blogItem.posts.3.canonical"),
        h1: t("blogItem.posts.3.h1"),
        image: `${base}/assets/blog/blog3.png`,
        imageAlt: t("blogItem.posts.3.imageAlt"),
        category: t("blogItem.posts.3.category"),
        readingTime: t("blogItem.posts.3.readingTime"),
       
        keyTakeaways: [
          t("blogItem.posts.3.takeaways.0"),
          t("blogItem.posts.3.takeaways.1"),
          t("blogItem.posts.3.takeaways.2"),
        ],
        tocEnabled: false,
        sections: [],
        conclusion: "",
        recommended: [],
        externalSources: [],
      },
    }

    const fallback = {
      seoTitle: t("blogItem.fallback.seoTitle"),
      seoDescription: t("blogItem.fallback.seoDescription"),
      canonical: `https://achi-scaffolding.github.io/blog-post-${postId}`,
      h1: t("blogItem.fallback.h1"),
      image: `${base}/assets/blog/blog1.png`,
      imageAlt: t("blogItem.fallback.imageAlt"),
      category: t("blogItem.fallback.category"),
      readingTime: t("blogItem.fallback.readingTime"),
   
      // END MERGED BLOCK
      keyTakeaways: [t("blogItem.fallback.takeaways.0"), t("blogItem.fallback.takeaways.1"), t("blogItem.fallback.takeaways.2")],
      tocEnabled: false,
      sections: [],
      conclusion: "",
      recommended: [],
      externalSources: [],
    }

    return map[postId] || fallback
  }, [postId, base, t])

  const headings = useMemo(() => {
    if (!postConfig.tocEnabled) return []
    const items = (postConfig.sections || [])
      .filter((s) => s?.id && s?.h2)
      .map((s) => ({ id: s.id, title: s.h2 }))
    return items
  }, [postConfig.sections, postConfig.tocEnabled])

  const dateObj = useMemo(() => {
  const d = new Date()
  if (String(postId) === "2") d.setDate(d.getDate() - 1)
  d.setHours(12, 0, 0, 0)
  return d
}, [postId])


  const date = useMemo(() => {
    const day = String(dateObj.getDate()).padStart(2, "0")
    const month = months?.[dateObj.getMonth()] || ""
    const year = dateObj.getFullYear()
    return `${month} ${day}, ${year}`
  }, [dateObj, months])

  const isoDate = useMemo(() => dateObj.toISOString(), [dateObj])

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight || 1
      const total = rect.height - viewportH
      if (total <= 0) return setProgress(1)
      const scrolled = -rect.top
      setProgress(clamp01(scrolled / total))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const schema = useMemo(() => {
    const origin = "https://achi-scaffolding.github.io"
    const url = postConfig.canonical || `${origin}/blog-post-${postId}`
    // BEGIN MERGED BLOCK (kept both)
    const image = postConfig.image ? (postConfig.image.startsWith('http') ? postConfig.image : `${origin}${postConfig.image}`) : undefined
    // ---- MERGED FROM OTHER BRANCH ----
    const imageAlt = postConfig.image

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("blogItem.breadcrumbs.home"), item: `${origin}/` },
        { "@type": "ListItem", position: 2, name: t("blogItem.breadcrumbs.blog"), item: `${origin}/blog` },
        { "@type": "ListItem", position: 3, name: postConfig.h1, item: url },
      ],
    }

    const articleBody =
      (postConfig.sections || [])
        .flatMap((s) => {
          const parts = [s.h2]
          ;(s.blocks || []).forEach((b) => {
            if (b.type === "p") parts.push(b.text)
            if (b.type === "ul") parts.push((b.items || []).join(" "))
          })
          return parts
        })
        .join("\n\n") || postConfig.seoDescription
    // END MERGED BLOCK

    const blogPosting = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      // BEGIN MERGED BLOCK (kept both)
      headline: postConfig.h1,
      description: postConfig.seoDescription,
      image: image ? [image] : undefined,
    
      publisher: {
        "@type": "Organization",
        name: "ACHI Scaffolding",
      },
      // ---- MERGED FROM OTHER BRANCH ----
      mainEntityOfPageAlt: { "@type": "WebPage", "@id": url },
      headlineAlt: postConfig.h1,
      descriptionAlt: postConfig.seoDescription,
      imageAlt: imageAlt ? [imageAlt] : undefined,
      datePublishedAlt: isoDate,
      dateModifiedAlt: isoDate,
      publisherAlt: {
        "@type": "Organization",
        name: "ACHI Scaffolding",
        logo: { "@type": "ImageObject", url: `${base}/assets/siteLogo.png` },
      },
      // END MERGED BLOCK
      datePublished: isoDate,
      dateModified: isoDate,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    }

    return { blogPosting, breadcrumb }
  }, [postConfig, postId, isoDate, t, base])

  // Calculate reading time from word count
  const calculateReadingTime = () => {
    const allText = [
      postConfig.seoDescription,
      ...(postConfig.sections || []).flatMap((s) => {
        const parts = [s.h2]
        ;(s.blocks || []).forEach((b) => {
          if (b.type === "p") parts.push(b.text)
          if (b.type === "ul") parts.push((b.items || []).join(" "))
        })
        return parts
      }),
      postConfig.conclusion || "",
    ]
      .join(" ")
      .split(/\s+/)
      .filter((w) => w.length > 0)
    const words = allText.length
    const minutes = Math.ceil(words / 200) // Average reading speed: 200 words per minute
    return minutes
  }

  const readingTimeMinutes = calculateReadingTime()

  return (
    <>
      {/* Editorial Image Styles */}
      <style>{`
        .blog-editorial-image {
          max-height: 420px;
          object-fit: cover;
        }
        @media (max-width: 767px) {
          .blog-editorial-image {
            max-height: 260px;
          }
        }
      `}</style>

      {/* BEGIN MERGED BLOCK (kept both) */}
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema.blogPosting),
        }}
      />
      {schema.breadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema.breadcrumb),
          }}
        />
      )}

      <main id="main-content" className="w-full bg-white">
        <SEO
          title={postConfig.seoTitle}
          description={postConfig.seoDescription}
          canonical={postConfig.canonical}
          ogTitle={postConfig.h1}
          ogDescription={postConfig.seoDescription}
          ogImage={postConfig.image?.startsWith('http') ? postConfig.image : `https://achi-scaffolding.github.io${postConfig.image}`}
          ogType="article"
        />
      {/* ---- MERGED FROM OTHER BRANCH ---- */}
      {false && (
        <main className="w-full bg-white">
          <SEO
            title={postConfig.seoTitle}
            description={postConfig.seoDescription}
            canonical={postConfig.canonical}
            jsonLd={[schema.blogPosting, schema.breadcrumb]}
          />

          <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[3px] z-[60]"
            style={{ transformOrigin: "0 50%", transform: `scaleX(${progress})` }}
          />

          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
          >
            <nav aria-label={t("blogPage.sr.internalLinksAriaLabel")}>
              <a href={`${base}${buildPathWithLang(urlLang, "/products")}`}>{t("blogItem.hiddenLinks.products")}</a>
              <a href={`${base}${buildPathWithLang(urlLang, "/projects")}`}>{t("blogItem.hiddenLinks.projects")}</a>
              <a href={`${base}${buildPathWithLang(urlLang, "/contact")}`}>{t("blogItem.hiddenLinks.contact")}</a>
              <a href={`${base}${buildPathWithLang(urlLang, "/blog")}`}>{t("blogItem.hiddenLinks.blog")}</a>
            </nav>
          </div>

          <section className="sr-only">
            <nav aria-label={t("blogItem.breadcrumbs.aria")}>
              <ol>
                <li>{t("blogItem.breadcrumbs.home")}</li>
                <li>{t("blogItem.breadcrumbs.blog")}</li>
                <li>{postConfig.h1}</li>
              </ol>
            </nav>
          </section>
        </main>
      )}
      {/* END MERGED BLOCK */}

        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#28509E] focus:text-white focus:rounded focus:font-bold"
        >
          Skip to content
        </a>

        {/* Progress bar */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[3px] bg-[#28509E] z-[60]"
          style={{ transformOrigin: "0 50%", transform: `scaleX(${progress})` }}
        />

      {!hideBreadcrumb && (
  <nav aria-label="Breadcrumb" className="w-full bg-[#f5f7fa] border-b border-[#e0e0e0]">
    <div className="w-full max-w-[860px] mx-auto px-[20px] md:px-[40px] py-[16px]">
      <ol className="flex flex-wrap items-center gap-[8px] text-[14px] font-['Open_Sans'] text-[#4a5c7a]">
        <li>
          <Link to="/" className="hover:text-[#28509E] hover:underline transition-colors">
            {t("blogItem.breadcrumbs.home")}
          </Link>
        </li>
        <li aria-hidden="true" className="text-[#999]">/</li>
        <li>
          <Link to={buildPathWithLang(urlLang, "/blog")} className="hover:text-[#28509E] hover:underline transition-colors">
            {t("blogItem.breadcrumbs.blog")}
          </Link>
        </li>
        <li aria-hidden="true" className="text-[#999]">/</li>
        <li className="text-[#28509E] font-[600]" aria-current="page">
          {postConfig.h1}
        </li>
      </ol>
    </div>
  </nav>
)}

        {/* Hero Section */}
        <header className="w-full bg-white">
          <div className="w-full max-w-[860px] mx-auto px-[20px] md:px-[40px] pt-[40px] md:pt-[60px] pb-[30px]">
            <div className="mb-[16px]">
              <span className="inline-block px-[12px] py-[4px] bg-[#28509E] text-white text-[12px] font-[Rajdhani] font-[700] uppercase tracking-[1px] rounded-[0]">
                {postConfig.category}
              </span>
            </div>

            <h1 className="font-[Rajdhani] text-[#1b3155] font-[700] uppercase text-[32px] md:text-[42px] lg:text-[48px] leading-[1.15] mb-[20px]">
              {postConfig.h1}
            </h1>

            <div className="flex flex-wrap items-center gap-[12px] text-[14px] font-['Open_Sans'] text-[#4a5c7a] mb-[24px]">
              <time dateTime={isoDate} className="flex items-center gap-[6px]">
                <span>{date}</span>
              </time>
              <span aria-hidden="true" className="text-[#ccc]">
                •
              </span>
              <span aria-hidden="true" className="text-[#ccc]">
                •
              </span>
              <span>{readingTimeMinutes} min read</span>
            </div>

            <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#2a2a2a] font-['Open_Sans'] max-w-[720px]">
              {postConfig.seoDescription}
            </p>

            {/* Cover Image - Editorial Style */}
            <figure className="w-full max-w-[860px] mx-auto mt-[32px] mb-[40px]">
              <ImageWebp
                srcWebp={postConfig.image}
                src={postConfig.image}
                alt={postConfig.imageAlt}
                className="w-full h-auto object-cover blog-editorial-image"
                style={{ 
                  objectFit: "cover",
                  aspectRatio: "16/9"
                }}
                loading="eager"
                decoding="async"
              />
              <figcaption className="mt-[12px] text-[14px] text-[#666] font-['Open_Sans'] italic text-center">
                {postConfig.imageAlt}
              </figcaption>
            </figure>
          </div>
        </header>

        {/* BEGIN MERGED BLOCK (kept both) */}
        {/* Key Takeaways */}
        <section className="w-full bg-[#f5f7fa] py-[40px]">
          <div className="w-full max-w-[860px] mx-auto px-[20px] md:px-[40px]">
            <div className="bg-white border border-[#e0e0e0] p-[24px] md:p-[32px] rounded-[0]">
              <h2 className="font-[Rajdhani] text-[#1b3155] text-[24px] md:text-[28px] font-[700] mb-[16px]">
                {t("blogItem.takeaways.title")}
              </h2>
              <ul className="list-disc pl-[24px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.8] space-y-[8px]">
                {postConfig.keyTakeaways.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* ---- MERGED FROM OTHER BRANCH ---- */}
        {false && (
          <>
            <div className="w-full md:w-1/2 h-[280px] md:h-[420px]">
              <ImageWebp
                srcWebp={postConfig.image}
                src={postConfig.image}
                alt={postConfig.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <section className="w-full bg-[#f5f7fa] py-[34px]">
              <div className="w-[92%] max-w-[1250px] mx-auto">
                <div className="bg-white rounded-[16px] border border-black/10 p-[18px] md:p-[22px]">
                  <h2 className="font-[Rajdhani] text-[#103781] text-[26px] md:text-[30px] font-[700] mb-[10px]">
                    {t("blogItem.takeaways.title")}
                  </h2>
                  <ul className="list-disc pl-[22px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.9]">
                    {postConfig.keyTakeaways.map((x, idx) => (
                      <li key={idx} className="mb-[6px] last:mb-0">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="w-full bg-[#f5f7fa] pb-[70px]">
              <div className="w-[92%] max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[26px]">
                <div className="lg:col-span-8">
                  {headings.length > 0 && (
                    <div className="bg-white rounded-[16px] border border-black/10 p-[18px] md:p-[22px] mb-[18px]">
                      <h2 className="font-[Rajdhani] text-[#103781] text-[26px] md:text-[30px] font-[700] mb-[10px]">
                        {t("blogItem.toc.title")}
                      </h2>
                      <ul className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.9]">
                        {headings.map((h) => (
                          <li key={h.id} className="mb-[6px] last:mb-0">
                            <a className="hover:underline" href={`#${h.id}`}>
                              {h.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <article ref={articleRef} className="bg-white rounded-[16px] border border-black/10 p-[18px] md:p-[28px]">
                    {(postConfig.sections || []).map((section) => (
                      <section
                        key={section.id}
                        id={section.id}
                        aria-labelledby={`${section.id}-title`}
                        className="mb-[26px] last:mb-0"
                      >
                        <h2 id={`${section.id}-title`} className="font-[Rajdhani] text-[#103781] text-h2 font-[700] mb-[10px]">
                          {section.h2}
                        </h2>

                        {(section.blocks || []).map((b, i) => {
                          if (b.type === "p") {
                            return (
                              <p
                                key={`${section.id}-p-${i}`}
                                className="font-['Open_Sans'] text-[#2a2a2a] text-body leading-[1.9] mb-[14px] last:mb-0"
                              >
                                {b.text}
                              </p>
                            )
                          }
                          if (b.type === "ul") {
                            return (
                              <ul
                                key={`${section.id}-ul-${i}`}
                                className="list-disc pl-[22px] font-['Open_Sans'] text-[#2a2a2a] text-body leading-[1.9] mb-[14px] last:mb-0"
                              >
                                {(b.items || []).map((it, idx) => (
                                  <li key={`${section.id}-li-${i}-${idx}`} className="mb-[6px] last:mb-0">
                                    {it}
                                  </li>
                                ))}
                              </ul>
                            )
                          }
                          return null
                        })}
                      </section>
                    ))}

                    {postConfig.conclusion ? (
                      <section aria-labelledby="final-word-title" className="pt-[10px]">
                        <h2 id="final-word-title" className="font-[Rajdhani] text-[#103781] text-h2 font-[700] mb-[10px]">
                          {t("blogItem.finalWord.title")}
                        </h2>
                        <p className="font-['Open_Sans'] text-[#2a2a2a] text-body leading-[1.9]">{postConfig.conclusion}</p>
                      </section>
                    ) : null}
                  </article>

                  <div className="w-full flex justify-center mt-[22px]">
                    <Link
                      to={buildPathWithLang(urlLang, "/blog")}
                      className="inline-flex items-center justify-center w-[220px] h-[46px] rounded-[12px] bg-[#214f9b] text-white font-[Rajdhani] font-[700] text-[16px] hover:bg-[#28509E] transition"
                      aria-label={t("blogItem.backToBlog.aria")}
                    >
                      {t("blogItem.backToBlog.label")}
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {/* END MERGED BLOCK */}

        {/* BEGIN MERGED BLOCK (kept both) */}
        {/* Main Content Area */}
        <section className="w-full bg-white py-[40px]">
          <div className="w-full max-w-[1200px] mx-auto px-[20px] md:px-[40px] grid grid-cols-1 lg:grid-cols-12 gap-[40px]">
            {/* Main Article */}
            <div className="lg:col-span-8">
              {/* Table of Contents - Mobile */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-[32px] bg-white border border-[#e0e0e0] rounded-[0] overflow-hidden">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-full px-[24px] py-[16px] flex items-center justify-between bg-[#f5f7fa] hover:bg-[#eef3fb] transition-colors"
                    aria-expanded={tocOpen}
                    aria-controls="toc-mobile"
                  >
                    <h2 className="font-[Rajdhani] text-[#1b3155] text-[20px] font-[700]">
                      {t("blogItem.toc.title")}
                    </h2>
                    <svg
                      className={`w-[20px] h-[20px] text-[#28509E] transition-transform ${tocOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {tocOpen && (
                    <nav id="toc-mobile" className="px-[24px] py-[16px]">
                      <ul className="space-y-[8px] font-['Open_Sans'] text-[15px] text-[#2a2a2a]">
                        {headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              onClick={() => setTocOpen(false)}
                              className="hover:text-[#28509E] hover:underline transition-colors"
                            >
                              {h.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              )}

              {/* Article Content */}
              <article ref={articleRef} className="prose prose-lg max-w-none">
                {postConfig.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-title`}
                    className="mb-[40px] scroll-mt-[100px]"
                  >
                    <h2
                      id={`${section.id}-title`}
                      className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[32px] font-[700] mb-[20px] leading-[1.3]"
                    >
                      {section.h2}
                    </h2>

                    {(section.blocks || []).map((b, i) => {
                      if (b.type === "p") {
                        return (
                          <p
                            key={`${section.id}-p-${i}`}
                            className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[17px] leading-[1.75] mb-[20px] last:mb-0"
                          >
                            {b.text}
                          </p>
                        )
                      }
                      if (b.type === "ul") {
                        return (
                          <ul
                            key={`${section.id}-ul-${i}`}
                            className="list-disc pl-[28px] font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[17px] leading-[1.75] mb-[20px] last:mb-0 space-y-[8px]"
                          >
                            {(b.items || []).map((it, idx) => (
                              <li key={`${section.id}-li-${i}-${idx}`}>{it}</li>
                            ))}
                          </ul>
                        )
                      }
                      return null
                    })}
                  </section>
                ))}

                {postConfig.conclusion && (
                  <section aria-labelledby="final-word-title" className="mt-[40px] pt-[40px] border-t border-[#e0e0e0]">
                    <h2 id="final-word-title" className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[32px] font-[700] mb-[20px] leading-[1.3]">
                      {t("blogItem.finalWord.title")}
                    </h2>
                    <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[17px] leading-[1.75]">
                      {postConfig.conclusion}
                    </p>
                  </section>
                )}
              </article>
{/* 
              <section className="bg-[#f5f7fa] border border-[#e0e0e0] p-[24px] md:p-[32px] mt-[50px] rounded-[0]" aria-labelledby="author-title">
                <div className="flex flex-col md:flex-row gap-[20px] md:items-center">
                  <div className="w-[100px] h-[100px] rounded-[0] overflow-hidden bg-white border border-[#e0e0e0] flex-shrink-0">
                    <ImageWebp
                      srcWebp={postConfig.authorImage}
                      src={postConfig.authorImage}
                      alt={t("blogItem.author.photoAlt")}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 id="author-title" className="font-[Rajdhani] text-[#1b3155] text-[22px] md:text-[26px] font-[700] mb-[8px]">
                      {t("blogItem.author.title")}
                    </h2>
                    <p className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.7]">
                      {t("blogItem.author.bio")}
                    </p>
                  </div>
                </div>
              </section> */}

              {/* Related Posts */}
              {postConfig.recommended.length > 0 && (
                <section className="mt-[50px]" aria-labelledby="related-posts-title">
                  <h2 id="related-posts-title" className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[32px] font-[700] mb-[30px]">
                    {t("blogItem.recommended.title")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
                    {postConfig.recommended.map((r) => (
                      <article
                        key={r.id}
                        className="bg-white border border-[#e0e0e0] rounded-[0] overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <Link to={r.to} className="block">
                          <div className="w-full h-[180px] overflow-hidden">
                            <ImageWebp
                              srcWebp={r.image}
                              src={r.image}
                              alt={r.alt}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              decoding="async"
                              style={{ aspectRatio: "16/9" }}
                            />
                          </div>
                          <div className="p-[20px]">
                            <h3 className="font-[Rajdhani] text-[#1b3155] text-[18px] font-[700] mb-[10px] line-clamp-2">
                              {r.title}
                            </h3>
                            <p className="font-['Open_Sans'] text-[#4a5c7a] text-[14px] leading-[1.6] line-clamp-3 mb-[12px]">
                              {r.desc}
                            </p>
                            <span className="inline-flex items-center text-[#28509E] font-[Rajdhani] font-[600] text-[14px] hover:underline">
                              Read more →
                            </span>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Back to Blog */}
              <div className="w-full flex justify-center mt-[50px]">
                <Link
                  to={buildPathWithLang(urlLang, "/blog")}
                  className="inline-flex items-center justify-center px-[32px] py-[14px] bg-[#28509E] text-white font-[Rajdhani] font-[700] text-[16px] hover:bg-[#214f9b] transition-colors rounded-[0] focus:outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-2"
                  aria-label={t("blogItem.backToBlog.aria")}
                >
                  {t("blogItem.backToBlog.label")}
                </Link>
              </div>
            </div>
            {/* ---- MERGED FROM OTHER BRANCH ---- */}
            {false && (
              <aside className="lg:col-span-4">
                <div className="sticky top-[18px] space-y-[14px]">
                  <div className="bg-white rounded-[16px] border border-black/10 p-[18px] md:p-[18px]">
                    <h2 className="font-[Rajdhani] text-[#103781] text-[24px] font-[700] mb-[10px]">
                      {t("blogItem.sidebar.ctaTitle")}
                    </h2>
                    <p className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.9] mb-[12px]">
                      {t("blogItem.sidebar.ctaText")}
                    </p>
                     <button
  type="button"
  onClick={() => goToHomeSection("contactForm")}
  className="inline-flex items-center justify-center w-full h-[46px] rounded-[12px] bg-[#ff8a00] text-white font-[Rajdhani] font-[700] text-[15px] uppercase transition hover:bg-[#e77a00]"
  aria-label={t("blogItem.sidebar.ctaAria")}
>
  {t("blogItem.sidebar.ctaButton")}
</button>


                  </div>

                  <div className="bg-white rounded-[16px] border border-black/10 p-[18px]">
                    <h2 className="font-[Rajdhani] text-[#103781] text-[24px] font-[700] mb-[10px]">
                      {t("blogItem.sidebar.resourcesTitle")}
                    </h2>
                    <ul className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.9]">
                      <li className="mb-[8px]">
                        <Link to={buildPathWithLang(urlLang, "/services")} className="hover:underline" aria-label={t("blogItem.sidebar.servicesAria")}>
                          {t("blogItem.sidebar.servicesLabel")}
                        </Link>
                      </li>
                      {/* <li className="mb-[8px]">
                        <Link to={buildPathWithLang(urlLang, "/products")} className="hover:underline" aria-label={t("blogItem.sidebar.productsAria")}>
                          {t("blogItem.sidebar.productsLabel")}
                        </Link>
                      </li> */}
                      <li className="mb-0">
                        <Link to={buildPathWithLang(urlLang, "/projects")} className="hover:underline" aria-label={t("blogItem.sidebar.projectsAria")}>
                          {t("blogItem.sidebar.projectsLabel")}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {postConfig.externalSources.length > 0 && (
                    <div className="bg-white rounded-[16px] border border-black/10 p-[18px]">
                      <h2 className="font-[Rajdhani] text-[#103781] text-[24px] font-[700] mb-[10px]">
                        {t("blogItem.sidebar.sourcesTitle")}
                      </h2>
                      <ul className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.9]">
                        {postConfig.externalSources.map((s, idx) => (
                          <li key={idx} className="mb-[8px] last:mb-0">
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                              aria-label={t("blogItem.sidebar.sourceAria")}
                            >
                              {s.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            )}
            {/* END MERGED BLOCK */}

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-[100px] space-y-[20px]">
                {/* Table of Contents - Desktop */}
                {headings.length > 0 && (
                  <nav className="hidden lg:block bg-white border border-[#e0e0e0] p-[24px] rounded-[0]">
                    <h2 className="font-[Rajdhani] text-[#1b3155] text-[20px] font-[700] mb-[16px]">
                      {t("blogItem.toc.title")}
                    </h2>
                    <ul className="space-y-[10px] font-['Open_Sans'] text-[14px] text-[#2a2a2a]">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="hover:text-[#28509E] hover:underline transition-colors block"
                          >
                            {h.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* CTA */}
                <div className="bg-[#28509E] border border-[#214f9b] p-[24px] rounded-[0]">
                  <h2 className="font-[Rajdhani] text-white text-[20px] font-[700] mb-[12px]">
                    {t("blogItem.sidebar.ctaTitle")}
                  </h2>
                  <p className="font-['Open_Sans'] text-white/90 text-[14px] leading-[1.6] mb-[16px]">
                    {t("blogItem.sidebar.ctaText")}
                  </p>
              <button
  type="button"
  onClick={() => goToHomeSection("contactForm")}
  className="inline-flex items-center justify-center w-full px-[20px] py-[12px] bg-[#ff8a00] text-white font-[Rajdhani] font-[700] text-[14px] uppercase transition hover:bg-[#e77a00] rounded-[0] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#28509E]"
  aria-label={t("blogItem.sidebar.ctaAria")}
>
  {t("blogItem.sidebar.ctaButton")}
</button>

                </div>

                {/* Resources */}
                <div className="bg-white border border-[#e0e0e0] p-[24px] rounded-[0]">
                  <h2 className="font-[Rajdhani] text-[#1b3155] text-[20px] font-[700] mb-[12px]">
                    {t("blogItem.sidebar.resourcesTitle")}
                  </h2>
                  <ul className="space-y-[10px] font-['Open_Sans'] text-[14px] text-[#2a2a2a]">
                    <li>
                      <Link to={buildPathWithLang(urlLang, "/services")} className="hover:text-[#28509E] hover:underline transition-colors" aria-label={t("blogItem.sidebar.servicesAria")}>
                        {t("blogItem.sidebar.servicesLabel")}
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/products" className="hover:text-[#28509E] hover:underline transition-colors" aria-label={t("blogItem.sidebar.productsAria")}>
                        {t("blogItem.sidebar.productsLabel")}
                      </Link>
                    </li> */}
                    <li>
                      <Link to={buildPathWithLang(urlLang, "/projects")} className="hover:text-[#28509E] hover:underline transition-colors" aria-label={t("blogItem.sidebar.projectsAria")}>
                        {t("blogItem.sidebar.projectsLabel")}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* External Sources */}
                {/* {postConfig.externalSources.length > 0 && (
                  <div className="bg-white border border-[#e0e0e0] p-[24px] rounded-[0]">
                    <h2 className="font-[Rajdhani] text-[#1b3155] text-[20px] font-[700] mb-[12px]">
                      {t("blogItem.sidebar.sourcesTitle")}
                    </h2>
                    <ul className="space-y-[10px] font-['Open_Sans'] text-[14px] text-[#2a2a2a]">
                      {postConfig.externalSources.map((s, idx) => (
                        <li key={idx}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#28509E] hover:underline transition-colors"
                            aria-label={t("blogItem.sidebar.sourceAria")}
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            </aside>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-[#28509E] py-[60px] text-white" aria-label={t("blogItem.newsletter.aria")}>
          <div className="w-full max-w-[860px] mx-auto px-[20px] md:px-[40px] text-center">
            <h2 className="font-[Rajdhani] text-[28px] md:text-[36px] font-[700] uppercase leading-[1.2] mb-[20px]">
              {t("blogItem.newsletter.titleLine1")} <br className="md:hidden" /> {t("blogItem.newsletter.titleLine2")}
            </h2>
            <form className="flex flex-col md:flex-row items-center gap-[16px] max-w-[600px] mx-auto" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletterEmail" className="sr-only">
                {t("blogItem.newsletter.emailLabel")}
              </label>
              <input
                id="newsletterEmail"
                type="email"
                autoComplete="email"
                className="flex-1 w-full md:w-auto px-[18px] py-[14px] rounded-[0] border-2 border-white/40 bg-transparent text-white text-[15px] placeholder-white/70 outline-none focus:border-white focus:ring-2 focus:ring-white/50"
                placeholder={t("blogItem.newsletter.emailPlaceholder")}
                aria-label={t("blogItem.newsletter.emailAria")}
              />
              <button
                type="submit"
                className="px-[34px] py-[14px] bg-[#ff8a00] rounded-[0] text-white font-[Rajdhani] font-[700] text-[15px] uppercase transition hover:bg-[#e77a00] w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#28509E]"
                aria-label={t("blogItem.newsletter.submitAria")}
              >
                {t("blogItem.newsletter.submitLabel")}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default BlogItem
