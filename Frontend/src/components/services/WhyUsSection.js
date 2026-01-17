// import React from "react";
// import { motion } from "framer-motion";
// import ImageWebp from "../ImageWebp";

// const WhyUsSection = () => {
//   return (
//     <section className="w-full bg-white py-[70px]">
//       <div className="max-w-[1250px] mx-auto px-[20px]">
//         <motion.h2
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="text-center font-[Rajdhani] text-[42px] font-[700] uppercase mb-[12px] text-[#003A80]"
//         >
//           WHY US
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.96 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[34px] gap-y-[28px] mt-[35px]"
//         >
//           <article className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[28px]">
//             <div className="flex justify-center">
//               <ImageWebp
//                 srcWebp="/assets/services/hard-hat.png"
//                 src="/assets/services/hard-hat.png"
//                 alt="Safety focused scaffolding team"
//                 className="w-[85px] h-[85px] object-contain"
//               />
//             </div>

//             <h3 className="mt-[18px] text-center font-[Rajdhani] text-[24px] font-[700] text-[#214F9B]">
//               Elevating Safety To A Mastery
//             </h3>

//             <p className="mt-[10px] font-saira text-[15px] leading-[1.7] text-[#4A5C7A] text-left">
//               Our unwavering vision is to set a paradigm shift in the scaffolding industry—a world where safety isn't
//               just a priority but an art form. We aspire to design scaffolding solutions that not only meet regulatory
//               standards but transcend them.
//             </p>
//           </article>

//           <article className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[28px]">
//             <div className="flex justify-center">
//               <ImageWebp
//                 srcWebp="/assets/services/lightbulb.png"
//                 src="/assets/services/lightbulb.png"
//                 alt="Innovative scaffolding solutions"
//                 className="w-[85px] h-[85px] object-contain"
//               />
//             </div>

//             <h3 className="mt-[18px] text-center font-[Rajdhani] text-[24px] font-[700] text-[#214F9B]">
//               Innovation At The Core
//             </h3>

//             <p className="mt-[10px] font-saira text-[15px] leading-[1.7] text-[#4A5C7A] text-left">
//               We're driven to revolutionize scaffolding by developing smarter, safer and more adaptive solutions that
//               elevate industry standards.
//             </p>
//           </article>

//           <article className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[28px]">
//             <div className="flex justify-center">
//               <ImageWebp
//                 srcWebp="/assets/services/codesandbox.png"
//                 src="/assets/services/codesandbox.png"
//                 alt="Quality in scaffolding execution"
//                 className="w-[85px] h-[85px] object-contain"
//               />
//             </div>

//             <h3 className="mt-[18px] text-center font-[Rajdhani] text-[24px] font-[700] text-[#214F9B]">
//               Crafting Timeless Quality
//             </h3>

//             <p className="mt-[10px] font-saira text-[15px] leading-[1.7] text-[#4A5C7A] text-left">
//               We deliver scaffolding solutions that stand the test of time through precision, experience, and
//               uncompromising quality standards.
//             </p>
//           </article>
//         </motion.div>

//         {/* Stats block moved to About page (see `src/components/StatsHighlights.js`). */}
//       </div>
//     </section>
//   );
// };

// export default WhyUsSection;
