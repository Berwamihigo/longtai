import React from "react";

export default function CarHero({ type }: { type: "hybrid" | "electric" }) {
  return (
    <section className="w-full bg-gradient-to-r from-blue-100 to-purple-100 py-12 mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
        {type === "hybrid" ? "Buy Hybrids" : "Buy Electric Cars"}
      </h1>
      <p className="text-lg text-blue-700">
        {type === "hybrid"
          ? "Explore our selection of advanced hybrid vehicles."
          : "Discover the latest electric cars for a sustainable future."}
      </p>
    </section>
  );
}
