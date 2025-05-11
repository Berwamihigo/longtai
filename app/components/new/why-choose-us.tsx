"use client";
import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Why Choose Us
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="text-5xl mb-6 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-white">
              🚗
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Expert Knowledge
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our team of certified professionals has extensive experience with
              both traditional and electric vehicles, ensuring you get the best
              advice and service.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="text-5xl mb-6 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-white">
              ⭐
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Quality Assurance
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every vehicle undergoes rigorous quality checks and comes with
              comprehensive warranty coverage, giving you peace of mind with
              your purchase.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="text-5xl mb-6 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-white">
              💎
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Premium Service
            </h3>
            <p className="text-gray-600 leading-relaxed">
              From test drives to after-sales support, we provide exceptional
              customer service throughout your entire car ownership journey.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
