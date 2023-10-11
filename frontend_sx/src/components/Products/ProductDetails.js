import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SimilarProducts from '../Slides/SimilarProducts';
//import bikeImage from '../../images/products/bike.jpg';
import { CartContext } from '../Cart/CartContext';

const ProductDetails = () => {

  const [imageURL, setImageURL] = useState(null);
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFilename, setImageFilename] = useState(''); // Initial value can be empty or a default image filename

  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
  const isItemInCart = product && cartItems.some(item => item.pid === product.pid);


  // Increase quantity
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity (minimum 1)
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product && !isItemInCart) {
      addToCart({ ...product }, quantity); // Pass the product and quantity
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.pid);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/product/${pid}`);
        setProduct(response.data.products);
        setLoading(false);

        const productImagePath = response.data.products.product_path;
        setImageFilename(productImagePath); // Assume you have a state for imageFilename
        console.log(productImagePath);
        console.log(response.data.products);
      } catch (error) {
        console.log('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [pid]);
  //let imageFilename = 'random.jpeg';
  //let imageFilename = product.product_path;
console.log(imageFilename + "-------------")
  useEffect(() => {

    const backendURL = 'http://localhost:5000';
    

    axios.get(`${backendURL}/products/images/${imageFilename}`)
      .then((response) => {
        if (response.status === 200) {
          setImageURL(response.config.url);
        } else {
          console.error('Failed to fetch image');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [imageFilename]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }


  return (
    <div className="container mx-auto my-8 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className='flex w-full h-full justify-center align-center items-center'>
        <img
          src={imageURL}
          alt={"nemat"}
          className="w-full w-100 object-contain rounded-lg shadow-md"
        />
      </div>
      <div className="md:mt-0">
  <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
  <p className="text-gray-600 mb-2">{product.brand}</p>
  <p className="text-green-600 font-bold text-2xl mb-4">${product.price}</p>
  <hr className="border-t border-gray-300 mb-4" />

  <div className="flex items-center mb-4">
    {/* Quantity Controls */}
    <button
      className="border rounded-full px-3 py-1"
      onClick={handleDecreaseQuantity}
    >
      <span className="font-bold">-</span>
    </button>
    <span className="mx-2 font-semibold">{quantity}</span>
    <button
      className="border rounded-full px-3 py-1"
      onClick={handleIncreaseQuantity}
    >
      <span className="font-bold">+</span>
    </button>

    {/* "Add to Cart" Button */}
    {isItemInCart ? (
      <button
        onClick={handleRemoveFromCart}
        className="bg-red-600 text-white rounded-md px-4 py-1 ml-4 hover:bg-red-700"
      >
        Remove from Cart
      </button>
    ) : (
      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white rounded-md px-4 py-1 ml-4 hover:bg-green-700"
      >
        Add to Cart
      </button>
    )}
  </div>
  
  {/* Additional Info Box */}
  <div className="bg-gray-100 p-4 rounded-md mb-4">
        
    <h3 className="text-sm text-gray-600">Дополнителни информации</h3>
    <p>{product.info}</p>
  </div>
</div>

      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Спецификации за продуктот</h3>
        <p className="text-gray-600">
          {product.description ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
        </p>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Слични производи</h3>
        <SimilarProducts productDet={product} />
      </div>
      <div className="md:col-span-2">
      </div>
    </div>
  );
};

export default ProductDetails;
