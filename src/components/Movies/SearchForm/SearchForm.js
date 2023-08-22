import React from "react";
import './SearchForm.css';


function SearchForm() {



    return (
       <form className="SearchForm">
        <input className="SearchForm__input"
         placeholder="Фильм"></input>
        <button className="SearchForm__submit" type="submit"></button>
       </form>
    )
}

export default SearchForm;