import React from 'react';

const OrderConfirmation = ({ location }) => {
  if (!location.state || !location.state.orderDetailsJson) {
    // Handle the case where state or orderDetailsJson are undefined
    return <div>Error: Order details not found.</div>;
  }

  // Parse the JSON string back into an object
  const orderDetails = JSON.parse(location.state.orderDetailsJson);

  // Now you can access the properties of the orderDetails object
  const { shippingInfo, cartItems, total, deliveryCost, finalTotal } = orderDetails;
  
  
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          {/* Left Section */}
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Details</p>
            {/* Shipping Info */}
            <div className="mt-8 bg-white rounded-lg p-4">
              <p className="font-semibold">Shipping Information:</p>
              <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
              {/* Display other shipping info fields */}
            </div>
            {/* Cart Items */}
            <div className="mt-6 bg-white rounded-lg p-4 space-y-4">
              <p className="font-semibold">Ordered Items:</p>
              {cartItems.map(item => (
                <div key={item.pid} className="flex space-x-4">
                  {/* Display item details */}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Order Summary</p>
            {/* Display total and order summary using the provided data */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">${total.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">${deliveryCost.toFixed(2)}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${finalTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
