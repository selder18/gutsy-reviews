const makeSeed = require('../../makeSeed.js');

const users = makeSeed.makeUsers();
const adventures = makeSeed.makeAdventures();
const reviews = makeSeed.makeReviews();

exports.seed = function seed(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return knex('adventures').del();
    }).then(() => {
      return knex('reviews').del();
    }).then(() => {
      return knex('users').insert(users);
    }).then(() => {
      return knex('adventures').insert(adventures);
    }).then(() => {
      return knex('reviews').insert(reviews);
    });
};
