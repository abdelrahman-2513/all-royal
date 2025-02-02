import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import { getCurrentLang } from "@/i18n";
import Header from "../../components/Header/Header";
import { getCurrentLang } from "../../i18n";
import Footer from "@/components/Footer/Footer";

const HomeLayout = () => {
  const nav = useNavigate();
  const { lang } = useParams<{ lang?: string }>();

  useEffect(() => {
    if (!lang) {
      const currentLang = getCurrentLang();
      nav(`/${currentLang}`);
    }
  }, [lang]);
  return (
    <div className="w-full font-sans">
      <Header />
      <div className="w-full bg-[#dfefff] ">
     

        <Outlet />
        
      </div>
      <Footer />
    </div>
  );
};
export default HomeLayout;
