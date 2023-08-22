import React from "react";
import './Footer.css';

function Footer() {



    return (
      <div className="Footer__content">
        <p className="Footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="Footer__container">
            <p className="Footer__unicod">&#169; 2020</p>
            <div className="Footer__container-link">
                <a className="Footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                <a className="Footer__link" href="https://github.com/">Github</a>
            </div>
        </div>

      </div>
    )
}

export default Footer;