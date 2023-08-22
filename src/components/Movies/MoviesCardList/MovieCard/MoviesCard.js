import React from "react";
import './MoviesCard.css';

function MoviesCard({ name, children, img }) {

    return (
        <>
            <div className="MoviesCard__container">
                {children}
                <img className="MoviesCard__img" src={img} alt={name}></img>
                <div className="MoviesCard__about">
                    <p className="MoviesCard__name">{name}</p>
                    <p className="MoviesCard__time">1ч 17м</p>
                </div>
            </div>

        </>
    );
};

export default MoviesCard;