// import HeroImage3 from "@/assets/homeImages/tourist-taking-pictures-ancient-ruins-egypt_14117-893134.avif";
// import { useLanguageAwareNavigate } from "@/i18n";
// // import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// const Hero = () => {
//   const navigate = useLanguageAwareNavigate();
//   const { t } = useTranslation();

//   return (
//     <div
//       className="relative w-full h-[50vh] md:h-[70vh] md:bg-fixed bg-center"
//       style={{
//         // backgroundColor: `#0c2340`,
//       }}
//     >
//       <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center  gap-4 md:gap-16">
//         <div className="flex flex-col justify-center items-center text-white text-center">
//           <motion.h1
//             initial={{ opacity: 0, x: 200 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 100,
//               damping: 25,
//               duration: 0.8,
//             }}
//             className="text-2xl text-center md:text-4xl font-bold"
//           >
//             {t("All Royal Travel Egypt")}
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, x: -200 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 100,
//               damping: 25,
//               duration: 0.8,
//             }}
//             className="text-md md:text-lg mt-4"
//           >
//             {t("Dream. Explore. Discover!")}
//           </motion.p>
//         </div>
//         <div className="flex flex-col md:flex-row gap-3 md:gap-8 justify-center items-center text-white text-center">
//           <motion.button
//             initial={{ opacity: 0, x: -200 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 100,
//               damping: 25,
//               duration: 0.8,
//             }}
//             onClick={() => {
//               navigate("/create");
//             }}
//             className="px-4 py-2 bg-[#f5a31b] text-white cursor-pointer rounded-xl"
//           >
//             {t("Create my dream trip in")} <br /> {t("less than 30 seconds")}
//           </motion.button>
//           <span className="text-lg md:text-xl">{t("OR")}</span>
//           <motion.button
//             initial={{ opacity: 0, x: 200 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 100,
//               damping: 25,
//               duration: 0.8,
//             }}
//             onClick={() => {
//               navigate("/packages");
//             }}
//             className="px-4 py-2 bg-[#09415d] text-white cursor-pointer rounded-xl"
//           >
//             {t("Explore Packages")}
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguageAwareNavigate } from "@/i18n";
import HeroImage1 from "@/assets/homeImages/main-2.jpg";
import HeroImage2 from "@/assets/homeImages/main-3.jpg";
import HeroImage3 from "@/assets/homeImages/main-4.jpg";
import HeroImage4 from "@/assets/homeImages/dubai-main.jpg";
import WavyLines from "@/components/WavyComponent/WavyComponent";

const Hero = () => {
  const navigate = useLanguageAwareNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[70vh] md:h-[70vh] bg-[#0c2340] overflow-hidden flex items-center justify-center head">


      <WavyLines lineCount={4} color="gray"/>
      <WavyLines lineCount={3} color="#0071cc" lineSpacing={12}/>
      <WavyLines lineCount={4} color="#0071cc"/>
      <div className="container w-[90vw] mx-auto">
        <div className=" inset-0 my-auto flex flex-col justify-center justify-content-center  items-start text-white text-left   gap-4 w-[60%] md:gap-8">
          <motion.h1
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.8,
            }}
            className="text-4xl md:text-6xl font-bold"
          >
            {t("All Royal Travel")}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.8,
            }}
            className="text-lg md:text-xl text-[#044d88]"
          >
            {t("From The Heart Of Egypt")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.8,
            }}
            className="text-md  md:text-lg"
          >
            {t(
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            )}
          </motion.p>

          <div className="flex flex-row gap-4 ">
            <motion.button
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                duration: 0.8,
              }}
              onClick={() => navigate("/packages")}
              className="px-6 py-2 bg-[#044d88] text-white rounded-lg"
            >
              {t("Explore Packages")}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                duration: 0.8,
              }}
              onClick={() => navigate("/create")}
              className="px-6 py-2 bg-[#044d88] text-white rounded-lg"
            >
              {t("Customize Your Trip")}
            </motion.button>
          </div>
        </div>

        {/* Images Section */}
        <div className="absolute top-5 right-[270px] flex-col justify-content-center align-end gap-5 p-4">
          <img
            src={HeroImage4}
            alt="Hero 4"
            className="w-44 h-[120px] object-cover rounded-lg my-2"
          />
          <img
            src={HeroImage3}
            alt="Hero 3"
            className="w-56 h-35 object-contain rounded-lg"
          />
        </div>
        <div className="absolute bottom-[-50px] right-[-20px] flex-col  gap-5 p-4">
          <img
            src={HeroImage2}
            alt="Hero 2"
            className="w-60 h-30 object-cover rounded-lg my-2"
          />
          <img
            src={HeroImage1}
            alt="Hero 1"
            className="w-52 h-35 object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
