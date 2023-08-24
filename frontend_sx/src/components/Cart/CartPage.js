import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import axios from 'axios';
import OrderConfirmation from '../Cart/OrderConfirmation';

const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
  const deliveryCost = 8; // Set your delivery cost here
  const discount = 0; // Set your discount amount here
  const finalTotal = total + deliveryCost - discount; // Calculate the final total including shipping
  const navigate = useNavigate(); // Add useNavigate hook


  const productIds = cartItems.map(item => item.pid); // Get an array of product IDs

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    street: '',
    houseNumber: '',
    postCode: '',
    city: '',
    phoneNumber: '',
    moreInfo: '',
  });

  const handleBuyNow = async () => {
    // Prepare the order data
    const orderData = {
    shippingInfo: {
      ...shippingInfo, // Spread the existing shippingInfo fields
    },
    products: cartItems.map(item => ({
      productId: item.pid,
      quantity: item.quantity, // Include the quantity of each item
    })),
  };
  
    try {
      const response = await axios.post('/order/order', orderData);
      const orderDetails = response.data.orderDetails;
      const orderDetailsJson = JSON.stringify(orderDetails);

  // Navigate to the order confirmation page with orderDetails as state
  navigate('/OrderConfirmation', { state: { orderDetailsJson } });

  // Handle the response as needed
} catch (error) {
  console.error('Error sending order:', error);
  console.log('Error response data:', error.response.data);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {/* Cart Items */}
      {cartItems.map(item => (
        <div key={item.pid} className="flex flex-col sm:flex-row rounded-lg bg-white">
          <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.image} alt="" />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">{item.name}</span>
            <span className="float-right text-gray-400">Quantity: {item.quantity}</span> {/* Display quantity */}
            <p className="mt-auto text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
            
            
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Shipping Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <div className="">
              {/* Shipping form */}
              <form onSubmit={handleBuyNow}>
                {/* Input fields for shipping info */}
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block mt-4">
                      First Name:
                      <input
                        type="text"
                        name="firstName"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        value={shippingInfo.firstName}
                        onChange={e => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <label className="block mt-4">
                      Last Name:
                      <input
                        type="text"
                        name="lastName"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        value={shippingInfo.lastName}
                        onChange={e => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block mt-4">
                      Street:
                      <input
                        type="text"
                        name="street"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        value={shippingInfo.street}
                        onChange={e => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <label className="block mt-4">
                      House Number:
                      <input
                        type="text"
                        name="houseNumber"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        value={shippingInfo.houseNumber}
                        onChange={e => setShippingInfo({ ...shippingInfo, houseNumber: e.target.value })}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block mt-4">
                      Post Code:
                      <input
                        type="text"
                        name="postCode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        value={shippingInfo.postCode}
                        onChange={e => setShippingInfo({ ...shippingInfo, postCode: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <label className="block mt-4">
                      City:
                      <input
                        type="text"
                        name="city"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        value={shippingInfo.city}
                        onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      />
                    </label>
                  </div>
                </div>
                <label className="block mt-4">
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={shippingInfo.phoneNumber}
                    onChange={e => setShippingInfo({ ...shippingInfo, phoneNumber: e.target.value })}
                  />
                </label>
                <label className="block mt-4">
                  More Info:
                  <textarea
                    name="moreInfo"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    rows="4"
                    value={shippingInfo.moreInfo}
                    onChange={e => setShippingInfo({ ...shippingInfo, moreInfo: e.target.value })}
                  ></textarea>
                </label>
                
                {/* Input fields for contact info */}
                
                
                {/* Total and Place Order button */}
                {/* ... */}
              </form>
            </div>
            
            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">${total.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">${deliveryCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${finalTotal.toFixed(2)}</p>
            </div>
            <button
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              onClick={handleBuyNow}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
