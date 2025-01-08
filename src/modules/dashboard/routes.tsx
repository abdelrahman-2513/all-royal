import Admin from "./pages/Admin";

export default [
  {
    path: "/:lang/dashboard",
    element: <Admin />,
    name: "admin-dashboard",
  },
];
