import Footer from "./components/footer";
import HomeSlider from "./components/hero";
import DesktopNav from "./components/navbar";
import FeaturedCarTile from "./components/new/featured-car-tile";
import PopularBrands from "./components/new/popular-brands";
import ContactSection from "./components/new/contact-us";
import CarReview from "./components/car-review";

const sampleCars = [
  {
    id: "1",
    name: "BYD Seal",
    model: "Electric",
    year: 2024,
    price: 125000,
    rating: 4.5,
    images: ["/assets/bydseal.jpeg", "/assets/bydseal1.jpeg"],
    specs: {
      engine: "4.0L V8 Biturbo",
      transmission: "9-speed automatic",
      horsepower: 496,
      acceleration: "0-60 mph in 2.4s",
      topSpeed: "155 mph"
    },
    description: "BYD seal is a chinese car with high acceleration combining elegance and performance."
  },
  {
    id: "2",
    name: "Dongfeng Nano Box",
    model: "740i",
    year: 2023,
    price: 115000,
    rating: 4.3,
    images: ["/assets/dongfeng.jpg", "/assets/dongfeng1.jpg"],
    specs: {
      engine: "3.0L Turbocharged I6",
      transmission: "8-speed automatic",
      horsepower: 375,
      acceleration: "0-60 mph in 5.1s",
      topSpeed: "155 mph"
    },
    description: "The BMW 7 Series combines dynamic performance with exceptional comfort."
  },
  {
    id: "3",
    name: "Wuling Baojun",
    model: "Baojun",
    year: 2024,
    price: 8000,
    rating: 4.4,
    images: ["/assets/wuling.jpeg", "/assets/wuling1.jpeg", "/assets/wuling2.jpeg"],
    specs: {
      engine: "3.0L Turbo V6",
      transmission: "8-speed automatic",
      horsepower: 335,
      acceleration: "0-60 mph in 5.6s",
      topSpeed: "155 mph"
    },
    description: "The Audi A8 L offers cutting-edge technology and refined elegance."
  }
];

export default function Home() {
  return (
    <div className="bg-gray-100">
      <DesktopNav />
      <HomeSlider />
      <FeaturedCarTile />
      <PopularBrands />
      <CarReview cars={sampleCars} />
      <ContactSection />
      <Footer />
    </div>
  )
}