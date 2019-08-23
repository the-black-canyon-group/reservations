const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const db = require('../dbHelper/serverDBHelper')

app.use(express.static('public'));

//FORMAT: /homestay/?id=[homestay_id]
//SAMPLE: http://localhost:3000/homestay/?id=1
app.get('/homestay', (req, res) => {
  let homestayId = req.query.id;
  db.getHomestayById(homestayId)
  .then(data => {
    res.json(data);
  })
})

//FORMAT: reservations/?id=[homestay_id]&month=[month as int]
//SAMPLE: http://localhost:3000/reservations/?id=2&month=10
app.get('/reservations', (req, res) => {
  let homestayId = req.query.id;
  let month = req.query.month;
  db.getReservationsByMonth(homestayId, month)
  .then(data => {
    res.json(data);
  })
})

app.listen(port, () => {
  console.log('listening on port:', port);
})