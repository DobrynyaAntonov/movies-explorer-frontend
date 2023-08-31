import React from "react";
import './Register.css';
import img from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as MainApi from "../../utils/MainApi";
import { useFormWithValidation } from "../Validation/ValidationForm";

function Register({ onLogin }) {
    const navigate = useNavigate();

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const [resErr, setResErr] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            const { email, password, name } = values;
            MainApi.register({ name, email, password })
                .then(() => {
                    console.log('Успешная регистрация');
                    setResErr('');
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
                            console.log('Ошибка авторизации:', error);
                        });
                })
                .catch((error) => {
                    if (error.includes('409')) {
                        setResErr('Пользователь с таким email уже существует.');
                    } else {
                        setResErr('При регистрации пользователя произошла ошибка.');
                    }
                    console.log('Ошибка регистрации:', error);
                });
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
                    />
                    <p className="error-message">{errors.password}</p>
                    <p className="error-message">{resErr}</p>
                    <button className={`register__submit ${!isValid ? 'disabled' : ''}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>
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
