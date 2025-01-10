import  { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HiltonImage from "@/assets/homeImages/hilton.jpg";
import JazImage from "@/assets/homeImages/jaz.jpg";
import MovinpekImage from "@/assets/homeImages/movinpek.jpg";
import SImage from "@/assets/homeImages/s-partener.jpg";

export const OurPartners = () => {
  const t = useTranslation().t;
  const partners: { image: string; name: string }[] = [
    { image: JazImage, name: "Jaz" },
    { image: MovinpekImage, name: "Movinpeck" },
    { image: HiltonImage, name: "Hilton" },
    { image: SImage, name: "S" },
    { image: HiltonImage, name: "Hilton" },
    { image: JazImage, name: "Jaz" },
    { image: MovinpekImage, name: "Movinpeck" },
    { image: SImage, name: "S" },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 1; 
    let position = 0;

    const scroll = () => {
      position -= scrollSpeed; 
      if (Math.abs(position) >= scrollContainer.scrollWidth / 2) {
        position = 0; 
      }
      setOffset(position);
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="py-10 px-5 w-[90vw] md:px-15 overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold text-[#044d88] mb-8">
        {t("Our Partners")}
      </h2>
      <div
        className="flex gap-6"
        ref={scrollContainerRef}
        style={{
          display: "flex",
          transform: `translateX(${offset}px)`,
          transition: "transform 0.02s linear",
          willChange: "transform",
        }}
      >
        {partners.concat(partners).map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.8,
            }}
            className="min-w-[150px] h-[100px] flex justify-center items-center bg-white overflow-hidden shadow-md rounded-lg"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Why Book With Us Component
export const WhyBookWithUs = () => {
  const { t } = useTranslation();
  const features = [
    {
      title: "Private & Personalized Tours",
      description:
        "Custom-tailored tours to your preferences, visiting attractions or exploring new destinations.",
      icon: "\u{1F464}",
    },
    {
      title: "Flexible, Thoughtful Planning",
      description:
        "Carefully crafted itineraries with flexibility for client convenience.",
      icon: "\u{1F4C5}",
    },
    {
      title: "Excellence In Service",
      description:
        "Expert teams to transform each itinerary into a memorable adventure.",
      icon: "\u{1F3C6}",
    },
    {
      title: "Ethical And Sustainable Tourism",
      description: "Positive impact on the environment and local communities.",
      icon: "\u{267B}",
    },
    {
      title: "Multilingual Service",
      description:
        "Assistance in multiple languages ensuring clear communication.",
      icon: "\u{1F4AC}",
    },
    {
      title: "Commitment To Safety",
      description:
        "Safety as a top priority with adaptable secure environments.",
      icon: "\u{1F6E1}",
    },
    {
      title: "Great Value And Time-Saving",
      description: "Highly competitive packages to maximize trip value.",
      icon: "\u{23F3}",
    },
    {
      title: "Customer Support",
      description: "24/7 support to answer questions and provide assistance.",
      icon: "\u{1F4DE}",
    },
  ];

  return (
    <div className=" text-white py-10  w-full max-w-full md:px-15">
      <h5 className="text-xl md:text-2xl font-bold w-[fit-content] p-[15px]  bg-[#044d88] text-[white] rounded-t-lg">
        {t("Why Book With Us?")}
      </h5>
      <div className="w-full bg-[#0c2340]">
        <div className=" grid grid-cols-1 md:grid-cols-2  gap-6 w-[90vw] mx-auto py-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="text-3xl text-[white">{feature.icon}</span>
              <div>
                <h3 className="font-bold text-lg mb-1">{t(feature.title)}</h3>
                <p className="text-sm">{t(feature.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// FAQ Component
export const FAQ = () => {
  const { t } = useTranslation();
  const questions = [
    { question: "This is Question #1" },
    { question: "This is Question #2" },
    { question: "This is Question #3" },
    { question: "This is Question #4" },
  ];

  return (
    <div className=" py-10 w-[90vw] md:px-15">
      <h2 className="text-xl md:text-2xl font-bold text-[#044d88] mb-8">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-4">
        {questions.map((q, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-md cursor-pointer"
          >
            <span className="text-2xl text-[#044d88]">+</span>
            <span className="text-lg font-bold text-[#044d88]">
              {t(q.question)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
