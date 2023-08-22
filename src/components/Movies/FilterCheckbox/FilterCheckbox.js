import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, onChange }) {
    return (
        <div className="FilterCheckbox__container">
            <label className="FilterCheckbox">
                <input
                    className="FilterCheckbox__input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                />
                <span className="FilterCheckbox__ball"></span>

            </label>
            <p className="FilterCheckbox__text">Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;