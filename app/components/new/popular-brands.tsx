"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "Toyota" },
  { name: "BMW" },
  { name: "Mercedes-Benz" },
  { name: "Audi" },
  { name: "Honda" },
  { name: "Ford" },
  { name: "Chevrolet" },
  { name: "Volkswagen" },
  { name: "Nissan" },
  { name: "Hyundai" },
  { name: "Kia" },
  { name: "Subaru" },
  { name: "Mazda" },
  { name: "Lexus" },
  { name: "Jeep" },
];

export default function PopularBrands() {
  // Duplicate the array enough times to ensure seamless looping
  const duplicated = [...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <>

      <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col items-center justify-center py-16 px-6 overflow-hidden font-poppins">
        <h2 className="text-4xl md:text-5xl font-bold mb-30 text-center bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent tracking-wide font-orbitron">
          ✨ Popular Car Brands ✨
        </h2>

        <div className="w-full overflow-hidden">
          {/* First Row - Left to Right */}
          <motion.div
            className="flex"
            animate={{ x: ["-100%", "0%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicated.map((brand, i) => (
              <BrandCard key={`ltr-${i}`} brand={brand} />
            ))}
          </motion.div>
        </div>

        <div className="w-full overflow-hidden mt-8">
          {/* Second Row - Right to Left */}
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicated.map((brand, i) => (
              <BrandCard key={`rtl-${i}`} brand={brand} />
            ))}
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .font-orbitron {
          font-family: "Orbitron", sans-serif;
        }
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </>
  );
}

function BrandCard({ brand }: { brand: { name: string } }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-all duration-300 py-6 px-8 mx-3 flex items-center justify-center cursor-pointer hover:scale-105 group min-w-[180px]">
      <span className="text-lg font-semibold text-gray-700 group-hover:text-yellow-700 tracking-wide whitespace-nowrap">
        {brand.name}
      </span>
    </div>
  );
}