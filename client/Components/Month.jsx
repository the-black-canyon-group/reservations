import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

function Month(props) {
  const { calendar } = props;
  return (
    <table>
      <tbody>
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
};

export default Month;