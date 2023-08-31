import React, { useState, useEffect } from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as MovieApi from "../../utils/MoviesApi";
import Preloader from "./Preloader/Preloader"

function Movies() {
  const savedSearchQuery = localStorage.getItem('searchQuery') || "";
  const savedShortFilmsOnly = JSON.parse(localStorage.getItem('shortFilmsOnly'));
  const [shortFilmsOnly, setShortFilmsOnly] = useState(savedShortFilmsOnly || false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [preloader, setPreloader] = useState(false);
  const [searching, setSearching] = useState(false);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState(savedSearchQuery);

  useEffect(() => {
    if (initialSearchDone) {
      filterMovies(movies, shortFilmsOnly);
    }
  }, [shortFilmsOnly, movies, initialSearchDone]);

  useEffect(() => {
    if (initialSearchDone) {
      localStorage.setItem('shortFilmsOnly', JSON.stringify(shortFilmsOnly));
      filterMovies(movies, shortFilmsOnly);
    }
  }, [shortFilmsOnly]);

  useEffect(() => {
    if (initialSearchDone) {
      localStorage.setItem('searchQuery', searchQuery);
      filterMovies(movies, shortFilmsOnly);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery && savedSearchQuery === searchQuery) {
      setInitialSearchDone(true);
      setSearching(true);
      // Если уже есть сохраненные фильмы, используем их, иначе делаем запрос
      if (localStorage.getItem('savedMovies')) {
        setMovies(JSON.parse(localStorage.getItem('savedMovies')));
        setPreloader(false);
        setSearching(false);
      } else {
        MovieApi.getMovie()
          .then((data) => {
            const lowerCaseInput = searchQuery.toLowerCase();

            const searchResults = data.filter(movie => {
              const lowerCaseNameRU = movie.nameRU ? movie.nameRU.toLowerCase() : "";
              const lowerCaseNameEn = movie.nameEn ? movie.nameEn.toLowerCase() : "";

              return lowerCaseNameRU.includes(lowerCaseInput) || lowerCaseNameEn.includes(lowerCaseInput);
            });

            setMovies(searchResults);
            localStorage.setItem('savedMovies', JSON.stringify(searchResults));
            setPreloader(false);
            setSearching(false);
          })
          .catch((error) => {
            console.log('Ошибка запроса фильмов:', error);
            setErrorMessage('Произошла ошибка при поиске фильмов');
            setPreloader(false);
            setSearching(false);
          });
      }
    }
  }, []);

  const handleCheckboxChange = () => {
    setShortFilmsOnly(!shortFilmsOnly);
  };

  const handleSearch = (inputDate) => {
    if (!inputDate) {
      setErrorMessage('Поле поиска пустое');
      setMovies([]);
      setFilteredMovies([]); // Сброс результатов поиска
      setSearchQuery("");
      setSearching(false);
      return;
    }

    setPreloader(true);
    setMovies([]);
    setFilteredMovies([]); // Сброс результатов поиска
    setSearchQuery(inputDate);
    setSearching(true);
    setErrorMessage('');
  }

  const filterMovies = (movies, shortFilms) => {
    if (shortFilms) {
      const filteredMovies = movies.filter(movie => movie.duration <= 40);
      setFilteredMovies(filteredMovies);
    } else {
      setFilteredMovies(movies);
    }
  }

  return (
    <>
      <SearchForm handleSearch={handleSearch} initialValue={searchQuery} />
      <FilterCheckbox
        isChecked={shortFilmsOnly}
        onChange={handleCheckboxChange}
      />
      {errorMessage && !searching && <p className="error">{errorMessage}</p>}
      {preloader && <Preloader />}
      {filteredMovies.length > 0 && !preloader && <MoviesCardList movie={filteredMovies} />}
    </>
  )
}

export default Movies;
