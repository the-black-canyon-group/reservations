/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import styles from '../CSS/calendar.css';

function Month(props) {
  const {
    calendar, monthName, prev, next, year, clearDates, dateClickHandler, checkinDate, checkoutDate, month,
  } = props;
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td style={{ border: 'none' }}><input onClick={prev} type="image" name="imgbtn" src="images/prevButton.png" alt="" /></td>
          <td style={{ border: 'none' }} colSpan="5">{`${monthName} ${year}`}</td>
          <td style={{ border: 'none' }}><input onClick={next} type="image" name="imgbtn" src="images/nextButton.png" alt="" /></td>
        </tr>
        <tr>
          <td>Su</td>
          <td>Mo</td>
          <td>Tu</td>
          <td>We</td>
          <td>Th</td>
          <td>Fr</td>
          <td>Sa</td>
        </tr>
        {/* create table row for each week */}
        {calendar.map((week) => (
          <tr>
            {week.map((day) => {
              // create day-component/table-cell for each day
              let isCheckinDate = false;
              if (day.number === `${checkinDate.day}` && checkinDate.year === year && checkinDate.month === month) {
                isCheckinDate = true;
              }

              let isCheckoutDate = false;
              if (day.number === `${checkoutDate.day}` && checkoutDate.year === year && checkoutDate.month === month) {
                isCheckoutDate = true;
              }
              return (<Day number={day.number} valid={day.valid} style={{}} dateClickHandler={dateClickHandler} isCheckoutDate={isCheckoutDate} isCheckinDate={isCheckinDate} />);
            })}
          </tr>
        ))}
        <tr>
          <td colSpan="5" />
          <td colSpan="2">
            <br />
            <div
              role="button"
              tabIndex="0"
              onClick={clearDates}
              onKeyPress={clearDates}
              style={{ color: 'rgb(0, 132, 137)' }}
            >
                Clear dates
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

Month.propTypes = {
  calendar: PropTypes.arrayOf(PropTypes.array).isRequired,
  monthName: PropTypes.string.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  clearDates: PropTypes.func.isRequired,
  dateClickHandler: PropTypes.func.isRequired,
  checkinDate: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  checkoutDate: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
};

export default Month;
