import { useState } from "react";
import { DestinationStep } from "../components/DestinationStep";
import { DateStep } from "../components/DateStep";
import { PersonalInfoStep } from "../components/PersonalInfoStep";
import {motion} from "framer-motion";
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

function Create() {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  const [packageData, setPackageData] = useState<PackageData>({
    destinations: [],
    dateInfo: { exactDates: true },
    personalInfo: {
      name: "",
      email: "",
      nationality: "",
      phoneNumber: "",
      adults: 0,
      children: 0,
      infants: 0,
      budget: "",
    },
  });

  const handleDestinationSubmit = (destinations: string[]) => {
    setPackageData({ ...packageData, destinations });
    setStep(2);
  };

  const handleDateSubmit = (dateInfo: PackageData["dateInfo"]) => {
    setPackageData({ ...packageData, dateInfo });
    setStep(3);
  };

  const handlePersonalInfoSubmit = (
    personalInfo: PackageData["personalInfo"]
  ) => {
    const finalPackageData = { ...packageData, personalInfo };
    setPackageData(finalPackageData);
    console.log("Final Package Data:", finalPackageData);
    // Here you can send the data to your backend or perform any other action
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-full min-h-[70vh] bg-[#dfefff]">
      <div className="w-[90vw] mx-auto">
      <div className="flex justify-between items-center ">
        <motion.h1
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-2xl mt-5 px-5 font-bold text-[#0071cc]"
        >
          {t("Create Your Tour")}
        </motion.h1>
        </div>
       

      {step === 1 && <DestinationStep onSubmit={handleDestinationSubmit} />}
      {step === 2 && (
        <DateStep onSubmit={handleDateSubmit} onBack={handleBack} />
      )}
      {step === 3 && <PersonalInfoStep packageData={packageData} onSubmit={handlePersonalInfoSubmit} />}
      </div>
    </div>
  );
}
export default Create;
