import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md p-4 space-y-4 rounded-xl animate-pulse">
      <div className="skeleton h-72 w-full bg-gray-300 rounded"></div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="skeleton h-4 w-1/2 bg-gray-300 rounded"></div>
         <div className="flex justify-between mt-4">
          <div className="skeleton h-4 w-16 bg-gray-300 rounded"></div>
          <div className="skeleton h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;