"use client";

import Link from "next/link";
import React from "react";

export default function BannerWani() {
  return (
    <section className="relative w-full h-screen overflow-hidden mb-10">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero/wallpaper.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8">
          Drive change your way
        </h1>
        
        <div className="mt-6">
          <Link href="/inventory">
            <button className="flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Beyond the Limits
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="ml-2 fill-current"
              >
                <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}