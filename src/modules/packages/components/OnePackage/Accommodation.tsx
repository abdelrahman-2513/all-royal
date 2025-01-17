import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
//log the data to the console

const PriceAccommodation = ({ plans, hotels }: any) => {
  const { t } = useTranslation();

  // Function to get hotels for a specific plan
  const getHotelsForPlan = (planId: number) => {
    if (!hotels || !hotels.length) return [];
    return hotels.find((hotelGroup: any[]) => 
      hotelGroup.length > 0 && hotelGroup[0].accommodation_plan_id === planId
    ) || [];
  };

  return (
    <div className="max-w-full w-[90vw] mx-auto mt-8">
      <motion.h1
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-2xl font-bold text-[#0071cc]"
        >
          {t("Prices & Accommodation")}
        </motion.h1>
      <p className="my-4">{t("Please inquire for pricing over Christmas, New Year's, and Easter holidays.")}</p>

      {plans && plans.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
      {plans.map((plan: any, index: number) => {
        const planHotels = getHotelsForPlan(plan.id);

        return plan && plan.price_per_person_single_room && plan.price_per_person_single_room > 0 ? (
          <div key={index} className="border border-[#044d88] rounded-2xl overflow-hidden shadow-lg">
            {plan.name && (
              <h2 className={`text-lg font-bold text-white py-3 text-center tracking-wide ${plan.name.includes("Golden") ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : "bg-gradient-to-r from-blue-400 to-blue-600"}`}>
                {t(plan.name)}
              </h2>
            )}
            <div className="p-6 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold text-[#044d88]">Movenpick Media City</p>
                  <p className="text-sm text-gray-600 italic">Radamis I Nile Cruise</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{t("In Cairo")}</p>
                  <p className="text-sm text-gray-600">{t("In Aswan")}</p>
                </div>
              </div>
              <div className="space-y-6">
                {/* May - September Prices */}
                <div>
                  <h3 className="text-md font-semibold text-[#044d88] border-b pb-2 mb-2">{t("May - Sep")}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("Single Room")}</span>
                      <span className="text-blue-600 font-bold">USD {plan.price_per_person_single_room}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("Double Room")}</span>
                      <span className="text-blue-600 font-bold">USD {plan.price_per_person_double_room}</span>
                    </div>
                  </div>
                </div>

                {/* October - April Prices */}
                <div>
                  <h3 className="text-md font-semibold text-[#044d88] border-b pb-2 mb-2">{t("Oct - Apr")}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("Single Room")}</span>
                      <span className="text-blue-600 font-bold">USD {plan.price_per_person_single_room}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("Double Room")}</span>
                      <span className="text-blue-600 font-bold">USD {plan.price_per_person_double_room}</span>
                    </div>
                  </div>
                </div>
              </div>
              {planHotels && planHotels.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-semibold text-[#044d88] mb-2">{t("Hotels Included")}</h3>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {planHotels.map((hotel: any, hotelIndex: number) => (
                      hotel.name && (
                        <li key={hotelIndex}>{hotel.name}</li>
                      )
                    ))}
                  </ul>
                </div>
              )}
             
            </div>
          </div>
        ) : null;
      })}
    </div>
  ) : (
    <h1 className="text-center text-lg font-semibold text-gray-600">{t("No Pricing Available")}</h1>
  )}
    </div>
  );
};

export default PriceAccommodation;
