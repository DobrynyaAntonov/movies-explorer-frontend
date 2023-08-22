import React from "react";
import './Login.css';
import img from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    function clickLogo() {
        navigate('/')
    }

    return (
        <div className="Login">
            <div className="Login__container">
                <img className="Login__logo" src={img} alt="лого проекта" onClick={clickLogo}>
                </img>
                <h2 className="Login__text">Рады видеть!</h2>
                <form>
                    <p className="Login__email">E-mail</p>
                    <input className="Login__input-email"></input>
                    <p className="Login__pass">Пароль</p>
                    <input className="Login__input-password" type="password"></input>
                    <button className="Login__submit" type="submit">Войти</button>
                </form>
                <div className="Login__container-regist">
                    <p className="Login__text-regist">Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="Login__button-regist">Регистрация</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;