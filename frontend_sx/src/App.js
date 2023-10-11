import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Cookies from 'js-cookie'; // Import the js-cookie library

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
import FiltersBar from './components/Products/Filtersbar';

import CartPage from './components/Cart/CartPage';

import CheckoutPage from './components/Cart/CheckoutPage';
{/*import OrderConfirmation from './components/Cart/OrderConfirmation';*/}
import ThankYouPage from './components/Cart/ThankYouPage';

import { CartProvider } from './components/Cart/CartContext'; // Import the CartProvider




function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null); // State to store the matched user data


  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
  const storedMatchedUser = Cookies.get('user');
  if (storedMatchedUser) {
    // If the item exists, parse it and set it in the state
    
    try {
      const parsedUser = JSON.parse(storedMatchedUser);
      console.log(parsedUser[0])

      setMatchedUser(parsedUser[0]);
    } catch (error) {
      // Handle any potential parsing errors
      console.error('Error parsing user data from local storage:', error);
    }
  }
}, [isLoggedIn]);

const handleLogout = () => {
  Cookies.remove('user');
  Cookies.remove('access_token');
  Cookies.remove('cartItems'); 
  setIsLoggedIn(false);
  // Additional actions as needed.
};

  return (
    <Router>
      <CartProvider> {/* Wrap your app with CartProvider */}
        <div className="flex flex-col min-h-screen">
        <NavMenu
            isSticky={true}
            isLoggedIn={isLoggedIn}
            matchedUser={matchedUser}
            onLogout={handleLogout}
            setIsLoggedIn={setIsLoggedIn} // Pass setIsLoggedIn as a prop

          />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userlist" element={<UserList />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} // Pass setIsLoggedIn function
              />}
              />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} /> {/* Display the cart */}
            <Route path="/cartPage" element={<CartPage />} /> {/* Display the cart */}
            <Route path="/filtersbar" element={<FiltersBar />} /> {/* Display the cart */}

            <Route path="/getProducts" element={<Products />} />
            <Route path="/product/:pid" element={<ProductDetails />} /> {/* New route */}
            <Route path="/getProducts/:scid" element={<ProductList />} /> {/* Route with subcategory */}
           
            <Route path="/check" element={<CheckoutPage />} /> {/* Route with subcategory */}


            <Route path="/checkout" component={<CheckoutPage/>} />
            {/*<Route path="/OrderConfirmation" element={<OrderConfirmation />} />*/}
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
