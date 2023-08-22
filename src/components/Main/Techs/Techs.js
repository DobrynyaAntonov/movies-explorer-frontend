import React from "react";
import './Techs.css';

function Techs() {



    return (
        <div id="tech" className="Techs__content">
            <h2 className="Techs__title">
               Технологии
            </h2>
            <h3 className="Techs__technologes">7 технологий</h3>
            <p className="Techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className="Techs__technologes-container">
                <p className="Techs__tech">HTML</p>
                <p className="Techs__tech">CSS</p>
                <p className="Techs__tech">JS</p>
                <p className="Techs__tech">React</p>
                <p className="Techs__tech">Git</p>
                <p className="Techs__tech">Express.js</p>
                <p className="Techs__tech">mongoDB</p>
            </div>
          
        </div>
    )
}

export default Techs;