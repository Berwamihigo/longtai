"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

type NotificationToastProps = {
  message: string;
  type?: "success" | "error";
  show: boolean;
  onClose: () => void;
};

export default function NotificationToast({
  message,
  type = "success",
  show,
  onClose,
}: NotificationToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-[50000]"
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
      )}
    </AnimatePresence>
  );
}
