import '/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Body from './days/Day07/src/components/Body.js';
import AppLayout from './days/Day07/App.js';
import About from './days/Day07/src/components/About.js'
import Error from './days/Day07/src/components/Error.js';
import Contact from './days/Day07/src/components/Contact.js';
//👇 JUST CHANGE THIS LINE EVERY DAY TO SWITCH DAYS
import App from './days/Day07/App.js'; 
import { RouterProvider } from 'react-router-dom';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RestaurantMenu from './days/Day07/src/components/RestaurantMenu.js';


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:ResId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);
