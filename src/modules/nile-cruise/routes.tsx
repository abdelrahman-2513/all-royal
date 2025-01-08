import NileCruise from "./pages/NileCruise";

export default [
  {
    path: "/:lang/nile-cruises/:id?",
    element: <NileCruise />,
    name: "NileCruise",
  },
];
