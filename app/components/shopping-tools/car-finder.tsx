"use client"

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const brands = [
  "Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Lexus", "Hyundai", "Kia", "Nissan"
];

const bodyTypes = [
  "Sedan", "SUV", "Hatchback", "Coupe", "Wagon", "Pickup", "Van", "Minivan"
];

const priceRanges = [
  "Under $10,000",
  "$10,000 - $20,000",
  "$20,000 - $30,000",
  "$30,000 - $40,000",
  "$40,000 - $50,000",
  "Over $50,000"
];

export default function CarFinder() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Car</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Use our advanced search tools to find the car that matches your preferences
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by make, model, or keyword"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
            />
          </div>
          <button
            className="bg-[#f1b274] text-white px-6 py-3 rounded-lg hover:bg-[#e5a666] transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="border border-gray-200 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brand Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200">
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Body Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Type
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200">
                <option value="">Select Body Type</option>
                {bodyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200">
                <option value="">Select Price Range</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Filters */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  placeholder="Min Year"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage
                </label>
                <input
                  type="number"
                  placeholder="Max Mileage"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200">
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200">
                  <option value="">Select Transmission</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center py-12">
          <p className="text-gray-600">Start your search to see results</p>
        </div>
      </div>
    </div>
  );
} 