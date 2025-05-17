"use client";

import { useState, useEffect, useCallback } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import LoadingSpinner from "./LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "./GlobalNotification";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { showNotification } = useNotification();

  const checkSession = useCallback(async () => {
    try {
      const sessionRes = await fetch("/api/session");
      const sessionData = await sessionRes.json();

      if (sessionData.loggedIn && sessionData.user?.email) {
        setUserEmail(sessionData.user.email);
        setIsAuthenticated(true);
        await checkFavoriteStatus(sessionData.user.email);
      } else {
        setUserEmail(null);
        setIsAuthenticated(false);
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUserEmail(null);
      setIsAuthenticated(false);
      setIsFavorite(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let interval: NodeJS.Timeout;

    const initializeSession = async () => {
      if (isMounted) {
        await checkSession();
        // Set up interval only if component is still mounted
        if (isMounted) {
          interval = setInterval(checkSession, 30000);
        }
      }
    };

    initializeSession();

    return () => {
      isMounted = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [checkSession]);

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

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the car card

    // Only show login notification if we've confirmed user is not authenticated
    if (isAuthenticated === false) {
      showNotification("Please log in to add cars to your favorites", "error");
      return;
    }

    if (!userEmail) {
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
          showNotification("Car removed from favorites", "success");
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
          showNotification("Car added to favorites", "success");
          onFavoriteChange?.();
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      showNotification("Failed to update favorites", "error");
    } finally {
      setIsToggling(false);
    }
  };

  // Don't render anything until we know the authentication status
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <motion.button
      onClick={handleFavoriteClick}
      className={`p-2.5 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all duration-300 ${className}`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      disabled={isToggling}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={false}
    >
      <AnimatePresence mode="wait">
        {isToggling ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <LoadingSpinner size="sm" />
          </motion.div>
        ) : isFavorite ? (
          <motion.div
            key="favorite"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <RiHeartFill className="text-red-500 text-xl" />
          </motion.div>
        ) : (
          <motion.div
            key="unfavorite"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <RiHeartLine className="text-gray-700 text-xl hover:text-red-500 transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
