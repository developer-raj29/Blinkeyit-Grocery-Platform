// components/ProductCardSkeleton.jsx
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="border p-4 grid gap-2 animate-pulse min-w-36 lg:min-w-52 rounded bg-white">
      <div className="bg-gray-200 h-24 lg:h-32 rounded w-full"></div>
      <div className="flex gap-2">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
