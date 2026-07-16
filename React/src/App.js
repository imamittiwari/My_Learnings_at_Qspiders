import '/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

//👇 JUST CHANGE THIS LINE EVERY DAY TO SWITCH DAYS
import App from './days/Day04/App.js'; 

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
