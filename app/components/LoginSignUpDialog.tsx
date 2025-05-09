"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import NotificationToast from "./NotificationToast";

export default function LoginSignupDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  if (!open) return null;

  const showSuccessNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationType("success");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const showErrorNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationType("error");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    const form = e.target as HTMLFormElement;
    const name = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch("/api/saveClient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (data.success) {
        showSuccessNotification("Account created successfully! Please log in.");
        setIsLogin(true);
        setLoginEmail(email);
      } else {
        showErrorNotification(data.message || "Signup failed");
      }
    } catch (error) {
      showErrorNotification("An error occurred during signup");
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch("/api/loginClient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        showSuccessNotification("Login successful!");
        //delete the fields 
        setLoginEmail("");
        setLoginPassword("");
        setTimeout(() => onClose(), 1000);
      } else {
        showErrorNotification(data.message || "Login failed");
      }
    } catch (error) {
      showErrorNotification("An error occurred during login");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
        >
          <button
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-[#f1b274] transition"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>

          <div className="mb-8 flex justify-center gap-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${
                isLogin
                  ? "bg-[#f1b274] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${
                !isLogin
                  ? "bg-[#f1b274] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              {isLogin ? (
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#f1b274] hover:bg-[#e0a45e] text-white py-3 rounded-lg font-semibold mt-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#f1b274] focus:ring-2 focus:ring-[#f1b274] focus:ring-opacity-20 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#f1b274] hover:bg-[#e0a45e] text-white py-3 rounded-lg font-semibold mt-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={signupLoading}
                  >
                    {signupLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <NotificationToast
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}
