const makeSeed = require('../../makeSeed.js'),
  users = makeSeed.makeUsers(),
  adventures = makeSeed.makeAdventures(),
  reviews = makeSeed.makeReviews();

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return knex('adventures').del()
    }).then(() => {
      return knex('reviews').del()
    }).then(() => {
      return knex('users').insert(users);
    }).then(() => {
      return knex('adventures').insert(adventures);
    }).then(() => {
      return knex('reviews').insert(reviews);
    });
};
