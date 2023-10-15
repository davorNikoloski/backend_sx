import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const Sidebar = ({ setSearchQuery, /*showMobileSidebar, setShowMobileSidebar */}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQueryLocal] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/products/getCategories');
      setCategories(response.data.categories);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('/api/products/getSub');
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
      navigate(`/api/products/getProducts/${subcategoryID}`);
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
      <h2 className="text-lg font-semibold mb-4">Филтри</h2>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Пребарај..."
          className="w-full px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="py-2 mb-2 text-center font-semibold bg-blue-500 text-white rounded-md">
          Категории
        </h3>
        {categories?.length > 0 ? (
          <ul className="space-y-1">
            {categories.map((category) => (
              <li
                key={category.cid}
                className={`cursor-pointer ${
                  selectedCategory === category.cid ? 'bg-blue-100' : ''
                }`}
              >
                <button
                  onClick={() => handleCategoryDropdownClick(category.cid)}
                  className={`flex items-center justify-between w-full bg-white text-left px-4 py-2 rounded-md ${
                    selectedCategory === category.cid ? 'bg-blue-200 text-blue-700' : ''
                  }`}
                >
                  <span className={`${selectedCategory === category.cid ? 'text-blue-700' : 'text-gray-700'}`}>
                    {category.name}
                  </span>
                  <span>{selectedCategory === category.cid ? '▲' : '▼'}</span>
                </button>
                {selectedCategory === category.cid && (
                  <div className="pl-4">
                    <ul className="space-y-1">
                      {subcategories
                        .filter((subcategory) => subcategory.cid === category.cid)
                        .map((subcategory) => (
                          <li key={subcategory.scid} className="pl-2">
                            <button
                              onClick={() =>
                                window.open(`/getProducts/${subcategory.scid}`, '_blank')
                              }
                              className={`text-${
                                selectedCategory === category.cid ? 'blue' : 'gray'
                              }-600 hover:underline`}
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

      {/* Clear Filters */}
      <button onClick={handleClearFilters} className="w-full bg-gray-300 py-2 rounded-md">
        Исчисти филтри
      </button>
    </div>
  );
};
Sidebar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired, // A function to set the search query
};
export default Sidebar;
