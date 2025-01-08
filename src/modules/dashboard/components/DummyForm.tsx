import React, { useState } from "react";
import { supabase } from "@/api/supabase";

const CheckboxForm = () => {
  const [day, setDay] = useState(0);
  const [packageId, setPackageId] = useState(0);
  const [checkboxes, setCheckboxes] = useState({
    welcomeDrink: false,
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with values:", checkboxes);

    const selectedOptions = Object.entries(checkboxes)
      .filter(([_, value]) => value)
      .map(([key, _]) => {
        if (key === "welcomeDrink") return "Welcome Drink";
        return key.charAt(0).toUpperCase() + key.slice(1);
      });

    // console.log("Selected capitalized options:", selectedOptions);
    // const { data: all } = await supabase.from("itinerary").select("*");
    // console.log("All itinerary data:", all);

    try {
      const { data, error } = await supabase
        .from("itinerary")
        .update({ meals: selectedOptions })
        .eq("day", day)
        .eq("package_id", packageId);

      if (error) throw error;

      console.log("Supabase update successful:", data);
      const { data: meals } = await supabase.from("itinerary").select("meals");
      console.log(meals);
    } catch (error) {
      console.error("Error updating itinerary:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="number"
            name="package id"
            value={packageId}
            onChange={(e) => setPackageId(Number(e.target.value))}
            className="form-input border border-gray-300 rounded px-2 py-1"
          />
          <span>package id</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="number"
            name="day"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="form-input border border-gray-300 rounded px-2 py-1"
          />
          <span>Day</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="welcomeDrink"
            checked={checkboxes.welcomeDrink}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span>Welcome Drink</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="breakfast"
            checked={checkboxes.breakfast}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span>Breakfast</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="lunch"
            checked={checkboxes.lunch}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span>Lunch</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="dinner"
            checked={checkboxes.dinner}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span>Dinner</span>
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CheckboxForm;
