import React from 'react';
import PropTypes from 'prop-types';

const Sortbar = ({ categoryName, productCount, onSortChange }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow-md mb-4">
      <div>
        <p className="text-lg font-bold text-gray-800">
          {categoryName ? categoryName : 'Сите производи'}
        </p>
        <p className="text-gray-500">{productCount} производи</p>
      </div>
      <div className="flex items-center">
        <p className="mr-2 text-gray-700">Сортирај:</p>
        <select
          className="border rounded px-2 py-1 text-gray-700"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="recommended">Препорачано</option>
          <option value="nameAsc">Име (A-Z)</option>
          <option value="nameDesc">Име (Z-A)</option>
          <option value="priceAsc">Цена (Ниско до Високо)</option>
          <option value="priceDesc">Цена (Високо до Ниско)</option>
        </select>
      </div>
    </div>
  );
};
Sortbar.propTypes = {
  categoryName: PropTypes.string.isRequired,
  productCount: PropTypes.number.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
export default Sortbar;
