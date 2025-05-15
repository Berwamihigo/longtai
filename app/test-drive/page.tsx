"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import DesktopNav from "@/app/components/navbar";
import Footer from "@/app/components/footer";

// Mocked reusable components (replace with your actual ones)
const NotificationToast = ({ show, message, type, onClose }: any) =>
  show ? (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">
          X
        </button>
      </div>
    </div>
  ) : null;

const BookTestDriveForm = () => {
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
  const toastDuration = 5000;

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCars = async () => {
      setCarsLoading(true);
      try {
        const res = await fetch("/api/getAllCars");
        const data = await res.json();
        if (data.success && Array.isArray(data.cars)) {
          const carsWithId = data.cars.map((car: any, idx: number) => ({
            name: car.name,
            id: car.id || car.name || String(idx),
          }));
          setCars(carsWithId);
          const carId = searchParams.get("carId");
          const carName = searchParams.get("carName");
          if (carId && carName) {
            setSelectedCar({ id: carId, name: carName });
          }
        } else {
          throw new Error("Failed to load cars.");
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
  }, []);

  useEffect(() => {
    if (toast.show && toast.type === "success") {
      const timer = setTimeout(
        () => setToast((t) => ({ ...t, show: false })),
        toastDuration
      );
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const car = cars.find((c) => c.id === e.target.value);
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

      if (!res.ok) throw new Error();

      setToast({
        show: true,
        message: "Test drive request submitted!",
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
    } catch {
      setToast({
        show: true,
        message: "Something went wrong. Try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
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

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car
                    </label>
                    <select
                      name="car"
                      value={selectedCar?.id || ""}
                      onChange={handleCarChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Optional notes..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md disabled:opacity-50"
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
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
          </div>
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

// Wrap in Suspense to handle useSearchParams safely
export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <BookTestDriveForm />
    </Suspense>
  );
}
