import React from 'react';
import { Link } from 'react-router-dom';
import bikeImage from '../../images/bike.jpg';

const ProductCard = ({ product }) => {

  const { pid, name, price, image, info } = product ;

  const handleOrderNow = () => {
    window.open(`/getProducts/${pid}`, '_blank');
  };

  return (
    <div className="relative flex flex-col items-stretch p-4 border rounded-lg shadow-md bg-white transition-all hover:shadow-xl hover:bg-gray-100">
      <img
        src={bikeImage}
        alt={name}
        className="h-64 w-full object-cover rounded-t-lg"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 font-bold text-xl mb-2">${price}</p>
        </div>
        <div className="flex flex-col items-stretch">
          <button
            className="px-4 py-2 mb-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
