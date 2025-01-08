import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="h-4"></div>
      <Outlet />
    </div>
  );
};
export default AdminLayout;
