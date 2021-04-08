import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import Dropdown from './Dropdown';
import DateDisplay from './DateDisplay';
import '../assets/App.css';
import Calendar from '../../helper/Calendar.json';
import ddCalculator from '../../helper/ddCalculator';

const App = () => {
  //  initialization
  const [chosenDate, changeDate] = useState({
    Month: '',
    Day: '',
    Year: '',
  });
  const [daysFromNow, changeDayCount] = useState(0);
  const [mounted, isMounted] = useState(false);

  // onChange handler for select elements.
  const onSelectChange = (e) => {
    changeDate({ ...chosenDate, [e.target.name]: e.target.value });
  };

  // upon mounting the component, make get request to server
  // server then pulls recently inquired data from database

  useEffect(() => {
    if (!mounted) {
      axios.get('/recent')
        .then((res) => {
          const { data } = res;
          changeDate(data);
        })
        .then(() => {
          isMounted(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mounted]);

  // upon changing chosenDate, calculate how many days remaining from today
  useEffect(() => {
    changeDayCount(ddCalculator(chosenDate));
  }, [chosenDate]);

  // upon changing chosenDate, update recent inquiry in the database
  useEffect(() => {
    if (mounted) {
      axios.post('/recent', chosenDate)
        .then((success) => {
          console.log(`sent to the backend for processing ${success}`);
        }).catch((err) => {
          console.log(`problem with sending data to backend ${err}`);
        });
    }
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
