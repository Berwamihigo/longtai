"use client";

import Typewriter from "typewriter-effect";

export default function ShoppingToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dc5mdwzoz/image/upload/v1748080029/longtai/dazlke6a8afqmkkjtzah.png')",
          }}
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <Typewriter
              options={{
                strings: ["Shopping Tools", "Car Finder", "Vehicle History"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Explore our comprehensive suite of tools designed to make your car
            shopping experience seamless and enjoyable.
          </p>
        </div>
      </section>

      {/* You can add more sections below */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          More Shopping Resources
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Find the right car with our comparison tools, vehicle history reports,
          and personalized suggestions.
        </p>
      </section>
    </div>
  );
}
