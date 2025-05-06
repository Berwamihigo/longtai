import { Car, Calculator, Search, TrendingUp, CreditCard, Shield } from 'lucide-react';

const tools = [
  {
    title: "Car Finder",
    description: "Find your perfect car based on your preferences and budget",
    icon: Car,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Payment Calculator",
    description: "Calculate your monthly payments and total cost",
    icon: Calculator,
    color: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    title: "Price Comparison",
    description: "Compare prices across different dealerships",
    icon: Search,
    color: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    title: "Market Analysis",
    description: "Get insights into current market trends",
    icon: TrendingUp,
    color: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    title: "Financing Options",
    description: "Explore various financing and loan options",
    icon: CreditCard,
    color: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Vehicle History",
    description: "Check detailed vehicle history reports",
    icon: Shield,
    color: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
];

export default function ToolsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shopping Tools</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Our comprehensive suite of tools to help you make informed decisions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className={`w-12 h-12 ${tool.color} ${tool.iconColor} rounded-lg flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600">{tool.description}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f1b274] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>
        ))}
      </div>

      {/* Additional Features Section */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Use Our Tools?</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-[#f1b274] mr-2">•</span>
              <span className="text-gray-600">Save time and money with our comprehensive tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#f1b274] mr-2">•</span>
              <span className="text-gray-600">Make informed decisions with detailed insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#f1b274] mr-2">•</span>
              <span className="text-gray-600">Compare options easily with our user-friendly interface</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h3>
          <p className="text-gray-600 mb-6">
            Begin your car shopping journey with our powerful tools. Create an account to save your preferences and track your progress.
          </p>
          <button className="bg-[#f1b274] text-white px-6 py-3 rounded-lg hover:bg-[#e5a666] transition-colors duration-300">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
} 