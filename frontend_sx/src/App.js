import React, { useState } from 'react';
import NavMenu from './components/NavMenu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Users/Login';
import Register from './components/Users/Register';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/userlist" component={UserList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
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
