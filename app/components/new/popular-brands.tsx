"use client";

import { motion } from "framer-motion";

const brands = [
  {
    name: "Toyota",
    logo: "/logos/toyota.jpeg",
  },
  {
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    name: "Mercedes-Benz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  },
  {
    name: "Audi",
    logo: "/logos/audi.png",
  },
  {
    name: "Honda",
    logo: "/logos/honda.jpeg",
  },
  {
    name: "Nissan",
    logo: "/logos/nissan.jpeg",
  },
  {
    name: "Ford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
  },
  {
    name: "Chevrolet",
    logo: "/logos/chev.jpeg",
  },
];

export default function PopularBrands() {
  // Split brands into two equal rows
  const firstRow = brands.slice(0, 4);
  const secondRow = brands.slice(4);

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
        Popular Brands
      </h2>      
      <div className="mb-12 overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: ["-100%", "0%"],
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...firstRow, ...firstRow].map((brand, index) => (
            <div key={index} className="flex-shrink-0 w-1/4 px-4">
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-center h-full">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: ["0%", "-100%"],
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...secondRow, ...secondRow].map((brand, index) => (
            <div key={index} className="flex-shrink-0 w-1/4 px-4">
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-center h-full">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
     
    </section>
  );
}