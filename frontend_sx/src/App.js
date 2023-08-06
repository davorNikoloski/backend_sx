import React, { useState } from 'react';
import NavMenu from './components/Navbar';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Login from './components/Users/Login';

import Register from './components/Users/Register';
import UserList from './components/UserList';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails'; // Import the new component
import ProductList from './components/Products/ProductList'; // Updated import name
import Home from './components/Home'; // Updated import name
import Contact from './components/Contact'; // Updated import name

function App() {
  return (
    <Router>
      <NavMenu />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/userlist" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />



        <Route path="/getProducts" element={<Products />} />
        <Route path="/getProducts/:pid" element={<ProductDetails />} /> {/* New route */}
        <Route path="/getProducts/:scid" element={<ProductList />} /> {/* Route with subcategory */}

        {/* Add other routes as needed */}
      </Routes>
      {/* Recommended products */}
      {/* Sidebar with filter order .... */}
      {/* Products grid */}
      {/* Product card */}
      {/* Similar products */}

      <Footer />
    </Router>
    
    
  );
}

export default App;
