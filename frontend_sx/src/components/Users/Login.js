import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {

  //--------------------FUNCTIONS------------------------------

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        '/auth/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include the JWT token in the Authorization header
          },
        }
      );

      //const { access_token } = response.data; // Get the access token from the response
      //localStorage.setItem('access_token', access_token); // Store the token in local storage
      console.log(response.get.access_token);
      setMessage(response.data.code);
      navigate('/getProducts');

    } catch (error) {

      setMessage('Login failed. Please check your credentials.' + error);
    }
  };


  //-----------------------HTML-------------------------------------

  return (
    <div className="max-w-xs mx-auto mt-8 ">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
};

export default Login;
