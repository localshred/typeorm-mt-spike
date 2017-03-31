const TABLE_NAME = 'accounts'

throw new Exception('not implemented')

exports.up = function(knex, Promise) {
  return knex.schema.alterTable(TABLE_NAME, function (t) {
    t.integer('userId').notNullable().unsigned().index().alter()
    t.foreign('userId').references('users.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable(TABLE_NAME, function (t) {
    t.integer('userId').notNullable().index().alter()
  })
};
