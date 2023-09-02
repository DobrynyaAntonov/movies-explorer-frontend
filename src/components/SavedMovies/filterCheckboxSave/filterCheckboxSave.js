import React, { useState, useEffect } from "react";
import '../../Movies/FilterCheckbox/FilterCheckbox.css';

function FilterCheckboxSave({ onChange }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("checkboxStateSave");
    if (savedState !== null) {
      setIsChecked(JSON.parse(savedState));
    }
  }, []);

  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    localStorage.setItem("checkboxStateSave", JSON.stringify(updatedChecked));
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

export default FilterCheckboxSave;
