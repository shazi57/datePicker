import React from 'react';
import '../assets/Dropdown.css';

const Dropdown = (props) => {
  const {
    category, data, onSelectChange, selected,
  } = props;
  return (
    <div className="select-container">
      <label htmlFor="cars">{category}</label>
      <br />
      <select onChange={onSelectChange} name={category} value={selected}>
        {data.map((val) => <option value={val}>{val}</option>)}
      </select>
    </div>
  );
};

export default Dropdown;
