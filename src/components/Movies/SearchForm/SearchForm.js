import React, { useState, useEffect } from "react";
import './SearchForm.css';

function SearchForm({ handleSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchQuery);
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        const savedQuery = localStorage.getItem("searchQuery");
        if (savedQuery) {
            setSearchQuery(savedQuery);
            handleSearch(savedQuery);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("searchQuery", searchQuery);
    }, [searchQuery]);

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <input
                className="searchForm__input"
                placeholder="Фильм"
                value={searchQuery}
                onChange={handleInputChange}
            />
            <button className="searchForm__submit" type="submit"></button>
        </form>
    )
}

export default SearchForm;
