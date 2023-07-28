import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // If you are using react-router-dom, make sure to import BrowserRouter
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";

//import Register from "./components/user/Register";


const root = createRoot(document.getElementById('root'));
//ReactDOM.render(<Register />, document.getElementById("register"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
