import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-xl shadow-md p-4 w-32 h-32 hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl mb-2">🍀</div>
      <h2 className="text-lg font-semibold text-gray-800">Clover</h2>
      <h4 className="text-xs text-gray-500 uppercase tracking-wide">Clothing</h4>
    </div>
  );
};

export default Logo;