"use client";

import { RiCloseLine } from "react-icons/ri";
import LoginSignupDialog from "./LoginSignUpDialog";
import { useEffect } from "react";

type NotificationDialogProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  showLoginButton?: boolean;
};

function useModalLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}

export default function NotificationDialog({
  open,
  onClose,
  message,
  showLoginButton = false,
}: NotificationDialogProps) {
  useModalLock(open);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-[#f1b274] transition"
          onClick={onClose}
        >
          <RiCloseLine />
        </button>

        <div className="text-center">
          <p className="text-gray-800 text-lg mb-6">{message}</p>

          {showLoginButton && (
            <LoginSignupDialog open={showLoginButton} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
