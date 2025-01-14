import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { GiSandsOfTime } from "react-icons/gi";
import { FaEarthAfrica, FaSun } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { FaMoon, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useLanguageAwareNavigate } from "@/i18n";
import { MoonIcon, SunDim } from "lucide-react";

export function CardDefault({ p }: any) {
  const { t } = useTranslation();
  const navigate = useLanguageAwareNavigate();

  const dummyImageUrl =
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

    console.log(p);
  return (
    <Card className="w-full flex flex-col w-[260px] border border-[#0071cc] rounded-xl shadow-lg h-[450px] justify-between"  placeholder={undefined}
    onPointerEnterCapture={undefined}
    onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} className="pb-2 shadow-none flex flex-col gap-2" placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <Typography variant="h6" className="text-md font-semibold text-[#0c2340] h-[20px] text-wrap overflow-hidden"  placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
            {p.package_name || p.NileCruisesName || "MS Chateau Lafayette Nile Cruise"}
          </Typography>
        <div className="flex justify-between items-center" >
        <Typography variant="small" color="gray"  placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          {t("Starting")} ${p.priceFrom || "10"} USD
        </Typography>
        <div className="flex items-center text-yellow-500">
            <FaStar />
            <Typography className="ml-1 text-sm font-medium"  placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
              {p.rating || "5.0"} 
            </Typography>
          </div>
        </div>
        <img
          src={p.images && p.images.length > 0 ? p.images[0] : dummyImageUrl}
          alt={p.package_name || "Cruise Image"}
          className="w-full h-[170px] object-cover rounded-md"
        />
      </CardHeader>

      <CardBody className="p-4 flex flex-col gap-3"  placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
        

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2 text-[12px]">
            <FaEarthAfrica className="text-[14px]" /> 
            <span className="h-[20px] text-wrap overflow-hidden w-[80%]">

            {p.countries?.length || 1} {t("Country")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <GrGroup className="text-[14px]"/> 
            <span className="h-[20px] text-wrap overflow-hidden w-[80%]">

            {p.cities?.length || 3} {t("Cities")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <FaSun className="text-[14px]"/> 
            <span className="h-[20px] text-wrap overflow-hidden w-[80%]">

            {p.days || 4} {t("Days")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <FaMoon className="text-[14px]" /> 
            <span className="h-[20px] text-wrap overflow-hidden w-[80%]">

            {p.days-1 || 4} {t("Nights")}
            </span>
          </div>
          <div className="flex items-center  text-[12px] gap-2">
          <GrGroup className="text-[14px]"/> 
          <span className="h-[20px] text-wrap overflow-hidden w-[80%]">

          {p.tour_type?.includes("(")?p.tour_type?.split("(")[0]: p.tour_type ||"Adventure"}
          </span>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <SlCalender className="text-[14px]"/> <span className="h-[20px] text-wrap overflow-hidden w-[80%]">{p.availability || t("Every Thu & Mon")}</span>
          </div>
          

        </div>

        {/* <Typography variant="small" color="gray"  placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <GrGroup /> {p.tour_type ||""}
        </Typography> */}
      </CardBody>

      <CardFooter className="pt-0 pb-4 px-4"  placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
        <Button
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="bg-white border border-[#0071cc] text-[#0071cc] hover:text-white hover:bg-[#0071cc]"
          onClick={() => {
            if (p.package_name) {
              navigate(`/packages/${p.id}`);
            } else {
              navigate(`/nile-cruises/${p.id}`);
            }
          }}
        >
          {t("Know More")}
        </Button>
      </CardFooter>
    </Card>
  );
}
