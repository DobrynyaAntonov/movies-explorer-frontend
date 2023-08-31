import React from "react";
import './Footer.css';

function Footer() {



  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&#169; 2020</p>
        <ul className="footer__links-container">
          <li className="footer__link"><a className="footer__anchor-link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__link"><a className="footer__anchor-link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a></li>
        </ul>
      </div>

    </footer>
  )
}

export default Footer;