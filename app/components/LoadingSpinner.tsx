"use client";

import { RiLoader4Line } from "react-icons/ri";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
};

export default function LoadingSpinner({ size = "md", className = "", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <RiLoader4Line 
        className={`${sizeClasses[size]} animate-spin text-[#f1b274]`} 
      />
      {text && (
        <p className="mt-2 text-gray-600 text-sm">{text}</p>
      )}
    </div>
  );
} 