export default function MaintenanceRequests() {
  // Placeholder data
  const requests = [
    {
      id: "req1",
      client: "Alice Johnson",
      car: "Toyota Corolla 2022",
      date: "2024-06-01",
      status: "Pending",
    },
    {
      id: "req2",
      client: "Bob Smith",
      car: "Honda Civic 2023",
      date: "2024-06-02",
      status: "Completed",
    },
    {
      id: "req3",
      client: "Jane Doe",
      car: "Geely Coolray 2024",
      date: "2024-06-03",
      status: "In Progress",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-15">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Maintenance Requests
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {req.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-900">
                  {req.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {req.car}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {req.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {req.status}
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
