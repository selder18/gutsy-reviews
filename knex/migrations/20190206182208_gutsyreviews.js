
exports.up = function(knex, Promise) {

  
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('avatar');
    }),

    knex.schema.createTable('adventures', (table) => {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('adventure_id')
        .references('id')
        .inTable('adventures');
      table.integer('poster_id')
        .references('id')
        .inTable('users');
      table.string('review_text');
      table.integer('stars');
      table.integer('thumbs_up');
      table.integer('thumbs_down');
    })
  ])
};

exports.down = function(knex, Promise) {
  
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('adventures'),
    knex.schema.dropTable('reviews')
  ])
};
