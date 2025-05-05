"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const cars = [
  { year: 2025, name: "Audi A3", price: "$40,770", mpg: "20 MPG", slug: "audia3" },
  { year: 2025, name: "BMW A3", price: "$40,770", mpg: "20 MPG", slug: "bmwa3" },
  { year: 2025, name: "Camry A3", price: "$40,770", mpg: "20 MPG", slug: "camrya3" },
  { year: 2025, name: "Hyundai A3", price: "$40,770", mpg: "20 MPG", slug: "hyundaia3" },
  { year: 2025, name: "Polestar A3", price: "$40,770", mpg: "20 MPG", slug: "polestara3" },
];

const imageSrc = "https://i.pinimg.com/736x/12/b0/88/12b0883d3d11ef60ed6b19035a81ab86.jpg";

const CarList = () => {
  const router = useRouter();

  const handleRedirect = (slug: string) => {
    router.push(`/view/${slug}`);
  };

  return (
    <section className="w-[97%] h-full p-9 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">44 Matches</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {cars.concat(cars).map((car, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow hover:shadow-lg cursor-pointer transition duration-300 p-6"
            onClick={() => handleRedirect(car.slug)}
          >
            <Image
              src={imageSrc}
              alt={car.name}
              width={400}
              height={250}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="p-3 space-y-2">
              <span className="text-sm text-gray-500">{car.year}</span>
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <div className="flex justify-between text-sm text-gray-700">
                <span className="font-medium">{car.price}</span>
                <span>{car.mpg}</span>
              </div>
              <div className="flex gap-4 mt-2 text-blue-600 text-sm">
                <span className="hover:underline">Explore</span>
                <span className="hover:underline">Build</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarList;
