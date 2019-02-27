
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('avatar').notNullable(); //This is a string because it will refer to a location to look up an image
    }),
    knex.schema.createTable('adventures', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
    }),
    knex.schema.createTable('review', (table) => {
      
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
