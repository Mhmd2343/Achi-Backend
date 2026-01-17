// src/pages/Blog.js
import React, { useMemo } from "react"
import { motion } from "framer-motion"
import ImageWebp from "../components/ImageWebp"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang } from "../utils/langRouting"

const Blog = () => {
  const { t } = useTranslation()
  const NS = "blogPage"
  const { urlLang } = useLangRouter()

  const base = process.env.PUBLIC_URL || ""

  const months = useMemo(() => t(`${NS}.months`, { returnObjects: true }) || [], [t, NS])

  const staticPosts = useMemo(
    () => [
      {
        id: "blog-1",
        titleKey: `${NS}.staticPosts.blog1.title`,
        excerptKey: `${NS}.staticPosts.blog1.excerpt`,
        image: `${base}/assets/blog/blog1.png`,
        link: "/blog-post-1",
        offsetDays: 0,
      },
      {
        id: "blog-2",
        titleKey: `${NS}.staticPosts.blog2.title`,
        excerptKey: `${NS}.staticPosts.blog2.excerpt`,
        image: `${base}/assets/blog/blog2.png`,
        link: "/blog-post-2",
        offsetDays: 1,
      },
      {
        id: "blog-3",
        titleKey: `${NS}.staticPosts.blog3.title`,
        excerptKey: `${NS}.staticPosts.blog3.excerpt`,
        image: `${base}/assets/blog/blog3.png`,
        link: "/blog-post-3",
        offsetDays: 2,
      },
    ],
    [base, NS]
  )


  const makeExcerpt = (text) => {
    if (!text) return ""
    const tt = String(text).replace(/\s+/g, " ").trim()
    if (tt.length <= 180) return tt
    return `${tt.slice(0, 180)}…`
  }

  const getBadge = (post) => {
    const d = post.dateISO
      ? new Date(post.dateISO)
      : (() => {
          const x = new Date()
          x.setHours(12, 0, 0, 0)
          x.setDate(x.getDate() - (post.offsetDays || 0))
          return x
        })()

    const day = String(d.getDate()).padStart(2, "0")
    const month = months?.[d.getMonth()] || ""
    return { day, month }
  }



const posts = useMemo(() => {
  return staticPosts.map((p) => ({
    ...p,
    title: t(p.titleKey),
    excerpt: t(p.excerptKey),
  }))
}, [staticPosts, t])




  const visiblePosts = useMemo(
    () => posts.filter((p) => p.link === "/blog-post-1" || p.link === "/blog-post-2"),
    [posts]
  )

  const seoHiddenPosts = useMemo(
    () => posts.filter((p) => p.link !== "/blog-post-1" && p.link !== "/blog-post-2"),
    [posts]
  )

  return (
    <main className="blog-page">
      <SEO title={t(`${NS}.seo.title`)} description={t(`${NS}.seo.description`)} canonical={t(`${NS}.seo.canonical`)} />

      <style>{`
        /* BLOG CARD SHARP CORNERS - Match homepage pattern */
        /* Target the overflow:hidden wrapper - same as homepage */
        .blogCard .relative.overflow-hidden,
        .blogCardMediaWrapper .relative.overflow-hidden,
        [data-blog-card="true"] .relative.overflow-hidden {
          border-radius: 0 !important;
          -webkit-border-radius: 0 !important;
          -moz-border-radius: 0 !important;
        }
        
        /* Image element - same as homepage */
        .blogCard img,
        .blogCard .relative.overflow-hidden img,
        [data-blog-card="true"] img {
          border-radius: 0 !important;
          -webkit-border-radius: 0 !important;
          -moz-border-radius: 0 !important;
        }
        
        /* Legacy class support */
        .blogCardMedia,
        .blog-square-media,
        .blog-card-image-wrapper {
          border-radius: 0 !important;
          -webkit-border-radius: 0 !important;
          -moz-border-radius: 0 !important;
        }
        
        .blogCardMedia img,
        .blog-square-media img,
        .blog-card-image-wrapper img {
          border-radius: 0 !important;
          -webkit-border-radius: 0 !important;
          -moz-border-radius: 0 !important;
        }
        
        /* Line clamp fallback for consistent text truncation */
        .blogCard .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .blogCard .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <section className="sr-only" aria-label={t(`${NS}.sr.entityAriaLabel`)}>
        <p>{t(`${NS}.sr.entityDefinition`)}</p>

        <nav aria-label={t(`${NS}.sr.internalLinksAriaLabel`)}>
          <ul>
            <li>
              <Link to={t(`${NS}.sr.links.products.href`)}>{t(`${NS}.sr.links.products.label`)}</Link>
            </li>
            <li>
              <Link to={t(`${NS}.sr.links.projects.href`)}>{t(`${NS}.sr.links.projects.label`)}</Link>
            </li>
            <li>
              <Link to={t(`${NS}.sr.links.contact.href`)}>{t(`${NS}.sr.links.contact.label`)}</Link>
            </li>
          </ul>
        </nav>
      </section>

      <section className="blog-header-title mt-[30px]">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center font-[Rajdhani] text-h1 font-[700] uppercase text-[#003A80] mb-[40px]"
        >
          {t(`${NS}.header.title`)}
        </motion.h1>
      </section>

      <section className="other-articles-section" aria-label={t(`${NS}.articlesAriaLabel`)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="other-articles-grid grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 gap-x-8 px-[20px] sm:px-[20px] lg:px-[50px] mb-[50px] 2xl:mb-[0px] xl:mb-[0px] place-items-center lg:place-items-start 2xl:place-items-start xl:place-items-start items-stretch"
        >
          {visiblePosts.map((post) => {
            const badge = getBadge(post)
            const readMoreAria = t(`${NS}.readMore.ariaLabel`, { title: post.title })
            const readMoreLabel = t(`${NS}.readMore.label`)

            return (
              <article
                key={post.id}
                className="blogCard other-article-card flex justify-center items-start flex-col mb-[24px] lg:mb-[50px] mt-[-30px] w-full rounded-none h-full"
                style={{ borderRadius: 0 }}
                data-blog-card="true"
              >
                <div className="blogCardMediaWrapper relative w-full blog-card-media-wrapper rounded-none" style={{ borderRadius: 0, overflow: "visible" }}>
                  <div className="bg-[#2B529C] text-center py-[7px] px-[20px] absolute top-[-10px] left-[-10px] z-10 rounded-none blog-card-date-badge" style={{ borderRadius: 0 }}>
                    <p className="text-[#FFF] font-saira font-[600] text-[20px] leading-[1]">{badge.day}</p>
                    <p className="text-[#FFF] font-saira font-[400] text-[20px] leading-[1.1] mt-[6px]">
                      {badge.month}
                    </p>
                  </div>

                  <div
                    className="relative rounded-none overflow-hidden"
                    style={{ borderRadius: 0 }}
                  >
                    <ImageWebp
                      srcWebp={post.image}
                      className="w-full object-cover rounded-none"
                      style={{ borderRadius: 0 }}
                      src={post.image}
                      alt={post.title}
                    />
                  </div>
                </div>

                <div className="other-article-content w-full flex flex-col h-full">
                  <h2 className="text-h4 font-saira font-[700] lg:leading-[28px] text-[#003A80] transition-colors duration-300 my-[12px] capitalize line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-[13px] lg:leading-[19px] text-[#003A80] font-[400] font-saira line-clamp-4">{post.excerpt}</p>

                  <div className="w-full flex justify-end items-center mt-auto mb-[30px] md:mb-[0]">
                    <Link
                      to={buildPathWithLang(urlLang, post.link)}
                      aria-label={readMoreAria}
                      className="group font-saira uppercase font-[600] text-[#003A80] text-[18px] transition-all mr-[15px] inline-flex items-center gap-[12px] hover:text-[#ff8e26]"
                    >
                      {readMoreLabel}
                      <svg width="16" height="22" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16.0004 12.1797L3.02711 24.1797L0 21.3797L9.94622 12.1797L0 2.97969L3.02711 0.179687L16.0004 12.1797Z"
                          className="fill-[#28509E] group-hover:fill-[#ff8e26] transition-all"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </motion.div>
      </section>

      <section className="sr-only" aria-hidden="true">
        {seoHiddenPosts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link to={buildPathWithLang(urlLang, post.link)}>{post.title}</Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Blog
