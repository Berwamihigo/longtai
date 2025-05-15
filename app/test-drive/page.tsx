"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import DesktopNav from "../components/navbar";
import Footer from "../components/footer";
import NotificationToast from "../components/NotificationToast";

const BookTestDrivePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [carsLoading, setCarsLoading] = useState(true);
  const [cars, setCars] = useState<{ name: string; id: string }[]>([]);
  const [selectedCar, setSelectedCar] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    additionalNotes: "",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const toastDuration = 10000;
  const searchParams = useSearchParams();

  // Fetch cars on mount
  useEffect(() => {
    const fetchCars = async () => {
      setCarsLoading(true);
      try {
        const res = await fetch("/api/getAllCars");
        const data = await res.json();
        if (data.success && Array.isArray(data.cars)) {
          // Assume carName is unique, but if not, use index as fallback for id
          const carsWithId = data.cars.map((car: any, idx: number) => ({
            name: car.name,
            id: car.id || car.name || String(idx),
          }));
          setCars(carsWithId);
          // Preselect if query params exist
          const carId = searchParams.get("carId");
          const carName = searchParams.get("carName");
          if (carId && carName) {
            setSelectedCar({ id: carId, name: carName });
          }
        } else {
          setToast({
            show: true,
            message: "Failed to load cars.",
            type: "error",
          });
        }
      } catch {
        setToast({
          show: true,
          message: "Failed to load cars.",
          type: "error",
        });
      } finally {
        setCarsLoading(false);
      }
    };
    fetchCars();
    // eslint-disable-next-line
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = e.target.value;
    const car = cars.find((c) => c.id === carId);
    if (car) setSelectedCar(car);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar) {
      setToast({ show: true, message: "Please select a car.", type: "error" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          carId: selectedCar.id,
          carName: selectedCar.name,
        }),
      });
      if (res.ok) {
        setToast({
          show: true,
          message: "Your test drive request has been submitted!",
          type: "success",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          additionalNotes: "",
        });
        setSelectedCar(null);
      } else {
        throw new Error("Failed to submit.");
      }
    } catch {
      setToast({
        show: true,
        message: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast((t) => ({ ...t, show: false })), toastDuration);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <DesktopNav />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Book a Test Drive
          </h1>
          <p className="text-gray-600 text-center mb-10 text-lg">
            Schedule a test drive with your preferred car and experience it
            firsthand.
          </p>

          <motion.div
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100"
          >
            {carsLoading ? (
              <div className="flex justify-center items-center py-10">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span className="ml-3 text-blue-600 font-medium">
                  Loading cars...
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car
                    </label>
                    <select
                      name="car"
                      value={selectedCar ? selectedCar.id : ""}
                      onChange={handleCarChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      disabled={
                        !!(
                          searchParams.get("carId") &&
                          searchParams.get("carName")
                        )
                      }
                    >
                      <option value="" disabled>
                        Select a car
                      </option>
                      {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Provide any additional information about your test drive needs..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-200 shadow-md disabled:opacity-50`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Book Test Drive"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </main>
      <Footer />
      <NotificationToast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </div>
  );
};

export default BookTestDrivePage;
