"use client";

import { useEffect, useState } from "react";
import { RiCloseLine, RiDeleteBin6Line, RiLoader4Line } from "react-icons/ri";
import { FaBolt, FaLeaf } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import NotificationToast from "./NotificationToast";
import Link from "next/link";
import { motion } from "framer-motion";

type FavoriteCar = {
  carName: string;
};

type CarDetails = {
  name: string;
  mainImageUrl: string;
  price: number;
  year: number | string;
  powerType?: string;
};

export default function FavoriteTray({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [favorites, setFavorites] = useState<FavoriteCar[]>([]);
  const [carDetails, setCarDetails] = useState<Record<string, CarDetails>>({});
  const [loading, setLoading] = useState(true);
  const [removingFavorite, setRemovingFavorite] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      checkSessionAndFetchFavorites();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const checkSessionAndFetchFavorites = async () => {
    try {
      setLoading(true);
      const sessionRes = await fetch("/api/session");
      const sessionData = await sessionRes.json();

      if (!sessionData.loggedIn) {
        setNotificationMessage("Please log in to view your favorites");
        setNotificationType("error");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        onClose();
        return;
      }

      await fetchFavorites(sessionData.user.email);
    } catch (error) {
      console.error("Error checking session:", error);
      setNotificationMessage("Failed to load favorites");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async (email: string) => {
    try {
      const favRes = await fetch(`/api/favorites?email=${encodeURIComponent(email)}`);
      const favData = await favRes.json();
      console.log('Favorites API response:', favData);

      if (favData.success) {
        setFavorites(favData.favorites);
        const details: Record<string, CarDetails> = {};
        for (const fav of favData.favorites) {
          console.log('Processing favorite:', fav);
          const carRes = await fetch(
            `/api/getparticular?name=${encodeURIComponent(fav.carName)}`
          );
          const carData = await carRes.json();
          console.log('Car details response:', carData);
          if (carData.success) {
            details[fav.carName] = carData.data;
          }
        }
        console.log('Final car details:', details);
        setCarDetails(details);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setNotificationMessage("Failed to load favorites");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleRemoveFavorite = async (carName: string) => {
    try {
      setRemovingFavorite(carName);
      const sessionRes = await fetch("/api/session");
      const sessionData = await sessionRes.json();

      if (!sessionData.loggedIn) {
        setNotificationMessage("Please log in to manage favorites");
        setNotificationType("error");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        onClose();
        return;
      }

      const res = await fetch(
        `/api/favorites?email=${encodeURIComponent(sessionData.user.email)}&carName=${encodeURIComponent(carName)}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.success) {
        setNotificationMessage("Car removed from favorites");
        setNotificationType("success");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        await fetchFavorites(sessionData.user.email);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      setNotificationMessage("Failed to remove favorite");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } finally {
      setRemovingFavorite(null);
    }
  };

  const handleCarClick = (carName: string) => {
    router.push(`/view?name=${encodeURIComponent(carName)}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[50000] flex justify-end">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="relative w-full max-w-md bg-white shadow-xl h-full overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Favorites</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <RiCloseLine size={24} />
            </button>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No favorites yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((car) => (
                <div
                  key={car.carName}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={carDetails[car.carName]?.mainImageUrl}
                    alt={car.carName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Link
                      href={`/view?name=${encodeURIComponent(car.carName)}`}
                      className="text-lg font-semibold text-gray-900 hover:text-[#f1b274] transition-colors duration-300 inline-block hover:translate-x-1"
                    >
                      {car.carName}
                    </Link>
                    <p className="text-sm text-gray-500">{carDetails[car.carName]?.powerType === "Electric" ? "Electric" : carDetails[car.carName]?.powerType === "Hybrid" ? "Hybrid" : "Gas"} • {carDetails[car.carName]?.year}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(car.carName)}
                    disabled={removingFavorite === car.carName}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    {removingFavorite === car.carName ? (
                      <RiLoader4Line className="animate-spin" />
                    ) : (
                      <RiCloseLine size={20} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <NotificationToast
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}
