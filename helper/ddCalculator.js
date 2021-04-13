import Calendar from './Calendar';

const ddCalculator = (date) => {
  /**
    Convert D-Day's time in milliseconds and get the difference between today's time and D-Day's

   */
  const today = new Date();
  const dday = new Date(date.Year, Calendar().Months.indexOf(date.Month), date.Day);
  return Math.floor(((dday.getTime() - today.getTime()) / 1000 / 3600 / 24) + 1);
};

export default ddCalculator;
