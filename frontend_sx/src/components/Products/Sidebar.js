// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setSearchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQueryLocal] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
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
    } catch (error) {
      console.log('Error fetching subcategories:', error);
    }
  };

  const handleCategoryDropdownClick = (categoryCID, subcategoryName, subcategoryID) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryCID ? null : categoryCID
    );

    if (subcategoryName) {
      setSearchQuery(subcategoryName);
    }

    if (subcategoryID) {
      // Navigate to the new route for the selected subcategory
      navigate(`/products/getProducts/${subcategoryID}`);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQueryLocal(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  return (
    <div className="sticky top-0 h-screen bg-gray-200 w-1/5 p-4 shadow-md z-10">
      <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <button
        onClick={handleClearFilters}
        className="w-full bg-gray-300 py-2 rounded-md mb-4"
      >
        Clear Filters
      </button>
      <h3 className="w-full bg-white-300 py-2 rounded-md mb-4 text-center" >Categories</h3>
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
                        <li key={subcategory.scid}>
                          <button
                            onClick={() =>
                              window.open(`/getProducts/${subcategory.scid}`, '_blank')
                              //handleCategoryDropdownClick(category.cid, subcategory.name)
                            }
                          >
                            {subcategory.name}
                        </button>
                        </li>
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
