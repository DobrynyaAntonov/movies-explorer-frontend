import React from "react";
import './Register.css';
import img from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();
    function clickLogo() {
        navigate('/')
    }

    return (
        <section className="register">
        <div className="register__container">
            <img className="register__logo" src={img} alt="лого проекта" onClick={clickLogo} />
            <h2 className="register__text">Добро пожаловать!</h2>
            <form>
                <p className="register__name">Имя</p>
                <input className="register__input-name" type="text" required placeholder="Введите ваше имя" />
                <p className="register__email">E-mail</p>
                <input className="register__input-email" type="email" required placeholder="Введите ваш e-mail" />
                <p className="register__pass">Пароль</p>
                <input className="register__input-password" type="password" minLength="6" maxLength="20" required placeholder="Введите пароль от 6 до 20 символов" />
                <button className="register__submit" type="submit">Зарегистрироваться</button>
            </form>
            <div className="register__container-regist">
                <p className="register__text-regist">Уже зарегистрированы?</p>
                <Link to="/signin" className="register__button-regist">Войти</Link>
            </div>
        </div>
    </section>
    )
}

export default Register;