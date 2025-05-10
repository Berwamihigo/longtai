"use client";

import { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { RiArrowRightSLine, RiSearchLine, RiPlugLine, RiLeafLine } from "react-icons/ri";

const videos = ["/hero/vid1.webm", "/hero/vid2.webm", "/hero/vid3.webm", "/hero/vid4.webm", "/hero/vid5.webm", "/hero/vid6.webm", "/hero/vid7.webm"];

export default function Hero() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Play the video when active and set up ended event listener
  const playActiveVideo = (activeIndex: number) => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      
      // Remove previous ended event listeners
      video.onended = null;
      
      if (idx === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
        
        // Add new ended event listener
        video.onended = () => {
          if (swiperRef.current) {
            swiperRef.current.slideNext();
          }
        };
      } else {
        video.pause();
      }
    });
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const onSlideChange = () => {
      const realIndex = swiper.realIndex;
      playActiveVideo(realIndex);
    };

    swiper.on("slideChange", onSlideChange);
    playActiveVideo(swiper.realIndex);

    return () => {
      swiper.off("slideChange", onSlideChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative h-[87vh] w-full overflow-hidden">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-full w-full"
      >
        {videos.map((videoSrc, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <video
                ref={(el) => {videoRefs.current[index] = el; }}
                src={videoSrc}
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
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

        {/* Search Field */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-2xl mb-8 px-4"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for makes, models, or features..."
              className="w-full py-4 px-6 pr-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-white placeholder-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors duration-300"
            >
              <RiSearchLine size={24} />
            </button>
          </div>
        </form>

        {/* Action buttons */}
        <div className="mx-auto flex flex-wrap justify-center gap-3 min-[440px]:inline-flex min-[440px]:max-w-[330px] min-[640px]:flex-nowrap pt-3 pb-4">
          {/* Shop Hybrid */}
          <a
            className="linkable rounded flex flex-col items-center justify-center w-full text-center transition-[box-shadow] shadow-[2px_2px_7px_0_rgba(1,1,1,0.15)] duration-300 ease-[cubic-bezier(0.64,0.04,0.35,1)] hover:shadow-[2px_2px_6px_0_rgba(1,1,1,0.05),2px_4px_9px_0_rgba(1,1,1,0.15)] rounded-[10px] bg-[rgba(100,100,100,0.60)] md:bg-[rgba(0,0,0,0.60)] backdrop-blur-md relative h-[132px] gap-2 min-[280px]:w-[calc(50%_-_10px)] min-[440px]:min-w-[132px] min-[440px]:max-w-[25%] bg-[radial-gradient(circle_at_top,_rgba(235,0,139,0.15)_0%,_rgba(230,230,230,0.1)_39%,_rgba(255,255,255,0)_100%)]"
            href=""
          >
            <RiPlugLine size={24} />
            <span className="text-white flex items-center">
              Shop Electric <RiArrowRightSLine />
            </span>
          </a>

          {/* Shop Electric */}
          <a
            className="linkable rounded flex flex-col items-center justify-center w-full text-center transition-[box-shadow] shadow-[2px_2px_7px_0_rgba(1,1,1,0.15)] duration-300 ease-[cubic-bezier(0.64,0.04,0.35,1)] hover:shadow-[2px_2px_6px_0_rgba(1,1,1,0.05),2px_4px_9px_0_rgba(1,1,1,0.15)] rounded-[10px] bg-[rgba(100,100,100,0.60)] md:bg-[rgba(0,0,0,0.60)] backdrop-blur-md relative h-[132px] gap-2 min-[280px]:w-[calc(50%_-_10px)] min-[440px]:min-w-[132px] min-[440px]:max-w-[25%] bg-[radial-gradient(circle_at_top,_rgba(6,174,170,0.15)_0%,_rgba(230,230,230,0.1)_39%,_rgba(255,255,255,0)_100%)]"
            href=""
          >
            <RiLeafLine size={24} />
            <span className="text-white flex items-center">
              Shop Hybrid <RiArrowRightSLine />
            </span>
          </a>          
        </div>
      </div>

      {/* Custom Pagination Style */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #f1b274 !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #f1b274 !important;
        }
      `}</style>
    </div>
  );
}