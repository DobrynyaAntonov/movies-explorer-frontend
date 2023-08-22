import React from "react";
import './Profile.css';


function Profile() {


    return (
        <div className="Profile__container">
            <h2 className="Profile__name">Привет, Виталий!</h2>
            <form className="Profile__form">
                <div className="Profile__name-box" >
                    <input className="Profile__input-name"
                        placeholder="Имя"
                    ></input>
                    <p className="Profile__name-name">
                        Виталий
                    </p>
                </div>
                <div className="Profile__email-box Profile__name-box">
                    <input className="Profile__input-email Profile__input-name"
                        placeholder="E-mail"
                    ></input>
                    <p className="Profile__email Profile__name-name">
                        pochta@yandex.ru
                    </p>
                </div>
                <button className="Profile__submit" type="submit">Редактировать</button>
            </form>
            <button className="Profile__exit">Выйти из аккаунта</button>
        </div>
    )
}

export default Profile;