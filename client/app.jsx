/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import ReservationBox from './Components/ReservationBox';

const uriParts = document.baseURI.toString().split('/');
let homestayId = 0;
if (uriParts.includes('listing') && uriParts.length > 2) {
  homestayId = uriParts[uriParts.length - 2];
}

ReactDOM.render(<ReservationBox homestayId={homestayId} />, document.getElementById('app1'));
