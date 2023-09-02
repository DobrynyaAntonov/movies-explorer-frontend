import React, { useState, useEffect } from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as MovieApi from "../../utils/MoviesApi";
import Preloader from "./Preloader/Preloader"

function Movies() {
  const [movies, setMovies] = useState([]);
  const [shortFilmsOnly, setShortFilmsOnly] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [preloader, setPreloader] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Загрузка состояния чекбокса из localStorage при монтировании компонента
  useEffect(() => {
    const savedShortFilmsOnly = JSON.parse(localStorage.getItem('shortFilmsOnly'));
    if (savedShortFilmsOnly !== null) {
      setShortFilmsOnly(savedShortFilmsOnly);
    }
  }, []);

  // Обработчик изменения чекбокса
  const handleCheckboxChange = () => {
    setShortFilmsOnly(!shortFilmsOnly);
    localStorage.setItem('shortFilmsOnly', JSON.stringify(!shortFilmsOnly));
  };

  const handleSearch = (inputQuery) => {
    if (!inputQuery) {
      setErrorMessage('Поле поиска пустое');
      setMovies([]);
      return;
    }

    setPreloader(true);
    setSearchQuery(inputQuery);
    setSearching(true);
    setErrorMessage('');

    MovieApi.getMovie()
      .then((data) => {
        const lowerCaseInput = inputQuery.toLowerCase();
        const searchResults = data.filter(movie => {
          const lowerCaseNameRU = movie.nameRU ? movie.nameRU.toLowerCase() : "";
          const lowerCaseNameEn = movie.nameEn ? movie.nameEn.toLowerCase() : "";
          return lowerCaseNameRU.includes(lowerCaseInput) || lowerCaseNameEn.includes(lowerCaseInput);
        });
        setMovies(searchResults);
        setPreloader(false);
        setSearching(false);

        if (searchResults.length === 0) {
          console.log('Ничего не найдено');
          setErrorMessage('Ничего не найдено');
        }
      })
      .catch((error) => {
        console.log('Ошибка запроса фильмов:', error);
        setErrorMessage('Произошла ошибка при поиске фильмов');
        setPreloader(false);
        setSearching(false);
      });
  }

  // Фильтрация фильмов на основе shortFilmsOnly
  const filteredMovies = shortFilmsOnly
    ? movies.filter(movie => movie.duration <= 60)
    : movies;

  return (
    <>
      <SearchForm handleSearch={handleSearch} initialValue={searchQuery} />
      <FilterCheckbox
        isChecked={shortFilmsOnly}
        onChange={handleCheckboxChange}
      />
      {errorMessage && !searching && <p className="error">{errorMessage}</p>}
      {preloader && <Preloader />}
      {filteredMovies.length === 0 && !preloader && !searching && <p className="error"></p>}
      {filteredMovies.length > 0 && <MoviesCardList movies={filteredMovies} />}
    </>
  )
}

export default Movies;
