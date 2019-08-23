import React from 'react';
import PropTypes from 'prop-types';

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

    const { valid, number } = this.props;
    if (!valid) {
      style.textDecoration = 'line-through';
      style.color = 'lightgrey';
    } else {
      style.textDecoration = 'none';
      style.color = 'black';
    }

    if (number === '') {
      style.border = 'none';
    } else {
      style.boder = 'solid lightgrey';
    }

    this.setState({
      number,
      valid,
      style,
    });
  }

  // Update component if props change
  componentDidUpdate(prevProps) {
    const style = {};

    const { valid, number } = this.props;
    if (!valid) {
      style.textDecoration = 'line-through';
      style.color = 'lightgrey';
    } else {
      style.textDecoration = 'none';
      style.color = 'black';
    }

    if (number === '') {
      style.border = 'none';
    } else {
      style.boder = 'solid lightgrey';
    }

    if (prevProps.number !== number || prevProps.valid !== valid) {
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

    return (
      <td style={style} className={valid ? 'hoverable' : ''}>{number || ''}</td>
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
};

Day.defaultProps = {
  style: PropTypes.shape(
    {
      border: '',
      color: '',
      textDecoration: '',
    },
  ),
};


export default Day;
