import React from 'react';

class Day extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      number: props.number,
      valid: props.valid
    }

    this.style = {};

    if (!this.state.valid) {
      this.style["text-decoration"] = "line-through";
      this.style["color"] = "lightgrey";
    }

    if (this.state.number === '') {
      this.style["border"] = "none"
    }
  }

  render() {
    return (
      <td style={this.style} class={this.state.valid ? 'hoverable' : ''}>{this.props.number ? this.props.number : ''}</td>
    );
  }
}

export default Day;