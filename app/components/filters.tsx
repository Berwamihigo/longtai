"use client";

import React, { useState } from "react";

const FilterSidebar = () => {
  const [showFilter, setShowFilter] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setShowFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isOpen = (key: string) => !!showFilter[key];

  return (
    <aside className="flex flex-col gap-10 p-6 bg-white border rounded-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <ul className="space-y-4">
        {/* Vehicles */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("vehicle")}
          >
            <span className="font-medium">Vehicles</span>
            <i className="ri-add-line text-lg" />
          </div>
          {isOpen("vehicle") && (
            <ul className="mt-2 pl-2 space-y-2">
              {["Sedans", "Truck", "Electric", "SUVs", "Vans"].map(
                (type, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>{type}</span>
                    </label>
                    <span className="text-sm text-gray-500">
                      ({Math.floor(Math.random() * 10) + 1})
                    </span>
                  </li>
                )
              )}
            </ul>
          )}
        </li>

        {/* Price */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("price")}
          >
            <span className="font-medium">Price</span>
            <i className="ri-add-line text-lg" />
          </div>
          {isOpen("price") && (
            <div className="mt-2 space-y-2">
              <input type="range" className="w-full" />
              <div className="flex justify-between text-sm text-gray-600">
                <div>
                  <p>Min</p>
                  <p>$12,657</p>
                </div>
                <div>
                  <p>Max</p>
                  <p>$45,000</p>
                </div>
              </div>
            </div>
          )}
        </li>

        {/* MPG / Range */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("miles")}
          >
            <span className="font-medium">Miles per Gallon</span>
            <i className="ri-add-line text-lg" />
          </div>
          {isOpen("miles") && (
            <ul className="mt-2 pl-2 space-y-1">
              {["5-10", "10-15", "15-20", "20-25"].map((range, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{range}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Seating */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("seat")}
          >
            <span className="font-medium">Available Seating</span>
            <i className="ri-add-line text-lg" />
          </div>
          {isOpen("seat") && (
            <ul className="mt-2 pl-2 space-y-1">
              {[2, 4, 5, 7, "9+"].map((num, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{num}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Year */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("year")}
          >
            <span className="font-medium">Year</span>
            <i className="ri-add-line text-lg" />
          </div>
          {isOpen("year") && (
            <ul className="mt-2 pl-2 space-y-1">
              {[2025, 2024, 2023].map((year, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{year}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default FilterSidebar;
