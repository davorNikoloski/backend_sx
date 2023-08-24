import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (onLoginSuccess ) => {
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
          },
        }
      );
      
      console.log(response.config.data); // Add this line to check the response data

      const accessToken = response.data.access_token;
      localStorage.setItem('access_token', accessToken);

      // Fetch user data using the access token
      const userResponse = await axios.get('/auth/users', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const loggedInUserData = response.data.email; // User data from the login response
      const fetchedUserData = userResponse.data; // User data from the users response

      const loggedInUserEmail = loggedInUserData.toLowerCase().trim();
      const fetchedEmails = fetchedUserData.map(user => user.email.toLowerCase().trim());

      if (fetchedEmails.includes(loggedInUserEmail)) {
        // User data corresponds to the same user who logged in
        const matchedUser = fetchedUserData.find(user => user.email.toLowerCase().trim() === loggedInUserEmail);
        localStorage.setItem('user', JSON.stringify(matchedUser));
        setIsLoggedIn(true);
        //onLoginSuccess();

        navigate('/getProducts');
        window.location.reload();

        console.log("User data from login:", loggedInUserData);
        console.log("Matched user data from users response:", matchedUser);
      } else {
        console.log("Fetched user data does not match the logged-in user.");
      }


          } catch (error) {
            setMessage('Login failed. Please check your credentials.' + error.message);
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

export default Login;
