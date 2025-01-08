import { CarouselSize } from "@/components/Carousel";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Packages = ({ items }: any) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex w-full max-w-full flex-col gap-1 my-3"
    >
      {/* <h1 className="text-2xl font-bold p-2">Relaxation</h1> */}
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-2xl font-bold p-2 text-[#044d88]"
      >
        {t("Relaxation")}
      </motion.h1>
      <CarouselSize items={items} />
    </motion.div>
  );
};
export default Packages;
