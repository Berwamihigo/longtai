'use client';

import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FaBolt, FaLeaf, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FavoriteButton from './FavoriteButton';

type CarType = {
  id: string;
  name: string;
  year: number | string;
  price: number;
  range: string;
  mainImageUrl: string;
  subImages: string[];
  powerType?: string;
  fullCharge?: string;
  fullTank?: string;
  mpgRange?: { min: string; max: string };
  seats?: string;
  zeroToSixty?: string;
  category?: string;
  description?: string;
  brand?: string;
  bodyType?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
};

const brands = [
  "Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Lexus", "Hyundai", "Kia", "Nissan"
];

const bodyTypes = [
  "Sedan", "SUV", "Hatchback", "Coupe", "Wagon", "Pickup", "Van", "Minivan"
];

const priceRanges = [
  { label: "Under $10,000", min: 0, max: 10000 },
  { label: "$10,000 - $20,000", min: 10000, max: 20000 },
  { label: "$20,000 - $30,000", min: 20000, max: 30000 },
  { label: "$30,000 - $40,000", min: 30000, max: 40000 },
  { label: "$40,000 - $50,000", min: 40000, max: 50000 },
  { label: "Over $50,000", min: 50000, max: Infinity }
];

export default function CarFinderAndDisplay() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    bodyType: '',
    priceRange: '',
    minYear: '',
    maxMileage: '',
    fuelType: '',
    transmission: ''
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/getAllCars");
        const data = await res.json();
        if (data.success) {
          setCars(data.cars);
          setFilteredCars(data.cars);
        } else {
          console.error("Failed to load cars");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, cars]);

  const applyFilters = () => {
    let results = [...cars];

    // Apply search query filter
    if (searchQuery) {
      results = results.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (car.brand && car.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (car.description && car.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply brand filter
    if (filters.brand) {
      results = results.filter(car => car.brand === filters.brand);
    }

    // Apply body type filter
    if (filters.bodyType) {
      results = results.filter(car => car.bodyType === filters.bodyType);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        results = results.filter(car => car.price >= range.min && car.price <= range.max);
      }
    }

    // Apply min year filter
    if (filters.minYear) {
      results = results.filter(car => Number(car.year) >= Number(filters.minYear));
    }

    // Apply max mileage filter
    if (filters.maxMileage && filters.maxMileage !== '') {
      results = results.filter(car => car.mileage && Number(car.mileage) <= Number(filters.maxMileage));
    }

    // Apply fuel type filter
    if (filters.fuelType) {
      results = results.filter(car => car.fuelType === filters.fuelType || 
        (filters.fuelType === 'electric' && car.powerType === 'Electric') ||
        (filters.fuelType === 'hybrid' && car.powerType === 'Hybrid'));
    }

    // Apply transmission filter
    if (filters.transmission) {
      results = results.filter(car => car.transmission === filters.transmission);
    }

    setFilteredCars(results);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      brand: '',
      bodyType: '',
      priceRange: '',
      minYear: '',
      maxMileage: '',
      fuelType: '',
      transmission: ''
    });
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Car</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Use our advanced search tools to find the car that matches your preferences
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              name="search"
              placeholder="Search by make, model, or keyword"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="bg-[#f1b274] text-white px-6 py-3 rounded-lg hover:bg-[#e5a066] transition-colors duration-300 flex items-center justify-center gap-2"
            >
            <Search className="w-5 h-5" />
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`border px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
              showFilters 
                ? 'bg-[#f1b274] text-white border-[#f1b274]' 
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
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
              <select 
                name="brand"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                value={filters.brand}
                onChange={handleFilterChange}
              >
                <option value="">All Brands</option>
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
              <select 
                name="bodyType"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                value={filters.bodyType}
                onChange={handleFilterChange}
              >
                <option value="">All Body Types</option>
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
              <select 
                name="priceRange"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                value={filters.priceRange}
                onChange={handleFilterChange}
              >
                <option value="">All Price Ranges</option>
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
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
                  name="minYear"
                  placeholder="Min Year"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                  value={filters.minYear}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage
                </label>
                <input
                  type="number"
                  name="maxMileage"
                  placeholder="Max Mileage"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                  value={filters.maxMileage}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <select 
                  name="fuelType"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Fuel Types</option>
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
                <select 
                  name="transmission"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                  value={filters.transmission}
                  onChange={handleFilterChange}
                >
                  <option value="">All Transmissions</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="md:col-span-3 flex justify-end gap-4">
              <button
                onClick={resetFilters}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'} Found
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading cars...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No cars match your search criteria. Try adjusting your filters.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-[#f1b274] text-white rounded-lg hover:bg-[#e5a066] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div key={car.id} className="flex justify-center">
                <div
                  onClick={() => router.push(`/view?name=${encodeURIComponent(car.name)}`)}
                  className="relative cursor-pointer w-full max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 group"
                >
                  {/* Top Image Section */}
                  <div className="relative">
                    <Image
                      src={car.mainImageUrl}
                      alt={car.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-600 via-transparent to-transparent z-10" />

                    <div className="absolute top-3 right-3 z-20">
                      <FavoriteButton 
                        carName={car.name} 
                        onFavoriteChange={() => {}}
                      />
                    </div>
                  </div>

                  {/* Price Label */}
                  <div className="absolute top-44 left-4 bg-black/70 backdrop-blur-md px-4 py-1 rounded-md text-white text-sm shadow z-30">
                    RWF {car.price.toLocaleString()}
                  </div>

                  {/* Info Section */}
                  <div className="p-5 pt-10 z-20 relative space-y-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {car.name}
                      {car.powerType === "Electric" && (
                        <FaBolt className="text-blue-500" />
                      )}
                      {car.powerType === "Hybrid" && (
                        <FaLeaf className="text-green-500" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {car.powerType} • {car.year} • {car.category}
                    </p>

                    <hr className="border-gray-700" />

                    <div className="flex flex-col gap-1 text-sm text-gray-400">
                      {car.zeroToSixty && (
                        <span>0-60 mph in {car.zeroToSixty}s</span>
                      )}
                      {car.range && car.powerType === "Electric" && (
                        <span>Range: {car.range}</span>
                      )}
                      {car.fullCharge && car.powerType === "Electric" && (
                        <span>Full Charge: {car.fullCharge} min</span>
                      )}
                      {car.mpgRange && car.powerType !== "Electric" && (
                        <span>
                          MPG: {car.mpgRange.min} - {car.mpgRange.max}
                        </span>
                      )}
                      {car.seats && <span>Seats: {car.seats}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}