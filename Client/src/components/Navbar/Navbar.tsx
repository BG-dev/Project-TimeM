import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ConfirmForm from '../ConfirmForm';
import Modal from '../Modal';
import { useAppSelector } from '../../redux/hooks';
import IUser from '../../types/user';
import './Navbar.scss';

function Navbar() {
    const navigate = useNavigate();
    const user: IUser | null = useAppSelector((state) => state.user.value);
    const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(true);
    const [isLogoutModalActive, setIsLogoutModalActive] = useState<boolean>(false);

    const logoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        user && (
            <nav className={`nav ${isOpenNavbar ? '' : 'close'}`}>
                <Modal active={isLogoutModalActive} setActive={setIsLogoutModalActive}>
                    <ConfirmForm
                        text="Do you want to logout?"
                        confirmHandler={logoutHandler}
                        setActive={setIsLogoutModalActive}
                    />
                </Modal>
                <i
                    className="bx bx-chevron-left toggle"
                    onClick={() => {
                        setIsOpenNavbar(!isOpenNavbar);
                    }}
                />
                <div className="nav__logo">
                    <h2 className="nav__logo-header">TimeM</h2>
                </div>
                <div className="user">
                    <div className="image user__avatar">
                        <div className="user__image image" />
                    </div>
                    <span className="user__username text">{user.username}</span>
                </div>
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu__links">
                            <li className="menu__link">
                                <button onClick={() => setIsLogoutModalActive(true)} type="button">
                                    <i className="bx bxs-bell icon" />
                                    <span className="menu__link-text text">Notifications</span>
                                </button>
                            </li>
                            <li className="menu__link">
                                <NavLink to={`/user/${user.id}`}>
                                    <i className="bx bxs-user-circle icon" />
                                    <span className="menu__link-text text">Profile</span>
                                </NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink to="/boards">
                                    <i className="bx bx-table icon" />
                                    <span className="menu__link-text text">Boards</span>
                                </NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink to="/contacts">
                                    <i className="bx bxs-user-rectangle icon" />
                                    <span className="menu__link-text text">Contacts</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-content">
                        <li className="menu__link">
                            <NavLink to="/settings">
                                <i className="bx bx-cog icon" />
                                <span className="menu__link-text text">Settings</span>
                            </NavLink>
                        </li>
                        <li className="menu__link">
                            <button onClick={() => setIsLogoutModalActive(true)} type="button">
                                <i className="bx bx-exit icon" />
                                <span className="menu__link-text text">Logout</span>
                            </button>
                        </li>
                    </div>
                </div>
            </nav>
        )
    );
}

export default Navbar;
