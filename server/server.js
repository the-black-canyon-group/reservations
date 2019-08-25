const express = require('express');

const app = express();
const port = 3000;
const db = require('../dbHelper/serverDBHelper');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FORMAT: /homestay/?id=[homestay_id]
// SAMPLE: http://localhost:3000/homestay/?id=1
app.get('/homestay', (req, res) => {
  const { homestayId } = req.query;
  db.getHomestayById(homestayId)
    .then((data) => {
      res.json(data);
    });
});

// FORMAT: reservations/?id=[homestay_id]&month=[month as int]
// SAMPLE: http://localhost:3000/reservations/?id=2&month=10
app.get('/reservations', (req, res) => {
  const { month, homestayId, year } = req.query;
  db.getReservationDaysByMonth(homestayId, month, year)
    .then((data) => {
      res.json(data);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port:', port);
});
