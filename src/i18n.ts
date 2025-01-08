import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en/common.json";
import plTranslations from "./locales/pl/common.json";
import esTranslations from "./locales/es/common.json";
import { useNavigate, useParams } from "react-router-dom";

export const getCurrentLang = () => localStorage.getItem("appLang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    pl: { translation: plTranslations },
    es: { translation: esTranslations },
  },
  lng: getCurrentLang(),
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

export const changeLanguage = (lang: string | undefined) => {
  console.log("changeLanguage", lang);
  localStorage.setItem("appLang", lang ? lang : getCurrentLang());
  i18n.changeLanguage(lang ? lang : getCurrentLang());
};

/**
 * useLanguageSwitch (Hook for language switch) : used to switch between languages and redirect to current route
 * @returns changeLanguage function to switch between languages
 */
export const useLanguageSwitch = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();

  return (newLang: string) => {
    if (lang !== newLang) {
      changeLanguage(newLang);
      navigate(
        `/${newLang}${window.location.pathname.replace(/^\/[a-z]{2}/, "")}`
      );
    }
  };
};

/**
 * useLanguageAwareNavigate (Hook for language aware navigation) : used to navigate to a route based on the current language
 * @returns navigate function to navigate to a route
 */
export const useLanguageAwareNavigate = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  return (to: string, options = {}) => {
    navigate(`/${lang}${to.startsWith("/") ? "" : "/"}${to}`, options);
  };
};
