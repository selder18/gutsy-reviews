require('dotenv').config();
const knexConfig = require('../knexfile.js')
// const environment = process.env.NODE_ENV || 'production';
// const config = require('../knexfile.js');
const knex = require('knex');
const connection = knex(knexConfig.development);

module.exports.connection = connection;

