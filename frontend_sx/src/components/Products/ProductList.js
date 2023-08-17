import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import Sortbar from './Sortbar'; // Import the Sortbar component

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('recommended'); // Add state for sorting

  const { scid } = useParams(); // Get the subcategory ID from URL parameter

  useEffect(() => {
    fetchProducts();
    fetchSubcategories();
  }, [scid, sortBy]);

  const fetchProducts = async () => {
    try {
      let response;

      if (scid) {
        response = await axios.get(`/products/getProductsBySubcategory/${scid}`);
        console.log(response)
      } else {
        response = await axios.get('/products/getProducts');
        console.log(response)
      }

      setProducts(response.data.products);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('/products/getSub');
      setSubcategories(response.data.subcategories);
    } catch (error) {
      console.log('Error fetching subcategories:', error);
    }
  };

  const getCurrentCategoryName = () => {
    if (scid && subcategories.length > 0) {
      const currentSubcategory = subcategories.find(subcategory => subcategory.scid === parseInt(scid));
      if (currentSubcategory) {
        return currentSubcategory.name;
      }
    }
    return null;
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  const sortedProducts = products.slice(); // Create a copy of products array to avoid mutating state

  if (sortBy === 'nameAsc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameDesc') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === 'priceAsc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceDesc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="flex">
      <h3></h3>
      <Sidebar
        handleCategoryClick={handleCategoryClick}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex flex-col flex-1">
        <Sortbar
          categoryName={getCurrentCategoryName() || selectedCategory}
          productCount={sortedProducts.length}
          onSortChange={handleSortChange}
        />
        <div className="flex flex-wrap justify-center">
          {sortedProducts
            .filter((product) =>
              (!scid || product.scid === parseInt(scid)) &&
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <div key={product.pid} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                {product.pid && product.scid && (
                  <ProductCard product={product} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
