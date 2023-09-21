import React from "react";
import './AboutMe.css';
import image from '../../../images/photo1694263423.jpeg'
import icon from '../../../images/text__COLOR_font-main.svg'

function AboutMe() {



    return (
        <section id="student" className="aboutMe">
            <h2 className="aboutMe__title">
                Студент
            </h2>
            <div className="aboutMe__container">
                <div className="aboutMe__history">
                    <h3 className="aboutMe__name">Добрыня</h3>
                    <p className="aboutMe__prof">Фронтенд-разработчик, 22 года</p>
                    <p className="aboutMe__life">Я родился в Краснодаре. В 15 лет переехал в Москву учиться музыкальной профессии. В данный момент играю в двух группах - это мое основное хобби.
                      Увлекаюсь легкой атлетикой и люблю слушать и писать музыку. Год назад начал кодить, меня это настолько увлекло, что я не заметил как пролетела учеба в Яндекс Практикуме. В настоящее время активно занимаюсь програмированием и выполняю фриланс заказы с другом.</p>
                    <a className="aboutMe__git" href="https://github.com/DobrynyaAntonov" target="_blank" rel="noreferrer" >Github</a>
                </div>
                <img className="aboutMe__image"
                    src={image}
                    alt="Моя фотогафия"></img>
            </div>
            <h3 className="aboutMe__portfolio">Портфолио</h3>
            <ul className="aboutMe__site">
                <li className="aboutMe__link">
                    <a className="aboutMe__anchor" href="https://dobrynyaantonov.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a>
                    <img className="aboutMe__icon" src={icon} alt="переход на сайт" />
                </li>
                <li className="aboutMe__link">
                    <a className="aboutMe__anchor" href="https://dobrynyaantonov.github.io/russian-travel/#" target="_blank" rel="noreferrer">Адаптивный сайт</a>
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