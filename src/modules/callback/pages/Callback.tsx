import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/Context";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { getSession } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await getSession();
      if (error) {
        console.error("Error exchanging code for session:", error);
        // Optionally navigate to an error page
        navigate("/authentication");
      } else {
        console.log("Session exchange successful");
        navigate("/dashboard");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <div></div>;
};

export default AuthCallback;
