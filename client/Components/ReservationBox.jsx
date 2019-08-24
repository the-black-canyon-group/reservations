import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
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
    };
  }

  componentDidMount() {
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
      console.log(homestayInfo);
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

  render() {
    const { price, reviewCount, guestCount } = this.state;
    return (
      // <div style={{ border: '1px solid black', width: 375 }}>
      <div className={[styles.container, styles.thinBorder].join(' ')} style={{ padding: 8 }}>
        <div>
          <span className={styles.actualPrice}>{`$${price}`}</span>
          <span className={styles.price}> per night</span>
        </div>
        <div>
          <span className={styles.starColor}>★★½★★☆</span>
          <span style={{ fontSize: 10 }}>{` ${reviewCount}`}</span>
        </div>
        <hr className={styles.thinLine} />
        <div>Dates</div>
        <div>
          <table>
            <tbody>
              <tr>
                <td colSpan="3">Check-in</td>
                <td>-&gt;</td>
                <td colSpan="3">Check-out</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>Guests</div>
        <div>
          <div>{`${guestCount} Guest(s)`}</div>
        </div>
        <div>Reserve</div>
        <div style={{ textAlign: 'center' }}>You wont be charged for this yet</div>
      </div>
    );
  }
}

ReservationBox.propTypes = {
  homestayId: PropTypes.number.isRequired,
};

export default ReservationBox;
