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
      {
        (category === 'Year'
          ? <input className="form" value={selected} name={category} onChange={onSelectChange} />
          : (
            <select className="form" onChange={onSelectChange} name={category} value={selected}>
              {data.map((val) => <option key={val.toString()} value={val}>{val}</option>)}
            </select>
          )
        )
      }
    </div>
  );
};

export default Dropdown;
