import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./Navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const { username, dispatch } = useContext(AuthContext);
  const [isOpenNavbar, setIsOpenNavbar] = useState(true);

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className={`nav ${isOpenNavbar ? "" : "close"}`}>
      <i
        className="bx bx-chevron-left toggle"
        onClick={() => {
          setIsOpenNavbar(!isOpenNavbar);
        }}
      ></i>
      <div className="nav__logo">
        <h2 className="nav__logo-header">TimeM</h2>
      </div>
      <div className="user">
        <div className="image user__avatar">
          <div className="user__image image"></div>
        </div>
        <span className="user__username text">{username}</span>
      </div>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu__links">
            <li className="menu__link">
              <NavLink to="/">
                <i className="bx bxs-home icon"></i>
                <span className="menu__link-text text">Home</span>
              </NavLink>
            </li>
            <li className="menu__link">
              <NavLink to="/profile">
                <i className="bx bxs-user-circle icon"></i>
                <span className="menu__link-text text">Profile</span>
              </NavLink>
            </li>
            <li className="menu__link">
              <NavLink to="/boards">
                <i className="bx bx-table icon"></i>
                <span className="menu__link-text text">Boards</span>
              </NavLink>
            </li>
            <li className="menu__link">
              <NavLink to="/tasks">
                <i className="bx bx-task icon"></i>
                <span className="menu__link-text text">Tasks</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="menu__link">
            <NavLink to="/settings">
              <i className="bx bx-cog icon"></i>
              <span className="menu__link-text text">Settings</span>
            </NavLink>
          </li>
          <li className="menu__link">
            <a href="#" onClick={logoutHandler}>
              <i className="bx bx-exit icon"></i>
              <span className="menu__link-text text">Logout</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
