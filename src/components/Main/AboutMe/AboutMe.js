import React from "react";
import './AboutMe.css';
import image from '../../../images/pic__COLOR_pic.png'
import icon from '../../../images/text__COLOR_font-main.svg'

function AboutMe() {



    return (
        <div id="student" className="AboutMe__content">
            <h2 className="AboutMe__title">
                Студент
            </h2>
            <div className="AboutMe__container">
                <div className="AboutMe__history">
                    <h3 className="AboutMe__name">Виталий</h3>
                    <p className="AboutMe__prof">Фронтенд-разработчик, 30 лет</p>
                    <p className="AboutMe__life">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className="AboutMe__git" href="https://github.com/DobrynyaAntonov" target="_blank" rel="noreferrer" >Github</a>
                </div>
                <img className="AboutMe__image"
                    src={image}
                    alt="Моя фотогафия"></img>
            </div>
            <h3 className="AboutMe__portfolio">Портфолио</h3>
            <div className="AboutMe__site">
                <a className="AboutMe__link" href="https://mesto.dobrynya.nomoredomains.work/signin" target="_blank" rel="noreferrer">Статичный сайт <img src={icon} alt="переход на сайт"></img></a>
                <a className="AboutMe__link" href="https://mesto.dobrynya.nomoredomains.work/signin" target="_blank" rel="noreferrer">Адаптивный сайт <img src={icon} alt="переход на сайт"></img></a>
                <a className="AboutMe__link" href="https://mesto.dobrynya.nomoredomains.work/signin" target="_blank" rel="noreferrer">Одностраничное приложение <img src={icon} alt="переход на сайт"></img></a>
            </div>
        </div>
    )
}

export default AboutMe;