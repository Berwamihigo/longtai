"use client"

import Typewriter from 'typewriter-effect';


export default function ShoppingToolsHero() {
 

  return (
    <div className="h-[40vh] w-full bg-white flex flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
        <Typewriter
          options={{
            strings: ['Shopping Tools', 'Car Finder', 'Vehicle History'],
            autoStart: true,
            loop: true,
          }}
        />
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto px-4">
          Explore our comprehensive suite of tools designed to make your car shopping experience seamless and enjoyable.
        </p>
      </div>
    </div>
  );
} 