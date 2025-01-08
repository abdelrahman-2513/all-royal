import Packages from "./pages/Packages";

export default [
  {
    path: "/:lang/packages/:id?",
    element: <Packages />,
    name: "Packages",
  },
];
