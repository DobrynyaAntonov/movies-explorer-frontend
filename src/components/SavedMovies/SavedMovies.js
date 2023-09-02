import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import SearchFormSave from './SearchFormSave/SearchFormSave'
import FilterCheckboxSave from './filterCheckboxSave/filterCheckboxSave'
import "../Movies/MoviesCardList/MoviesCardList.css";
import MovieCard from "../Movies/MoviesCardList/MovieCard/MoviesCard";
import * as MainApi from "../../utils/MainApi";

function SavedMovies() {
  const savedShortFilmsOnly = JSON.parse(localStorage.getItem('savedShortFilmsOnly'));
  const savedSearchInput = localStorage.getItem('savedSearchInput') || '';
  const [shortFilmsOnly, setShortFilmsOnly] = useState(savedShortFilmsOnly || false);
  const [searchInput, setSearchInput] = useState(savedSearchInput);
  const [saveMovies, setSaveMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = () => {
    setShortFilmsOnly(!shortFilmsOnly);
  };

  useEffect(() => {
    const filtered = shortFilmsOnly
      ? saveMovies.filter(movie => movie.duration <= 60)
      : saveMovies;

    setFilteredMovies(filtered);
    localStorage.setItem('savedShortFilmsOnly', JSON.stringify(shortFilmsOnly));
  }, [shortFilmsOnly, saveMovies]);

  useEffect(() => {
    if (savedSearchInput) {
      handleSearch(savedSearchInput);
    } else {
      setLoading(true); 
      getMovies();
    }
  }, [savedSearchInput]);

  const getMovies = () => {
    MainApi.getMovies()
      .then((data) => {
        setLoading(false); 
        if (data.length === 0) {
          setErrorMessage('Сохраненных фильмов пока нет');
        } else {
          setErrorMessage('');
        }
        setSaveMovies(data);

        // Сохраняем данные в localStorage
        localStorage.setItem('savedMovies', JSON.stringify(data));
      })
      .catch((error) => {
        setLoading(false); 
        console.log('Ошибка запроса фильмов:', error);
        setErrorMessage('Произошла ошибка при загрузке фильмов');
      });
  }

  const handleSearch = (inputDate) => {
    setSearchInput(inputDate);
    localStorage.setItem('savedSearchInput', inputDate);

    if (!inputDate) {
      setLoading(true);
      getMovies();
      setFilteredMovies(saveMovies);
      setErrorMessage('');
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
      setErrorMessage('');
      setFilteredMovies(searchResults);
    }
  }

  const deleteMovie = (id) => {
    setLoading(true);
    MainApi.deleteMovie(id)
      .then(() => {
        console.log('Карточка успешно удалена');
        getMovies();
      })
      .catch((error) => {
        console.log('При удалении фильма произошла ошибка:', error);
        setLoading(false);
      });
  }

  const savedMoviesCards = filteredMovies.map((card) => (
    <li key={card.movieId} className="moviesCardList__item">
      <MovieCard
        name={card.nameRU}
        img={card.image}
        time={card.duration}
      >
        <button
          className={`moviesCard__button-delete ${loading ? 'disabled' : ''}`}
          onClick={() => { deleteMovie(card._id) }}
          disabled={loading}
        ></button>
      </MovieCard>
    </li>
  ));

  return (
    <section className="savedMovies">
      <SearchFormSave handleSearch={handleSearch} initialInputValue={searchInput} />
      <FilterCheckboxSave
        isChecked={shortFilmsOnly}
        onChange={handleCheckboxChange} />
      {errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : (
        <div className="moviesCardList">
          {savedMoviesCards}
        </div>
      )}
    </section>
  )
}

export default SavedMovies;
