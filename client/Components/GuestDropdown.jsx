import React from 'react';
import PropTypes from 'prop-types';
import styles from '../CSS/guestDropdown.css';
import GuestButton from './GuestButton';

class GuestDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestCount: 1,
      adultCount: 1,
      childrenCount: props.childrenCount,
      infantCount: props.infantCount,
      maxGuests: props.maxGuests,
    };
    this.updateCounts = this.updateCounts.bind(this);
  }

  componentDidMount() {
    const { maxGuests } = this.props;
    this.setState({
      maxGuests,
    });
  }

  componentDidUpdate() {
    const oldMaxGuests = this.state.maxGuests;
    const newMaxGuests = this.props.maxGuests;

    if (oldMaxGuests !== newMaxGuests) {
      this.setState({
        maxGuests: newMaxGuests,
      });
    }
  }

  updateCounts(num, type) {
    const { updateGuestCount } = this.props;
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
    updateGuestCount(num, type);

    this.setState({
      guestCount,
      adultCount,
      childrenCount,
      infantCount,
    });
  }

  render() {
    const {
      adultCount, childrenCount, infantCount, maxGuests, guestCount,
    } = this.state;

    console.log(guestCount, ':', maxGuests);
    console.log('Adult Count:', adultCount);
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
              <td><div className={styles.cell} style={(guestCount <= maxGuests && adultCount > 1) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="subtract" updateCounts={this.updateCounts} personType="adult" /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: 10 }}>{adultCount}</div></td>
              <td><div className={styles.cell} style={(guestCount < maxGuests) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="add" updateCounts={this.updateCounts} personType="adult" /></div></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: 7, whiteSpace: 'pre' }}>
                <div className={styles.cell}>Children</div>
                <div style={{ fontWeight: '1', color: 'grey' }}>Ages 2-12</div>
              </td>
              <td><div className={styles.cell} style={(guestCount <= maxGuests && childrenCount > 0) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="subtract" updateCounts={this.updateCounts} personType="children" /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: 10 }}>{childrenCount}</div></td>
              <td><div className={styles.cell} style={(guestCount < maxGuests) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="add" updateCounts={this.updateCounts} personType="children" /></div></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: 7, whiteSpace: 'pre' }}>
                <div className={styles.cell}>Infants</div>
                <div style={{ fontWeight: '1', color: 'grey' }}>Under 2</div>
              </td>
              <td><div className={styles.cell} style={(infantCount > 0) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="subtract" updateCounts={this.updateCounts} personType="infant" /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: 10 }}>{infantCount}</div></td>
              <td><div className={styles.cell} style={(infantCount < 6) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="add" updateCounts={this.updateCounts} personType="infant" /></div></td>
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
  updateGuestCount: PropTypes.func.isRequired,
};

export default GuestDropdown;
