import { supabase } from "@/api/supabase";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import { GiSandsOfTime } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { setActive } from "@/hooks/redux/homeSlice";
import { useLanguageAwareNavigate } from "@/i18n";

const dummyImageUrl =
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const TripFilter = ({ packages }: any) => {
  const currentLang = localStorage.getItem("appLang") ?? "en";

  const dispatch = useAppDispatch();
  const navigate = useLanguageAwareNavigate();
  const destination = useAppSelector((state) => state.home.active);
  const { t } = useTranslation();

  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  // const [selectedCities, setSelectedCities] = useState<string[]>([]);
  // const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDaysNights, setSelectedDaysNights] = useState("");
  // const [selectedCountry, setSelectedCountry] = useState("");

  const [daysNightsOptions, setDaysNightsOptions] = useState<any[]>([]);

  const [isGridView, setIsGridView] = useState(true);

  const fetched = useRef(false);

  const [bigPackages, setBigPackages] = useState<any[]>([]);

  const handleCityChange = (city: string) => {
    setSelectedCountries((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  useEffect(() => {
    const fetchFullPackageInfo = async (pack: any) => {
      try {
        const { data: iti } = await supabase
        .from(currentLang === "en" ? "itinerary" : "itinerary_" + currentLang)
          .select("*")
          .eq("package_id", pack.id);
        const { data: inc } = await supabase
        .from(currentLang === "en" ? "inclusions" : "inclusions_" + currentLang)
          .select("*")
          .eq("package_id", pack.id);
        const { data: exc } = await supabase
        .from(currentLang === "en" ? "exclusions" : "exclusions_" + currentLang)
          .select("*")
          .eq("package_id", pack.id);
        const { data: acc } = await supabase
        .from(currentLang === "en" ? "accommodation_plans" : "accommodation_plans_" + currentLang)
          .select("*")
          .eq("package_id", pack.id);
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

  useEffect(() => {
    if (destination !== "") {
      setSelectedCountries((prevSelectedCountries) => [
        ...prevSelectedCountries,
        destination,
      ]);
      // setSelectedCountry(destination);
      dispatch(setActive(""));
    }
  }, [destination, useAppSelector]);

  useEffect(() => {
    if (bigPackages && bigPackages.length > 0) {
      // console.log(bigPackages);
      setCountryOptions(
        Array.from(new Set(bigPackages.flatMap((pkg: any) => pkg.countries)))
      );
      setDaysNightsOptions(["4 - 7", "8 - 10", "11 - 15"]);
    }
  }, [bigPackages]);

  const handlePriceChange = (event: any) => {
    setSelectedPrice(event);
  };

  const handleDaysNightsChange = (e: any) => {
    setSelectedDaysNights(e);
  };

  const filteredTrips = bigPackages
    .filter((trip) => {
      if (selectedPrice === "low-to-high") return trip.priceFrom >= 0;
      if (selectedPrice === "high-to-low") return trip.priceFrom >= 0;
      return true;
    })
    .filter((trip) => {
      if (selectedCountries.length === 0) return true;

      // Ensure all selected cities are present in trip.cities
      return selectedCountries.every((city) =>
        trip.countries && Array.isArray(trip.countries)
          ? trip.countries.some((tripCity: string) =>
              tripCity.toLowerCase().includes(city.toLowerCase())
            )
          : false
      );
    })
    .filter((trip: any) => {
      // if (
      //   selectedCountry &&
      //   (selectedCountry === "Egypt" ||
      //     selectedCountry === "Dubai" ||
      //     selectedCountry === "Jordan" ||
      //     selectedCountry === "Saudi Arabia")
      // ) {
      //   if (trip.country !== selectedCountry) return false;
      // }

      if (selectedDaysNights) {
        if (selectedDaysNights === "4 - 7") {
          return trip.days <= 7;
        }
        if (selectedDaysNights === "8 - 10") {
          return trip.days > 7 && trip.days <= 10;
        }
        if (selectedDaysNights === "11 - 15") {
          return trip.days > 10 && trip.days <= 15;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (selectedPrice === "low-to-high") return a.priceFrom - b.priceFrom;
      if (selectedPrice === "high-to-low") return b.priceFrom - a.priceFrom;
      return 0;
    });
  // const handleCountryChange = (event: any) => {
  //   setSelectedCountry(event);
  // };

  return (
    <div className="p-4 max-w-full min-h-[70vh]">
      {/* Filter Section */}
      <div className="flex flex-wrap justify-between items-center mb-6 space-y-2">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <Select
            name="daysNights"
            onChange={handleDaysNightsChange}
            value={selectedDaysNights}
            variant="static"
            className="w-60 md:w-80 pt-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Option value="">{t("Select Duration")}</Option>
            {daysNightsOptions.map((option, index) => (
              <Option key={index} value={option}>
                {option + ` ${t("Days")}`}
              </Option>
            ))}
          </Select>
          <Select
            name="price"
            variant="static"
            onChange={handlePriceChange}
            value={selectedPrice}
            className="w-60 md:w-80 pt-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Option value="">{t("Price")}</Option>
            <Option value="low-to-high">{t("Low to High")}</Option>
            <Option value="high-to-low">{t("High to Low")}</Option>
          </Select>
          {/* <Select
            name="country"
            onChange={handleCountryChange}
            value={selectedCountry}
            variant="static"
            className="w-60 md:w-80 pt-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Option value="">{t("Select Country")}</Option>
            <Option value="Egypt">{t("Egypt")}</Option>
            <Option value="Dubai">{t("Dubai")}</Option>
            <Option value="Jordan">{t("Jordan")}</Option>
            <Option value="Saudi Arabia">{t("Saudi Arabia")}</Option>
          </Select> */}
          <div className="relative inline-block text-left">
            {/* Dropdown button */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="w-60 md:w-80 flex justify-between items-center w-full border-b border-black/20 shadow-sm pt-3.5 pr-1 pb-2 bg-white text-sm font-medium text-black/70"
            >
              Country
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown content */}
            {isOpen && (
              <div
                className="w-60 md:w-80 absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <div className="flex flex-wrap items-center p-2">
                    {countryOptions.map((city) => (
                      <label
                        key={city}
                        className="inline-flex items-center w-full cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedCountries.includes(city)}
                          onChange={() => handleCityChange(city)}
                          color="blue"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          crossOrigin={undefined}
                        />
                        <span className="">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
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
            ? "grid grid-cols-1 lg:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer"
            : "space-y-4 cursor-pointer"
        }
      >
        {filteredTrips.map((p) => (
          <Card
            className="w-full flex flex-col justify-between shadow-lg object-cover lg:h-[490px]"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            key={p.id}
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
                  p.images && p.images.length > 0 ? p.images[0] : dummyImageUrl
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
                  title={p.package_name || p.NileCruisesName}
                >
                  {/* Wooden House, Florida */}
                  {p.package_name || p.NileCruisesName || ""}
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
              <div className="flex flex-col gap-4 justify-between">
                <Typography
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {p.NileCruisesName
                    ? p.days +
                      ` ${t("Days")} / ` +
                      p.nights +
                      ` ${t("Nights")} ${t("OR")} ` +
                      p.days2 +
                      ` ${t("Days")} / ` +
                      p.nights2 +
                      ` ${t("Nights")}`
                    : p.days +
                      ` ${t("Days")} / ` +
                      p.nights +
                      ` ${t("Nights")}`}
                </Typography>
                <Typography
                  // color="gray"
                  className="text-[#f5a41b] font-[700] text-xl"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {p.priceFrom == "Infinity"
                    ? ""
                    : `${t("From")}: $` + p.priceFrom}
                </Typography>
              </div>
              <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                <Tooltip
                  content={
                    p.NileCruisesName
                      ? p.days +
                        ` ${t("Days")} / ` +
                        p.nights +
                        ` ${t("Nights")} ${t("OR")} ` +
                        p.days2 +
                        ` ${t("Days")} / ` +
                        p.nights2 +
                        ` ${t("Nights")}`
                      : p.days +
                        ` ${t("Days")} / ` +
                        p.nights +
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
                    p.countries.length +
                    ` ${t("Country")} ` +
                    p.cities.length +
                    ` ${t("Cities")}`
                  }
                >
                  <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    {/* 🌍 */}
                    <FaEarthAfrica />
                  </span>
                </Tooltip>
                <Tooltip content={p.tour_type || p.tourType}>
                  <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    {/* 👥 */}
                    <GrGroup />
                  </span>
                </Tooltip>
                <Tooltip
                  content={
                    p.availability !== "" ? p.availability : t("Everyday")
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
                  if (p.package_name) {
                    navigate(`/packages/${p.id}`);
                  } else {
                    navigate(`/nile-cruises/${p.id}`);
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
