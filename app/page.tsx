"use client";

import Footer from "./components/footer";
import HomeSlider from "./components/hero";
import DesktopNav from "./components/navbar";
import FeaturedCarTile from "./components/new/featured-car-tile";
import PopularBrands from "./components/new/popular-brands";
import ContactSection from "./components/new/contact-us";
import CarReview from "./components/car-review";
import dynamic from "next/dynamic";

const WhyChooseUs = dynamic(() => import("./components/new/why-choose-us"), {
  ssr: false,
});

const ServicesOffered = dynamic(
  () => import("./components/new/services-offered"),
  {
    ssr: false,
  }
);

const sampleCars = [
  {
    id: "1",
    name: "GEELY RADAR HORIZON",
    model: "Electric",
    year: 2024,
    price: 44000000,
    rating: 4.5,
    images: ["https://res.cloudinary.com/dc5mdwzoz/image/upload/v1746979319/cars/main/zodgb6xcmmn4cutavkaw.jpg", "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1746979320/cars/sub/qy71uvrftujzpfgyywz6.jpg", "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1746979321/cars/sub/vlnk4hbnc2b6d4hxqdsb.jpg"],
    specs: {
      engine: "4.0L V8 Biturbo",
      transmission: "9-speed automatic",
      horsepower: 496,
      acceleration: "0-60 mph in 2.4s",
      topSpeed: "155 mph",
    },
    description:
      "The 2024 Geely Radar RD6 Horizon is an all-electric pickup with powerful dual-motor AWD, a spacious cargo bed, and advanced features like vehicle-to-load power output. It offers strong performance, modern design, and impressive electric range, making it ideal for both work and adventure."
  },
  {
    id: "2",
    name: "Toyota Prado Landcruiser",
    model: "740i",
    year: 2024,
    price: 135000000,
    rating: 4.3,
    images: ["https://res.cloudinary.com/dc5mdwzoz/image/upload/v1746978219/cars/main/qnksz7odjwi0ea0wrxof.jpg", "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1746978220/cars/sub/lyrhd94a8tucsnuarsvz.jpg", "https://res.cloudinary.com/dc5mdwzoz/image/upload/v1746978220/cars/sub/fbciyoadajnnpoapxci9.jpg"],
    specs: {
      engine: "3.0L Turbocharged I6",
      transmission: "8-speed automatic",
      horsepower: 375,
      acceleration: "0-60 mph in 5.1s",
      topSpeed: "155 mph",
    },
    description:
      "The 2024 Toyota Land Cruiser Prado Hybrid blends rugged performance with fuel efficiency, featuring a 2.4L turbo hybrid engine, 8-speed automatic transmission, and advanced off-road tech. It offers a refined interior, modern safety features, and strong capability for both city driving and off-road adventures.",
  },

];

export default function Home() {
  return (
    <div className="bg-gray-100">
      <DesktopNav />
      <HomeSlider />
      <FeaturedCarTile />
      <WhyChooseUs />
      <ServicesOffered />
      <PopularBrands />
      <CarReview cars={sampleCars} />
      <ContactSection />
      <Footer />
    </div>
  );
}
