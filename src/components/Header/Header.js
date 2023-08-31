import React from "react";
import './Header.css';
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Navigation, NavigationMobile } from "../Navigation/Navigation";


function Header({ loggedIn }) {
    const navigate = useNavigate();
    function clickLogo() {
        navigate('/')
    }

    const isMobile = useMediaQuery({ maxWidth: 768 });


    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="лого проекта movies"
                onClick={clickLogo}
            />
            {isMobile ? <NavigationMobile loggedIn={loggedIn} /> : <Navigation loggedIn={loggedIn} />}


        </header>
    )
}

export default Header;