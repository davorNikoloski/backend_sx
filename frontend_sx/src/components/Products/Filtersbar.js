import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Filtersbar = ({ categories, subcategories, setSelectedCategory, setSearchQuery }) => {
  const [showSubcategories, setShowSubcategories] = useState(false);

  const handleCategoryClick = (categoryId, subcategoryName) => {
    setSelectedCategory(categoryId);
    setSearchQuery(subcategoryName);
    setShowSubcategories(true);
  };

  const handleSubcategoryClick = (subcategoryName) => {
    setSearchQuery(subcategoryName);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setShowSubcategories(false);
  };

  return (
    <div className="bg-gray-200 p-4">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 mb-4 border rounded-md"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category.cid}>
            <button
              className={`w-full text-left p-2 rounded-md ${
                showSubcategories ? 'bg-gray-300' : 'bg-white'
              }`}
              onClick={() => handleCategoryClick(category.cid, category.name)}
            >
              {category.name}
            </button>
            {showSubcategories && (
              <ul className="ml-4 space-y-1">
                {subcategories
                  .filter((subcategory) => subcategory.cid === category.cid)
                  .map((subcategory) => (
                    <li key={subcategory.scid}>
                      <button
                        className="text-gray-600 hover:underline"
                        onClick={() => handleSubcategoryClick(subcategory.name)}
                      >
                        {subcategory.name}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Clear Filters */}
      <button
        className="w-full bg-gray-300 py-2 rounded-md"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

Filtersbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired, // An array of category strings
  subcategories: PropTypes.arrayOf(PropTypes.string).isRequired, // An array of subcategory strings
  setSelectedCategory: PropTypes.func.isRequired, // A function to set the selected category
  setSearchQuery: PropTypes.func.isRequired, // A function to set the search query
};
export default Filtersbar;
