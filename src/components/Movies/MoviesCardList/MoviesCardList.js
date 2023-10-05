import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import './MoviesCardList.css';
import MovieCard from './MovieCard/MoviesCard';
import * as MainApi from "../../../utils/MainApi";


function MoviesCardList({ movies }) {
  const [saveMovies, setSaveMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visibleCardCount, setVisibleCardCount] = useState(
    isMobile ? (window.innerWidth <= 320 ? 5 : 8) : 12
  );
  const isLoadMoreVisible = visibleCardCount < movies.length;
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);

  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  const getSavedMovies = () => {
    MainApi.getMovies()
      .then((data) => {
        setSaveMovies(data);
        // Сохраняем данные в localStorage
        saveToLocalStorage("savedMovies", data);
      })
      .catch((error) => {
        console.log('Ошибка запроса фильмов:', error);
      });
  };

  useEffect(() => {
      getSavedMovies();
  }, []);

  const handleLoadMore = () => {
    if (window.innerWidth <= 1279) {
      setVisibleCardCount(prevCount => prevCount + 2);
    } else {
      setVisibleCardCount(prevCount => prevCount + 3);
    }
  };

  const handleLikeClick = (movieId) => {
    const savedMovie = saveMovies.find(movie => movie.movieId === movieId);
    if (savedMovie) {
      setLikeButtonDisabled(true); 
      MainApi.deleteMovie(savedMovie._id)
        .then(() => {
          console.log('фильм удален');
          // Обновляем состояние saveMovies, убирая удаленный фильм
          setSaveMovies(prevSaveMovies => prevSaveMovies.filter(movie => movie.movieId !== movieId));
        })
        .catch((error) => {
          console.log('ошибка при удалении фильма', error);
        }) 
        .finally(() => {
          setLikeButtonDisabled(false);
        });
    } else {
      setLikedMovies([...likedMovies, movieId]);
      setLikeButtonDisabled(true);
      MainApi.addMovie(movieId)
      .then((newMovieData) => {
        console.log('фильм успешно сохранен');
        const cardIndex = saveMovies.findIndex(savedMovie => savedMovie.movieId === movieId);
        
        // Если карточка не найдена, добавляем новую карточку в список
        if (cardIndex === -1) {
          const updatedSaveMovies = [
            ...saveMovies,
            {
              ...newMovieData,
            },
          ];
          setSaveMovies(updatedSaveMovies);
        } else {
          // Если карточка найдена, заменяем ее в списке
          const updatedSaveMovies = [...saveMovies];
          updatedSaveMovies[cardIndex] = {
            ...newMovieData,
          };
          setSaveMovies(updatedSaveMovies);
        }
      })
      .catch((error) => {
        console.log('Ошибка при сохранении фильма:', error);
      })
      .finally(() => {
        setLikeButtonDisabled(false);
      });
    
    }
  };

  const visibleCards = movies.slice(0, visibleCardCount).map((card) => {
    const isMovieSaved = saveMovies.some(savedMovie => savedMovie.movieId === card.id);

    return (
      <li key={card.id} className="moviesCardList__item">
        <MovieCard
          name={card.nameRU}
          img={`https://api.nomoreparties.co/${card.image.url}`}
          time={card.duration}
        >
          {isMovieSaved ? (
            <button className="moviesCard__button-saved" onClick={() => { handleLikeClick(card.id) }}  disabled={likeButtonDisabled}></button>
          ) : (
            <button
              className='moviesCard__button-save'
              onClick={() => {
                const movieData = {
                  "country": card.country,
                  "director": card.director,
                  "duration": card.duration,
                  "year": card.year,
                  "description": card.description,
                  "image": `https://api.nomoreparties.co${card.image.url}`,
                  "trailerLink": card.trailerLink,
                  "thumbnail": `https://api.nomoreparties.co/${card.image.formats.thumbnail.hash}`,
                  "movieId": card.id,
                  "nameRU": card.nameRU,
                  "nameEN": card.nameEN,
                };
                handleLikeClick(movieData);
              }}
              disabled={likeButtonDisabled}
            >
              Сохранить
            </button>
          )}
        </MovieCard>
      </li>
    );
  });

  return (
    <>
      <ul className="moviesCardList">
        {visibleCards}
      </ul>
      {isLoadMoreVisible && <button className="more" onClick={handleLoadMore}>Ещё</button>}
    </>
  );
}

export default MoviesCardList;
