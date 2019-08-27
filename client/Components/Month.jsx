/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import styles from '../CSS/calendar.css';

function Month(props) {
  const {
    calendar, monthName, prev, next, year, turnOffPopups, dateClickHandler,
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
            {week.map((day) => (
              // create day-component/table-cell for each day
              <Day number={day.number} valid={day.valid} style={{}} dateClickHandler={dateClickHandler} />
            ))}
          </tr>
        ))}
        <tr>
          <td colSpan="6" />
          <td>
            <div
              role="button"
              tabIndex="0"
              onClick={turnOffPopups}
              onKeyPress={turnOffPopups}
              style={{ color: 'rgb(0, 132, 137)' }}
            >
              <br />
                Close
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
  turnOffPopups: PropTypes.func.isRequired,
  dateClickHandler: PropTypes.func.isRequired,
};

export default Month;
