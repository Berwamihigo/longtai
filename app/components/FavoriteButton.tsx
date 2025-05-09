"use client";

import { useState, useEffect } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
import NotificationToast from "./NotificationToast";

type FavoriteButtonProps = {
  carName: string;
  className?: string;
  onFavoriteChange?: () => void;
};

export default function FavoriteButton({
  carName,
  className = "",
  onFavoriteChange,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const sessionRes = await fetch("/api/session");
        const sessionData = await sessionRes.json();

        if (!isMounted) return;

        if (sessionData.loggedIn && sessionData.user?.email) {
          setUserEmail(sessionData.user.email);
          await checkFavoriteStatus(sessionData.user.email);
        } else {
          setUserEmail(null);
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (isMounted) {
          setUserEmail(null);
          setIsFavorite(false);
        }
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 30000); // Check every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [carName]);

  const checkFavoriteStatus = async (email: string) => {
    try {
      const favRes = await fetch(
        `/api/favorites?email=${encodeURIComponent(email)}`
      );
      const favData = await favRes.json();

      if (favData.success) {
        setIsFavorite(
          favData.favorites.some(
            (fav: { carName: string }) => fav.carName === carName
          )
        );
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
      setIsFavorite(false);
    }
  };

  const handleFavoriteClick = async () => {
    if (!userEmail) {
      setNotificationMessage("Please log in to add cars to your favorites");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    try {
      setIsToggling(true);

      if (isFavorite) {
        const res = await fetch(
          `/api/favorites?email=${encodeURIComponent(
            userEmail
          )}&carName=${encodeURIComponent(carName)}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to remove favorite: ${res.status}`);
        }

        const data = await res.json();
        if (data.success) {
          setIsFavorite(false);
          setNotificationMessage("Car removed from favorites");
          setNotificationType("success");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          onFavoriteChange?.();
        }
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: userEmail,
            carName,
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to add favorite: ${res.status}`);
        }

        const data = await res.json();
        if (data.success) {
          setIsFavorite(true);
          setNotificationMessage("Car added to favorites");
          setNotificationType("success");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          onFavoriteChange?.();
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setNotificationMessage("Failed to update favorites");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleFavoriteClick}
        className={`p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${className}`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        disabled={isToggling}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isToggling ? (
          <LoadingSpinner size="sm" />
        ) : isFavorite ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <RiHeartFill className="text-red-500 text-xl" />
          </motion.div>
        ) : (
          <RiHeartLine className="text-gray-600 text-xl hover:text-red-500 transition-colors" />
        )}
      </motion.button>

      <NotificationToast
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}
