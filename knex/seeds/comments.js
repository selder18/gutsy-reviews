const fakeIt = require('../../fakeit.js')
const mockData = require ('../../mockData.js')

module.exports.seedFake = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return knex('adventures').del()
    }).then(() => {
      return knex('reviews').del()
    }).then(() => {
      //Sows the fake seeds into the the DB
      return knex('users').insert(fakeIt.users())
    }).then(() => {
      return knex('adventures').insert(fakeIt.users())
    }).then(() => {
      return knex('reviews').insert(fakeIt.reviews)
    })
  };

module.exports.adventureSeed = (knex, Promise) => {
  return knex('adventures').del()
    .then(() => {
      return knex('adventures').insert(mockData)
    })
}