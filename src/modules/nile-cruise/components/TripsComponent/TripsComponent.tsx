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
        return [...filteredTrips].sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return [...filteredTrips].sort((a, b) => b.price - a.price);
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
    <div className="w-[90vw] mx-auto my-5"> 
        <div className="flex justify-between items-center mb-4">
        <motion.h1
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-2xl font-bold text-[#0071cc]"
        >
          {t(title)}
        </motion.h1>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="border rounded-md p-2 bg-transparent border-[#044d88] text-[#044d88] "
        >
          <option value="rate">Sort by Rate</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="durationLowToHigh">Duration: Low to High</option>
          <option value="durationHighToLow">Duration: High to Low</option>
        </select>
      </div>
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer"
        }
      >
        {sortedItems.slice(0, visibleCount).map((trip:any) => (
         <Card
                     className="w-full flex flex-col justify-between border-[1px] border-[#0071cc] shadow-lg object-cover md:h-[490px]"
                     placeholder={undefined}
                     onPointerEnterCapture={undefined}
                     onPointerLeaveCapture={undefined}
                     key={trip.id}
                   >
                     <CardHeader
                       floated={false}
                       color="blue-gray"
                       placeholder={undefined}
                       onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined}
                     >
                       <img
                         src={
                           trip.images && trip.images.length > 0
                             ? trip.images[0]
                             : dummyImageUrl
                         }
                         alt="ui/ux review check"
                         className="object-cover w-full h-[170px] aspect-ratio"
                       />
                       <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                     </CardHeader>
                     <CardBody
                       placeholder={undefined}
                       onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined}
                       className="flex flex-col justify-between"
                     >
                       <div className="mb-3 flex items-center justify-between">
                         <Typography
                           variant="h5"
                           color="blue-gray"
                           className="font-medium"
                           placeholder={undefined}
                           onPointerEnterCapture={undefined}
                           onPointerLeaveCapture={undefined}
                           title={trip.package_name || trip.NileCruisesName}
                         >
                           {/* Wooden House, Florida */}
                           {trip.package_name || trip.NileCruisesName || ""}
                         </Typography>
                         <Typography
                           color="blue-gray"
                           className="flex items-center gap-1.5 font-normal"
                           placeholder={undefined}
                           onPointerEnterCapture={undefined}
                           onPointerLeaveCapture={undefined}
                         >
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24"
                             fill="currentColor"
                             className="-mt-0.5 h-5 w-5 text-yellow-700"
                           >
                             <path
                               fillRule="evenodd"
                               d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                               clipRule="evenodd"
                             />
                           </svg>
                           5.0
                         </Typography>
                       </div>
                       <div className="flex justify-between">
                         <Typography
                           color="gray"
                           placeholder={undefined}
                           onPointerEnterCapture={undefined}
                           onPointerLeaveCapture={undefined}
                         >
                           {trip.NileCruisesName
                             ? trip.days +
                               ` ${t("Days")} / ` +
                               trip.nights +
                               ` ${t("Nights")} ${t("OR")} ` +
                               trip.days2 +
                               ` ${t("Days")} / ` +
                               trip.nights2 +
                               ` ${t("Nights")}`
                             : trip.days +
                               ` ${t("Days")} / ` +
                               trip.nights +
                               ` ${t("Nights")}`}
                         </Typography>
                         <Typography
                           color="gray"
                           placeholder={undefined}
                           onPointerEnterCapture={undefined}
                           onPointerLeaveCapture={undefined}
                         >
                           {trip.priceFrom == "Infinity"
                             ? t("Unset price")
                             : `${t("From")}: $` + trip.priceFrom}
                         </Typography>
                       </div>
                       <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                         <Tooltip
                           content={
                             trip.NileCruisesName
                               ? trip.days +
                                 ` ${t("Days")} / ` +
                                 trip.nights +
                                 ` ${t("Nights")} ${t("OR")} ` +
                                 trip.days2 +
                                 ` ${t("Days")} / ` +
                                 trip.nights2 +
                                 ` ${t("Nights")}`
                               : trip.days +
                                 ` ${t("Days")} / ` +
                                 trip.nights +
                                 ` ${t("Nights")}`
                           }
                         >
                           <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                             {/* ⌛ */}
                             <GiSandsOfTime />
                           </span>
                         </Tooltip>
                         <Tooltip
                           content={
                             `1 ${t("Country")} ` +
                             trip.cities.length +
                             ` ${t("Cities")}`
                           }
                         >
                           <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                             {/* 🌍 */}
                             <FaEarthAfrica />
                           </span>
                         </Tooltip>
                         <Tooltip content={trip.tour_type || trip.tourType}>
                           <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                             {/* 👥 */}
                             <GrGroup />
                           </span>
                         </Tooltip>
                         <Tooltip
                           content={
                             trip.availability !== "" ? trip.availability : t("Everyday")
                           }
                         >
                           <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                             {/* 📅 */}
                             <SlCalender />
                           </span>
                         </Tooltip>
                       </div>
                     </CardBody>
                     <CardFooter
                       className="pt-3"
                       placeholder={undefined}
                       onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined}
                     >
                       <Button
                         className="bg-[#003755] hover:bg-black/80 text-white"
                         size="lg"
                         fullWidth={true}
                         placeholder={undefined}
                         onPointerEnterCapture={undefined}
                         onPointerLeaveCapture={undefined}
                         onClick={() => {
                           if (trip.package_name) {
                             navigate(`/packages/${trip.id}`);
                           } else {
                             navigate(`/nile-cruises/${trip.id}`);
                           }
                         }}
                       >
                         {t("View")}
                       </Button>
                     </CardFooter>
                   </Card>
        ))}
      </div>

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
    </div>
  );
};

export default TripsGrid;
