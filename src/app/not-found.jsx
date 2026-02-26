// /app/not-found.jsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* Big 404 number */}
      <h1 className="text-9xl font-extrabold text-gray-300 mb-6">404</h1>

      {/* Error message */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Go Home button */}
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
      >
        Go Home
      </Link>

      {/* Optional illustration */}
      <div className="mt-12">
        <img
          src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="404 illustration"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}