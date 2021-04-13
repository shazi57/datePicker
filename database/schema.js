const Calendar = require('../helper/Calendar');

module.exports = (date) => (
  // takes in a date object and convert it to schema
  {
    Month: Calendar().Months[date.getMonth()],
    Day: date.getDate().toString(),
    Year: date.getFullYear().toString(),
  }
);
