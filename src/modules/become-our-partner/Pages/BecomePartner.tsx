import HeaderCard from "@/components/HeaderCard/HeaderCard";
import WavyLines from "@/components/WavyComponent/WavyComponent";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/homeImages/partner.jpg";
import ContactForm from "../components/ContactForm";
const BecomePartner = () => {
  const { t } = useTranslation();
  return (

    <div className="bg-[#dfefff] w-full  about">
      <HeaderCard title={"Become our Partners"} desc={"Join our growing network of trusted collaborators and become a part of All Royal Travel’s success story."} image={Logo} />
      <WavyLines color="#0071cc" lineCount={4}/>
      <WavyLines color="#0071cc" lineCount={4} />
      <div className="w-[70vw] mx-auto py-5 ">
      <div className="max-w-3xl mx-auto color-[#06284b]">
        <h3 className="text-2xl font-semibold text-[#06284b] mb-4">
        Why Partner with Us?
        </h3>

        <h3 className="text-2xl mt-5 font-semibold text-[#0071cc] mb-4">
        65+ Years of Expertise
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        Tap into our vast experience in the travel industry, backed by a stellar reputation and thousands of satisfied travelers.
        </p>
        

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
        Global Reach
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        With a diverse clientele spanning continents, we bring your services to a wider audience and connect you with new markets.
        </p>
        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
        Collaborative Growth
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        Our partnership programs are built on trust and mutual success. By working together, we aim to grow your business while delivering value to our clients
        </p>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">
        Commitment to Excellence
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        We hold ourselves to the highest standards of quality, safety, and customer satisfaction, ensuring your brand is represented with integrity.
        </p>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">Support for Ethical & Sustainable Tourism</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Our team is comprised of passionate travel experts who are dedicated
          to providing exceptional service. We work tirelessly to ensure that
          your travel needs are met with care, enthusiasm, and professionalism.
          From itinerary planning to on-the-ground support, our team is with you
          every step of the way.
        </p>
        <h3 className="text-2xl font-semibold text-[#0071cc] mb-4">Start Your Journey with Us</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        By partnering with these prestigious organizations, All Royal Travel ensures every detail of your journey is handled with care and professionalism, making your trip truly memorable.
        </p>
        <p className="">
        By partnering with us, you join a network that prioritizes eco-friendly practices and supports local communities, making a positive impact on the tourism industry.
        </p>

        <h3 className="text-2xl mt-5 font-semibold text-[#06284b] mb-4">
        Contact Form
        </h3>
        <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default BecomePartner;
