import React, { useState } from "react";
import '../../Movies/FilterCheckbox/FilterCheckbox.css';

function FilterCheckboxSave({ onChange }) {
  const [isChecked, setIsChecked] = useState(false);

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

export default FilterCheckboxSave;
