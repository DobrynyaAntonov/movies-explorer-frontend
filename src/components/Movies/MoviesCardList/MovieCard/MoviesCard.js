import React from "react";
import './MoviesCard.css';

function MoviesCard({ name, children, img }) {

    return (
        <>
            <div className="moviesCard">
                {children}
                <img className="moviesCard__img" src={img} alt={name}></img>
                <div className="moviesCard__about">
                    <p className="moviesCard__name">{name}</p>
                    <p className="moviesCard__time">1ч 17м</p>
                </div>
            </div>

        </>
    );
};

export default MoviesCard;