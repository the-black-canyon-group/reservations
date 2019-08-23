import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

function Month(props) {
  const { calendar } = props;
  return (
    <table>
      <tbody>
        {calendar.map((week) => (
          <tr>
            {week.map((day) => (
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
