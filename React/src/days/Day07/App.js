
//👇 JUST CHANGE THIS LINE EVERY DAY TO SWITCH DAYS
import { RouterProvider } from 'react-router-dom';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import About from './src/components/About'
import Contact from './src/components/Contact'
import ReactDom from "react-dom/client";

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet /> 
      
    </div>
  )
};


export default AppLayout;