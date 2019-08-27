import React from 'react';
import PropTypes from 'prop-types';
import styles from '../CSS/guestDropdown.css';
import GuestButton from './GuestButton';

class GuestDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestCount: props.guestCount,
      adultCount: props.adultCount,
      childrenCount: props.childrenCount,
      infantCount: props.infantCount,
      maxGuests: props.maxGuests,
    };
  }

  render() {
    const {
      adultCount, childrenCount, infantCount, maxGuests,
    } = this.state;
    return (
      <div
        style={{
          width: 265, border: 'solid lightgrey', borderWidth: 'thin', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10,
        }}
        className={[styles.popupInner].join('')}
      >
        <table>
          <tbody>
            <tr style={{ marginTop: 200 }}>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: 7 }}><div className={styles.cell}>Adults</div></td>
              <td><div className={styles.cell}><GuestButton type="subtract" /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: 10 }}>{adultCount}</div></td>
              <td><div className={styles.cell}><GuestButton type="add" /></div></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: 7, whiteSpace: 'pre' }}>
                <div className={styles.cell}>Children</div>
                <div style={{ fontWeight: '1', color: 'grey' }}>Ages 2-12</div>
              </td>
              <td><div className={styles.cell}><GuestButton type="subtract" /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: 10 }}>{childrenCount}</div></td>
              <td><div className={styles.cell}><GuestButton type="add" /></div></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: 7, whiteSpace: 'pre' }}>
                <div className={styles.cell}>Infants</div>
                <div style={{ fontWeight: '1', color: 'grey' }}>Under 2</div>
              </td>
              <td><div className={styles.cell}><GuestButton type="subtract" /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: 10 }}>{infantCount}</div></td>
              <td><div className={styles.cell}><GuestButton type="add" /></div></td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: 'left', paddingLeft: 7, paddingRight: 7, fontWeight: '1', color: 'grey', marginTop: 20,
                }}
              >
                <br />
                {`${maxGuests} guests maximum. Infants don’t count toward the number of guests.`}
              </td>
              <td />
            </tr>
            <tr>
              <td colSpan="6" />
              <td style={{
                paddingRight: '10', color: 'rgb(0, 132, 137)', fontSize: '80%', fontWeight: 'bold',
              }}
              >
                Close
              </td>
            </tr>
            <tr style={{ visibility: 'collapse' }}>{[<td />, <td />, <td />, <td />, <td />, <td />, <td />]}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

GuestDropdown.propTypes = {
  guestCount: PropTypes.number.isRequired,
  adultCount: PropTypes.number.isRequired,
  childrenCount: PropTypes.number.isRequired,
  infantCount: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
};

export default GuestDropdown;
