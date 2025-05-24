"use client";

import Typewriter from "typewriter-effect";

export default function InventoryHero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dc5mdwzoz/image/upload/v1748080029/longtai/ogxpvgil6rdiroan0rmi.png')",
        }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Longtai Virtual Showroom
        </h1>
        <div className="text-lg md:text-xl max-w-2xl mx-auto">
          <Typewriter
            options={{
              strings: [
                "Visit us in person at any moment.",
                "Book yourself a test drive.",
                "Face to face deal with us.",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
              cursor: "|",
            }}
          />
        </div>
      </div>
    </section>
  );
}
