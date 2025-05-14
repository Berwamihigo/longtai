import AdvancedCarSearch from "./components/form";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";



export default function Home(){
    return(
        <main className="bg-gray-300">
            <Navbar />
            <AdvancedCarSearch />
            <Footer />
        </main>
    )
}
