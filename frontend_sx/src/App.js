import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import UserList from './components/UserList';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import ProductList from './components/Products/ProductList';
import Home from './components/Home';
import Contact from './components/Contact';
import Cart from './components/Cart/Cart';

import CartPage from './components/Cart/CartPage';

import CheckoutPage from './components/Cart/CheckoutPage';
import OrderConfirmation from './components/Cart/OrderConfirmation';
import ThankYouPage from './components/Cart/ThankYouPage';

import { CartProvider } from './components/Cart/CartContext'; // Import the CartProvider

function App() {
  return (
    <Router>
      <CartProvider> {/* Wrap your app with CartProvider */}
        <div className="flex flex-col min-h-screen">
          <NavMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} /> {/* Display the cart */}
            <Route path="/cartPage" element={<CartPage />} /> {/* Display the cart */}

            <Route path="/getProducts" element={<Products />} />
            <Route path="/product/:pid" element={<ProductDetails />} /> {/* New route */}
            <Route path="/getProducts/:scid" element={<ProductList />} /> {/* Route with subcategory */}
           
            <Route path="/check" element={<CheckoutPage />} /> {/* Route with subcategory */}


            <Route path="/checkout" component={<CheckoutPage/>} />
            <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
            <Route path="/thank-you" component={<ThankYouPage/>} />
           
           
            {/* Add other routes as needed */}
          </Routes>
          {/* Recommended products */}
          {/* Sidebar with filter order .... */}
          {/* Products grid */}
          {/* Product card */}
          {/* Similar products */}
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
