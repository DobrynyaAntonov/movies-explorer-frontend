import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import SearchFormSave from './SearchFormSave/SearchFormSave'
import FilterCheckbox from '../Movies/FilterCheckbox/FilterCheckbox'
import "../Movies/MoviesCardList/MoviesCardList.css";
import MovieCard from "../Movies/MoviesCardList/MovieCard/MoviesCard";
import * as MainApi from "../../utils/MainApi";

function SavedMovies() {
  const savedShortFilmsOnly = JSON.parse(localStorage.getItem('savedShortFilmsOnly'));
  const [shortFilmsOnly, setShortFilmsOnly] = useState(savedShortFilmsOnly || false);
  const [saveMovies, setSaveMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckboxChange = () => {
    setShortFilmsOnly(!shortFilmsOnly);
  };

  useEffect(() => {
    const filtered = shortFilmsOnly
      ? saveMovies.filter(movie => movie.duration <= 40)
      : saveMovies;
      
    setFilteredMovies(filtered);
    localStorage.setItem('savedShortFilmsOnly', JSON.stringify(shortFilmsOnly));
  }, [shortFilmsOnly, saveMovies]);

  const getMovies = () => {
    MainApi.getMovies()
      .then((data) => {
        if (data.length === 0) {
          setErrorMessage('Сохраненных фильмов пока нет');
        }
        setSaveMovies(data);
      })
      .catch((error) => {
        console.log('Ошибка запроса фильмов:', error);
        setErrorMessage('Произошла ошибка при загрузке фильмов');
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (inputDate) => {
    if (!inputDate) {
      setFilteredMovies(saveMovies);
      return;
    }
    const lowerCaseInput = inputDate.toLowerCase();

    const searchResults = saveMovies.filter(movie => {
      const lowerCaseNameRU = movie.nameRU ? movie.nameRU.toLowerCase() : "";
      const lowerCaseNameEn = movie.nameEn ? movie.nameEn.toLowerCase() : "";

      return lowerCaseNameRU.includes(lowerCaseInput) || lowerCaseNameEn.includes(lowerCaseInput);
    });

    if (searchResults.length === 0) {
      setErrorMessage('Ничего не найдено');
    } else {
      setFilteredMovies(searchResults);
    }
  }

  const deleteMove = (id) => {
    MainApi.deleteMovie(id)
    .then(()=>{
      console.log('карточка успешно удалена');
      getMovies();
    })
    .catch((error) => {
      console.log('при удалении фильма произошла ошибка:', error);
    });
  }

  const savedMoviesCards = filteredMovies.map((card, index) => (
    <li key={index} className="moviesCardList__item">

      <MovieCard
        name={card.nameRU}
        img={card.image}
        time={card.duration}
      >
        <button className="moviesCard__button-delete" onClick={()=>{deleteMove(card._id)}}></button>
      </MovieCard>
    </li>
  ));


  return (
    <section className="savedMovies">
      <SearchFormSave handleSearch={handleSearch} />
      <FilterCheckbox
        isChecked={shortFilmsOnly}
        onChange={handleCheckboxChange} />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="moviesCardList">
        {savedMoviesCards}
      </div>
    </section>
  )
}

export default SavedMovies;
