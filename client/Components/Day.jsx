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
    const style = this.setStyle();
    const {
      valid, number,
    } = this.props;

    this.setState({
      number,
      valid,
      style,
    });
  }

  // Update component if props change
  componentDidUpdate(prevProps, prevStates) {
    const style = this.setStyle();
    const {
      highlight, darkHighlight, valid, number, isCheckinDate, isCheckoutDate,
    } = this.props;

    // Prevent click if invalid date
    if (!valid) {
      style.pointerEvents = 'none';
    } else {
      style.pointerEvents = '';
    }

    if (highlight) {
      style.backgroundColor = 'rgb(178,241,236)';
      style.color = 'white';
      style.borderColor = 'rgb(128,232,224)';
    } else if (darkHighlight) {
      style.backgroundColor = 'rgb(0, 166, 153)';
      style.color = 'white';
    }

    if (!highlight) {
      style.borderColor = 'lightgrey';
    }

    if (prevStates.style.backgroundColor !== style.backgroundColor || prevProps.number !== number || prevProps.valid !== valid || prevProps.isCheckinDate !== isCheckinDate || prevProps.isCheckoutDate !== isCheckoutDate) {
      this.setTheState(number, valid, style);
    }
  }

  setStyle() {
    const style = { borderCollapse: 'collapse', borderSpacing: 0 };

    const {
      valid, number, isCheckinDate, isCheckoutDate,
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

    return style;
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
    const { dateClickHandler, handleMouseOverDate, handleMouseOffDate } = this.props;

    return (
      <td
        style={style}
        className={valid && style.backgroundColor !== 'rgb(178,241,236)' ? styles.hoverable : ''}
        tabIndex="0"
        onClick={dateClickHandler}
        onMouseOver={valid ? handleMouseOverDate : () => {}}
        onMouseLeave={handleMouseOffDate}
        onFocus={valid ? handleMouseOverDate : () => {}}
        onKeyPress={dateClickHandler}
      >
        <div
          role="button"
          style={{
            height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
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
  handleMouseOverDate: PropTypes.func.isRequired,
  handleMouseOffDate: PropTypes.func.isRequired,
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
