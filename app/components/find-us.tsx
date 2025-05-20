"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { FaCar, FaTools, FaKey, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function FindUs() {
  const locations = [
    {
      country: "Rwanda",
      flag: "🇷🇼",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/assets/back.png",
      phone: "+250788123456",
      email: "info@rwanda.autozone.com",
      services: ["Car Sales", "Accessories Shopping"]
    },
    {
      country: "Djibouti",
      flag: "🇩🇯",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/djibouti.jpg",
      phone: "+25377123456",
      email: "contact@djibouti.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"]
    },
    {
      country: "Angola",
      flag: "🇦🇴",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/angola.jpg",
      phone: "+244923123456",
      email: "sales@angola.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"]
    },
    {
      country: "Iran",
      flag: "🇮🇷",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/iran.jpg",
      phone: "+982112345678",
      email: "support@iran.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"]
    },
    {
      country: "Ethiopia",
      flag: "🇪🇹",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
      image: "/countries/ethiopia.jpg",
      phone: "+251911123456",
      email: "info@ethiopia.autozone.com",
      services: ["Car Sales", "Car Rentals", "Accessories Shopping"]
    },
  ];

  const serviceIcons: Record<string, React.ReactElement> = {
    "Car Sales": <FaCar className="text-[#e5a666]" />,
    "Car Rentals": <FaKey className="text-[#e5a666]" />,
    "Accessories Shopping": <FaTools className="text-[#e5a666]" />,
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800 relative">
          <span className="inline-block relative pb-2">
            Our Global Presence
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-[#f1b274] to-[#e5a666] rounded-full"></span>
          </span>
        </h2>

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
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="global-presence-swiper"
        >
          {locations.map((location, index) => (
            <SwiperSlide key={index}>
              <div className="group relative bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl h-full transform hover:-translate-y-2">
                <div className="flex flex-col items-center h-full space-y-4">

                  {/* Flag and Title */}
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-5xl animate-pulse">{location.flag}</span>
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
                    <h4 className="text-gray-700 font-semibold text-center mb-2">Services Offered</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center justify-between">
                      {location.services.map((service, i) => (
                        <li key={i} className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-gray-600 text-sm font-medium shadow-sm">
                          {serviceIcons[service]} {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Button */}
                  <a
                    href={`https://maps.google.com?q=${location.country}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full bg-gradient-to-r from-[#f1b274] to-[#e5a666] text-white py-3 px-6 rounded-xl text-center font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:from-[#e5a666] hover:to-[#d88f44] transform hover:-translate-y-1"
                  >
                    Explore Location →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .global-presence-swiper {
          padding: 20px 10px 40px;
        }

        .global-presence-swiper .swiper-button-next,
        .global-presence-swiper .swiper-button-prev {
          color: #f1b274;
          background: #ffffff;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .global-presence-swiper .swiper-button-next:hover,
        .global-presence-swiper .swiper-button-prev:hover {
          transform: scale(1.1);
          background: #f9fafb;
        }

        .global-presence-swiper .swiper-button-next:after,
        .global-presence-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .global-presence-swiper .swiper-slide {
          transition: transform 0.4s ease, box-shadow 0.3s ease;
        }

        .global-presence-swiper .swiper-slide:hover {
          transform: translateY(-6px);
        }
      `}</style>
    </div>
  );
}
