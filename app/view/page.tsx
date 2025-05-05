"use client";

import CarHero from "../components/car-hero";
import CarCustomizer from "../components/car-view";
import Footer from "../components/footer";
import DesktopNav from "../components/navbar";
import { useSearchParams } from "next/navigation";

export default function View() {
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
