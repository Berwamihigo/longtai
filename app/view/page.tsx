"use client";

import { Suspense } from "react";
import CarHero from "../components/car-hero";
import CarCustomizer from "../components/car-view";
import Footer from "../components/footer";
import DesktopNav from "../components/navbar";
import { useSearchParams } from "next/navigation";

function ViewContent() {
  const searchParams = useSearchParams();
  const carName = searchParams.get("name") || "";

  return (
    <section>
      <DesktopNav />
      <CarHero name={carName} />
      <CarCustomizer />
      <Footer />
    </section>
  );
}

export default function View() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    }>
      <ViewContent />
    </Suspense>
  );
}
