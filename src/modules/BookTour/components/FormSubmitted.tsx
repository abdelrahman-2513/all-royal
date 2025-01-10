import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const FormSubmitSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-[350px] mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-[#0c2340] mb-2"
      >
        Form Received
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg text-[#0c2340] mb-6"
      >
        We Will Be Contacting You Soon
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mb-6"
      >
        <FaCheckCircle size={100} className="text-[#2196f3]" />
      </motion.div>

      <button
        onClick={handleGoHome}
        className="px-6 py-2 bg-[#044d88] text-white rounded-md hover:bg-[#033366]"
      >
        Go Back To Homepage
      </button>
    </div>
  );
};

export default FormSubmitSuccess;
