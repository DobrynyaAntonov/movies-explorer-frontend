import React from "react";
import './Profile.css';
import { useNavigate } from 'react-router-dom';


function Profile() {
    const navigate = useNavigate();

    const handleExit = () => {
      navigate('/');
    };

    return (
        <section className="profile">
            <h2 className="profile__name">Привет, Виталий!</h2>
            <form className="profile__form">
                <div className="profile__name-box" >
                    <input className="profile__input-name"
                        placeholder="Имя"
                    ></input>
                    <p className="profile__name-name">
                        Виталий
                    </p>
                </div>
                <div className="profile__email-box profile__name-box">
                    <input className="profile__input-email profile__input-name"
                        placeholder="E-mail"
                    ></input>
                    <p className="profile__email profile__name-name">
                        pochta@yandex.ru
                    </p>
                </div>
                <button className="profile__submit" type="submit">Редактировать</button>
            </form>
            <button className="profile__exit" onClick={handleExit}>Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;