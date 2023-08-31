import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import './MoviesCardList.css';
import MovieCard from './MovieCard/MoviesCard'
import * as MainApi from "../../../utils/MainApi";

function MoviesCardList({ movies }) {
  const [saveMovies, setSaveMovies] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visibleCardCount, setVisibleCardCount] = useState(
    isMobile ? (window.innerWidth <= 320 ? 5 : 8) : 12
  );
  const isLoadMoreVisible = visibleCardCount < movies.length;

  const handleLoadMore = () => {
    if (window.innerWidth <= 1279) {
      setVisibleCardCount(prevCount => prevCount + 2);
    } else {
      setVisibleCardCount(prevCount => prevCount + 3);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        setVisibleCardCount(window.innerWidth <= 320 ? 5 : 8);
      } else {
        setVisibleCardCount(12);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const saveMovie = (data) => {
    MainApi.addMovie(data)
      .then(() => {
        console.log('добавление карточки прошло успешно');
        // Обновляем список сохраненных фильмов после успешного сохранения
        getMovies();
      })
      .catch((error) => {
        console.log('Ошибка добавления фильма:', error);
      });

  }

  const getMovies = () => {
    MainApi.getMovies()
      .then((data) => {
        setSaveMovies(data);
      })
      .catch((error) => {
        console.log('Ошибка запроса фильмов:', error);
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

  const deleteMove = (movieId) => {
    const savedMovie = saveMovies.find(movie => movie.movieId === movieId);
    
    if (savedMovie) {
      MainApi.deleteMovie(savedMovie._id)
        .then(() => {
          console.log('карточка успешно удалена');
          // Обновляем список сохраненных фильмов после успешного удаления
          getMovies();
        })
        .catch((error) => {
          console.log('при удалении фильма произошла ошибка:', error);
        });
    }
  }
  

  const visibleCards = movies.slice(0, visibleCardCount).map((card, index) => {
    const isMovieSaved = saveMovies.some(savedMovie => savedMovie.movieId === card.id);
    
    return (
      <li key={index} className="moviesCardList__item">
        <MovieCard
          name={card.nameRU}
          img={`https://api.nomoreparties.co/${card.image.url}`}
          time={card.duration}
        >
          {isMovieSaved ? (
            <button className="moviesCard__button-saved" onClick={() => { deleteMove(card.id) }}></button>
          ) : (
            <button
              className="moviesCard__button-save"
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
                saveMovie(movieData);
              }}
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
