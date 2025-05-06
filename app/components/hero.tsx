'use client';

import { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Image
              src={"/assets/txl.jpg"}
              alt="Luxury Car"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <Typewriter
                    options={{
                      strings: ['Luxury Cars', 'Premium Vehicles', 'Exclusive Models'],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h1>
                <p className="text-xl md:text-2xl mb-8">Experience the Ultimate Driving Pleasure</p>
                <Link
                  href="/inventory"
                  className="bg-[#f1b274] text-white px-8 py-3 rounded-full hover:bg-[#e5a066] transition-colors"
                >
                  Explore Inventory
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
}
