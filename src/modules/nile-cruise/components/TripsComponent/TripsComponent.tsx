import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
   
  } from "@material-tailwind/react";
  import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GiSandsOfTime } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useLanguageAwareNavigate } from "@/i18n";
import { CardDefault } from "@/components/MTCard";
  const dummyImageUrl =
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const TripsGrid = ({title, filteredTrips }:any) => {
    const navigate = useLanguageAwareNavigate();
    const {t} = useTranslation();
  const [visibleCount, setVisibleCount] = useState(4); // Initial count of trips to show
  const [sortOption, setSortOption] = useState<string>("rate");
  const [sortedItems, setSortedItems] = useState([]);
  const showMoreTrips = () => {

    setVisibleCount((prevCount) => prevCount + 4); // Load 4 more trips each time
  };
  const sortItems = (option: string) => {
    switch (option) {
      case "rate":
        return [...filteredTrips].sort((a, b) => b.rate - a.rate);
      case "priceLowToHigh":
        return [...filteredTrips].sort((a, b) => a.priceFrom - b.priceFrom);
      case "priceHighToLow":
        return [...filteredTrips].sort((a, b) => b.priceFrom - a.priceFrom);
      case "durationLowToHigh":
        return [...filteredTrips].sort((a, b) => a.days - b.days);
      case "durationHighToLow":
        return [...filteredTrips].sort((a, b) => b.days - a.days);
      default:
        return filteredTrips;
    }
  };

  const handleSort = (option: string) => {
    console.log(option);
    setSortOption(option);
    setSortedItems(sortItems(option));
    console.log(sortedItems);
  };

  useEffect(() => {
    setSortedItems(filteredTrips);
  },[filteredTrips])
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
     className="w-[90vw] mx-auto my-5"
    >
 
        <motion.div initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }} className="flex justify-between items-center mb-4">
        <motion.h1
         initial={{ opacity: 0, y: 50, scale: 0.9 }}   // Start slightly lower and smaller
         whileInView={{ opacity: 1, y: 0, scale: 1 }}  // Fade in, slide up, and scale up
         transition={{
           duration: 1,        // Smooth and slow transition
           ease: "easeOut",    // Ease-out for a natural finish
           delay: 0.2,         // Delay for a more impactful appearance
           type: "spring",     // Spring effect for bounce
           stiffness: 80       // Controls the bounce effect
         }}
         viewport={{ once: true }}
          className="text-2xl font-bold text-[#0071cc]"
        >
          {t(title)}
        </motion.h1>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="border sm:text-[0.875rem] sm:p-[0.5rem] sm:h-[fit-content] rounded-md p-2 bg-transparent border-[#044d88] text-[#044d88]"
        >
          <option value="rate">Sort by Rate</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="durationLowToHigh">Duration: Low to High</option>
          <option value="durationHighToLow">Duration: High to Low</option>
        </select>
      </motion.div>
      <motion.div
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer"
        }
      >
        {sortedItems.slice(0, visibleCount).map((trip:any,index) => (
         <CardDefault p={trip} index={index}  />
        ))}
      </motion.div>

      {visibleCount < filteredTrips.length && ( // Show button only if there are more trips to show
        <div className="mt-6 text-center">
          <Button
            className="bg-[#044d88] hover:bg-blue-700 text-white"
            onClick={showMoreTrips}
            placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
          >
            {t("Show More")}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default TripsGrid;
