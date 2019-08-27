import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import styles from '../CSS/calendar.css';

function Month(props) {
  const {
    calendar, monthName, prev, next, year,
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
              <Day number={day.number} valid={day.valid} style={{}} />
            ))}
          </tr>
        ))}
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
};

export default Month;
