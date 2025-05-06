import ShoppingToolsHero from '../components/shopping-tools/hero';
import ToolsGrid from '../components/shopping-tools/tools-grid';
import CarFinder from '../components/shopping-tools/car-finder';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function ShoppingToolsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
        <Navbar />
      <ShoppingToolsHero />
      {/* <CarFinder /> */}
      <ToolsGrid />
      <Footer />
    </main>
  );
} 
