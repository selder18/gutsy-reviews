require('dotenv').config();
const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js');
const knex = require('knex')(config[environment]);

module.exports = knex;

knex.migrate.latest([config]);