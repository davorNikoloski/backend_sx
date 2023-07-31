import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import ProductDetails from './ProductDetails';





const ProductsList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null); // Change the state to store the selected productId

  // Sample categories data (replace this with API data)
  const categories = [
    // Categories data here
  ];

  useEffect(() => {
    // Fetch products from the API when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products/getProducts'); // Update the API endpoint
      setProducts(response.data.product);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCardClick = (productId) => {
    setSelectedProductId(productId); 
  };

  return (
    <div className="flex">
      <Sidebar categories={categories} handleCategoryClick={handleCategoryClick} />
      <div className="flex flex-wrap justify-center">
        {products
          .filter((product) => !selectedCategory || product.categoryId === selectedCategory)
          .map((product) => (
            <div key={product.pid} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              {product.pid && (
                <ProductCard product={product} onClick={() => handleCardClick(product.pid)} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsList;
