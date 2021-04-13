const isLeapYear = (year) => ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));

module.exports = (year) => ({
  MonthAndDays:
    {
      January: 31,
      February: (isLeapYear(year) ? 29 : 28),
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    },
  Months: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ],
});
