"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ServicesOffered = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    preferredDate: "",
    serviceType: "maintenance",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>

        {/* Warranty Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-semibold mb-8 text-center text-gray-800"
          >
            Warranty Coverage
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-16 h-16 flex items-center justify-center text-white">
                🔋
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">
                Hybrid Vehicles
              </h4>
              <p className="text-lg text-gray-600 mb-4">
                3 Years Comprehensive Warranty
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  Battery system coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  Electric motor protection
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  Hybrid system components
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-16 h-16 flex items-center justify-center text-white">
                ⚡
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">
                Electric Vehicles
              </h4>
              <p className="text-lg text-gray-600 mb-4">
                5 Years Comprehensive Warranty
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  Extended battery warranty
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  Electric powertrain coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  Charging system protection
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Maintenance Booking Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-semibold mb-8 text-center text-gray-800"
          >
            Book Maintenance Service
          </motion.h3>
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Model
                </label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="maintenance">Regular Maintenance</option>
                  <option value="repair">Repair Service</option>
                  <option value="inspection">Vehicle Inspection</option>
                </select>
              </motion.div>
            </div>

            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Book Service
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOffered;
