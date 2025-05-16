// app/buy/page.tsx

import { Suspense } from "react";
import Navbar from "../components/navbar";
import BuyContent from "./BuyContent";
import Footer from "../components/footer";



export default function BuyPage() {

    
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense
        fallback={<div className="text-center py-8">Loading cars...</div>}
      >
        <BuyContent />
      </Suspense>
      <Footer />
    </div>
  );
}
