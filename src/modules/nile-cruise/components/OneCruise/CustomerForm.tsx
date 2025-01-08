import countries from "@/constants/countries";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import { useTranslation } from "react-i18next";

const CustomerForm = ({ packageName, lowerPrices, plans, selectedId }: any) => {
  const { t } = useTranslation();

  const [adults, setAdults] = useState(0);
  const [children1, setChildren1] = useState(0);
  const [children2, setChildren2] = useState(0);
  const [infants, setInfants] = useState(0);
  const [ip, setIp] = useState("");
  const packageId = selectedId;
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const openModal = () => {
    console.log("sent");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAdultsChange = (amount: number) =>
    setAdults((prev) => Math.max(0, prev + amount));
  const handleChildrenChange1 = (amount: number) =>
    setChildren1((prev) => Math.max(0, prev + amount));
  const handleChildrenChange2 = (amount: number) =>
    setChildren2((prev) => Math.max(0, prev + amount));
  const handleInfantsChange = (amount: number) =>
    setInfants((prev) => Math.max(0, prev + amount));

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

  useEffect(() => {
    const intervalId = setInterval(updateDateTime, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getIp();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_SERVICE_ID as string,
        import.meta.env.VITE_APP_TEMPLATE_ID as string,
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
    <div className="max-w-full  md:w-1/3 bg-white shadow-md rounded-md p-6">
      {plans && plans.length > 0 && lowerPrices && lowerPrices.length > 0 && (
        <h2 className="text-xl font-bold text-orange-600 mb-4">
          {t("From US") + " "} ${Math.min(...lowerPrices)}
        </h2>
      )}

      {/* Booking Form */}
      <form
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
        className="space-y-4"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col w-full md:w-1/4">
            <label htmlFor="title" className="text-sm font-semibold">
              {t("Title")}
            </label>
            <select name="title" id="title" className="border p-2 h-[39.5px]">
              <option value="Title">{t("Title")}</option>
              <option value="Mr">{t("Mr")}</option>
              <option value="Ms">{t("Ms")}</option>
              <option value="Mrs">{t("Mrs")}</option>
            </select>
          </div>
          {/* Name Input */}
          <div className="flex flex-col w-full md:w-3/4">
            <label htmlFor="name" className="text-sm font-semibold">
              {t("Name")}
            </label>
            <input
              required
              type="text"
              id="name"
              name="from_name"
              className="border p-2 h-[39.5px] md:w-full"
              placeholder={t("Enter your name")}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">
            {t("Email") + " *"}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="nationality" className="text-sm font-semibold">
            {t("Nationality") + " *"}
          </label>
          <select
            required
            name="nationality"
            id="nationality"
            className="border p-2"
          >
            <option>{t("Select your Nationality")}</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobile" className="text-sm font-semibold">
            {t("Mobile") + " *"}
          </label>
          <input
            required
            type="tel"
            id="mobile"
            name="mobile"
            className="border p-2"
            placeholder={t("Mobile") + " *"}
          />
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-sm font-semibold" htmlFor="departure">
              {t("From") + " *"}
            </label>
            <input
              required
              id="departure"
              name="departure"
              type="date"
              className="border p-2 w-full"
              placeholder={t("From") + " *"}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-sm font-semibold" htmlFor="arrival">
              {t("To") + " *"}
            </label>
            <input
              required
              id="arrival"
              name="arrival"
              type="date"
              className="border p-2 w-full"
              placeholder={t("To") + " *"}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">
            {t("No. of Adults (+12 years)")}
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleAdultsChange(-1)}
            >
              -
            </button>
            <span>{adults}</span>
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleAdultsChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">
            {t("No. of Children (2 to 5.99 years)")}
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleChildrenChange1(-1)}
            >
              -
            </button>
            <span>{children1}</span>
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleChildrenChange1(1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">
            {t("No. of Children (6 to 11.99 years)")}
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleChildrenChange2(-1)}
            >
              -
            </button>
            <span>{children2}</span>
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleChildrenChange2(1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">
            {t("No. of Infants (0 to 2 years)")}
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleInfantsChange(-1)}
            >
              -
            </button>
            <span>{infants}</span>
            <button
              type="button"
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => handleInfantsChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <textarea
          name="message"
          className="border rounded-md p-2 w-full"
          placeholder={t("Please advise your tour requirements")}
        ></textarea>

        {/* Hidden inputs for package_id, adults, children, infants, url, ip_address, date_time */}
        <input type="hidden" name="package_id" value={packageId} />
        <input type="hidden" name="package_name" value={packageName} />
        <input type="hidden" name="adults" value={adults} />
        <input type="hidden" name="children1" value={children1} />
        <input type="hidden" name="children2" value={children2} />
        <input type="hidden" name="infants" value={infants} />
        <input type="hidden" name="url" value={window.location.href} />
        <input type="hidden" name="ip_address" value={ip} />
        <input type="hidden" name="date_time" value={dateTime} />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md w-full"
        >
          {t("Submit")}
        </button>
      </form>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent />
      </Modal>
    </div>
  );
};
export default CustomerForm;
