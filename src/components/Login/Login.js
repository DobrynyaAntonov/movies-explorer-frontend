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
        <section className="login">
    <div className="login__container">
        <img className="login__logo" src={img} alt="лого проекта" onClick={clickLogo} />
        <h2 className="login__text">Рады видеть!</h2>
        <form className="login__form">
            <p className="login__email-form">E-mail</p>
            <input className="login__input-email" type="email" required placeholder="Введите ваш e-mail" />
            <p className="login__password-form">Пароль</p>
            <input className="login__input-password" type="password" minLength="6" maxLength="20" required placeholder="Введите пароль от 6 до 20 символов" />
            <button className="login__submit-form" type="submit">Войти</button>
        </form>
        <div className="login__regist">
            <p className="login__text-regist">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__button-regist">Регистрация</Link>
        </div>
    </div>
</section>


    )
}

export default Login;