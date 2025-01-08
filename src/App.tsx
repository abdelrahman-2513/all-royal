import { RouterProvider } from "react-router-dom";
// import NewComponent from "./components/NewComponent";
import publicRouter from "./routes/PublicRoutes";
// import privateRouter from "./routes/PrivateRoutes";

function App() {
  // if (window.location.pathname.includes("/admin")) {
  //   return <RouterProvider router={privateRouter} />;
  // }
  return <RouterProvider router={publicRouter} />;
}

export default App;
