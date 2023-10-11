import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import PropTypes from 'prop-types';

import '../output.css';

const Navbar = ({ isSticky, isLoggedIn, matchedUser, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  //const [loggedInUser, /*setLoggedInUser*/] = useState(null);

  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`bg-gray-800 py-4 ${isSticky ? 'sticky top-0' : ''} z-50`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Почетна
            </Link>
          </li>
          <li>
            <Link to="/getProducts" className="text-white hover:text-gray-300">
              Продавница
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Контакт
            </Link>
          </li>
        </ul>

        <div className="text-white text-xl font-bold">Shopex</div>

        <div className="hidden md:flex items-center space-x-4">
  {isLoggedIn ? (
    <>
      <span className="text-white">
        Здраво {matchedUser ? matchedUser.first_name : 'Гост'}
      </span>
      <div className="w-px h-6 bg-gray-500"></div>
      <button
        className="text-white hover-text-gray-300"
        onClick={onLogout}
      >
        Одјави се
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="text-white hover:text-gray-300">
        <FontAwesomeIcon icon={faUser} className="text-white text-2xl hover:text-gray-300 cursor-pointer" />
        <span className="ml-2">Најави се</span>
      </Link>
      <Link to="/register" className="text-white hover:text-gray-300">
        <FontAwesomeIcon icon={faUser} className="text-white text-2xl hover:text-gray-300 cursor-pointer" />
        <span className="ml-2">Регистрирај се</span>
      </Link>
    </>
  )}
  <Link to="/cartPage" className="text-white hover:text-gray-300">
    <FontAwesomeIcon icon={faShoppingCart} className="text-white text-2xl hover:text-gray-300 cursor-pointer" />
  </Link>
</div>

        <div className="md:hidden">
          <button
            className="text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            <FontAwesomeIcon
              icon={faBars}
              className="text-white text-2xl hover:text-gray-300 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
  <div className="md:hidden mt-2">
    <ul className="pt-2 pb-4">
      <li>
        <Link
          to="/"
          className="block text-white hover:text-gray-300 py-2 px-4 border-t border-gray-700"
        >
          Почетна
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          className="block text-white hover:text-gray-300 py-2 px-4 border-t border-gray-700"
        >
          Продавница
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="block text-white hover:text-gray-300 py-2 px-4 border-t border-gray-700"
        >
          Контакт
        </Link>
      </li>
      <li className="flex justify-center space-x-4 mt-4">
        {matchedUser ? (
          <>
            <span className="text-white">{matchedUser.first_name}</span>
            <div className="w-px h-6 bg-gray-500"></div>
            <button
              className="text-white hover:text-gray-300"
              onClick={onLogout}
            >
              Одјави се
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-300">
              <FontAwesomeIcon
                icon={faUser}
                className="text-white text-2xl hover:text-gray-300 cursor-pointer"
              />
              <span className="ml-2">Најави се</span>
            </Link>
            <div className="w-px h-6 bg-gray-500"></div>
            <Link to="/register" className="text-white hover:text-gray-300">
              <FontAwesomeIcon
                icon={faUser}
                className="text-white text-2xl hover:text-gray-300 cursor-pointer"
              />
              <span className="ml-2">Регистирај се</span>
            </Link>
          </>
        )}
        <div className="w-px h-6 bg-gray-500"></div>
        <Link to="/cartPage" className="text-white hover:text-gray-300">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-white text-2xl hover:text-gray-300 cursor-pointer"
          />
        </Link>
      </li>
    </ul>
  </div>
)}
    </div>
  );
};
Navbar.propTypes = {
  isSticky: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  matchedUser: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
export default Navbar;
