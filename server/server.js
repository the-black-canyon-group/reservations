const express = require('express');

const app = express();
const port = 3000;
const db = require('../dbHelper/serverDBHelper');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FORMAT: /homestay/?id=[homestay_id]
// SAMPLE: http://localhost:3000/homestay/?id=1
app.get('/api/homestay', (req, res) => {
  const { homestayId } = req.query;
  db.getHomestayById(homestayId)
    .then((data) => {
      res.json(data);
    });
});

app.post('/api/createReservation', (req, res) => {
  console.log(req.body);
  res.send('received');
});

// FORMAT: reservations/?id=[homestay_id]&month=[month as int]
// SAMPLE: http://localhost:3000/reservations/?id=2&month=10
app.get('/api/reservations', (req, res) => {
  const { month, homestayId, year } = req.query;
  db.getReservationDaysByMonth(homestayId, month, year)
    .then((data) => {
      const reservations = [];
      for (let i = 0; i < data.length; i += 1) {
        reservations.push(data[i].day);
      }
      res.json({ reservations });
    });
});

app.get('/api/getNextAvailableReservationDate', (req, res) => {
  const {
    year, month, day, homestayId,
  } = req.query;
  db.getNextAvailableReservationDate(homestayId, year, month, day)
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port:', port);
});
