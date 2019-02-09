require('dotenv').config();
const environment = process.env.ENVIRONMENT || 'development'
console.log(environment);
const config = require('../knexfile.js');
const knex = require('knex')(config[environment]);

module.exports = knex;

knex.migrate.latest([config]);