"use client";

import { motion } from "framer-motion";

const brands = [
  {
    name: "Toyota",
    logo: "/assets/toyota.jpeg",
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
    logo: "/assets/audi.png",
  },
  {
    name: "Honda",
    logo: "/assets/honda.jpeg",
  },
  {
    name: "Nissan",
    logo: "/assets/nissan.jpeg",
  },
  {
    name: "Ford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
  },
  {
    name: "Chevrolet",
    logo: "/assets/chev.jpeg",
  },
];

export default function PopularBrands() {
  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Popular Brands
      </h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-center group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-14 object-contain grayscale group-hover:grayscale-0 transition duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
