import { supabase } from "@/api/supabase";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import { GiSandsOfTime } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useLanguageAwareNavigate } from "@/i18n";

const dummyImageUrl =
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const TripFilter = ({ packages }: any) => {
  const currentLang = localStorage.getItem("appLang") ?? "en";
  const navigate = useLanguageAwareNavigate();
  const { t } = useTranslation();

  const [selectedPrice, setSelectedPrice] = useState("");

  const [isGridView, setIsGridView] = useState(true);

  const fetched = useRef(false);

  const [bigPackages, setBigPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchFullPackageInfo = async (pack: any) => {
      try {
        const { data: iti } = await supabase
          .from(currentLang === "en" ? "itinerary" : "itinerary_" + currentLang)
          .select("*")
          .eq("nile_cruise_id", pack.id);
        const { data: inc } = await supabase
          .from(currentLang === "en" ? "inclusions" : "inclusions_" + currentLang)
          .select("*")
          .eq("nile_cruise_id", pack.id);
        const { data: exc } = await supabase
          .from(currentLang === "en" ? "exclusions" : "exclusions_" + currentLang)
          .select("*")
          .eq("nile_cruise_id", pack.id);
        const { data: acc } = await supabase
          .from(currentLang === "en" ? "accommodation_plans" : "accommodation_plans_" + currentLang)
          .select("*")
          .eq("nile_cruise_id", pack.id);
        if (iti && inc && exc && acc) {
          let lowerPrices = [];
          for (let i = 0; i < acc.length; i++) {
            if (acc[i].price_per_person_single_room) {
              lowerPrices.push(parseInt(acc[i].price_per_person_single_room));
            }
            if (acc[i].price_per_person_double_room) {
              lowerPrices.push(parseInt(acc[i].price_per_person_double_room));
            }
            if (acc[i].price_per_person_single_room_winter) {
              lowerPrices.push(
                parseInt(acc[i].price_per_person_single_room_winter)
              );
            }
            if (acc[i].price_per_person_double_room_winter) {
              lowerPrices.push(
                parseInt(acc[i].price_per_person_double_room_winter)
              );
            }
          }
          const priceFrom = Math.min(...lowerPrices);
          setBigPackages((prevBigPackages) => [
            ...prevBigPackages,
            {
              ...pack,
              itinerary: iti,
              inclusions: inc,
              exclusions: exc,
              plans: acc,
              priceFrom,
            },
          ]);
        }
      } catch (error: any) {
        console.error("Error fetching countries:", error.message);
      }
    };

    if (!fetched.current) {
      for (let i = 0; i < packages.length; i++) {
        fetchFullPackageInfo(packages[i]);
        if (i === packages.length - 1) {
          fetched.current = true;
        }
      }
    }
  }, [packages]);

  const handleFilterChange = (event: any) => {
    setSelectedPrice(event);
  };

  const filteredTrips = bigPackages
    .filter((trip) => {
      if (selectedPrice === "low-to-high") return trip.priceFrom >= 0;
      if (selectedPrice === "high-to-low") return trip.priceFrom >= 0;
      return true;
    })
    .sort((a, b) => {
      if (selectedPrice === "low-to-high") return a.priceFrom - b.priceFrom;
      if (selectedPrice === "high-to-low") return b.priceFrom - a.priceFrom;
      return 0;
    });

  return (
    <div className="p-4 max-w-full min-h-[70vh]">
      <div className="flex flex-wrap justify-between items-center mb-6 space-y-2">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <Select
            name="price"
            variant="static"
            onChange={(e) => {
              handleFilterChange(e);
            }}
            className="w-60 md:w-80 pt-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            value={selectedPrice}
          >
            <Option value={""}>{t("Filter by price")}</Option>
            <Option value="low-to-high">{`${t("Filter by price")}: ${t("Low to High")}`}</Option>
            <Option value="high-to-low">{`${t("Filter by price")}: ${t("High to Low")}`}</Option>
          </Select>
        </div>
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="hidden md:inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition ease-in-out duration-150"
        >
          {isGridView ? t("List View") : t("Grid View")}
        </button>
      </div>

      {/* Cards Section */}
      <div
        className={
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer"
            : "space-y-4 cursor-pointer"
        }
      >
        {filteredTrips.map((trip) => (
          <Card
            className="w-full flex flex-col justify-between shadow-lg object-cover md:h-[490px]"
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
    </div>
  );
};

export default TripFilter;
