import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from '../src/components/Users/Login'
import Register from '../src/components/Users/Login'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Login/>
    <Register/>
  </React.StrictMode>,
  document.getElementById('root')
);
