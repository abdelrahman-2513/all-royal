import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface PackageData {
  destinations: string[];
  dateInfo: {
    exactDates: boolean;
    fromDate?: Date;
    toDate?: Date;
    month?: string;
    duration?: string;
  };
  personalInfo: {
    name: string;
    email: string;
    nationality: string;
    phoneNumber: string;
    adults: number;
    children: number;
    infants: number;
    budget: string;
  };
}
interface DateStepProps {
  onSubmit: (dateInfo: PackageData["dateInfo"]) => void;
  onBack: () => void;
}

export const DateStep: React.FC<DateStepProps> = ({ onSubmit, onBack }) => {
  const { t } = useTranslation();

  const [exactDates, setExactDates] = useState(true);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [month, setMonth] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      exactDates,
      fromDate,
      toDate,
      month,
      duration,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        When will you travel?
      </h2>
      <div className="mb-6">
        <label className="flex items-center mb-4">
          <input
            type="radio"
            checked={exactDates}
            onChange={() => setExactDates(true)}
            className="mr-2"
          />
          {t("I know the exact dates of my trip")}
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={!exactDates}
            onChange={() => setExactDates(false)}
            className="mr-2"
          />
          {t("I have approximate dates")}
        </label>
      </div>

      {exactDates ? (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className="flex flex-col">
            <span className="mb-2 text-gray-700">{t("Departure Date")}:</span>
            <input
              type="date"
              onChange={(e) => setFromDate(new Date(e.target.value))}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-gray-700">{t("Return Date")}:</span>
            <input
              type="date"
              onChange={(e) => setToDate(new Date(e.target.value))}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className="flex flex-col">
            <span className="mb-2 text-gray-700">{t("Which month?")}</span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">{t("Select a month")}</option>
              {[
                t("January"),
                t("February"),
                t("March"),
                t("April"),
                t("May"),
                t("June"),
                t("July"),
                t("August"),
                t("September"),
                t("October"),
                t("November"),
                t("December"),
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-gray-700">{t("How long (approx)")}?</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">{t("Select duration")}</option>
              <option value="suggestion">{t("Give me a suggestion")}</option>
              <option value="less than a week">{t("Less than a week")}</option>
              <option value="1 week">1 {t("week")}</option>
              <option value="2 weeks">2 {t("weeks")}</option>
              <option value="3 weeks">3 {t("weeks")}</option>
              <option value="more than 3 weeks">{t("More than 3 weeks")}</option>
            </select>
          </label>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray text-gray-700 py-2 px-6 rounded-md"
        >
          {t("Back")}
        </button>
        <button
          type="submit"
          className="bg-[#044d88] text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          {t("Next Step")}
        </button>
      </div>
    </form>
  );
};
