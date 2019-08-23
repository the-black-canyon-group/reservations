const config = require('../config/config.js');
const knex = require('knex')({
  client: 'mysql2',
  connection: config
});
//Sample config file:
// module.exports = {
//   host: 'localhost',
//   user: 'root',
//   password: 'abc12345',
//   database: 'reservations',
// };

var getReservationsByMonth = (id, month) => {
  return knex('reservations').select()
  .whereRaw('homestay_id = ? AND Month(date) = ?', [id, month])
  .then(data => {
    return data;
  })
}

var getHomestayById = (id) => {
  return knex('homestays').select()
  .where('id', id)
  .then(data => {
    return data;
  })
}

module.exports = {
  getReservationsByMonth,
  getHomestayById,
}