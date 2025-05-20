"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function FindUs() {
  const locations = [
    {
      country: "Rwanda",
      flag: "🇷🇼",
      address: "Longtai auto 51 KN 1 Rd, Kigali",
      phone: "+250 795 570 900",
      email: "info@longtai.com",
      hours: {
        weekdays: "8AM - 6PM",
        saturday: "9AM - 4PM",
        sunday: "Closed"
      }
    },
    {
      country: "Kenya",
      flag: "🇰🇪",
      address: "Longtai auto, Mombasa Road, Nairobi",
      phone: "+254 712 345 678",
      email: "info.ke@longtai.com",
      hours: {
        weekdays: "8AM - 6PM",
        saturday: "9AM - 4PM",
        sunday: "Closed"
      }
    },
    {
      country: "Uganda",
      flag: "🇺🇬",
      address: "Longtai auto, Entebbe Road, Kampala",
      phone: "+256 712 345 678",
      email: "info.ug@longtai.com",
      hours: {
        weekdays: "8AM - 6PM",
        saturday: "9AM - 4PM",
        sunday: "Closed"
      }
    },
    {
      country: "Tanzania",
      flag: "🇹🇿",
      address: "Longtai auto, Morogoro Road, Dar es Salaam",
      phone: "+255 712 345 678",
      email: "info.tz@longtai.com",
      hours: {
        weekdays: "8AM - 6PM",
        saturday: "9AM - 4PM",
        sunday: "Closed"
      }
    },
    {
      country: "Ethiopia",
      flag: "🇪🇹",
      address: "Longtai auto, Bole Road, Addis Ababa",
      phone: "+251 912 345 678",
      email: "info.et@longtai.com",
      hours: {
        weekdays: "8AM - 6PM",
        saturday: "9AM - 4PM",
        sunday: "Closed"
      }
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 relative">
          Where To Find Us
        </h2>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="find-us-swiper"
          >
            {locations.map((location, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center justify-center mb-8">
                    <span className="text-6xl mr-4">{location.flag}</span>
                    <h3 className="text-3xl font-bold text-gray-800">{location.country}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Map Section */}
                    <div className="min-h-[350px] relative group">
                      <div className="absolute inset-0 overflow-hidden rounded-xl shadow-lg">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5328508467974!2d30.056249275049804!3d-1.939409498042992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5b36bbb7c65%3A0x111d633f0fdd9f4c!2sLongtai%20auto!5e0!3m2!1sen!2srw!4v1746631686784!5m2!1sen!2srw"
                          width="100%"
                          height="100%"
                          className="border-0"
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>

                    {/* Contact & Hours Section */}
                    <div className="space-y-8">
                      {/* Contact Info */}
                      <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl">
                        <h4 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h4>
                        <div className="space-y-3 text-gray-600">
                          <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location.address}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {location.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {location.email}
                          </p>
                        </div>
                      </div>

                      {/* Working Hours */}
                      <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl">
                        <h4 className="text-xl font-semibold mb-4 text-gray-800">Working Hours</h4>
                        <div className="space-y-3 text-gray-600">
                          <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Monday - Friday: {location.hours.weekdays}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Saturday: {location.hours.saturday}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Sunday: {location.hours.sunday}
                          </p>
                        </div>
                      </div>

                      {/* Contact Button */}
                      <button className="w-full bg-[#f1b274] text-white py-3 px-6 rounded-lg hover:bg-[#e5a666] transition-colors duration-300 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .find-us-swiper {
          padding: 20px 0;
        }
        .find-us-swiper .swiper-button-next,
        .find-us-swiper .swiper-button-prev {
          color: #f1b274;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .find-us-swiper .swiper-button-next:after,
        .find-us-swiper .swiper-button-prev:after {
          font-size: 18px;
        }
        .find-us-swiper .swiper-button-disabled {
          opacity: 0.35;
        }
      `}</style>
    </div>
  );
}
