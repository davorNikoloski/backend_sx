import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Sidebar = ({ handleCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]); // State to keep track of selected category

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetchCategories();
    fetchSubcategories();
  }, []);
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/products/getCategories'); 
      setCategories(response.data.categories);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('/products/getSub');
      setSubcategories(response.data.subcategories); 
      console.log('Subcategories:', subcategories.cid);
    } catch (error) {

      console.log('Error fetching categories:', error);
    }
  };

  const handleCategoryDropdownClick = (categoryCID) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryCID ? null : categoryCID
    );
  };

  return (
    <div className="sticky top-0 h-screen bg-gray-200 w-1/5 p-4 shadow-md z-10">
      <h2 className="text-lg font-semibold mb-4">Sort By</h2>
      {/* Sorting options */}
      <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
      {categories?.length > 0 ? (
        <ul className="space-y-2">
          
          {categories.map((category) => (
            <li key={category.cid} className="cursor-pointer">

              <button
                onClick={() => handleCategoryDropdownClick(category.cid)}
                className="flex items-center justify-between w-full bg-white text-left px-2 py-1 rounded-md"
              >

                {category.name}
                <span>{selectedCategory === category.cid ? '▲' : '▼'}</span>

              </button>

              {selectedCategory === category.cid && (
  <div>
    <ul className="pl-4 space-y-2">
      {subcategories
        .filter((subcategory) => subcategory.cid === category.cid)
        .map((subcategory) => (
          <li key={subcategory.scid}>{subcategory.name}</li>
        ))}
    </ul>
  </div>
)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Sidebar;
