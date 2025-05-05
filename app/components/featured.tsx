"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaBolt, FaLeaf } from "react-icons/fa";

type CarType = {
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
};

export default function FeaturedCars() {
  const router = useRouter();
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/getAllCars");
        const data = await res.json();
        if (data.success) {
          // Sort cars by timestamp (assuming you have a timestamp field) and take the latest 4
          const latestCars = data.cars.slice(0, 4);
          setCars(latestCars);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const redirectTo = (carName: string) => {
    router.push(`/view?name=${encodeURIComponent(carName)}`);
  };

  if (loading) {
    return (
      <section className="featured">
        <div className="header">
          <span>
            Featured <span>Cars</span>
          </span>
        </div>
        <div className="car-containers">
          <div className="text-center w-full">Loading featured cars...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured">
      <div className="header">
        <span>
          Featured <span>Cars</span>
        </span>
      </div>
      <div className="car-containers">
        {cars.map((car, index) => (
          <div
            key={index}
            className="wrapper  flex flex-col justify-between"
            onClick={() => redirectTo(car.name)}
          >
          <div>
            <div className="image">
                <img src={car.mainImageUrl} alt={car.name} />
              </div>
              <div className="name">
                <span className="flex items-center gap-2">
                  {car.name}
                  {car.powerType === "Electric" && (
                    <FaBolt className="text-blue-500" title="Electric Vehicle" />
                  )}
                  {car.powerType === "Hybrid" && (
                    <FaLeaf className="text-green-600" title="Hybrid Vehicle" />
                  )}
                </span>
              </div>
              <div className="desc">
                <div className="specs">
                  <span>{car.category}</span>
                  <span>
                    <i className="fa fa-car"></i> Seats: {car.seats}
                  </span>
                </div>
                <div className="cap">
                  {car.zeroToSixty && (
                    <span>0-60 mph in {car.zeroToSixty}s</span>
                  )}
                  {car.powerType === "Electric" && car.range && (
                    <span>
                      <i className="fa fa-battery-empty"></i> Range: {car.range}
                    </span>
                  )}
                  {car.powerType === "Electric" && car.fullCharge && (
                    <span>
                      <i className="fa fa-plug"></i> Full charge: {car.fullCharge}
                    </span>
                  )}
                  {car.powerType !== "Electric" && car.mpgRange && (
                    <span>
                      <i className="fa fa-gas-pump"></i> MPG: {car.mpgRange.min}-{car.mpgRange.max}
                    </span>
                  )}
                </div>
              </div>
          </div>
              
            <div className="price">
              <div className="currency">
                <span>RWF</span>
              </div>
              <div className="amount">
                <span>{car.price?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="newone">
        <button onClick={() => router.push("/inventory")}>
          Explore More Vehicles <RiArrowRightSLine />
        </button>
      </div>
    </section>
  );
}
