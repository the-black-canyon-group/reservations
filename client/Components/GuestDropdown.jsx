/* eslint-disable max-len */
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
    const { maxGuests: oldMaxGuests } = this.state;
    const { maxGuests: newMaxGuests } = this.props;

    if (oldMaxGuests !== newMaxGuests) {
      // eslint-disable-next-line react/no-did-update-set-state
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

    const { toggleGuestDropDown } = this.props;

    return (
      <div
        style={{
          width: '265px', border: 'solid lightgrey', left: '-5px', borderWidth: 'thin', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px',
        }}
        className={[styles.popupInner].join('')}
      >
        <table>
          <tbody>
            <tr style={{ marginTop: '200px' }}>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: '7px' }}><div className={styles.cell}>Adults</div></td>
              <td><div className={styles.cell} style={(guestCount <= maxGuests && adultCount > 1) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="subtract" updateCounts={this.updateCounts} personType="adult" enabled={(guestCount <= maxGuests && adultCount > 1)} /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: '10px' }}>{adultCount}</div></td>
              <td><div className={styles.cell} style={(guestCount < maxGuests) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="add" updateCounts={this.updateCounts} personType="adult" enabled={(guestCount < maxGuests)} /></div></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: '7px', whiteSpace: 'pre' }}>
                <div className={styles.cell}>Children</div>
                <div style={{ fontWeight: '1', color: 'grey' }}>Ages 2-12</div>
              </td>
              <td><div className={styles.cell} style={(guestCount <= maxGuests && childrenCount > 0) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="subtract" updateCounts={this.updateCounts} personType="children" enabled={(guestCount <= maxGuests && childrenCount > 0)} /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: '10px' }}>{childrenCount}</div></td>
              <td><div className={styles.cell} style={(guestCount < maxGuests) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="add" updateCounts={this.updateCounts} personType="children" enabled={(guestCount < maxGuests)} /></div></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'left', paddingLeft: '7px', whiteSpace: 'pre' }}>
                <div className={styles.cell}>Infants</div>
                <div style={{ fontWeight: '1', color: 'grey' }}>Under 2</div>
              </td>
              <td><div className={styles.cell} style={(infantCount > 0) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="subtract" updateCounts={this.updateCounts} personType="infant" enabled={(infantCount > 0)} /></div></td>
              <td><div className={styles.cell} style={{ paddingLeft: '10px' }}>{infantCount}</div></td>
              <td><div className={styles.cell} style={(infantCount < 5) ? { pointerEvents: '' } : { pointerEvents: 'none' }}><GuestButton type="add" updateCounts={this.updateCounts} personType="infant" enabled={(infantCount < 5)} /></div></td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: 'left', paddingLeft: '7px', paddingRight: '7px', fontWeight: '1', color: 'grey', marginTop: '20px',
                }}
              >
                <br />
                {`${maxGuests} guests maximum. Infants don’t count toward the number of guests.`}
              </td>
              <td />
            </tr>
            <tr>
              <td colSpan="6" />
              <td
                style={{
                  paddingRight: '10px', color: 'rgb(0, 132, 137)', fontSize: '80%', fontWeight: 'bold',
                }}
              >
                <div
                  role="button"
                  tabIndex="0"
                  onClick={toggleGuestDropDown}
                  onKeyPress={toggleGuestDropDown}
                >
                Close
                </div>
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
  childrenCount: PropTypes.number.isRequired,
  infantCount: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  updateGuestCount: PropTypes.func.isRequired,
  toggleGuestDropDown: PropTypes.func.isRequired,
};

export default GuestDropdown;
