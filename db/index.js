const Sequelize = require('sequelize');
const db = new Sequelize('NETGLOBAL', null, null, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = db;