import React, { useContext, useState } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import * as MainApi from "../../utils/MainApi";
import { useFormWithValidation } from "../Validation/ValidationForm"; // Импорт useFormWithValidation

function Profile({ onExit, update }) {
    const navigate = useNavigate();
    const [resErr, setResErr] = useState('');
    const currentUser = useContext(CurrentUserContext);
    const [resSuc, setResSuc] = useState('');
    const [buttonSave, setButtonSave] = useState(false);

    const { values, errors, isValid, handleChange, setIsValid } = useFormWithValidation(); // Используйте useFormWithValidation

    const openSave = () => {
        setButtonSave(true);
        setIsValid(false)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            const { email, name } = values;

            if (email === currentUser.email && name === currentUser.name) {
                setResErr('Вы не внесли никаких изменений');
                setButtonSave(false);
                setResSuc('')
                return;
            }
            MainApi.setUser({ email, name })
                .then(() => {
                    console.log('успешное обовление данных');
                    setResSuc('Данные профиля успешно обновлены')
                    update();
                    setIsValid(false);
                    setButtonSave(false);
                    setResErr('')
                })
                .catch((error) => {
                    if (error.message.includes('409')) {
                        setResErr('Пользователь с таким email уже существует.');
                    } else {
                        setResErr('При обновлении профиля произошла ошибка.')
                    }
                    console.log('Ошибка авторизации:', error);
                })
        }
    }

    const handleExit = () => {
        MainApi.deleteCookie();
        localStorage.clear();
        onExit();
        navigate('/');
    };

    return (
        <section className="profile">
            <h2 className="profile__name">Привет, {currentUser.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__name-box">
                    <p className="profile__name-name">Имя</p>
                    <input
                        className="profile__input-name"
                        type="text"
                        name="name"
                        value={values.name || ''}
                        onChange={handleChange}
                        required
                        placeholder={currentUser.name}
                        disabled={!buttonSave}
                    />
                    <p className="error-message">{errors.name}</p>
                </div>
                <div className="profile__email-box profile__name-box">
                    <p className="profile__email profile__name-name">E-mail</p>
                    <input
                        className="profile__input-email"
                        type="email"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                        placeholder={currentUser.email}
                        disabled={!buttonSave}
                    />
                    <p className="error-message">{errors.email}</p>
                </div>
                <p className="error-message">{resErr}</p>
                <p className="sucsess-message">{resSuc}</p>
                {buttonSave ? (
                    <button className={`profile__submit ${!isValid ? 'disabled' : ''}`} type="submit" disabled={!isValid}>Сохранить</button>
                ) : (
                    <>
                        <button className="profile__submit-open" onClick={openSave} >Редактировать</button>
                        <button className="profile__exit" onClick={handleExit}>Выйти из аккаунта</button>
                    </>
                )}
            </form>

        </section>
    )
}

export default Profile;
