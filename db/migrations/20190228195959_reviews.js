exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (users) => {
      users.increments('id').primary();
      users.string('username').notNullable();
      users.string('avatar').notNullable();
      users.index('username');
    }),
    knex.schema.createTable('adventures', (adventures) => {
      adventures.increments('id').primary();
      adventures.string('title').notNullable();
      adventures.index('title');
    }),
    knex.schema.createTable('reviews', (reviews) => {
      reviews.increments('id').primary();
      reviews.string('timestamp');
      reviews.integer('stars');
      reviews.string('comment', 1000).notNullable();
      reviews.integer('user_id').references('users.id').notNullable();
      reviews.integer('adventure_id').references('adventures.id').notNullable();
      reviews.index('user_id');
      reviews.index('adventure_id');
      reviews.index('comment');
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