import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Make a POST request to your Flask API's login endpoint
      const response = await axios.post('/api/login', { email, password });
      // If login is successful, show success message
      setMessage('Login successful!');
      // Here you can handle token storage or redirection to another page
    } catch (error) {
      // If login fails, show error message
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="password"
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
