import React from "react";
import './AboutProject.css';

function AboutProject() {



    return (
        <div id="project" className="AboutProject__content">
            <h2 className="AboutProject__title">
                О проекте
            </h2>
            <div className="AboutProject__text-container">
                <div className="AboutProject__text-column">
                    <h3 className="AboutProject__text-title">Дипломный проект включал 5 этапов</h3>
                    <p className="AboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="AboutProject__text-column">
                    <h3 className="AboutProject__text-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="AboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="AboutProject__time-container">
                <p className="AboutProject__1week">1 неделя </p>
                <p className="AboutProject__4week">4 недели</p>
                <p className="AboutProject__stack">Back-end</p>
                <p className="AboutProject__stack">Front-end</p>
            </div>
        </div>
    )
}

export default AboutProject;