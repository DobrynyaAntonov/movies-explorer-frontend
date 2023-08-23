import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, onChange }) {
    return (
        <section className="filterCheckbox">
            <label className="filterCheckbox__label">
                <input
                    className="filterCheckbox__input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                />
                <span className="filterCheckbox__ball"></span>

            </label>
            <p className="filterCheckbox__text">Короткометражки</p>
        </section>
    );
};

export default FilterCheckbox;