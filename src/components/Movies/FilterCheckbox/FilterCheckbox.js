import React, { useState, useEffect } from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ onChange }) {
  const [isChecked, setIsChecked] = useState(() => {
    const savedState = localStorage.getItem("checkboxState");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("checkboxState", JSON.stringify(isChecked));
  }, [isChecked]);

  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <section className="filterCheckbox">
      <label className="filterCheckbox__label">
        <input
          className="filterCheckbox__input"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="filterCheckbox__ball"></span>
      </label>
      <p className="filterCheckbox__text">Короткометражки</p>
    </section>
  );
};

export default FilterCheckbox;
