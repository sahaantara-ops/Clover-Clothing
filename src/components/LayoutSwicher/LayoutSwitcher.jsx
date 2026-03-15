"use client";

import React from "react";

const LayoutSwitcher = ({ layout, setLayout }) => {
  const options = [
    { value: "2", label: "●●" },       // 2 products per row
    { value: "3", label: "●●●" },      // 3 products per row
    { value: "4", label: "●●●●" },     // 4 products per row
    { value: "list", label: "▬" },     // list view (horizontal line)
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-semibold">Layout:</span>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setLayout(option.value)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors text-xl ${
            layout === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          title={`Layout: ${option.value}`} // hover tooltip
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default LayoutSwitcher;