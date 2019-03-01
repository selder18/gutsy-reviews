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
      reviews.integer('timestamp')
      reviews.integer('stars');
      reviews.string('comment').notNullable();
      reviews.integer('user_id').references('users.id').notNullable();
      reviews.integer('adventure_id').references('adventures.id').notNullable();
    })
  ])
};

exports.down = function migrateDown(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('reviews'), //This table must be first because it contains notNull foreign keys pointing to other two
    knex.schema.dropTable('users'),
    knex.schema.dropTable('adventures')
  ]);
};