import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";
import { supabase } from "@/api/supabase";
import { v4 as uuidv4 } from "uuid";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string;
  meals: string[];
  accommodation: string;
  optional_tour_name: string;
  optional_tour_price: number;
  optional_tour_description: string;
}

interface Hotel {
  name: string;
  location: string;
  stars: number;
  options: string[];
}

interface AccommodationPlan {
  name: string;
  price_per_person_single_room: number;
  price_per_person_double_room: number;
  price_per_person_single_room_winter: number;
  price_per_person_double_room_winter: number;
  hotels: Hotel[];
}

type PackageDetails = {
  packageName: string;
  availability: string;
  days: number;
  nights: number;
  countries: string[];
  cities: string[];
  tourType: string;
  package_type: string;
  images: string[];
  itinerary: ItineraryDay[];
  accommodationPlans: AccommodationPlan[];
  inclusions: string[];
  exclusions: string[];
};

const COUNTRIES = ["Egypt", "Jordan", "Dubai", "Saudi Arabia"] as const;
const CountrySelector = ({
  packageDetails,
  setPackageDetails,
}: {
  packageDetails: PackageDetails;
  setPackageDetails: React.Dispatch<React.SetStateAction<PackageDetails>>;
}) => {
  const handleCountryChange = (country: string, checked: boolean) => {
    const updatedCountries = checked
      ? [...packageDetails.countries, country]
      : packageDetails.countries.filter((c) => c !== country);

    setPackageDetails((prev) => ({
      ...prev,
      countries: updatedCountries,
    }));
  };
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Countries</h2>
      <div className="flex gap-4">
        {COUNTRIES.map((country) => (
          <div
            key={country}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50"
          >
            <label
              // htmlFor={`country-${country}`}
              className="flex items-center cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Checkbox
                // id={`country-${country}`}
                color="blue"
                checked={packageDetails.countries.includes(country)}
                onChange={() => {
                  if (packageDetails.countries.includes(country)) {
                    handleCountryChange(country, false);
                  } else {
                    handleCountryChange(country, true);
                  }
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <span>{country}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const translateToESandPL = async (input: { text: string }[]) => {
  try {
    // Filter out empty or undefined texts
    const validInput = input?.filter(
      (item) => item.text && item.text.trim() !== ""
    );

    if (validInput.length === 0) return [];

    const response = await fetch(
      import.meta.env.VITE_APP_TRANSLATION_URL +
        "/translate?api-version=3.0&from=en&to=es,pl",
      {
        method: "post",
        headers: {
          "Ocp-Apim-Subscription-Key": import.meta.env
            .VITE_APP_TRANSLATION_API_KEY2,
          "Ocp-Apim-Subscription-Region": import.meta.env
            .VITE_APP_TRANSLATION_LOCATION,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Translation error:", error);
    // Return empty translations to prevent breaking the flow
    return input.map((item) => ({
      translations: [
        { text: item.text }, // Spanish - same as input
        { text: item.text }, // Polish - same as input
      ],
    }));
  }
};

export function PackageUpdateForm() {
  const [packages, setPackages] = useState<
    { id: number; package_name: string }[]
  >([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const [packageDetails, setPackageDetails] = useState<{
    packageName: string;
    availability: string;
    // duration: string;
    days: number;
    nights: number;
    countries: string[];
    cities: string[];
    tourType: string;
    package_type: string;
    images: string[];
    itinerary: {
      day: number;
      title: string;
      meals: string[];
      activities: string;
      accommodation: string;
      optional_tour_name: string;
      optional_tour_price: number;
      optional_tour_description: string;
    }[];
    accommodationPlans: AccommodationPlan[];
    inclusions: string[];
    exclusions: string[];
  }>({
    packageName: "",
    availability: "",
    // duration: "",
    days: 1,
    nights: 0,
    countries: [],
    cities: [],
    tourType: "",
    package_type: "",
    images: [],
    itinerary: [],
    accommodationPlans: [],
    inclusions: [],
    exclusions: [],
  });

  const [_translations, setTranslations] = useState<{
    packages: { es: any[]; pl: any[] };
    itinerary: { es: any[]; pl: any[] };
    accommodationPlans: { es: any[]; pl: any[] };
    hotels: { es: any[]; pl: any[] };
    inclusions: { es: any[]; pl: any[] };
    exclusions: { es: any[]; pl: any[] };
  }>({
    packages: { es: [], pl: [] },
    itinerary: { es: [], pl: [] },
    accommodationPlans: { es: [], pl: [] },
    hotels: { es: [], pl: [] },
    inclusions: { es: [], pl: [] },
    exclusions: { es: [], pl: [] },
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("id, package_name");
    if (error) console.error("Error fetching packages:", error);
    else setPackages(data);
  };

  const fetchPackageDetails = async (packageId: any) => {
    // Fetch main package data
    const { data, error } = await supabase
      .from("packages")
      .select(
        `
        *,
        itinerary (*),
        accommodation_plans (
          *,
          hotels (*)
        ),
        inclusions (*),
        exclusions (*)
      `
      )
      .eq("id", packageId)
      .single();
    console.log("🚀 ~ fetchPackageDetails ~ data:", data);

    if (error) {
      console.error("Error fetching package details:", error);
      return;
    }
    const accommodation_plans = data.accommodation_plans;
    // Sort itinerary by day
    if (data) {
      data.itinerary = data.itinerary.sort(
        (a: { day: number }, b: { day: number }) => a.day - b.day
      );
    }

    const [
      { data: packagesES },
      { data: packagesPL },
      { data: itineraryES },
      { data: itineraryPL },
      { data: plansES },
      { data: plansPL },
      { data: inclusionsES },
      { data: inclusionsPL },
      { data: exclusionsES },
      { data: exclusionsPL },
    ] = await Promise.all([
      supabase.from("packages_es").select("*").eq("id", packageId),
      supabase.from("packages_pl").select("*").eq("id", packageId),
      supabase.from("itinerary_es").select("*").eq("package_id", packageId),
      supabase.from("itinerary_pl").select("*").eq("package_id", packageId),
      supabase
        .from("accommodation_plans_es")
        .select("*")
        .eq("package_id", packageId),
      supabase
        .from("accommodation_plans_pl")
        .select("*")
        .eq("package_id", packageId),
      supabase.from("inclusions_es").select("*").eq("package_id", packageId),
      supabase.from("inclusions_pl").select("*").eq("package_id", packageId),
      supabase.from("exclusions_es").select("*").eq("package_id", packageId),
      supabase.from("exclusions_pl").select("*").eq("package_id", packageId),
    ]);

    const hotelsId = accommodation_plans.map((plan: any) => plan.id);
    // use the id in hotels to retrieve the hotels from translated tables
    const [{ data: hotelsES }, { data: hotelsPL }] = await Promise.all([
      supabase
        .from("hotels_es")
        .select("*")
        .in("accommodation_plan_id", hotelsId),
      supabase
        .from("hotels_pl")
        .select("*")
        .in("accommodation_plan_id", hotelsId),
    ]);

    // Store translations in state
    setTranslations({
      packages: {
        es: packagesES || [],
        pl: packagesPL || [],
      },
      itinerary: {
        es: itineraryES || [],
        pl: itineraryPL || [],
      },
      accommodationPlans: {
        es: plansES || [],
        pl: plansPL || [],
      },
      hotels: {
        es: hotelsES || [],
        pl: hotelsPL || [],
      },
      inclusions: {
        es: inclusionsES || [],
        pl: inclusionsPL || [],
      },
      exclusions: {
        es: exclusionsES || [],
        pl: exclusionsPL || [],
      },
    });

    setPackageDetails({
      packageName: data.package_name,
      availability: data.availability,
      days: data.days,
      nights: data.nights,
      countries: data.countries,
      cities: data.cities,
      tourType: data.tour_type,
      package_type: data.package_type,
      images: data.images,
      itinerary: data.itinerary,
      accommodationPlans: data.accommodation_plans,
      inclusions: data.inclusions.map(
        (inc: { description: any }) => inc.description
      ),
      exclusions: data.exclusions.map(
        (exc: { description: any }) => exc.description
      ),
    });
  };

  const handlePackageSelect = (packageId: string | undefined) => {
    if (packageId) {
      setSelectedPackage(packageId);
      fetchPackageDetails(packageId);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    index: number | undefined,
    field: string | undefined,
    subIndex: string | number | undefined
  ) => {
    let name: string;
    let value: string;

    if (typeof e === "string") {
      name = field || "";
      value = e;
    } else {
      name = e.target.name;
      value = e.target.value;
    }
    if (index !== undefined) {
      if (field === "hotelName" && subIndex !== undefined) {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        if (!newAccommodationPlans[index].hotels) {
          newAccommodationPlans[index].hotels = [];
        }
        newAccommodationPlans[index].hotels[subIndex as number].name = value;
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "hotelStars" && subIndex !== undefined) {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        if (!newAccommodationPlans[index].hotels) {
          newAccommodationPlans[index].hotels = [];
        }
        newAccommodationPlans[index].hotels[subIndex as number].stars =
          parseInt(value);
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "hotels" && subIndex !== undefined) {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        if (!newAccommodationPlans[index].hotels) {
          newAccommodationPlans[index].hotels = [];
        }
        newAccommodationPlans[index].hotels[subIndex as number].location =
          value;
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "options" && subIndex !== undefined) {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].hotels[subIndex as number].options[0] =
          value;
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
        console.log(packageDetails);
      } else if (field === "accommodationPlans") {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];

        if (name in newAccommodationPlans[index]) {
          (newAccommodationPlans[index] as any)[name] = value;
        }

        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (
        field === "cities" ||
        field === "images" ||
        field === "inclusions" ||
        field === "exclusions"
      ) {
        const newArray = [...packageDetails[field]];
        newArray[index] = value;
        setPackageDetails({ ...packageDetails, [field]: newArray });
      } else if (field === "meals") {
        const newItinerary = [...packageDetails.itinerary];
        newItinerary[index].meals[subIndex as number] = value;
        setPackageDetails({ ...packageDetails, itinerary: newItinerary });
      } else {
        const newItinerary = [...packageDetails.itinerary];
        (newItinerary[index] as any)[name] = value;
        setPackageDetails({ ...packageDetails, itinerary: newItinerary });
      }
    } else {
      console.log("555555555555", name, value);
      setPackageDetails({ ...packageDetails, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // First update the main package
      const { error: _updateError } = await supabase
        .from("packages")
        .update({
          package_name: packageDetails.packageName,
          availability: packageDetails.availability,
          days: packageDetails.days,
          nights: packageDetails.nights,
          countries: packageDetails.countries,
          cities: packageDetails.cities,
          tour_type: packageDetails.tourType,
          package_type: packageDetails.package_type,
          images: packageDetails.images,
        })
        .eq("id", selectedPackage);
      const packageId = selectedPackage;
      console.log(packageDetails);

      console.log("🚀 Starting package creation...");
      console.log("📦 Package details to be inserted:", {
        package_name: packageDetails.packageName,
        availability: packageDetails.availability,
        days: packageDetails.days,
        nights: packageDetails.nights,
        countries: packageDetails.countries,
        cities: packageDetails.cities,
        tour_type: packageDetails.tourType,
        package_type: packageDetails.package_type,
        images: packageDetails.images,
      });

      let input = [];
      let result;

      // Translate and insert translations in packages_es and packages_pl tables
      console.log("🌐 Starting package translations...");
      input = [
        { text: packageDetails.packageName },
        { text: packageDetails.availability },
        { text: packageDetails.tourType },
        { text: packageDetails.package_type },
      ];
      console.log("📝 Texts to translate:", input);

      result = await translateToESandPL(input);
      console.log("✅ Translation results:", result);
      console.log(
        "🔍 First translation result:",
        result[0].translations[0].text
      );

      try {
        console.log("💾 Storing Spanish and Polish translations...");
        console.log("📦 Spanish package data to be inserted:", {
          id: packageId,
          package_name: result[0].translations[0].text,
          availability: result[1].translations[0].text,
          tour_type: result[2].translations[0].text,
          package_type: result[3].translations[0].text,
          // ... other fields
        });

        console.log("📦 Polish package data to be inserted:", {
          id: packageId,
          package_name: result[0].translations[1].text,
          availability: result[1].translations[1].text,
          tour_type: result[2].translations[1].text,
          package_type: result[3].translations[1].text,
          // ... other fields
        });

        const [esResponse, plResponse] = await Promise.all([
          supabase.from("packages_es").upsert({
            id: packageId,
            package_name: result[0].translations[0].text,
            availability: result[1].translations[0].text,
            days: packageDetails.days,
            nights: packageDetails.nights,
            countries: packageDetails.countries,
            cities: packageDetails.cities,
            tour_type: result[2].translations[0].text,
            package_type: result[3].translations[0].text,
            images: packageDetails.images,
          }),
          supabase.from("packages_pl").upsert({
            id: packageId,
            package_name: result[0].translations[1].text,
            availability: result[1].translations[1].text,
            days: packageDetails.days,
            nights: packageDetails.nights,
            countries: packageDetails.countries,
            cities: packageDetails.cities,
            tour_type: result[2].translations[1].text,
            package_type: result[3].translations[1].text,
            images: packageDetails.images,
          }),
        ]);

        if (esResponse.error) {
          console.error("❌ Error inserting Spanish translation:", {
            error: esResponse.error,
            details: esResponse.error.details,
            message: esResponse.error.message,
            hint: esResponse.error.hint,
          });
          throw new Error(
            `Spanish translation error: ${esResponse.error.message}`
          );
        }

        if (plResponse.error) {
          console.error("❌ Error inserting Polish translation:", {
            error: plResponse.error,
            details: plResponse.error.details,
            message: plResponse.error.message,
            hint: plResponse.error.hint,
          });
          throw new Error(
            `Polish translation error: ${plResponse.error.message}`
          );
        }

        console.log("✅ Package translations stored successfully");
      } catch (error) {
        console.error("❌ Translation insertion error:", error);
        throw error;
      }

      // Translate and insert itinerary
      console.log("📅 Starting itinerary processing...");
      try {
        await Promise.all(
          packageDetails.itinerary.map(async (day, index) => {
            console.log(
              `🗓️ Processing day ${day.day} (${index + 1}/${packageDetails.itinerary.length})`
            );

            input = [
              { text: day.title },
              { text: day.activities },
              { text: day.accommodation },
              { text: day.optional_tour_name },
              { text: day.optional_tour_description },
            ];
            console.log(`📝 Day ${day.day} texts to translate:`, input);

            result = await translateToESandPL(input);
            console.log(`✅ Day ${day.day} translation results:`, result);

            const en_day = {
              package_id: packageId,
              day: day.day,
              title: day.title,
              activities: day.activities,
              accommodation: day.accommodation,
              optional_tour_name: day.optional_tour_name,
              optional_tour_description: day.optional_tour_description,
              optional_tour_price: day.optional_tour_price,
              meals: day.meals,
              nile_cruise_id: null,
            };

            const es_day = {
              package_id: packageId,
              day: day.day,
              title: result[0].translations[0].text,
              activities: result[1].translations[0].text,
              accommodation: result[2].translations[0].text,
              optional_tour_name: result[3].translations[0].text,
              optional_tour_description: result[4].translations[0].text,
              optional_tour_price: day.optional_tour_price,
              meals: day.meals,
              nile_cruise_id: null,
            };

            const pl_day = {
              package_id: packageId,
              day: day.day,
              title: result[0].translations[1].text,
              activities: result[1].translations[1].text,
              accommodation: result[2].translations[1].text,
              optional_tour_name: result[3].translations[1].text,
              optional_tour_description: result[4].translations[1].text,
              optional_tour_price: day.optional_tour_price,
              meals: day.meals,
              nile_cruise_id: null,
            };

            console.log(`💾 Storing translations for day ${day.day}...`);
            console.log(`📦 Spanish day data:`, es_day);
            console.log(`📦 Polish day data:`, pl_day);

            const [esResponse, plResponse] = await Promise.all([
              supabase.from("itinerary").upsert(en_day),
              supabase.from("itinerary_es").upsert(es_day),
              supabase.from("itinerary_pl").upsert(pl_day),
            ]);

            if (esResponse.error) {
              console.error(
                `❌ Error inserting Spanish itinerary for day ${day.day}:`,
                {
                  day: day.day,
                  error: esResponse.error,
                  details: esResponse.error.details,
                  message: esResponse.error.message,
                }
              );
              throw new Error(
                `Spanish itinerary error: ${esResponse.error.message}`
              );
            }

            if (plResponse.error) {
              console.error(
                `❌ Error inserting Polish itinerary for day ${day.day}:`,
                {
                  day: day.day,
                  error: plResponse.error,
                  details: plResponse.error.details,
                  message: plResponse.error.message,
                }
              );
              throw new Error(
                `Polish itinerary error: ${plResponse.error.message}`
              );
            }

            console.log(`✅ Day ${day.day} translations stored successfully`);
          })
        );
        console.log("✅ All itinerary days processed successfully");
      } catch (error) {
        console.error("❌ Itinerary translation insertion error:", error);
        throw error;
      }

      // Translate and insert accommodation plans
      console.log("🏨 Starting accommodation plans processing...");
      try {
        await Promise.all(
          packageDetails.accommodationPlans.map(async (plan, planIndex) => {
            console.log(
              `🏢 Processing plan ${planIndex + 1}/${packageDetails.accommodationPlans.length}`
            );
            console.log(`📦 Plan data to be inserted:`, {
              package_id: packageId,
              name: plan.name,
              price_per_person_single_room: plan.price_per_person_single_room,
              price_per_person_double_room: plan.price_per_person_double_room,
              price_per_person_single_room_winter:
                plan.price_per_person_single_room_winter,
              price_per_person_double_room_winter:
                plan.price_per_person_double_room_winter,
            });

            const { data: plan_id, error: planError } = await supabase
              .from("accommodation_plans")
              .insert([
                {
                  package_id: packageId,
                  name: plan.name,
                  price_per_person_single_room:
                    plan.price_per_person_single_room,
                  price_per_person_double_room:
                    plan.price_per_person_double_room,
                  price_per_person_single_room_winter:
                    plan.price_per_person_single_room_winter,
                  price_per_person_double_room_winter:
                    plan.price_per_person_double_room_winter,
                },
              ])
              .select("id");

            if (planError || !plan_id) {
              console.error(
                `❌ Error creating accommodation plan ${planIndex + 1}:`,
                {
                  error: planError,
                  details: planError?.details,
                  message: planError?.message,
                }
              );
              throw new Error(
                `Error creating accommodation plan: ${planError?.message}`
              );
            }

            const planId = plan_id[0].id;
            console.log(`✅ Plan ${planIndex + 1} created with ID:`, planId);

            console.log(`🌐 Translating plan name:`, plan.name);
            input = [{ text: plan.name }];
            result = await translateToESandPL(input);
            console.log(
              `✅ Translation results for plan ${planIndex + 1}:`,
              result
            );

            console.log(`💾 Storing plan translations...`);
            console.log(`📦 Spanish plan data:`, {
              id: planId,
              package_id: packageId,
              name: result[0].translations[0].text,
              prices: {
                single: plan.price_per_person_single_room,
                double: plan.price_per_person_double_room,
                single_winter: plan.price_per_person_single_room_winter,
                double_winter: plan.price_per_person_double_room_winter,
              },
            });

            console.log(`📦 Polish plan data:`, {
              id: planId,
              package_id: packageId,
              name: result[0].translations[1].text,
              prices: {
                single: plan.price_per_person_single_room,
                double: plan.price_per_person_double_room,
                single_winter: plan.price_per_person_single_room_winter,
                double_winter: plan.price_per_person_double_room_winter,
              },
            });

            const [esResponse, plResponse] = await Promise.all([
              supabase.from("accommodation_plans_es").upsert({
                id: planId,
                package_id: packageId,
                name: result[0].translations[0].text,
                price_per_person_single_room: plan.price_per_person_single_room,
                price_per_person_double_room: plan.price_per_person_double_room,
                price_per_person_single_room_winter:
                  plan.price_per_person_single_room_winter,
                price_per_person_double_room_winter:
                  plan.price_per_person_double_room_winter,
              }),
              supabase.from("accommodation_plans_pl").upsert({
                id: planId,
                package_id: packageId,
                name: result[0].translations[1].text,
                price_per_person_single_room: plan.price_per_person_single_room,
                price_per_person_double_room: plan.price_per_person_double_room,
                price_per_person_single_room_winter:
                  plan.price_per_person_single_room_winter,
                price_per_person_double_room_winter:
                  plan.price_per_person_double_room_winter,
              }),
            ]);

            if (esResponse.error) {
              console.error(
                `❌ Error inserting Spanish accommodation plan ${planIndex + 1}:`,
                {
                  error: esResponse.error,
                  details: esResponse.error.details,
                  message: esResponse.error.message,
                  data: {
                    planId,
                    packageId,
                    translation: result[0].translations[0].text,
                  },
                }
              );
              throw new Error(
                `Spanish accommodation plan error: ${esResponse.error.message}`
              );
            }

            if (plResponse.error) {
              console.error(
                `❌ Error inserting Polish accommodation plan ${planIndex + 1}:`,
                {
                  error: plResponse.error,
                  details: plResponse.error.details,
                  message: plResponse.error.message,
                }
              );
              throw new Error(
                `Polish accommodation plan error: ${plResponse.error.message}`
              );
            }

            // Handle hotels
            if (plan.hotels) {
              await Promise.all(
                plan.hotels.map(async (hotel) => {
                  // Validate hotel data
                  if (!hotel.name || !hotel.location || !hotel.options[0]) {
                    console.error("❌ Hotel data is incomplete:", hotel);
                    alert(
                      "Hotel data is incomplete. Please fill in all fields."
                    );
                    throw new Error("Hotel data is incomplete");
                  }

                  input = [
                    { text: hotel.name },
                    { text: hotel.location },
                    { text: hotel.options[0] },
                  ];

                  result = await translateToESandPL(input);

                  const { data: hotel_id, error: hotelError } = await supabase
                    .from("hotels")
                    .insert([
                      {
                        accommodation_plan_id: planId,
                        name: hotel.name,
                        location: hotel.location,
                        stars: hotel.stars,
                        options: hotel.options,
                      },
                    ])
                    .select("id");

                  if (hotelError || !hotel_id) {
                    console.error("❌ Error creating hotel:", {
                      error: hotelError,
                      details: hotelError?.details,
                      message: hotelError?.message,
                    });
                    throw new Error(
                      `Error creating hotel: ${hotelError?.message}`
                    );
                  }

                  const hotelId = hotel_id[0].id;

                  const [esHotelResponse, plHotelResponse] = await Promise.all([
                    supabase.from("hotels_es").upsert({
                      id: hotelId,
                      accommodation_plan_id: planId,
                      name: result[0].translations[0].text,
                      location: result[1].translations[0].text,
                      stars: hotel.stars,
                      options: [result[2].translations[0].text],
                    }),
                    supabase.from("hotels_pl").upsert({
                      id: hotelId,
                      accommodation_plan_id: planId,
                      name: result[0].translations[1].text,
                      location: result[1].translations[1].text,
                      stars: hotel.stars,
                      options: [result[2].translations[1].text],
                    }),
                  ]);

                  if (esHotelResponse.error) {
                    console.error("❌ Error inserting Spanish hotel:", {
                      error: esHotelResponse.error,
                      details: esHotelResponse.error.details,
                      message: esHotelResponse.error.message,
                    });
                    throw new Error(
                      `Spanish hotel error: ${esHotelResponse.error.message}`
                    );
                  }

                  if (plHotelResponse.error) {
                    console.error("❌ Error inserting Polish hotel:", {
                      error: plHotelResponse.error,
                      details: plHotelResponse.error.details,
                      message: plHotelResponse.error.message,
                    });
                    throw new Error(
                      `Polish hotel error: ${plHotelResponse.error.message}`
                    );
                  }
                })
              );
            }
          })
        );
        console.log("✅ All accommodation plans processed successfully");
      } catch (error) {
        console.error(
          "❌ Accommodation plans translation insertion error:",
          error
        );
        throw error;
      }

      // Translate and insert inclusions
      console.log("🎒 Starting inclusions processing...");
      try {
        if (packageDetails.inclusions.length > 0) {
          input = packageDetails.inclusions.map((inc) => ({ text: inc }));
          result = await translateToESandPL(input);

          const es_inclusions = result.map(
            (item: any) => item.translations[0].text
          );
          const pl_inclusions = result.map(
            (item: any) => item.translations[1].text
          );

          const inclusionPromises = packageDetails.inclusions.map(
            async (_inc, index) => {
              const [esResponse, plResponse] = await Promise.all([
                supabase.from("inclusions_es").upsert({
                  package_id: packageId,
                  description: es_inclusions[index],
                }),
                supabase.from("inclusions_pl").upsert({
                  package_id: packageId,
                  description: pl_inclusions[index],
                }),
              ]);

              if (esResponse.error) {
                console.error("❌ Error inserting Spanish inclusion:", {
                  error: esResponse.error,
                  details: esResponse.error.details,
                  message: esResponse.error.message,
                });
                throw new Error(
                  `Spanish inclusion error: ${esResponse.error.message}`
                );
              }

              if (plResponse.error) {
                console.error("❌ Error inserting Polish inclusion:", {
                  error: plResponse.error,
                  details: plResponse.error.details,
                  message: plResponse.error.message,
                });
                throw new Error(
                  `Polish inclusion error: ${plResponse.error.message}`
                );
              }
            }
          );

          await Promise.all(inclusionPromises);
          console.log("✅ All inclusions processed successfully");
        }
      } catch (error) {
        console.error("❌ Inclusions translation insertion error:", error);
        throw error;
      }

      // Translate and insert exclusions
      console.log("🚫 Starting exclusions processing...");
      try {
        if (packageDetails.exclusions.length > 0) {
          input = packageDetails.exclusions.map((exc) => ({ text: exc }));
          result = await translateToESandPL(input);

          const es_exclusions = result.map(
            (item: any) => item.translations[0].text
          );
          const pl_exclusions = result.map(
            (item: any) => item.translations[1].text
          );

          const exclusionPromises = packageDetails.exclusions.map(
            async (_exc, index) => {
              const [esResponse, plResponse] = await Promise.all([
                supabase.from("exclusions_es").upsert({
                  package_id: packageId,
                  description: es_exclusions[index],
                }),
                supabase.from("exclusions_pl").upsert({
                  package_id: packageId,
                  description: pl_exclusions[index],
                }),
              ]);

              if (esResponse.error) {
                console.error("❌ Error inserting Spanish exclusion:", {
                  error: esResponse.error,
                  details: esResponse.error.details,
                  message: esResponse.error.message,
                });
                throw new Error(
                  `Spanish exclusion error: ${esResponse.error.message}`
                );
              }

              if (plResponse.error) {
                console.error("❌ Error inserting Polish exclusion:", {
                  error: plResponse.error,
                  details: plResponse.error.details,
                  message: plResponse.error.message,
                });
                throw new Error(
                  `Polish exclusion error: ${plResponse.error.message}`
                );
              }
            }
          );

          await Promise.all(exclusionPromises);
          console.log("✅ All exclusions processed successfully");
        }
      } catch (error) {
        console.error("❌ Exclusions translation insertion error:", error);
        throw error;
      }

      // Reset form after successful submission
      setPackageDetails({
        packageName: "",
        availability: "",
        days: 1,
        nights: 0,
        countries: [],
        cities: [],
        tourType: "",
        package_type: "",
        images: [],
        itinerary: [
          {
            day: 1,
            title: "",
            activities: "",
            meals: [],
            accommodation: "",
            optional_tour_name: "",
            optional_tour_price: 0,
            optional_tour_description: "",
          },
        ],
        accommodationPlans: [
          {
            name: "",
            price_per_person_single_room: 0,
            price_per_person_double_room: 0,
            price_per_person_single_room_winter: 0,
            price_per_person_double_room_winter: 0,
            hotels: [{ name: "", stars: 0, location: "", options: [""] }],
          },
        ],
        inclusions: [""],
        exclusions: [""],
      });
      console.log("Package created successfully");
      console.log(packageDetails);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in handleSubmit:", error.message);
      } else {
        console.error("Error in handleSubmit:", error);
      }
    }

    // Refresh the data
    await fetchPackageDetails(selectedPackage);
  };

  const addHotel = (planIndex: number) => {
    const newAccommodationPlans = [...packageDetails.accommodationPlans];
    const newHotel = {
      name: "",
      stars: 0,
      location: "",
      options: [""],
    };

    if (!newAccommodationPlans[planIndex].hotels) {
      newAccommodationPlans[planIndex].hotels = [];
    }

    newAccommodationPlans[planIndex].hotels.push(newHotel);
    setPackageDetails({
      ...packageDetails,
      accommodationPlans: newAccommodationPlans,
    });
  };
  const handleDeletePackage = async (id: string) => {
    try {
      console.log(`Deleting Nile Cruise with ID: ${id}`);
      console.log(`Deleting Nile Cruise with ID: ${selectedPackage}`);

      // Delete from nile_cruises_es
      const { data, error: errorES } = await supabase
        .from("packages_es")
        .delete()
        .eq("id", id);

      console.log({ esRes: data });

      if (errorES) {
        console.error("Error deleting from packages_es:", errorES);
        return;
      }
      console.log("Successfully deleted from packages_es");

      // Delete from packages_pl
      const { data: dataPL, error: errorPL } = await supabase
        .from("packages_pl")
        .delete()
        .eq("id", id);

      console.log({ plRes: dataPL });
      if (errorPL) {
        console.error("Error deleting from packages_pl:", errorPL);
        return;
      }
      console.log("Successfully deleted from packages_pl");

      // Delete from packages
      const { data: dataEN, error: errorEN } = await supabase
        .from("packages")
        .delete()
        .eq("id", id);

      console.log({ enRes: dataEN });
      if (errorEN) {
        console.error("Error deleting from nile_cruises:", errorEN);
        return;
      }
      console.log("Successfully deleted from nile_cruises");
    } catch (err) {
      console.error("Unexpected error during deletion:", err);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex flex-col items-center justify-center p-9 w-full max-w-[60rem] mx-auto"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Typography
        variant="h4"
        color="blue-gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Update Package
      </Typography>
      <Typography
        color="gray"
        className="mt-1 font-normal"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Select a package to update its details.
      </Typography>

      <Select
        label="Select Package"
        variant="static"
        onChange={(e) => handlePackageSelect(e as unknown as string)}
        className="w-full pt-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {packages.map((pkg) => (
          <Option key={pkg.id} value={pkg.id.toString()}>
            {pkg.package_name}
          </Option>
        ))}
      </Select>

      {selectedPackage && (
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Package Name"
              name="packageName"
              value={
                packageDetails.packageName
                  ? packageDetails.packageName
                  : "there is no package name"
              }
              onChange={(e) =>
                handleInputChange(e, undefined, undefined, undefined)
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              required
            />
            <Input
              size="lg"
              label="Availability"
              name="availability"
              value={
                packageDetails.availability
                  ? packageDetails.availability
                  : "there is no availability"
              }
              onChange={(e) =>
                handleInputChange(e, undefined, undefined, undefined)
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              required
            />
            <Input
              size="lg"
              label="Days"
              name="days"
              value={
                packageDetails.days ? packageDetails.days : "there is no days"
              }
              onChange={(e) =>
                handleInputChange(e, undefined, undefined, undefined)
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              type="number"
            />
            <Input
              size="lg"
              label="Nights"
              name="nights"
              value={
                packageDetails.nights
                  ? packageDetails.nights
                  : "there is no nights"
              }
              onChange={(e) =>
                handleInputChange(e, undefined, undefined, undefined)
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              type="number"
            />
            <Input
              size="lg"
              label="Tour Type"
              name="tourType"
              value={
                packageDetails.tourType
                  ? packageDetails.tourType
                  : "there is no tour type"
              }
              onChange={(e) =>
                handleInputChange(e, undefined, undefined, undefined)
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {/* <Input
              size="lg"
              label="Package Type"
              name="package_type"
              value={
                packageDetails.package_type
                  ? packageDetails.package_type
                  : "there is no package type"
              }
              onChange={(e) =>
                handleInputChange(e, undefined, undefined, undefined)
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            /> */}
            <Select
              label="Package Type"
              name="package_type"
              value={packageDetails.package_type}
              onChange={(
                value = packageDetails.package_type
                  ? packageDetails.package_type
                  : ""
              ) => {
                handleInputChange(value, undefined, "package_type", undefined);
              }}
              className="p-2 border rounded-lg"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              <Option value="">
                Select Package Type (Relaxation, Best Selling Product)
              </Option>
              <Option value="Relaxation">Relaxation</Option>
              <Option value="Best Selling Product">Best Selling Product</Option>
            </Select>
            {/* <Input
              size="lg"
              label="Country"
              name="country"
              value={packageDetails.country ? packageDetails.country : ""}
              onChange={(e) =>
                handleInputChange(e, undefined, undefined, undefined)
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            /> */}
            {/* <div className="mb-4">
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Countries
              </Typography>
              {["Egypt", "Jordan", "Dubai", "Morocco"].map((country) => (
                <Checkbox
                  key={country}
                  label={country}
                  checked={packageDetails.countries.includes(country)}
                  onChange={(e) => {
                    const updatedCountries = e.target.checked
                      ? [...packageDetails.countries, country]
                      : packageDetails.countries.filter((c) => c !== country);
                    setPackageDetails({
                      ...packageDetails,
                      countries: updatedCountries,
                    });
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  className="mb-2 p-2 border rounded-lg"
                />
              ))}
            </div> */}
            <CountrySelector
              packageDetails={packageDetails}
              setPackageDetails={setPackageDetails}
            />
          </div>

          {/* Cities */}
          <div>
            {packageDetails.cities && packageDetails.cities.length > 0 && (
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Cities
              </Typography>
            )}

            {packageDetails.cities?.map((image, index) => (
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  key={index}
                  size="lg"
                  label={`City ${index + 1}`}
                  value={image ? image : ""}
                  onChange={(e) =>
                    handleInputChange(e, index, "cities", undefined)
                  }
                  className="mb-2"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            ))}
            {/* add and remove city */}
            <Button
              onClick={() =>
                setPackageDetails({
                  ...packageDetails,
                  cities: [...packageDetails.cities, ""],
                })
              }
              className="mt-2 bg-black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add City
            </Button>
            <Button
              onClick={() => {
                const newCities = [...packageDetails.cities];
                newCities.pop();
                setPackageDetails({ ...packageDetails, cities: newCities });
              }}
              className="mt-2 bg-red-500"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Remove City
            </Button>
          </div>
          {/* Images */}

          {packageDetails.images && packageDetails.images.length > 0 && (
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Images
            </Typography>
          )}

          {packageDetails.images?.map((image, index) => (
            <div className="mb-4 flex flex-col gap-6">
              <Input
                key={index}
                size="lg"
                label={`Image ${index + 1}`}
                value={image ? image : ""}
                onChange={(e) =>
                  handleInputChange(e, index, "images", undefined)
                }
                className="mb-2 "
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          ))}
          {/* add and remove image */}
          <Button
            onClick={() =>
              packageDetails.images
                ? setPackageDetails({
                    ...packageDetails,
                    images: [...packageDetails.images, ""],
                  })
                : setPackageDetails({
                    ...packageDetails,
                    images: [""],
                  })
            }
            className="mt-2 bg-black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add Image
          </Button>
          <Button
            onClick={() => {
              const newImages = [...packageDetails.images];
              newImages.pop();
              setPackageDetails({ ...packageDetails, images: newImages });
            }}
            className="mt-2 bg-red-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Remove Image
          </Button>

          {/* Itinerary */}
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Itinerary
          </Typography>
          {packageDetails.itinerary?.map((day, index) => (
            <div key={index} className="mb-4 flex flex-col gap-6">
              <Typography
                variant="h6"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Day {day.day}
              </Typography>
              <Input
                size="lg"
                label="Title"
                name="title"
                value={day.title ? day.title : "there is no title"}
                onChange={(e) =>
                  handleInputChange(e, index, "itinerary", undefined)
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Activities"
                name="activities"
                value={
                  day.activities ? day.activities : "there is no activities"
                }
                onChange={(e) =>
                  handleInputChange(e, index, "itinerary", undefined)
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Accommodation"
                name="accommodation"
                value={
                  day.accommodation
                    ? day.accommodation
                    : "there is no accommodation"
                }
                onChange={(e) =>
                  handleInputChange(e, index, "itinerary", undefined)
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />

              {/* edit optional tour */}
              <Input
                size="lg"
                label="Optional Tour Name"
                name="optional_tour_name"
                value={day.optional_tour_name ? day.optional_tour_name : ""}
                onChange={(e) =>
                  handleInputChange(e, index, "itinerary", undefined)
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Optional Tour Price"
                name="optional_tour_price"
                value={
                  day.optional_tour_price != 0 ? day.optional_tour_price : ""
                }
                onChange={(e) =>
                  handleInputChange(e, index, "itinerary", undefined)
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Optional Tour Description"
                name="optional_tour_description"
                value={day.optional_tour_description}
                onChange={(e) =>
                  handleInputChange(e, index, "itinerary", undefined)
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              {/* edit meals */}
              {day.meals?.map((meal, mealIndex) => (
                <Input
                  key={mealIndex}
                  size="lg"
                  label={`Meal ${mealIndex + 1}`}
                  value={meal}
                  onChange={(e) =>
                    handleInputChange(e, index, "meals", mealIndex)
                  }
                  className="mb-2"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              ))}
              <Button
                onClick={() => {
                  const newItinerary = [...packageDetails.itinerary];
                  newItinerary[index].meals.push("");
                  setPackageDetails({
                    ...packageDetails,
                    itinerary: newItinerary,
                  });
                }}
                className="mt-2 bg-black"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Add Meal
              </Button>
              {/* remove meals */}
              <Button
                onClick={() => {
                  const newItinerary = [...packageDetails.itinerary];
                  newItinerary[index].meals.pop();
                  setPackageDetails({
                    ...packageDetails,
                    itinerary: newItinerary,
                  });
                }}
                className="mt-2 bg-red-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Remove Meal
              </Button>
            </div>
          ))}
          {/* add itinerary */}
          <Button
            color="blue"
            className="mt-2"
            onClick={() =>
              setPackageDetails({
                ...packageDetails,
                itinerary: [
                  ...packageDetails.itinerary,
                  {
                    day: packageDetails.itinerary.length + 1,
                    title: "",
                    meals: [],
                    activities: "",
                    accommodation: "",
                    optional_tour_name: "",
                    optional_tour_price: 0,
                    optional_tour_description: "",
                  },
                ],
              })
            }
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add Day
          </Button>
          {/* remove day */}
          <Button
            onClick={() => {
              const newItinerary = [...packageDetails.itinerary];
              newItinerary.pop();
              setPackageDetails({ ...packageDetails, itinerary: newItinerary });
            }}
            className="mt-2 bg-red-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Remove Day
          </Button>
          {/* Accommodation Plans */}
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Accommodation Plans
          </Typography>
          {packageDetails.accommodationPlans?.map((plan, planIndex) => (
            <div key={planIndex} className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Plan Name"
                name="name"
                value={plan.name ? plan.name : "there is no plan name"}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    planIndex,
                    "accommodationPlans",
                    undefined
                  )
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Price per Person (Single Room - summer)"
                name="price_per_person_single_room"
                value={
                  plan.price_per_person_single_room
                    ? plan.price_per_person_single_room
                    : 0
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    planIndex,
                    "accommodationPlans",
                    undefined
                  )
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Price per Person (Double Room - summer)"
                name="price_per_person_double_room"
                value={
                  plan.price_per_person_double_room
                    ? plan.price_per_person_double_room
                    : 0
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    planIndex,
                    "accommodationPlans",
                    undefined
                  )
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Price per Person (Single Room - Winter)"
                name="price_per_person_single_room_winter"
                value={
                  plan.price_per_person_single_room_winter
                    ? plan.price_per_person_single_room_winter
                    : 0
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    planIndex,
                    "accommodationPlans",
                    undefined
                  )
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label="Price per Person (Double Room - Winter)"
                name="price_per_person_double_room_winter"
                value={
                  plan.price_per_person_double_room_winter
                    ? plan.price_per_person_double_room_winter
                    : 0
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    planIndex,
                    "accommodationPlans",
                    undefined
                  )
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              {plan.hotels.map((hotel, hotelIndex) => (
                <div key={hotelIndex} className="mb-4 flex flex-col gap-6">
                  <Input
                    size="lg"
                    label="Hotel Name"
                    value={hotel.name}
                    onChange={(e) =>
                      handleInputChange(e, planIndex, "hotelName", hotelIndex)
                    }
                    className="mb-2"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                  <Input
                    size="lg"
                    label="Hotel Stars"
                    value={hotel.stars}
                    type="number"
                    onChange={(e) =>
                      handleInputChange(e, planIndex, "hotelStars", hotelIndex)
                    }
                    className="mb-2"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                  <Input
                    size="lg"
                    label="Hotel Location"
                    value={hotel.location}
                    onChange={(e) =>
                      handleInputChange(e, planIndex, "hotels", hotelIndex)
                    }
                    className="mb-2"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                  <Input
                    size="lg"
                    label="Hotel Option"
                    value={hotel.options[0]}
                    onChange={(e) =>
                      handleInputChange(e, planIndex, "options", hotelIndex)
                    }
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                </div>
              ))}
              <Button
                onClick={() => addHotel(planIndex)}
                className="mt-2 bg-black"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Add Hotel
              </Button>
              {/* remove hotels */}
              <Button
                onClick={() => {
                  const newAccommodationPlans = [
                    ...packageDetails.accommodationPlans,
                  ];
                  newAccommodationPlans[planIndex].hotels.pop();
                  setPackageDetails({
                    ...packageDetails,
                    accommodationPlans: newAccommodationPlans,
                  });
                }}
                className="mt-2 bg-red-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Remove Hotel
              </Button>
            </div>
          ))}
          {/* add accommodation Plans */}
          <Button
            size="lg"
            color="blue"
            className="mb-4"
            onClick={() =>
              setPackageDetails({
                ...packageDetails,
                accommodationPlans: [
                  ...packageDetails.accommodationPlans,
                  {
                    name: "",
                    price_per_person_single_room: 0,
                    price_per_person_double_room: 0,
                    price_per_person_single_room_winter: 0,
                    price_per_person_double_room_winter: 0,
                    hotels: [],
                  },
                ],
              })
            }
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add Accommodation Plan
          </Button>

          {/* Inclusions */}
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Inclusions
          </Typography>
          {packageDetails.inclusions?.map((inclusion, index) => (
            <div key={index} className="mb-4 flex flex-col gap-6">
              <Input
                key={index}
                size="lg"
                label={`Inclusion ${index + 1}`}
                value={inclusion}
                onChange={(e) =>
                  handleInputChange(e, index, "inclusions", undefined)
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          ))}

          {/* Exclusions */}
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Exclusions
          </Typography>
          {packageDetails.exclusions?.map((exclusion, index) => (
            <div key={index} className="mb-4 flex flex-col gap-6">
              <Input
                key={index}
                size="lg"
                label={`Exclusion ${index + 1}`}
                value={exclusion}
                onChange={(e) =>
                  handleInputChange(e, index, "exclusions", undefined)
                }
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          ))}

          <Button
            type="submit"
            className="mt-6 bg-blue-500"
            fullWidth
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Update Package
          </Button>
          <Button
            color="red"
            size="lg"
            className="w-full mt-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
            onClick={() => handleDeletePackage(selectedPackage)}
          >
            Delete Package
          </Button>
        </form>
      )}
    </Card>
  );
}
