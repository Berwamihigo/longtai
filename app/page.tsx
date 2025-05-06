import Footer from "./components/footer";
import HomeSlider from "./components/hero";
import DesktopNav from "./components/navbar";
import FeaturedCars from "./components/featured";
import Services from "./components/services";
import Banner from "./components/banner";
import BannerWani from "./components/inter";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <DesktopNav />
      <HomeSlider />
      <FeaturedCars />
      <Services />
      <Banner />
      <BannerWani />
      <Footer />
    </div>
  )
}
