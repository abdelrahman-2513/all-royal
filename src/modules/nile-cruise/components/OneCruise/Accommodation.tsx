import { useTranslation } from "react-i18next";

const PriceAccommodation = ({ plans }: any) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-full p-6 shadow-md">
      <h1 className="text-3xl font-bold mb-6">{t("Prices & Accommodation")}</h1>

      {plans && plans.length > 0 ? (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
          {plans.map((plan: any, index: number) => {
            return plan &&
              plan.price_per_person_single_room &&
              plan.price_per_person_single_room > 0 ? (
              <div key={index} className="border border-black/5 rounded-t-3xl">
                {plan.name && (
                  <h2 className="text-2xl font-bold h-[75px] bg-[#003755] text-white rounded-t-3xl flex justify-center items-center">
                    {plan.name}
                  </h2>
                )}
                <div className="rounded-lg shadow-lg px-6 pb-6">
                  {plan.price_per_person_single_room_winter &&
                    plan.price_per_person_double_room_winter && (
                      <div className="pb-4">
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4">
                            {t("MAY-SEP")}
                          </h3>
                          <div className="space-y-2">
                            {plan.price_per_person_single_room && (
                              <div className="flex justify-between">
                                <span>{t("Per Person in Single room")}</span>
                                <span className="text-orange-500 font-bold">
                                  {`${t("US")} ${plan.price_per_person_single_room}`}
                                </span>
                              </div>
                            )}
                            {plan.price_per_person_double_room && (
                              <div className="flex justify-between">
                                <span>{t("Per Person in Double room")}</span>
                                <span className="text-orange-500 font-bold">
                                  {`${t("US")} ${plan.price_per_person_double_room}`}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4">
                            {t("OCT-APR")}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>{t("Per Person in Single room")}</span>
                              <span className="text-orange-500 font-bold">
                                {`${t("US")} ${plan.price_per_person_single_room}`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t("Per Person in Double room")}</span>
                              <span className="text-orange-500 font-bold">
                                {`${t("US")} ${plan.price_per_person_double_room}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  {!plan.price_per_person_single_room_winter &&
                    !plan.price_per_person_double_room_winter && (
                      <div className="max-w-sm p-6 rounded-md">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                          {t("Prices")}
                        </h2>
                        <p className="text-md text-gray-600 mb-6">
                          {t("Price per Person")}
                        </p>
                        {plan.price_per_person_double_room && (
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-gray-700">
                              {t("Per Person in Double Room")}
                            </span>
                            <span className="text-lg font-bold text-orange-500">
                              {`${t("US")} ${plan.price_per_person_double_room}`}
                            </span>
                          </div>
                        )}
                        {plan.price_per_person_single_room && (
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-gray-700">
                              {t("Per Person in Single Room")}
                            </span>
                            <span className="text-lg font-bold text-orange-500">
                              {`${t("US")} ${plan.price_per_person_single_room}`}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            ) : (
              ""
            );
          })}
        </div>
      ) : (
        <h1 className="ml-4">{t("No Pricing Available")}</h1>
      )}
    </div>
  );
};

export default PriceAccommodation;
