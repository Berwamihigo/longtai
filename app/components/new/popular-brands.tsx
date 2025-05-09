"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "Toyota", logo: "/logos/toyota.jpeg" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
  { name: "Audi", logo: "/logos/audi.png" },
  { name: "Honda", logo: "/logos/honda.jpeg" },
  { name: "Nissan", logo: "/logos/nissan.jpeg" },
  { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg" },
  { name: "Chevrolet", logo: "/logos/chev.jpeg" },
];

export default function PopularBrands() {
  const firstRow = brands.slice(0, 4);
  const secondRow = brands.slice(4);

  // Duplicate the items to fill the space (prevents gaps)
  const firstRowDuplicated = [...firstRow, ...firstRow, ...firstRow];
  const secondRowDuplicated = [...secondRow, ...secondRow, ...secondRow];

  // Calculate animation duration based on number of items (for smoothness)
  const baseDuration = 20;

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
        Popular Brands
      </h2>

      {/* First Row (Left to Right) */}
      <div className="mb-12 overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: ["-66.666%", "0%"], // Matches the duplicated content
          }}
          transition={{
            duration: baseDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {firstRowDuplicated.map((brand, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 min-w-[180px] px-4">
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

      {/* Second Row (Right to Left) */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: ["0%", "-66.666%"], // Matches the duplicated content
          }}
          transition={{
            duration: baseDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {secondRowDuplicated.map((brand, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 min-w-[180px] px-4">
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