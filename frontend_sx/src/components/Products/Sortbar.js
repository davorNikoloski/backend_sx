import React from 'react';

const Sortbar = ({ categoryName, productCount, onSortChange }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow-md mb-4">
      <div>
        <p className="text-lg font-bold text-gray-800">
          {categoryName ? categoryName : 'All Products'}
        </p>
        <p className="text-gray-500">{productCount} products</p>
      </div>
      <div className="flex items-center">
        <p className="mr-2 text-gray-700">Sort by:</p>
        <select
          className="border rounded px-2 py-1 text-gray-700"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="recommended">Recommended</option>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default Sortbar;
