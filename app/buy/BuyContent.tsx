"use client";

import { useSearchParams } from "next/navigation";
import CarHero from "./CarHero";
import CarCards from "./CarCards";

export default function BuyContent() {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "hybrid" | "electric") || "hybrid";

  return (
    <>
      <CarHero type={type} />
      <CarCards type={type} />
    </>
  );
}
