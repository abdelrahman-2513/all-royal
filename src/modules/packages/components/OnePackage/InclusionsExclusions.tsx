import { FaCheck, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const IncExc = ({ inclusions, exclusions }: any) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-full">
        {/* Included Section */}
        {inclusions && inclusions.length > 0 && (
          <div>
            <h2 className="font-bold text-xl mb-4">{t("Included")}</h2>
            <ul className="space-y-3">
              {inclusions.map((inc: any, index: number) => (
                <li key={index} className="flex items-start">
                  <FaCheck className="text-orange-400 mt-1 mr-2" />
                  <span>{inc.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Excluded Section */}
        {exclusions && exclusions.length > 0 && (
          <div>
            <h2 className="font-bold text-xl mb-4">{t("Excluded")}</h2>
            <ul className="space-y-3">
              {exclusions.map((exc: any, index: number) => (
                <li key={index} className="flex items-start">
                  <FaTimes className="text-red-400 mt-1 mr-2" />
                  <span>{exc.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default IncExc;
