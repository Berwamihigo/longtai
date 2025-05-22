"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

interface NotificationToastProps {
  show: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
}

export default function NotificationToast({
  show,
  message,
  type,
  onClose,
  position = "bottom-right"
}: NotificationToastProps) {
  if (!show) return null;

  const positionClasses = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-left": "bottom-4 left-4"
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed ${positionClasses[position]} z-[50000]`}
      >
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            type === "success"
              ? "bg-[#f1b274] text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <RiCheckLine className="text-xl" />
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-2 hover:opacity-80 transition-opacity"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
