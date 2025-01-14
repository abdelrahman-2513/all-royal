import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import EgyptImage from "@/assets/homeImages/egypt.jpg";
import JordanImage from "@/assets/homeImages/jordan.jpg";
import SaudiArabiaImage from "@/assets/homeImages/saudi.jpg";
import DubaiImage from "@/assets/homeImages/dubai.jpg";

const PopularDestinations = () => {
  const { t } = useTranslation();

  const destinations = [
    { name: t("Egypt"), image: EgyptImage },
    { name: t("Jordan"), image: JordanImage },
    { name: t("Saudi Arabia"), image: SaudiArabiaImage },
    { name: t("Dubai"), image: DubaiImage },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex w-full max-w-[90vw] flex-col  my-3 align-center"
    >
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-2xl my-5 p-0  font-bold text-[#044d88] "
      >
        {t("Most Popular Destination")}
      </motion.h1>
      <div className="container w-[90vw] mx-auto">
        <div className="grid grid-cols-2 sm:gap-2 md:grid-cols-4 w-[100%] mx-auto rounded-t-lg overflow-hidden">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                duration: 0.8,
              }}
              className="relative  overflow-hidden "
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-[300px] sm:rounded-t-lg sm:h-[200px] object-cover"
              />
              <div className="text-center py-3 text-[#0c2340] font-bold">
                {destination.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PopularDestinations;
