import React from "react"
import { motion } from "framer-motion"

/**
 * Reusable component for alternating text/image sections
 * @param {Object} props
 * @param {string} props.title - Section heading
 * @param {string} props.titleId - ID for the heading (for aria-labelledby)
 * @param {string|React.ReactNode} props.body - Section content (text or JSX)
 * @param {string} props.imageSrc - Image source path
 * @param {string} props.imageAlt - Image alt text
 * @param {boolean} props.reverse - If true, image on right, text on left. If false, image on left, text on right
 * @param {string} props.className - Additional CSS classes
 */
const AlternatingSection = ({
  title,
  titleId,
  body,
  imageSrc,
  imageAlt,
  reverse = false,
  className = "",
  children,
  adjustImagePosition = false
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-[1400px] mx-auto px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px]">
        <div
          className={`grid grid-cols-1 ${imageSrc ? "lg:grid-cols-2" : ""} gap-[30px] lg:gap-[40px] items-center ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Image Column - Only render if imageSrc exists */}
          {imageSrc && (
            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`m-0 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] ${
                reverse ? "lg:col-start-2" : "lg:col-start-1"
              }`}
            >
              <img
                src={imageSrc}
                alt={imageAlt || "Project image"}
                className="w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover"
                loading="lazy"
                decoding="async"
                width="600"
                height="450"
                style={{
                  aspectRatio: "4/3",
                  objectPosition: adjustImagePosition ? "center 35%" : "center center"
                }}
                itemProp="image"
              />
              {imageAlt && (
                <figcaption className="sr-only">
                  {imageAlt}
                </figcaption>
              )}
            </motion.figure>
          )}

          {/* Text Column - Content always visible for SEO */}
          <div
            className={`flex flex-col justify-center ${imageSrc && reverse ? "lg:col-start-1 lg:row-start-1" : ""} ${!imageSrc ? "w-full" : ""}`}
          >
            {title && (
              <h2
                id={titleId || (title ? `section-${title.replace(/\s+/g, "-").toLowerCase()}` : undefined)}
                className="font-[Rajdhani] font-[700] uppercase text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] mb-[16px] text-[#003A80] leading-[1.2]"
              >
                {title}
              </h2>
            )}

            <div className="text-content">
              {typeof body === "string" ? (
                <p className="font-['Open_Sans'] text-[15px] md:text-[16px] leading-[1.7] text-[#333333] mb-[12px] last:mb-0">
                  {body}
                </p>
              ) : (
                <div className="font-['Open_Sans'] text-[15px] md:text-[16px] leading-[1.7] text-[#333333] space-y-[12px]">
                  {body}
                </div>
              )}
            </div>

            {children && <div className="mt-[20px]">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlternatingSection
