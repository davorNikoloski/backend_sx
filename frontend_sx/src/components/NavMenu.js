import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import '../output.css';

const NavMenu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Navigation Links (Left) */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-white hover:text-gray-300">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-white hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>

          {/* Logo (Middle) */}
          <div className="text-white text-xl font-bold">MyWebShop</div>

          {/* Login/Register/Profile, Search, and Cart Icons (Right) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Replace these links with your actual login, register, and profile links */}
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
            {/* Profile Icon */}
            <FontAwesomeIcon
              icon={faUser}
              className="text-white text-2xl hover:text-gray-300 cursor-pointer"
            />
            {/* Search Icon */}
            <FontAwesomeIcon
              icon={faSearch}
              className="text-white text-2xl hover:text-gray-300 cursor-pointer"
            />
            {/* Cart Icon */}
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-white text-2xl hover:text-gray-300 cursor-pointer"
            />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            {/* Add a button to toggle the mobile menu */}
            <button
              className="text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <ul className="pt-2 pb-4">
              <li>
                <Link to="/" className="block text-white hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block text-white hover:text-gray-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/products" className="block text-white hover:text-gray-300">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block text-white hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavMenu;
