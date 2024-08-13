import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import './NavBar.css';

const NavBar = () => {
    return (
        <header className={"NavBar-background"}>
            <div className="NavBar-container">
                <div className={"NavBar-logo"}>
                    <Logo />
                </div>
                <nav className="NavBar-links-row">
                    <NavLink className="NavBar-link" to={''}>Dishes</NavLink>
                    <NavLink className="NavBar-link" to={'orders'}>Orders</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;