import { ButtonGroup, Button } from "@material-tailwind/react";

const BlockLevelButtonGroup = ({setActive, active}: any) => {
  return (
    <ButtonGroup
      className="flex"
      fullWidth
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      color="black"
    >
      <Button
        className={`${active === "Edit Package" ? "bg-black/50" : "bg-black"}`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        color="black"
        onClick={() => setActive("Edit Package")}
      >
        <div className="flex items-center justify-center text-white">
          Edit Package
        </div>
      </Button>
      <Button
        className={`${active === "Edit Cruise" ? "bg-black/50" : "bg-black"}`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onClick={() => setActive("Edit Cruise")}
      >
        <div className="flex items-center justify-center text-white">
          Edit Nile Cruises
        </div>
      </Button>
      <Button
        className={`${active === "Add Package" ? "bg-black/50" : "bg-black"}`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onClick={() => setActive("Add Package")}
      >
        <div className="flex items-center justify-center text-white">
          Add New Package
        </div>
      </Button>
      <Button
        className={`${active === "Add Cruise" ? "bg-black/50" : "bg-black"}`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onClick={() => setActive("Add Cruise")}
      >
        <div className="flex items-center justify-center text-white">
          Add New Nile Cruise
        </div>
      </Button>
    </ButtonGroup>
  );
};
export default BlockLevelButtonGroup;
