import { useTranslation } from "react-i18next";

const SubmissionSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full border-t-8 border-green-500">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600">🎉 {t("Submission Successful!")} 🎉</h1>
          <p className="mt-4 text-lg text-gray-800">
            {t("Thank you for submitting your application.")}
            <br />
            {t("We will review it and get in touch with you soon.")} 😊✈️
          </p>
          <div className="mt-6">
            <svg
              className="w-16 h-16 mx-auto text-green-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4-4m-7 7h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <p className="mt-6 text-gray-600">
            ✨ {t("If you have any questions, feel free to reach out to our support team.")} 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
