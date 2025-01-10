import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";

import { FaCircle } from "react-icons/fa";
// import { useAppSelector } from "@/hooks/hooks";

import Gallery from "./Gallery";
import CustomerForm from "./CustomerForm";
import IncExc from "./InclusionsExclusions";
// import PriceAccommodation from "./Accommodation";
import { useTranslation } from "react-i18next";
import { Button } from "@material-tailwind/react";
import WavyLines from "@/components/WavyComponent/WavyComponent";
import PlannerBanner from "../PlannerComponent/PlannerComponent";
import Packages from "@/modules/home/components/Packages";
// import { getCurrentLang } from "@/i18n";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import BookForm from "@/modules/BookTour/Pages/BookForm";
import PriceAccommodation from "@/modules/packages/components/OnePackage/Accommodation";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const BasicBreadcrumbs = ({id}: any)=> {

  console.log({id});
  return (
    <div role="presentation"  className="mb-3 px-5 py-2"  onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Link underline="hover" color="#06284b" href="/en/nile-cruises">
          Nile Crusies
        </Link>
        <Link
          underline="hover"
          color="#0071cc"
          href={`/en/nile-cruises/${id}`}
        >
         <Typography sx={{ color: '#0071cc' }}>{`Cruise # ${id}`}</Typography> 
        </Link>
       
      </Breadcrumbs>
    </div>
  );
}
const OnePack = ({ pack, selectedId,packages }: any) => {
  const { t } = useTranslation();
  const [itinerary, setItinerary] = useState<any>(null);
  const [itinerary2, setItinerary2] = useState<any>(null);
  const [inclusions, setInclusions] = useState<any>(null);
  const [exclusions, setExclusions] = useState<any>(null);
  const [plans, setPlans] = useState<any>(null);
  const [toggleIti, setToggleIti] = useState<boolean>(true);
  const [activeDay, setActiveDay] = useState<any>(1);
  const [showFrom, setShowFrom] = useState<any>(false);

  const [lowerPrices, setLowerPrices] = useState<any[]>([]);

  const dummyImageUrl =
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  useEffect(() => {
    const fetchFullPackageInfo = async () => {
      const currentLang = localStorage.getItem("appLang") ?? "en";

      try {
        const { data: iti } = await supabase
          .from(currentLang === "en" ? "itinerary" : "itinerary_" + currentLang)
          .select("*")
          .eq("nile_cruise_id", pack.id);
        if (iti) {
          setItinerary(iti);
        }
        const { data: iti2 } = await supabase
          .from(
            currentLang === "en" ? "itinerary2" : "itinerary2_" + currentLang
          )
          .select("*")
          .eq("nile_cruise_id", pack.id);
        console.log(iti2);
        if (iti2) {
          console.log(iti2);
          setItinerary2(iti2);
        }
        const { data: inc } = await supabase
          .from(
            currentLang === "en" ? "inclusions" : "inclusions_" + currentLang
          )
          .select("*")
          .eq("nile_cruise_id", pack.id);
        if (inc) {
          setInclusions(inc);
        }
        const { data: exc } = await supabase
          .from(
            currentLang === "en" ? "exclusions" : "exclusions_" + currentLang
          )
          .select("*")
          .eq("nile_cruise_id", pack.id);
        if (exc) {
          setExclusions(exc);
        }
        const { data: acc } = await supabase
          .from(
            currentLang === "en"
              ? "accommodation_plans"
              : "accommodation_plans_" + currentLang
          )
          .select("*")
          .eq("nile_cruise_id", pack.id);
        if (acc) {
          setPlans(acc);

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
          setLowerPrices(lowerPrices);
        }
      } catch (error: any) {
        console.error("Error fetching countries:", error.message);
      }
    };

    fetchFullPackageInfo();
  }, []);

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(itinerary, itinerary2, toggleIti);
  }, [itinerary, itinerary2, toggleIti]);
  const handleBook = () => {
    setShowFrom(true);
    console.log(selectedId);
  }
  return (
    <div className=" bg-[#dfefff]  max-w-full  ">
      
      <div className="w-[90vw] mx-auto flex flex-col gap-12  ">
      {pack != null &&<BasicBreadcrumbs id={pack.id} />}
      {!showFrom ? <>
      <div className="flex flex-col  md:flex-row  w-[70vw] mx-auto md:w-[90vw] justify-center ">
        {/* Left Section */}
        <Gallery pack={pack} dummyImageUrl={dummyImageUrl} />
        
        {/* Right Section */}
        {/* <CustomerForm
          selectedId={selectedId}
          plans={plans}
          lowerPrices={lowerPrices}
          packageName={pack.NileCruisesName}
        /> */}
      </div>
      <div className="mt-6 text-center">
                  <Button
                    className="bg-[#044d88] py-[12px] px-[40px] hover:bg-blue-700 text-white"
                    onClick={handleBook}
                    placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                  >
                    {t("Book A Call")}
                  </Button>
                </div>
      {/* INCLUSIONS AND EXCLUSIONS  */}
      <IncExc inclusions={inclusions} exclusions={exclusions} />

      {/* ITINERARY */}
      <div className="flex flex-col justify-space-between mt-8 w-[90vw] mx-auto">
      <h2 className="font-bold text-xl text-[#0071cc]">{t("Itinerary")}</h2>

        <div className="grid grid-cols-1 gap-8 w-full">
          {/* Itinerary Section */}
          {itinerary && toggleIti && itinerary.length > 0 && (
            <div className="w-full">
              <div className="flex gap-16  justify-center bg-[#044d88] rounded-2xl  w-[fit-content] mx-auto mb-8 text-white align-center p-2 ">
                <h2
                  onClick={() => {
                    setActiveDay(1);
                    setToggleIti(!toggleIti);
                  }}
                  className={`${toggleIti ? "bg-[#06284b]" : "bg-[#044d88]"} p-1 rounded-lg  cursor-pointer text-lg `}
                >
                  {t("Aswan to Luxor")}
                </h2>
                <h2
                  onClick={() => {
                    setActiveDay(1);
                    setToggleIti(!toggleIti);
                  }}
                  className={`${toggleIti ? "bg-[#044d88]" : "bg-[#06284b]"} p-1 rounded-lg  cursor-pointer text-lg `}
                >
                  {t("Luxor to Aswan")}
                </h2>
              </div>

              <div className="flex space-x-2  rounded-t-md">
        {itinerary.sort((a: any, b: any) => a.day - b.day).map((day: any, index: number) => (
          <button
            key={index}
            onClick={() => setActiveDay(day.day)}
            className={`px-4 py-2 rounded-t-md ${
              activeDay === day.day
                ? "bg-[#06284b] text-white"
                : "bg-[#044d88] text-white hover:bg-gray-200"
            }`}
          >
            {t("Day")} {day.day}
          </button>
        ))}
      </div>

      {/* Active Day Content */}
      <div className="bg-[#0c2340] text-white p-6 rounded-b-md active-day relative h-[350px]">
        {itinerary
          .filter((day: any) => day.day === activeDay)
          .map((day: any, index: number) => (
            <div key={index} className="space-y-4">
              <WavyLines />
              {day.day && day.title && (
                <h3 className="font-bold text-lg">
                  {t("Day")} {day.day}: {day.title}
                </h3>
              )}
              
              {day.meals && day.meals.length > 0 && (
                <div>
                  <h4 className="mt-4 font-bold">{t("Meals")}:</h4>
                  <div className="flex gap-4">
                    {day.meals.map((meal: any, index: number) => (
                      <p key={meal + index} className="italic mt-2">
                        {meal}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {day.activities && (
                
                    <div  className="text-sm">
                      {t(day.activities)}
                    </div>
                 
              )}
            </div>
          ))}
        
      </div>
      <button className="mt-6 px-4 py-2 bg-[#044d88] text-white rounded-md hover:bg-[#033366]">
          {t("Download Itinerary")}
        </button>
            </div>
          )}
        
         
         

          {itinerary2 && !toggleIti && itinerary2.length > 0 && (
            <div className="w-full ">
              <div className="flex gap-16  justify-center bg-[#044d88] rounded-2xl  w-[fit-content] mx-auto mb-8 text-white align-center p-2 ">
                <h2
                  onClick={() => {
                    setToggleIti(!toggleIti);
                  }}
                  className={`${toggleIti ? "bg-[#044d88]" : "bg-[#044d88]"} p-1 rounded-lg  cursor-pointer text-lg `}
                >
                  {t("Aswan to Luxor")}
                </h2>
                <h2
                  onClick={() => {
                    setToggleIti(!toggleIti);
                  }}
                  className={`${!toggleIti ? "bg-[#06284b]" : "bg-[#044d88]"} cursor-pointer p-1 rounded-lg text-lg `} 
                >
                  {t("Luxor to Aswan")}
                </h2>
              </div>


              <div className="flex space-x-2  rounded-t-md">
        {itinerary2.sort((a: any, b: any) => a.day - b.day).map((day: any, index: number) => (
          <button
            key={index}
            onClick={() => setActiveDay(day.day)}
            className={`px-4 py-2 rounded-t-md ${
              activeDay === day.day
                ? "bg-[#06284b] text-white"
                : "bg-[#044d88] text-white hover:bg-gray-200"
            }`}
          >
            {t("Day")} {day.day}
          </button>
        ))}
      </div>

      {/* Active Day Content */}
      <div className="bg-[#0c2340] text-white p-6 rounded-b-md  h-[350px] active-day">
        {itinerary2
          .filter((day: any) => day.day === activeDay)
          .map((day: any, index: number) => (
            <div key={index} className="space-y-4">
              <WavyLines />
              {day.day && day.title && (
                <h3 className="font-bold text-lg">
                  {t("Day")} {day.day}: {day.title}
                </h3>
              )}
              
              {day.meals && day.meals.length > 0 && (
                <div>
                  <h4 className="mt-4 font-bold">{t("Meals")}:</h4>
                  <div className="flex gap-4">
                    {day.meals.map((meal: any, index: number) => (
                      <p key={meal + index} className="italic mt-2">
                        {meal}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {day.activities && (
                
                    <div  className="text-sm">
                      {t(day.activities)}
                    </div>
                 
              )}
            </div>
          ))}
        
      </div>
      <button className="mt-6 px-4 py-2 bg-[#044d88] text-white rounded-md hover:bg-[#033366]">
          {t("Download Itinerary")}
        </button>
            </div>
          )}
        </div>
      </div>

      {/* ACCOMMODATION */}
      <PriceAccommodation plans={plans} />


      <PlannerBanner />
          <Packages title={"MostPopular"} items={packages} />
        </>:<BookForm pack={pack} Children= {CustomerForm} plans={plans} lowerPrices={lowerPrices} />}
      </div>

    </div>
  );
};

export default OnePack;
