import WavyLines from "@/components/WavyComponent/WavyComponent";
import "./PlannerBanner.css";
import { useLanguageAwareNavigate } from "@/i18n";

const PlannerBanner = () => {
  const navigate = useLanguageAwareNavigate();
  return (
    <div className="planner-banner">
        <WavyLines />
      <div className="planner-content">
        <h3 className="planner-title">Want To Be Your Own Planner?</h3>
        <button className="planner-button" onClick={() => {navigate("/create")}}>Customize Your Trip</button>
      </div>
        <WavyLines />
    </div>
  );
};

export default PlannerBanner;
