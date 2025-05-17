import { FaStar } from "react-icons/fa";

export default function RecentRatings() {
  // Placeholder data
  const ratings = [
    {
      id: "rate1",
      user: "Alice Johnson",
      car: "Toyota Corolla 2024",
      stars: 5,
    },
    { id: "rate2", user: "Bob Smith", car: "Honda Civic 2024", stars: 4 },
    { id: "rate3", user: "Jane Doe", car: "Geely Coolray 2024", stars: 3 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-15">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Recent Ratings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Stars
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {ratings.map((rating) => (
              <tr key={rating.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {rating.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-900">
                  {rating.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {rating.car}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < rating.stars ? "text-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
