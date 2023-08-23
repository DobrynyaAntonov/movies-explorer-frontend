import React from "react";
import './NotFound.css';
import { useNavigate } from 'react-router-dom';


function NotFound() {
    const navigate = useNavigate();
    function exit() {
        navigate(-1)
    }

    return (
        <div className="notFound">
            <h2 className="notFound__title">404</h2>
            <p className="notFound__text">Страница не найдена</p>
            <button className="notFound__exit" onClick={exit}>Назад</button>
            
        </div>
    )
}

export default NotFound;