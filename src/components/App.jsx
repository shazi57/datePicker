import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import Dropdown from './Dropdown';
import DateDisplay from './DateDisplay';
import '../assets/App.css';
import Calendar from '../helper/Calendar.json';
import ddCalculator from '../helper/ddCalculator';

const App = () => {
  const today = new Date();

  //  initialization
  const [chosenDate, changeDate] = useState({
    Month: Calendar.Months[today.getMonth()],
    Day: today.getDate(),
    Year: today.getFullYear(),
  });

  const [daysFromNow, changeDayCount] = useState(0);

  // onChange handler for select elements.
  const onSelectChange = (e) => {
    if (e.target.name === 'Month') {
      changeDate({ ...chosenDate, [e.target.name]: e.target.value });
    } else {
      changeDate({ ...chosenDate, [e.target.name]: Number(e.target.value) });
    }
  };

  // upon changing chosenDate, calculate how many days remaining from today
  useEffect(() => {
    changeDayCount(ddCalculator(chosenDate));
  }, [chosenDate]);

  return (
    <div className="viewbox">
      <div className="dropdown-container">
        <Dropdown
          category="Month"
          selected={chosenDate.Month}
          onSelectChange={onSelectChange}
          data={Object.keys(Calendar.MonthAndDays)}
        />
        <Dropdown
          category="Day"
          selected={chosenDate.Day}
          onSelectChange={onSelectChange}
          data={Array.from({ length: Calendar.MonthAndDays[chosenDate.Month] },
            (v, i) => i + 1)}
        />
        <Dropdown
          category="Year"
          selected={chosenDate.Year}
          onSelectChange={onSelectChange}
          data={Array.from({ length: 100 }, (v, i) => 1980 + i)}
        />
      </div>
      <div className="date-container">
        <DateDisplay date={chosenDate} daysFromNow={daysFromNow} />
      </div>
    </div>
  );
};

export default hot(module)(App);
