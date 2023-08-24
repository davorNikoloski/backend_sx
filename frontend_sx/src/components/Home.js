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
    className="relative bg-cover bg-center text-white h-60 md:h-96 flex flex-col justify-center items-center shadow-md"
    style={{ backgroundImage: `url(${bannerImageUrl})` }}
  >
    {/* Blurry Overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>

    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center relative z-10">
      Истражете ги нашите продукти!
    </h1>
    <a
      href="/products"
      className="bg-lime-500 hover:bg-lime-600 text-lg text-black py-4 px-6 rounded-lg relative z-10"
    >
      Истражи
    </a>
  </section>

  {/* Commercial Info */}
  <section className="py-8 md:py-12 bg-gray-100">
    <div className="container mx-auto px-4 text-center md:flex md:justify-center">
      <div className="mb-4 md:w-1/3 md:mb-0 bg-blue-100 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Квалитетни продукти</h2>
        <p className="px-4">Во нашиот богат асортиман, квалитетот е во самиот срце на сè што го нудиме. Секој производ кој го одбираме и ставаме на располагање е резултат на внимателен избор и стручност. Сме посветени да ви обезбедиме само најдоброто, бидејќи сме сигурни дека вистинскиот квалитет се препознава во долготрајноста и задоволството на нашите клиенти. Секој производ во нашата палета е гаранција за извонредност и одлична вредност, бидејќи знаеме дека квалитетот не е компромис, туку начин на живот.</p>
      </div>
      <div className="mb-4 md:w-1/3 md:mb-0 bg-green-100 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Брза достава</h2>
        <p className="px-4">Вашето време е важно, затоа ние се посветени на брза достава. Со нашата ефикасна систем на испорака, вашите нарачки стигнуваат до вас во најкраток можен рок. Ние го разбираме вашето нетрпение да ги добиете вашите квалитетни производи, затоа работиме нон-стоп за да ви обезбедиме брза, безбедна и точна достава секој пат. Вашата задоволство и очекувањата се наш приоритет, и ние не престануваме да се трудиме да ви го обезбедиме најдоброто и најбрзото.</p>
      </div>
      <div className="md:w-1/3 bg-yellow-100 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Поддршка</h2>
        <p className="px-4">Вашиот задоволен усмивка е наш успех. Се грижиме за вас од почеток до крај - со поддршка што стои зад вас, гаранција за враќање и рефундирање. Ние не сакаме само еднаш да ве видиме; сакаме да се вратите затоа што вие сте дел од нашата фамилија на задоволни клиенти.</p>
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
