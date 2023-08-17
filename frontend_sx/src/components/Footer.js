// components/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="md:order-1 flex space-x-4 pl-5">
          <a href="#" className="text-white hover:text-gray-400">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="md:order-2 text-center md:text-center">
          <p className="text-white">&copy; {new Date().getFullYear()} Shopex. All rights reserved.</p>
        </div>
        <div className="md:order-3 flex space-x-4 pr-5">
          <a href="/faq" className="text-white hover:text-gray-400">FAQ</a>
          <a href="/contact" className="text-white hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
