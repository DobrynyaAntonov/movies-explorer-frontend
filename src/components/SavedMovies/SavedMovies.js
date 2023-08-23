import React, { useState } from "react";
import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm'
import FilterCheckbox from '../Movies/FilterCheckbox/FilterCheckbox'
import "../Movies/MoviesCardList/MoviesCardList.css";
import MovieCard from "../Movies/MoviesCardList/MovieCard/MoviesCard";
import imge1 from '../../images/pic__COLOR_pic1.png'
import imge2 from '../../images/pic__COLOR_pic2.png'
import imge3 from '../../images/pic__COLOR_pic3.png'

const savedMoviesData = [
  {
    name: "33 слова о дизайне",
    img: imge1,
  },
  {
    name: "Киноальманах «100 лет дизайна»",
    img: imge2,
  },
  {
    name: "В погоне за Бенкси",
    img: imge3,
  },
];

function SavedMovies() {
  const [shortFilmsOnly, setShortFilmsOnly] = useState(false);

  const handleCheckboxChange = () => {
    setShortFilmsOnly(!shortFilmsOnly);
    // будущая логика для фильтрации фильмов
  };

  const savedMoviesCards = savedMoviesData.map((movie, index) => (
    <MovieCard
      key={index}
      name={movie.name}
      img={movie.img}
    >
      <button className="MoviesCard__button-delete"></button>
    </MovieCard>
  ));

  return (
    <section className="savedMovies">
      <SearchForm />
      <FilterCheckbox
        isChecked={shortFilmsOnly}
        onChange={handleCheckboxChange} />
      <div className="MoviesCardList">
        {savedMoviesCards}
      </div>
    </section>
  )
}

export default SavedMovies;
