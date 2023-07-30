import React, { useState } from 'react';
import NavMenu from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Users/Login';
import Register from './components/Users/Register';
import UserList from './components/UserList';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails'; // Import the new component

function App() {
  return (
    <Router>
      <NavMenu />

      <Routes>
        <Route path="/userlist" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/getProducts" element={<Products />} />
        <Route path="/getProducts/:pid" element={<ProductDetails />} /> {/* New route */}

        {/* Add other routes as needed */}
      </Routes>
      {/* Recommended products */}
      {/* Sidebar with filter order .... */}
      {/* Products grid */}
      {/* Product card */}
      {/* Similar products */}
    </Router>
  );
}

export default App;
