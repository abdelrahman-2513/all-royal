import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";

import { FaCircle } from "react-icons/fa";
// import { useAppSelector } from "@/hooks/hooks";

import Gallery from "./Gallery";
import CustomerForm from "./CustomerForm";
import IncExc from "./InclusionsExclusions";
import PriceAccommodation from "./Accommodation";
import { useTranslation } from "react-i18next";
// import { getCurrentLang } from "@/i18n";

const OnePack = ({ pack, selectedId }: any) => {
  const { t } = useTranslation();
  const [itinerary, setItinerary] = useState<any>(null);
  const [itinerary2, setItinerary2] = useState<any>(null);
  const [inclusions, setInclusions] = useState<any>(null);
  const [exclusions, setExclusions] = useState<any>(null);
  const [plans, setPlans] = useState<any>(null);
  const [toggleIti, setToggleIti] = useState<boolean>(true);

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
    console.log(itinerary, itinerary2, toggleIti);
  }, [itinerary, itinerary2, toggleIti]);

  return (
    <div className="flex flex-col gap-12 p-6 space-x-6 md:px-16 max-w-full ">
      <div className="flex flex-col md:flex-row p-6 space-x-6">
        {/* Left Section */}
        <Gallery pack={pack} dummyImageUrl={dummyImageUrl} />

        {/* Right Section */}
        <CustomerForm
          selectedId={selectedId}
          plans={plans}
          lowerPrices={lowerPrices}
          packageName={pack.NileCruisesName}
        />
      </div>
      {/* INCLUSIONS AND EXCLUSIONS  */}
      <IncExc inclusions={inclusions} exclusions={exclusions} />

      {/* ITINERARY */}
      <div className="flex justify-start mt-8 w-full">
        <div className="grid grid-cols-1 gap-8 w-full md:w-[75%]">
          {/* Itinerary Section */}
          {itinerary && toggleIti && itinerary.length > 0 && (
            <div className="w-full">
              <div className="flex gap-16">
                <h2
                  onClick={() => {
                    setToggleIti(!toggleIti);
                  }}
                  className={`${toggleIti ? "font-bold" : "opacity-70"} cursor-pointer text-2xl mb-8`}
                >
                  {t("Aswan to Luxor")}
                </h2>
                <h2
                  onClick={() => {
                    setToggleIti(!toggleIti);
                  }}
                  className={`${toggleIti ? "opacity-70" : "font-bold"} cursor-pointer text-2xl mb-8`}
                >
                  {t("Luxor to Aswan")}
                </h2>
              </div>

              <div className="max-h-[90vh] w-full scroll-container">
                {itinerary
                  .sort((a: any, b: any) => a.day - b.day) // Sort by day.day
                  .map((day: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 mb-8"
                    >
                      <FaCircle className="text-yellow-500 mt-1" />
                      <div>
                        {day.day && day.title && (
                          <h3 className="font-bold text-lg">
                            {`${t("Day")} ${day.day}: ${day.title}`}
                          </h3>
                        )}
                        {day.activities && <p>{day.activities}</p>}
                        {day.meals && day.meals.length > 0 && (
                          <>
                            <h1 className="mt-4 font-bold">{t("Meals")}:</h1>
                            <div className="flex gap-4">
                              {day.meals.map((meal: any, index: number) => (
                                <p key={meal + index} className="italic mt-2">
                                  {meal}
                                </p>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {itinerary2 && !toggleIti && itinerary2.length > 0 && (
            <div className="w-full">
              <div className="flex gap-16">
                <h2
                  onClick={() => {
                    setToggleIti(!toggleIti);
                  }}
                  className={`${toggleIti ? "font-bold" : "opacity-70"} cursor-pointer text-2xl mb-8`}
                >
                  {t("Aswan to Luxor")}
                </h2>
                <h2
                  onClick={() => {
                    setToggleIti(!toggleIti);
                  }}
                  className={`${toggleIti ? "opacity-70" : "font-bold"} cursor-pointer text-2xl mb-8`}
                >
                  {t("Luxor to Aswan")}
                </h2>
              </div>

              <div className="max-h-[90vh] w-full scroll-container">
                {itinerary2
                  .sort((a: any, b: any) => a.day - b.day) // Sort by day.day
                  .map((day: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 mb-8"
                    >
                      <FaCircle className="text-yellow-500 mt-1" />
                      <div>
                        {day.day && day.title && (
                          <h3 className="font-bold text-lg">
                            {t("Day")} {day.day}: {day.title}
                          </h3>
                        )}
                        {day.activities && <p>{day.activities}</p>}
                        {day.meals && day.meals.length > 0 && (
                          <>
                            <h1 className="mt-4 font-bold">{t("Meals")}:</h1>
                            <div className="flex gap-4">
                              {day.meals.map((meal: any, index: number) => (
                                <p key={meal + index} className="italic mt-2">
                                  {meal}
                                </p>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ACCOMMODATION */}
      <PriceAccommodation plans={plans} />
    </div>
  );
};

export default OnePack;
