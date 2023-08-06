import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validEmailFormat, setValidEmailFormat] = useState(true);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setPasswordsMatch(false);
      return;
    }

    // Check for a valid email format using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidEmailFormat(false);
      return;
    }

    try {
      const response = await axios.post(
        '/auth/register',
        {
          first_name,
          last_name,
          email,
          password,
          confirm,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { access_token } = response.data; // Get the access token from the response
      localStorage.setItem('access_token', access_token); // Store the token in local storage
      
      console.log(response.data);
      setMessage(response.data.msg);
      navigate('/login');
    } catch (error) {
      // If registration fails, show error message
      setMessage('Registration failed. Please try again later.' + error);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="text"
          name="first_name"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setValidEmailFormat(true);
          }}
        />
        

        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="password"
          name="confirm"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setPasswordsMatch(e.target.value === password);
          }}
        />
        {!validEmailFormat && (
          <p className="text-red-500 mt-2">Invalid email format.</p>
        )}
        {!passwordsMatch && (
          <p className="text-red-500 mt-2">Passwords do not match.</p>
        )}
        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          type="submit"
        >
          Register
        </button>
      </form>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
};

export default Register;
