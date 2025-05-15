"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  RiStarFill,
  RiStarLine,
  RiHeartLine,
  RiHeartFill,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiLoader4Line,
} from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarReviewProps {
  cars: {
    id: string;
    name: string;
    model: string;
    year: number;
    price: number;
    rating: number;
    images: string[];
    specs: {
      engine: string;
      transmission: string;
      horsepower: number;
      acceleration: string;
      topSpeed: string;
    };
    description: string;
  }[];
}

const sampleReviews = [
  {
    id: "1",
    customerName: "John Doe",
    rating: 5,
    review:
      "Absolutely love this car! The performance is outstanding and the comfort is unmatched.",
    date: "2024-03-15",
    carName: "Mercedes-Benz S-Class",
  },
  {
    id: "2",
    customerName: "Sarah Smith",
    rating: 4,
    review:
      "Great luxury vehicle with amazing features. The only downside is the fuel consumption.",
    date: "2024-03-10",
    carName: "Mercedes-Benz S-Class",
  },
  {
    id: "3",
    customerName: "Mike Johnson",
    rating: 5,
    review:
      "Best car I've ever owned. The technology features are mind-blowing!",
    date: "2024-03-05",
    carName: "Mercedes-Benz S-Class",
  },
  {
    id: "4",
    customerName: "Emma Wilson",
    rating: 4,
    review:
      "Excellent build quality and comfort. The service experience was also top-notch.",
    date: "2024-03-01",
    carName: "Mercedes-Benz S-Class",
  },
];

export default function CarReview({ cars }: CarReviewProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loadingHearts, setLoadingHearts] = useState<Record<string, boolean>>(
    {}
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFavoriteClick = async (carId: string, carName: string) => {
    setLoadingHearts((prev) => ({ ...prev, [carId]: true }));
    try {
      // Check session
      const sessionRes = await fetch("/api/session");
      const sessionData = await sessionRes.json();
      if (!sessionData.loggedIn || !sessionData.user?.email) {
        alert("You must be logged in to favorite a car.");
        setLoadingHearts((prev) => ({ ...prev, [carId]: false }));
        return;
      }
      // Add to favorites
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: sessionData.user.email, carName }),
      });
      if (res.ok) {
        setFavorites((prev) => ({ ...prev, [carId]: true }));
      } else {
        alert("Failed to add to favorites.");
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setLoadingHearts((prev) => ({ ...prev, [carId]: false }));
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? <RiStarFill /> : <RiStarLine />}
      </span>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-12 md:p-12">
      <h1 className="text-5xl text-center md:text-5xl font-bold mb-15 md:mb-15">
        Car Reviews
      </h1>

      {/* Main Cars Horizontal Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".main-next",
          prevEl: ".main-prev",
        }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop
        className="mb-12"
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id} className="pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Image Gallery */}
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop
                  className="h-full"
                >
                  {car.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image}
                        alt={`${car.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Car Details */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                      {car.name}
                    </h1>
                    <p className="text-base md:text-lg text-gray-600">
                      {car.model} • {car.year}
                    </p>
                  </div>
                  <button
                    onClick={() => handleFavoriteClick(car.id, car.name)}
                    className="text-2xl text-red-500 hover:scale-110 transition-transform relative"
                    disabled={loadingHearts[car.id]}
                  >
                    {loadingHearts[car.id] ? (
                      <RiLoader4Line className="animate-spin" />
                    ) : favorites[car.id] ? (
                      <RiHeartFill />
                    ) : (
                      <RiHeartLine />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {renderStars(car.rating)}
                  <span className="text-gray-600">({car.rating}/5)</span>
                </div>

                <div className="text-2xl md:text-3xl font-bold text-[#f1b274]">
                  RWF {car.price.toLocaleString()}
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex gap-4 md:gap-8 overflow-x-auto pb-2">
                    {["overview", "specs", "reviews"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap px-2 pb-2 ${
                          activeTab === tab
                            ? "border-b-2 border-[#f1b274] text-[#f1b274]"
                            : "text-gray-500"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="space-y-3 md:space-y-4">
                  {activeTab === "overview" && (
                    <p className="text-gray-600 leading-relaxed">
                      {car.description}
                    </p>
                  )}

                  {activeTab === "specs" && (
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <h3 className="font-semibold">Engine</h3>
                        <p className="text-gray-600">{car.specs.engine}</p>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <h3 className="font-semibold">Transmission</h3>
                        <p className="text-gray-600">
                          {car.specs.transmission}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <h3 className="font-semibold">Horsepower</h3>
                        <p className="text-gray-600">
                          {car.specs.horsepower} hp
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <h3 className="font-semibold">Acceleration</h3>
                        <p className="text-gray-600">
                          {car.specs.acceleration}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-4 gap-2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                          Customer Reviews
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-xl md:text-2xl font-bold text-[#f1b274]">
                            {car.rating.toFixed(1)}
                          </span>
                          <div className="flex">{renderStars(car.rating)}</div>
                          <span className="text-gray-600">
                            ({car.rating}/5)
                          </span>
                        </div>
                      </div>

                      <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={20}
                        slidesPerView={1}
                        className="review-swiper"
                      >
                        {sampleReviews.map((review) => (
                          <SwiperSlide key={review.id}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-full"
                            >
                              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-lg md:text-xl font-bold text-gray-600">
                                    {review.customerName.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="font-semibold">
                                    {review.customerName}
                                  </h3>
                                  <p className="text-xs md:text-sm text-gray-500">
                                    {review.date}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3 md:mb-4">
                                {renderStars(review.rating)}
                                <span className="text-gray-600">
                                  ({review.rating}/5)
                                </span>
                              </div>
                              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                                {review.review}
                              </p>
                            </motion.div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                  <Link href="/test-drive">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-[#f1b274] text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-[#e5a066] transition-colors"
                    >
                      Schedule Test Drive
                    </motion.button>
                  </Link>
                  <a href="tel:+250795570900">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 border-2 border-[#f1b274] text-[#f1b274] py-2 md:py-3 rounded-lg font-semibold hover:bg-[#f1b274] hover:text-white transition-colors"
                    >
                      Contact Dealer
                    </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* External Navigation */}
      <div className="flex justify-center gap-4 mt-4">
        <button className="main-prev p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <RiArrowLeftLine className="text-[#f1b274] text-xl md:text-2xl" />
        </button>
        <button className="main-next p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <RiArrowRightLine className="text-[#f1b274] text-xl md:text-2xl" />
        </button>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #f1b274 !important;
        }

        /* Hide default navigation arrows */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        /* Review cards shadow on mobile */
        @media (max-width: 640px) {
          .review-swiper .swiper-slide {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}
