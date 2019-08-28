/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../CSS/calendar.css';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
      valid: props.valid,
      style: props.style,
    };
  }

  componentDidMount() {
    const style = {};

    const {
      valid, number, isCheckinDate, isCheckoutDate, hightlight,
    } = this.props;
    if (!valid) {
      style.textDecoration = 'line-through';
      style.color = 'lightgrey';
    } else {
      style.textDecoration = 'none';
      style.color = 'black';
    }

    if (isCheckinDate || isCheckoutDate) {
      style.textDecoration = 'none';
      style.backgroundColor = 'rgb(0, 166, 153)';
      style.color = 'white';
    }

    if (number === '') {
      style.border = 'none';
      style.backgroundColor = 'white';
    } else {
      style.border = 'solid lightgrey';
      style.borderWidth = 'thin';
    }

    this.setState({
      number,
      valid,
      style,
    });
  }

  // Update component if props change
  componentDidUpdate(prevProps, prevStates) {
    const style = {};

    const {
      valid, number, isCheckinDate, isCheckoutDate, highlight, darkHighlight, type,
    } = this.props;

    if (!valid) {
      style.textDecoration = 'line-through';
      style.color = 'lightgrey';
      style.pointerEvents = 'none';
    } else {
      style.textDecoration = 'none';
      style.color = 'black';
      style.pointerEvents = '';
    }

    if (isCheckinDate || isCheckoutDate) {
      style.textDecoration = 'none';
      style.backgroundColor = 'rgb(0, 166, 153)';
      style.color = 'white';
    }

    if (number === '') {
      style.border = 'none';
      style.backgroundColor = 'white';
    } else {
      style.border = 'solid lightgrey';
      style.borderWidth = 'thin';
    }

    if (highlight) {
      style.backgroundColor = 'rgb(178,241,236)';
    } else if (darkHighlight) {
      style.backgroundColor = 'rgb(0, 166, 153)';
      style.color = 'white';

      if (type === 'checkout') {
        style.pointerEvents = 'none';
      }
    }

    if (prevStates.style.backgroundColor !== style.backgroundColor || prevProps.number !== number || prevProps.valid !== valid || prevProps.isCheckinDate !== isCheckinDate || prevProps.isCheckoutDate !== isCheckoutDate) {
      this.setTheState(number, valid, style);
    }
  }

  setTheState(number, valid, style) {
    this.setState({
      number,
      valid,
      style,
    });
  }

  render() {
    const { valid, number, style } = this.state;
    const { dateClickHandler, handleMouseOverDate } = this.props;

    return (
      <td style={style} className={valid ? styles.hoverable : ''}>
        <div
          role="button"
          style={{
            height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          tabIndex="0"
          onClick={dateClickHandler}
          onMouseOver={valid ? handleMouseOverDate : () => {}}
          onFocus={valid ? handleMouseOverDate : () => {}}
          onKeyPress={dateClickHandler}
        >
          {number || ''}
        </div>

      </td>
    );
  }
}

Day.propTypes = {
  number: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  style: PropTypes.shape(
    {
      border: PropTypes.string,
      color: PropTypes.string,
      textDecoration: PropTypes.string,
    },
  ),
  dateClickHandler: PropTypes.func.isRequired,
  isCheckoutDate: PropTypes.bool.isRequired,
  isCheckinDate: PropTypes.bool.isRequired,
  highlight: PropTypes.bool,
  darkHighlight: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

Day.defaultProps = {
  style: PropTypes.shape(
    {
      border: '',
      color: '',
      textDecoration: '',
    },
  ),
  highlight: false,
  darkHighlight: false,
};


export default Day;
