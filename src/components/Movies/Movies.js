import React, { useState } from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import MoviesCardList from "./MoviesCardList/MoviesCardList";





function Movies() {
  const [shortFilmsOnly, setShortFilmsOnly] = useState(false);

  const handleCheckboxChange = () => {
    setShortFilmsOnly(!shortFilmsOnly);
    // будущая логика для фильтрации фильмов
  };


  return (
    <>
      <SearchForm />
      <FilterCheckbox
        isChecked={shortFilmsOnly}
        onChange={handleCheckboxChange} />
      <MoviesCardList />
    </>
  )
}

export default Movies;