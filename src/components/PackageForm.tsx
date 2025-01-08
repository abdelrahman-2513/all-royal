import React, { useState } from "react";
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
    const validInput = input.filter(
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

export function PackageCreationForm() {
  const [packageDetails, setPackageDetails] = useState<{
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
  }>({
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
        hotels: [{ name: "", location: "", stars: 0, options: [""] }],
      },
    ],
    inclusions: [""],
    exclusions: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    index: number | undefined,
    field: string | undefined,
    subIndex?: number
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
    // const { name, value } = e.target;
    if (index !== undefined) {
      if (field === "hotelName" && subIndex !== undefined) {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].hotels[subIndex as number].name = value;
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "hotelStars" && subIndex !== undefined) {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].hotels[subIndex as number].stars =
          parseInt(value);
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
      } else if (field === "hotels" && subIndex !== undefined) {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].hotels[subIndex as number].location =
          value;
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "name") {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].name = value;
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_single_room") {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].price_per_person_single_room =
          parseInt(value);
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_double_room") {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].price_per_person_double_room =
          parseInt(value);
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_single_room_winter") {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].price_per_person_single_room_winter =
          parseInt(value);
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_double_room_winter") {
        const newAccommodationPlans = [...packageDetails.accommodationPlans];
        newAccommodationPlans[index].price_per_person_double_room_winter =
          parseInt(value);
        setPackageDetails({
          ...packageDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "images") {
        const newArray = [...packageDetails.images];
        newArray[index] = value;
        setPackageDetails({ ...packageDetails, [field]: newArray });
      } else if (field === "meals") {
        const newItinerary = [...packageDetails.itinerary];
        newItinerary[index].meals[subIndex as number] = value;
        setPackageDetails({ ...packageDetails, itinerary: newItinerary });
      } else if (field === "inclusions" || field === "exclusions") {
        const newArray = [...packageDetails[field]];
        newArray[index] = value;
        setPackageDetails({ ...packageDetails, [field]: newArray });
      } else if (field === "cities") {
        console.log("cities", value);
        const newArray = [...packageDetails.cities];
        newArray[index] = value;
        setPackageDetails({ ...packageDetails, [field]: newArray });
      } else {
        const newItinerary = [...packageDetails.itinerary];
        newItinerary[index][field as keyof ItineraryDay] = value as never;
        setPackageDetails({ ...packageDetails, itinerary: newItinerary });
      }
    } else {
      console.log(name, value);
      setPackageDetails({ ...packageDetails, [name]: value });
    }
  };
  const addCity = () => {
    setPackageDetails({
      ...packageDetails,
      cities: [...packageDetails.cities, ""],
    });
  };
  const addImage = () => {
    setPackageDetails({
      ...packageDetails,
      images: [...packageDetails.images, ""],
    });
  };
  const addDay = () => {
    setPackageDetails({
      ...packageDetails,
      itinerary: [
        ...packageDetails.itinerary,
        {
          day: packageDetails.itinerary.length + 1,
          title: "",
          activities: "",
          meals: [],
          accommodation: "",
          optional_tour_name: "",
          optional_tour_price: 0,
          optional_tour_description: "",
        },
      ],
    });
  };

  const addAccommodationPlan = () => {
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
          hotels: [{ name: "", stars: 0, location: "", options: [""] }],
        },
      ],
    });
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

  const addInclusion = () => {
    setPackageDetails({
      ...packageDetails,
      inclusions: [...packageDetails.inclusions, ""],
    });
  };

  const addExclusion = () => {
    setPackageDetails({
      ...packageDetails,
      exclusions: [...packageDetails.exclusions, ""],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(packageDetails);

    try {
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

      const { data: package_id, error } = await supabase
        .from("packages")
        .insert([
          {
            package_name: packageDetails.packageName,
            availability: packageDetails.availability,
            days: packageDetails.days,
            nights: packageDetails.nights,
            countries: packageDetails.countries,
            cities: packageDetails.cities,
            tour_type: packageDetails.tourType,
            package_type: packageDetails.package_type,
            images: packageDetails.images,
          },
        ])
        .select("id");

      if (error || !package_id) {
        console.error("❌ Package creation failed:", error);
        throw new Error(`Error creating package: ${error.message}`);
      }

      const packageId = package_id[0].id;
      console.log("✅ Package created successfully with ID:", packageId);

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
              `🗓️ Processing day ${day.day} (${index + 1}/${
                packageDetails.itinerary.length
              })`
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
              `🏢 Processing plan ${planIndex + 1}/${
                packageDetails.accommodationPlans.length
              }`
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
                `❌ Error inserting Spanish accommodation plan ${
                  planIndex + 1
                }:`,
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
                `❌ Error inserting Polish accommodation plan ${
                  planIndex + 1
                }:`,
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
      // store the inclusions and exclusions
      console.log(packageDetails.inclusions);
      packageDetails.inclusions.map(async (_inc, index) => {
        console.log(packageDetails.inclusions[index]);
        const { data: inclusion_id, error } = await supabase
          .from("inclusions")
          .insert({
            package_id: packageId,
            description: packageDetails.inclusions[index],
            nile_cruise_id: null,
          })
          .select("id");

        if (inclusion_id) {
          console.log("Inclusion ID:", inclusion_id[0].id);
        }
        console.log("errrrrrr", error);
        if (error) {
          console.error("❌ Error inserting inclusion:", {
            error: error,
            details: error.details,
            message: error.message,
          });
        }
      });
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
      console.log(packageDetails.exclusions);
      packageDetails.exclusions.map(async (_inc, index) => {
        await Promise.all([
          supabase.from("exclusions").upsert({
            package_id: packageId,
            description: packageDetails.exclusions[index],
            nile_cruise_id: null,
          }),
        ]);
      });
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
        Create New Package
      </Typography>
      <Typography
        color="gray"
        className="mt-1 font-normal"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Enter the details for the new travel package.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Package Name"
            name="packageName"
            value={packageDetails.packageName}
            onChange={(e) => handleInputChange(e, undefined, "packageName")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
          />
          <Input
            size="lg"
            label="Availability"
            name="availability"
            value={packageDetails.availability}
            onChange={(e) => handleInputChange(e, undefined, "availability")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
          />
          <Input
            size="lg"
            label="Days"
            name="days"
            value={packageDetails.days}
            onChange={(e) => handleInputChange(e, undefined, "days")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
            type="number"
          />
          <Input
            size="lg"
            label="Nights"
            name="nights"
            value={packageDetails.nights}
            onChange={(e) => handleInputChange(e, undefined, "nights")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
            type="number"
          />
          <Input
            size="lg"
            label="Tour Type"
            name="tourType"
            value={packageDetails.tourType}
            onChange={(e) => handleInputChange(e, undefined, "tourType")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
          />
          {/* <Input
            size="lg"
            label="Package Type"
            name="package_type"
            value={packageDetails.package_type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e, undefined, "package_type")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          /> */}
          <Select
            label="Package Type"
            name="package_type"
            value={packageDetails.package_type}
            onChange={(value = "") =>
              handleInputChange(value, undefined, "package_type")
            }
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
            {["Egypt", "Jordan", "Dubai", "Saudi Arabia"].map((country) => (
              <Checkbox
                key={country}
                label={country}
                checked={packageDetails.countries.includes(country)}
                onChange={(e) => {
                  console.log(country);
                  console.log(packageDetails.countries);
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
        {packageDetails.cities.map((city, index) => (
          <Input
            key={index}
            size="lg"
            label={`City ${index + 1}`}
            value={city}
            onChange={(e) => handleInputChange(e, index, "cities")}
            className="mb-2"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
          />
        ))}
        <Button
          onClick={addCity}
          className="mt-2 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add City
        </Button>
        {/* remove image */}
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
        <Typography
          variant="h6"
          color="blue-gray"
          className="my-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Images
        </Typography>
        {packageDetails.images.map((image, index) => (
          <Input
            key={index}
            size="lg"
            label={`Image ${index + 1}`}
            value={image}
            onChange={(e) => handleInputChange(e, index, "images")}
            className="mb-2"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
          />
        ))}
        <Button
          onClick={addImage}
          className="mt-2 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Image
        </Button>
        {/* remove image */}
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
        <Typography
          variant="h6"
          color="blue-gray"
          className="my-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Itinerary
        </Typography>
        {packageDetails.itinerary.map((day, index) => (
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
              value={day.title}
              onChange={(e) => handleInputChange(e, index, "title")}
              className="mb-4"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Activities"
              value={day.activities}
              onChange={(e) => handleInputChange(e, index, "activities")}
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Accommodation"
              value={day.accommodation}
              onChange={(e) => handleInputChange(e, index, "accommodation")}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Optional Tour Name"
              value={day.optional_tour_name}
              onChange={(e) =>
                handleInputChange(e, index, "optional_tour_name")
              }
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Optional Tour Price"
              value={day.optional_tour_price}
              onChange={(e) =>
                handleInputChange(e, index, "optional_tour_price")
              }
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Optional Tour Description"
              value={day.optional_tour_description}
              onChange={(e) =>
                handleInputChange(e, index, "optional_tour_description")
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />

            <div className="mb-4 flex flex-col gap-6">
              {day.meals.map((meal, mealIndex) => (
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
            </div>
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
        <Button
          onClick={addDay}
          className="mt-2 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Day
        </Button>
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
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Accommodation Plans
        </Typography>
        {packageDetails.accommodationPlans.map((plan, planIndex) => (
          <div key={planIndex} className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Plan Name"
              value={plan.name}
              onChange={(e) => handleInputChange(e, planIndex, "name")}
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Price per Person single room summer"
              value={plan.price_per_person_single_room}
              onChange={(e) =>
                handleInputChange(e, planIndex, "price_per_person_single_room")
              }
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Price per Person double room summer"
              value={plan.price_per_person_double_room}
              onChange={(e) =>
                handleInputChange(e, planIndex, "price_per_person_double_room")
              }
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Price per Person single room winter"
              value={plan.price_per_person_single_room_winter}
              onChange={(e) =>
                handleInputChange(
                  e,
                  planIndex,
                  "price_per_person_single_room_winter"
                )
              }
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Price per Person double room winter"
              value={plan.price_per_person_double_room_winter}
              onChange={(e) =>
                handleInputChange(
                  e,
                  planIndex,
                  "price_per_person_double_room_winter"
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
                  onChange={(e) =>
                    handleInputChange(e, planIndex, "hotelStars", hotelIndex)
                  }
                  className="mb-2"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  type="number"
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
        <Button
          onClick={addAccommodationPlan}
          className="mt-2 mb-4 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Accommodation Plan
        </Button>
        {/* remove accommodation plan */}
        <Button
          onClick={() => {
            const newAccommodationPlans = [
              ...packageDetails.accommodationPlans,
            ];
            newAccommodationPlans.pop();
            setPackageDetails({
              ...packageDetails,
              accommodationPlans: newAccommodationPlans,
            });
          }}
          className="mt-2 mb-4 bg-red-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Remove Accommodation Plan
        </Button>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Inclusions
        </Typography>
        <div className="mb-4 flex flex-col gap-6">
          {packageDetails.inclusions.map((inclusion, index) => (
            <Input
              key={index}
              size="lg"
              label={`Inclusion ${index + 1}`}
              value={inclusion}
              onChange={(e) => handleInputChange(e, index, "inclusions")}
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ))}
        </div>
        <Button
          onClick={addInclusion}
          className="mt-2 mb-4 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Inclusion
        </Button>
        {/* remove inclusion */}
        <Button
          onClick={() => {
            const newInclusions = [...packageDetails.inclusions];
            newInclusions.pop();
            setPackageDetails({ ...packageDetails, inclusions: newInclusions });
          }}
          className="mt-2 mb-4 bg-red-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Remove Inclusion
        </Button>

        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Exclusions
        </Typography>
        <div className="mb-4 flex flex-col gap-6">
          {packageDetails.exclusions.map((exclusion, index) => (
            <Input
              key={index}
              size="lg"
              label={`Exclusion ${index + 1}`}
              value={exclusion}
              onChange={(e) => handleInputChange(e, index, "exclusions")}
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ))}
        </div>
        <Button
          onClick={addExclusion}
          className="mt-2 mb-4 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Exclusion
        </Button>
        {/* remove exclusion */}
        <Button
          onClick={() => {
            const newExclusions = [...packageDetails.exclusions];
            newExclusions.pop();
            setPackageDetails({ ...packageDetails, exclusions: newExclusions });
          }}
          className="mt-2 mb-4 bg-red-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Remove Exclusion
        </Button>

        <Button
          type="submit"
          className="mt-6 bg-black"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create Package
        </Button>
      </form>
    </Card>
  );
}
