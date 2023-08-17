import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Products/ProductCard';

// Function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const RecommendedProducts = () => {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.get('/products/getProducts');
        if (response.data && response.data.products) {
          const products = response.data.products;
          const shuffledProducts = shuffleArray(products);
          setProducts(shuffledProducts);
          setLoading(false);
        } else {
          console.error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchRecommendedProducts();
  }, []);

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-4 ">
      <button
        onClick={() => scroll(-200)}
        className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="flex overflow-x-auto w-full " ref={scrollContainerRef}>
        <div className="flex space-x-4">
          {products.map((product) => (
            <div key={product.pid} className="recommended-product-card" style={{ minWidth: '280px' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll(200)}
        className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default RecommendedProducts;
