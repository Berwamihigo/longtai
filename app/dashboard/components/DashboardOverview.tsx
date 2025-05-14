import { FaCar, FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";

export default function DashboardOverview() {
  // Placeholder data
  const totalCars = 120;
  const totalSales = 87;
  const totalUsers = 45;
  const newCars = [
    { name: "Toyota Corolla 2024", id: "car1" },
    { name: "Honda Civic 2024", id: "car2" },
    { name: "Geely Coolray 2024", id: "car3" },
  ];
  const newUsers = [
    { name: "Alice Johnson", id: "user1" },
    { name: "Bob Smith", id: "user2" },
    { name: "Jane Doe", id: "user3" },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-6">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg">
          <FaCar className="text-4xl mb-2" />
          <span className="text-3xl font-bold">{totalCars}</span>
          <span className="mt-2 text-lg">Total Cars</span>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-300 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg">
          <FaDollarSign className="text-4xl mb-2" />
          <span className="text-3xl font-bold">{totalSales}</span>
          <span className="mt-2 text-lg">Total Sales</span>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-200 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg">
          <FaUsers className="text-4xl mb-2" />
          <span className="text-3xl font-bold">{totalUsers}</span>
          <span className="mt-2 text-lg">Total Users</span>
        </div>
      </div>
      {/* Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FaChartLine className="text-2xl text-blue-600" />
          <span className="text-xl font-semibold text-blue-900">
            Sales Overview
          </span>
        </div>
        <div className="w-full h-40 flex items-center justify-center text-gray-400 text-lg border-2 border-dashed border-blue-200 rounded-xl">
          [Sales Chart Coming Soon]
        </div>
      </div>
      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">New Cars</h2>
          <ul className="space-y-2">
            {newCars.map((car) => (
              <li
                key={car.id}
                className="text-gray-700 font-medium bg-blue-50 rounded-lg px-4 py-2"
              >
                {car.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">New Users</h2>
          <ul className="space-y-2">
            {newUsers.map((user) => (
              <li
                key={user.id}
                className="text-gray-700 font-medium bg-yellow-50 rounded-lg px-4 py-2"
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
