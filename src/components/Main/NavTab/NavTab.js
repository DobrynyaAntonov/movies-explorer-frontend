import React from "react";
import './NavTab.css';

function NavTab() {



    return (
          <div className="navigate__container">
            <a className="navigate__link" href="#project">О проекте</a>
            <a className="navigate__link" href="#tech">Технологии</a>
            <a className="navigate__link" href="#student">Студент</a>
          </div>
    )
}

export default NavTab;