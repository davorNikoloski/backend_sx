// CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from cookies when the provider mounts
  useEffect(() => {
    const cartItemsFromCookie = getCookie('cartItems');
    if (cartItemsFromCookie) {
      const initialCartItems = JSON.parse(cartItemsFromCookie);
      setCartItems(initialCartItems);
    }
  }, []);
  
  const clearCart = () => {
    setCartItems([]);
    setCookie('cartItems', '', -1);
  };

  // Save cart items to cookies whenever the cartItems state changes
  useEffect(() => {
    setCookie('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    const existingCartItem = cartItems.find(item => item.pid === product.pid);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map(item =>
        item.pid === product.pid ? { ...item, quantity } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.pid !== productId);
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart  }}>
      {children}
    </CartContext.Provider>
  );
};

// Helper functions to get and set cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Use PropTypes to validate the children prop
};