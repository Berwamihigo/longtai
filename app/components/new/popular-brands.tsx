"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572149/cars/main/xmc4evovsdx6gz9wm6jl.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572150/cars/sub/stqrsfevmd6gpbm5hzb2.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/bcytct8l8saw06wziacj.jpg" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/viwfd0rdoll2m7pfcdme.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/ag9usymagdntn61zz8h1.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/fdwqcingp1t4ogzncaob.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/gnlaochhxwmqiqsjzhpo.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/euctnhtvx5ysp1sdigse.jpg" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/fy2q0oumqbz4r8awap6n.jpg" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572152/cars/sub/ahit2qbswac4tbwqnxaz.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747572153/cars/sub/w5ggkzranbazvxu2arel.jpg" },
];

export default function PopularBrands() {
  const duplicated = [...brands, ...brands, ...brands, ...brands];

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col items-center justify-center py-16 px-6 overflow-hidden font-poppins">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent tracking-wide font-orbitron">
          ✨ Popular Car Brands ✨
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Left Arrow */}
          

          {/* First Row - Left to Right */}
          <motion.div
            className="flex"
            animate={{ x: ["-100%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {duplicated.map((brand, i) => (
              <BrandCard key={`ltr-${i}`} image={brand.image} />
            ))}
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden mt-10">

          {/* Second Row - Right to Left */}
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {duplicated.map((brand, i) => (
              <BrandCard key={`rtl-${i}`} image={brand.image} />
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

function BrandCard({ image }: { image: string }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-all duration-300 py-4 px-6 mx-4 flex items-center justify-center cursor-pointer hover:scale-105 min-w-[140px] md:min-w-[180px] h-[100px] md:h-[120px]">
      <img
        src={image}
        alt="Car Brand"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}
