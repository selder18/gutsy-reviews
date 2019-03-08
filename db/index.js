require('dotenv').config();
const knexConfig = require('../knexfile.js')
// const environment = process.env.NODE_ENV || 'production';
// const config = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);

module.exports = knex;