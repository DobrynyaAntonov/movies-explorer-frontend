import React from "react";
import './AboutProject.css';

function AboutProject() {



    return (
        <section id="project" className="aboutProject">
            <h2 className="aboutProject__title">
                О проекте
            </h2>
            <div className="aboutProject__text-container">
                <div className="aboutProject__text-column">
                    <h3 className="aboutProject__text-title">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutProject__text-column">
                    <h3 className="aboutProject__text-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="aboutProject__time-container">
                <p className="aboutProject__1week">1 неделя </p>
                <p className="aboutProject__4week">4 недели</p>
                <p className="aboutProject__stack">Back-end</p>
                <p className="aboutProject__stack">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;