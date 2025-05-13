import DesktopNav from "../../components/navbar";
import Footer from "../../components/footer";
import InventoryHero from "../../components/inventory-hero";
import BannerWani from "../../components/inter";
import CarsBanner from "../../components/showRoom";

export default function Inventory(){

    return (
        <>
            <DesktopNav />
            <InventoryHero />
            <CarsBanner />
            <BannerWani />
            <Footer />
        </>
    )
}