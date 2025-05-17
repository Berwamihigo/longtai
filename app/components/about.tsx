"use client";

import Image from "next/image";
import React from "react";

const AboutLongtai = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-800 to-white opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            About <span className="text-blue-600">Longtai</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Image and text row */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          {/* Image with frame */}
          <div className="relative lg:w-1/2 w-full">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-700 to-gray-400 rounded-xl opacity-30"></div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/assets/longtai.png"
                alt="Longtai Company Overview"
                width={800}
                height={500}
                priority
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="lg:w-1/2 w-full space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              Longtai is a rapidly growing e-commerce platform specializing in
              shipping cars from China to Rwanda. With its base roots in China,
              Longtai has built a reputation for offering a seamless and
              transparent vehicle importation process, catering to a diverse range
              of customers—from individual buyers looking for budget-friendly
              options to businesses seeking fleet solutions.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              China has become a global powerhouse in the automotive industry,
              producing a wide range of vehicles. Longtai emerged as a response to the
              growing demand for affordable and reliable vehicles in Rwanda. By
              partnering directly with Chinese manufacturers, the platform
              eliminates unnecessary middlemen, allowing customers to access
              factory prices and reduce costs.
            </p>
          </div>
        </div>

        {/* Additional content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-lg leading-relaxed text-gray-700">
            Longtai's catalog includes a vast selection of vehicles, catering to
            different needs and budgets. Whether it's a compact city car for urban
            commuters, a rugged SUV for Rwanda's adventurous terrains, or an
            electric vehicle for the environmentally conscious, Longtai ensures
            that buyers have access to the latest models.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Longtai is more than just an e-commerce business—it is part of
            Rwanda's transformation. As the country embraces digital innovation
            and economic growth, access to affordable and high-quality vehicles
            plays a crucial role in mobility, trade, and daily life.
          </p>
          <div className="text-center mt-12">
            <span className="inline-block text-blue-600 text-2xl font-medium">
              With every shipment, Longtai delivers more than just a car—it delivers dreams, possibilities, and progress. 🚗
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLongtai;