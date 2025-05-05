'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

type CarData = {
  mainImageUrl: string;
  subImageUrls?: string[];
  year?: string | number;
  make?: string;
  category?: string;
  seats?: string | number;
  zeroToSixty?: string;
  powerType?: string;
  fullCharge?: string;
  range?: string;
  fullTank?: string;
  mpgRange?: { min: string; max: string };
  price?: number | string;
  description?: string;
};

export default function CarCustomizer() {
  const searchParams = useSearchParams();
  const carName = searchParams.get('name') || '';
  const [car, setCar] = useState<CarData | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (!carName) return;
    fetch(`/api/getparticular?name=${encodeURIComponent(carName)}`)
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        if (data.success) {
          console.log('Car Data:', data.data);
          setCar(data.data);
          setMainImage(data.data.mainImageUrl);
        }
      })
      .catch(error => {
        console.error('Error fetching car:', error);
      });
  }, [carName]);

  if (!car) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-lg text-gray-500">
        Loading car details...
      </div>
    );
  }

  console.log('Current car state:', car);
  console.log('SubImages:', car.subImageUrls);
  const subImages = car.subImageUrls || [];

  return (
    <section className="flex flex-col md:flex-row gap-10 p-6 md:p-10 lg:p-16 text-black min-h-screen">
      {/* Left Side - Main & Thumbnails */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="relative aspect-[5/3] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white">
          {mainImage && (
            <Image
              src={mainImage}
              alt="Main Vehicle"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        {subImages.length > 0 && (
          <div className="relative">
            <Swiper
              modules={[FreeMode]}
              freeMode={true}
              spaceBetween={8}
              slidesPerView="auto"
              className="!pb-2"
            >
              {subImages.map((img, i) => (
                <SwiperSlide key={i} className="!w-24">
                  <div
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                      mainImage === img ? 'border-blue-500 scale-105' : 'border-transparent hover:border-blue-400'
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* Right Side - Car Info */}
      <div className="flex-1 space-y-6">
        <div className="space-y-4 p-6 lg:p-8 xl:p-10 w-full backdrop-blur-lg rounded-3xl border border-white/10 hover:shadow-blue-900/20 transition bg-white/80">
          <ul className="text-gray-800 text-base space-y-2 pl-2">
            {car.year && (
              <li>
                <span className="text-gray-700 font-medium">Year:</span> {car.year}
              </li>
            )}
            {car.make && (
              <li>
                <span className="text-gray-700 font-medium">Make:</span> {car.make}
              </li>
            )}
            {car.category && (
              <li>
                <span className="text-gray-700 font-medium">Category:</span> {car.category}
              </li>
            )}
            {car.seats && (
              <li>
                <span className="text-gray-700 font-medium">Seats:</span> {car.seats}
              </li>
            )}
            {car.zeroToSixty && (
              <li>
                <span className="text-gray-700 font-medium">0-60 mph:</span> {car.zeroToSixty} sec
              </li>
            )}
            {car.powerType && (
              <li>
                <span className="text-gray-700 font-medium">Power Type:</span> {car.powerType}
              </li>
            )}
            {car.powerType === 'Electric' && car.fullCharge && (
              <li>
                <span className="text-gray-700 font-medium">Full Charge:</span> {(parseFloat(car.fullCharge) / 60).toFixed(1)} h
              </li>
            )}
            {car.powerType === 'Electric' && car.range && (
              <li>
                <span className="text-gray-700 font-medium">Range:</span> {car.range}
              </li>
            )}
            {car.powerType !== 'Electric' && car.fullTank && (
              <li>
                <span className="text-gray-700 font-medium">Full Tank:</span> {car.fullTank}
              </li>
            )}
            {car.powerType === 'Hybrid' && car.mpgRange && car.mpgRange.min && car.mpgRange.max && (
              <li>
                <span className="text-gray-700 font-medium">MPG:</span> {car.mpgRange.min} - {car.mpgRange.max}
              </li>
            )}
            {car.price && (
              <li>
                <span className="text-gray-700 font-medium">Price:</span> RWF {Number(car.price).toLocaleString()}
              </li>
            )}
          </ul>
        </div>
        {car.description && (
          <div className="bg-white/90 rounded-xl p-6 shadow text-gray-700 text-base">
            <span className="font-semibold text-lg block mb-2">Description</span>
            {car.description}
          </div>
        )}
      </div>
    </section>
  );
}
