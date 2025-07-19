import React from "react";
import { motion } from "framer-motion";
// import { MailCheck } from "lucide-react"; // Or any mail icon

const CheckYourMail = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md"
      >
        <div className="flex justify-center mb-4">
          {/* <MailCheck size={60} className="text-blue-600" /> */}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Check Your Email</h2>
        <p className="text-gray-600 mb-4">
          We’ve sent you a confirmation link. Please check your inbox and click the link to activate your account.
        </p>

        <p className="text-sm text-gray-500">
          Didn’t receive the email?{" "}
          <button className="text-blue-600 hover:underline font-medium">
            Resend
          </button>
        </p>

        <div className="mt-6">
          <a href="/login" className="btn btn-outline btn-primary w-full">
            Go to Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckYourMail;
