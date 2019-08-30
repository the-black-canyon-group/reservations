/* eslint-disable react/no-did-update-set-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Month from './Month';
import styles from '../CSS/calendar.css';

class BasicCalendar extends React.Component {
  constructor(props) {
    super(props);

    const allDays = [];
    for (let i = 0; i < 31; i += 1) {
      allDays.push(i + 1);
    }

    this.state = {
      year: props.year,
      month: props.month,
      calendar: this.getCalendar(props.year, props.month, allDays),
    };

    this.getLiveCalendar(props.year, props.month, props.homestayId);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.dateClickHandler = this.dateClickHandler.bind(this);
    this.handleMouseOverDate = this.handleMouseOverDate.bind(this);
    this.handleMouseOffDate = this.handleMouseOffDate.bind(this);
    this.validDays = [];
  }

  componentDidUpdate(prevProps) {
    const {
      year, month, checkinDate, checkoutDate,
    } = this.props;
    const {
      year: oldYear, month: oldMonth, checkinDate: oldCheckinDate, checkoutDate: oldCheckoutDate, homestayId,
    } = prevProps;

    if (year !== oldYear || month !== oldMonth
      || checkinDate.year !== oldCheckinDate.year
      || checkinDate.day !== oldCheckinDate.day
      || checkoutDate.day !== oldCheckoutDate.day
      || checkoutDate.year !== oldCheckoutDate.year) {
      this.setState({
        year,
        month,
      });
      this.getLiveCalendar(year, month, homestayId);
    }
  }

  getLiveCalendar(year, month, homestayId) {
    // Get reserved spots for that month
    Axios.get('/api/reservations', {
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
        // Blackout any day that is reserved
        const { reservations } = results.data;
        const reservedDays = [];
        for (let i = 0; i < reservations.length; i += 1) {
          reservedDays.push(reservations[i]);
        }
        this.reservedDays = reservedDays;
        const calendar = this.getCalendar(year, month, reservedDays);
        const { type } = this.props;
        if (type === 'checkout') {
          let next = null;
          for (let i = 0; i < calendar[0].length; i += 1) {
            if (!next && calendar[0][i].number !== '') {
              next = calendar[0][i].valid;
            }
          }

          // Increment reserved dates by one for checkout calendar (checkout should be available the day after any checkin date)
          for (let w = 0; w < calendar.length; w += 1) {
            for (let d = 0; d < calendar[w].length; d += 1) {
              if (calendar[w][d].number !== '') {
                const temp = calendar[w][d].valid;
                calendar[w][d].valid = next;
                next = temp;
              }
            }
          }

          // Get last month (to see if the 1st of the current month should be blacked out)
          const pastMonth = (month === 0) ? 11 : month;
          const pastYear = (month === 0) ? (year - 1) : year;

          Axios.get('/api/reservations', {
            header: {
              'Content-Type': 'application/json',
            },
            params: {
              homestayId,
              month: pastMonth,
              year: pastYear,
            },
          })
            .then((checkoutData) => {
              // Check to see if the last day of last month is reserved
              const lastDayOfLastMonth = new Date(year, month, 0).getDate();
              if (checkoutData.data.length && checkoutData.data[checkoutData.data.length - 1].day === lastDayOfLastMonth) {
                for (let d = 0; d < calendar[0].length; d += 1) {
                  if (calendar[0][d].number === '1') {
                    calendar[0][d].valid = false;
                  }
                }
              }

              // If checkin date has already been set, make sure any day before that date is blocked out
              const { checkinDate, checkoutDate } = this.props;
              if (checkinDate.year !== null) {
                for (let w = 0; w < calendar.length; w += 1) {
                  for (let d = 0; d < calendar[w].length; d += 1) {
                    if ((year < checkinDate.year)
                        || (year === checkinDate.year && month < checkinDate.month)
                        || (year === checkinDate.year && month === checkinDate.month && parseInt(calendar[w][d].number, 10) <= checkinDate.day)) {
                      calendar[w][d].valid = false;
                    }
                  }
                }

                // If checkin date has been set, find the next unavailable date. All dates on and after the next available date should be invalid for checkout
                this.nextInvalidCheckout(checkinDate, 0)
                  .then((data) => {
                    if (data.data.length > 0) {
                      const resultMonth = parseInt(data.data[0].month, 10) - 1;
                      for (let w = 0; w < calendar.length; w += 1) {
                        for (let d = 0; d < calendar[w].length; d += 1) {
                          if ((year > parseInt(data.data[0].year, 10))
                            || (year === parseInt(data.data[0].year, 10) && month > resultMonth)
                            || (year === parseInt(data.data[0].year, 10) && month === resultMonth && parseInt(calendar[w][d].number, 10) > parseInt(data.data[0].day, 10))) {
                            calendar[w][d].valid = false;
                          }
                        }
                      }
                    }

                    // If checkin and checkout date have been set, dark highlight the reserved dates
                    if (checkoutDate.year !== null) {
                      for (let w = 0; w < calendar.length; w += 1) {
                        for (let d = 0; d < calendar[w].length; d += 1) {
                          if (calendar[w][d].valid && ((year < parseInt(checkoutDate.year, 10))
                            || (year === parseInt(checkoutDate.year, 10) && month < checkoutDate.month)
                            || (year === parseInt(checkoutDate.year, 10) && month === checkoutDate.month && parseInt(calendar[w][d].number, 10) < parseInt(checkoutDate.day, 10)))) {
                            calendar[w][d].darkHighlight = true;
                          } else {
                            calendar[w][d].darkHighlight = false;
                            // calendar[w][d].valid = false;
                          }
                        }
                      }
                    }

                    this.setState({
                      month,
                      year,
                      calendar,
                    });
                  });
              } else {
                this.setState({
                  month,
                  year,
                  calendar,
                });
              }
            })
            .catch((e) => {
              console.log('ERROR:', e);
            });
        } else {
          const { checkinDate, checkoutDate } = this.props;
          // If checkin date has already been set, make sure any day before that date is blocked out
          if (checkoutDate.year !== null && checkinDate.year !== null) {
            for (let w = 0; w < calendar.length; w += 1) {
              for (let d = 0; d < calendar[w].length; d += 1) {
                if (calendar[w][d].valid && ((year < parseInt(checkoutDate.year, 10))
                || (year === parseInt(checkoutDate.year, 10) && month < checkoutDate.month)
                || (year === parseInt(checkoutDate.year, 10) && month === checkoutDate.month && parseInt(calendar[w][d].number, 10) < parseInt(checkoutDate.day, 10)))
                && ((year > parseInt(checkinDate.year, 10))
                || (year === parseInt(checkinDate.year, 10) && month > checkinDate.month)
                || (year === parseInt(checkinDate.year, 10) && month === checkinDate.month && parseInt(calendar[w][d].number, 10) > parseInt(checkinDate.day, 10)))) {
                  calendar[w][d].darkHighlight = true;
                } else {
                  calendar[w][d].darkHighlight = false;
                }
              }
            }
            this.setState({
              month,
              year,
              calendar,
            });
          } else if (checkoutDate.year !== null) {
            this.prevInvalidCheckout(checkoutDate)
              .then((data) => {
                if (data.data.length > 0) {
                  const { year: prevInvalidYear, month: prevInvalidMonth, day: prevInvalidDay } = data.data[0];
                  console.log(data.data[0]);
                  for (let w = 0; w < calendar.length; w += 1) {
                    for (let d = 0; d < calendar[w].length; d += 1) {
                      if ((year < prevInvalidYear)
                          || (year === prevInvalidYear && month < prevInvalidMonth - 1)
                          || (year === prevInvalidYear && month === prevInvalidMonth - 1 && parseInt(calendar[w][d].number, 10) <= prevInvalidDay)) {
                        calendar[w][d].valid = false;
                      }
                    }
                  }
                  this.setState({
                    month,
                    year,
                    calendar,
                  });
                } else {
                  this.setState({
                    month,
                    year,
                    calendar,
                  });
                }
              });
          } else {
            this.setState({
              month,
              year,
              calendar,
            });
          }
        }

        // Set available dates for checkin calendar
        for (let w = 0; w < calendar.length; w += 1) {
          for (let d = 0; d < calendar[w].length; d += 1) {
            if (calendar[w][d].valid) {
              this.validDays.push(calendar[w][d].number);
            }
          }
        }
      })
      .catch((e) => {
        console.log('ERROR:', e);
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
    for (let x = 0; x < dayOfFirst; x += 1) {
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

  // Highlight potentially selected dates if checkin is set and checkout is not set
  handleMouseOverDate(e) {
    let day = parseInt(e.target.innerHTML, 10);

    if (e.target.children.length > 0) {
      day = parseInt(e.target.children[0].innerHTML, 10);
    }

    const { type, checkinDate, checkoutDate } = this.props;
    const { calendar, year, month } = this.state;
    const calendarCopy = calendar.slice();

    if (type === 'checkout' && checkinDate.year !== null && checkoutDate.year === null) {
      for (let w = 0; w < calendarCopy.length; w += 1) {
        for (let d = 0; d < calendarCopy[w].length; d += 1) {
          if (calendarCopy[w][d].valid && parseInt(calendarCopy[w][d].number, 10) <= day) {
            calendarCopy[w][d].highlight = true;
          } else {
            calendarCopy[w][d].highlight = false;
          }
        }
      }
    }

    if (type === 'checkin' && checkoutDate.year !== null && checkinDate.year === null) {
      for (let w = 0; w < calendarCopy.length; w += 1) {
        for (let d = 0; d < calendarCopy[w].length; d += 1) {
          if (calendarCopy[w][d].valid && parseInt(calendarCopy[w][d].number, 10) >= day
          && (year < checkoutDate.year
            || (year === checkoutDate.year && month < checkoutDate.month)
            || (year === checkoutDate.year && month === checkoutDate.month && parseInt(calendarCopy[w][d].number, 10) < checkoutDate.day))) {
            calendarCopy[w][d].highlight = true;
          } else {
            calendarCopy[w][d].highlight = false;
          }
        }
      }
    }

    this.setState({
      calendar: calendarCopy,
    });
  }

  handleMouseOffDate() {
    const { type, checkinDate, checkoutDate } = this.props;
    const { calendar } = this.state;
    const calendarCopy = calendar.slice();

    if (type === 'checkout' && checkinDate.year !== null && checkoutDate.year === null) {
      for (let w = 0; w < calendarCopy.length; w += 1) {
        for (let d = 0; d < calendarCopy[w].length; d += 1) {
          calendarCopy[w][d].highlight = false;
        }
      }
    }

    if (type === 'checkin' && checkoutDate.year !== null && checkinDate.year === null) {
      for (let w = 0; w < calendarCopy.length; w += 1) {
        for (let d = 0; d < calendarCopy[w].length; d += 1) {
          calendarCopy[w][d].highlight = false;
        }
      }
    }

    this.setState({
      calendar: calendarCopy,
    });
  }

  // Find the next invalid/reserved date
  nextInvalidCheckout(checkinDate, length) {
    const { year, month, day } = checkinDate;
    const { homestayId } = this.props;

    return Axios.get('/api/getNextAvailableReservationDate', {
      header: {
        'Content-Type': 'application/json',
      },
      params: {
        homestayId,
        year,
        month: month + 1,
        day,
        length,
      },
    }).catch((e) => {
      console.log('NextInvalidCheckout Error:', e);
    });
  }

  // Find the prev invalid/reserved date
  prevInvalidCheckout(checkinDate, length) {
    const { year, month, day } = checkinDate;
    const { homestayId } = this.props;

    return Axios.get('/api/getPrevAvailableReservationDate', {
      header: {
        'Content-Type': 'application/json',
      },
      params: {
        homestayId,
        year,
        month: month + 1,
        day,
        length,
      },
    }).catch((e) => {
      console.log('PrevInvalidCheckout Error:', e);
    });
  }

  dateClickHandler(e) {
    const { month, year } = this.state;
    const { type, setDate } = this.props;
    const focusDate = e.target.innerHTML;
    if (this.validDays.includes(focusDate)) {
      setDate(type, year, month, parseInt(focusDate, 10));
    }
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
    const {
      isPopup, type, clearDates, checkinDate, checkoutDate,
    } = this.props;

    const date = new Date(`${year}-${month + 1}-1`);
    const options = { month: 'long' };
    const monthName = new Intl.DateTimeFormat('en-US', options).format(date);
    return (
      <div
        className={isPopup ? styles.popupInner : null}
        style={{
          left: (type === 'checkin' ? 0 : (-35 * 4 - 15)),
          border: 'solid lightgrey',
          borderWidth: 'thin',
          width: 250,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Month calendar={calendar} monthName={monthName} prev={this.prevMonth} next={this.nextMonth} year={year} month={month} clearDates={clearDates} dateClickHandler={this.dateClickHandler} checkinDate={checkinDate} checkoutDate={checkoutDate} handleMouseOverDate={this.handleMouseOverDate} type={type} handleMouseOffDate={this.handleMouseOffDate} />
      </div>
    );
  }
}

BasicCalendar.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  homestayId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isPopup: PropTypes.bool.isRequired,
  clearDates: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
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
};


export default BasicCalendar;
