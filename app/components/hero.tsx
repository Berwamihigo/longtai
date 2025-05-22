"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import {
  RiArrowRightSLine,
  RiSearchLine,
  RiPlugLine,
  RiLeafLine,
  RiLineChartLine,
} from "react-icons/ri";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface SearchResult {
  id: string;
  make: string;
  model: string;
  year: string;
}


const videos = [
  "/hero/hero2.mp4",
  "/hero/hero1.mp4",
  "/hero/hero3.mp4",
  "/hero/wallpaper.mp4",
];

export default function Hero() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/customizedSearch?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => performSearch(value), 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    performSearch(searchQuery);
  };

  const goToPrevSlide = () => swiperRef.current?.slidePrev();
  const goToNextSlide = () => swiperRef.current?.slideNext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative h-[87vh] w-full overflow-hidden">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          const currentVideo = videoRefs.current[swiper.realIndex];
          if (currentVideo) {
            currentVideo.currentTime = 0;
            currentVideo.play();
          }
        }}
        className="h-full w-full"
      >
        {videos.map((videoSrc, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Video Layer */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                autoPlay
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                onEnded={() => swiperRef.current?.slideNext()}
              >
                <source
                  src={videoSrc}
                  type={`video/${videoSrc.endsWith(".webm") ? "webm" : "mp4"}`}
                />
                Your browser does not support the video tag.
              </video>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white px-4 pointer-events-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          <Typewriter
            options={{
              strings: ["Luxury Cars", "Premium Vehicles", "Exclusive Models"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Experience the Ultimate Driving Pleasure
        </p>

        {/* Search */}
        <div ref={searchRef} className="w-full max-w-2xl mb-8 px-4 relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for makes, models, or features..."
              className="w-full py-4 px-6 pr-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-300 text-white placeholder-white/70"
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
              disabled={isSearching}
            >
              <RiSearchLine size={24} />
            </button>
          </form>

          {searchResults.length > 0 ||
          isSearching ||
          (searchQuery && !isSearching) ? (
            <div className="absolute z-[6000] w-full mt-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
              {isSearching ? (
                <div className="p-4 text-center text-gray-700">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <li key={result.id} className="border-b border-gray-200">
                      <a
                        href={`/view?name=${result.id}`}
                        className="block p-4 hover:bg-gray-100 text-gray-800"
                      >
                        <div className="font-medium">{result.make}</div>
                        <div className="text-sm text-gray-600">
                          {result.model} • {result.year}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-gray-700">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Buttons */}
        <div className="mx-auto flex flex-wrap justify-center gap-3 min-[440px]:inline-flex min-[440px]:max-w-[330px] min-[640px]:flex-nowrap pt-3 pb-4">
          <Link
            className="flex flex-col items-center justify-center w-full text-center shadow-md hover:shadow-lg rounded-[10px] bg-[rgba(100,100,100,0.60)] md:bg-[rgba(0,0,0,0.60)] backdrop-blur-md h-[132px] gap-2 min-[280px]:w-[calc(50%_-_10px)] min-[440px]:min-w-[132px] min-[440px]:max-w-[25%] bg-[radial-gradient(circle_at_top,_rgba(235,0,139,0.15)_0%,_rgba(230,230,230,0.1)_39%,_rgba(255,255,255,0)_100%)]"
            href="/buy?type=electric"
          >
            <RiPlugLine size={24} />
            <span className="text-white flex items-center">
              Shop Electric <RiArrowRightSLine />
            </span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center w-full text-center shadow-md hover:shadow-lg rounded-[10px] bg-[rgba(100,100,100,0.60)] md:bg-[rgba(0,0,0,0.60)] backdrop-blur-md h-[132px] gap-2 min-[280px]:w-[calc(50%_-_10px)] min-[440px]:min-w-[132px] min-[440px]:max-w-[25%] bg-[radial-gradient(circle_at_top,_rgba(6,174,170,0.15)_0%,_rgba(230,230,230,0.1)_39%,_rgba(255,255,255,0)_100%)]"
            href="/buy?type=hybrid"
          >
            <RiLeafLine size={24} />
            <span className="text-white flex items-center">
              Shop Hybrid <RiArrowRightSLine />
            </span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center w-full text-center shadow-md hover:shadow-lg rounded-[10px] bg-[rgba(100,100,100,0.60)] md:bg-[rgba(0,0,0,0.60)] backdrop-blur-md h-[132px] gap-2 min-[280px]:w-[calc(50%_-_10px)] min-[440px]:min-w-[132px] min-[440px]:max-w-[25%] bg-[radial-gradient(circle_at_top,_rgba(6,174,170,0.15)_0%,_rgba(230,230,230,0.1)_39%,_rgba(255,255,255,0)_100%)]"
            href="/accessories"
          >
            <RiLineChartLine size={24} />
            <span className="text-white flex items-center">
              Accessories <RiArrowRightSLine />
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between z-40 px-4 pointer-events-none">
  <button
    onClick={goToPrevSlide}
    className="p-3 rounded-full bg-black/40 hover:bg-orange-500 text-white shadow-xl hover:scale-110 transition pointer-events-auto"
    aria-label="Previous"
  >
    <HiChevronLeft size={28} />
  </button>
  <button
    onClick={goToNextSlide}
    className="p-3 rounded-full bg-black/40 hover:bg-orange-500 text-white shadow-xl hover:scale-110 transition pointer-events-auto"
    aria-label="Next"
  >
    <HiChevronRight size={28} />
  </button>
</div>

      {/* Swiper Pagination Bullets Styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #f1b274 !important;
          transition: transform 0.3s;
        }
        .swiper-pagination-bullet-active {
          background-color: #f1b274 !important;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
