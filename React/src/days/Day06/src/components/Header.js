import { useState } from 'react';
import { LOGO_URL } from '../utils/constants';
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
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
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