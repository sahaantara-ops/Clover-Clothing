"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 relative overflow-hidden">

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-full transition ${
              isLogin
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`ml-3 px-6 py-2 rounded-full transition ${
              !isLogin
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Welcome Back 👋
              </h2>

              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />

                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                  Login
                </button>
              </form>

              <p className="text-center mt-4 text-sm">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-black font-semibold"
                >
                  Register
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Create Account 🚀
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />

                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                  Register
                </button>
              </form>

              <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-black font-semibold"
                >
                  Login
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}