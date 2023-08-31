import React from "react";
import './AboutMe.css';
import image from '../../../images/pic__COLOR_pic.png'
import icon from '../../../images/text__COLOR_font-main.svg'

function AboutMe() {



    return (
        <section id="student" className="aboutMe">
            <h2 className="aboutMe__title">
                Студент
            </h2>
            <div className="aboutMe__container">
                <div className="aboutMe__history">
                    <h3 className="aboutMe__name">Виталий</h3>
                    <p className="aboutMe__prof">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutMe__life">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className="aboutMe__git" href="https://github.com/DobrynyaAntonov" target="_blank" rel="noreferrer" >Github</a>
                </div>
                <img className="aboutMe__image"
                    src={image}
                    alt="Моя фотогафия"></img>
            </div>
            <h3 className="aboutMe__portfolio">Портфолио</h3>
            <ul className="aboutMe__site">
                <li className="aboutMe__link">
                    <a className="aboutMe__anchor" href="https://mesto.dobrynya.nomoredomains.work/signin" target="_blank" rel="noreferrer">Статичный сайт</a>
                    <img className="aboutMe__icon" src={icon} alt="переход на сайт" />
                </li>
                <li className="aboutMe__link">
                    <a className="aboutMe__anchor" href="https://mesto.dobrynya.nomoredomains.work/signin" target="_blank" rel="noreferrer">Адаптивный сайт</a>
                    <img className="aboutMe__icon" src={icon} alt="переход на сайт" />
                </li>
                <li className="aboutMe__link">
                    <a className="aboutMe__anchor" href="https://mesto.dobrynya.nomoredomains.work/signin" target="_blank" rel="noreferrer">Одностраничное приложение</a>
                    <img className="aboutMe__icon" src={icon} alt="переход на сайт" />
                </li>
            </ul>

        </section>
    )
}

export default AboutMe;