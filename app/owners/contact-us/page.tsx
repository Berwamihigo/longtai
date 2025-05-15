import DesktopNav from "../../components/navbar"
import BannerWani from "../../components/inter";
import Footer from "../../components/footer";
import OwnerHero from "../../components/owner-hero";
import ContactSection from "@/app/components/new/contact-us";
export default function Home() {
  return (
    <>
      <DesktopNav />
      <OwnerHero />
      <ContactSection />
      <BannerWani />
      <Footer />
    </>
  )
}
