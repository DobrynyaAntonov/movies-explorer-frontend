import React from "react";
import './NavTab.css';

function NavTab() {



  return (
    <ul className="navigate">
      <li className="navigate__link"><a className="navigate__anchor-link" href="#project">О проекте</a></li>
      <li className="navigate__link"><a className="navigate__anchor-link" href="#tech">Технологии</a></li>
      <li className="navigate__link"><a className="navigate__anchor-link" href="#student">Студент</a></li>
    </ul>
  )
}

export default NavTab;