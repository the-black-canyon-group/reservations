/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Stars from 'react-star-ratings';
import BasicCalendar from './BasicCalendar';
import GuestDropdown from './GuestDropdown';
import ReservationCosts from './ReservationCosts';
import styles from '../CSS/reservationBox.css';

class ReservationBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      rating: 0,
      guestCount: 1,
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      maxGuests: 0,
      cleaningFee: 0,
      occupancyFee: 0,
      serviceFee: 0,
      reviewCount: 0,
      showCheckIn: false,
      showCheckout: false,
      showGuestDropdown: false,
      checkinDate: { year: null, month: null, day: null },
      checkoutDate: { year: null, month: null, day: null },
      checkinString: 'Check-in',
      checkoutString: 'Checkout',
      reservationSent: false,
    };

    this.checkinRef = React.createRef();
    this.checkoutRef = React.createRef();
    this.guestDropdownRef = React.createRef();
    this.updateGuestCount = this.updateGuestCount.bind(this);
    this.toggleGuestDropdown = this.toggleGuestDropdown.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.setDate = this.setDate.bind(this);
    this.date = new Date();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick.bind(this));

    const { homestayId } = this.props;

    Axios.get('/api/homestay', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        homestayId,
      },
    }).then((data) => {
      const homestayInfo = data.data[0];
      this.setState({
        price: homestayInfo.price,
        rating: homestayInfo.average_review,
        guestCount: 1,
        adultCount: 1,
        maxGuests: homestayInfo.max_guests,
        cleaningFee: homestayInfo.cleaning_fee,
        occupancyFee: homestayInfo.occupancy_fee,
        serviceFee: homestayInfo.service_fee,
        reviewCount: homestayInfo.review_count,
        checkinDate: { year: null, month: null, day: null },
        checkoutDate: { year: null, month: null, day: null },
      });
    });
  }

  setDate(type, year, month, day) {
    const dateString = `${(month === 12) ? 1 : month + 1}/${day}/${year}`;

    const { checkinDate, checkoutDate } = this.state;

    if (type === 'checkin') {
      this.setState({
        checkinDate: { year, month, day },
        checkinString: dateString,
        checkoutDate: { year: null, month: null, day: null },
        checkoutString: 'Checkout',
        showCheckout: true,
        showCheckIn: false,
        reservationSent: false,
      });
    } else {
      this.setState({
        checkoutDate: { year, month, day },
        checkoutString: dateString,
        showCheckIn: (checkinDate.year === null),
        showCheckout: !!((checkinDate.year !== null && checkoutDate.year !== null)),
        reservationSent: false,
      });
    }
  }

  handleOutsideClick(e) {
    if (!(this.checkinRef.current.contains(e.target) || this.checkoutRef.current.contains(e.target) || this.guestDropdownRef.current.contains(e.target)) || (e.target.id === 'calDiv')) {
      this.setState({
        showCheckIn: false,
        showCheckout: false,
        showGuestDropdown: false,
      });
    }
  }

  // Toggle display of checkin calendar on and off
  toggleCheckin() {
    const { showCheckIn } = this.state;
    this.setState({
      showCheckIn: !showCheckIn,
      showCheckout: false,
      showGuestDropdown: false,
    });
  }

  // Toggle display of checkout calendar on and off
  toggleCheckout() {
    const { showCheckout } = this.state;
    this.setState({
      showCheckout: !showCheckout,
      showCheckIn: false,
      showGuestDropdown: false,
    });
  }

  // Reset calendars
  clearDates() {
    this.setState({
      showCheckout: false,
      showCheckIn: false,
      checkinDate: { year: null, month: null, day: null },
      checkoutDate: { year: null, month: null, day: null },
      checkinString: 'Check-in',
      checkoutString: 'Checkout',
    });
  }

  // Toggle guest dropdown menu display on and off
  toggleGuestDropdown() {
    const { showGuestDropdown, maxGuests } = this.state;
    this.setState({
      maxGuests,
      showGuestDropdown: !showGuestDropdown,
      showCheckout: false,
      showCheckIn: false,
    });
  }

  sendReservationData() {
    const {
      checkinDate, checkoutDate, reservationSent, adultCount, infantCount, childrenCount,
    } = this.state;

    const { homestayId } = this.props;
    if (!reservationSent && checkinDate.year !== null && checkoutDate.year !== null) {
      Axios.post('/api/createReservation', {
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homestayId,
          checkinDate,
          adultCount,
          infantCount,
          childrenCount,
          checkoutDate,
        }),
      }).then(() => {
        this.setState({
          reservationSent: true,
        });
      });
    }
  }

  // Track guest counts
  updateGuestCount(num, type) {
    let {
      guestCount, adultCount, childrenCount, infantCount,
    } = this.state;

    switch (type) {
      case 'adult':
        guestCount += num;
        adultCount += num;
        break;
      case 'children':
        guestCount += num;
        childrenCount += num;
        break;
      case 'infant':
        infantCount += num;
        break;
      default:
        break;
    }

    this.setState({
      guestCount,
      adultCount,
      childrenCount,
      infantCount,
    });
  }

  render() {
    const { homestayId } = this.props;
    const {
      reservationSent, rating, price, reviewCount, guestCount, showCheckIn, showCheckout, checkinString, checkoutString, showGuestDropdown, adultCount, childrenCount, infantCount, maxGuests, checkinDate, checkoutDate, cleaningFee, occupancyFee, serviceFee,
    } = this.state;
    return (
      <div
        className={[styles.container, styles.thinBorder].join(' ')}
        style={{
          paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'left',
        }}
      >
        {/* PRICE PER NIGHT */}
        <div>
          <span className={styles.actualPrice}>{`$${price}`}</span>
          <span className={styles.price}> per night</span>
        </div>
        {/* RATINGS */}
        <div style={{ marginTop: -10 }}>
          <Stars rating={parseFloat(rating, 10)} starSpacing="0" starRatedColor="rgb(21, 107, 107)" numberOfStars={5} name="rating" starDimension="8px" />
          <span style={{ fontSize: 10, paddingLeft: '3', color: 'rgb(65,65,65)' }}>{`${reviewCount}`}</span>
        </div>
        <hr className={styles.thinLine} />
        <div style={{ marginTop: 14 }}>Dates</div>
        {/* CHECKIN/CHECKOUT DATES */}
        <div>
          <table>
            <tbody>
              {/* CHECKIN CALENDAR COMPONENT */}
              <tr style={{ border: 'solid lightgrey', borderWidth: 'thin' }}>
                <td style={{ paddingTop: 3, paddingBottom: 3, paddingRight: 3 }} colSpan="3" ref={this.checkinRef}>
                  <div role="button" tabIndex="0" onClick={this.toggleCheckin.bind(this)} onKeyUp={this.toggleCheckin.bind(this)} className={styles.check} style={showCheckIn ? { backgroundColor: 'rgb(153,237,230)' } : { backgroundColor: '' }}>
                    {checkinString}
                  </div>
                  <div className={styles.popup} style={!showCheckIn ? { display: 'none' } : { display: 'block' }}><BasicCalendar year={checkinDate.year !== null ? checkinDate.year : this.date.getFullYear()} month={checkinDate.month !== null ? checkinDate.month : this.date.getMonth()} homestayId={homestayId} type="checkin" isPopup clearDates={this.clearDates} setDate={this.setDate} checkinDate={checkinDate} checkoutDate={checkoutDate} /></div>
                </td>
                <td><img className={styles.rightArrow} src="images/rightArrow.png" alt="" /></td>
                {/* CHECKOUT CALENDAR COMPONENT */}
                <td style={{ paddingTop: 3, paddingBottom: 3, paddingRight: 3 }} colSpan="3" ref={this.checkoutRef}>
                  <div role="button" tabIndex="0" onClick={this.toggleCheckout.bind(this)} onKeyUp={this.toggleCheckout.bind(this)} className={styles.check} style={showCheckout ? { backgroundColor: 'rgb(153,237,230)' } : { backgroundColor: '' }}>
                    {checkoutString}
                  </div>
                  <div className={styles.popup} style={!showCheckout ? { display: 'none' } : { display: 'block' }} id="calDiv"><BasicCalendar year={checkoutDate.year !== null ? checkoutDate.year : (checkinDate.year !== null ? checkinDate.year : this.date.getFullYear())} month={checkoutDate.month !== null ? checkoutDate.month : (checkinDate.month !== null ? checkinDate.month : this.date.getMonth())} homestayId={homestayId} type="checkout" isPopup clearDates={this.clearDates} setDate={this.setDate} checkinDate={checkinDate} checkoutDate={checkoutDate} /></div>
                </td>
              </tr>
              <tr style={{ visibility: 'collapse' }}>
                {[<td />, <td />, <td />, <td />, <td />, <td />, <td />]}
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14 }}>Guests</div>
        {/* GUEST COUNTS */}
        <div
          style={{
            border: 'solid lightgrey',
            borderWidth: 'thin',
            height: 30,
            paddingTop: 5,
            paddingBottom: 5,
          }}
          ref={this.guestDropdownRef}
        >
          <span
            role="button"
            className={styles.guestsSelect}
            style={{ paddingLeft: 7, display: 'flex', justifyContent: 'space-between' }}
            onClick={this.toggleGuestDropdown}
            onKeyUp={this.toggleGuestDropdown}
            tabIndex="0"
          >
            {/* GUEST DROPDOWN MENU */}
            <span style={showGuestDropdown ? { backgroundColor: 'rgb(153,237,230)', borderRadius: 2 } : { backgroundColor: '', borderRadius: 2 }}>
              {`${guestCount} guest`}
              {(guestCount > 1) ? 's' : ''}
              {(infantCount === 1) ? `, ${infantCount} infant` : ''}
              {(infantCount > 1) ? `, ${infantCount} infants` : ''}
            </span>
            <span style={{ paddingRight: 7 }}>
              <svg
                viewBox="0 0 18 18"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{
                  height: '16px', width: '16px', display: 'block', fill: 'currentcolor', align: 'right',
                }}
              >
                <path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" />
              </svg>
            </span>
          </span>
          <div className={styles.popup} style={showGuestDropdown ? { display: '' } : { display: 'none' }}><GuestDropdown adultCount={adultCount} updateGuestCount={this.updateGuestCount} childrenCount={childrenCount} infantCount={infantCount} maxGuests={maxGuests} toggleGuestDropDown={this.toggleGuestDropdown} /></div>
        </div>
        <div style={{ display: (checkinDate.year !== null && checkoutDate.year !== null) ? 'contents' : 'none' }}>
          {(checkinDate.year !== null && checkoutDate.year !== null) ? <ReservationCosts checkoutDate={checkoutDate} checkinDate={checkinDate} cleaningFee={cleaningFee} occupancyFee={occupancyFee} serviceFee={serviceFee} price={price} /> : <div />}
        </div>
        <div role="button" onClick={() => this.sendReservationData()} tabIndex="0" style={{ marginTop: 14, pointerEvents: (reservationSent ? 'none' : ''), background: (reservationSent ? 'grey' : 'rgb(255, 90, 95)') }} className={styles.reserveButton}>Reserve</div>
        <div style={{
          textAlign: 'center', marginTop: 14, marginBottom: 14, fontSize: '12px', fontWeight: 100,
        }}
        >
You wont be charged for this yet

        </div>
      </div>
    );
  }
}

ReservationBox.propTypes = {
  homestayId: PropTypes.number.isRequired,
};

export default ReservationBox;
