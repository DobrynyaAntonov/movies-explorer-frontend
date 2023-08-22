import React from "react";
import './NotFound.css';
import { useNavigate } from 'react-router-dom';


function NotFound() {
    const navigate = useNavigate();
    function exit() {
        navigate(-1)
    }

    return (
        <div className="NotFound">
            <h2 className="NotFound__title">404</h2>
            <p className="NotFound__text">Страница не найдена</p>
            <button className="NotFound__exit" onClick={exit}>Назад</button>
            
        </div>
    )
}

export default NotFound;