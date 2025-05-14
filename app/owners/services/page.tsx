import DesktopNav from "../../components/navbar"
import BannerWani from "../../components/inter";
import Footer from "../../components/footer";
import OwnerHero from "../../components/owner-hero";
import ServicesOffered from "@/app/components/new/services-offered";

export default function Home() {
  return (
    <>
      <DesktopNav />
      <OwnerHero />
      <ServicesOffered />
      <BannerWani />
      <Footer />
    </>
  )
}
