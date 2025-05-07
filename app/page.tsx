import Footer from "./components/footer";
import HomeSlider from "./components/hero";
import DesktopNav from "./components/navbar";
import FeaturedCars from "./components/featured";
import Services from "./components/services";
import Banner from "./components/banner";
import BannerWani from "./components/inter";
import FeaturedCarTile from "./components/new/featured-car-tile";
import PopularBrands from "./components/new/popular-brands";
import ContactSection from "./components/new/contact-us";
import CarReview from "./components/car-review";

const sampleCars = [
  {
    id: "1",
    name: "Mercedes-Benz S-Class",
    model: "S 580",
    year: 2024,
    price: 125000,
    rating: 4.5,
    images: ["/assets/txl.jpg", "/assets/evpolestar.jpg"],
    specs: {
      engine: "4.0L V8 Biturbo",
      transmission: "9-speed automatic",
      horsepower: 496,
      acceleration: "0-60 mph in 4.4s",
      topSpeed: "155 mph"
    },
    description: "The Mercedes-Benz S-Class represents the pinnacle of luxury and innovation."
  },
  {
    id: "2",
    name: "BMW 7 Series",
    model: "740i",
    year: 2023,
    price: 115000,
    rating: 4.3,
    images: ["/assets/bmw1.jpg", "/assets/bmw2.jpg"],
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
    name: "Audi A8",
    model: "A8 L",
    year: 2024,
    price: 98000,
    rating: 4.4,
    images: ["/assets/audi1.jpg", "/assets/audi2.jpg"],
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
      {/* <FeaturedCars /> */}
      <div className=""><FeaturedCarTile /></div>
      <PopularBrands />
      {/* <Services /> */}
      {/* <Banner /> */}
      <CarReview cars={sampleCars} />
      <ContactSection />
      {/* <BannerWani /> */}
      <Footer />
    </div>
  )
}