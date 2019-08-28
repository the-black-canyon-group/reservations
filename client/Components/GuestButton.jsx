import React from 'react';
import PropTypes from 'prop-types';
import styles from '../CSS/guestDropdown.css';

class GuestButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: props.enabled,
    };
  }

  render() {
    const {
      type, updateCounts, personType, enabled,
    } = this.props;

    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: (type === 'add' ? 0 : 50), marginLeft: (type === 'add' ? 0 : 50),
      }}
      >
        <button
          type="button"
          className={styles.button}
          style={(enabled) ? { textAlign: 'center' } : { textAlign: 'center', color: 'rgba(0,132,137,0.3)', border: '1px solid rgba(0,132,137,0.3)' }}
          onClick={() => { updateCounts((type === 'add' ? 1 : -1), personType); }}
        >
          <span style={{ textAlign: 'center' }}>
            <svg
              viewBox="0 0 24 24"
              role="img"
              focusable="false"
              style={{
                display: 'block', fill: 'currentcolor',
              }}
            >
              <rect height="2" rx="1" width="12" x="6" y="11" />
              {type === 'add' ? <rect height="12" rx="1" width="2" x="11" y="6" /> : null}
            </svg>
          </span>
        </button>
      </div>
    );
  }
}

GuestButton.propTypes = {
  type: PropTypes.string.isRequired,
  updateCounts: PropTypes.func.isRequired,
  personType: PropTypes.string.isRequired,
};

export default GuestButton;
