import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [address, setAddress] = useState('');
  const [address_number, setAddress_number] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validEmailFormat, setValidEmailFormat] = useState(true);

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
        '/api/auth/register',
        {
          first_name,
          last_name,
          phone_number,
          address,
          address_number,
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
      console.log(response.data);
      const { access_token } = response.data;

      if (access_token) {
        // Store the access_token in a cookie
        Cookies.set('access_token', access_token);

        setMessage(response.data.msg);
        setIsLoggedIn(true);
        navigate('/login');
      } else {
        navigate('/login');
        setMessage('Registration failed. Please try again later.');
      }
    } catch (error) {
      // Log the full error object for troubleshooting
      console.error('Error during registration:', error);
      setMessage('Registration failed. Please try again later.');
    }
  };

  //-----------------------HTML-------------------------------------

  return (
    <div className="max-w-xs mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Регистрација</h2>
      <form onSubmit={handleRegister}>
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="text"
          name="first_name"
          placeholder="Име"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="text"
          name="last_name"
          placeholder="Презиме"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="text"
          name="email"
          placeholder="Емаил"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setValidEmailFormat(true);
          }}
        />
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="text"
          name="phone_number"
          placeholder="Телефонски број"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <div className="flex mb-2">
          <div className="w-1/2 pr-1">
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              name="address"
              placeholder="Улица"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="w-1/2 pl-1">
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              name="address_number"
              placeholder="Бр. Улица"
              value={address_number}
              onChange={(e) => setAddress_number(e.target.value)}
            />
          </div>
        </div>
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="password"
          name="password"
          placeholder="Лозинка"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-2 border rounded-md"
          type="password"
          name="confirm"
          placeholder="Повторете лозинка"
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

Register.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Register;
