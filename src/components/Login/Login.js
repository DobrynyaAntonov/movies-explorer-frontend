import React, { useState } from "react";
import './Login.css';
import img from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from "../Validation/ValidationForm";
import * as MainApi from "../../utils/MainApi";

function Login({ onLogin, name }) {
    const navigate = useNavigate();

    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [resErr, setResErr] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid && !isSubmitting) {
            setIsSubmitting(true);

            const { email, password } = values;
            MainApi.login({ email, password })
                .then(() => {
                    console.log('Успешный вход');
                    setResErr('');
                    onLogin();
                    navigate('/movies')
                })
                .catch((error) => {
                    if (error.includes('400')) {
                        setResErr('Вы ввели неправильный логин или пароль.');
                    } else if (error.name === 'JsonWebTokenError') {
                        setResErr('При авторизации произошла ошибка. Переданный токен некорректен.');
                    } else {
                        setResErr('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
                    }
                    setIsSubmitting(false);
                    console.log('Ошибка авторизации:', error);
                });
        }
    }

    const clickLogo = () => {
        navigate('/')
    }

    return (
        <section className="login">
            <div className="login__container">
                <img className="login__logo" src={img} alt="лого проекта" onClick={clickLogo} />
                <h2 className="login__text">Рады видеть!</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <p className="login__email-form">E-mail</p>
                    <input
                        className="login__input-email"
                        type="email"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваш e-mail"
                        disabled={isSubmitting}
                    />
                    <p className="error-message">{errors.email}</p>
                    <p className="login__password-form">Пароль</p>
                    <input
                        className="login__input-password"
                        type="password"
                        name="password"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="8"
                        maxLength="20"
                        required
                        placeholder="Введите пароль от 8 до 20 символов"
                        disabled={isSubmitting}
                    />
                    <p className="error-message">{errors.password}</p>
                    <p className="error-message">{resErr}</p>
                    <button className={`login__submit-form ${!isValid || isSubmitting ? 'disabled' : ''}`} type="submit" disabled={!isValid || isSubmitting}>
                        {isSubmitting ? 'Вход...' : 'Войти'}
                    </button>
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
