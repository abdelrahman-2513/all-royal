import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "@/hooks/Context";
import AdminLayout from "@/layouts/admin";
const AuthRoutes: React.FC = () => {
  const location = useLocation();
  // const { getSession } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    localStorage.getItem("loggedIn")
      ? localStorage.getItem("loggedIn") === "true"
        ? true
        : false
      : null
  );
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      if (localStorage.getItem("loggedIn") === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);
  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       console.log("Checking session...");
  //       const { data } = await getSession();
  //       if (data.session !== null) {
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking session:", error);
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   checkSession();
  // }, [getSession]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-emerald-400">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-xl font-semibold">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <AdminLayout />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }
};

export default AuthRoutes;
