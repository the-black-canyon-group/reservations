/* eslint-disable max-len */
import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import BasicCalendar from './BasicCalendar';
import GuestDropdown from './GuestDropdown';
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
      pageViews: 0,
      reviewCount: 0,
      showCheckIn: false,
      showCheckout: false,
      showGuestDropdown: false,
      checkinString: 'Check-in',
      checkoutString: 'Checkout',
      guestString: '1 guest',
    };

    this.checkinRef = React.createRef();
    this.checkoutRef = React.createRef();
    this.guestDropdownRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick.bind(this));

    const { homestayId } = this.props;

    Axios.get('/homestay', {
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
        maxGuests: homestayInfo.maxGuests,
        cleaningFee: homestayInfo.cleaning_fee,
        occupancyFee: homestayInfo.occupancy_fee,
        serviceFee: homestayInfo.service_fee,
        pageViews: homestayInfo.page_views,
        reviewCount: homestayInfo.review_count,
      });
    });
  }

  handleOutsideClick(e) {
    if (!(this.checkinRef.current.contains(e.target) || this.checkoutRef.current.contains(e.target) || this.guestDropdownRef.current.contains(e.target))) {
      this.setState({
        showCheckIn: false,
        showCheckout: false,
        showGuestDropdown: false,
      });
    }
  }

  toggleCheckin() {
    const { showCheckIn } = this.state;
    this.setState({
      showCheckIn: !showCheckIn,
      showCheckout: false,
      showGuestDropdown: false,
    });
  }

  toggleCheckout() {
    const { showCheckout } = this.state;
    this.setState({
      showCheckout: !showCheckout,
      showCheckIn: false,
      showGuestDropdown: false,
    });
  }

  toggleGuestDropdown() {
    const { showGuestDropdown } = this.state;
    this.setState({
      showGuestDropdown: !showGuestDropdown,
      showCheckout: false,
      showCheckIn: false,
    });
  }

  render() {
    const {
      price, reviewCount, guestCount, showCheckIn, showCheckout, checkinString, checkoutString, guestString, showGuestDropdown,
    } = this.state;
    return (
      <div
        className={[styles.container, styles.thinBorder].join(' ')}
        style={{
          paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'left',
        }}
      >
        <div>
          <span className={styles.actualPrice}>{`$${price}`}</span>
          <span className={styles.price}> per night</span>
        </div>
        <div>
          <span className={styles.starColor}>★★★★☆</span>
          <span style={{ fontSize: 10 }}>{` ${reviewCount}`}</span>
        </div>
        <hr className={styles.thinLine} />
        <div style={{ marginTop: 14 }}>Dates</div>
        <div>
          <table>
            <tbody>
              <tr style={{ border: 'solid lightgrey', borderWidth: 'thin' }}>
                <td style={{ paddingTop: 3, paddingBottom: 3, paddingRight: 3 }} colSpan="3" ref={this.checkinRef}>
                  <div role="button" tabIndex="0" onClick={this.toggleCheckin.bind(this)} onKeyUp={this.toggleCheckin.bind(this)} className={styles.check}>
                    {checkinString}
                  </div>
                  {showCheckIn ? <div className={styles.popup}><BasicCalendar year={2019} month={7} homestayId={1} type="checkin" isPopup /></div> : <div />}
                </td>
                <td><img className={styles.rightArrow} src="images/rightArrow.png" alt="" /></td>
                <td style={{ paddingTop: 3, paddingBottom: 3, paddingRight: 3 }} colSpan="3" ref={this.checkoutRef}>
                  <div role="button" tabIndex="0" onClick={this.toggleCheckout.bind(this)} onKeyUp={this.toggleCheckout.bind(this)} className={styles.check}>
                    {checkoutString}
                  </div>
                  {showCheckout ? <div className={styles.popup}><BasicCalendar year={2019} month={7} homestayId={1} type="checkout" isPopup /></div> : <div />}
                </td>
              </tr>
              <tr style={{ visibility: 'collapse' }}>
                {[<td />, <td />, <td />, <td />, <td />, <td />, <td />]}
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14 }}>Guests</div>
        <div
          style={{
            border: 'solid lightgrey', borderWidth: 'thin', height: 30, paddingTop: 5, paddingBottom: 5,
          }}
          ref={this.guestDropdownRef}
        >
          <span
            role="button"
            className={styles.guestsSelect}
            style={{ paddingLeft: 7 }}
            onClick={this.toggleGuestDropdown.bind(this)}
            onKeyUp={this.toggleGuestDropdown.bind(this)}
            tabIndex="0"
          >
            {`${guestCount} guest`}
            {(guestCount > 1) ? 's' : ''}
          </span>
          <div className={styles.popup} style={showGuestDropdown ? { display: '' } : { display: 'none' }}><GuestDropdown adultCount={2} childrenCount={3} infantCount={4} maxGuests={6} /></div>
        </div>
        <div style={{ marginTop: 14 }} className={styles.reserveButton}>Reserve</div>
        <div style={{ textAlign: 'center', marginTop: 14, marginBottom: 14 }}>You wont be charged for this yet</div>
      </div>
    );
  }
}

ReservationBox.propTypes = {
  homestayId: PropTypes.number.isRequired,
};

export default ReservationBox;
