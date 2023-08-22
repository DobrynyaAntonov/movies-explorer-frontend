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
        <div className="Register">
            <div className="Register__container">
                <img className="Register__logo"src={img} alt="лого проекта"
                onClick={clickLogo}>
                </img>
                <h2 className="Register__text">Добро пожаловать!</h2>
                <form>
                    <p className="Register__name">Имя</p>
                    <input className="Register__input-name"></input>
                    <p className="Register__email">E-mail</p>
                    <input className="Register__input-email"></input>
                    <p className="Register__pass">Пароль</p>
                    <input className="Register__input-password" type="password"></input>
                    <button className="Register__submit" type="submit">Зарегистрироваться</button>
                </form>
                <div className="Register__container-regist">
                    <p className="Register__text-regist">Уже зарегистрированы?</p>
                    <Link to="/signin" className="Register__button-regist">Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;