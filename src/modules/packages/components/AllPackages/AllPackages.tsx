import { supabase } from "@/api/supabase";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";


import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { setActive } from "@/hooks/redux/homeSlice";
import { useLanguageAwareNavigate } from "@/i18n";
import HeaderCard from "@/components/HeaderCard/HeaderCard";
import PackagesImage from "@/assets/homeImages/packages.jpg";
import SaudiImage from "@/assets/homeImages/saudi.jpg";
import DubaiImage from "@/assets/homeImages/dubai.jpg";
import JordanImage from "@/assets/homeImages/jordan.jpg";
import EgyptImage from "@/assets/homeImages/egypt.jpg";

import Packages from "@/modules/home/components/Packages";
import TripsGrid from "@/modules/nile-cruise/components/TripsComponent/TripsComponent";
import PlannerBanner from "@/modules/nile-cruise/components/PlannerComponent/PlannerComponent";
import WavyLines from "@/components/WavyComponent/WavyComponent";
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
  const [selectedCountry, setSelectedCountry] = useState("");
  
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
      setSelectedCountry(destination);
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
  console.log({bigPackages})
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
              tripCity.toLowerCase().includes(selectedCountry.toLowerCase())
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
    const relaxationArr = packages.filter(
      (pkg:any) => pkg.package_type === "Relaxation" || "Relajación"
    );
  
    const bestSellingArr = packages.filter(
      (pkg: any) =>
        pkg.package_type === "Best Selling Product" || "Producto más vendido"
    );
  // const handleCountryChange = (event: any) => {
  //   setSelectedCountry(event);
  // };
    console.log({selectedCountry})
    console.log({filteredTrips})
  return (
    <div className="max-w-full bg-[#dfefff] min-h-[70vh] page">
       <div className="wave">

<WavyLines lineCount={4} color="#0071cc"/>
</div>
<div className="wave">

<WavyLines lineCount={4} color="#0071cc"/>
</div>
      <HeaderCard image={selectedCountry === "Saudi Arabia" ? SaudiImage: selectedCountry === "Egypt" ? EgyptImage : selectedCountry === "Jordan" ? JordanImage: selectedCountry === "Dubai" ? DubaiImage : PackagesImage} title={selectedCountry == "" ?"Packages": selectedCountry} desc={selectedCountry == "" ?"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ":""}/>
      {/* Filter Section */}
      <TripsGrid title={"All Packages"} filteredTrips={filteredTrips} />
      <Packages title={"Relaxation"} items={relaxationArr} />
      <Packages title={"Best Selling Products"} items={bestSellingArr} />
      <PlannerBanner />
    </div>
  );
};

export default TripFilter;
