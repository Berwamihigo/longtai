"use client";

import Link from "next/link";
import { useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiMenuLine,
  RiCloseLine,
  RiHeartLine,
  RiAccountCircleLine,
  RiSearchLine,
} from "react-icons/ri";
import LoginSignupDialog from "./LoginSignUpDialog";
import FavoriteTray from "./favorites";
import ProfilePopup from "./ProfilePopup";

export default function DesktopNav() {
  const [showVehicles, setShowVehicles] = useState(false);
  const [showShopping, setShowShopping] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showDiscover, setShowDiscover] = useState(false);

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
    }
  };

  // Handler for heart icon click
  const handleFavoritesClick = () => {
    setShowFavorites(true);
    setIsMobileMenuOpen(false); // Close mobile nav when opening favorites
  };

  const handleLogout = async () => {
    // Clear session cookie (implement /api/logout to clear cookie)
    await fetch("/api/logout", { method: "POST" });
    setShowProfile(false);
    setUser(null);
  };

  const handleEditPassword = () => {
    // Show a password change dialog (implement as needed)
    alert("Password change dialog coming soon!");
  };

  return (
    <>
      {/* Desktop header — untouched */}
      <header className="desktop md:display-none">
        <div className="image">
          <img
            className="logo"
            src="/assets/longtai.png"
            alt="Longtai"
          />
        </div>
        <div className="links">
          <ul className="nav-links">
            
            <li className="linked flex items-center gap-1.5">
              <Link href="/">Our Cars</Link>
              {/* {!showVehicles ? <RiArrowDownSLine /> : <RiArrowUpSLine />} */}
            </li>
            <li className="linked flex items-center gap-1.5">
              <Link href="/shopping-tools">Shop</Link>
              {/* {!showShopping ? <RiArrowDownSLine /> : <RiArrowUpSLine />} */}
            </li>
            <li className="linked">
              <Link href="/inventory">Inventory</Link>
            </li>
            <li className="linked relative flex items-center align-center justify-center gap-1.5" 
                onMouseEnter={() => setShowDiscover(true)}
                onMouseLeave={() => setShowDiscover(false)}>
              {/* <Link href="/owners" className="flex items-center gap-1.5"> */}
                Discover
                {!showDiscover ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
              {/* </Link> */}
              {showDiscover && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-6000">
                  <Link href="/owners/about" className="block px-4 py-2 hover:bg-gray-100">
                    About Us
                  </Link>
                  <Link href="/owners/services" className="block px-4 py-2 hover:bg-gray-100">
                    Our Services
                  </Link>
                  <Link href="/owners/contact" className="block px-4 py-2 hover:bg-gray-100">
                    Contact Us
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
                <div className="search-container relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-input pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-black transition-all duration-300 w-48"
                  />
                  <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
        <div className="image">
          <img
            src="/assets/longtai.png"
            alt="Longtai"
            className="h-10"
          />
        </div>
        <div className="icon">
          <RiMenuLine
            className="ri-menu-line text-3xl"
            onClick={() => setIsMobileMenuOpen(true)}
          />
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
              <Link href="/">Home</Link>
               {/* <RiArrowDownSLine /> */}
            </span>
            <span className="flex justify-between items-center cursor-pointer">
              <Link href="/shopping-tools">Shopping Tools</Link> 
              {/* <RiArrowDownSLine /> */}
            </span>
            <Link href="/owners" onClick={() => setIsMobileMenuOpen(false)}>
              Owners
            </Link>
            <Link href="/inventory" onClick={() => setIsMobileMenuOpen(false)}>
              Search Inventory
            </Link>
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
      
      <LoginSignupDialog open={showDialog} onClose={() => setShowDialog(false)} />
      {user && (
        <ProfilePopup
          open={showProfile}
          onClose={() => setShowProfile(false)}
          user={user}
          onLogout={handleLogout}
          onEditPassword={handleEditPassword}
        />
      )}
      <FavoriteTray open={showFavorites} onClose={() => setShowFavorites(false)} />
    </>
  );
}