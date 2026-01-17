import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Testimonials = ({ direction }) => {
  const { t } = useTranslation();

  const ASSET = process.env.PUBLIC_URL || "";

  const [modalOpen, setModalOpen] = useState(false);
  const [activeReviewKey, setActiveReviewKey] = useState(null);

  const reviewsData = useMemo(
    () => ({
      karim: {
        name: "Karim Radi",
        rating: 5,
        text: `After our experience with Aashi Group on several projects — including Le Grey Hotel in Downtown Beirut and numerous private villas — we can confidently say they are among the best and most professional scaffolding contractors. They consistently deliver their work with exceptional precision, attention to detail, and on-time execution.`,
        images: [
          `${ASSET}/assets/reviews/karim1.jpg`,
          `${ASSET}/assets/reviews/karim2.jpg`,
          `${ASSET}/assets/reviews/karim3.jpg`,
        ],
      },
      kevin: {
        name: "Kevin Gemayel",
        rating: 5,
        text: `Excellent work and support on the PORTSIDE project. Their team delivered and installed the scaffolding for our façade works with great professionalism, ensuring both safety and efficiency on site.

The installation was completed on schedule and in full compliance with safety standards, allowing our operations to proceed smoothly and without interruption. Their responsiveness and technical coordination were highly appreciated.`,
        images: [
          `${ASSET}/assets/reviews/kevin1.jpg`,
          `${ASSET}/assets/reviews/kevin2.jpg`,
          `${ASSET}/assets/reviews/kevin3.jpg`,
        ],
      },
      mohammad: {
        name: "Mohammad Sabbagh",
        rating: 5,
        text: `ACHI Scaffolding exceeded my expectations! Their customer support is outstanding—quick to respond, professional, and always ready to assist with any inquiries. The scaffolding itself is heavy-duty and extremely reliable, providing the durability and stability needed for even the most demanding projects. On top of that, their service is impressively fast, ensuring that everything is delivered and set up on time. Highly recommended for anyone looking for top-quality scaffolding solutions!`,
        images: [
          `${ASSET}/assets/reviews/mohammad1.jpg`,
          `${ASSET}/assets/reviews/mohammad2.jpg`,
          `${ASSET}/assets/reviews/mohammad3.jpg`,
        ],
      },
      michael: {
        name: "Michael Jibrine",
        rating: 5,
        text: `We recently collaborated with Achi Scaffolding on a highly complex project that involved constructing a 33-meter high steel cross.
From start to finish, their team demonstrated exceptional professionalism and punctuality. Whether it was the top management or the laborers on-site, everyone was committed to delivering top-notch service. Their expertise and dedication made a challenging project run smoothly.
We wouldn’t consider working with any other company for our scaffolding needs.

Highly recommended!`,
        images: [
          `${ASSET}/assets/reviews/michael1.jpg`,
          `${ASSET}/assets/reviews/michael2.jpg`,
          `${ASSET}/assets/reviews/michael3.jpg`,
          `${ASSET}/assets/reviews/michael4.jpg`,
        ],
      },
      wadih: {
        name: "Wadih Karkabi",
        rating: 5,
        text: `Dear Mr. Barbar Achi (Achi Group),
I am writing to express my heartfelt appreciation for your team's outstanding job in completing the project we entrusted to you. Your attention to detail, professionalism, and dedication to delivering excellence did not go unnoticed.
From the initial stages of planning to the final execution, your company demonstrated a level of expertise and skill that is truly commendable. The way your team worked together seamlessly and efficiently to ensure that every aspect of the project was handled in a perfect manner was truly impressive.
Not only did you meet our expectations, but you exceeded them in every way. The quality of your work speaks volumes about your commitment to excellence and customer satisfaction. We are thrilled with the end result and are grateful for the hard work and effort put forth by each member of your team.
In a competitive business environment, it is rare to find a company that consistently delivers exceptional service. Your company has certainly set the bar high, and we are grateful for the opportunity to work with such a dedicated and proficient team.
Thank you once again for your remarkable service. We look forward to the possibility of working together in the future and will not hesitate to recommend your company to others seeking top-tier service.
Warm regards,
Eng. Wadih Karkabi
Managing Director
Arch-Consult sarl.`,
        images: [
          `${ASSET}/assets/reviews/wadih1.jpg`,
          `${ASSET}/assets/reviews/wadih2.jpg`,
          `${ASSET}/assets/reviews/wadih3.jpg`,
          `${ASSET}/assets/reviews/wadih4.png`,
        ],
      },
      georges: {
        name: "Georges Homsi",
        rating: 5,
        text: `Accurate service! Clean workers! Professional attitude! We barely recall having an experience in scaffolding with such a professional team.
The villa was not in a construction phase. It is already inhabited. It is a very high end sensitive space. We needed to install the AC DUCTS. We were advised Achi group. Their workers highly respected the space and they were so involved in leaving the area clean and in delivering a very neat product. We highly recommend this company.
This experience with Achi group is to be repeated without any doubt. Thank you
GroundFloor0819
George and Fadi`,
        images: [
          `${ASSET}/assets/reviews/georges1.jpg`,
          `${ASSET}/assets/reviews/georges2.jpg`,
          `${ASSET}/assets/reviews/georges3.jpg`,
          `${ASSET}/assets/reviews/georges4.jpg`,
          `${ASSET}/assets/reviews/georges5.jpg`,
        ],
      },
      francois: {
        name: "Francois Efrem",
        rating: 5,
        text: `Thank you Achi group for providing us a great service of installing your scaffolding at our newly purchased villa in Daroun / Harissa (4 floors of steel scaffolding were installed)
Amazing service of professionalism and skilled technical team.
We highly recommend everyone dealing with you, for any required scaffolding rental.`,
        images: [
          `${ASSET}/assets/reviews/Francois1.jpg`,
          `${ASSET}/assets/reviews/Francois2.jpg`,
          `${ASSET}/assets/reviews/Francois3.jpg`,
          `${ASSET}/assets/reviews/Francois4.jpg`,
        ],
      },
      ziad: {
        name: "Ziad Bou Dagher",
        rating: 5,
        text: `Really appreciate the way u manage your business. Well done`,
        images: [
          `${ASSET}/assets/reviews/ziad1.jpg`,
          `${ASSET}/assets/reviews/ziad2.jpg`,
          `${ASSET}/assets/reviews/ziad3.jpg`,
          `${ASSET}/assets/reviews/ziad4.jpg`,
        ],
      },
      jad: {
        name: "Jad Issa",
        rating: 5,
        text: `Very professional and respectful team.
Highly recommended.`,
        images: [`${ASSET}/assets/reviews/jad1.jpg`],
      },
      mourad: {
        name: "Mourad Achkar",
        rating: 5,
        text: `Excellent service`,
        images: [`${ASSET}/assets/reviews/mourad1.jpg`],
      },
    }),
    [ASSET]
  );

  const testimonials = useMemo(
    () => [
      { key: "karim", ...reviewsData.karim, thumb: reviewsData.karim.images[0] },
      { key: "kevin", ...reviewsData.kevin, thumb: reviewsData.kevin.images[0] },
      { key: "mohammad", ...reviewsData.mohammad, thumb: reviewsData.mohammad.images[0] },
      { key: "michael", ...reviewsData.michael, thumb: reviewsData.michael.images[0] },
      { key: "wadih", ...reviewsData.wadih, thumb: reviewsData.wadih.images[0] },
      { key: "georges", ...reviewsData.georges, thumb: reviewsData.georges.images[0] },
      { key: "francois", ...reviewsData.francois, thumb: reviewsData.francois.images[0] },
      { key: "ziad", ...reviewsData.ziad, thumb: reviewsData.ziad.images[0] },
      { key: "jad", ...reviewsData.jad, thumb: reviewsData.jad.images[0] },
      { key: "mourad", ...reviewsData.mourad, thumb: reviewsData.mourad.images[0] },
    ],
    [reviewsData]
  );

  // Limit to only 5 reviews
  const displayedTestimonials = testimonials.slice(0, 5);

  const closeModal = () => {
    setModalOpen(false);
    setActiveReviewKey(null);
    document.body.style.overflow = "";
  };

  const openModal = (key) => {
    setActiveReviewKey(key);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const activeReview = testimonials.find((x) => x.key === activeReviewKey);

  const previewText = (txt) => {
    const s = (txt || "").replace(/\s+/g, " ").trim();
    if (!s) return "";

    const cutAt = (pos) => s.slice(0, pos).trim() + (pos < s.length ? "..." : "");

    const firstSentenceEnd = (() => {
      const m = s.match(/[^.?!]*[.?!]/);
      return m ? m[0].length : -1;
    })();

    if (!/^(dear|hi|hello)\b/i.test(s)) {
      if (firstSentenceEnd > 0 && firstSentenceEnd < 170) return cutAt(firstSentenceEnd);
    }

    const secondSentenceEnd = (() => {
      const m = s.match(/(?:[^.?!]*[.?!]){2}/);
      return m ? m[0].length : -1;
    })();

    if (secondSentenceEnd > 0 && secondSentenceEnd < 220) return cutAt(secondSentenceEnd);

    const hardLimit = 190;
    if (s.length <= hardLimit) return s;
    return cutAt(hardLimit);
  };

  const titleId = "testimonials-title";
  const descId = "testimonials-desc";
  const dialogTitleId = "testimonial-dialog-title";
  const dialogDescId = "testimonial-dialog-desc";

  return (
    <>
      <section id="testimonials" className="mt-[50px] pb-[10px]" aria-labelledby={titleId}>
        <div className="max-w-[1450px] mx-auto px-[10px]">
          <motion.h2
            id={titleId}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="font-[Rajdhani] text-h2 font-[700] uppercase mb-[12px] text-[#003A80] text-center"
          >
            {t("testimonials.title")}
          </motion.h2>

          <p id={descId} className="sr-only">
            Client testimonials and reviews about ACHI Scaffolding services, project execution, safety standards, and on-site professionalism.
          </p>

          <div className="mt-[28px]">
            <div className="flex flex-col items-center gap-[20px] xl:flex-row xl:flex-wrap xl:justify-center" aria-describedby={descId}>
              {displayedTestimonials.map((r) => (
                <article key={r.key} className="w-full max-w-[240px] xl:max-w-none xl:flex-[0_0_auto] xl:w-[calc(20%-16px)]">
                  <div className="bg-white relative rounded-[16px] shadow-[0_15px_35px_rgba(0,0,0,0.08)] px-[18px] pt-[14px] pb-[70px] h-[420px] flex flex-col items-center text-center overflow-hidden">
                    <div className="hidden md:block text-[#FFB000] text-[22px] tracking-[2px] mb-[8px]" aria-label={`${r.rating} out of 5 stars`}>
                      {"★".repeat(r.rating)}
                    </div>

                    <div className="hidden md:block w-full mb-[8px]">
                      <p
                        className="font-saira text-[13px] font-[400] text-[#64748b] leading-[20px] w-full"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 4,
                          overflow: "hidden",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {r.text}
                      </p>
                    </div>

                    <div className="hidden md:flex w-full justify-center mt-auto">
                      <div className="group relative w-full max-w-[240px] aspect-square rounded-[14px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
                        <img
                          src={r.thumb}
                          alt={`Scaffolding project execution referenced by ${r.name}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]"
                        />

                        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/35" />

                        <button
                          type="button"
                          onClick={() => openModal(r.key)}
                          aria-haspopup="dialog"
                          aria-controls="testimonial-modal"
                          aria-label={`View more review photos and full testimonial from ${r.name}`}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-white text-[#214f9b] font-saira font-[700] uppercase text-[11px] px-[14px] py-[8px] rounded-[10px]"
                        >
                          View More
                        </button>
                      </div>
                    </div>

                    <div className="md:hidden w-full flex flex-col items-center text-center pt-[6px]">
                      <div className="w-full flex justify-center">
                        <div className="group relative w-[200px] h-[200px] rounded-[14px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
                          <img
                            src={r.thumb}
                            alt={`Scaffolding project execution referenced by ${r.name}`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/10" />
                          <button
                            type="button"
                            onClick={() => openModal(r.key)}
                            aria-haspopup="dialog"
                            aria-controls="testimonial-modal"
                            aria-label={`View more review photos and full testimonial from ${r.name}`}
                            className="absolute left-1/2 bottom-[10px] -translate-x-1/2 bg-white text-[#214f9b] font-saira font-[700] uppercase text-[11px] px-[14px] py-[8px] rounded-[10px]"
                          >
                            View More
                          </button>
                        </div>
                      </div>

                      <div className="text-[#FFB000] text-[22px] tracking-[2px] mt-[12px]" aria-label={`${r.rating} out of 5 stars`}>
                        {"★".repeat(r.rating)}
                      </div>

                      <p className="font-saira text-[13px] font-[400] text-[#64748b] leading-[20px] mt-[8px] px-[4px]">
                        {previewText(r.text)}
                      </p>
                    </div>

                    <div className="md:hidden absolute left-0 right-0 bottom-0 bg-white/95 backdrop-blur-sm border-t border-[#e2e8f0] py-[12px] px-[14px]">
                      <h3 className="text-h4 text-[#214f9b] text-center font-saira font-[800] leading-[1.1]">
                        {r.name}
                      </h3>
                    </div>
                  </div>

                  <h3 className="hidden md:block mt-[12px] text-h4 text-[#214f9b] text-center font-saira font-[700]">
                    {r.name}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {modalOpen && activeReview && (
        <div
          id="testimonial-modal"
          className="fixed inset-0 bg-black/70 z-[999999] flex items-center justify-center px-[16px] py-[16px]"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="bg-white w-full max-w-[980px] rounded-[18px] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescId}
          >
            <button
              type="button"
              aria-label="Close testimonial dialog"
              onClick={closeModal}
              className="fixed md:absolute top-[14px] right-[14px] z-[1000000] w-[42px] h-[42px] rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] text-[#0f172a] text-[26px] leading-[26px] flex items-center justify-center hover:bg-[#f1f5f9] transition"
            >
              &times;
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-[22px] md:p-[30px]">
              <h3 id={dialogTitleId} className="font-[Rajdhani] text-h3 font-[700] uppercase text-[#003A80] mb-[8px] pr-[60px]">
                {activeReview.name}
              </h3>

              <p id={dialogDescId} className="sr-only">
                Full testimonial text and review images for {activeReview.name}.
              </p>

              <div className="text-[#FFB000] text-[18px] tracking-[3px] mb-[14px]" aria-label={`${activeReview.rating} out of 5 stars`}>
                {"★".repeat(activeReview.rating)}
              </div>

              <p className="font-saira text-[#334155] text-body leading-[26px] mb-[18px] whitespace-pre-line">
                {activeReview.text}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-[12px]">
                {activeReview.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Scaffolding project image referenced in testimonial by ${activeReview.name} (${i + 1} of ${activeReview.images.length})`}
                    className="w-full h-[190px] rounded-[14px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
