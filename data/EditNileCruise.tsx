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
      day: number;
      title: string;
      activities: string;
      meals: string[];
      accommodation: string;
      optional_tour_name: string;
      optional_tour_price: number;
      optional_tour_description: string;
    }[];
    itinerary2: {
      day: number;
      title: string;
      activities: string;
      meals: string[];
      accommodation: string;
      optional_tour_name: string;
      optional_tour_price: number;
      optional_tour_description: string;
    }[];
    accommodationPlans: {
      name: string;
      price_per_person_single_room: number;
      price_per_person_double_room: number;
      price_per_person_single_room_winter: number;
      price_per_person_double_room_winter: number;
    }[];
    inclusions: string[];
    exclusions: string[];
  }>({
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
    inclusions: [],
    exclusions: [],
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
    const { data, error } = await supabase
      .from("nile_cruises")
      .select("id, NileCruisesName");
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
      setNileCruiseDetails({
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
        inclusions: data.inclusions.map(
          (inc: { description: any }) => inc.description
        ),
        exclusions: data.exclusions.map(
          (exc: { description: any }) => exc.description
        ),
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
      } else if (
        field === "inclusions" ||
        field === "exclusions" ||
        field === "cities" ||
        field === "images"
      ) {
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
    // Ask if sure
    if (!window.confirm("Are you sure you want to update this Nile Cruise?"))
      return;

    // Prevent the form from refreshing the page
    e.preventDefault();
    if (!selectedNileCruise) return;

    // Update the main Nile Cruise record
    const { error: mainError } = await supabase
      .from("nile_cruises")
      .upsert({
        NileCruisesName: nileCruiseDetails.NileCruisesName,
        availability: nileCruiseDetails.availability,
        days: nileCruiseDetails.days,
        nights: nileCruiseDetails.nights,
        days2: nileCruiseDetails.days2,
        nights2: nileCruiseDetails.nights2,
        country: nileCruiseDetails.country,
        tourType: nileCruiseDetails.tourType,
        cities: nileCruiseDetails.cities,
        images: nileCruiseDetails.images,
      })
      .eq("id", parseInt(selectedNileCruise));

    let input = [
      { text: nileCruiseDetails.NileCruisesName },
      { text: nileCruiseDetails.availability },
      { text: nileCruiseDetails.days.toString() },
      { text: nileCruiseDetails.nights.toString() },
      { text: nileCruiseDetails.days2.toString() },
      { text: nileCruiseDetails.nights2.toString() },
      { text: nileCruiseDetails.country },
      { text: nileCruiseDetails.tourType },
      { text: nileCruiseDetails.cities.join(",") },
    ];

    let result = await translateToESandPL(input);

    const { error: mainErrorES } = await supabase
      .from("nile_cruises_es")
      .upsert({
        NileCruisesName: result[0].translations[0].text,
        availability: result[1].translations[0].text,
        days: parseInt(result[2].translations[0].text),
        nights: parseInt(result[3].translations[0].text),
        days2: parseInt(result[4].translations[0].text),
        nights2: parseInt(result[5].translations[0].text),
        country: result[6].translations[0].text,
        tourType: result[7].translations[0].text,
        cities: result[8].translations[0].text.split(","),
        images: nileCruiseDetails.images,
      })
      .eq("id", parseInt(selectedNileCruise));

    const { error: mainErrorPL } = await supabase
      .from("nile_cruises_pl")
      .upsert({
        NileCruisesName: result[0].translations[1].text,
        availability: result[1].translations[1].text,
        days: parseInt(result[2].translations[1].text),
        nights: parseInt(result[3].translations[1].text),
        days2: parseInt(result[4].translations[1].text),
        nights2: parseInt(result[5].translations[1].text),
        country: result[6].translations[1].text,
        tourType: result[7].translations[1].text,
        cities: result[8].translations[1].text.split(","),
        images: nileCruiseDetails.images,
      })
      .eq("id", parseInt(selectedNileCruise));

    if (mainError || mainErrorES || mainErrorPL) {
      console.error(
        "Error updating Nile Cruise:",
        mainError || mainErrorES || mainErrorPL
      );
      return;
    }

    // upsert itinerary translations
    input = [];

    // First, upsert the main itinerary
    for (const day of nileCruiseDetails.itinerary) {
      // upsert original itinerary first
      const { error: itineraryError } = await supabase
        .from("itinerary")
        .upsert(day)
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("day", day.day);

      if (itineraryError) {
        console.error("Error updating itinerary:", itineraryError);
        return;
      }

      // Collect all text for translation
      input.push({ text: day.day.toString() });
      input.push({ text: day.title });
      input.push({ text: day.activities });

      day.meals.forEach((meal) => {
        input.push({ text: meal });
      });

      input.push({ text: day.accommodation });
      input.push({ text: day.optional_tour_name });
      input.push({ text: day.optional_tour_price.toString() });
      input.push({ text: day.optional_tour_description });
    }

    // Get translations for all collected text
    result = await translateToESandPL(input);

    // Process Spanish translations
    let es_itinerary = JSON.parse(JSON.stringify(nileCruiseDetails.itinerary)); // Deep copy
    let h = 0;

    for (let i = 0; i < nileCruiseDetails.itinerary.length; i++) {
      const day = es_itinerary[i];

      day.day = parseInt(result[h].translations[0].text);
      h++;
      day.title = result[h].translations[0].text;
      h++;
      day.activities = result[h].translations[0].text;
      h++;

      // Handle meals array
      for (let j = 0; j < nileCruiseDetails.itinerary[i].meals.length; j++) {
        day.meals[j] = result[h].translations[0].text;
        h++;
      }

      day.accommodation = result[h].translations[0].text;
      h++;
      day.optional_tour_name = result[h].translations[0].text;
      h++;
      day.optional_tour_price = parseInt(result[h].translations[0].text);
      h++;
      day.optional_tour_description = result[h].translations[0].text;
      h++;

      // upsert Spanish translation in database
      const { error: esError } = await supabase.from("itinerary_es").upsert({
        nile_cruise_id: parseInt(selectedNileCruise),
        day: day.day,
        title: day.title,
        activities: day.activities,
        meals: day.meals,
        accommodation: day.accommodation,
        optional_tour_name: day.optional_tour_name,
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: day.optional_tour_description,
      });

      if (esError) {
        console.error("Error updating Spanish itinerary:", esError);
        return;
      }
    }

    // Process Polish translations
    let pl_itinerary = JSON.parse(JSON.stringify(nileCruiseDetails.itinerary)); // Deep copy
    h = 0;

    for (let i = 0; i < nileCruiseDetails.itinerary.length; i++) {
      const day = pl_itinerary[i];

      day.day = parseInt(result[h].translations[1].text);
      h++;
      day.title = result[h].translations[1].text;
      h++;
      day.activities = result[h].translations[1].text;
      h++;

      // Handle meals array
      for (let j = 0; j < nileCruiseDetails.itinerary[i].meals.length; j++) {
        day.meals[j] = result[h].translations[1].text;
        h++;
      }

      day.accommodation = result[h].translations[1].text;
      h++;
      day.optional_tour_name = result[h].translations[1].text;
      h++;
      day.optional_tour_price = parseInt(result[h].translations[1].text);
      h++;
      day.optional_tour_description = result[h].translations[1].text;
      h++;

      // upsert Polish translation in database
      const { error: plError } = await supabase.from("itinerary_pl").upsert({
        nile_cruise_id: parseInt(selectedNileCruise),
        day: day.day,
        title: day.title,
        activities: day.activities,
        meals: day.meals,
        accommodation: day.accommodation,
        optional_tour_name: day.optional_tour_name,
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: day.optional_tour_description,
      });

      if (plError) {
        console.error("Error updating Polish itinerary:", plError);
        return;
      }
    }

    // upsert itinerary translations
    input = [];

    // First, upsert the main itinerary
    for (const day of nileCruiseDetails.itinerary2) {
      // upsert original itinerary first
      const { error: itineraryError2 } = await supabase
        .from("itinerary2")
        .upsert(day)
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("day", day.day);

      if (itineraryError2) {
        console.error("Error updating itinerary:", itineraryError2);
        return;
      }

      // Collect all text for translation
      input.push({ text: day.day.toString() });
      input.push({ text: day.title });
      input.push({ text: day.activities });

      day.meals.forEach((meal) => {
        input.push({ text: meal });
      });

      input.push({ text: day.accommodation });
      input.push({ text: day.optional_tour_name });
      input.push({ text: day.optional_tour_price.toString() });
      input.push({ text: day.optional_tour_description });
    }

    // Get translations for all collected text
    result = await translateToESandPL(input);

    // Process Spanish translations
    let es_itinerary2 = JSON.parse(
      JSON.stringify(nileCruiseDetails.itinerary2)
    ); // Deep copy
    h = 0;

    for (let i = 0; i < nileCruiseDetails.itinerary2.length; i++) {
      const day = es_itinerary2[i];

      day.day = parseInt(result[h].translations[0].text);
      h++;
      day.title = result[h].translations[0].text;
      h++;
      day.activities = result[h].translations[0].text;
      h++;

      // Handle meals array
      for (let j = 0; j < nileCruiseDetails.itinerary2[i].meals.length; j++) {
        day.meals[j] = result[h].translations[0].text;
        h++;
      }

      day.accommodation = result[h].translations[0].text;
      h++;
      day.optional_tour_name = result[h].translations[0].text;
      h++;
      day.optional_tour_price = parseInt(result[h].translations[0].text);
      h++;
      day.optional_tour_description = result[h].translations[0].text;
      h++;

      // upsert Spanish translation in database
      const { error: esError2 } = await supabase.from("itinerary2_es").upsert({
        nile_cruise_id: parseInt(selectedNileCruise),
        day: day.day,
        title: day.title,
        activities: day.activities,
        meals: day.meals,
        accommodation: day.accommodation,
        optional_tour_name: day.optional_tour_name,
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: day.optional_tour_description,
      });

      if (esError2) {
        console.error("Error updating Spanish itinerary:", esError2);
        return;
      }
    }

    // Process Polish translations
    let pl_itinerary2 = JSON.parse(
      JSON.stringify(nileCruiseDetails.itinerary2)
    ); // Deep copy
    h = 0;

    for (let i = 0; i < nileCruiseDetails.itinerary2.length; i++) {
      const day = pl_itinerary2[i];
      h = 0;
      day.day = parseInt(result[h].translations[1].text);
      h++;
      day.title = result[h].translations[1].text;
      h++;
      day.activities = result[h].translations[1].text;
      h++;

      // Handle meals array
      for (let j = 0; j < nileCruiseDetails.itinerary2[i].meals.length; j++) {
        day.meals[j] = result[h].translations[1].text;
        h++;
      }

      day.accommodation = result[h].translations[1].text;
      h++;
      day.optional_tour_name = result[h].translations[1].text;
      h++;
      day.optional_tour_price = parseInt(result[h].translations[1].text);
      h++;
      day.optional_tour_description = result[h].translations[1].text;
      h++;

      // upsert Polish translation in database
      const { error: plError2 } = await supabase.from("itinerary2_pl").upsert({
        nile_cruise_id: parseInt(selectedNileCruise),
        day: day.day,
        title: day.title,
        activities: day.activities,
        meals: day.meals,
        accommodation: day.accommodation,
        optional_tour_name: day.optional_tour_name,
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: day.optional_tour_description,
      });

      if (plError2) {
        console.error("Error updating Polish itinerary:", plError2);
        return;
      }
    }

    input = [];

    for (const plan of nileCruiseDetails.accommodationPlans) {
      input.push({ text: plan.name });
      input.push({ text: plan.price_per_person_single_room.toString() });
      input.push({ text: plan.price_per_person_double_room.toString() });
      input.push({ text: plan.price_per_person_single_room_winter.toString() });
      input.push({ text: plan.price_per_person_double_room_winter.toString() });

      const { error: accommodationError } = await supabase
        .from("accommodation_plans")
        .upsert(plan)
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("name", plan.name);

      if (accommodationError) {
        console.error(
          "Error updating accommodation plans:",
          accommodationError
        );
        return;
      }
    }

    result = await translateToESandPL(input);

    let es_accommodationPlans = nileCruiseDetails.accommodationPlans.map(
      (plan) => ({
        ...plan,
        package_id: null,
      })
    );

    h = 0;
    for (let i = 0; i < nileCruiseDetails.accommodationPlans.length; i++) {
      es_accommodationPlans[i].name = result[h].translations[0].text;
      h++;
      es_accommodationPlans[i].price_per_person_single_room = parseInt(
        result[h].translations[0].text
      );
      h++;
      es_accommodationPlans[i].price_per_person_double_room = parseInt(
        result[h].translations[0].text
      );
      h++;

      es_accommodationPlans[i].price_per_person_single_room_winter = parseInt(
        result[h].translations[0].text
      );
      h++;

      es_accommodationPlans[i].price_per_person_double_room_winter = parseInt(
        result[h].translations[0].text
      );
      h++;
      es_accommodationPlans[i].package_id = null;
    }

    for (const plan of es_accommodationPlans) {
      const { error: accommodationError } = await supabase
        .from("accommodation_plans_es")
        .upsert(plan)
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("name", plan.name);

      if (accommodationError) {
        console.error(
          "Error updating accommodation plans:",
          accommodationError
        );
        return;
      }
    }

    let pl_accommodationPlans = nileCruiseDetails.accommodationPlans.map(
      (plan) => ({
        ...plan,
        package_id: null,
      })
    );

    h = 0;
    for (let i = 0; i < nileCruiseDetails.accommodationPlans.length; i++) {
      pl_accommodationPlans[i].name = result[h].translations[1].text;
      h++;
      pl_accommodationPlans[i].price_per_person_single_room = parseInt(
        result[h].translations[1].text
      );
      h++;
      pl_accommodationPlans[i].price_per_person_double_room = parseInt(
        result[h].translations[1].text
      );
      h++;

      pl_accommodationPlans[i].price_per_person_single_room_winter = parseInt(
        result[h].translations[1].text
      );
      h++;

      pl_accommodationPlans[i].price_per_person_double_room_winter = parseInt(
        result[h].translations[1].text
      );
      h++;
    }

    for (const plan of pl_accommodationPlans) {
      const { error: accommodationError } = await supabase
        .from("accommodation_plans_pl")
        .upsert(plan)
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("name", plan.name);

      if (accommodationError) {
        console.error(
          "Error updating accommodation plans:",
          accommodationError
        );
        return;
      }
    }

    // upsert inclusions
    input = [];
    let pl_inclusions = [];
    let es_inclusions = [];

    if (
      nileCruiseDetails.inclusions &&
      nileCruiseDetails.inclusions.length > 0
    ) {
      input = nileCruiseDetails.inclusions.map((inc) => ({ text: inc }));

      result = await translateToESandPL(input);

      es_inclusions = result.map((item: any) => item.translations[0].text);
      pl_inclusions = result.map((item: any) => item.translations[1].text);
    }
    for (const [index, inc] of nileCruiseDetails.inclusions.entries()) {
      const { error: inclusionError } = await supabase
        .from("inclusions")
        .upsert({ description: inc, package_id: null })
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("id", index + 1);

      const { error: inclusionErrorES } = await supabase
        .from("inclusions_es")
        .upsert({ description: es_inclusions[index], package_id: null })
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("id", index + 1);

      const { error: inclusionErrorPL } = await supabase
        .from("inclusions_pl")
        .upsert({ description: pl_inclusions[index], package_id: null })
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("id", index + 1);

      if (inclusionError || inclusionErrorES || inclusionErrorPL) {
        console.error(
          "Error updating inclusions:",
          inclusionError || inclusionErrorES || inclusionErrorPL
        );
        return;
      }
    }

    // // upsert exclusions
    input = [];
    let pl_exclusions = [];
    let es_exclusions = [];

    if (
      nileCruiseDetails.exclusions &&
      nileCruiseDetails.exclusions.length > 0
    ) {
      input = nileCruiseDetails.exclusions.map((inc) => ({ text: inc }));

      result = await translateToESandPL(input);

      es_exclusions = result.map((item: any) => item.translations[0].text);
      pl_exclusions = result.map((item: any) => item.translations[1].text);
    }
    for (const [index, inc] of nileCruiseDetails.exclusions.entries()) {
      const { error: exclusionError } = await supabase
        .from("exclusions")
        .upsert({ description: inc })
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("id", index + 1);

      const { error: exclusionErrorES } = await supabase
        .from("exclusions_es")
        .upsert({ description: es_exclusions[index] })
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("id", index + 1);

      const { error: exclusionErrorPL } = await supabase
        .from("exclusions_pl")
        .upsert({ description: pl_exclusions[index] })
        .eq("nile_cruise_id", parseInt(selectedNileCruise))
        .eq("id", index + 1);

      if (exclusionError || exclusionErrorES || exclusionErrorPL) {
        console.error(
          "Error updating exclusions:",
          exclusionError || exclusionErrorES || exclusionErrorPL
        );
        return;
      }
    }

    console.log("Nile Cruise updated successfully");
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
        onChange={(e) => {
          handleNileCruiseSelect(e as unknown as string);
          console.log(e);
        }}
        className="w-full pt-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {nileCruises.map(
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
                value={inc ? inc : "There is no inclusion"}
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
                value={exc ? exc : "There is no exclusion"}
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
        </form>
      )}
    </Card>
  );
}
