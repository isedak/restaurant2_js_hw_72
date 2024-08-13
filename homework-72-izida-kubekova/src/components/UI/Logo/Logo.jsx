import React from "react";
import './Logo.css';
import Logotype from '../../../assets/img/logo-white.svg';
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to={'/'} className={"Logo"}>
            <img className="w-100" src={Logotype} alt="MyBlog" />
        </Link>
    );
};

export default Logo;