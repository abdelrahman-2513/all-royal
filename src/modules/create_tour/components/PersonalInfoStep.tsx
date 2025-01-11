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

  useEffect(() => {
    const intervalId = setInterval(updateDateTime, 30000);
    return () => clearInterval(intervalId);
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
          openModal();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="pb-5">
      <h2 className="text-xl font-semibold text-center text-[#06284b] mb-6">
        {t("Tell Us About The Travelers")}
      </h2>
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-blue-50 rounded-lg shadow-lg border border-blue-200"
    >
      

      {/* Title & Name */}
      <div className="flex flex-row gap-4 mb-4">
       <div className="w-1/4">
    <label htmlFor=""> Title</label>
        <input
          type="text"
          name="title"
          placeholder={t("Title")}
          className="w-full p-2 border border-[#0071cc] rounded-md focus:outline-none"
          />
          </div>
          <div className="w-3/4">
        <label htmlFor=""> Full Name</label>
        <input
          type="text"
          name="name"
          value={personalInfo.name}
          onChange={handleChange}
          placeholder={t("Type Full Name")}
          required
          className="w-full p-2 border border-[#0071cc] rounded-md focus:outline-none"
          />
          </div>
      </div>

      {/* E-Mail */}
      <div>
<label htmlFor="">Email</label>
      <input
        type="email"
        name="email"
        value={personalInfo.email}
        onChange={handleChange}
        placeholder={t("Enter Your E-Mail")}
        required
        className="w-full mb-4 p-2 border border-[#0071cc] rounded-md focus:outline-none"
        />
        </div>

      {/* Nationality */}
      <div>
<label>Nationality</label>
      <input
        type="text"
        name="nationality"
        value={personalInfo.nationality}
        onChange={handleChange}
        placeholder={t("Nationality")}
        
        required
        className="w-full mb-4 p-2 border border-[#0071cc] rounded-md focus:outline-none"
        />
        </div>

      {/* Country Code & Mobile Number */}
      <div className="flex flex-row gap-4 mb-4">
        <div className="w-1/4">
<label>Country</label>
        <input
          type="text"
          value="+20"
          disabled
          className="w-full p-2 border border-[#0071cc] rounded-md bg-gray-100"
          />
          </div>
          <div className="w-3/4">
<label htmlFor="">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={personalInfo.phoneNumber}
          onChange={handleChange}
          placeholder={t("Phone Number")}
          required
          className="w-full p-2 border border-[#0071cc] rounded-md"
          />
          </div>
      </div>

      {/* Number Inputs */}
      {[
  { label: "Number Of Adults (+12 Years)", name: "adults" },
  { label: "Number Of Children (6 To 11.99 Years)", name: "children" },
  { label: "Number Of Children (2 To 5.99 Years)", name: "children" },
  { label: "Number Of Infants (0 To 2 Years)", name: "infants" },
].map(({ label, name }) => (
  <div key={name} className="flex items-center justify-between mb-4">
    <span>{t(label)}</span>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() =>
          setPersonalInfo((prev) => ({
            ...prev,
            [name]: Math.max(0, prev[name as "adults" | "children" | "infants"] - 1),
          }))
        }
        className="w-8 h-8 bg-gray-200 rounded-md"
      >
        -
      </button>
      <span>{personalInfo[name as "adults" | "children" | "infants"]}</span>
      <button
        type="button"
        onClick={() =>
          setPersonalInfo((prev) => ({
            ...prev,
            [name]: prev[name as "adults" | "children" | "infants"] + 1,
          }))
        }
        className="w-8 h-8 bg-gray-200 rounded-md"
      >
        +
      </button>
    </div>
  </div>
))}


      {/* Budget */}
      <div>
      <label htmlFor="">Budget</label>
      <select
        name="budget"
        value={personalInfo.budget}
        onChange={handleChange}
        required
        className="w-full mb-6 p-2 border border-[#0071cc] rounded-md"
      >
        <option value="">{t("Budget Per Person")}</option>
        <option value="$1000">$1000</option>
        <option value="$2000">$2000</option>
        <option value="$3000 & up">{t("$3000 & up")}</option>
      </select>
      </div>

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
        className="w-[200px] mx-auto block bg-[#044d88] text-white py-2 rounded-md hover:bg-blue-900 transition"
      >
        {t("Submit")}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent />
      </Modal>
    </form>
    </div>

  );
};
