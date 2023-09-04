import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import * as MainApi from "../../utils/MainApi";
import { useFormWithValidation } from "../Validation/ValidationForm";

function Profile({ onExit, update }) {
    const navigate = useNavigate();
    const [resErr, setResErr] = useState('');
    const currentUser = useContext(CurrentUserContext);
    const [resSuc, setResSuc] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { values, errors, isValid, handleChange, setIsValid, resetForm } = useFormWithValidation();

    useEffect(() => {
        resetForm({
            name: currentUser.name,
            email: currentUser.email,
        });
        setIsValid(true);
        setIsEditing(false);
    }, [currentUser, resetForm, setIsValid]);

    const openSave = () => {
        setIsEditing(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid && !isSubmitting) {
            setIsSubmitting(true);

            const { email, name } = values;

            if (email === currentUser.email && name === currentUser.name) {
                setResErr('Вы не внесли никаких изменений');
                setIsSubmitting(false);
                return;
            }

            MainApi.setUser({ email, name })
                .then(() => {
                    console.log('успешное обновление данных');
                    setResSuc('Данные профиля успешно обновлены');
                    update();
                    setIsEditing(false);
                    setIsSubmitting(false);
                    setResErr('');
                })
                .catch((error) => {
                    if (error.includes('409')) {
                        setResErr('Пользователь с таким email уже существует.');
                    } else {
                        setResErr('При обновлении профиля произошла ошибка.');
                    }
                    setIsSubmitting(false);
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

    const isFormEdited = () => {
        return values.name !== currentUser.name || values.email !== currentUser.email;
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
                        placeholder={"имя"}
                        disabled={!isEditing || isSubmitting}
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
                        placeholder={"email"}
                        disabled={!isEditing || isSubmitting} 
                    />
                    <p className="error-message">{errors.email}</p>
                </div>
                <p className="error-message">{resErr}</p>
                <p className="sucsess-message">{resSuc}</p>
                {isEditing ? (
                    <>
                        <button className={`profile__submit ${!isValid || !isFormEdited() || isSubmitting ? 'disabled' : ''}`} type="submit" disabled={!isValid || !isFormEdited() || isSubmitting}>
                            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </>
                ) : (
                    <>
                        <button className="profile__submit-open" onClick={openSave}>Редактировать</button>
                        <button className="profile__exit" onClick={handleExit}>Выйти из аккаунта</button>
                    </>
                )}
            </form>
        </section>
    )
}

export default Profile;
