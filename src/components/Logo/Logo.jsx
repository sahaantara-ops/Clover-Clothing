import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      {/* Icon */}
      <div className="text-4xl">
        🍀
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <h1 className="text-2xl font-bold tracking-wide text-gray-900">
          Clover
        </h1>
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Clothing
        </span>
      </div>
    </div>
  );
};

export default Logo;