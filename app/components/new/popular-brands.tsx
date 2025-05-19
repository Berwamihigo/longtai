"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650956/cars/sub/mncbftv06l54bp4chu91.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650957/cars/sub/so9zw3nlchqobmw5fsui.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650957/cars/sub/dzwnyilvt1pbcah487nj.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650957/cars/sub/m7topwhakr3oji6zolhc.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650959/cars/sub/w2s6k3aftdlppt6f1qvx.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650963/cars/sub/haihtt1lhm9zcnalp7q2.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650959/cars/sub/ob6yan3m82zzhwnrld2l.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650957/cars/sub/c7i2yly6xlzb9tgb3vmp.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650958/cars/sub/ltsvxp8nhjdd9ayanxev.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650957/cars/sub/nmn4vbdmm7d8axwuujou.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650957/cars/sub/ux3blf9tfvt1k4rjzkyl.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650958/cars/sub/ldthdjz8llplmbwlzpat.png" },
  { image: "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1747650957/cars/sub/qf7qxd0diwkk8ioxfdc6.png" },
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
