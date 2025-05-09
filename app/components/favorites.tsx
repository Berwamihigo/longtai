"use client";

import { useEffect, useState } from "react";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import { FaBolt, FaLeaf } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import NotificationToast from "./NotificationToast";

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
      const favRes = await fetch(`/api/favorites?email=${email}`);
      const favData = await favRes.json();

      if (favData.success) {
        setFavorites(favData.favorites);
        const details: Record<string, CarDetails> = {};
        for (const fav of favData.favorites) {
          const carRes = await fetch(
            `/api/getparticular?name=${encodeURIComponent(fav.carName)}`
          );
          const carData = await carRes.json();
          if (carData.success) {
            details[fav.carName] = carData.data;
          }
        }
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
        `/api/favorites?email=${
          sessionData.user.email
        }&carName=${encodeURIComponent(carName)}`,
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
    <>
      <div className="fixed inset-0 z-[50000] bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#f1b274]">Favorite Cars</h2>
            <button
              className="text-2xl text-gray-400 hover:text-[#f1b274] transition"
              onClick={onClose}
            >
              <RiCloseLine />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-73px)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <LoadingSpinner
                  size="lg"
                  text="Loading your favorite cars..."
                />
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No favorite cars yet</p>
                <p className="text-sm mt-2">
                  Add cars to your favorites to see them here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((fav) => {
                  const car = carDetails[fav.carName];
                  if (!car) return null;

                  return (
                    <div
                      key={fav.carName}
                      className="relative group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={car.mainImageUrl}
                          alt={car.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <button
                          onClick={() => handleRemoveFavorite(car.name)}
                          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                          title="Remove from favorites"
                          disabled={removingFavorite === car.name}
                        >
                          {removingFavorite === car.name ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <RiDeleteBin6Line className="text-red-500 text-xl" />
                          )}
                        </button>
                      </div>
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => handleCarClick(car.name)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{car.name}</h3>
                          {car.powerType && (
                            <div className="flex items-center gap-1">
                              {car.powerType === "Electric" ? (
                                <FaBolt
                                  className="text-blue-500"
                                  title="Electric Vehicle"
                                />
                              ) : car.powerType === "Hybrid" ? (
                                <FaLeaf
                                  className="text-green-500"
                                  title="Hybrid Vehicle"
                                />
                              ) : null}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600">{car.year}</p>
                        <p className="text-[#f1b274] font-semibold mt-2">
                          RWF {Number(car.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <NotificationToast
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}
