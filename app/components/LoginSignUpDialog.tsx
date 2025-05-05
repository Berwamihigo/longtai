"use client";
import { useState } from "react";

export default function LoginSignupDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState(""); // For pre-filling after signup
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  if (!open) return null;

  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError("");
    const form = e.target as HTMLFormElement;
    const name = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("/api/saveClient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setSignupLoading(false);

    if (data.success) {
      setIsLogin(true);
      setLoginEmail(email); // Pre-fill login email
    } else {
      setSignupError(data.message || "Signup failed");
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("/api/loginClient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoginLoading(false);

    if (data.success) {
      onClose(); // Close dialog on success
    } else {
      setLoginError(data.message || "Login failed");

    }
  };

  return (
    <div className="fixed inset-0 z-5000 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-[#f1b274] transition"
          onClick={onClose}
        >
          &times;
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
        <div className="mt-6">
          {isLogin ? (
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#f1b274]"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#f1b274]"
                required
              />
              {loginError && (
                <div className="text-red-500 text-sm">{loginError}</div>
              )}
              <button
                type="submit"
                className="bg-[#f1b274] hover:bg-[#e0a45e] text-white py-2 rounded-full font-semibold mt-2 transition"
                disabled={loginLoading}
              >
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Name"
                name="fullName"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#f1b274]"
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#f1b274]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#f1b274]"
                required
              />
              {signupError && (
                <div className="text-red-500 text-sm">{signupError}</div>
              )}
              <button
                type="submit"
                className="bg-[#f1b274] hover:bg-[#e0a45e] text-white py-2 rounded-full font-semibold mt-2 transition"
                disabled={signupLoading}
              >
                {signupLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
