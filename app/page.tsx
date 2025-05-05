import Footer from "./components/footer";
import HomeSlider from "./components/hero";
import DesktopNav from "./components/navbar";
import FeaturedCars from "./components/featured";
import Services from "./components/services";
import Banner from "./components/banner";
import BannerWani from "./components/inter";

export default function Home() {
  return (
    <>
      <DesktopNav />
      <HomeSlider />
      <FeaturedCars />
      <Services />
      <Banner />
      <BannerWani />
      <Footer />
    </>
  )
}
