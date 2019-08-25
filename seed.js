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
  const pageViews = 300 + Math.ceil(Math.random() * 200);
  const averageReview = Math.floor(Math.random() * 5) + Math.random();
  const reviewCount = Math.ceil(Math.random() * 500);
  connection.query('INSERT INTO homestays (price, max_guests, cleaning_fee, service_fee, occupancy_fee, page_views, average_review, review_count) VALUES (?, ?, ?, ?, ?, ?, CONVERT(?, DECIMAL(2,1)), ?)', [price, maxGuests, cleaningFee, serviceFee, occupancyFee, pageViews, averageReview, reviewCount], (err, result) => {
    if (err) {
      throw err;
    }
    const homestayId = result.insertId;

    // Create reservations
    for (let j = 0; j < 90; j += 1) {
      const guestCount = Math.ceil(Math.random() * maxGuests);

      const randomizer = Math.floor(Math.random() * 2);
      if (randomizer === 0) {
        connection.query('INSERT INTO reservations (homestay_id, date, number_of_guests) VALUES (?, DATE_ADD(NOW(), INTERVAL ? DAY), ?)', [homestayId, j, guestCount], (error) => {
          if (error) {
            throw error;
          }
        });
      }
    }
  });
}
