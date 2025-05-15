"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "Toyota", logo: "/assets/logos/toyota.png" },
  {
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    name: "Mercedes-Benz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  },
  { name: "Audi", logo: "/assets/logos/audi.png" },
  { name: "Honda", logo: "/assets/logos/honda.png" },
];

export default function PopularBrands() {
  // Lighter, single-row, gentle animation
  const duplicated = [...brands, ...brands];
  const baseDuration = 24;

  return (
    <section className="py-16 px-4 bg-white/80 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-10">
        Popular Brands
      </h2>
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: baseDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicated.map((brand, index) => (
            <div key={index} className="flex-shrink-0 min-w-[140px] px-3">
              <div className="bg-white/60 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex items-center justify-center h-full">
                <p>{brand.name}</p>

                {/* <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300"
                  loading="lazy"
                /> */}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        section {
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </section>
  );
}
