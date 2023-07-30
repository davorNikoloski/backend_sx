import React, { useState } from 'react';

const Sidebar = ({ categories, handleCategoryClick }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className="sticky top-0 h-screen bg-gray-200 w-1/5 p-4 shadow-md z-10">
      <h2 className="text-lg font-semibold mb-4">Sort By</h2>
      {/* Sorting options */}
      <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
      <button
        onClick={toggleFilter}
        className="w-full bg-blue-500 text-white px-2 py-1 rounded-lg mb-4"
      >
        {isFilterOpen ? 'Hide' : 'Show'} Filters
      </button>
      {isFilterOpen && categories ? (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="cursor-pointer">
              <span onClick={() => handleCategoryClick(category.id)}>{category.name}</span>
              {category.subcategories.length > 0 && (
                <ul className="pl-4 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>{subcategory.name}</li>
                  ))}
                </ul>
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
