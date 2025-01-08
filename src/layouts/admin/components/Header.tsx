import { NAV_ITEMS } from "../constants/index";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/Context";
import { useState } from "react";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(
    localStorage.getItem("loggedIn")
      ? localStorage.getItem("loggedIn") === "true"
        ? true
        : false
      : null
  );
  // const [session, setSession] = useState<any>(null);
  // const { signOut, getSession } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const { data } = await getSession();
  //       if (data.session !== null) {
  //         setLoggedIn(true);
  //         setSession(data);
  //       } else {
  //         setLoggedIn(false);
  //         setSession(null);
  //       }
  //     } catch (error) {
  //       console.error("Error checking session:", error);
  //       setLoggedIn(false);
  //       setSession(null);
  //     }
  //   };

  //   checkSession();
  // }, [getSession, signOut]);

  // const handleClick = async (item: any) => {
  //   if (session && session.session !== null && loggedIn) {
  //     await signOut();
  //     setLoggedIn(false);
  //     navigate("/login");
  //   } else {
  //     console.log(session);
  //     console.log("navigating to", item.path);
  //     return navigate(item.path);
  //   }
  // };
  const handleClick = () => {
    if (loggedIn) {
      localStorage.setItem("loggedIn", "false");
      setLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`sticky top-0 z-[10] p-4 bg-black backdrop-blur-lg flex items-center border-b flex-row justify-between h-16`}
    >
      {/* Logo Section */}
      <section className="flex p-2 items-center">
        <div className="text-white text-xl font-bold">Dashboard</div>
      </section>

      {/* Navigation Section */}
      <section className="flex">
        {NAV_ITEMS.map((item: any) =>
          item.name === "login" ? (
            <div
              key={item.name}
              className="cursor-pointer p-1 md:p-4 flex items-center text-white hover:text-yellow-400 transition-colors duration-300"
              onClick={() => handleClick()}
            >
              {loggedIn ? "logout" : "login"}
              <span className="text-yellow-400 text-lg px-2 font-extrabold">
                .
              </span>
            </div>
          ) : null
        )}
      </section>
    </div>
  );
};

export default Header;
