"use client";
import { useEffect, useState } from "react";

interface Car {
  id: string;
  name: string;
  year: number | string;
  price: number;
  mainImageUrl: string;
  powerType?: string;
  description?: string;
}

export default function CarCards({ type }: { type: "hybrid" | "electric" }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getAllCars");
        const data = await res.json();
        if (data.success) {
          const filtered = data.cars.filter((car: any) => {
            if (type === "hybrid") {
              return (
                car.powerType?.toLowerCase() === "hybrid" ||
                car.description?.toLowerCase().includes("hybrid")
              );
            } else {
              return (
                car.powerType?.toLowerCase() === "electric" ||
                car.description?.toLowerCase().includes("electric")
              );
            }
          });
          setCars(filtered);
        } else {
          setCars([]);
        }
      } catch (error) {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [type]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center py-16 text-blue-700 text-lg font-semibold">
          Loading cars...
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No {type} cars found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={car.mainImageUrl}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-blue-900 mb-1">
                  {car.name}
                </h3>
                <p className="text-gray-600 mb-2">{car.year}</p>
                <p className="text-lg font-bold text-green-700 mb-2">
                  RWF {car.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {car.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
