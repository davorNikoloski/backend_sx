import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      // Make a POST request to your Flask API's register endpoint
      const response = await axios.post('/api/register', { email, phoneNumber, first_name , last_name 
        ,password, confirm});
      // If registration is successful, show success message
      setMessage('Registration successful! You can now login.');
    } catch (error) {
      // If registration fails, show error message
      setMessage('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setFirst_name(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLast_name(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="text"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-2 border rounded-md"
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={handleRegister}
      >
        Register
      </button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
};

export default Register;
