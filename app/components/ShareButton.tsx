"use client";

import { useState } from "react";
import { RiShareLine, RiCheckLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

type ShareButtonProps = {
  url: string;
  className?: string;
};

export default function ShareButton({ url, className = "" }: ShareButtonProps) {
  const [showNotification, setShowNotification] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className={`p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${className}`}
        title="Share this car"
      >
        <RiShareLine className="text-gray-600 text-xl hover:text-[#f1b274] transition-colors" />
      </button>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-[#f1b274] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-[50000]"
          >
            <RiCheckLine className="text-xl" />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
