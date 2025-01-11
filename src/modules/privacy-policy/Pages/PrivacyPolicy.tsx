import HeaderCard from "@/components/HeaderCard/HeaderCard";
import React from "react";
import WavyLines from "@/components/WavyComponent/WavyComponent";
import Logo from "@/assets/homeImages/policy.jpg";
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#dfefff] w-full  about">
      <HeaderCard title={"Privacy Policy"} desc={""} image={Logo} />
      <WavyLines color="#0071cc" lineCount={4}/>
      <WavyLines color="#0071cc" lineCount={4} />
      <div className="w-[70vw] mx-auto py-5 ">
      <div className="max-w-3xl mx-auto color-[#06284b]">
        <p>All Royal Travel is dedicated to protecting your privacy and ensuring a safe, enjoyable travel planning experience. Here’s a summary of our privacy practices:
        </p>
        <h3 className="text-2xl font-semibold text-[#0071cc] mt-5 mb-2">
        What We Collect and Why

        </h3>
        <b>
          Payment Details
        </b>
        <p>
          Your credit and debit card information, as well as personal data, are securely processed and never stored, shared, or sold to third parties.
        </p>
        <b>
        Policy Updates 
        </b>
        <p>
        We occasionally update our policies to meet current standards. Please revisit this page periodically for the latest information.

        </p>
        <b>
        Third-Party Ads
        </b>
        <p>
        Some ads on our site come from third parties who may use cookies or other tools to understand your interests. While we don’t have access to their data, it’s managed according to their privacy policies.

        </p>
        

        <h3 className="text-2xl font-semibold text-[#0071cc] mt-5 mb-2">
        Sharing Your Information

        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        Your information is shared only when legally required, such as in response to subpoenas or to protect our customers and business. In such cases, we will take steps to safeguard your privacy.

        </p>
        <h3 className="text-2xl font-semibold text-[#0071cc] mb-2">
       How We Keep Your Information Safe


        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
        To protect your data, we use advanced security tools like McAfee encryption, firewalls, and other protective measures. Only designated employees managing your account can access your information to maintain confidentiality.

        </p>

        <h3 className="text-2xl font-semibold text-[#0071cc] mb-2">
        External Links

        </h3>
       
        <p className="text-gray-700 mb-6 leading-relaxed">
        For your convenience, our website may link to other sites not covered by our Privacy Policy. Please review the privacy policies on any external sites.

        </p>
        
        <p className="mt-6">
        Thank you for trusting All Royal Travel. We are committed to ensuring both your privacy and a memorable travel experience.
        </p>

        
                              </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
