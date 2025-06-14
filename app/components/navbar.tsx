"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiMenuLine,
  RiCloseLine,
  RiHeartLine,
  RiAccountCircleLine,
  RiSearchLine,
} from "react-icons/ri";
import AuthModals from "./auth/auth-modals";
import FavoriteTray from "./favorites";
import ProfilePopup from "./ProfilePopup";
import NotificationToast from "./NotificationToast";

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  carName?: string;
  name?: string;
  // Add other car properties as needed
}

export default function DesktopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<CarData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [showDiscover, setShowDiscover] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const [showMobileDiscover, setShowMobileDiscover] = useState(false);

  // Check user session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();
        if (data.loggedIn) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    checkSession();
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        const response = await fetch(
          `/api/customizedSearch?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (response.ok) {
          setSearchResults(data.results || []);
        } else {
          setSearchResults([]);
          console.error("Search error:", data.error);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  // Trigger search when search term changes
  useEffect(() => {
    if (search.trim()) {
      debouncedSearch(search);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [search, debouncedSearch]);

  // Handler for account icon click (desktop or mobile)
  const handleAccountClick = async () => {
    // Check session
    const res = await fetch("/api/session");
    const data = await res.json();
    if (data.loggedIn) {
      setUser(data.user);
      setShowProfile(true);
    } else {
      setShowDialog(true);
      setNotificationMessage("Please log in to access your account");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Handler for heart icon click
  const handleFavoritesClick = async () => {
    // Check if user is logged in
    const res = await fetch("/api/session");
    const data = await res.json();

    if (data.loggedIn) {
      setShowFavorites(true);
      setIsMobileMenuOpen(false); // Close mobile nav when opening favorites
    } else {
      setNotificationMessage("Please log in to view your favorites");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setShowDialog(true); // Show login dialog
    }
  };

  const handleLogout = async () => {
    // Clear session cookie
    await fetch("/api/logout", { method: "POST" });
    setShowProfile(false);
    setUser(null);
    setNotificationMessage("Successfully logged out");
    setNotificationType("success");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleEditPassword = () => {
    setNotificationMessage("Password change dialog coming soon!");
    setNotificationType("success");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Debounce function implementation
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  return (
    <>
      {/* Desktop header */}
      <header className="desktop md:display-none">
        <Link href="/home">
          <div className="image">
            <img className="logo" src="https://res.cloudinary.com/dc5mdwzoz/image/upload/v1748080029/longtai/ameow5z2agjkshszvkkb.png" alt="Longtai" />
          </div>
        </Link>

        <div className="links">
          <ul className="nav-links">
            <li className="linked flex items-center gap-1.5">
              <Link href="/home">Home</Link>
            </li>
            <li className="linked flex items-center gap-1.5">
              <Link href="/shopping-tools">Shop</Link>
            </li>
            <li className="linked">
              <Link href="/inventory">Inventory</Link>
            </li>
            <li
              className="linked relative flex items-center align-center justify-center gap-1.5"
              onMouseEnter={() => setShowDiscover(true)}
              onMouseLeave={() => setShowDiscover(false)}
            >
              Discover
              {!showDiscover ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
              {showDiscover && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-6000">
                  <Link
                    href="/owners"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/owners/services"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Our Services
                  </Link>
                  <Link
                    href="/owners/contact-us"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/maintenance"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Maintenance
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="links">
          <div className="icons">
            <ul className="icons-arrangement">
              <li className="ic">
                <div className="search-container relative" ref={searchRef}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowSearchResults(true);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    className="search-input pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-black transition-all duration-300 w-48"
                  />
                  <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

                  {/* Search results dropdown */}
                  {showSearchResults && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-lg z-6000 max-h-96 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">
                          Searching...
                        </div>
                      ) : searchResults.length > 0 ? (
                        <ul>
                          {searchResults.map((car) => (
                            <li key={`${car.id}-${car.make}-${car.model}`}>
                              <Link
                                href={`/view?name=${car.id}`}
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                  setShowSearchResults(false);
                                  setSearch("");
                                }}
                              >
                                <div className="font-medium">
                                  {car.carName || car.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {car.make} • {car.year}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : search.trim() ? (
                        <div className="p-4 text-center text-gray-500">
                          No results found
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </li>
              <li className="ic text-5xl">
                <RiHeartLine
                  className="ri-heart-line"
                  onClick={handleFavoritesClick}
                  style={{ cursor: "pointer" }}
                />
              </li>
              <li className="ic">
                <RiAccountCircleLine
                  className="ri-account-circle-line"
                  onClick={handleAccountClick}
                  style={{ cursor: "pointer" }}
                />
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <header className="mobile md:display-none flex justify-between items-center px-4 py-3 bg-white">
        <Link href="/home">
          <div className="image">
            <img src="https://res.cloudinary.com/dc5mdwzoz/image/upload/v1748080029/longtai/ameow5z2agjkshszvkkb.png" alt="Longtai" className="h-10" />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <RiAccountCircleLine
            className="ri-account-circle-line text-3xl"
            onClick={handleAccountClick}
            style={{ cursor: "pointer" }}
          />
          <div className="icon">
            <RiMenuLine
              className="ri-menu-line text-3xl"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Full-screen popup menu */}
      {isMobileMenuOpen && !showDialog && (
        <div className="fixed inset-0 z-50000 bg-white flex flex-col justify-between p-12">
          <div className="flex justify-between items-center">
            <RiCloseLine
              className="text-3xl cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-6 mt-10 text-lg font-medium text-gray-800">
            <span className="flex justify-between items-center cursor-pointer">
              <Link href="/home">Home</Link>
            </span>
            <span className="flex justify-between items-center cursor-pointer">
              <Link href="/shopping-tools">Shop</Link>
            </span>
            <Link href="/inventory" onClick={() => setIsMobileMenuOpen(false)}>
              Inventory
            </Link>
            <span
              className="flex justify-between items-center cursor-pointer select-none"
              onClick={() => setShowMobileDiscover((v) => !v)}
            >
              Discover
              {showMobileDiscover ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </span>
            {showMobileDiscover && (
              <div className="ml-4 flex flex-col gap-2 animate-fadeIn">
                <Link
                  href="/owners"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1"
                >
                  About Us
                </Link>
                <Link
                  href="/owners/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1"
                >
                  Our Services
                </Link>
                <Link
                  href="/owners/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1"
                >
                  Contact Us
                </Link>
                <Link
                  href="/maintenance"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1"
                >
                  Maintenance
                </Link>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-10 mt-10 text-2xl text-gray-700">
            <RiHeartLine
              onClick={handleFavoritesClick}
              style={{ cursor: "pointer" }}
            />
            <RiAccountCircleLine
              onClick={handleAccountClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModals isOpen={showDialog} onClose={() => setShowDialog(false)} />

      {/* Profile Popup */}
      {user && (
        <ProfilePopup
          open={showProfile}
          onClose={() => setShowProfile(false)}
          user={user}
          onLogout={handleLogout}
          onEditPassword={handleEditPassword}
        />
      )}

      {/* Favorites Tray */}
      <FavoriteTray
        open={showFavorites}
        onClose={() => setShowFavorites(false)}
      />

      {/* Notification Toast */}
      <NotificationToast
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </>
  );
}
