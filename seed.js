const mysql = require('mysql2');
const faker = require('faker');
const config = require('./config/config.js');


const connection = mysql.createConnection(config);

for (let i = 0; i < 100; i += 1) {
  // Create a homestay
  const price = faker.commerce.price();
  const maxGuests = Math.ceil(Math.random() * 6);
  const cleaningFee = faker.commerce.price();
  const serviceFee = faker.commerce.price();
  const occupancyFee = faker.commerce.price();
  connection.query('INSERT INTO homestays (price, max_guests, cleaning_fee, service_fee, occupancy_fee) VALUES (?, ?, ?, ?, ?)', [price, maxGuests, cleaningFee, serviceFee, occupancyFee], (err, result) => {
    if (err) {
      throw err;
    }
    const homestayId = result.insertId;

    // Create reviews
    for (let j = 0; j < 100; j += 1) {
      const stars = Math.floor(Math.random() * 5);

      connection.query('INSERT INTO reviews (homestay_id, stars) VALUES (?, ?)', [homestayId, stars]);
    }

    // Create reservations
    for (let j = 0; j < 20; j += 1) {
      connection.query('SELECT * FROM reservations', () => {
        const guestCount = Math.ceil(Math.random() * maxGuests);
        const startDate = faker.date.between('2019-08-30', '2019-12-31');
        connection.query('INSERT INTO reservations (homestay_id, start_date, end_date, number_of_guests) VALUES (?, ?, DATE_ADD(?, INTERVAL 2 DAY), ?)', [homestayId, startDate, startDate, guestCount], (error) => {
          if (error) {
            throw error;
          }
        });
      });
    }

    // Create page views
    const pageViews = 300 + Math.floor(Math.random() * 300);
    for (let j = 0; j < pageViews; j += 1) {
      const date = faker.date.past();
      connection.query('INSERT INTO page_views (homestay_id, view_date) VALUES (?, ?)', [homestayId, date]);
    }
  });
}
