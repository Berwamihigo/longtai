"use client";

import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import { CartProvider } from './components/CartContext';
import { Toaster } from 'react-hot-toast';

interface Accessory {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const accessories: Accessory[] = [
  {
    id: 1,
    name: "Premium Seat Covers",
    price: 180000,
    image: "/assets/accessories/car-seats.jpg",
    category: "Interior"
  },
  {
    id: 2,
    name: "All-Weather Floor Mats",
    price: 35000,
    image: "/assets/accessories/car-mats.jpg",
    category: "Interior"
  },
  {
    id: 3,
    name: "Leather Steering Wheel Cover",
    price: 12000,
    image: "/assets/accessories/steering-cover.jpg",
    category: "Interior"
  },
  {
    id: 4,
    name: "Universal Sunshade",
    price: 40000,
    image: "/assets/accessories/sunshade.jpg",
    category: "Exterior"
  },
  {
    id: 5,
    name: "HD Dash Cam",
    price: 120000,
    image: "/assets/accessories/dash-cam.jpg",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Fast Wireless Car Charger",
    price: 12000,
    image: "/assets/accessories/car-charger.jpg",
    category: "Electronics"
  },
  {
    id: 7,
    name: "Ambient LED Interior Kit",
    price: 65000,
    image: "/assets/accessories/led-lights.jpg",
    category: "Interior"
  },
  {
    id: 8,
    name: "Universal Phone Mount",
    price: 8000,
    image: "/assets/accessories/phone-mount.jpg",
    category: "Electronics"
  }
];

const categories = ["All", "Interior", "Exterior", "Electronics"];

export default function AccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAccessories = accessories.filter(accessory => {
    const matchesCategory = selectedCategory === "All" || accessory.category === selectedCategory;
    const matchesSearch = accessory.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Vehicle Accessories</h1>
          
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAccessories.map((accessory) => (
              <ProductCard
                key={accessory.id}
                {...accessory}
              />
            ))}
          </div>
        </main>

        <Footer />
        <Toaster position="top-right" />
      </div>
    </CartProvider>
  );
} 