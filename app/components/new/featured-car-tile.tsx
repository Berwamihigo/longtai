"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaBolt, FaLeaf } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { useProgressBar } from "../../hooks/useProgressBar";
import Link from "next/link";

type CarType = {
  name: string;
  year: number | string;
  price: number;
  range: string;
  mileage: number;
  mainImageUrl: string;
  subImages: string[];
  powerType?: string;
  fullCharge?: string;
  fullTank?: string;
  mpgRange?: { min: string; max: string };
  seats?: string;
  zeroToSixty?: string;
  category?: string;
  description?: string;
};

export default function FeaturedCars() {
  const router = useRouter();
  const handleNavigation = useProgressBar();
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "SUV", "Van", "Truck"];

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const url =
          activeCategory === "All"
            ? "/api/getAllCars"
            : `/api/getAllCars?category=${encodeURIComponent(activeCategory)}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.success) {
          const limitedCars = data.cars.slice(0, 4);
          setCars(limitedCars);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [activeCategory]);

  return (
    <section className="flex flex-col gap-6 px-6 py-30 bg-gray-300">
      <h2 className="text-4xl text-center font-bold text-gray-900 mb-5">
        Explore Our Featured Cars
      </h2>

      {/* Category Tabs */}
      <div className="mb-10 overflow-x-auto">
        <ul className="flex min-w-max flex-nowrap md:flex-wrap gap-4 px-4 md:px-6 text-base md:text-lg font-semibold text-gray-600 justify-start h-20 md:justify-center">
          {categories.map((category) => (
            <li key={category} className="shrink-0">
              <button
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 transition duration-300 ease-in-out
                  ${
                    activeCategory === category
                      ? "text-gray-900"
                      : "hover:text-gray-800"
                  }
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:bg-gray-900 after:w-full after:scale-x-0 after:origin-left
                  ${
                    activeCategory === category
                      ? "after:scale-x-100"
                      : "after:hover:scale-x-100"
                  }
                  after:transition-transform after:duration-300 after:ease-in-out`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Cars Section */}
      {loading ? (
        <div className="text-center w-full text-gray-400">
          Loading featured cars...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car, index) => (
            <div key={index} className="flex justify-center">
              <Link
                href={`/view?name=${encodeURIComponent(car.name)}`}
                className="relative cursor-pointer w-full max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 group hover:shadow-[#f1b274]/20"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={car.mainImageUrl}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-600 via-transparent to-transparent z-10" />

                  {/* Category Label */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow-md z-20 capitalize">
                    <FaHeart />
                    {car.category || activeCategory}
                  </div>
                </div>

                {/* Price Label */}
                <div className="absolute top-44 left-4 bg-black/70 backdrop-blur-md px-4 py-1 rounded-md text-white text-sm shadow z-30">
                  RWF {Number(car.price).toLocaleString("en-US")}
                </div>

                {/* Info Section */}
                <div className="p-5 pt-10 z-20 relative space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {car.name}
                    {car.powerType === "Electric" && (
                      <FaBolt className="text-blue-500" />
                    )}
                    {car.powerType === "Hybrid" && (
                      <FaLeaf className="text-green-500" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {car.powerType} • {car.year} • {car.category}
                  </p>

                  <hr className="border-gray-700" />

                  <div className="flex flex-col gap-1 text-sm text-gray-400">
                    {car.mileage && <span>Mileage: {car.mileage} km</span>}
                    {car.range && car.powerType === "Electric" && (
                      <span>Range: {car.range}</span>
                    )}
                    {car.fullCharge && car.powerType === "Electric" && (
                      <span>Full Charge: {car.fullCharge} min</span>
                    )}
                    {car.mpgRange && car.powerType !== "Electric" && (
                      <span>
                        Range(km): {car.mpgRange.min} - {car.mpgRange.max}
                      </span>
                    )}
                    {car.seats && <span>Seats: {car.seats}</span>}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Explore More Button */}
      <div className="newone mt-8 flex justify-center">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f1b274] text-white rounded-lg hover:bg-[#e5a066] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Explore More Vehicles <RiArrowRightSLine size={20} />
        </Link>
      </div>
    </section>
  );
}
