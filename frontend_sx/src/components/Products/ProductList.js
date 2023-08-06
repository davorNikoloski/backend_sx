import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

import ProductCard from './ProductCard';
import Sidebar from './Sidebar';

const ProductsList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { scid } = useParams(); // Get the subcategory ID from URL parameter

  useEffect(() => {
    fetchProducts();
  }, [scid]); // Refetch products when scid changes

  const fetchProducts = async () => {
  try {
    const response = await axios.get('/products/getProducts');
    console.log('Response from API:', response.data); // Check the response data
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
      <Sidebar handleCategoryClick={handleCategoryClick} setSearchQuery={setSearchQuery} />
      <div className="flex flex-wrap justify-center flex-1">
        {products
          .filter((product) =>
            (!selectedCategory || product.categoryId === selectedCategory) &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <div key={product.pid} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              {product.pid && product.scid &&(
                <ProductCard product={product} onClick={() => handleCardClick(product.pid)} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsList;
