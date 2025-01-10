import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import OnePackage from "../components/OnePackage/OnePackage";
import AllPackages from "../components/AllPackages/AllPackages";

const Packages = () => {
  const { id } = useParams();
  const packages = useAppSelector((state) => state.package.package);
  // console.log(packages);
  if (packages && packages.length && id) {
    const requestedPackage = packages.find((p) => p.id == id);

    return <OnePackage selectedId={id} pack={requestedPackage}  packages={packages} />;
  } else {
    return <AllPackages packages={packages} />;
  }
};
export default Packages;
