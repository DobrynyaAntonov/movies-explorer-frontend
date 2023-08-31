import React from "react";
import { useMediaQuery } from 'react-responsive';
import './MoviesCardList.css';
import MovieCard from './MovieCard/MoviesCard'
import imge1 from '../../../images/pic__COLOR_pic1.png'
import imge2 from '../../../images/pic__COLOR_pic2.png'
import imge3 from '../../../images/pic__COLOR_pic3.png'
import imge4 from '../../../images/pic__COLOR_pic4.png'
import imge5 from '../../../images/pic__COLOR_pic5.png'
import imge6 from '../../../images/6.png'
import imge7 from '../../../images/pic__COLOR_pic7.png'
import imge8 from '../../../images/pic__COLOR_pic8.png'
import imge9 from '../../../images/pic__COLOR_pic9.png'
import imge10 from '../../../images/pic__COLOR_pic10.png'
import imge11 from '../../../images/pic__COLOR_pic11.png'
import imge12 from '../../../images/pic__COLOR_pic12.png'

const cardData = [
  {
    name: "33 слова о дизайне",
    img: imge1,
  },
  {
    name: "Киноальманах «100 лет дизайна»",
    img: imge2,
    owner: 1,
  },
  {
    name: "В погоне за Бенкси",
    img: imge3,
  },
  {
    name: "Баския: Взрыв реальности",
    img: imge4,
  },
  {
    name: "Бег это свобода",
    img: imge5,
  },
  {
    name: "Книготорговцы",
    img: imge6,
    owner: 1,
  },
  {
    name: "Когда я думаю о Германии ночью",
    img: imge7,
  },
  {
    name: "Gimme Danger: История Игги и The Stooges",
    img: imge8,
  },
  {
    name: "Дженис: Маленькая девочка грустит",
    img: imge9,
  },
  {
    name: "Соберись перед прыжком",
    img: imge10,
  },
  {
    name: "По волнам: Искусство звука в кино",
    img: imge11,
  },
  {
    name: "Пи Джей Харви: A dog called money",
    img: imge12,
  },
];

function MoviesCardList({ movies }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const visibleCardCount = isMobile ? (window.innerWidth <= 320 ? 5 : 8) : 12;

  const visibleCards = cardData.slice(0, visibleCardCount).map((card, index) => (
    <li key={index} className="moviesCardList__item">
      <MovieCard
        name={card.name}
        img={card.img}
      >
        {card.owner ? (
          <button className="moviesCard__button-saved"></button>
        ) : (
          <button className="moviesCard__button-save">Сохранить</button>
        )}
      </MovieCard>
    </li>
  ));

  return (
    <>
      <ul className="moviesCardList">
        {visibleCards}
      </ul>
      <button className="more">Ещё</button>
    </>
  );
};

export default MoviesCardList;