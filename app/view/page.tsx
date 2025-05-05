"use client";

import DesktopNav from "../components/navbar";
import Footer from "../components/footer";
import CarHero from "../components/car-hero";
import CarCustomizer from "../components/car-view";
import { useSearchParams } from "next/navigation";

export const dynamic = 'force-dynamic'; // <-- Add this line to prevent static generation

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
