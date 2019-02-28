exports.up = function migrateUp(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name')
        .notNull();
      table.string('avatar')
        .notNull();
    }),

    knex.schema.createTable('adventures', (table) => {
      table.increments('id').primary();
      table.string('name')
        .notNull();
    }),

    knex.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('adventure_id')
        .references('id')
        .inTable('adventures');
      table.integer('poster_id')
        .references('id')
        .inTable('users');
      table.string('review_text', 1000)
        .notNull();
      table.string('timestamp')
        .notNull();
      table.integer('stars')
        .notNull();
      table.integer('thumbs_up')
        .nullable();
      table.integer('thumbs_down')
        .nullable();
    })
  ]);
};

exports.down = function migrateDown(knex, Promise) {
  
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('adventures'),
    knex.schema.dropTable('reviews')
  ]);
};
