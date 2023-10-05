import React from "react";
import './NavTab.css';

function NavTab() {
  const handleClick = (id) => {
    window.location.hash = id;
  };

  return (
    <ul className="navigate">
      <li className="navigate__link" onClick={() => handleClick('project')}>
        <a className="navigate__anchor-link" href="#project">О проекте</a>
      </li>
      <li className="navigate__link" onClick={() => handleClick('tech')}>
        <a className="navigate__anchor-link" href="#tech">Технологии</a>
      </li>
      <li className="navigate__link" onClick={() => handleClick('student')}>
        <a className="navigate__anchor-link" href="#student">Студент</a>
      </li>
    </ul>
  );
}

export default NavTab;
