import React, { useState } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';


function Navigation({ loggedIn }) {


    return (
        <>
            {loggedIn ? (
                <div className="Navigation__true">
                    <Link to="/movies" className={`Navigation__hover Navigation__true Navigation__film ${window.location.pathname === '/movies' ? 'active' : ''}`}>Фильмы</Link>
                    <Link to="/saved-movies" className={`Navigation__hover Navigation__true Navigation__save-film ${window.location.pathname === '/saved-movies' ? 'active' : ''}`}>Сохраненные фильмы</Link>
                    <Link to="/profile" className={`Navigation__hover Navigation__me ${window.location.pathname === '/profile' ? 'active' : ''}`}>Аккаунт</Link>

                </div>
            ) : (
                <div className="Navigation__false">
                    <Link to="/signup" className="Navigation__hover Navigation__regist">Регистрация</Link>
                    <Link to="/signin" className="Navigation__hover Navigation__entrance"> Войти </Link>
                </div>
            )}

        </>
    )
}

function NavigationMobile({ loggedIn }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {loggedIn ? (
                <><button className="mobile__menu-button" onClick={toggleMenu}>
                </button><div className={`mobile__menu ${isOpen ? 'open' : ''}`}>
                        <button className="mobile__menu-close" onClick={closeMenu}>
                            <span className="mobile__menu-close-icon">&times;</span>
                        </button>
                        <div className="mobile__menu-container">
                            <Link to="/" className={`mobile__menu-link ${window.location.pathname === '/' ? 'active-mobile' : ''}`} onClick={closeMenu}>Главная</Link>
                            <Link to="/movies" className={`mobile__menu-link ${window.location.pathname === '/movies' ? 'active-mobile' : ''}`} onClick={closeMenu}>Фильмы</Link>
                            <Link to="/saved-movies" className={`mobile__menu-link ${window.location.pathname === '/saved-movies' ? 'active-mobile' : ''}`} onClick={closeMenu}>Сохраненные фильмы</Link>
                            <Link to="/profile" className={`mobile__menu-link ${window.location.pathname === '/profile' ? 'active-mobile' : ''}`} onClick={closeMenu}>Аккаунт</Link>

                        </div>
                    </div></>
            ) : (
                <div className="Navigation__false">
                    <Link to="/signup" className="Navigation__hover Navigation__regist">Регистрация</Link>
                    <Link to="/signin" className="Navigation__hover Navigation__entrance"> Войти </Link>
                </div>
            )}

        </>
    )
}

export { Navigation, NavigationMobile };