"use client";

import { RiLoader4Line } from "react-icons/ri";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({ isLoading, message }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
      <RiLoader4Line className="text-4xl text-[#e5a666] animate-spin mb-4" />
      {message && <p className="text-gray-700">{message}</p>}
    </div>
  );
} 