import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { supabase } from "@/api/supabase";
import { v4 as uuidv4 } from "uuid";

export function NileCruiseCreationForm() {
  const [nileCruisesDetails, setNileCruisesDetails] = useState<{
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
    itinerary2: {
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
      name: string;
      price_per_person_single_room: number;
      price_per_person_double_room: number;
      price_per_person_single_room_winter: number;
      price_per_person_double_room_winter: number;
      nile_cruise_id: number;
    }[];
    inclusions: {
      description: string;
      nile_cruise_id: number;
    }[];
    exclusions: {
      description: string;
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
    inclusions: [],
    exclusions: [],
  });

  interface ItineraryDay {
    day: number;
    title: string;
    activities: string;
    meals: string[];
    accommodation: string;
    optional_tour_name: string;
    optional_tour_price: number;
    optional_tour_description: string;
    nile_cruise_id: number;
  }
  interface AccommodationPlan {
    name: string;
    price_per_person_single_room: number;
    price_per_person_double_room: number;
    price_per_person_single_room_winter: number;
    price_per_person_double_room_winter: number;
    nile_cruise_id: number;
  }

  interface NileCruisesDetails {
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
    itinerary: ItineraryDay[];
    itinerary2: ItineraryDay[];
    accommodationPlans: AccommodationPlan[];
    inclusions: InclusionsOrExclusions[];
    exclusions: InclusionsOrExclusions[];
  }

  interface InclusionsOrExclusions {
    description: string;
    nile_cruise_id: number;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number | undefined,
    field:
      | keyof ItineraryDay
      | keyof NileCruisesDetails
      | keyof AccommodationPlan
      | "day2"
      | "title2"
      | "activities2"
      | "meals2"
      | "accommodation2"
      | "optional_tour_name2"
      | "optional_tour_price2"
      | "optional_tour_description2"
  ) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      if (field === "name") {
        const newAccommodationPlans = [
          ...nileCruisesDetails.accommodationPlans,
        ];
        newAccommodationPlans[index].name = value;
        setNileCruisesDetails({
          ...nileCruisesDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_single_room") {
        const newAccommodationPlans = [
          ...nileCruisesDetails.accommodationPlans,
        ];
        newAccommodationPlans[index].price_per_person_single_room =
          parseInt(value);
        setNileCruisesDetails({
          ...nileCruisesDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_double_room") {
        const newAccommodationPlans = [
          ...nileCruisesDetails.accommodationPlans,
        ];
        newAccommodationPlans[index].price_per_person_double_room =
          parseInt(value);
        setNileCruisesDetails({
          ...nileCruisesDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_single_room_winter") {
        const newAccommodationPlans = [
          ...nileCruisesDetails.accommodationPlans,
        ];
        newAccommodationPlans[index].price_per_person_single_room_winter =
          parseInt(value);
        setNileCruisesDetails({
          ...nileCruisesDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "price_per_person_double_room_winter") {
        const newAccommodationPlans = [
          ...nileCruisesDetails.accommodationPlans,
        ];
        newAccommodationPlans[index].price_per_person_double_room_winter =
          parseInt(value);
        setNileCruisesDetails({
          ...nileCruisesDetails,
          accommodationPlans: newAccommodationPlans,
        });
      } else if (field === "inclusions" || field === "exclusions") {
        const newArray = [...nileCruisesDetails[field]];
        newArray[index] = {
          description: value,
          nile_cruise_id: 0,
        };
        setNileCruisesDetails({ ...nileCruisesDetails, [field]: newArray });
      } else if (field === "cities") {
        const newArray = [...nileCruisesDetails.cities];
        newArray[index] = value;
        setNileCruisesDetails({ ...nileCruisesDetails, [field]: newArray });
      } else if (field === "images") {
        const newArray = [...nileCruisesDetails.images];
        newArray[index] = value;
        setNileCruisesDetails({ ...nileCruisesDetails, [field]: newArray });
      } else if (field === "meals") {
        const newItinerary = [...nileCruisesDetails.itinerary];
        newItinerary[index].meals.push(value);
        setNileCruisesDetails({
          ...nileCruisesDetails,
          itinerary: newItinerary,
        });
      } else if (field === "meals2") {
        const newItinerary2 = [...nileCruisesDetails.itinerary2];
        newItinerary2[index].meals.push(value);
        setNileCruisesDetails({
          ...nileCruisesDetails,
          itinerary2: newItinerary2,
        });
      } else if (
        field === "title" ||
        field === "activities" ||
        field === "accommodation" ||
        field === "optional_tour_name" ||
        field === "optional_tour_price" ||
        field === "optional_tour_description"
      ) {
        const newItinerary = [...nileCruisesDetails.itinerary];
        newItinerary[index][field as keyof ItineraryDay] = value as never;
        setNileCruisesDetails({
          ...nileCruisesDetails,
          itinerary: newItinerary,
        });
      } else if (
        field === "title2" ||
        field === "activities2" ||
        field === "accommodation2" ||
        field === "optional_tour_name2" ||
        field === "optional_tour_price2" ||
        field === "optional_tour_description2"
      ) {
        const parsedField = field.replace("2", "");
        const newItinerary2 = [...nileCruisesDetails.itinerary2];
        newItinerary2[index][parsedField as keyof ItineraryDay] =
          value as never;
        setNileCruisesDetails({
          ...nileCruisesDetails,
          itinerary2: newItinerary2,
        });
      }
      //  else {
      //   const newItinerary2 = [...nileCruisesDetails.itinerary2];
      //   newItinerary2[index][field as keyof ItineraryDay] = value as never;
      //   setNileCruisesDetails({
      //     ...nileCruisesDetails,
      //     itinerary2: newItinerary2,
      //   });
      // }
    } else {
      setNileCruisesDetails({ ...nileCruisesDetails, [name]: value });
    }
  };
  const addImage = () => {
    setNileCruisesDetails({
      ...nileCruisesDetails,
      images: [...nileCruisesDetails.images, ""],
    });
  };
  const addCity = () => {
    setNileCruisesDetails({
      ...nileCruisesDetails,
      cities: [...nileCruisesDetails.cities, ""],
    });
  };
  const addDay = () => {
    setNileCruisesDetails({
      ...nileCruisesDetails,
      itinerary: [
        ...nileCruisesDetails.itinerary,
        {
          day: nileCruisesDetails.itinerary.length + 1,
          title: "",
          activities: "",
          meals: [],
          accommodation: "",
          optional_tour_name: "",
          optional_tour_price: 0,
          optional_tour_description: "",
          nile_cruise_id: 0,
        },
      ],
    });
  };
  const addDay2 = () => {
    setNileCruisesDetails({
      ...nileCruisesDetails,
      itinerary2: [
        ...nileCruisesDetails.itinerary2,
        {
          day: nileCruisesDetails.itinerary2.length + 1,
          title: "",
          activities: "",
          meals: [],
          accommodation: "",
          optional_tour_name: "",
          optional_tour_price: 0,
          optional_tour_description: "",
          nile_cruise_id: 0,
        },
      ],
    });
  };
  const addAccommodationPlan = () => {
    setNileCruisesDetails({
      ...nileCruisesDetails,
      accommodationPlans: [
        ...nileCruisesDetails.accommodationPlans,
        {
          name: "",
          price_per_person_single_room: 0,
          price_per_person_double_room: 0,
          price_per_person_single_room_winter: 0,
          price_per_person_double_room_winter: 0,
          nile_cruise_id: 0,
        },
      ],
    });
  };

  const addInclusion = () => {
    setNileCruisesDetails({
      ...nileCruisesDetails,
      inclusions: [
        ...nileCruisesDetails.inclusions,
        {
          description: "",
          nile_cruise_id: 0,
        },
      ],
    });
  };

  const addExclusion = () => {
    setNileCruisesDetails({
      ...nileCruisesDetails,
      exclusions: [
        ...nileCruisesDetails.exclusions,
        {
          description: "",
          nile_cruise_id: 0,
        },
      ],
    });
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
            .VITE_APP_TRANSLATION_API_KEY,
          "Ocp-Apim-Subscription-Region": import.meta.env
            .VITE_APP_TRANSLATION_LOCATION,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        body: JSON.stringify(input),
      }
    );
    const result = await res.json();
    console.log(result);
    return result;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    if (!window.confirm("Are you sure you want to update this Nile Cruise?"))
      return;

    e.preventDefault();
    let inclusionIds = [];
    let execlusionIds = [];
    let ITerDaysIds = [];
    let Iter2DaysIds = [];
    let accomisationIds = [];
    const { data: mainId, error: mainError } = await supabase
      .from("nile_cruises")
      .insert({
        NileCruisesName: nileCruisesDetails.NileCruisesName,
        availability: nileCruisesDetails.availability,
        days: nileCruisesDetails.days,
        nights: nileCruisesDetails.nights,
        days2: nileCruisesDetails.days2,
        nights2: nileCruisesDetails.nights2,
        tourType: nileCruisesDetails.tourType,
        images: nileCruisesDetails.images,
        country: nileCruisesDetails.country,
        cities: nileCruisesDetails.cities,
      })
      .select("id");
    // .eq("id", selectedNileCruise);

    if (mainError) {
      console.error("Error updating Nile Cruise:", mainError);
      return;
    }
    if (mainId) {
      console.log(mainId[0].id);
      // set nileCruisesDetails id to mainId
      setNileCruisesDetails({
        ...nileCruisesDetails,
        id: mainId[0].id,
      });
    }

    const updatedDetails = {
      ...nileCruisesDetails,
      itinerary: nileCruisesDetails.itinerary?.map((day) => ({
        ...day,
        nile_cruise_id: mainId[0].id,
      })),
      itinerary2: nileCruisesDetails.itinerary2?.map((day) => ({
        ...day,
        nile_cruise_id: mainId[0].id,
      })),
      inclusions: nileCruisesDetails.inclusions?.map((inclusion) => ({
        ...inclusion,
        nile_cruise_id: mainId[0].id,
      })),
      exclusions: nileCruisesDetails.exclusions?.map((exclusion) => ({
        ...exclusion,
        nile_cruise_id: mainId[0].id,
      })),
      accommodationPlans: nileCruisesDetails.accommodationPlans?.map(
        (plan) => ({
          ...plan,
          nile_cruise_id: mainId[0].id,
        })
      ),
    };

    setNileCruisesDetails(updatedDetails);

    // Update itinerary
    for (const day of updatedDetails.itinerary) {
      console.log(day);
      const { data: createdIternary, error: itineraryError } = await supabase
        .from("itinerary")
        .upsert(day, { onConflict: "id" })
        .select("id");
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);
      if (createdIternary) ITerDaysIds.push(createdIternary[0]?.id);

      if (itineraryError) {
        console.error("Error updating itinerary:", itineraryError);
        return;
      }
    }

    // Update itinerary2
    for (const day of updatedDetails.itinerary2) {
      console.log(day);
      const { data: insertedDay, error: itinerary2Error } = await supabase
        .from("itinerary2")
        .upsert(day, { onConflict: "id" })
        .select("id");
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (insertedDay) Iter2DaysIds.push(insertedDay[0]?.id);

      if (itinerary2Error) {
        console.error("Error updating itinerary2:", itinerary2Error);
        return;
      }
    }

    // Update accommodation plans
    for (const plan of updatedDetails.accommodationPlans) {
      const { data: createdPlan, error: accommodationError } = await supabase
        .from("accommodation_plans")
        .upsert(plan, { onConflict: "id" })
        .select("id");
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("name", plan.name);

      if (createdPlan) accomisationIds.push(createdPlan[0]?.id);

      if (accommodationError) {
        console.error(
          "Error updating accommodation plans:",
          accommodationError
        );
        return;
      }
    }

    // Update inclusions
    for (const inc of updatedDetails.inclusions) {
      const { data, error: inclusionError } = await supabase
        .from("inclusions")
        .upsert(inc, { onConflict: "id" })
        .select("id");
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (data) inclusionIds.push(data[0]?.id);
      console.log(data);
      if (inclusionError) {
        console.error("Error updating inclusions:", inclusionError);
        return;
      }
    }

    // Update exclusions
    for (const exc of updatedDetails.exclusions) {
      const { data: execc, error: exclusionsError } = await supabase
        .from("exclusions")
        .upsert(exc, { onConflict: "id" })
        .select("id");
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (execc) execlusionIds.push(execc[0]?.id);

      if (exclusionsError) {
        console.error("Error updating exclusionss:", exclusionsError);
        return;
      }
    }

    // SPANISH 0 POLISH 1
    let input;

    input = [
      { text: nileCruisesDetails.NileCruisesName },
      { text: nileCruisesDetails.availability },
      { text: nileCruisesDetails.tourType },
      { text: nileCruisesDetails.country },
    ];
    const mainPLResult = await translateToESandPL(input);
    console.log({ mainPLResult });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    if (Object.keys(mainPLResult).includes("error")) return;
    const mainES = mainPLResult?.map((item: any) => item.translations[0].text);
    const mainPL = mainPLResult?.map((item: any) => item.translations[1].text);

    input = nileCruisesDetails.cities?.map((city) => ({ text: city }));
    const citesPLResult = await translateToESandPL(input);
    const citiesES = citesPLResult?.map(
      (item: any) => item.translations[0].text
    );
    const citiesPL = citesPLResult?.map(
      (item: any) => item.translations[1].text
    );

    let itineraryES = [];
    let itineraryPL = [];
    for (const day of nileCruisesDetails.itinerary) {
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
        day: day.day,
        title: dayES[0],
        activities: dayES[1],
        meals: mealsES,
        accommodation: dayES[2],
        optional_tour_name: dayES[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayES[4],
        nile_cruise_id: mainId[0].id,
      });
      itineraryPL.push({
        day: day.day,
        title: dayPL[0],
        activities: dayPL[1],
        meals: mealsPL,
        accommodation: dayPL[2],
        optional_tour_name: dayPL[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayPL[4],
        nile_cruise_id: mainId[0].id,
      });
    }

    let itinerary2ES = [];
    let itinerary2PL = [];
    for (const day of nileCruisesDetails.itinerary2) {
      input = day.meals?.map((meal) => ({ text: meal }));
      const mealsResult = await translateToESandPL(input);
      const mealsES = mealsResult?.map(
        (item: any) => item.translations[0].text
      );
      const mealsPL = mealsResult.map((item: any) => item.translations[1].text);

      input = [
        { text: day.title },
        { text: day.activities },
        { text: day.accommodation },
        { text: day.optional_tour_name },
        { text: day.optional_tour_description },
      ];
      const dayPLResult = await translateToESandPL(input);
      const dayES = dayPLResult.map((item: any) => item.translations[0].text);
      const dayPL = dayPLResult.map((item: any) => item.translations[1].text);
      itinerary2ES.push({
        day: day.day,
        title: dayES[0],
        activities: dayES[1],
        meals: mealsES,
        accommodation: dayES[2],
        optional_tour_name: dayES[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayES[4],
        nile_cruise_id: mainId[0].id,
      });
      itinerary2PL.push({
        day: day.day,
        title: dayPL[0],
        activities: dayPL[1],
        meals: mealsPL,
        accommodation: dayPL[2],
        optional_tour_name: dayPL[3],
        optional_tour_price: day.optional_tour_price,
        optional_tour_description: dayPL[4],
        nile_cruise_id: mainId[0].id,
      });
    }

    let accommodationPlansES = [];
    let accommodationPlansPL = [];

    let names = nileCruisesDetails.accommodationPlans.map((plan) => plan.name);
    input = names.map((name) => ({ text: name }));
    const namesPLResult = await translateToESandPL(input);
    const namesES = namesPLResult.map((item: any) => item.translations[0].text);
    const namesPL = namesPLResult.map((item: any) => item.translations[1].text);
    let iter = 0;

    // Update accommodation plans
    for (const plan of nileCruisesDetails.accommodationPlans) {
      // input = [{ text: plan.name }];
      // const dayPLResult = await translateToESandPL(input);
      // const dayES = dayPLResult.map((item: any) => item.translations[0].text);
      // const dayPL = dayPLResult.map((item: any) => item.translations[1].text);
      accommodationPlansES.push({
        name: namesES[iter],
        price_per_person_single_room: plan.price_per_person_single_room,
        price_per_person_double_room: plan.price_per_person_double_room,
        price_per_person_single_room_winter:
          plan.price_per_person_single_room_winter,
        price_per_person_double_room_winter:
          plan.price_per_person_double_room_winter,
        nile_cruise_id: mainId[0].id,
      });
      accommodationPlansPL.push({
        name: namesPL[iter],
        price_per_person_single_room: plan.price_per_person_single_room,
        price_per_person_double_room: plan.price_per_person_double_room,
        price_per_person_single_room_winter:
          plan.price_per_person_single_room_winter,
        price_per_person_double_room_winter:
          plan.price_per_person_double_room_winter,
        nile_cruise_id: mainId[0].id,
      });
      iter++;
    }

    let inclusionsES = [];
    let inclusionsPL = [];

    let incDescInput = nileCruisesDetails.inclusions.map(
      (inc) => inc.description
    );
    input = incDescInput.map((name) => ({ text: name }));
    const incDescRes = await translateToESandPL(input);
    const incDescResES = incDescRes.map(
      (item: any) => item.translations[0].text
    );
    const incDescResPL = incDescRes.map(
      (item: any) => item.translations[1].text
    );
    iter = 0;

    // Update inclusions
    for (const _inc of nileCruisesDetails.inclusions) {
      // input = [{ text: plan.name }];
      // const dayPLResult = await translateToESandPL(input);
      // const dayES = dayPLResult.map((item: any) => item.translations[0].text);
      // const dayPL = dayPLResult.map((item: any) => item.translations[1].text);
      inclusionsES.push({
        description: incDescResES[iter],
        // package_id: null,
        nile_cruise_id: mainId[0].id,
      });
      inclusionsPL.push({
        description: incDescResPL[iter],
        // package_id: null,
        nile_cruise_id: mainId[0].id,
      });
      iter++;
    }

    let exclusionsES = [];
    let exclusionsPL = [];

    let excDescInput = nileCruisesDetails.exclusions.map(
      (exc) => exc.description
    );
    input = excDescInput.map((name) => ({ text: name }));
    const excDescRes = await translateToESandPL(input);
    const excDescResES = excDescRes.map(
      (item: any) => item.translations[0].text
    );
    const excDescResPL = excDescRes.map(
      (item: any) => item.translations[1].text
    );
    iter = 0;

    // Update exclusions
    for (const _exc of nileCruisesDetails.exclusions) {
      // input = [{ text: plan.name }];
      // const dayPLResult = await translateToESandPL(input);
      // const dayES = dayPLResult.map((item: any) => item.translations[0].text);
      // const dayPL = dayPLResult.map((item: any) => item.translations[1].text);
      exclusionsES.push({
        description: excDescResES[iter],
        // package_id: null,
        nile_cruise_id: mainId[0].id,
      });
      exclusionsPL.push({
        description: excDescResPL[iter],
        // package_id: null,
        nile_cruise_id: mainId[0].id,
      });
      iter++;
    }

    const { error: mainErrorPL } = await supabase
      .from("nile_cruises_pl")
      .upsert(
        {
          id: mainId[0].id,
          NileCruisesName: mainPL[0],
          availability: mainPL[1],
          days: nileCruisesDetails.days,
          nights: nileCruisesDetails.nights,
          days2: nileCruisesDetails.days2,
          nights2: nileCruisesDetails.nights2,
          tourType: mainPL[2],
          images: nileCruisesDetails.images,
          country: mainPL[3],
          cities: citiesPL,
        },
        { onConflict: "id" }
      );

    if (mainErrorPL) {
      console.error("Error updating Nile Cruise:", mainErrorPL);
      return;
    }

    let idx = 0;
    // Update itinerary
    for (const day of itineraryPL) {
      const { error: itineraryErrorPL } = await supabase
        .from("itinerary_pl")
        .upsert({ ...day, id: ITerDaysIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itineraryErrorPL) {
        console.error("Error updating itinerary:", itineraryErrorPL);
        return;
      }
      idx++;
    }
    idx = 0;

    // Update itinerary2
    for (const day of itinerary2PL) {
      const { error: itinerary2ErrorPL } = await supabase
        .from("itinerary2_pl")
        .upsert({ ...day, id: Iter2DaysIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itinerary2ErrorPL) {
        console.error("Error updating itinerary2:", itinerary2ErrorPL);
        return;
      }
      idx++;
    }

    idx = 0;
    // Update accommodation plans
    for (const plan of accommodationPlansPL) {
      const { error: accommodationErrorPL } = await supabase
        .from("accommodation_plans_pl")
        .upsert({ ...plan, id: accomisationIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("name", plan.name);

      if (accommodationErrorPL) {
        console.error(
          "Error updating accommodation plans:",
          accommodationErrorPL
        );
        return;
      }
      idx++;
    }

    idx = 0;
    // Update inclusions
    for (const inc of inclusionsPL) {
      const { error: inclusionErrorPL } = await supabase
        .from("inclusions_pl")
        .upsert({ ...inc, id: inclusionIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (inclusionErrorPL) {
        console.error("Error updating inclusions:", inclusionErrorPL);
        return;
      }
      idx++;
    }

    idx = 0;
    // Update exclusions
    for (const exc of exclusionsPL) {
      const { error: exclusionsErrorPL } = await supabase
        .from("exclusions_pl")
        .upsert({ ...exc, id: execlusionIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (exclusionsErrorPL) {
        console.error("Error updating exclusions:", exclusionsErrorPL);
        return;
      }
      idx++;
    }

    idx = 0;

    const { error: mainErrorES } = await supabase
      .from("nile_cruises_es")
      .upsert(
        {
          id: mainId[0].id,
          NileCruisesName: mainES[0],
          availability: mainES[1],
          days: nileCruisesDetails.days,
          nights: nileCruisesDetails.nights,
          days2: nileCruisesDetails.days2,
          nights2: nileCruisesDetails.nights2,
          tourType: mainES[2],
          images: nileCruisesDetails.images,
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
        .upsert({ ...day, id: ITerDaysIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itineraryErrorES) {
        console.error("Error updating itinerary:", itineraryErrorES);
        return;
      }
      idx++;
    }

    idx = 0;
    // Update itinerary2
    for (const day of itinerary2ES) {
      const { error: itinerary2ErrorES } = await supabase
        .from("itinerary2_es")
        .upsert({ ...day, id: Iter2DaysIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("day", day.day);

      if (itinerary2ErrorES) {
        console.error("Error updating itinerary2:", itinerary2ErrorES);
        return;
      }
      idx++;
    }

    idx = 0;
    // Update accommodation plans
    for (const plan of accommodationPlansES) {
      const { error: accommodationErrorES } = await supabase
        .from("accommodation_plans_es")
        .upsert({ ...plan, id: accomisationIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("name", plan.name);

      if (accommodationErrorES) {
        console.error(
          "Error updating accommodation plans:",
          accommodationErrorES
        );
        return;
      }
      idx++;
    }

    idx = 0;
    // Update inclusions
    for (const inc of inclusionsES) {
      const { error: inclusionErrorES } = await supabase
        .from("inclusions_es")
        .upsert({ ...inc, id: inclusionIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (inclusionErrorES) {
        console.error("Error updating inclusions:", inclusionErrorES);
        return;
      }
      idx++;
    }

    idx = 0;
    // Update exclusions
    for (const exc of exclusionsES) {
      const { error: exclusionErrorES } = await supabase
        .from("exclusions_es")
        .upsert({ ...exc, id: execlusionIds[idx] }, { onConflict: "id" });
      // .eq("nile_cruise_id", selectedNileCruise)
      // .eq("id", index + 1);

      if (exclusionErrorES) {
        console.error("Error updating exclusions:", exclusionErrorES);
        return;
      }
      idx++;
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
        Create New NileCruises
      </Typography>
      <Typography
        color="gray"
        className="mt-1 font-normal"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Enter the details for the new travel NileCruises.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="NileCruises Name"
            name="NileCruisesName"
            value={nileCruisesDetails.NileCruisesName}
            onChange={(e) => handleInputChange(e, undefined, "NileCruisesName")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
          />
          <Input
            size="lg"
            label="Availability"
            name="availability"
            value={nileCruisesDetails.availability}
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
            value={nileCruisesDetails.days}
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
            value={nileCruisesDetails.nights}
            onChange={(e) => handleInputChange(e, undefined, "nights")}
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
            value={nileCruisesDetails.days2}
            onChange={(e) => handleInputChange(e, undefined, "days2")}
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
            value={nileCruisesDetails.nights2}
            onChange={(e) => handleInputChange(e, undefined, "nights2")}
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
            value={nileCruisesDetails.tourType}
            onChange={(e) => handleInputChange(e, undefined, "tourType")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
          />
          <Input
            size="lg"
            label="Country"
            name="country"
            value={nileCruisesDetails.country}
            onChange={(e) => handleInputChange(e, undefined, "country")}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            required
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
        {nileCruisesDetails.cities.map((city, index) => (
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
            const newArray = [...nileCruisesDetails.cities];
            newArray.pop();
            setNileCruisesDetails({ ...nileCruisesDetails, cities: newArray });
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
          className="mb-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Images
        </Typography>
        {nileCruisesDetails.images.map((image, index) => (
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
            const newArray = [...nileCruisesDetails.images];
            newArray.pop();
            setNileCruisesDetails({ ...nileCruisesDetails, images: newArray });
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
          className="mb-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Itinerary Aswan to Luxor
        </Typography>
        {nileCruisesDetails.itinerary.map((day, index) => (
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
              required
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
              required
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
            {/* add meals */}
            {day.meals.map((meal, mealIndex) => (
              <Input
                key={mealIndex}
                size="lg"
                label={`Meal ${mealIndex + 1}`}
                value={meal}
                onChange={(e) => {
                  const newItinerary = [...nileCruisesDetails.itinerary];
                  newItinerary[index].meals[mealIndex] = e.target.value;
                  setNileCruisesDetails({
                    ...nileCruisesDetails,
                    itinerary: newItinerary,
                  });
                }}
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                required
              />
            ))}
            <Button
              onClick={() => {
                const newItinerary = [...nileCruisesDetails.itinerary];
                newItinerary[index].meals.push("");
                setNileCruisesDetails({
                  ...nileCruisesDetails,
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

            {/* remove meal */}
            <Button
              onClick={() => {
                const newItinerary = [...nileCruisesDetails.itinerary];
                newItinerary[index].meals.pop();
                setNileCruisesDetails({
                  ...nileCruisesDetails,
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
        {/* remove day */}
        <Button
          onClick={() => {
            const newItinerary = [...nileCruisesDetails.itinerary];
            newItinerary.pop();
            setNileCruisesDetails({
              ...nileCruisesDetails,
              itinerary: newItinerary,
            });
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
          Itinerary Luxor to Aswan
        </Typography>
        {nileCruisesDetails.itinerary2.map((day, index) => (
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
              onChange={(e) => handleInputChange(e, index, "title2")}
              className="mb-4"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Activities"
              value={day.activities}
              onChange={(e) => handleInputChange(e, index, "activities2")}
              className="mb-2"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Accommodation"
              value={day.accommodation}
              onChange={(e) => handleInputChange(e, index, "accommodation2")}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              size="lg"
              label="Optional Tour Name"
              value={day.optional_tour_name}
              onChange={(e) =>
                handleInputChange(e, index, "optional_tour_name2")
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
                handleInputChange(e, index, "optional_tour_price2")
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
                handleInputChange(e, index, "optional_tour_description2")
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {/* add meals */}
            {day.meals.map((meal, mealIndex) => (
              <Input
                key={mealIndex}
                size="lg"
                label={`Meal ${mealIndex + 1}`}
                value={meal}
                onChange={(e) => {
                  const newItinerary2 = [...nileCruisesDetails.itinerary2];
                  newItinerary2[index].meals[mealIndex] = e.target.value;
                  setNileCruisesDetails({
                    ...nileCruisesDetails,
                    itinerary2: newItinerary2,
                  });
                }}
                className="mb-2"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            ))}
            <Button
              onClick={() => {
                const newItinerary2 = [...nileCruisesDetails.itinerary2];
                newItinerary2[index].meals.push("");
                setNileCruisesDetails({
                  ...nileCruisesDetails,
                  itinerary2: newItinerary2,
                });
              }}
              className="mt-2 bg-black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Meal
            </Button>

            {/* remove meal */}
            <Button
              onClick={() => {
                const newItinerary2 = [...nileCruisesDetails.itinerary2];
                newItinerary2[index].meals.pop();
                setNileCruisesDetails({
                  ...nileCruisesDetails,
                  itinerary2: newItinerary2,
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
          onClick={addDay2}
          className="mt-2 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Day
        </Button>
        {/* remove day */}
        <Button
          onClick={() => {
            const newItinerary2 = [...nileCruisesDetails.itinerary2];
            newItinerary2.pop();
            setNileCruisesDetails({
              ...nileCruisesDetails,
              itinerary2: newItinerary2,
            });
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
        {nileCruisesDetails.accommodationPlans.map((plan, planIndex) => (
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
          </div>
        ))}
        <Button
          onClick={addAccommodationPlan}
          className="mt-2 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Accommodation Plan
        </Button>
        {/* remove Accommodation Plan */}
        <Button
          onClick={() => {
            const newAccommodationPlans = [
              ...nileCruisesDetails.accommodationPlans,
            ];
            newAccommodationPlans.pop();
            setNileCruisesDetails({
              ...nileCruisesDetails,
              accommodationPlans: newAccommodationPlans,
            });
          }}
          className="mt-2 bg-red-500"
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
          {nileCruisesDetails.inclusions.map((inclusion, index) => (
            <Input
              key={index}
              size="lg"
              label={`Inclusion ${index + 1}`}
              value={inclusion.description}
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
          className="mt-2 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Inclusion
        </Button>
        {/* remove inclusion */}
        <Button
          onClick={() => {
            const newArray = [...nileCruisesDetails.inclusions];
            newArray.pop();
            setNileCruisesDetails({
              ...nileCruisesDetails,
              inclusions: newArray,
            });
          }}
          className="mt-2 bg-red-500"
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
          {nileCruisesDetails.exclusions.map((exclusion, index) => (
            <Input
              key={index}
              size="lg"
              label={`Exclusion ${index + 1}`}
              value={exclusion.description}
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
          className="mt-2 bg-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Exclusion
        </Button>
        {/* remove exclusion */}
        <Button
          onClick={() => {
            const newArray = [...nileCruisesDetails.exclusions];
            newArray.pop();
            setNileCruisesDetails({
              ...nileCruisesDetails,
              exclusions: newArray,
            });
          }}
          className="mt-2 bg-red-500"
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
          Create NileCruises
        </Button>
      </form>
    </Card>
  );
}
