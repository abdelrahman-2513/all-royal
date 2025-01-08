import React, { useState, useEffect } from "react";
import { supabase } from "@/api/supabase";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";

export function NileCruiseUpdateForm() {
  const [nileCruises, setNileCruises] = useState<
    { id: number; NileCruisesName: string }[]
  >([]);
  const [selectedNileCruise, setSelectedNileCruise] = useState<string | null>(
    null
  );
  const [nileCruiseDetails, setNileCruiseDetails] = useState<{
    id: number;
    NileCruisesName: string;
    availability: string;
    // duration: string;
    days: number;
    nights: number;
    days2: number;
    nights2: number;
    country: string;
    cities: string[];
    tourType: string;
    images: string[];
    itinerary: {
      id: number;
      day: number;
      title: string;
      activities: string;
      meals: string[];
      accommodation: string;
      optional_tour_name: string;
      optional_tour_price: number;
      optional_tour_description: string;
      package_id: number;
      nile_cruise_id: number;
    }[];
    itinerary2: {
      id: number;
      day: number;
      title: string;
      activities: string;
      meals: string[];
      accommodation: string;
      optional_tour_name: string;
      optional_tour_price: number;
      optional_tour_description: string;
      nile_cruise_id: number;
    }[];
    accommodationPlans: {
      id: number;
      name: string;
      price_per_person_single_room: number;
      price_per_person_double_room: number;
      price_per_person_single_room_winter: number;
      price_per_person_double_room_winter: number;
    }[];
    inclusions: {
      id: number;
      description: string;
      package_id: number;
      nile_cruise_id: number;
    }[];

    exclusions: {
      id: number;
      description: string;
      package_id: number;
      nile_cruise_id: number;
    }[];
  }>({
    id: 0,
    NileCruisesName: "",
    availability: "",
    // duration: "",
    days: 1,
    nights: 0,
    days2: 1,
    nights2: 0,
    country: "Egypt",
    cities: [],
    tourType: "",
    images: [],
    itinerary: [],
    itinerary2: [],
    accommodationPlans: [],
    inclusions: [
      {
        id: 0,
        description: "",
        package_id: 0,
        nile_cruise_id: 0,
      },
    ],

    exclusions: [
      {
        id: 0,
        description: "",
        package_id: 0,
        nile_cruise_id: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchAllSelectedCruiseData = async () => {
      const { data, error } = await supabase
        .from("nile_cruises")
        .select("*")
        .eq("id", selectedNileCruise);
      if (error) {
        console.error("Error fetching Nile Cruises:", error);
      } else {
        console.log(data);
        if (data && data.length > 0) {
          const {
            NileCruisesName,
            availability,
            days,
            nights,
            days2,
            nights2,
            country,
            cities,
            tourType,
            images,
          } = data[0];
          setNileCruiseDetails((prevDetails) => ({
            ...prevDetails,
            NileCruisesName,
            availability,
            // duration,
            days,
            nights,
            days2,
            nights2,
            country,
            cities,
            tourType,
            images,
          }));
        }
      }
    };
    fetchAllSelectedCruiseData();
  }, [setSelectedNileCruise, selectedNileCruise]);

  useEffect(() => {
    fetchNileCruises();
  }, []);

  const fetchNileCruises = async () => {
    console.log("Fetching Nile Cruises...");
    const { data, error } = await supabase
      .from("nile_cruises")
      .select("id, NileCruisesName");
    console.log(data);
    if (error) console.error("Error fetching Nile Cruises:", error);
    else setNileCruises(data);
  };

  const fetchNileCruiseDetails = async (nileCruiseId: any) => {
    const { data, error } = await supabase
      .from("nile_cruises")
      .select(
        `
        *,
        itinerary (*),
        itinerary2 (*),
        accommodation_plans (*),
        inclusions (*),
       
        exclusions (*)
       
      `
      )
      .eq("id", nileCruiseId)
      .single();

    console.log({ data });
    if (data) {
      data.itinerary = data.itinerary.sort(
        (a: { day: number }, b: { day: number }) => a.day - b.day
      );
      data.itinerary2 = data.itinerary2.sort(
        (a: { day: number }, b: { day: number }) => a.day - b.day
      );
    }
    if (error) console.error("Error fetching Nile Cruise details:", error);
    else {
      console.log({ data });
      setNileCruiseDetails({
        id: data.id,
        NileCruisesName: data.NileCruisesName,
        availability: data.availability,
        days: data.days,
        nights: data.nights,
        days2: data.days2,
        nights2: data.nights2,
        country: data.country,
        cities: data.cities,
        tourType: data.tourType,
        images: data.images,
        itinerary: data.itinerary,
        itinerary2: data.itinerary2,
        accommodationPlans: data.accommodation_plans,

        inclusions: data.inclusions,

        exclusions: data.exclusions,
      });
      console.log(data);
    }
  };

  const handleNileCruiseSelect = (nileCruiseId: string | undefined) => {
    if (nileCruiseId) {
      setSelectedNileCruise(nileCruiseId);
      fetchNileCruiseDetails(nileCruiseId);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number | undefined,
    field: string | undefined
  ) => {
    const { name, value } = e.target;

    console.log(field);
    console.log(name, value);

    if (index !== undefined && field) {
      if (field === "itinerary") {
        const newItinerary = [...nileCruiseDetails.itinerary];
        // Handle meals separately as it's an array
        if (name === "meals") {
          newItinerary[index].meals = value
            .split(",")
            .map((meal) => meal.trim());
        } else {
          // Handle other itinerary fields
          newItinerary[index] = {
            ...newItinerary[index],
            [name]: name === "optional_tour_price" ? Number(value) : value,
          };
        }
        setNileCruiseDetails({
          ...nileCruiseDetails,
          itinerary: newItinerary,
        });
      } else if (field === "itinerary2") {
        const newItinerary2 = [...nileCruiseDetails.itinerary2];
        // Handle meals separately as it's an array
        if (name === "meals") {
          newItinerary2[index].meals = value
            .split(",")
            .map((meal) => meal.trim());
        } else {
          // Handle other itinerary2 fields
          newItinerary2[index] = {
            ...newItinerary2[index],
            [name]:
              name === "optional_tour_priceItinerary2" ? Number(value) : value,
          };
        }
        setNileCruiseDetails({
          ...nileCruiseDetails,
          itinerary2: newItinerary2,
        });
      } else if (field === "accommodationPlans") {
        const newAccommodationPlans = [...nileCruiseDetails.accommodationPlans];
        newAccommodationPlans[index] = {
          ...newAccommodationPlans[index],
          [name]: [
            "price_per_person_single_room",
            "price_per_person_double_room",
            "price_per_person_single_room_winter",
            "price_per_person_double_room_winter",
          ].includes(name)
            ? Number(value)
            : value,
        };
        setNileCruiseDetails({
          ...nileCruiseDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "inclusions") {
        const newInclusions = [...nileCruiseDetails.inclusions];
        newInclusions[index] = {
          ...newInclusions[index],
          [name]: true ? value : value,
        };
        setNileCruiseDetails({
          ...nileCruiseDetails,
          inclusions: newInclusions,
        });
      } else if (field === "exclusions") {
        const newExclusions = [...nileCruiseDetails.exclusions];
        newExclusions[index] = {
          ...newExclusions[index],
          [name]: true ? value : value,
        };
        setNileCruiseDetails({
          ...nileCruiseDetails,
          exclusions: newExclusions,
        });
      } else if (field === "cities" || field === "images") {
        const newArray = [...nileCruiseDetails[field]];
        newArray[index] = value;
        setNileCruiseDetails({
          ...nileCruiseDetails,
          [field]: newArray,
        });
      }
    } else {
      // Handle top-level fields
      setNileCruiseDetails({
        ...nileCruiseDetails,
        [name]: ["days", "nights", "days2", "nights2"].includes(name)
          ? Number(value)
          : value,
      });
    }
  };

  const translateToESandPL = async (input: { text: string }[]) => {
    console.log(input);
    if (input?.length === 0) return [];
    const res = await fetch(
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
    const result = await res.json();
    return result;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    if (!window.confirm("Are you sure you want to update this Nile Cruise?"))
      return;

    e.preventDefault();
    if (!selectedNileCruise) return;

    const { error: mainError } = await supabase.from("nile_cruises").upsert(
      {
        id: nileCruiseDetails.id,
        NileCruisesName: nileCruiseDetails.NileCruisesName,
        availability: nileCruiseDetails.availability,
        days: nileCruiseDetails.days,
        nights: nileCruiseDetails.nights,
        days2: nileCruiseDetails.days2,
        nights2: nileCruiseDetails.nights2,
        tourType: nileCruiseDetails.tourType,
        images: nileCruiseDetails.images,
        country: nileCruiseDetails.country,
        cities: nileCruiseDetails.cities,
      },
      { onConflict: "id" }
    );
    // .eq("id", selectedNileCruise);

    if (mainError) {
      console.error("Error updating Nile Cruise:", mainError);
      return;
    }

    // Update itinerary
    for (const day of nileCruiseDetails.itinerary) {
      const { error: itineraryError } = await supabase
        .from("itinerary")
        .upsert(day, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itineraryError) {
        console.error("Error updating itinerary:", itineraryError);
        return;
      }
    }

    // Update itinerary2
    for (const day of nileCruiseDetails.itinerary2) {
      const { error: itinerary2Error } = await supabase
        .from("itinerary2")
        .upsert(day, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itinerary2Error) {
        console.error("Error updating itinerary2:", itinerary2Error);
        return;
      }
    }

    // Update accommodation plans
    for (const plan of nileCruiseDetails.accommodationPlans) {
      const { error: accommodationError } = await supabase
        .from("accommodation_plans")
        .upsert(plan, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("name", plan.name);

      if (accommodationError) {
        console.error(
          "Error updating accommodation plans:",
          accommodationError
        );
        return;
      }
    }

    // Update inclusions
    for (const inc of nileCruiseDetails.inclusions) {
      const { error: inclusionError } = await supabase
        .from("inclusions")
        .upsert(inc, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (inclusionError) {
        console.error("Error updating inclusions:", inclusionError);
        return;
      }
    }

    // Update exclusions
    for (const exc of nileCruiseDetails.exclusions) {
      const { error: exclusionsError } = await supabase
        .from("exclusions")
        .upsert(exc, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (exclusionsError) {
        console.error("Error updating exclusionss:", exclusionsError);
        return;
      }
    }

    // SPANISH 0 POLISH 1
    let input;

    input = [
      { text: nileCruiseDetails.NileCruisesName },
      { text: nileCruiseDetails.availability },
      { text: nileCruiseDetails.tourType },
      { text: nileCruiseDetails.country },
    ];
    const mainPLResult = await translateToESandPL(input);
    const mainES = mainPLResult?.map((item: any) => item.translations[0].text);
    const mainPL = mainPLResult?.map((item: any) => item.translations[1].text);

    input = nileCruiseDetails.cities?.map((city) => ({ text: city }));
    const citesPLResult = await translateToESandPL(input);
    const citiesES = citesPLResult?.map(
      (item: any) => item.translations[0].text
    );
    const citiesPL = citesPLResult?.map(
      (item: any) => item.translations[1].text
    );

    let itineraryES = [];
    let itineraryPL = [];
    for (const day of nileCruiseDetails.itinerary) {
      input = day.meals?.map((meal) => ({ text: meal }));
      const mealsResult = await translateToESandPL(input);
      const mealsES = mealsResult?.map(
        (item: any) => item.translations[0].text
      );
      const mealsPL = mealsResult?.map(
        (item: any) => item.translations[1].text
      );

      input = [
        { text: day.title },
        { text: day.activities },
        { text: day.accommodation },
        { text: day.optional_tour_name },
        { text: day.optional_tour_description },
      ];
      const dayPLResult = await translateToESandPL(input);
      const dayES = dayPLResult?.map((item: any) => item.translations[0].text);
      const dayPL = dayPLResult?.map((item: any) => item.translations[1].text);
      itineraryES.push({
        id: day.id,
        day: day.day,
        title: dayES[0],
        activities: dayES[1],
        meals: mealsES,
        accommodation: dayES[2],
        optional_tour_name: dayES[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayES[4],
        nile_cruise_id: nileCruiseDetails.id,
      });
      itineraryPL.push({
        id: day.id,
        day: day.day,
        title: dayPL[0],
        activities: dayPL[1],
        meals: mealsPL,
        accommodation: dayPL[2],
        optional_tour_name: dayPL[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayPL[4],
        nile_cruise_id: nileCruiseDetails.id,
      });
    }

    let itinerary2ES = [];
    let itinerary2PL = [];
    for (const day of nileCruiseDetails.itinerary2) {
      input = day.meals?.map((meal) => ({ text: meal }));
      const mealsResult = await translateToESandPL(input);
      const mealsES = mealsResult?.map(
        (item: any) => item.translations[0].text
      );
      const mealsPL = mealsResult?.map(
        (item: any) => item.translations[1].text
      );

      input = [
        { text: day.title },
        { text: day.activities },
        { text: day.accommodation },
        { text: day.optional_tour_name },
        { text: day.optional_tour_description },
      ];
      const dayPLResult = await translateToESandPL(input);
      const dayES = dayPLResult?.map((item: any) => item.translations[0].text);
      const dayPL = dayPLResult?.map((item: any) => item.translations[1].text);
      itinerary2ES.push({
        id: day.id,
        day: day.day,
        title: dayES[0],
        activities: dayES[1],
        meals: mealsES,
        accommodation: dayES[2],
        optional_tour_name: dayES[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayES[4],
        nile_cruise_id: nileCruiseDetails.id,
      });
      itinerary2PL.push({
        id: day.id,
        day: day.day,
        title: dayPL[0],
        activities: dayPL[1],
        meals: mealsPL,
        accommodation: dayPL[2],
        optional_tour_name: dayPL[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayPL[4],
        nile_cruise_id: nileCruiseDetails.id,
      });
    }

    let accommodationPlansES = [];
    let accommodationPlansPL = [];

    let names = nileCruiseDetails.accommodationPlans?.map((plan) => plan.name);
    input = names?.map((name) => ({ text: name }));
    const namesPLResult = await translateToESandPL(input);
    const namesES = namesPLResult?.map(
      (item: any) => item.translations[0].text
    );
    const namesPL = namesPLResult?.map(
      (item: any) => item.translations[1].text
    );
    let iter = 0;

    // Update accommodation plans
    for (const plan of nileCruiseDetails.accommodationPlans) {
      // input = [{ text: plan.name }];
      // const dayPLResult = await translateToESandPL(input);
      // const dayES = dayPLResult?.map((item: any) => item.translations[0].text);
      // const dayPL = dayPLResult?.map((item: any) => item.translations[1].text);
      accommodationPlansES.push({
        id: plan.id,
        name: namesES[iter],
        price_per_person_single_room: plan.price_per_person_single_room,
        price_per_person_double_room: plan.price_per_person_double_room,
        price_per_person_single_room_winter:
          plan.price_per_person_single_room_winter,
        price_per_person_double_room_winter:
          plan.price_per_person_double_room_winter,
        nile_cruise_id: nileCruiseDetails.id,
      });
      accommodationPlansPL.push({
        id: plan.id,
        name: namesPL[iter],
        price_per_person_single_room: plan.price_per_person_single_room,
        price_per_person_double_room: plan.price_per_person_double_room,
        price_per_person_single_room_winter:
          plan.price_per_person_single_room_winter,
        price_per_person_double_room_winter:
          plan.price_per_person_double_room_winter,
        nile_cruise_id: nileCruiseDetails.id,
      });
      iter++;
    }

    let inclusionsES = [];
    let inclusionsPL = [];

    let incDescInput = nileCruiseDetails.inclusions?.map(
      (inc) => inc.description
    );
    input = incDescInput?.map((name) => ({ text: name }));
    const incDescRes = await translateToESandPL(input);
    const incDescResES = incDescRes?.map(
      (item: any) => item.translations[0].text
    );
    const incDescResPL = incDescRes?.map(
      (item: any) => item.translations[1].text
    );
    iter = 0;

    // Update inclusions
    for (const inc of nileCruiseDetails.inclusions) {
      // input = [{ text: plan.name }];
      // const dayPLResult = await translateToESandPL(input);
      // const dayES = dayPLResult?.map((item: any) => item.translations[0].text);
      // const dayPL = dayPLResult?.map((item: any) => item.translations[1].text);

      inclusionsES.push({
        id: inc.id,
        description: incDescResES[iter],
        // package_id: null,
        nile_cruise_id: nileCruiseDetails.id,
      });
      inclusionsPL.push({
        id: inc.id,
        description: incDescResPL[iter],
        // package_id: null,
        nile_cruise_id: nileCruiseDetails.id,
      });
      iter++;
    }

    let exclusionsES = [];
    let exclusionsPL = [];

    let excDescInput = nileCruiseDetails.exclusions?.map(
      (exc) => exc.description
    );
    input = excDescInput?.map((name) => ({ text: name }));
    const excDescRes = await translateToESandPL(input);
    const excDescResES = excDescRes?.map(
      (item: any) => item.translations[0].text
    );
    const excDescResPL = excDescRes?.map(
      (item: any) => item.translations[1].text
    );
    iter = 0;

    // Update exclusions
    for (const exc of nileCruiseDetails.exclusions) {
      // input = [{ text: plan.name }];
      // const dayPLResult = await translateToESandPL(input);
      // const dayES = dayPLResult?.map((item: any) => item.translations[0].text);
      // const dayPL = dayPLResult?.map((item: any) => item.translations[1].text);
      exclusionsES.push({
        id: exc.id,
        description: excDescResES[iter],
        // package_id: null,
        nile_cruise_id: nileCruiseDetails.id,
      });
      exclusionsPL.push({
        id: exc.id,
        description: excDescResPL[iter],
        // package_id: null,
        nile_cruise_id: nileCruiseDetails.id,
      });
      iter++;
    }

    const { error: mainErrorPL } = await supabase
      .from("nile_cruises_pl")
      .upsert(
        {
          id: nileCruiseDetails.id,
          NileCruisesName: mainPL[0],
          availability: mainPL[1],
          days: nileCruiseDetails.days,
          nights: nileCruiseDetails.nights,
          days2: nileCruiseDetails.days2,
          nights2: nileCruiseDetails.nights2,
          tourType: mainPL[2],
          images: nileCruiseDetails.images,
          country: mainPL[3],
          cities: citiesPL,
        },
        { onConflict: "id" }
      );

    if (mainErrorPL) {
      console.error("Error updating Nile Cruise:", mainErrorPL);
      return;
    }

    // Update itinerary
    for (const day of itineraryPL) {
      const { error: itineraryErrorPL } = await supabase
        .from("itinerary_pl")
        .upsert(day, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itineraryErrorPL) {
        console.error("Error updating itinerary:", itineraryErrorPL);
        return;
      }
    }

    // Update itinerary2
    for (const day of itinerary2PL) {
      const { error: itinerary2ErrorPL } = await supabase
        .from("itinerary2_pl")
        .upsert(day, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itinerary2ErrorPL) {
        console.error("Error updating itinerary2:", itinerary2ErrorPL);
        return;
      }
    }

    // Update accommodation plans
    for (const plan of accommodationPlansPL) {
      const { error: accommodationErrorPL } = await supabase
        .from("accommodation_plans_pl")
        .upsert(plan, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("name", plan.name);

      if (accommodationErrorPL) {
        console.error(
          "Error updating accommodation plans:",
          accommodationErrorPL
        );
        return;
      }
    }

    // Update inclusions
    for (const inc of inclusionsPL) {
      const { error: inclusionErrorPL } = await supabase
        .from("inclusions_pl")
        .upsert(inc, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (inclusionErrorPL) {
        console.error("Error updating inclusions:", inclusionErrorPL);
        return;
      }
    }

    // Update exclusions
    for (const exc of exclusionsPL) {
      const { error: exclusionsErrorPL } = await supabase
        .from("exclusions_pl")
        .upsert(exc, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (exclusionsErrorPL) {
        console.error("Error updating exclusions:", exclusionsErrorPL);
        return;
      }
    }

    const { error: mainErrorES } = await supabase
      .from("nile_cruises_es")
      .upsert(
        {
          id: nileCruiseDetails.id,
          NileCruisesName: mainES[0],
          availability: mainES[1],
          days: nileCruiseDetails.days,
          nights: nileCruiseDetails.nights,
          days2: nileCruiseDetails.days2,
          nights2: nileCruiseDetails.nights2,
          tourType: mainES[2],
          images: nileCruiseDetails.images,
          country: mainES[3],
          cities: citiesES,
        },
        { onConflict: "id" }
      );
    // .select("id");

    if (mainErrorES) {
      console.error("Error updating Nile Cruise:", mainErrorES);
      return;
    }

    // Update itinerary
    for (const day of itineraryES) {
      const { error: itineraryErrorES } = await supabase
        .from("itinerary_es")
        .upsert(day, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itineraryErrorES) {
        console.error("Error updating itinerary:", itineraryErrorES);
        return;
      }
    }

    // Update itinerary2
    for (const day of itinerary2ES) {
      const { error: itinerary2ErrorES } = await supabase
        .from("itinerary2_es")
        .upsert(day, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itinerary2ErrorES) {
        console.error("Error updating itinerary2:", itinerary2ErrorES);
        return;
      }
    }

    // Update accommodation plans

    for (const plan of accommodationPlansES) {
      const { error: accommodationErrorES } = await supabase
        .from("accommodation_plans_es")
        .upsert(plan, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("name", plan.name);

      if (accommodationErrorES) {
        console.error(
          "Error updating accommodation plans:",
          accommodationErrorES
        );
        return;
      }
    }

    // Update inclusions
    for (const inc of inclusionsES) {
      const { error: inclusionErrorES } = await supabase
        .from("inclusions_es")
        .upsert(inc, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (inclusionErrorES) {
        console.error("Error updating inclusions:", inclusionErrorES);
        return;
      }
    }

    // Update exclusions
    for (const exc of exclusionsES) {
      const { error: exclusionErrorES } = await supabase
        .from("exclusions_es")
        .upsert(exc, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (exclusionErrorES) {
        console.error("Error updating exclusions:", exclusionErrorES);
        return;
      }
    }

    console.log("Nile Cruise updated successfully");
  };

  const handleDeleteNileCruise = async (id: number) => {
    try {
      console.log(`Deleting Nile Cruise with ID: ${id}`);
      console.log(`Deleting Nile Cruise with ID: ${selectedNileCruise}`);

      // Delete from nile_cruises_es
      const { data, error: errorES } = await supabase
        .from("nile_cruises_es")
        .delete()
        .eq("id", id);

      console.log({ esRes: data });

      if (errorES) {
        console.error("Error deleting from nile_cruises_es:", errorES);
        return;
      }
      console.log("Successfully deleted from nile_cruises_es");

      // Delete from nile_cruises_pl
      const { data: dataPL, error: errorPL } = await supabase
        .from("nile_cruises_pl")
        .delete()
        .eq("id", id);

      console.log({ plRes: dataPL });
      if (errorPL) {
        console.error("Error deleting from nile_cruises_pl:", errorPL);
        return;
      }
      console.log("Successfully deleted from nile_cruises_pl");

      // Delete from nile_cruises
      const { data: dataEN, error: errorEN } = await supabase
        .from("nile_cruises")
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
        Update Nile Cruise
      </Typography>
      <Typography
        color="gray"
        className="mt-1 font-normal"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Select a Nile Cruise to update its details.
      </Typography>

      <Select
        label="Select Nile Cruise"
        variant="static"
        onChange={(e) => handleNileCruiseSelect(e as unknown as string)}
        className="w-full pt-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {nileCruises?.map(
          (cruise: {
            id: React.Key | null | undefined;
            NileCruisesName:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <Option key={cruise.id ?? ""} value={cruise.id?.toString() ?? ""}>
              {cruise.NileCruisesName}
            </Option>
          )
        )}
      </Select>

      {selectedNileCruise && (
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          {/* Nile Cruise Details */}
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Nile Cruise Name"
              name="NileCruisesName"
              value={
                nileCruiseDetails.NileCruisesName
                  ? nileCruiseDetails.NileCruisesName
                  : "There is no Nile Cruise name"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
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
                nileCruiseDetails.availability
                  ? nileCruiseDetails.availability
                  : "There is no availability"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
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
                nileCruiseDetails.days
                  ? nileCruiseDetails.days
                  : "There is no days"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
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
              value={
                nileCruiseDetails.nights
                  ? nileCruiseDetails.nights
                  : "There is no nights"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              required
              type="number"
            />
            <Input
              size="lg"
              label="Days 2"
              name="days2"
              value={
                nileCruiseDetails.days2
                  ? nileCruiseDetails.days2
                  : "There is no days2"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              required
              type="number"
            />
            <Input
              size="lg"
              label="Nights 2"
              name="nights2"
              value={
                nileCruiseDetails.nights2
                  ? nileCruiseDetails.nights2
                  : "There is no nights2"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              required
              type="number"
            />
            <Input
              size="lg"
              label="Country"
              name="country"
              value={
                nileCruiseDetails.country
                  ? nileCruiseDetails.country
                  : "There is no country"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              required
            />
            <Input
              size="lg"
              label="Tour Type"
              name="tourType"
              value={
                nileCruiseDetails.tourType
                  ? nileCruiseDetails.tourType
                  : "There is no tour type"
              }
              onChange={(e) => handleInputChange(e, undefined, undefined)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              required
            />
          </div>
          {/* images */}
          {nileCruiseDetails.images && nileCruiseDetails.images.length > 0 && (
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
          {nileCruiseDetails.images?.map((image, index) => (
            <Input
              key={index}
              size="lg"
              label={`Image ${index + 1}`}
              value={image ? image : "There is no image"}
              onChange={(e) => handleInputChange(e, index, "images")}
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ))}
          {/* add and remove image */}
          <div className="flex gap-4">
            <Button
              color="blue"
              size="lg"
              onClick={() =>
                setNileCruiseDetails({
                  ...nileCruiseDetails,
                  images: [
                    ...nileCruiseDetails.images,
                    "https://via.placeholder.com/150",
                  ],
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              Add Image
            </Button>
            <Button
              color="red"
              size="lg"
              onClick={() =>
                setNileCruiseDetails({
                  ...nileCruiseDetails,
                  images: nileCruiseDetails.images.slice(
                    0,
                    nileCruiseDetails.images.length - 1
                  ),
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              Remove Image
            </Button>
          </div>

          {/* Cities */}
          {nileCruiseDetails.cities && nileCruiseDetails.cities.length > 0 && (
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

          {nileCruiseDetails.cities?.map((city, index) => (
            <Input
              key={index}
              size="lg"
              label={`City ${index + 1}`}
              value={city ? city : "There is no city"}
              onChange={(e) => handleInputChange(e, index, "cities")}
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ))}

          {/* Add and remove city */}
          <div className="flex gap-4">
            <Button
              color="blue"
              size="lg"
              onClick={() =>
                setNileCruiseDetails({
                  ...nileCruiseDetails,
                  cities: [...nileCruiseDetails.cities, ""],
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              Add City
            </Button>
            <Button
              color="red"
              size="lg"
              onClick={() =>
                setNileCruiseDetails({
                  ...nileCruiseDetails,
                  cities: nileCruiseDetails.cities.slice(
                    0,
                    nileCruiseDetails.cities.length - 1
                  ),
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              Remove City
            </Button>
          </div>
          {/* Itinerary Aswan to Luxor */}
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Itinerary Aswan to Luxor
          </Typography>
          {nileCruiseDetails.itinerary?.map((day, index) => (
            <div key={index} className="mb-4 flex flex-col gap-4">
              <Input
                size="lg"
                name="title"
                label={`Day ${index + 1} Title`}
                value={day.title || ""}
                onChange={(e) => handleInputChange(e, index, "itinerary")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                label={`Day ${index + 1} Activities`}
                value={
                  day.activities ? day.activities : "There are no activities"
                }
                name="activities"
                onChange={(e) => handleInputChange(e, index, "itinerary")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                name="meals"
                size="lg"
                label={`Day ${index + 1} Meals`}
                value={day.meals ? day.meals.join(", ") : "There are no meals"}
                onChange={(e) => handleInputChange(e, index, "itinerary")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label={`Day ${index + 1} Accommodation`}
                value={
                  day.accommodation
                    ? day.accommodation
                    : "There is no accommodation"
                }
                name="accommodation"
                onChange={(e) => handleInputChange(e, index, "itinerary")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                label={`Day ${index + 1} Optional Tour Name`}
                value={
                  day.optional_tour_name
                    ? day.optional_tour_name
                    : "There is no optional tour name"
                }
                name="optional_tour_name"
                onChange={(e) => handleInputChange(e, index, "itinerary")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label={`Day ${index + 1} Optional Tour Price`}
                value={
                  day.optional_tour_price
                    ? day.optional_tour_price.toString()
                    : "There is no optional tour price"
                }
                name="optional_tour_price"
                onChange={(e) => handleInputChange(e, index, "itinerary")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                label={`Day ${index + 1} Optional Tour Description`}
                value={
                  day.optional_tour_description
                    ? day.optional_tour_description
                    : "There is no optional tour description"
                }
                name="optional_tour_description"
                onChange={(e) => handleInputChange(e, index, "itinerary")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          ))}

          {/* Itinerary Luxor to Aswan */}
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Itinerary Luxor to Aswan
          </Typography>
          {nileCruiseDetails.itinerary2?.map((day, index) => (
            <div key={index} className="mb-4 flex flex-col gap-4">
              <Input
                size="lg"
                name="title"
                label={`Day ${index + 1} Title`}
                value={day.title || ""}
                onChange={(e) => handleInputChange(e, index, "itinerary2")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                label={`Day ${index + 1} Activities`}
                value={
                  day.activities ? day.activities : "There are no activities"
                }
                name="activities"
                onChange={(e) => handleInputChange(e, index, "itinerary2")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                name="meals"
                label={`Day ${index + 1} Meals`}
                value={day.meals ? day.meals.join(", ") : "There are no meals"}
                onChange={(e) => handleInputChange(e, index, "itinerary2")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                name="accommodation"
                label={`Day ${index + 1} Accommodation`}
                value={
                  day.accommodation
                    ? day.accommodation
                    : "There is no accommodation"
                }
                onChange={(e) => handleInputChange(e, index, "itinerary2")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                label={`Day ${index + 1} Optional Tour Name`}
                name="optional_tour_name"
                value={
                  day.optional_tour_name
                    ? day.optional_tour_name
                    : "There is no optional tour name"
                }
                onChange={(e) => handleInputChange(e, index, "itinerary2")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                name="optional_tour_price"
                label={`Day ${index + 1} Optional Tour Price`}
                value={
                  day.optional_tour_price
                    ? day.optional_tour_price.toString()
                    : "There is no optional tour price"
                }
                onChange={(e) => handleInputChange(e, index, "itinerary2")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                size="lg"
                name="optional_tour_description"
                label={`Day ${index + 1} Optional Tour Description`}
                value={
                  day.optional_tour_description
                    ? day.optional_tour_description
                    : "There is no optional tour description"
                }
                onChange={(e) => handleInputChange(e, index, "itinerary2")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          ))}

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
          {nileCruiseDetails.accommodationPlans?.map((plan, index) => (
            <div key={index} className="mb-4 flex flex-col gap-4">
              <Input
                size="lg"
                name="name"
                label={`Accommodation Plan ${index + 1} Name`}
                value={plan.name ? plan.name : "There is no name"}
                onChange={(e) =>
                  handleInputChange(e, index, "accommodationPlans")
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                name="price_per_person_single_room"
                label="Price Per Person Single Room"
                value={plan.price_per_person_single_room || ""}
                onChange={(e) =>
                  handleInputChange(e, index, "accommodationPlans")
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                name="price_per_person_double_room"
                label={`Accommodation Plan ${index + 1} Price per Person Double Room Summer`}
                value={
                  plan.price_per_person_double_room
                    ? plan.price_per_person_double_room.toString()
                    : "There is no price per person double room summer"
                }
                onChange={(e) =>
                  handleInputChange(e, index, "accommodationPlans")
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                name="price_per_person_single_room_winter"
                label={`Accommodation Plan ${index + 1} Price per Person Single Room Winter`}
                value={
                  plan.price_per_person_single_room_winter
                    ? plan.price_per_person_single_room_winter.toString()
                    : "There is no price per person single room winter"
                }
                onChange={(e) =>
                  handleInputChange(e, index, "accommodationPlans")
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
              <Input
                size="lg"
                name="price_per_person_double_room_winter"
                label={`Accommodation Plan ${index + 1} Price per Person Double Room Winter`}
                value={
                  plan.price_per_person_double_room_winter
                    ? plan.price_per_person_double_room_winter.toString()
                    : "There is no price per person double room winter"
                }
                onChange={(e) =>
                  handleInputChange(e, index, "accommodationPlans")
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
            </div>
          ))}

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
          {nileCruiseDetails.inclusions?.map((inc, index) => (
            <div key={index} className="mb-4 flex flex-col gap-4">
              <Input
                key={index}
                size="lg"
                label={`Inclusion ${index + 1}`}
                value={
                  inc && inc.description
                    ? inc.description
                    : "There is no inclusion"
                }
                onChange={(e) => handleInputChange(e, index, "inclusions")}
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
          {nileCruiseDetails.exclusions?.map((exc, index) => (
            <div key={index} className="mb-4 flex flex-col gap-4">
              <Input
                key={index}
                size="lg"
                label={`Exclusion ${index + 1}`}
                value={
                  exc && exc.description
                    ? exc.description
                    : "There is no exclusion"
                }
                onChange={(e) => handleInputChange(e, index, "exclusions")}
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          ))}

          <Button
            color="blue"
            size="lg"
            className="w-full mt-6"
            type="submit"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            Update Nile Cruise
          </Button>
          <Button
            color="red"
            size="lg"
            className="w-full mt-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
            onClick={() => handleDeleteNileCruise(nileCruiseDetails?.id)}
          >
            Delete Nile Cruise
          </Button>
        </form>
      )}
    </Card>
  );
}
