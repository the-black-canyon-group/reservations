const knexDB = require('knex');
const config = require('../config/config.js');

const knex = knexDB({
  client: 'mysql2',
  connection: config,
});
// Sample config file:
// module.exports = {
//   host: 'localhost',
//   user: 'root',
//   password: 'abc12345',
//   database: 'reservations',
// };

const getReservationDaysByMonth = (id, month, year) => knex('reservations').select(knex.raw('DAY(date) as day'))
  .whereRaw('homestay_id = ? AND Month(date) = ? AND Year(date) = ?', [id, month, year])
  .then((data) => data);

const getHomestayById = (id) => knex('homestays').select()
  .where('id', id)
  .then((data) => data);

module.exports = {
  getReservationDaysByMonth,
  getHomestayById,
};
