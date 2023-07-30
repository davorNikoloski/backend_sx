import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import bikeImage from '../../images/bike.jpg';


const ProductDetails = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/getProducts/${pid}`); // Update the API endpoint to fetch the specific product using pid
        setProduct(response.data.product);
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

  if (!product || !product[pid]) {
    return <div>Product not found.</div>;
  }

  const selectedProduct = product[pid];
  console.log(product);

  return (
    <div className="container mx-auto my-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={"/images/tent.jpg"} alt={selectedProduct.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">{selectedProduct.name}</h2>
          <p className="text-gray-600 mb-4">{selectedProduct.info}</p>
          <p className="text-green-600 font-bold text-2xl mb-4">${selectedProduct.price}</p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="my-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Details</h3>
        <ul>
          <li className="text-gray-600 mb-2"><strong>Category:</strong> {selectedProduct.category}</li>
          <li className="text-gray-600 mb-2"><strong>Brand:</strong> {selectedProduct.brand}</li>
          <li className="text-gray-600 mb-2"><strong>Color:</strong> {selectedProduct.color}</li>
          {/* Add more product details here */}
        </ul>
      </div>
      <div className="my-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Description</h3>
        <p className="text-gray-600">{selectedProduct.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
