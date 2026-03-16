"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AccountSidebar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "My Details", path: "/my-account" },
    { name: "My Address Book", path: "/my-account/address" },
    { name: "My Orders", path: "/my-account/orders" },
    { name: "My Newsletter", path: "/my-account/newsletter" },
    { name: "Account Settings", path: "/my-account/settings" },
  ];

  // Detect mouse near left edge to open drawer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 30) { // 30px from left edge
        setOpen(true);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">My Account</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 text-xl hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <ul className="p-4 space-y-3">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="block p-2 rounded hover:bg-blue-100 hover:text-blue-600"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}