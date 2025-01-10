import Galery2 from "./Try2";
// import Galery5 from "./Try5";
import { useTranslation } from "react-i18next";

const Gallery = ({ pack }: any) => {
  const { t } = useTranslation();

  const urls: string[] = pack.images ? pack.images : [];
  return (
     <div className="md:w-2/3 space-y-4 max-w-full mx-auto text-center">
      {pack && pack.package_name && (
        <h1 className="text-3xl font-bold text-blue-900 capitalize">
          {pack.package_name}
        </h1>
      )}

      {/* Main Image and Gallery */}
      <div className="relative">
        <Galery2 urls={urls} />
      </div>

      {/* Overview Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-blue-900">{t("Overview")}</h2>
        <div className="flex md:flex-row flex-col justify-between items-center mt-4 gap-4">
          <div className="text-center mt-2">
            <div className="text-3xl text-gray-700 mb-2">⌛</div>
            {pack && pack.days && (
              <p className="text-sm font-medium my-1 capitalize">
                {pack.days +
                  ` ${t("Days")} / ` +
                  pack.nights +
                  ` ${t("Nights")}`}
              </p>
            )}
          </div>
          {pack.country && pack.cities && pack.cities.length > 0 && (
            <div className="text-center">
              <div className="text-3xl text-gray-700 mb-2">🌍</div>
              <p className="text-sm font-medium my-1">{pack.countries.length + ` ${t("Country")}`}</p>
              <p className="text-gray-500 text-sm my-1">
                {pack.cities.length + ` ${t("Cities")}`}
              </p>
            </div>
          )}
          <div className="text-center mb-3">
            <div className="text-3xl text-gray-700 mb-2">👥</div>
            <p className="max-w-full md:max-w-[200px] text-sm font-medium my-1">
              {/* Small Group Tour */}
              {pack.tour_type}
            </p>
            {/* <p className="text-gray-500 text-sm my-1">12 Persons</p> */}
          </div>
          <div className="text-center mb-3">
            <div className="text-3xl text-gray-700 mb-2">📅</div>
            <p className="text-sm font-medium my-1">
              {/* Every Thursday from Luxor */}
              {pack.availability !== "" ? pack.availability : t("Everyday")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gallery;
