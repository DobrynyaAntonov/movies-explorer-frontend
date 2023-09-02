import React, { useState } from "react";
import './Register.css';
import img from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import * as MainApi from "../../utils/MainApi";
import { useFormWithValidation } from "../Validation/ValidationForm";

function Register({ onLogin }) {
    const navigate = useNavigate();
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [resErr, setResErr] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValid && !isSubmitting) {
            setIsSubmitting(true);

            try {
                const { email, password, name } = values;
                await MainApi.register({ name, email, password });
                await MainApi.login({ email, password });
                onLogin();
                navigate('/movies');
            } catch (error) {
                if (error.message.includes('409')) {
                    setResErr('Пользователь с таким email уже существует.');
                } else {
                    setResErr('При регистрации пользователя произошла ошибка.');
                }
                console.error('Ошибка регистрации/авторизации:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const clickLogo = () => {
        navigate('/')
    }

    return (
        <section className="register">
            <div className="register__container">
                <img className="register__logo" src={img} alt="лого проекта" onClick={clickLogo} />
                <h2 className="register__text">Добро пожаловать!</h2>
                <form onSubmit={handleSubmit}>
                    <p className="register__name">Имя</p>
                    <input
                        className="register__input-name"
                        type="text"
                        name="name"
                        value={values.name || ''}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваше имя"
                        disabled={isSubmitting}
                    />
                    <p className="error-message">{errors.name}</p>
                    <p className="register__email">E-mail</p>
                    <input
                        className="register__input-email"
                        type="email"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваш e-mail"
                        disabled={isSubmitting}
                    />
                    <p className="error-message">{errors.email}</p>
                    <p className="register__pass">Пароль</p>
                    <input
                        className="register__input-password"
                        type="password"
                        name="password"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="6"
                        maxLength="20"
                        required
                        placeholder="Введите пароль от 6 до 20 символов"
                        disabled={isSubmitting}
                    />
                    <p className="error-message">{errors.password}</p>
                    <p className="error-message">{resErr}</p>
                    <button className={`register__submit ${!isValid || isSubmitting ? 'disabled' : ''}`} type="submit" disabled={!isValid || isSubmitting}>
                        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
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
