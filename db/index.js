require('dotenv').config();
const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js');
module.exports = require('knex')(config[environment]);