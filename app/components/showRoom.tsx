"use client";

import { useEffect, useState } from "react";
import { FaBolt, FaLeaf } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

type CarType = {
  name: string;
  year: number | string;
  price: number;
  range: string;
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

// Helper to format price
const formatPrice = (price: number) =>
  price ? price.toLocaleString(undefined, { minimumFractionDigits: 0 }) : "N/A";

// Helper to convert minutes to hours (rounded to 1 decimal)
const minutesToHours = (minutes: string | number | undefined) => {
  if (!minutes) return null;
  const min = typeof minutes === "string" ? parseFloat(minutes) : minutes;
  if (isNaN(min)) return null;
  return (min / 60).toFixed(1);
};

const CarsBanner = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/getAllCars");
        const data = await res.json();
        if (data.success) {
          setCars(data.cars);
        } else {
          console.error("Failed to load cars");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <section className="cars-banner w-full bg-white">
      <div className="cars px-4 py-6 sm:px-6 lg:px-12">
        <div className="view-cars mb-4 flex justify-between items-center">
          <span className="matches text-lg font-semibold">
            Our Cars
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div
              key={car.name}
              className="relative group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={car.mainImageUrl}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <FavoriteButton 
                    carName={car.name} 
                    onFavoriteChange={() => {
                      // This will be called when a car is added/removed from favorites
                      // The favorites tray will handle the refresh when it's opened
                    }}
                  />
                </div>
              </div>

              <div
                className="p-4 cursor-pointer"
                onClick={() => router.push(`/view?name=${encodeURIComponent(car.name)}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  {car.powerType && (
                    <div className="flex items-center gap-1">
                      {car.powerType === "Electric" ? (
                        <FaBolt className="text-blue-500" />
                      ) : car.powerType === "Hybrid" ? (
                        <FaLeaf className="text-green-500" />
                      ) : null}
                    </div>
                  )}
                </div>
                <p className="text-gray-600">{car.year}</p>
                {car.powerType === "Electric" && car.range && (
                  <p className="text-sm text-gray-500 mt-1">Range: {car.range}</p>
                )}
                {car.powerType !== "Electric" && car.mpgRange && (
                  <p className="text-sm text-gray-500 mt-1">
                    MPG: {car.mpgRange.min} - {car.mpgRange.max}
                  </p>
                )}
                <p className="text-[#f1b274] font-semibold mt-2">
                  RWF {Number(car.price).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarsBanner;
