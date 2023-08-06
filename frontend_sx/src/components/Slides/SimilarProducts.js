import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Products/ProductCard';

const SimilarProducts = ({ productDet }) => {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);

  const { scid } = productDet;

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`/products/getProductsBySubcategory/${scid}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchSimilarProducts();
  }, [scid]);

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 overflow-x-scroll p-4">
      <button
        onClick={() => scroll(-200)}
        className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto flex-1 w-full">
        {products.map((product) => (
          <div key={product.pid} className="similar-product-card" style={{ minWidth: '280px' }}>
            <ProductCard product={product} />
          </div>
        ))}
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

export default SimilarProducts;
