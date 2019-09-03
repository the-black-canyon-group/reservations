/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import styles from '../CSS/calendar.css';

function Month(props) {
  const {
    type, calendar, monthName, prev, next, year, clearDates, dateClickHandler, checkinDate, checkoutDate, month, handleMouseOverDate, handleMouseOffDate,
  } = props;
  return (
    <div style={{ paddingBottom: '10px' }}>
      <table className={styles.table}>
        <tbody>
          <tr>
            {/* PREVIOUS AND NEXT MONTH BUTTONS */}
            <td style={{ border: 'none' }}><input onClick={prev} type="image" name="imgbtn" src="http://localhost:3000/images/prevButton.png" alt="" /></td>
            <td style={{ border: 'none' }} colSpan="5">{`${monthName} ${year}`}</td>
            <td style={{ border: 'none' }}><input onClick={next} type="image" name="imgbtn" src="http://localhost:3000/images/nextButton.png" alt="" /></td>
          </tr>
          <tr>
            {/* DAY OF WEEK */}
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
                return (<Day type={type} number={day.number} valid={day.valid} style={{}} darkHighlight={day.darkHighlight} highlight={day.highlight} dateClickHandler={dateClickHandler} handleMouseOverDate={handleMouseOverDate} isCheckoutDate={isCheckoutDate} isCheckinDate={isCheckinDate} handleMouseOffDate={handleMouseOffDate} />);
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {/* CLEAR DATES BUTTON */}
      <div style={{ float: 'right' }}>
        <span
          role="button"
          tabIndex="0"
          onClick={clearDates}
          onKeyPress={clearDates}
          style={{ color: 'rgb(0, 132, 137)' }}
        >
                Clear dates
        </span>
      </div>
      <br />
    </div>
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
  handleMouseOverDate: PropTypes.func.isRequired,
  handleMouseOffDate: PropTypes.func.isRequired,
  checkinDate: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }).isRequired,
  checkoutDate: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Month;
