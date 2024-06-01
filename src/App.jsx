import { useState } from "react";
import "./App.css";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = () => {
    const daysArray = [];

    // Dont get confused it is just a awesome trick you can use to actually find the first and last date in a month by leveraging the use of new Date() arguments.
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );

    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    // Creating null values bcoz if firstDay of month starts at thursday then monday to wednesday should be null so we are doing this
    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }
    for (let i = 1; i < lastDay.getDate(); i++) {
      daysArray.push(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i)
      );
    }

    return daysArray;
  };

  daysInMonth();

  const handleChangeMonth = (e) => {
    // It returns a string so we are converting that to a integer
    const newMonth = parseInt(e.target.value, 10);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleChangeYear = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
  };

  const handleBackClick = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };
  const handleFrontClick = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <>
      <div className="calendar">
        <div className="header">
          {/* Icons are from the bootstrap */}
          <button onClick={handleBackClick}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </button>
          <select value={selectedDate.getMonth()} onChange={handleChangeMonth}>
            {months.map((month, index) => (
              <option value={index} key={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedDate.getFullYear()}
            onChange={handleChangeYear}
          >
            {/* Awesome trick to get the year and get before and after values of 5 years from that year */}
            {Array.from(
              { length: 10 },
              (_, i) => selectedDate.getFullYear() - 5 + i
            ).map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
          <button onClick={handleFrontClick}>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>
        <div className="daysOfWeek">
          {days.map((day) => (
            <div key={day}>{day.slice(0, 3)}</div>
          ))}
        </div>
        <div className="days">
          {/* daysInMonth() function returns an array so we are just mapping through the function instead of the array itself */}

          {daysInMonth().map((day, index) => (
            <div
              key={index}
              className={
                day
                  ? isSameDay(day, new Date())
                    ? "day current"
                    : "day"
                  : "empty"
              }
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
