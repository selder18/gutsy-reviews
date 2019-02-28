exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (users) => {
      users.increments('id').primary();
      users.string('username').notNullable();
      users.string('avatar').notNullable(); //This is a string because it will refer to a location to look up an image
    }),
    knex.schema.createTable('adventures', (adventures) => {
      adventures.increments('id').primary();
      adventures.string('title').notNullable();
    }),
    knex.schema.createTable('reviews', (reviews) => {
      reviews.increments('id').primary();
      reviews.timestamp('created_at').defaultTo(knex.fn.now());
      reviews.integer('stars');
      reviews.string('comments').notNullable();
      reviews.foreign('user_id').references('id').inTable('users').notNullable();
      reviews.foreign('adventure_id').reference('id').inTable('adventures').notNullable();
    })
  ])
};