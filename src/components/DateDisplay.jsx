import React from 'react';
import '../assets/DateDisplay.css';

const DateDisplay = (props) => {
  const { date: { Month, Day, Year }, daysFromNow } = props;
  return (
    <h1 className="dateDisplay">
      {`${Month}/${Day}/${Year} is ${daysFromNow} days from now`}
    </h1>
  );
};

export default DateDisplay;
