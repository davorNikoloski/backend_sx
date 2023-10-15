import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'; // Import the js-cookie library

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { access_token } = response.data;

      if (access_token) {
        // Store the access_token in a cookie
        Cookies.set('access_token', access_token);

        // Fetch the user data using the access_token
        const userResponse = await axios.get('/api/auth/getUser', {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });

        const user = userResponse.data;
        Cookies.set('user', JSON.stringify(user));

        //localStorage.setItem('user', JSON.stringify(user));

        setIsLoggedIn(true);
        navigate('/getProducts');
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.' + error);
    }
  };

  //-----------------------HTML-------------------------------------

  return (
    <div className="max-w-xs mx-auto mt-8 ">
      <h2 className="text-2xl font-bold mb-4">Најава</h2>
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="text"
        name="email"
        placeholder="Емаил"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="password"
        name="password"
        placeholder="Лозинка"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleLogin}
      >
        Најави се
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
