/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Month from './Month';

class BasicCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: props.year,
      month: props.month,
      calendar: this.getCalendar(props.year, props.month, []),
    };

    this.getLiveCalendar(props.year, props.month, props.homestayId);
  }

  getLiveCalendar(year, month, homestayId) {
    Axios.get('/reservations', {
      header: {
        'Content-Type': 'application/json',
      },
      params: {
        homestayId,
        month: (month + 1),
        year,
      },
    })
      .then((results) => {
        const { data } = results;
        const reservedDays = [];
        for (let i = 0; i < data.length; i += 1) {
          reservedDays.push(data[i].day);
        }
        const calendar = this.getCalendar(year, month, reservedDays);
        this.setState({
          month,
          year,
          calendar,
        });
      });
  }

  // Get matrix of calendar based on year/month
  getCalendar(year, month, reservedDays) {
    // Check to see which day of the week the first day of the month stars at
    // (so we know how many empty squares to lead with)
    const daysInMonth = new Date((month >= 12) ? year + 1 : year, (month >= 12) ? 0 : month + 1, 0).getDate();
    const dayOfFirst = new Date(year, month, 1).getDay();
    const calendar = [];

    let week = [];
    for (let i = 0; i < dayOfFirst; i += 1) {
      week.push({ number: '', valid: false });
    }

    for (let i = 1; i <= daysInMonth; i += 1) {
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }

      // Check to see if the date is a past date
      let isValid = this.isPastDate(year, month, i);

      if (reservedDays.includes(i)) {
        isValid = false;
      }

      week.push({ number: `${i}`, valid: isValid });
    }

    while (week.length < 7) {
      week.push({ number: '', valid: false });
    }

    calendar.push(week);

    return calendar;
  }

  updateCalendar(year, month) {
    const { homestayId } = this.props;
    this.getLiveCalendar(year, month, homestayId);
  }

  // Button function to go to the NEXT month
  nextMonth() {
    const { month, year } = this.state;
    let nextMonth = month + 1;
    let nextYear = year;

    if (nextMonth >= 12) {
      nextMonth = 0;
      nextYear += 1;
    }

    this.updateCalendar(nextYear, nextMonth);
  }

  // Button function to go to the PREVIOUS month
  prevMonth() {
    const { month, year } = this.state;
    let nextMonth = month - 1;
    let nextYear = year;

    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    }

    this.updateCalendar(nextYear, nextMonth);
  }

  // Check to see if date is a past date
  isPastDate(year, month, day) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (year < currentYear) {
      return false;
    }

    if (year <= currentYear && month < currentMonth) {
      return false;
    }

    if (year <= currentYear && month <= currentMonth && day < currentDay) {
      return false;
    }

    return true;
  }

  render() {
    const { calendar, year, month } = this.state;

    const date = new Date(`${year}-${month + 1}-1`);
    const options = { month: 'long' };
    const monthName = new Intl.DateTimeFormat('en-US', options).format(date);
    return (
      <div>
        <button type="button" onClick={this.prevMonth.bind(this)}>Prev</button>
        <button type="button" onClick={this.nextMonth.bind(this)}>Next</button>
        <div style={{ textAlign: 'center' }}>{monthName}</div>
        <Month calendar={calendar} />
      </div>
    );
  }
}

BasicCalendar.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  homestayId: PropTypes.number.isRequired,
};


export default BasicCalendar;
