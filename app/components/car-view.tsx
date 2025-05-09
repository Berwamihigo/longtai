"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import {
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { IoSpeedometerOutline, IoColorPaletteOutline } from "react-icons/io5";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

type CarData = {
  mainImageUrl: string;
  subImageUrls?: string[];
  year?: string | number;
  make?: string;
  model?: string;
  category?: string;
  seats?: string | number;
  zeroToSixty?: string;
  topSpeed?: string;
  powerType?: string;
  range?: string;
  mpgRange?: { min: string; max: string };
  price?: number | string;
  description?: string;
  specifications?: {
    engine?: string;
    transmission?: string;
    horsepower?: number;
    torque?: number;
    fuelEconomy?: string;
    acceleration?: string;
    topSpeed?: string;
  };
};

export default function CarCustomizer() {
  const searchParams = useSearchParams();
  const carName = searchParams.get("name") || "";
  const [car, setCar] = useState<CarData | null>(null);
  const [activeColor, setActiveColor] = useState("Midnight Black");
  const [mainImage, setMainImage] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const colors = [
    { name: "Midnight Black", hex: "#1a1a1a" },
    { name: "Glacier White", hex: "#ffffff" },
    { name: "Volcanic Red", hex: "#d62e2e" },
    { name: "Quantum Blue", hex: "#2962ff" },
  ];

  useEffect(() => {
    if (!carName) return;
    fetch(`/api/getparticular?name=${encodeURIComponent(carName)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCar(data.data);
          setMainImage(data.data.mainImageUrl);
        }
      })
      .catch(console.error);
  }, [carName]);

  if (!car) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-lg text-gray-500">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full mr-3"
        />
        Loading...
      </div>
    );
  }

  const subImages = car.subImageUrls?.filter(Boolean) || [];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] bg-gray-50 border-b border-gray-100">
        <div className="absolute inset-0">
          {mainImage && (
            <Image
              src={mainImage}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold">
                  {car.make} <span className="font-light">{car.model}</span>
                </h1>
                <p className="text-gray-600">
                  {car.year} • RWF {Number(car.price).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <FavoriteButton carName={carName} />
                <ShareButton url={window.location.href} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            {/* Gallery */}
            {subImages.length > 0 && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <Swiper
                  spaceBetween={8}
                  slidesPerView="auto"
                  freeMode
                  watchSlidesProgress
                  modules={[FreeMode, Thumbs, Autoplay]}
                  autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                  className="!pb-2"
                >
                  {subImages.map((img, i) => (
                    <SwiperSlide key={i} className="!w-28 cursor-pointer">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className={`relative aspect-video rounded overflow-hidden border transition-all ${
                          mainImage === img
                            ? "border-gray-900"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        onClick={() => setMainImage(img)}
                      >
                        <Image
                          src={img}
                          alt={`View ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}

            {/* Color Picker */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12 border-b border-gray-100 pb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <IoColorPaletteOutline size={20} className="text-gray-600" />
                <h3 className="text-lg font-medium">Exterior Color</h3>
              </div>
              <div className="flex gap-3 mb-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color.name)}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      activeColor === color.name
                        ? "border-gray-900 scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">Selected: {activeColor}</p>
            </motion.div>

            {/* Description */}
            {car.description && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <h3 className="text-lg font-medium mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {car.description}
                </p>
              </motion.div>
            )}
          </div>

          {/* Right */}
          <div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="sticky top-6 space-y-8"
            >
              {/* Specs */}
              <div>
                <h3 className="text-lg font-medium mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {car.zeroToSixty && (
                    <div className="border border-gray-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <FiClock size={16} />
                        <span className="text-sm">0-100 km/h</span>
                      </div>
                      <div className="text-xl font-medium">
                        {car.zeroToSixty}s
                      </div>
                    </div>
                  )}
                  {car.topSpeed && (
                    <div className="border border-gray-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <IoSpeedometerOutline size={16} />
                        <span className="text-sm">Top Speed</span>
                      </div>
                      <div className="text-xl font-medium">
                        {car.topSpeed} km/h
                      </div>
                    </div>
                  )}
                  {car.seats && (
                    <div className="border border-gray-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <FiUsers size={16} />
                        <span className="text-sm">Seats</span>
                      </div>
                      <div className="text-xl font-medium">{car.seats}</div>
                    </div>
                  )}
                  {car.powerType === "Electric" && car.range && (
                    <div className="border border-gray-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Range</div>
                      <div className="text-xl font-medium">{car.range} km</div>
                    </div>
                  )}
                  {car.powerType === "Gasoline" && car.mpgRange && (
                    <div className="border border-gray-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        Fuel Economy
                      </div>
                      <div className="text-xl font-medium">
                        {car.mpgRange.min}–{car.mpgRange.max} km/L
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Price</span>
                  <span className="text-2xl font-medium">
                    RWF {Number(car.price).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Excluding taxes and fees
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
                  <FiShare2 size={18} /> Share
                </button>
                <button className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
                  Book Test Drive <FiChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
