"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

function EnvelopeModal({
  show,
  onClose,
  message,
  success,
}: {
  show: boolean;
  onClose: () => void;
  message: string;
  success: boolean;
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white via-[#f8e7d6] to-[#f1b274]/30 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center relative animate-fadeInModal border border-[#f1b274]/30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#f1b274] text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Envelope SVG Animation */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-6 drop-shadow-lg"
        >
          <g>
            <rect x="15" y="40" width="90" height="50" rx="10" fill="#f1b274" />
            <rect
              x="15"
              y="40"
              width="90"
              height="50"
              rx="10"
              fill="#fff"
              className="animate-envelopeFill"
            />
            <polyline
              points="15,40 60,90 105,40"
              fill="none"
              stroke="#f1b274"
              strokeWidth="4"
              className="animate-envelopeFlap"
            />
          </g>
        </svg>
        <h3
          className={`text-2xl font-extrabold mb-2 text-center tracking-tight ${
            success ? "text-[#f1b274]" : "text-red-500"
          }`}
        >
          {success ? "Subscribed!" : "Oops!"}
        </h3>
        <p className="text-gray-700 text-center mb-2 text-lg font-medium max-w-xs">
          {message}
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-7 py-2.5 bg-[#f1b274] text-white rounded-xl font-bold text-lg shadow hover:bg-[#e5a066] transition"
        >
          Close
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeInModal {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInModal {
          animation: fadeInModal 0.3s cubic-bezier(0.4, 2, 0.6, 1);
        }
        @keyframes envelopeFill {
          0% {
            fill: #fff;
          }
          100% {
            fill: #f1b274;
          }
        }
        .animate-envelopeFill {
          animation: envelopeFill 1s 0.2s forwards;
        }
        @keyframes envelopeFlap {
          0% {
            stroke-dasharray: 0, 200;
          }
          100% {
            stroke-dasharray: 200, 0;
          }
        }
        .animate-envelopeFlap {
          stroke-dasharray: 0, 200;
          animation: envelopeFlap 0.9s 0.7s forwards;
        }
      `}</style>
    </div>
  );
}

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [modal, setModal] = useState({
    show: false,
    message: "",
    success: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setModal({
          show: true,
          message: "You have subscribed to our newsletter!",
          success: true,
        });
        setNewsletterEmail("");
      } else {
        setModal({
          show: true,
          message: "Failed to subscribe. Please try again.",
          success: false,
        });
      }
    } catch {
      setModal({
        show: true,
        message: "An error occurred. Please try again.",
        success: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    { code: "rw", alt: "Rwanda" },
    { code: "ao", alt: "Angola" },
    { code: "dj", alt: "Djibouti" },
    { code: "et", alt: "Ethiopia" },
    { code: "ir", alt: "Iran" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <EnvelopeModal
          show={modal.show}
          onClose={() => setModal({ ...modal, show: false })}
          message={modal.message}
          success={modal.success}
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Company Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.h2
              className="text-3xl font-bold text-[#f1b274]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Longtai
            </motion.h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Find the perfect car for your needs
            </p>
            <div className="flex space-x-6">
              <motion.a
                href="https://www.facebook.com/share/12HQUhhXiXm/"
                className="text-[#f1b274] hover:text-white transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/longtai.rwanda/"
                className="text-[#f1b274] hover:text-white transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@longta.rwanda?_t=ZM-8wNB51cxnol&_r=1"
                className="text-[#f1b274] hover:text-white transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">Tiktok</span>
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224,88.4a64.12,64.12,0,0,1-48-23.2v80.8A88,88,0,1,1,88,56a87.28,87.28,0,0,1,24.4,3.6V90.4A40,40,0,1,0,128,168V0h48a63.81,63.81,0,0,0,48,64Z" />
                </svg>
              </motion.a>
            </div>
            
            {/* Country Flags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {countries.map((country, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-6"
                >
                  <img
                    src={`https://flagcdn.com/w20/${country.code}.png`}
                    srcSet={`https://flagcdn.com/w40/${country.code}.png 2x`}
                    alt={country.alt}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Rest of the footer content remains the same */}
          {/* Quick Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-[#f1b274]">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <motion.li whileHover={{ x: 5 }}>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white text-lg transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[#f1b274] rounded-full mr-2"></span>
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link
                  href="/shopping-tools"
                  className="text-gray-300 hover:text-white text-lg transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[#f1b274] rounded-full mr-2"></span>
                  Shop
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link
                  href="/inventory"
                  className="text-gray-300 hover:text-white text-lg transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[#f1b274] rounded-full mr-2"></span>
                  Inventory
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link
                  href="/owners/contact-us"
                  className="text-gray-300 hover:text-white text-lg transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[#f1b274] rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-[#f1b274]">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start text-gray-300"
                whileHover={{ x: 5 }}
              >
                <svg
                  className="h-6 w-6 mr-3 text-[#f1b274] mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-lg">
                  Longtai auto
                  <br />
                  51 KN 1 Rd, Kigali
                </span>
              </motion.li>
              <motion.li
                className="flex items-center text-gray-300"
                whileHover={{ x: 5 }}
              >
                <svg
                  className="h-6 w-6 mr-3 text-[#f1b274] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-lg">info@longtai.com</span>
              </motion.li>
              <motion.li
                className="flex items-center text-gray-300"
                whileHover={{ x: 5 }}
              >
                <svg
                  className="h-6 w-6 mr-3 text-[#f1b274] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-lg">+250 795 570 900</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-[#f1b274]">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b274] text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#f1b274] text-gray-900 rounded-lg hover:bg-[#e5a666] focus:outline-none focus:ring-2 focus:ring-[#f1b274] focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300 font-medium flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">
              Get the latest updates and offers.
            </p>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-gray-400 text-lg">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#f1b274]">Longtai</span>. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}