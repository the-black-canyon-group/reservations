/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import BasicCalendar from './Components/BasicCalendar';
import ReservationBox from './Components/ReservationBox';

ReactDOM.render(<ReservationBox homestayId={2} />, document.getElementById('app1'));
ReactDOM.render(<BasicCalendar year={2019} month={7} homestayId={1} type="checkin" />, document.getElementById('app2'));
