import React from "react";
import './MoviesCard.css';

function MoviesCard({ name, children, img, time }) {

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    // Форматирование времени в формат HH:MM
    const formattedTime = `${hours}ч ${minutes}м`;

    return (
        <>
            <section className="moviesCard">
                {children}
                <img className="moviesCard__img" src={img} alt={name}></img>
                <div className="moviesCard__about">
                    <p className="moviesCard__name">{name}</p>
                    <p className="moviesCard__time">{formattedTime}</p>
                </div>
            </section>

        </>
    );
};

export default MoviesCard;