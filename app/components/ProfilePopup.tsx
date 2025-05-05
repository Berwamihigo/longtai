"use client";
import { useState } from "react";

export default function ProfilePopup({
  open,
  onClose,
  user,
  onLogout,
  onEditPassword,
}: {
  open: boolean;
  onClose: () => void;
  user: { name: string; email: string };
  onLogout: () => void;
  onEditPassword: () => void;
}) {
  if (!open) return null;

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    // Optionally, clear user state and close the popup
    onClose();
    // Optionally, show a toast or redirect
  };

  return (
    <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-[#f1b274] transition"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-[#f1b274] text-center">Profile</h2>
        <div className="mb-4">
          <div className="font-semibold">Name:</div>
          <div className="mb-2">{user.name}</div>
          <div className="font-semibold">Email:</div>
          <div>{user.email}</div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <button
            className="bg-[#f1b274] hover:bg-[#e0a45e] text-white py-2 rounded-full font-semibold transition"
            onClick={onEditPassword}
          >
            Edit Password
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
