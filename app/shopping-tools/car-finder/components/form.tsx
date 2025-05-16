"use client";

import { useState, useEffect } from "react";
import {
  RiInformationLine,
  RiSearchLine,
  RiFilterLine,
  RiCloseLine,
} from "react-icons/ri";

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  monthlyPayment: number;
  downPayment: number;
  image: string;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  features: string[];
};

export default function AdvancedCarSearch() {
  // Search filters
  const [make, setMake] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000000]);
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState(36);
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Additional filters
  const [yearRange, setYearRange] = useState([2015, 2025]);
  const [mileageRange, setMileageRange] = useState([0, 100000]);
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");

  const carMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Mercedes",
    "Audi",
    "Tesla",
    "Lexus",
    "Chevrolet",
    "Nissan",
  ];
  const fuelTypes = [
    "Gasoline",
    "Diesel",
    "Hybrid",
    "Electric",
    "Plug-in Hybrid",
  ];
  const transmissions = ["Automatic", "Manual", "CVT"];

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getAllCars");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const { cars: apiCars } = await response.json();

        // Transform the API data to match our component's Car type
        const transformedCars: Car[] = apiCars.map((car: any) => {
          // Extract make and model from carName (assuming format "Make Model")
          const [carMake = "", carModel = ""] = car.name ? car.name.split(" ") : ["", ""];
          
          return {
            id: car.name || "unknown",
            make: carMake,
            model: carModel,
            year: parseInt(car.year) || 0,
            price: car.price || 0,
            monthlyPayment: calculateMonthlyPayment(car.price || 0, 0.1, loanTerm),
            downPayment: calculateDownPayment(car.price || 0, 0.1),
            image: car.mainImageUrl || "https://via.placeholder.com/300x200?text=No+Image",
            mileage: car.mileage || 0,
            color: "N/A", // Not in API
            fuelType: car.powerType || "N/A",
            transmission: "Automatic", // Not in API
            features: [
              ...(car.seats ? [`${car.seats} seats`] : []),
              ...(car.zeroToSixty ? [`0-60 in ${car.zeroToSixty}`] : []),
              ...(car.mpgRange ? [`MPG: ${car.mpgRange.min}-${car.mpgRange.max}`] : []),
            ],
          };
        });

        setAllCars(transformedCars);
        setSearchResults(transformedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [loanTerm]);

  // Helper functions for payment calculations
  const calculateMonthlyPayment = (price: number, interestRate: number, term: number) => {
    const principal = price * 0.9; // Assuming 10% down payment
    const monthlyInterest = interestRate / 12;
    return Math.round(
      (principal * monthlyInterest * Math.pow(1 + monthlyInterest, term)) /
        (Math.pow(1 + monthlyInterest, term) - 1)
    );
  };

  const calculateDownPayment = (price: number, percent: number) => {
    return Math.round(price * percent);
  };

  // Perform search when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [
    make,
    priceRange,
    downPayment,
    monthlyPayment,
    loanTerm,
    yearRange,
    mileageRange,
    fuelType,
    transmission,
  ]);

  const performSearch = () => {
    setIsSearching(true);

    // Filter cars based on search criteria
    const results = allCars.filter((car) => {
      const matchesMake =
        !make || car.make.toLowerCase().includes(make.toLowerCase());
      const matchesPrice =
        car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesDownPayment =
        !downPayment || car.downPayment <= parseInt(downPayment || "0");
      const matchesMonthlyPayment =
        !monthlyPayment ||
        car.monthlyPayment <= parseInt(monthlyPayment || "0");
      const matchesYear = car.year >= yearRange[0] && car.year <= yearRange[1];
      const matchesMileage =
        car.mileage >= mileageRange[0] && car.mileage <= mileageRange[1];
      const matchesFuelType =
        !fuelType ||
        car.fuelType.toLowerCase().includes(fuelType.toLowerCase());
      const matchesTransmission =
        !transmission ||
        car.transmission.toLowerCase().includes(transmission.toLowerCase());

      return (
        matchesMake &&
        matchesPrice &&
        matchesDownPayment &&
        matchesMonthlyPayment &&
        matchesYear &&
        matchesMileage &&
        matchesFuelType &&
        matchesTransmission
      );
    });

    setSearchResults(results);
    setIsSearching(false);
  };

  const resetFilters = () => {
    setMake("");
    setPriceRange([0, 500000000]);
    setDownPayment("");
    setMonthlyPayment("");
    setLoanTerm(36);
    setYearRange([2015, 2025]);
    setMileageRange([0, 100000]);
    setFuelType("");
    setTransmission("");
  };

  return (
    <div className="max-w-7xl bg-gray-300 mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Car Search</h1>
          <p className="text-gray-600">
            Find your perfect vehicle with our advanced filters
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <RiFilterLine /> {showFilters ? "Hide" : "Show"} Filters
          </button>
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <RiCloseLine /> Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-md h-fit sticky top-4">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <RiFilterLine /> Search Filters
            </h3>

            {/* Car Make */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              >
                <option value="">All Makes</option>
                {carMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range: RWF {priceRange[0].toLocaleString()} - RWF{" "}
                {priceRange[1].toLocaleString()}
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 border border-gray-300 rounded-lg p-2"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 border border-gray-300 rounded-lg p-2"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                />
              </div>
              <input
                type="range"
                min="0"
                max="500000000"
                step="100000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full mt-2"
              />
            </div>

            {/* Year Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year: {yearRange[0]} - {yearRange[1]}
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 border border-gray-300 rounded-lg p-2"
                  value={yearRange[0]}
                  onChange={(e) =>
                    setYearRange([parseInt(e.target.value), yearRange[1]])
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 border border-gray-300 rounded-lg p-2"
                  value={yearRange[1]}
                  onChange={(e) =>
                    setYearRange([yearRange[0], parseInt(e.target.value)])
                  }
                />
              </div>
              <input
                type="range"
                min="2000"
                max="2025"
                step="1"
                value={yearRange[1]}
                onChange={(e) =>
                  setYearRange([yearRange[0], parseInt(e.target.value)])
                }
                className="w-full mt-2"
              />
            </div>

            {/* Additional Filters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="">All Transmissions</option>
                  {transmissions.map((trans) => (
                    <option key={trans} value={trans}>
                      {trans}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mileage: up to {mileageRange[1].toLocaleString()} miles
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={mileageRange[1]}
                  onChange={(e) =>
                    setMileageRange([0, parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`${showFilters ? "lg:w-3/4" : "w-full"}`}>
          {/* Quick Stats */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600">Price Range</p>
                <p className="font-bold">
                  RWF {priceRange[0].toLocaleString()} - RWF{" "}
                  {priceRange[1].toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-600">Year Range</p>
                <p className="font-bold">
                  {yearRange[0]} - {yearRange[1]}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-600">Max Mileage</p>
                <p className="font-bold">
                  {mileageRange[1].toLocaleString()} mi
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-600">Loan Term</p>
                <p className="font-bold">{loanTerm} months</p>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading vehicles...</p>
            </div>
          ) : isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Finding matching vehicles...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "Vehicle" : "Vehicles"} Found
                </h3>
                <div className="text-sm text-gray-500">
                  Sorted by:{" "}
                  <select className="border-none bg-transparent font-medium">
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Year: Newest</option>
                    <option>Mileage: Lowest</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {searchResults.map((car) => (
                  <div
                    key={car.id}
                    className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 ${
                      selectedCar?.id === car.id
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedCar(car)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                        <img
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xl font-bold text-gray-800">
                              {car.make} {car.model}
                            </h4>
                            <p className="text-gray-600">
                              {car.year} • {car.mileage.toLocaleString()} miles
                              • {car.color}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              RWF {car.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              RWF {car.monthlyPayment}/mo
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Fuel Type</p>
                            <p className="font-medium">{car.fuelType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Transmission
                            </p>
                            <p className="font-medium">{car.transmission}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Down Payment
                            </p>
                            <p className="font-medium">
                              RWF {car.downPayment.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {selectedCar?.id === car.id && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h5 className="font-medium mb-2">Features:</h5>
                            <div className="flex flex-wrap gap-2">
                              {car.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4 flex space-x-3">
                              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                Contact Dealer
                              </button>
                              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                Save Vehicle
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No vehicles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}