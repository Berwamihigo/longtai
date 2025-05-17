export default function CarsList() {
  // Placeholder data
  const cars = [
    {
      id: "car1",
      name: "Toyota Corolla 2024",
      make: "Toyota",
      year: 2024,
      price: 18000,
      status: "Available",
    },
    {
      id: "car2",
      name: "Honda Civic 2024",
      make: "Honda",
      year: 2024,
      price: 19500,
      status: "Sold",
    },
    {
      id: "car3",
      name: "Geely Coolray 2024",
      make: "Geely",
      year: 2024,
      price: 21000,
      status: "Available",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-15">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">All Cars</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Make
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {car.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-900">
                  {car.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {car.make}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {car.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-bold">
                  RWF {car.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      car.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
