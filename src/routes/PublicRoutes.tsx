import { createBrowserRouter } from "react-router-dom";
// public routes

import homeRoutes from "../modules/home/routes";
import packagesRoutes from "../modules/packages/routes";
import createRoutes from "@/modules/create_tour/routes";
import nileCruisesRoutes from "@/modules/nile-cruise/routes";
import aboutRoutes from "@/modules/about/routes";
import ourPartnersRoutes from "@/modules/our partners/routes";
import becomeOurPartner from "@/modules/become-our-partner/routes";

import whyBookWithUsRoutes from "@/modules/whybookwithus/routes";
import termsAndConditionsRoutes from "@/modules/terms-and-conditions/routes";
import privacyPolicyRoutes from "@/modules/privacy-policy/routes";
import globalCodeOfEthicsRoutes from "@/modules/global-code-of-ethics-for-tourism/routes";
// admin routes
import AdminLayout from "@/layouts/admin";
import adminRoutes from "@/modules/admin/routes";
// private routes
import AuthRoute from "@/routes/AuthRoutes";
import dashboardRoutes from "@/modules/dashboard/routes";
import HomeLayout from "@/layouts/home/homeLayout";

const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [...homeRoutes],
  },
  {
    path: "/:lang/packages",
    element: <HomeLayout />,
    children: [...packagesRoutes],
  },
  {
    path: "/:lang/create",
    element: <HomeLayout />,
    children: [...createRoutes],
  },
  {
    path: "/:lang/about",
    element: <HomeLayout />,
    children: [...aboutRoutes],
  },
 
  {
    path: "/:lang/our-partners",
    element: <HomeLayout />,
    children: [...ourPartnersRoutes],
  },
  {
    path: "/:lang/become-our-partner",
    element: <HomeLayout />,
    children: [...becomeOurPartner],
  },
  {
    path: "/:lang/whyBookWithUs",
    element: <HomeLayout />,
    children: [...whyBookWithUsRoutes],
  },
  {
    path: "/:lang/nile-cruises",
    element: <HomeLayout />,
    children: [...nileCruisesRoutes],
  },
  {
    path: "/:lang/terms-and-conditions",
    element: <HomeLayout />,
    children: [...termsAndConditionsRoutes],
  },
  {
    path: "/:lang/privacy-policy",
    element: <HomeLayout />,
    children: [...privacyPolicyRoutes],
  },
  {
    path: "/:lang/global-code-of-ethics",
    element: <HomeLayout />,
    children: [...globalCodeOfEthicsRoutes],
  },
  {
    path: "/login",
    element: <AdminLayout />,
    children: [...adminRoutes],
  },
  {
    path: "/:lang/dashboard",
    element: <AuthRoute />,
    children: [...dashboardRoutes],
  },
]);

export default publicRouter;
