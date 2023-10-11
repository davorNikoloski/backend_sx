import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const { /*cartItems*/ finalTotal, deliveryCost, discount } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-2 border rounded-md focus:ring focus:ring-opacity-50"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-2 border rounded-md focus:ring focus:ring-opacity-50"
                />
              </div>
              <input
                type="text"
                placeholder="Street"
                className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Street Number"
                  className="p-2 border rounded-md focus:ring focus:ring-opacity-50"
                />
                <input
                  type="text"
                  placeholder="Post Number"
                  className="p-2 border rounded-md focus:ring focus:ring-opacity-50"
                />
              </div>
              <input
                type="text"
                placeholder="City"
                className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-50"
              />
              <textarea
                placeholder="Additional Info"
                className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-50"
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="text-xl">
              <p>Order Total: ${finalTotal}</p>
              <p>Delivery Cost: ${deliveryCost}</p>
              <p>Discount: ${discount}</p>
            </div>
            <div className="text-center mt-4">
              <p className="text-xl font-semibold">Total: ${finalTotal}</p>
              {/* Buy Now button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
