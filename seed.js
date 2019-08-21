const mysql = require('mysql2');
const faker = require('faker');
const config = require('./config/config.js')


const connection = mysql.createConnection(config);

connection.query('SHOW TABLES;', (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log(result);
});

for (let i = 0; i < 100; i++) {
  // Create a homestay
  let price = faker.commerce.price();
  var maxGuests = Math.ceil(Math.random() * 6);
  let cleaningFee = faker.commerce.price();
  let serviceFee = faker.commerce.price();
  let occupancyFee = faker.commerce.price();
  connection.query('INSERT INTO homestays (price, max_guests, cleaning_fee, service_fee, occupancy_fee) VALUES (?, ?, ?, ?, ?)', [price, maxGuests, cleaningFee, serviceFee, occupancyFee], (err, result) => {
    if (err) {
      throw err;
    }
    let homestayId = result.insertId;

    // Create reviews
    for (var j = 0; j < 100; j++) {
      let stars = Math.floor(Math.random() * 5);

      connection.query('INSERT INTO reviews (homestay_id, stars) VALUES (?, ?)', [homestayId, stars]);
    }

    // Create reservations
    for (var j = 0; j < 20; j++) {
      connection.query('SELECT * FROM reservations', () => {
        let guestCount = Math.ceil(Math.random() * maxGuests);
        let startDate = faker.date.between('2019-08-30', '2019-12-31');
        connection.query('INSERT INTO reservations (homestay_id, start_date, end_date, number_of_guests) VALUES (?, ?, DATE_ADD(?, INTERVAL 2 DAY), ?)', [homestayId, startDate, startDate, guestCount], (err, results) => {
          if (err) {
            console.log('ERROR');
            throw err;
          }
        });
      });
    }

    // Create page views
    let pageViews = 300 + Math.floor(Math.random() * 300);
    for (var j = 0; j < pageViews; j++) {
      let date = faker.date.past();
      connection.query('INSERT INTO page_views (homestay_id, view_date) VALUES (?, ?)', [homestayId, date]);
    }
  });
}
