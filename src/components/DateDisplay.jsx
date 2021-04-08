import React from 'react';

const DateDisplay = (props) => {
  const { date: { Month, Day, Year }, daysFromNow } = props;
  return (
    <h1>
      {`${Month}/${Day}/${Year} is ${daysFromNow} days from now`}
    </h1>
  );
};

export default DateDisplay;
