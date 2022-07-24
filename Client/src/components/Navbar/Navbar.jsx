import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as HomeImage } from "../../images/home.svg";
import { ReactComponent as ProfileImage } from "../../images/profile.svg";
import { ReactComponent as BoardImage } from "../../images/board.svg";
import { ReactComponent as LogoutImage } from "../../images/logout.svg";

import "./Navbar.scss";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav__list-wrapper">
        <h2 className="nav__list-title">Account</h2>
        <ul className="nav__list">
          <li className="nav__list-item">
            <NavLink className="nav__list-link" to="/">
              <HomeImage className="nav__list-img" />
              <span className="nav__list-text">Home</span>
            </NavLink>
          </li>
          <li className="nav__list-item">
            <NavLink className="nav__list-link" to="/profile">
              <ProfileImage className="nav__list-img" />
              <span className="nav__list-text">Profile</span>
            </NavLink>
          </li>
          <li className="nav__list-item">
            <NavLink className="nav__list-link" to="/boards">
              <BoardImage className="nav__list-img" />
              <span className="nav__list-text">Boards</span>
            </NavLink>
          </li>
          <li className="nav__list-item">
            <a href="/" className="nav__list-link" onClick={logoutHandler}>
              <LogoutImage className="nav__list-img" />
              <span className="nav__list-text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
