import React from 'react';
import RecommendedProducts from './Slides/RecommendedProducts';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const bannerImageUrl =
    'https://happywall-statix.imgix.net/rooms/room-162.jpg?w=1830&h=1220&fit=min&crop=bottom%2Ccenter&blend64=aHR0cHM6Ly9oYXBweXdhbGwtaW1nLWdhbGxlcnkuaW1naXgubmV0L3dhbGxwYXBlci5qcGc_dz0xODMwJmg9MTIyMCZmaXQ9Y3JvcCZibGVuZDY0PWFIUjBjSE02THk5b1lYQndlWGRoYkd3dGFXMW5MV2RoYkd4bGNua3VhVzFuYVhndWJtVjBMelEyT0RBekwySnlhV2RvZEY5bWJHOXlZV3hmY0dGMGRHVnlibDlrYVhOd2JHRjVMbXB3Wno5M1BURTFPRFltYUQwNU1UVW1abWwwUFdOeWIzQW1ZM0p2Y0QxaWIzUjBiMjBsTWtOalpXNTBaWEltWW14bGJtUXRZMjlzYjNJOU1EQXdNREF3Sm1Kc1pXNWtMVzF2WkdVOWJYVnNkR2x3YkhrbVlteGxibVF0WVd4d2FHRTlNU1ppY21rOU15WnpZWFE5TVRBJTNEJmJsZW5kLW1vZGU9bm9ybWFsJmJsZW5kLXk9MCZibGVuZC14PTI0NA%3D%3D&blend-mode=multiply&mark64=aHR0cHM6Ly9oYXBweXdhbGwtc3RhdGl4LmltZ2l4Lm5ldC9yb29tcy9yb29tLTE2Mi5wbmc_dz0xODMwJmg9MTIyMCZmaXQ9bWluJmNyb3A9Ym90dG9tJTJDY2VudGVy&mark-x=0&mark-y=0&q=70';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="bg-cover bg-center text-white h-60 md:h-96 flex flex-col justify-center items-center shadow-md"
        style={{ backgroundImage: `url(${bannerImageUrl})` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-shadow-lg">
          Trending
        </h1>
        <a
          href="/products"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Browse Products
        </a>
      </section>

      {/* Commercial Info */}
      <section className="py-8 md:py-12 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:space-x-4">
          <div className="text-center mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Quality Products</h2>
            <p>We offer a wide range of high-quality products for all your needs.</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Fast Shipping</h2>
            <p>Our efficient shipping ensures you get your orders as quickly as possible.</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">24/7 Support</h2>
            <p>Our dedicated support team is available around the clock to assist you.</p>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <div className="text-left mt-8 pl-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Recommended Products</h2>
        <RecommendedProducts />
      </div>
    </div>
  );
};

export default Home;
