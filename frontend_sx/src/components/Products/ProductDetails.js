import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SimilarProducts from '../Slides/SimilarProducts';
import Newsletter from '../newsletter';
import bikeImage from '../../images/bike.jpg';
import { CartContext } from '../Cart/CartContext';

const ProductDetails = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);

  const isItemInCart = product && cartItems.some(item => item.pid === product.pid);

  const handleAddToCart = () => {
    if (product && !isItemInCart) {
      addToCart(product);
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.pid);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/product/${pid}`);
        setProduct(response.data.products);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [pid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }


  return (
    <div className="container mx-auto my-8 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={bikeImage}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="md:mt-0">
        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.brand}</p>
        <p className="text-green-600 font-bold text-2xl mb-4">${product.price}</p>
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex items-center mb-4">
          <button className="border rounded-full px-3 py-1">
            <span className="font-bold">-</span>
          </button>
          <span className="mx-2 font-semibold">1</span>
          <button className="border rounded-full px-3 py-1">
            <span className="font-bold">+</span>
          </button>
          {isItemInCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-600 text-white rounded-md px-4 py-1 ml-4 hover:bg-red-700"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white rounded-md px-4 py-1 ml-4 hover:bg-green-700"
            >
              Add to Cart
            </button>
          )}
        </div>
        
        {/* Additional info box */}
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-sm text-gray-600">Дополнителни информации</h3>
          <p>{product.additionalInfo}</p>
        </div>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Product Description</h3>
        <p className="text-gray-600">
          {product.info ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
        </p>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <SimilarProducts productDet={product} />
      </div>
      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
        <Newsletter />
      </div>
    </div>
  );
};

export default ProductDetails;
