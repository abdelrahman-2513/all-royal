import React from "react";
import HeroImage3 from "@/assets/homeImages/pyramids.jpg";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const Footer = () => {
    const { t } = useTranslation();
  return (
    <footer className="relative rounded-t-lg overflow-hidden  w-full  md:bg-fixed bg-center bg-cover text-white"
    style={{
      backgroundImage: `url(${HeroImage3})`,
    //   backgroundPositionY: "80%",
    }}
>
      <div className="bg-[#0c2340]/80 w-full mx-auto px-4  py-12">
        <div className="mb-6 w-[90vw] mx-auto">
          <h2 className="text-2xl font-bold">Travel The World</h2>
          <p className="text-sm mt-2">
            {t("Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed DoEiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua")}
          </p>
        </div>
        <hr className="border-t border-gray-300 mb-6 w-[90vw] mx-auto " />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-[90vw] mx-auto">
          {/* All Royal Egypt */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("All Royal Egypt")}</h3>
            <p className="text-sm">
            {t("Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed DoEiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua")}

            </p>
            <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=61567160154228&mibextid=ZbWKwL"
              className="text-lightGray hover:text-white"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/allroyalegypt/profilecard/?igsh=Y2theHRtcTZpa2Fz"
              className="text-lightGray hover:text-white"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/all-royal-egypt-travel-875ba8330/"
              className="text-lightGray hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Legal Links</h3>
            <ul className="text-sm space-y-2">
              <li>
              <a
                href="/en/privacy-policy"
                className="text-lightGray hover:text-white"
              >
                {t("Privacy Policy")}
              </a>
              </li>
              <li>
              <a
                href="/en/terms-and-conditions"
                className="text-lightGray hover:text-white"
              >
                {t("Terms & Conditions")}
              </a>
              </li>
              <li>
              <a
                href="/en/terms-and-conditions"
                className="text-lightGray hover:text-white"
              >
                {t("Terms & Conditions")}
              </a>
              </li>
            </ul>
          </div>

          {/* About ART */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About ART</h3>
            <ul className="text-sm space-y-2">
              <li>
              <a href="/en/about">{t("About Us")}</a>
              </li>
              <li>
              <a href="/en/about" className="text-lightGray hover:text-white">
                {t("Our Partners")}
              </a>
              </li>
              <li>
              <a href="/en/about" className="text-lightGray hover:text-white">
                {t("Become Partners")}
              </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="text-sm space-y-2">
              <li>Phone Number</li>
              <li>Email</li>
              <li>Whatsapp</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
