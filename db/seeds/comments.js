const fakeIt = require('../../fakeit.js')
const mockData = require ('../../mockData.js')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return knex('adventures').del()
    }).then(() => {
      return knex('reviews').del()
    }).then(() => {
      //Sows the fake seeds into the the DB
      return knex('users').insert(fakeIt.makeUsers())
    }).then(() => {
      return knex('adventures').insert(fakeIt.makeAdventures())
    }).then(() => {
      return knex('reviews').insert(fakeIt.makeReviews())
    })
};

// exports.seed = (knex) => {
//   return knex('adventures').del()
//     .then(() => {
//       return knex('adventures').insert(mockData.data)
//     })
// };