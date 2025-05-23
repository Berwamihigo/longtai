"use client";
import React, { useState } from "react";
import NotificationToast from "../components/NotificationToast";
import { useRouter } from "next/navigation";

export default function AuthenticatePage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        showErrorNotification("Passwords do not match");
        return;
      }
      setSignupLoading(true);
      try {
        const res = await fetch("/api/saveClient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (data.success) {
          showSuccessNotification(
            "Account created successfully! Please log in."
          );
          setMode("login");
          setFormData({ ...formData, name: "", confirmPassword: "" });
        } else {
          showErrorNotification(data.message || "Signup failed");
        }
      } catch (error) {
        showErrorNotification("An error occurred during signup");
      } finally {
        setSignupLoading(false);
      }
    } else {
      setLoginLoading(true);
      try {
        const res = await fetch("/api/loginClient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (data.success) {
          showSuccessNotification("Login successful!");
          setFormData({
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
          });
          // Optionally redirect or refresh here
          router.push("/");
        } else {
          showErrorNotification(data.message || "Login failed");
        }
      } catch (error) {
        showErrorNotification("An error occurred during login");
      } finally {
        setLoginLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              mode === "login"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              mode === "signup"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setMode("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              disabled={mode === "login" ? loginLoading : signupLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mode === "login" ? (
                loginLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Sign In"
                )
              ) : signupLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
      <NotificationToast
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}
