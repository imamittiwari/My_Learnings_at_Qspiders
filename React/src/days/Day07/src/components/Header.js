import { useState } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from "react-router-dom";


const Header = () => {

  const [loginButton, setloginButton] = useState("Login");  // whole Header function re renders automatically

  return (
    <div className="header">


      <div className='logo'>
        <img src={LOGO_URL}
        />
      </div>

      <div className="nav-items">

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
      
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>🛒</li>

          <button className='button-login' onClick={() => {
            loginButton === "Login"
            ? setloginButton("Logout")
            : setloginButton("Login")
          }}
          >
            { loginButton }
          </button>
        </ul>

      </div>

    </div>
  )
};

export default Header;