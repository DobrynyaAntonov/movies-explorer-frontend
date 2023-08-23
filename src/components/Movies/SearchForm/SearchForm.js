import React from "react";
import './SearchForm.css';


function SearchForm() {



    return (
       <form className="searchForm">
        <input className="searchForm__input"
         placeholder="Фильм"></input>
        <button className="searchForm__submit" type="submit"></button>
       </form>
    )
}

export default SearchForm;