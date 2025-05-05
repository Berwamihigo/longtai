import DesktopNav from "../components/navbar"
import BannerWani from "../components/inter";
import Footer from "../components/footer";
import OwnerHero from "../components/owner-hero";
import AboutLongtai from "../components/about";

export default function Home() {
  return (
    <>
      <DesktopNav />
      <OwnerHero />
      <AboutLongtai />
      <BannerWani />
      <Footer />
    </>
  )
}
