import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ImageWebp from "./ImageWebp"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang } from "../utils/langRouting"

const BlogSection = () => {
  const { t } = useTranslation()
  const { urlLang } = useLangRouter()
  const ASSET = process.env.PUBLIC_URL || ""

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const posts = useMemo(() => {
    const baseDate = new Date()

    const items = [
      { key: "blog-1", img: `${ASSET}/assets/blog/blog1.png`, to: "/blog-post-1" },
      { key: "blog-2", img: `${ASSET}/assets/blog/blog2.png`, to: "/blog-post-2" },
    ]

    return items.map((p, index) => {
      const d = new Date(baseDate)
      d.setDate(baseDate.getDate() - index)

      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, "0")
      const dd = String(d.getDate()).padStart(2, "0")

      return {
        ...p,
        day: dd,
        month: months[d.getMonth()],
        isoDate: `${yyyy}-${mm}-${dd}`,
      }
    })
  }, [ASSET])

  const titleId = "home-blog-title"
  const descId = "home-blog-desc"

  return (
    <section id="blogSection" className="mt-[120px]" aria-labelledby={titleId} aria-describedby={descId}>
      <div className="max-w-[1450px] mx-auto px-[20px]">
        <motion.h2
          id={titleId}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-[Rajdhani] text-h2 font-[700] uppercase mb-[12px] text-[#003A80] text-center"
        >
          {t("homeBlog.title")}
        </motion.h2>

        <p id={descId} className="sr-only">
          {t("homeBlog.srOnly")}
        </p>

        <motion.ul
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-x-8 gap-y-10 mt-[35px] lg:px-[50px] px-[20px] xl:grid-cols-3"
          aria-label={t("homeBlog.listAria")}
        >
          {posts.map((p) => {
            const title = t(`homeBlog.posts.${p.key}.title`)
            const alt = t(`homeBlog.posts.${p.key}.alt`)
            const readMore = t("homeBlog.readMore")

            return (
              <motion.li key={p.key} className="w-full list-none">
                <article className="w-full">
                  <div className="group relative">
                    <div className="absolute top-[-10px] left-[-10px] z-[20] bg-[#2B529C] rounded-none px-[16px] py-[8px] text-center shadow-[0_8px_22px_rgba(0,0,0,0.22)]" style={{ borderRadius: 0 }}>
                      <time dateTime={p.isoDate} aria-label={t("homeBlog.publishedAria", { month: p.month, day: p.day })}>
                        <p className="text-white font-saira font-[700] text-[18px] leading-[18px]">{p.day}</p>
                        <p className="text-white font-saira font-[400] text-[18px] leading-[18px]">{p.month}</p>
                      </time>
                    </div>

                    <div className="relative rounded-none overflow-hidden" style={{ borderRadius: 0 }}>
                      <ImageWebp
                        srcWebp={p.img}
                        src={p.img}
                        alt={alt}
                        className="w-full h-[260px] md:h-[280px] xl:h-[300px] object-cover transition duration-300 group-hover:scale-[1.03] rounded-none"
                        style={{ borderRadius: 0 }}
                      />

                      <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/35" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                        <Link
                          to={buildPathWithLang(urlLang, p.to)}
                          className="bg-white text-[#214f9b] font-saira font-[700] uppercase text-[12px] px-[18px] py-[10px] rounded-[12px]"
                          aria-label={t("homeBlog.readMoreAria", { title: title.replace(/\s+/g, " ").trim() })}
                          title={t("homeBlog.readMoreTitle", { title: title.replace(/\s+/g, " ").trim() })}
                        >
                          {readMore}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-[16px] text-h4 font-saira font-[700] leading-[28px] text-[#003A80] capitalize whitespace-pre-line">
                    {title}
                  </h3>
                </article>
              </motion.li>
            )
          })}
        </motion.ul>

        <div className="w-full text-center mt-[30px]">
          <Link
            to={buildPathWithLang(urlLang, "/blog")}
            className="text-[12px] md:text-[15px] text-white font-saira font-[700] leading-[29px] py-[12px] px-[55px] bg-[#28509e] rounded-[12px] uppercase border-2 border-[#28509e] transition duration-500"
            aria-label={t("homeBlog.readAllAria")}
            title={t("homeBlog.readAllTitle")}
          >
            {t("homeBlog.readAll")}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
