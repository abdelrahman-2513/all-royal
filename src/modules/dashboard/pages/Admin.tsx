
import { useState } from "react";
import BlockLevelButtonGroup from "../components/ButtonGroup";
import CreatePackage from "../components/CreatePackage";
import CreateNileCruise from "../components/CreateNileCruise";
import EditPackage from "../components/EditPackage";
import EditNileCruise from "../components/EditNileCruise";
// import EditNileCruise from "../components/EditNileCruise";

const Admin = () => {
  const [active, setActive] = useState<string>("");
  // const dispatch = useAppDispatch();
  // const active = useAppSelector((state) => state.dashboard.active);
  return (
    <>
      {/* <div onClick={() => {dispatch(setActive("asdasd"))}}></div> */}
      <BlockLevelButtonGroup active={active} setActive={setActive} />

      {active === "Add Package" && <CreatePackage />}
      {active === "Add Cruise" && <CreateNileCruise />}
      {active === "Edit Package" && <EditPackage />}
      {active === "Edit Cruise" && <EditNileCruise />}

      
    </>
  );
};
export default Admin;
