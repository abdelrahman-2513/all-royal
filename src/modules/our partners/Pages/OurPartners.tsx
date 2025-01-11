import HeaderCard from "@/components/HeaderCard/HeaderCard";
import WavyLines from "@/components/WavyComponent/WavyComponent";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/homeImages/our-partners.jpg";
import PlannerBanner from "../components/PlannerComponent/PlannerComponent";
const OurPartners = () => {
  const { t } = useTranslation();
  return (

    <div className="bg-[#dfefff] w-full  about">
      <HeaderCard title={"Our Partners"} desc={"At All Royal Travel, we take pride in collaborating with some of the world’s most renowned and trusted brands in the hospitality and tourism industry. These partnerships allow us to deliver unparalleled travel experiences that combine comfort, convenience, and exceptional service."} image={Logo} />
      <WavyLines color="#0071cc" lineCount={4}/>
      <WavyLines color="#0071cc" lineCount={4} />
      <div className="w-[70vw] mx-auto py-5 ">

      <div className="max-w-3xl mx-auto color-[#06284b]">
        
        <p>
        At All Royal Travel, we believe that every journey is more than a trip. it’s a story waiting to be told. With over six decades of experience in curating exceptional travel experiences, we have become a trusted name in local and regional tourism, earning thousands of positive reviews from travelers worldwide.
        </p>
        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
        Our commitment to excellence and passion for exploration ensures every guest enjoys safe, comfortable, and personalized adventures across our stunning destinations.
        </p>

        <p>
        Our Esteemed Partners Include
        </p>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
        Luxury Hotels & Resorts
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        From global brands like Hilton, Mövenpick, and Jaz Hotels, our partners provide top-tier accommodations, ensuring a relaxing and luxurious stay for our travelers.
        </p>
        {/* Add more sections as needed */}
        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
        Cruise Lines
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        We envision a world where travel is accessible, transformative, and sustainable. By blending tradition with innovation, we strive to remain a leading name in global tourism, delivering unparalleled journeys for every traveler.Our Nile cruise experiences are elevated by partnerships with industry leaders, offering you the finest floating hotels with first-class amenities and unforgettable views of Egypt’s treasures.
        </p>

        {/* Add more sections as needed */}

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
        Transportation Experts
        </h3>
        <p>
        To ensure smooth and safe travel, we collaborate with reputable transport companies that provide modern, comfortable, and secure vehicles for all tours and transfers.
        </p>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">Local Guides & Communities</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        We work closely with knowledgeable, certified guides and local businesses, creating authentic and enriching experiences while supporting the communities we visit.
        </p>
        <p>By partnering with these prestigious organizations, All Royal Travel ensures every detail of your journey is handled with care and professionalism, making your trip truly memorable.</p>

        <PlannerBanner />
                              </div>
      </div>
    </div>
  );
};

export default OurPartners;
