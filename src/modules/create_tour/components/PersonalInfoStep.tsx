import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
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

interface PersonalInfoStepProps {
  onSubmit: (personalInfo: PackageData["personalInfo"]) => void;
  packageData: PackageData;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  onSubmit,
  packageData,
}) => {
  const { t } = useTranslation();

  const [personalInfo, setPersonalInfo] = useState<PackageData["personalInfo"]>(
    {
      name: "",
      email: "",
      nationality: "",
      phoneNumber: "",
      adults: 0,
      children: 0,
      infants: 0,
      budget: "",
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [ip, setIp] = useState("");

  const openModal = () => {
    console.log("sent");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]:
        name === "adults" || name === "children" || name === "infants"
          ? parseInt(value)
          : value,
    }));
  };

  // useEffect to set interval for updating dateTime
  useEffect(() => {
    const intervalId = setInterval(updateDateTime, 30000); // 30000 ms = 30 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    getIp();
  }, []);

  const getIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();

      setIp(data.ip);
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  };

  // Function to update dateTime every 30 seconds
  const updateDateTime = () => {
    setDateTime(new Date().toLocaleString());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(personalInfo);
    emailjs
      .sendForm(
        import.meta.env.VITE_APP_SERVICE_ID as string,
        import.meta.env.VITE_APP_TEMPLATE_ID2 as string,
        e.target,
        import.meta.env.VITE_APP_USER_ID as string
      )
      .then(
        () => {
          {
            /* toast for email success mobile header and footer and landing padding web view */
          }
          console.log("SUCCESS!");
          openModal();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mb-8 mt-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {t("Tell us about the travelers")}{" "}
      </h2>

      {/* Name */}
      <label className="block mb-2 text-gray-700">{t("Name")}:</label>
      <input
        type="text"
        name="name"
        value={personalInfo.name}
        onChange={handleChange}
        placeholder={t("Enter your name")}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />

      {/* Email */}
      <label className="block mb-2 text-gray-700">{t("Email")}:</label>
      <input
        type="email"
        name="email"
        value={personalInfo.email}
        onChange={handleChange}
        placeholder={t("Enter your email")}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />

      {/* Nationality */}
      <label className="block mb-2 text-gray-700">{t("Nationality")}:</label>
      <input
        type="text"
        name="nationality"
        value={personalInfo.nationality}
        onChange={handleChange}
        placeholder={t("Enter your nationality")}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />

      {/* Phone Number */}
      <label className="block mb-2 text-gray-700">{t("Phone Number")}:</label>
      <input
        type="tel"
        name="phoneNumber"
        value={personalInfo.phoneNumber}
        onChange={handleChange}
        placeholder={t("Enter your phone number")}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />

      {/* Number of Adults */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <label className="block text-gray-700">{t("Adults")}:</label>
        <input
          type="number"
          name="adults"
          value={personalInfo.adults}
          onChange={handleChange}
          min="0"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Number of Children */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <label className="block text-gray-700">{t("Children")}:</label>
        <input
          type="number"
          name="children"
          value={personalInfo.children}
          onChange={handleChange}
          min="0"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Number of Infants */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <label className="block text-gray-700">
          {t("Infants (0 to 2 years)")}:
        </label>
        <input
          type="number"
          name="infants"
          value={personalInfo.infants}
          onChange={handleChange}
          min="0"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Budget */}
      <label className="block mb-2 text-gray-700">
        {t("Budget per person")}:
      </label>
      <select
        name="budget"
        value={personalInfo.budget}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md mb-6"
      >
        <option value="">{t("Select your budget")}</option>
        <option value="$1000 - $2000">$1000 - $2000</option>
        <option value="$2000 - $3000">$2000 - $3000</option>
        <option value="$3000 & up">{t("$3000 & up")}</option>
      </select>

      {!packageData.dateInfo.exactDates ? (
        <>
          <input
            type="hidden"
            name="month"
            value={packageData.dateInfo.month ?? ""}
          />
          <input
            type="hidden"
            name="duration"
            value={packageData.dateInfo.duration ?? ""}
          />
        </>
      ) : (
        <>
          <input
            type="hidden"
            name="arrival"
            value={packageData.dateInfo.toDate?.toISOString() ?? ""}
          />
          <input
            type="hidden"
            name="departure"
            value={packageData.dateInfo.fromDate?.toISOString() ?? ""}
          />
        </>
      )}
      <input
        type="hidden"
        name="destinations"
        value={packageData.destinations.join(" ")}
      />
      <input type="hidden" name="date_time" value={dateTime} />
      <input type="hidden" name="ip_address" value={ip} />
      <input type="hidden" name="url" value={window.location.href} />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        {t("Submit")}
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent />
      </Modal>
    </form>
  );
};
