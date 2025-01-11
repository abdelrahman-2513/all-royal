import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission (e.g., send data to backend)
  };

  return (
    <div className="w-full mx-auto bg-blue-50 p-6 rounded-lg shadow-md border border-[#0071cc] border-blue-200">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#0071cc]  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">E-Mail</label>
          <input
            type="email"
            name="email"
            placeholder="Type Full Name"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#0071cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            placeholder="Type Full Name"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#0071cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            name="message"
            placeholder="Please Advise Your Tour Requirements"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#0071cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-[200px] block mx-auto bg-[#0c2340] text-white py-2 rounded-lg hover:bg-blue-900 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
