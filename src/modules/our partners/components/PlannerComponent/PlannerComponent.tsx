import WavyLines from "@/components/WavyComponent/WavyComponent";
import "./PlannerBanner.css";

const PlannerBanner = () => {
  return (
    <div className="planner-banner">
        <WavyLines />
      <div className="planner-content">
        <h3 className="planner-title">Join us as a partner</h3>
        <button className="planner-button">Become a partner</button>
      </div>
        <WavyLines />
    </div>
  );
};

export default PlannerBanner;
