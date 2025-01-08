import { useState } from "react";
import { CarouselSize } from "@/components/Carousel";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Packages = ({ items }: any) => {
  const { t } = useTranslation();
  const [sortOption, setSortOption] = useState<string>("rate");

  const sortItems = (option: string) => {
    switch (option) {
      case "rate":
        return [...items].sort((a, b) => b.rate - a.rate);
      case "priceLowToHigh":
        return [...items].sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return [...items].sort((a, b) => b.price - a.price);
      case "durationLowToHigh":
        return [...items].sort((a, b) => a.duration - b.duration);
      case "durationHighToLow":
        return [...items].sort((a, b) => b.duration - a.duration);
      default:
        return items;
    }
  };

  const sortedItems = sortItems(sortOption);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex w-full max-w-[90vw] flex-col gap-5 my-3"
    >
      <div className="flex justify-between items-center mb-4">
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-2xl font-bold text-[#044d88]"
        >
          {t("Our Best Seller Packages")}
        </motion.h1>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-md p-2 bg-transparent border-[transparent] text-[#044d88]"
        >
          <option value="rate">Sort by Rate</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="durationLowToHigh">Duration: Low to High</option>
          <option value="durationHighToLow">Duration: High to Low</option>
        </select>
      </div>
      <div className="container w-[90vw] mx-auto">
        <CarouselSize items={sortedItems} />
      </div>
    </motion.div>
  );
};

export default Packages;
