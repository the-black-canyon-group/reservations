import React from 'react';
import PropTypes from 'prop-types';
import styles from '../CSS/reservationCosts.css';

// cleaningFee={cleaningFee} occupancyFee={occupancyFee} serviceFee={serviceFee} price={price}

function ReservationCosts(props) {
  const {
    cleaningFee, occupancyFee, serviceFee, price, checkinDate, checkoutDate,
  } = props;

  let nights = 0;

  if (checkinDate.year !== null && checkoutDate.year !== null) {
    const checkin = new Date(checkinDate.year, checkinDate.month, checkinDate.day);
    const checkout = new Date(checkoutDate.year, checkoutDate.month, checkoutDate.day);
    const difference = checkout.getTime() - checkin.getTime();
    const days = difference / (1000 * 3600 * 24);
    nights = days;
  }

  return (
    <div className={styles.div} style={{ paddingBottom: 10, paddingTop: 3 }}>
      <div className={styles.prices} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{`$${price} x ${nights}`}</span>
        <span>{`$${price * nights}`}</span>
      </div>
      <hr className={styles.thinLine} />
      <div className={styles.prices} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Cleaning Fee</span>
        <span>{`$${cleaningFee}`}</span>
      </div>
      <hr className={styles.thinLine} />
      <div className={styles.prices} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Service Fee</span>
        <span>{`$${serviceFee}`}</span>
      </div>
      <hr className={styles.thinLine} />
      <div className={styles.prices} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Occupancy Fee</span>
        <span>{`$${occupancyFee}`}</span>
      </div>
      <hr className={styles.thinLine} />
      <div className={styles.prices} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 'bold' }}>Total</span>
        <span style={{ fontWeight: 'bold' }}>{`$${cleaningFee + occupancyFee + serviceFee + price * nights}`}</span>
      </div>
    </div>
  );
}

ReservationCosts.propTypes = {
  cleaningFee: PropTypes.number.isRequired,
  occupancyFee: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  checkinDate: PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  checkoutDate: PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default ReservationCosts;
