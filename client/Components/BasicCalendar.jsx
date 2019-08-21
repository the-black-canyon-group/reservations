import React from 'react';
import Day from './Day.jsx'

class BasicCalendar extends React.Component {

  constructor(props) {
    super(props);

    this.row1 = ['','',5,6,9];
    this.row2 = [13,14,17,18,20];
    this.row3 = [23,27,29,30,31];
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            {this.row1.map(day => {
              return <Day number={day} valid={false}/>
            })}
          </tr>
          <tr>
            {this.row2.map(day => {
              return <Day number={day} valid={true}/>
            })}
          </tr>
          <tr>
            {this.row3.map(day => {
              return <Day number={day} valid={true}/>
            })}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default BasicCalendar;