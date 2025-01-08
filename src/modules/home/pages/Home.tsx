import Hero from "../components/Hero";
import Packages from "../components/Packages";
import Relaxation from "../components/Relaxation";
import NileCruise from "../components/NileCruise";
import { useAppSelector } from "@/hooks/hooks";
import PopularDestinations from "../components/Destinations";
import { FAQ, OurPartners, WhyBookWithUs } from "../components/Parteners";

const Home = () => {
  const nileCruisesArr = useAppSelector((state) => state.nileCruise.nileCruise);
  const packages = useAppSelector((state) => state.package.package);
  const relaxationArr = packages.filter(
    (pkg) => pkg.package_type === "Relaxation" || "Relajación"
  );

  const bestSellingArr = packages.filter(
    (pkg) =>
      pkg.package_type === "Best Selling Product" || "Producto más vendido"
  );

  return (
    <div className="flex justify-center items-center max-w-full flex-col gap-4 overflow-hidden bg-[#dfefff]">
      <Hero />
      <PopularDestinations />
      <Packages items={bestSellingArr} />
      {/* <OurPartners /> */}
      <WhyBookWithUs />
      <FAQ />
      {/* <Relaxation items={relaxationArr} />
      <NileCruise cruises={nileCruisesArr} /> */}
    </div>
  );
};
export default Home;
