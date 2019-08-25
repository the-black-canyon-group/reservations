import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
// import styles from '../CSS/calendar.css';

function Month(props) {
  const {
    calendar, monthName, prev, next,
  } = props;
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ border: 'none' }}><button type="button" onClick={prev}>Prev</button></td>
          <td style={{ border: 'none' }} colSpan="5">{monthName}</td>
          <td style={{ border: 'none' }}><button type="button" onClick={next}>Next</button></td>
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
};

export default Month;
