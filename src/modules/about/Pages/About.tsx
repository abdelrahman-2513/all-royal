import HeaderCard from "@/components/HeaderCard/HeaderCard";
import WavyLines from "@/components/WavyComponent/WavyComponent";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/homeImages/Logooo.png";
const AboutUs = () => {
  const { t } = useTranslation();
  return (

    <div className="bg-[#dfefff] w-full  about">
      <HeaderCard title={"About All Royal Egypt"} desc={"About Us"} image={Logo} />
      <WavyLines color="#0071cc" lineCount={4}/>
      <WavyLines color="#0071cc" lineCount={4} />
      <div className="w-[70vw] mx-auto py-5 ">
      <div className="max-w-3xl mx-auto color-[#06284b]">
        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
        Crafting Unforgettable Journeys for Over 65 Years
        </h3>
        <p>
        At All Royal Travel, we believe that every journey is more than a trip. it’s a story waiting to be told. With over six decades of experience in curating exceptional travel experiences, we have become a trusted name in local and regional tourism, earning thousands of positive reviews from travelers worldwide.
        </p>
        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
        Our commitment to excellence and passion for exploration ensures every guest enjoys safe, comfortable, and personalized adventures across our stunning destinations.
        </p>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
          Our Mission
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        At All Royal Travel, our mission is simple: to create memorable travel experiences that inspire, delight, and connect. We aim to showcase the beauty, history, and culture of each destination while fostering responsible tourism that benefits both travelers and local communities.
        </p>
        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
          Our Vision
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        We envision a world where travel is accessible, transformative, and sustainable. By blending tradition with innovation, we strive to remain a leading name in global tourism, delivering unparalleled journeys for every traveler.
        </p>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
          Why Choose Us?
        </h3>
        <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed">
          <li>
            Experienced travel experts who understand the nuances of planning a
            perfect trip.
          </li>
          <li>
            Personalized travel packages tailored to meet your unique
            preferences.
          </li>
          <li>Commitment to quality, safety, and customer satisfaction.</li>
          <li>
            24/7 customer support to ensure your peace of mind while traveling.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">Our Team</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Our team is comprised of passionate travel experts who are dedicated
          to providing exceptional service. We work tirelessly to ensure that
          your travel needs are met with care, enthusiasm, and professionalism.
          From itinerary planning to on-the-ground support, our team is with you
          every step of the way.
        </p>
        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">Start Your Journey with Us</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        Whether it’s discovering Egypt’s iconic pyramids, embarking on a serene Nile cruise, or exploring the wonders of the Middle East, All Royal Travel promises an unforgettable adventure. Let us turn your dream vacation into reality.
        </p>
        <p className="mt-6">
        Contact Us Today and let’s plan your next adventure!
        </p>

        <div className="mt-6 text-center">
                                <Button
                                  className="bg-[#044d88] py-[12px] px-[40px] hover:bg-blue-700 text-white"
                                  
                                  placeholder={undefined}
                                      onPointerEnterCapture={undefined}
                                      onPointerLeaveCapture={undefined}
                                >
                                  {t("Contact us")}
                                </Button>
                              </div>
                              </div>
      </div>
    </div>
  );
};

export default AboutUs;
