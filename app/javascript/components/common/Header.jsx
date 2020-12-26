import React, { useState } from "react";
import logo from "images/logo.png";

const Dropdown = ({ isAuth }) => {
  return (
    <div className="dropdown">
      <div className="dropdown_option">
        <a href="/user">
          <p>Профиль</p>
        </a>
      </div>
      <div className="dropdown_option">
        <a href="#">
          <p>{isAuth ? "Выйти" : "Войти"}</p>
        </a>
      </div>
    </div>
  );
};

const Header = (props) => {
  const [isDropdown, setDropdown] = useState(false);

  return (
    <>
      <div className="header">
        <a href="/">
          <img src={logo} width="200px" height="100%" alt="logo" />
        </a>
        <div className="user-icon">
          <p><a href="/user">U</a></p>
        </div>
      </div>
      <hr />
      {isDropdown && <Dropdown isAuth />}
    </>
  );
};

export default Header;
