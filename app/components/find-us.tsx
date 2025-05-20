"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from "next/image";
import {
  FaCar,
  FaTools,
  FaKey,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function FindUs() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const locations = [
    {
      country: "Rwanda",
      flag: "🇷🇼",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/assets/back.png",
      phone: "+250788123456",
      email: "info@rwanda.autozone.com",
      services: ["Car Sales", "Accessories Shopping"],
    },
    {
      country: "Djibouti",
      flag: "🇩🇯",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/djibouti.jpg",
      phone: "+25377123456",
      email: "contact@djibouti.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"],
    },
    {
      country: "Angola",
      flag: "🇦🇴",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/angola.jpg",
      phone: "+244923123456",
      email: "sales@angola.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"],
    },
    {
      country: "Iran",
      flag: "🇮🇷",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/iran.jpg",
      phone: "+982112345678",
      email: "support@iran.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"],
    },
    {
      country: "Ethiopia",
      flag: "🇪🇹",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/ethiopia.jpg",
      phone: "+251911123456",
      email: "info@ethiopia.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"],
    },
  ];

  const serviceIcons: Record<string, React.ReactElement> = {
    "Car Sales": <FaCar className="text-[#e5a666]" />,
    "Car Rentals": <FaKey className="text-[#e5a666]" />,
    "Accessories Shopping": <FaTools className="text-[#e5a666]" />,
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800 relative">
          <span className="inline-block relative pb-2">
            Our Global Presence
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-[#f1b274] to-[#e5a666] rounded-full"></span>
          </span>
        </h2>

        {/* Custom Navigation Arrows */}
        <div ref={prevRef} className="custom-swiper-nav left-4">
          <FaArrowLeft />
        </div>
        <div ref={nextRef} className="custom-swiper-nav right-4">
          <FaArrowRight />
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="global-presence-swiper px-12"
        >
          {locations.map((location, index) => (
            <SwiperSlide key={index}>
              <div className="group relative bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl h-full transform hover:-translate-y-2">
                <div className="flex flex-col items-center h-full space-y-4">
                  {/* Flag and Title */}
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-5xl animate-pulse">
                      {location.flag}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                      {location.country}
                    </h3>
                  </div>

                  {/* Image / Map Transition */}
                  <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md transition-all duration-500">
                    <div className="absolute inset-0 z-0 transition-opacity duration-500 group-hover:opacity-0">
                      <Image
                        src={location.image}
                        alt={`Image of ${location.country}`}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="/placeholder.jpg"
                      />
                    </div>
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <iframe
                        src={location.mapUrl}
                        width="100%"
                        height="100%"
                        className="border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>

                  {/* Services Offered */}
                  <div className="w-full mt-3 text-sm">
                    <h4 className="text-gray-700 font-semibold text-center mb-2">
                      Services Offered
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center justify-between">
                      {location.services.map((service, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-gray-600 text-sm font-medium shadow-sm"
                        >
                          {serviceIcons[service]} {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Button */}
                  <a
                    href={`https://longtaiafc.com/inventory`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full bg-gradient-to-r from-[#f1b274] to-[#e5a666] text-white py-3 px-6 rounded-xl text-center font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:from-[#e5a666] hover:to-[#d88f44] transform hover:-translate-y-1"
                  >
                    Explore Inventory →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom arrow styles */}
      <style jsx global>{`
        .custom-swiper-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: white;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          color: #f1b274;
        }

        .custom-swiper-nav:hover {
          background: #fef7f1;
          transform: translateY(-50%) scale(1.05);
        }

        .custom-swiper-nav svg {
          width: 16px;
          height: 16px;
        }

        .global-presence-swiper {
          padding: 20px 0 40px;
        }

        .global-presence-swiper .swiper-slide {
          transition: transform 0.4s ease, box-shadow 0.3s ease;
        }

        .global-presence-swiper .swiper-slide:hover {
          transform: translateY(-6px);
        }

        @media (max-width: 640px) {
          .custom-swiper-nav {
            width: 32px;
            height: 32px;
          }
          
          .custom-swiper-nav svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </div>
  );
}
