"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaCar,
  FaTachometerAlt,
  FaTools,
  FaStar,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";


const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <FaTachometerAlt /> },
  { label: "Cars", href: "/dashboard/cars", icon: <FaCar /> },
  {
    label: "Maintenance Requests",
    href: "/dashboard/maintenance",
    icon: <FaTools />,
  },
  {
    label: "Test Drive",
    href: "/dashboard/test-drive",
    icon: <FaCar />,
  },
  {
    label: "Newsletter",
    href: "/dashboard/newsletter",
    icon: <FaEnvelope />,
  },
  { label: "Recent Ratings", href: "/dashboard/ratings", icon: <FaStar /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logoutAdmin', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/dashboard/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col py-10 px-6 shadow-2xl rounded-r-3xl min-h-screen">
      {/* Logo */}
      <div className="mb-12 flex items-center gap-3 px-2">
        <div className="bg-white rounded-full p-2 shadow-lg">
          <FaCar className="text-3xl text-blue-700" />
        </div>
        <span className="text-3xl font-extrabold tracking-tight">Longtai</span>
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all duration-200 hover:bg-blue-800/70 hover:pl-7 ${
              pathname === item.href
                ? "bg-white/20 text-yellow-300 font-bold shadow-lg"
                : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-10 flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-semibold bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-lg"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}
