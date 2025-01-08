import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Privacy Policy
      </h1>

      <p className="text-lg text-gray-600 mb-4">
        All Royal Travel is dedicated to protecting your privacy and ensuring a
        safe, enjoyable travel planning experience. Here’s a summary of our
        privacy practices:
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-2">
          What We Collect and Why
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-lg text-gray-600">
            <strong>Payment Details:</strong> Your credit and debit card
            information, as well as personal data, are securely processed and
            never stored, shared, or sold to third parties.
          </li>
          <li className="text-lg text-gray-600">
            <strong>Policy Updates:</strong> We occasionally update our policies
            to meet current standards. Please revisit this page periodically for
            the latest information.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-2">
          Third-Party Ads
        </h2>
        <p className="text-lg text-gray-600">
          Some ads on our site come from third parties who may use cookies or
          other tools to understand your interests. While we don’t have access
          to their data, it’s managed according to their privacy policies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-2">
          Sharing Your Information
        </h2>
        <p className="text-lg text-gray-600">
          Your information is shared only when legally required, such as in
          response to subpoenas or to protect our customers and business. In
          such cases, we will take steps to safeguard your privacy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-2">
          How We Keep Your Information Safe
        </h2>
        <p className="text-lg text-gray-600">
          To protect your data, we use advanced security tools like McAfee
          encryption, firewalls, and other protective measures. Only designated
          employees managing your account can access your information to
          maintain confidentiality.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-2">
          External Links
        </h2>
        <p className="text-lg text-gray-600">
          For your convenience, our website may link to other sites not covered
          by our Privacy Policy. Please review the privacy policies on any
          external sites.
        </p>
      </section>

      <p className="text-lg text-gray-600">
        Thank you for trusting All Royal Travel. We are committed to ensuring
        both your privacy and a memorable travel experience.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
