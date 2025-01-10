import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import OneCruise from "../components/OneCruise/OneCruise";
import AllNileCruises from "../components/AllCruises/AllCruises";

const Packages = () => {
  const { id } = useParams();
  const nileCruises = useAppSelector((state) => state.nileCruise.nileCruise);


  if (nileCruises && nileCruises.length && id) {
    const requestedPackage = nileCruises.find((p) => p.id == id);

    return <OneCruise selectedId={id} pack={requestedPackage} packages={nileCruises} />;
  } else {
    return <AllNileCruises packages={nileCruises} />;
  }
};
export default Packages;
