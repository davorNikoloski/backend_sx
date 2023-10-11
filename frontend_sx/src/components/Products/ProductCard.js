//import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
//import img from '/products/images/${product_path}';

//const realImg = '../../images/car.jpg';

const ProductCard = ({ product }) => {

  const { pid, name, price, product_path, /*info*/ } = product;
  const [imageURL, setImageURL] = useState(null);
  
  
  const handleOrderNow = () => {
    window.open(`/product/${pid}`, '_blank');
    
  };

  useEffect(() => {
    const backendURL = 'http://localhost:5000';

    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/products/images/${product_path}`);
        if (response.status === 200) {
          setImageURL(response.config.url);
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (product_path) { // Check if imageFilename is not empty
      fetchData(); // Fetch data only when imageFilename is not empty
    }
  }, [product_path]);

  return (
    <div className="relative flex flex-col items-stretch p-4 border rounded-lg shadow-md bg-white transition-all hover:shadow-xl hover:bg-gray-100">
      <img
        src={imageURL}
        alt={"nemat"}
        className="h-[200px] w-full object-contain rounded-t-lg"
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
ProductCard.propTypes = {
  product: PropTypes.shape({
    pid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    product_path: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProductCard;
