import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
import { GiSandsOfTime } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { useLanguageAwareNavigate } from "@/i18n";

export function CardDefault({ p }: any) {
  const { t } = useTranslation();

  const dummyImageUrl: string =
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  const navigate = useLanguageAwareNavigate();
  // console.log(p.NileCruisesName);
  return (
    <Card
      className="w-full flex flex-col justify-between shadow-lg object-cover md:h-[490px]"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        color="blue-gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <img
          src={p.images && p.images.length > 0 ? p.images[0] : dummyImageUrl}
          alt="ui/ux review check"
          className="object-cover w-full h-[170px] aspect-ratio"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="flex flex-col justify-between"
      >
        <div className="mb-3 flex items-center justify-between">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            title={p.package_name || p.NileCruisesName}
          >
            {/* Wooden House, Florida */}
            {p.package_name || p.NileCruisesName || ""}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            5.0
          </Typography>
        </div>
        <Typography
          color="gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {p.NileCruisesName
            ? p.days +
              ` ${t("Days")} / ` +
              p.nights +
              ` ${t("Nights")} ${t("OR")} ` +
              p.days2 +
              ` ${t("Days")} / ` +
              p.nights2 +
              ` ${t("Nights")}`
            : p.days + ` ${t("Days")} / ` + p.nights + ` ${t("Nights")}`}
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          <Tooltip
            content={
              p.NileCruisesName
                ? p.days +
                  ` ${t("Days")} / ` +
                  p.nights +
                  ` ${t("Nights")} ${t("OR")} ` +
                  p.days2 +
                  ` ${t("Days")} / ` +
                  p.nights2 +
                  ` ${t("Nights")}`
                : p.days + ` ${t("Days")} / ` + p.nights + ` ${t("Nights")}`
            }
          >
            <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              {/* ⌛ */}
              <GiSandsOfTime />
            </span>
          </Tooltip>
          <Tooltip
            content={
              p.countries && p.cities
                ? p.countries.length +
                  " Country " +
                  p.cities.length +
                  ` ${t("Cities")}`
                : "1" + " Country " + p.cities.length + ` ${t("Cities")}`
            }
          >
            <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              {/* 🌍 */}
              <FaEarthAfrica />
            </span>
          </Tooltip>
          <Tooltip content={p.tour_type || p.tourType}>
            <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              {/* 👥 */}
              <GrGroup />
            </span>
          </Tooltip>
          <Tooltip
            content={p.availability !== "" ? p.availability : t("Everyday")}
          >
            <span className="cursor-pointer rounded-full border border-[#003755] bg-gray-900/5 p-3 text-xl text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              {/* 📅 */}
              <SlCalender />
            </span>
          </Tooltip>
        </div>
      </CardBody>
      <CardFooter
        className="pt-3"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          className="bg-[#003755] hover:bg-black/80 text-white"
          size="lg"
          fullWidth={true}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => {
            if (p.package_name) {
              navigate(`/packages/${p.id}`);
            } else {
              navigate(`/nile-cruises/${p.id}`);
            }
          }}
        >
          {t("View")}
        </Button>
      </CardFooter>
    </Card>
  );
}
