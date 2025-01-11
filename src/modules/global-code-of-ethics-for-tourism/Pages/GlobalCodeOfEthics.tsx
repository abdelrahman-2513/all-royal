import HeaderCard from "@/components/HeaderCard/HeaderCard";
import WavyLines from "@/components/WavyComponent/WavyComponent";
import React from "react";
import Logo from "@/assets/homeImages/ethics.jpg";
const GlobalCodeOfEthics: React.FC = () => {
  return (
    <div className="bg-[#dfefff] w-full  about">
    <HeaderCard title={"Global Code of Ethics for Tourism"} desc={""} image={Logo} />
    <WavyLines color="#0071cc" lineCount={4}/>
    <div className="w-[70vw] mx-auto py-5 ">
    <div className="max-w-3xl mx-auto color-[#06284b]">
      <p>All Royal Travel is dedicated to protecting your privacy and ensuring a safe, enjoyable travel planning experience. Here’s a summary of our privacy practices:
      </p>
      <h3 className="text-2xl font-semibold text-[#0071cc] mt-5 mb-2">
      Our Commitment


      </h3>
     
      <p>
      Our commitment aligns with the Global Code of Ethics for Tourism (GCET), established to guide governments, the travel industry, local communities, and travelers in making tourism beneficial and environmentally conscious. This set of principles, adopted by the UN World Tourism Organization (UNWTO) in 1999 and endorsed by the United Nations in 2001, supports responsible tourism development that respects the environment, cultural heritage, and communities.

      </p>
     
      
      

      <h3 className="text-2xl font-semibold text-[#0071cc] mt-5 mb-2">
      Ethical Practices

      </h3>
      <p className="text-gray-700 mb-6 leading-relaxed">
      Although the Code is voluntary, it encourages ethical practices in tourism globally, with guidance from the World Committee on Tourism Ethics (WCTE) to address any concerns related to its implementation.


      </p>
     
      
                            </div>
    </div>
  </div>
  );
};

export default GlobalCodeOfEthics;
