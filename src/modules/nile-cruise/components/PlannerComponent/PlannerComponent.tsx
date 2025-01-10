import WavyLines from "@/components/WavyComponent/WavyComponent";
import "./PlannerBanner.css";

const PlannerBanner = () => {
  return (
    <div className="planner-banner">
        <WavyLines />
      <div className="planner-content">
        <h3 className="planner-title">Want To Be Your Own Planner?</h3>
        <button className="planner-button">Customize Your Trip</button>
      </div>
        <WavyLines />
    </div>
  );
};

export default PlannerBanner;
