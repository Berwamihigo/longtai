"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { useProgressBar } from "../../hooks/useProgressBar";

const ServicesOffered = () => {
  const handleNavigation = useProgressBar();

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
    <section className="py-20 bg-gradient-to-b from-white to-gray-700">
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

        <div className="newone mt-8 flex justify-center">
          <Link 
            href="/maintenance" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f1b274] text-white rounded-lg hover:bg-[#e5a066] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Request Maintenance <RiArrowRightSLine size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOffered;
